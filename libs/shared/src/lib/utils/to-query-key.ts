import { chain } from 'lodash-es';

/**
 * Transforms a plain object into a URL search parameter string.
 * @param params - The object to transform.
 * @returns A string representation of the query parameters.
 */
export const toQueryKey = (params: Record<string, any>): string => {
  const obj = chain(params)
    .pickBy((value) => value !== undefined && value !== null && value !== '')
    .mapValues(String)
    .value();
  return new URLSearchParams(obj).toString();
};
