import { BehaviorSubject, catchError, filter, map, Observable, of, switchMap, tap, merge } from 'rxjs';
import { chain } from 'lodash-es';

export type QueryState = {
  isLoading: boolean | undefined;
  error: string | null | undefined;
  ids: string[];
};

export type EntityState<T, K> = {
  preview: T | undefined | null;
  details: K | undefined | null;
};

export type StoreState<T, K> = {
  queries: Record<string, QueryState>;
  page: number;
  pageSize: number;
  total: number;
  entities: Record<string, EntityState<T, K>>;
};

export type ActionStatus<T> = {
  data: T | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
};

export interface EnitityUpdate<T, K> {
  id: string;
  entityPreview?: Partial<T> | null;
  entityDetails?: Partial<K> | null;
  isLoading?: boolean;
  error?: string | null;
}

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

export abstract class BasicStore<T, K> {
  abstract primaryIdKey: string; // id or _id or something else, depending on the entity, for example, for ai-house it will be _id, but for some other entity it can be id, so I will set it in the child store
  protected defaultStoreState: StoreState<T, K> = {
    queries: {},
    page: 1,
    pageSize: 10,
    total: 0,
    entities: {}
  };
  protected _state = new BehaviorSubject<StoreState<T, K>>(this.defaultStoreState);
  protected abstract _apiService: any;

  get state$(): Observable<StoreState<T, K>> {
    return this._state.asObservable();
  }

