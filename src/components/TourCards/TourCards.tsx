// src/components/TourCards/TourCards.tsx
import React, { useEffect, useState } from 'react';
import type { TourPrice } from '../../hooks/useTourSearch';
import { useHotelsCache } from '../../hooks/useHotelsCache';
import { HotelInfo, type HotelInfoProps } from '../HotelInfo/HotelInfo';
import { TourInfo } from '../TourInfo/TourInfo';

type TourCardProps = {
  results: TourPrice[];
  countryID: string;
};

type TourWithHotel = TourPrice & {
  hotel?: HotelInfoProps['hotel'];
};

export const TourCards: React.FC<TourCardProps> = ({ results, countryID }) => {
  const { getHotels } = useHotelsCache();
  const [tours, setTours] = useState<TourWithHotel[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const hotels = await getHotels(countryID);
        console.log('Hotels loaded for countryID', countryID, hotels);

        const mapped = results.map((r) => {
          const hotelData: any = hotels[r.hotelID] || hotels[Number(r.hotelID)];

          if (!hotelData) {
            console.warn(
              `Hotel not found for tour ${r.id}, hotelID: ${r.hotelID}`,
            );
            return { ...r, hotel: null };
          }

          // Приводим к нужной форме
          const hotel: NonNullable<HotelInfoProps['hotel']> = {
            id: hotelData.id,
            name: hotelData.name,
            img: hotelData.img,
            cityName: hotelData.cityName,
            countryName: hotelData.countryName,
            countryId: hotelData.countryId ? String(hotelData.countryId) : '', // гарантируем строку
            description: hotelData.description ?? '',
            services: hotelData.services ?? {},
          };

          return { ...r, hotel };
        });

        setTours(mapped);
      } catch (err) {
        console.error('Error loading hotels:', err);
      }
    };

    if (results.length > 0) load();
  }, [results, countryID, getHotels]);

  return (
    <div
      style={{
        maxWidth: 700,
        padding: 25,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 20,
      }}
    >
      {tours.map((t) => (
        <div
          key={t.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {t.hotel ? (
            <>
              <HotelInfo hotel={t.hotel} showDescription showServices />
              <TourInfo
                startDate={t.startDate}
                endDate={t.endDate}
                amount={t.amount}
                currency={t.currency}
                priceId={t.id}
                hotelId={t.hotel.id.toString()}
              />
            </>
          ) : (
            <div style={{ padding: 20, color: 'red' }}>
              Hotel not found for tour {t.id}, hotelID: {t.hotelID}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
