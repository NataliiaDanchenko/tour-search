import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPrice, getHotel } from '@/api/api';
import {
  HotelInfo,
  type HotelInfoProps,
} from '@/components/HotelInfo/HotelInfo';
import { TourInfo } from '@/components/TourInfo/TourInfo';

type Price = {
  id: string;
  hotelID: number | string;
  startDate: string;
  endDate: string;
  amount: number;
  currency: string;
};

export const TourPage: React.FC = () => {
  const { priceId, hotelId } = useParams<{
    priceId: string;
    hotelId: string;
  }>();
  const [price, setPrice] = useState<Price | null>(null);
  const [hotel, setHotel] = useState<HotelInfoProps['hotel'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!priceId || !hotelId) {
        setError('Missing tour or hotel ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        console.log('Fetching price for ID:', priceId);
        const priceResp = await getPrice(priceId);
        const priceData: Price = await priceResp.json();
        console.log('priceData:', priceData);
        setPrice(priceData);

        console.log('Fetching hotel for ID:', hotelId);
        const hotelResp = await getHotel(Number(hotelId));
        const hotelData: any = await hotelResp.json();
        console.log('hotelData:', hotelData);

        if (!hotelData || !hotelData.id) {
          setError(`Hotel with ID ${hotelId} not found`);
          setLoading(false);
          return;
        }

        const mappedHotel: HotelInfoProps['hotel'] = {
          id: hotelData.id,
          name: hotelData.name,
          img: hotelData.img,
          cityName: hotelData.cityName,
          countryName: hotelData.countryName,
          countryId: hotelData.countryId ? String(hotelData.countryId) : '',
          description: hotelData.description ?? '',
          services: hotelData.services ?? {},
        };

        console.log('mappedHotel:', mappedHotel);
        setHotel(mappedHotel);
      } catch (e) {
        console.error('Error loading tour data', e);
        setError('Не вдалося завантажити дані туру.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [priceId, hotelId]);

  if (loading) return <p>Loading...</p>;
  if (error || !price || !hotel)
    return <p style={{ color: 'red' }}>{error || 'Дані не знайдено'}</p>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 25 }}>
      <HotelInfo hotel={hotel} showDescription showServices />
      <TourInfo
        startDate={price.startDate}
        endDate={price.endDate}
        amount={price.amount}
        currency={price.currency}
        priceId={price.id}
        hotelId={String(hotel.id)}
      />
    </div>
  );
};
