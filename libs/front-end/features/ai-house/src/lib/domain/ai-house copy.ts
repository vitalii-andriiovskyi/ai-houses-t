import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable, of, switchMap, tap, merge } from 'rxjs';
import { chain } from 'lodash-es';

import { AiHouseService } from '../infrastructure/ai-house.service';
import { AIHouseBasic, AIHouse as AIHouseModel } from './ai-house.model';

export type QueryState = {
  isLoading: boolean | undefined;
  error: string | null | undefined;
  ids: string[];
};

export type EntityState<P, T> = {
  preview: P | undefined | null;
  details: T | undefined | null;
};

export type StoreState<P, T> = {
  queries: Record<string, QueryState>;
  page: number;
  pageSize: number;
  total: number;
  entities: Record<string, EntityState<P, T>>;
};

export type ActionStatus<T> = {
  data: T | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
};

const storeStructureExample: StoreState<any, any> = {
  queries: {
    "query-1": { // key is always query id, or search params (new URLSearchParams({ name: 'John', age: '30' }).toString()), values are always arrays of entity ids
      isLoading: undefined, // undefined means loading has not started yet, true means loading, false means loading finished
      error: undefined, // undefined means not loaded yet, null means loaded but no error, string means error message
      ids: ["entity-1", "entity-2"]
    },
  },
  page: 1,
  pageSize: 10,
  total: 10,
  entities: {
    "entity-1": { // key is always entity id, value is the entity data
      // PREVIEW is a subset of details, used for listing or search results in pages like /entities or /search?name=John
      // undefined means not loaded yet, null means loaded but no data, object means loaded with data
      preview: {
        id: "entity-1",
        name: "Entity 1",
        description: "This is entity 1"
      },
      // DETAILS is the full entity data, used for pages like /entities/:id 
      // undefined means not loaded yet, null means loaded but no data, object means loaded with data
      details: {
        id: "entity-1",
        name: "Entity 1",
        description: "This is entity 1",
        additionalInfo: "Additional info about entity 1"
      }
    },
  }
}

const defaultStoreState: StoreState<any, any> = {
  queries: {},
  page: 1,
  pageSize: 10,
  total: 0,
  entities: {}
};

@Injectable({
  providedIn: 'root',
})
export class AiHouse {
  private _state = new BehaviorSubject<StoreState<AIHouseBasic, AIHouseModel>>(defaultStoreState);
  private _aiHouseService = inject(AiHouseService);

  get state$(): Observable<StoreState<AIHouseBasic, AIHouseModel>> {
    return this._state.asObservable();
  }

  /**
   * Transforms a plain object into a URL search parameter string.
   * @param params - The object to transform.
   * @returns A string representation of the query parameters.
   */
  private _toQueryKey(params: Record<string, any>): string {
    const obj = chain(params)
      .pickBy(value => value !== undefined && value !== null && value !== '')
      .mapValues(String)
      .value()
    return new URLSearchParams(obj).toString();
  }

  setIsLoading(key: string, isLoading: boolean) {
    this._updateState({
      queries: {
        ...this._state.getValue().queries,
        [key]: { ...this._state.getValue().queries[key], isLoading }
      }
    });
  }

  setError(key: string, error: string | null) {
    this._updateState({
      queries: {
        ...this._state.getValue().queries,
        [key]: { ...this._state.getValue().queries[key], error }
      }
    });
  }

  /**
   * Updates the state with a new partial state.
   * @param newPartialState - The partial state to merge into the current state.
   */
  private _updateState(newPartialState: Partial<StoreState<AIHouseBasic, AIHouseModel>>): void {
    this._state.next({ ...this._state.getValue(), ...newPartialState });
  }

  private _setEntityDetails(id: string, entity: AIHouseModel | null = null, isLoading = false, error: string | null = null) {
    this._updateState({
      entities: {
        ...this._state.getValue().entities,
        [id]: { ...(this._state.getValue().entities[id] || {}), details: entity }
      },
      queries: {
        ...this._state.getValue().queries,
        [id]: { ids: [id], isLoading, error }
      }
    });
  }

