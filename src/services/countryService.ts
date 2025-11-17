import { getCountries } from '../api/api';

export const fetchCountries = async () => {
  const response = await getCountries();
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  const countries = await response.json();
  return countries;
};
