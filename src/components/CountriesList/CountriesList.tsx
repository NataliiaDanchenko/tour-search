import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import type { Country } from '../../redux/reducers/types';
import {
  setCountries,
  setCountriesError,
  setCountriesLoading,
} from '../../redux/actions/countriesActions';
import { getCountries } from '../../api/api';
import { TourSearch } from '../TourSearch/TourSearch';

export const CountriesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector<
    RootState,
    RootState['countries']
  >((state) => state.countries);

  useEffect(() => {
    dispatch(setCountriesLoading());

    getCountries()
      .then((res) => res.json())
      .then((countries: Record<string, Country>) => {
        dispatch(setCountries(countries));
      })
      .catch(() => {
        dispatch(setCountriesError('Failed to load countries'));
      });
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul>
        {Object.values(data).map((c) => (
          <li key={c.id}>
            <img src={c.flag} alt={c.name} /> {c.name}
          </li>
        ))}
      </ul>
      <TourSearch />
    </div>
  );
};


