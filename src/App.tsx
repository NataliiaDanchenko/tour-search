import { Routes, Route } from 'react-router-dom';
import { CountriesList } from './components/CountriesList/CountriesList';
import { TourPage } from './pages/TourPage/TourPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<CountriesList />} />
      <Route path='/tour/:priceId/:hotelId' element={<TourPage />} />
    </Routes>
  );
}

export default App;

