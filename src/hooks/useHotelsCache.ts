import { useRef } from 'react';
import { getHotels as apiGetHotels } from '../api/api';

type Hotel = {
  id: number;
  name: string;
  cityName: string;
  countryName: string;
  img: string;
};

export const useHotelsCache = () => {
  const cache = useRef<Record<string, Record<number, Hotel>>>({});

  const getHotels = async (countryID: string) => {
    if (cache.current[countryID]) {
      return cache.current[countryID];
    }

    const res = await apiGetHotels(countryID);
    const data: Record<number, Hotel> = await res.json();

    cache.current[countryID] = data;
    return data;
  };

  return { getHotels };
};
