import React, { useEffect, useState } from 'react';
import type { TourPrice } from '@/hooks/useTourSearch';
import { useHotelsCache } from '@/hooks/useHotelsCache';
import { HotelInfo, type HotelInfoProps } from '../HotelInfo/HotelInfo';
import { TourInfo } from '../TourInfo/TourInfo';
import styles from './TourCards.module.scss';

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

        const mapped = results.map((r) => {
          const hotelData: any = hotels[r.hotelID] || hotels[Number(r.hotelID)];

          if (!hotelData) return { ...r, hotel: null };

          const hotel: NonNullable<HotelInfoProps['hotel']> = {
            id: hotelData.id,
            name: hotelData.name,
            img: hotelData.img,
            cityName: hotelData.cityName,
            countryName: hotelData.countryName,
            countryId: hotelData.countryId ? String(hotelData.countryId) : '',
            description: hotelData.description ?? '',
            services: hotelData.services ?? {},
          };

          return { ...r, hotel };
        });

        const sorted = mapped.sort((a, b) => a.amount - b.amount);
        setTours(sorted);
      } catch (err) {
        console.error('Error loading hotels:', err);
      }
    };

    if (results.length > 0) load();
  }, [results, countryID]);

  return (
    <div className={styles.tourCardsWrapper}>
      {tours.map((t) => (
        <div key={t.id} className={styles.tourCard}>
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
            <div className={styles.hotelNotFound}>
              Hotel not found for tour {t.id}, hotelID: {t.hotelID}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
