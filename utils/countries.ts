import countries from 'world-countries';

export const formattedCountries = countries.map((country) => ({
  name: country.name.common,
  code: country.cca2,
  flag: country.flag,
}));

export function findCountryByCode(code: string) {
  return countries.find(
    (country) => country.cca2.toUpperCase() === code.toUpperCase()
  );
}