  /**
   * Transforms a plain object into a URL search parameter string.
   * @param params - The object to transform.
   * @returns A string representation of the query parameters.
   */
  protected _toQueryKey(params: Record<string, any>): string {
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
  protected _updateState(newPartialState: Partial<StoreState<T, K>>): void {
    this._state.next({ ...this._state.getValue(), ...newPartialState });
  }

  protected _setEntityDetails(id: string, entity: K | null = null, isLoading = false, error: string | null = null) {
    const { entities, queries } = this._state.getValue();
    this._updateState({
      entities: {
        ...entities,
        [id]: { ...(entities[id] || {}), details: entity }
      },
      queries: {
        ...queries,
        [id]: { ids: (entity as any)?.[this.primaryIdKey] ? [(entity as any)?.[this.primaryIdKey]] : [], isLoading, error }
      }
    });
  }

  protected _updateEntity({ id, entityDetails = null, entityPreview = null, isLoading = false, error = null }: EnitityUpdate<T, K>) {
    const { entities, queries } = this._state.getValue();
    const curEntity = entities[id] || {};
    const { preview, details } = curEntity;
    this._updateState({
      entities: {
        ...entities,
        [id]: {
          ...(curEntity || {}),
          preview: { ...(preview || {} as T), ...(entityPreview || {}) },
          details: { ...(details || {} as K), ...(entityDetails || {}) }
        }
      },
      queries: {
        ...queries,
        [id]: { ids: [id], isLoading, error }
      }
    });
  }

  /**
   * Removes an entity by its ID.
   * @param id - The ID of the entity to remove.
   */
  protected _removeEntity(id: string) {
    const { entities, queries } = this._state.getValue();
    const { [id]: removedEntity, ...restEntities } = entities;
    const { [id]: removedQuery, ...restQueries } = queries;
    // need to remove id from ids in any keys in restQueries where it exists, because this entity can be in multiple queries, for example, in query with url as key and in query with id as key
    const queryRemovalMap: [string, number][] = []
    Object.keys(restQueries).forEach((key) => {
      const position = restQueries[key]?.ids?.indexOf(id);
      if (position > -1) {
        queryRemovalMap.push([key, position]);
      }
    });
    queryRemovalMap.forEach(([key]) => {
      restQueries[key] = { ...restQueries[key], ids: restQueries[key].ids.filter((qid) => qid !== id) };
    })
    this._updateState({
      entities: restEntities,
      queries: restQueries
    });

    return { entity: removedEntity, query: removedQuery, queryRemovalMap };
  }

  protected _restoreIdInQueries(id: string, queryRemovalMap: [string, number][]) {
    const { queries } = this._state.getValue();
    const newQueries = { ...queries };
    queryRemovalMap.forEach(([key, position]) => {
      const ids = [...(newQueries[key]?.ids || [])];
      ids.splice(position, 0, id)
      newQueries[key] = { ...newQueries[key], ids };
    });
    this._updateState({
      queries: newQueries
    });
  }

  fetchEntityById(id: string, isURL: boolean | null = null): Observable<K | null> {
    return this._apiService.fetchOne(id, { isURL }).pipe(
      tap((entity: K) => {
        this._setEntityDetails((entity as any)?.[this.primaryIdKey], entity, false, null);
        if (isURL) {
          // in this case `id` is url, and I set queries[id][ids] to entity._id, so I can get entity._id by url later, and then get entity details by id
          // not to duplicate entity details for the url in entities object, I will just set entity _id. So I can have correct entity id even from details
          this._setEntityDetails(id, { [this.primaryIdKey]: (entity as any)?.[this.primaryIdKey] } as K, false, null);
        }
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
  getEntityById(id: string): Observable<ActionStatus<K>> {
    const entity$ = this.state$.pipe(
      map((state) => ({
        data: state.entities[id]?.details,
        isLoading: state.queries[id]?.isLoading ?? false,
        error: state.queries[id]?.error ?? null
      }))
    )

    const loadEntity$: Observable<any> = entity$.pipe(
      filter(({ data, isLoading }) => data === undefined && !isLoading),
      switchMap(() => this.fetchEntityById(id)),
      filter(() => false)
    )

    return merge(entity$, loadEntity$);
  }

  /**
   * Retrieves an entity details by its ID.
   * It will emit an object with the entity data, loading state, and error state.
   * @param url - The ID of the entity to retrieve.
   * @returns An observable of the entity state.
   */
  getEntityByURL(url: string): Observable<ActionStatus<K>> {
    const entity$ = this.state$.pipe(
      map((state) => {
        const id = (state.entities[url]?.details as any)?.[this.primaryIdKey]; // in this case url is query key, and I set queries[url][ids] to entity._id in fetchEntityById method, so I can get entity._id by url, and then get entity details by id
        return {
          data: id ? state.entities[id]?.details : undefined,
          isLoading: state.queries[url]?.isLoading ?? false,
          error: state.queries[url]?.error ?? null
        }
      })
    )

    const loadEntity$: Observable<any> = entity$.pipe(
      filter(({ data, isLoading, error }) => data === undefined && !isLoading && !error),
      switchMap(() => this.fetchEntityById(url, true)),
      filter(() => false)
    )

    return merge(entity$, loadEntity$);
  }

  /**
   * Retrieves an entity preview by its ID.
   * It will emit an object with the entity data, loading state, and error state.
   * @param id - The ID of the entity to retrieve.
   * @returns An observable of the entity state.
   */
  getEntityPreviewById(id: string): Observable<ActionStatus<T>> {
    return this.state$.pipe(
      map((state) => ({
        data: state.entities[id]?.preview,
        isLoading: state.queries[id]?.isLoading ?? false,
        error: state.queries[id]?.error ?? null
      }))
    )
  }

  updateEntityPessimistic(
    id: string,
    entity: Partial<K>,
    fn: (id: string, data?: any) => Observable<K> = this._apiService.updateOne.bind(this._apiService)
  ) {
    this.setIsLoading(id, true);
    fn(id, entity).pipe(
      tap((updatedEntity: Partial<K>) => {
        this._updateEntity({
          id,
          entityPreview: updatedEntity as unknown as Partial<T>, // probably will need function to extract data for preview or a flag to not include if preview will have very unique properties
          entityDetails: updatedEntity,
          isLoading: false,
          error: null
        })
      }),
      catchError((error) => {
        this.setIsLoading(id, false);
        this.setError(id, error.message);
        return of(null);
      })
    ).subscribe();
  }

  updateEntityOptimistic(
    id: string,
    entity: Partial<K>,
    fn: (id: string, data?: any) => Observable<K> = this._apiService.updateOne.bind(this._apiService)
  ) {
    const curEntity = { ...this._state.getValue().entities?.[id] || {} }

    this._updateEntity({
      id,
      entityPreview: entity as unknown as Partial<T>, // probably will need function to extract data for preview or a flag to not include if preview will have very unique properties
      entityDetails: entity,
      isLoading: false,
      error: null
    })
    fn(id, entity).pipe(
      catchError((error) => {
        this._updateEntity({
          id,
          entityPreview: { ...(curEntity.preview || {}) }, // probably will need function to extract data for preview or a flag to not include if preview will have very unique properties
          entityDetails: { ...(curEntity.details || {}) },
          isLoading: false,
          error: error.message
        })
        return of(null);
      })
    ).subscribe();
  }

  removeEntityPessimistic(id: string, fn: (id: string) => Observable<any> = this._apiService.deleteOne.bind(this._apiService)) {
    this.setIsLoading(id, true);
    fn(id).pipe(
      tap(() => {
        this._removeEntity(id);
      }),
      catchError((error) => {
        this.setIsLoading(id, false);
        this.setError(id, error.message);
        return of(null);
      })
    ).subscribe();
  }

  removeEntityOptimistic(id: string, fn: (id: string) => Observable<any> = this._apiService.deleteOne.bind(this._apiService)) {
    const curEntity = { ...this._state.getValue().entities?.[id] || {} }

    const { queryRemovalMap } = this._removeEntity(id);
    fn(id).pipe(
      catchError((error) => {
        this._updateEntity({
          id,
          entityPreview: curEntity.preview,
          entityDetails: curEntity.details,
          isLoading: false,
          error: error.message
        })
        this._restoreIdInQueries(id, queryRemovalMap);
        return of(null);
      })
    ).subscribe();
  }

  fetchEntities(params: object = { page: this.defaultStoreState.page, pageSize: this.defaultStoreState.pageSize }) {
    const queryKey = this._toQueryKey(params);
    this.setIsLoading(queryKey, true);
    return this._apiService.fetchMany(params).pipe(
      // TODO: define correct response TYPE
      tap((response: any) => {
        const newEntities = response.data.reduce((acc: Record<string, EntityState<T, K>>, entity: T) => {
          acc[(entity as any)?.[this.primaryIdKey]] = { ...(this._state.getValue().entities[(entity as any)?.[this.primaryIdKey]] || {}), preview: entity };
          return acc;
        }, {} as Record<string, EntityState<T, K>>);

        this._updateState({
          queries: {
            ...this._state.getValue().queries,
            [queryKey]: { ids: response.data.map((e: any) => e[this.primaryIdKey]), isLoading: false, error: null }
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
  getEntities(params: object = { page: this.defaultStoreState.page, pageSize: this.defaultStoreState.pageSize }): Observable<ActionStatus<T[]>> {
    const queryKey = this._toQueryKey(params);
    const entities$ = this.state$.pipe(
      map((state) => {
        const ids = state.queries[queryKey]?.ids;
        const entities = ids
          ? ids.map(id => state.entities[id]?.preview).filter((p): p is T => !!p)
          : undefined;
        return {
          data: entities,
          isLoading: state.queries[queryKey]?.isLoading ?? false,
          error: state.queries[queryKey]?.error ?? null
        };
      })
    );

    const loadEntities$ = entities$.pipe(
      // filter(({ data, isLoading, error }) => (data === null || data.length === 0) && !isLoading && !error),
      filter(({ data, isLoading }) => (data === undefined) && !isLoading), // maybe need better condition to check if we need to load data, for example, if data is empty array but we know that it should be empty because of query params, like { name: 'NonExistingName' }, then we should not load data, but if data is empty array and query params are { all: 'all' }, then we should load data
      switchMap(() => this.fetchEntities(params)),
      filter(() => false)
    );

    return merge(entities$, loadEntities$) as Observable<ActionStatus<T[]>>;
  }
}
