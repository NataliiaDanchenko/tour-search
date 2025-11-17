import { useState } from 'react';
import { useTourSearch, type TourPrice } from '../../hooks/useTourSearch';
import { TourSearchForm } from '../TourSearchForm/TourSearchForm';
import { TourCards } from '../TourCards/TourCards';

export const TourSearch = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { loading, error, results, empty, searchTours } = useTourSearch();

  const handleSubmit = (countryID: string) => {
    setSelectedCountry(countryID); 
    searchTours(countryID);
  };

  return (
    <div>
      <TourSearchForm submit={handleSubmit} disabled={loading} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && empty && <p>За вашим запитом турів не знайдено</p>}

      {!loading && results && results.length > 0 && (
        <ul>
          {results.map((r: TourPrice) => (
            <li key={r.id}>
              {r.hotelID}: {r.amount} {r.currency} ({r.startDate} - {r.endDate})
            </li>
          ))}
        </ul>
      )}

      {results && results.length > 0 && selectedCountry && (
        <TourCards results={results} countryID={selectedCountry} />
      )}
    </div>
  );
};
