import countries from 'world-countries';

export const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: `${country.flag} ${country.name.common}`,
}));

export function findCountryByCode(code: string) {
  return countries.find(
    (country) => country.cca2.toUpperCase() === code.toUpperCase()
  );
}