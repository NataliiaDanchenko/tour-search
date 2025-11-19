import { useState, useRef } from 'react';
import { startSearchPrices, getSearchPrices, stopSearchPrices } from '../api/api';

export type TourPrice = {
  id: string;
  hotelID: number;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
};

export const useTourSearch = () => {
  const [results, setResults] = useState<TourPrice[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeTokenRef = useRef<string | null>(null);
  const ignoreTokenRef = useRef<string | null>(null);   

  const searchTours = async (countryID: string) => {
    console.log('NEW SEARCH STARTED');

    if (activeTokenRef.current) {
      const oldToken = activeTokenRef.current;
      ignoreTokenRef.current = oldToken;

      console.log('Cancelling previous token: ' + oldToken);

      try {
        await stopSearchPrices(oldToken);
        console.log('Previous token stopped successfully');
      } catch (e) {
        console.warn('Failed to cancel previous search', e);
      }

      activeTokenRef.current = null;
    }

    setLoading(true);
    setResults(null);
    setEmpty(false);
    setError(null);

    try {
      const startRes = await startSearchPrices(countryID);
      const data = await startRes.json();

      const token = data.token;
      activeTokenRef.current = token;
      ignoreTokenRef.current = null;

      console.log('New token: ' + token);

      const waitUntil = new Date(data.waitUntil).getTime();
      const delay = waitUntil - Date.now();

      console.log('Wait time: ' + delay + 'ms');

      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      let attempts = 0;
      const maxRetries = 2;
      let success = false;

      while (!success && attempts <= maxRetries) {
        attempts++;

        console.log(`Attempt ${attempts} for token ${token}`);

        try {
          const pricesRes = await getSearchPrices(token);
          const pricesData = await pricesRes.json();
          const prices = Object.values(pricesData.prices) as TourPrice[];

          if (ignoreTokenRef.current === token) {
            console.log('IGNORED OLD TOKEN RESPONSE: ' + token);
            return;
          }

          console.log('Token success: ' + token, prices);

          if (prices.length === 0) setEmpty(true);
          else setResults(prices);

          success = true;
        } catch (err) {

          if (ignoreTokenRef.current === token) {
            console.log('IGNORED ERROR FROM OLD TOKEN: ' + token);
            return;
          }

          console.log(`Token ${token} attempt ${attempts} FAILED`, err);

          if (attempts > maxRetries) {
            setError('Помилка, спробуйте пізніше');
          } else {
            await new Promise(res => setTimeout(res, 1000));
          }
        }
      }

    } catch (err) {
      console.log('Initial request failed', err);
      setError('Помилка, спробуйте пізніше');
    } finally {
      console.log('SEARCH FINISHED');
      setLoading(false);
    }
  };

  return { results, loading, empty, error, searchTours };
};