  /**
   *  need methods:
   *    - to retrieve one entity by id with data, isLoading, error; id is argument
   *    - to update one entity by id with data, isLoading, error; id is argument
   *    - to remove one entity by id with data, isLoading, error; id is argument
   *    - add method to transform POJO into query key, for example, new URLSearchParams({ name: 'John', age: '30' }).toString() => "name=John&age=30", this will be used as key in queries object
   *    - to retrieve entities by query with data, isLoading, error; argument is just parameters of query, like { name: 'John', age: '30' } (POJO) and use method from previous point to transform it into query key, then use this key to get data from queries object, and then use ids from this query to get entities from entities object
   */

  fetchEntityById(id: string) {
    return this._aiHouseService.fetchOne(id).pipe(
      tap((entity) => {
        this._setEntityDetails(id, entity, false, null);
      }),
      catchError((error) => {
        this._setEntityDetails(id, null, false, error.message);
        return of(null);
      })
    );
  }

  /**
   * Retrieves an entity by its ID.
   * It will emit an object with the entity data, loading state, and error state.
   * @param id - The ID of the entity to retrieve.
   * @returns An observable of the entity state.
   */
  getEntityById(id: string): Observable<ActionStatus<AIHouseModel>> {
    const entity$ = this.state$.pipe(
      map((state) => ({
        data: state.entities[id]?.details,
        isLoading: state.queries[id]?.isLoading ?? false,
        error: state.queries[id]?.error ?? null
      }))
      // filter((details): details is AIHouseModel => details !== undefined)
    )

    const loadEntity$: Observable<any> = entity$.pipe(
      // filter(({ data, isLoading, error }) => data === undefined && !isLoading && !error),
      filter(({ data, isLoading }) => data === undefined && !isLoading),
      switchMap(() => this.fetchEntityById(id)),
      filter(() => false)
    )

    return merge(entity$, loadEntity$);
  }

  /**
   * Retrieves an entity by its ID.
   * It will emit an object with the entity data, loading state, and error state.
   * @param id - The ID of the entity to retrieve.
   * @returns An observable of the entity state.
   */
  // getEntityById(id: string): Observable<ActionStatus<AIHouseModel>> {
  //   const currentEntity = this._state.getValue().entities[id];

  //   if (currentEntity?.details) {
  //     return this.state$.pipe(
  //       map((state) => ({
  //         data: state.entities[id]?.details,
  //         isLoading: state.queries[id]?.isLoading ?? false,
  //         error: state.queries[id]?.error ?? null
  //       }))
  //     );
  //   }

  //   this.setIsLoading(id, true);

  //   return this._aiHouseService.fetchAIHouseById(id).pipe(
  //     tap((entity) => {
  //       this._updateState({
  //         entities: {
  //           ...this._state.getValue().entities,
  //           [id]: { ...this._state.getValue().entities[id], details: entity }
  //         },
  //       });
  //       this.setIsLoading(id, false);
  //       this.setError(id, null);
  //     }),
  //     map((entity) => ({ data: entity, isLoading: false, error: null })),
  //     catchError((error) => {
  //       this.setError(id, error.message);
  //       this.setIsLoading(id, false);
  //       this._updateState({
  //         entities: {
  //           ...this._state.getValue().entities,
  //           [id]: { ...this._state.getValue().entities[id], details: null }
  //         }
  //       });
  //       return of({ data: null, isLoading: false, error: error.message });
  //     })
  //   );
  // }

  /**
   * Updates an entity by its ID.
   * @param id - The ID of the entity to update.
   * @param data - The new data for the entity.
   */
  updateEntity(id: string, data: Partial<AIHouseModel>) {
    // Implementation to be added
  }

  /**
   * Removes an entity by its ID.
   * @param id - The ID of the entity to remove.
   */
  removeEntity(id: string) {
    // Implementation to be added
  }

  /**
   * Retrieves entities based on a query.
   * @param params - The query parameters.
   * @returns An observable of the query result.
   */
  // getEntitiesByQuery(params: object = { all: 'all' }): Observable<ActionStatus<AIHouseBasic[]>> {
  //   const queryKey = this._toQueryKey(params);
  //   const currentQuery = this._state.getValue().queries[queryKey];

