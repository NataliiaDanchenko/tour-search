import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import type { Country } from '@/redux/types';
import {
  setCountries,
  setCountriesError,
  setCountriesLoading,
} from '@/redux/actions/countriesActions';
import { getCountries } from '@/api/api';
import styles from './CountriesList.module.scss';

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
      <ul className={styles.countriesList}>
        {Object.values(data).map((c) => (
          <li key={c.id} className={styles.li}>
            <img src={c.flag} alt={c.name} />
            <p>{c.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
