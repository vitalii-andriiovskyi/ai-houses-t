import { COUNTRIES } from "./countries";

export const getCountry = (code: string) => COUNTRIES.find(c => c.code === code);