  //   if (currentQuery && !currentQuery.error) {
  //     return this.state$.pipe(
  //       map((state) => {
  //         const ids = state.queries[queryKey]?.ids || [];
  //         const entities = ids.map(id => state.entities[id]?.preview).filter((p): p is AIHouseBasic => !!p);
  //         return {
  //           data: entities,
  //           isLoading: state.queries[queryKey]?.isLoading ?? false,
  //           error: state.queries[queryKey]?.error ?? null
  //         };
  //       })
  //     );
  //   }

  //   this.setIsLoading(queryKey, true);

  //   return this._aiHouseService.fetchAIHouses(params).pipe(
  //     tap((response) => {
  //       const newEntities = response.data.reduce((acc: Record<string, EntityState<AIHouseBasic, AIHouseModel>>, entity: AIHouseBasic) => {
  //         acc[entity._id] = { ...(this._state.getValue().entities[entity._id] || {}), preview: entity };
  //         return acc;
  //       }, {} as Record<string, EntityState<AIHouseBasic, AIHouseModel>>);

  //       this._updateState({
  //         queries: {
  //           ...this._state.getValue().queries,
  //           [queryKey]: { ids: response.data.map((e: any) => e._id), isLoading: false, error: null }
  //         },
  //         entities: { ...this._state.getValue().entities, ...newEntities },
  //         page: response.page,
  //         pageSize: response.pageSize,
  //         total: response.total,
  //       });
  //     }),
  //     map(() => {
  //       const state = this._state.getValue();
  //       const ids = state.queries[queryKey]?.ids || [];
  //       const entities = ids.map(id => state.entities[id]?.preview).filter((p): p is AIHouseBasic => !!p);
  //       return { data: entities, isLoading: false, error: null };
  //     }),
  //     catchError(error => {
  //       this._updateState({
  //         queries: {
  //           ...this._state.getValue().queries,
  //           [queryKey]: { ids: [], isLoading: false, error: error.message }
  //         }
  //       });
  //       return of({ data: null, isLoading: false, error: error.message });
  //     })
  //   );
  // }

  fetchEntities(params: object = { all: 'all' }) {
    const queryKey = this._toQueryKey(params);
    this.setIsLoading(queryKey, true);
    return this._aiHouseService.fetchMany(params).pipe(
      tap((response) => {
        const newEntities = response.data.reduce((acc: Record<string, EntityState<AIHouseBasic, AIHouseModel>>, entity: AIHouseBasic) => {
          acc[entity._id] = { ...(this._state.getValue().entities[entity._id] || {}), preview: entity };
          return acc;
        }, {} as Record<string, EntityState<AIHouseBasic, AIHouseModel>>);

        this._updateState({
          queries: {
            ...this._state.getValue().queries,
            [queryKey]: { ids: response.data.map((e: any) => e._id), isLoading: false, error: null }
          },
          entities: { ...this._state.getValue().entities, ...newEntities },
          page: response.page,
          pageSize: response.pageSize,
          total: response.total,
        });
      }),
      catchError(error => {
        this._updateState({
          queries: {
            ...this._state.getValue().queries,
            [queryKey]: { ids: [], isLoading: false, error: error.message }
          }
        });
        return of(null);
      })
    );
  }

  /**
   * Retrieves entities based on a query.
   * @param params - The query parameters.
   * @returns An observable of the query result.
   */
  getEntities(params: object = { all: 'all' }): Observable<ActionStatus<AIHouseBasic[]>> {
    const queryKey = this._toQueryKey(params);
    const entities$ = this.state$.pipe(
      map((state) => {
        const ids = state.queries[queryKey]?.ids || [];
        const entities = ids.map(id => state.entities[id]?.preview).filter((p): p is AIHouseBasic => !!p);
        return {
          data: entities,
          isLoading: state.queries[queryKey]?.isLoading ?? false,
          error: state.queries[queryKey]?.error ?? null
        };
      })
    );

    const loadEntities$ = entities$.pipe(
      // filter(({ data, isLoading, error }) => (data === null || data.length === 0) && !isLoading && !error),
      filter(({ data, isLoading }) => (data === null || data.length === 0) && !isLoading), // maybe need better condition to check if we need to load data, for example, if data is empty array but we know that it should be empty because of query params, like { name: 'NonExistingName' }, then we should not load data, but if data is empty array and query params are { all: 'all' }, then we should load data
      switchMap(() => this.fetchEntities(params)),
      filter(() => false)
    );

    return merge(entities$, loadEntities$);
  }
}
