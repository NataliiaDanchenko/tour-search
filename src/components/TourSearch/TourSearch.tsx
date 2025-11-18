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
      <TourSearchForm submit={handleSubmit} disabled={loading} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && empty && <p>За вашим запитом турів не знайдено</p>}

      {results && results.length > 0 && selectedCountry && (
        <TourCards results={results} countryID={selectedCountry} />
      )}
    </div>
  );
};
