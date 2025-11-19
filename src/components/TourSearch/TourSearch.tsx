import { useState } from 'react';
import { useTourSearch } from '@/hooks/useTourSearch';
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
      <div>
        <TourSearchForm submit={handleSubmit} disabled={loading} />
      </div>

      {loading && <div style={{ textAlign: 'center' }}>Loading...</div>}

      {error && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}

      {!loading && empty && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p>За вашим запитом турів не знайдено</p>
        </div>
      )}

      {results && results.length > 0 && selectedCountry && (
        <TourCards results={results} countryID={selectedCountry} />
      )}
    </div>
  );
};
