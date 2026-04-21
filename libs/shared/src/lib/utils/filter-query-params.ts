import { chain } from 'lodash-es';

export const filterQueryParams = (
  params: Record<string, any>,
): Record<string, any> => {
  return chain(params)
    .pickBy((value) => value !== undefined && value !== null && value !== '')
    .mapValues(String)
    .value();
};
