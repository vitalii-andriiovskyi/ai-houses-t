import type { FindOptionsSelect, Repository } from 'typeorm';

/**
 * Utility function to include all columns of an entity in a TypeORM query, with the option to add specific columns that are hidden in Entity.
 * @param repository - The TypeORM repository for the entity.
 * @param columnsToAdd - An optional array of hidden column names to include in the selection.
 * @returns An object representing the columns to be included in the query selection.
 */
export function includeAll<T extends object>(
  repository: Repository<T>,
  columnsToAdd?: Array<keyof T>,
): FindOptionsSelect<T> {
  return repository.metadata.columns
    .filter(
      (col) =>
        col.isSelect ||
        (!col.isSelect && columnsToAdd?.includes(col.propertyName as keyof T)),
    )
    .map((col) => col.propertyName)
    .reduce((acc, key) => ({ ...acc, [key]: true }), {});
}

export function include<T extends object>(
  repository: Repository<T>,
  columnsToSelect: Array<keyof T>,
): FindOptionsSelect<T> {
  return repository.metadata.columns
    .filter(
      (col) =>
        (col.isSelect || !col.isSelect) &&
        columnsToSelect.includes(col.propertyName as keyof T),
    )
    .map((col) => col.propertyName)
    .reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {},
    ) as FindOptionsSelect<T>;
}
