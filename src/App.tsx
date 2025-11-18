import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage/HomePage';
import { TourPage } from './pages/TourPage/TourPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/tour/:priceId/:hotelId' element={<TourPage />} />
    </Routes>
  );
}

export default App;

