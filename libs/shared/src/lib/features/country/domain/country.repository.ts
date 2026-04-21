import { COUNTRIES } from './countries';

export const getCountry = (code: string) =>
  COUNTRIES.find((c) => c.code === code);

export const getZones = (countryCode: string) => {
  const country = getCountry(countryCode);
  return country?.zones || [];
};
