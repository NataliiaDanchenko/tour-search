import React from 'react';
import { useNavigate } from 'react-router-dom';

export type TourInfoProps = {
  startDate: string;
  endDate: string;
  amount: number;
  currency: string;
  priceId?: string;
  hotelId?: string | number;
};

export const TourInfo: React.FC<TourInfoProps> = ({
  startDate,
  endDate,
  amount,
  currency,
  priceId,
  hotelId,
}) => {
  const navigate = useNavigate();

  const formatDate = (date: string) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('uk-UA');
  };

  const formatPrice = (amount: number, currency: string) => {
    return amount != null
      ? `${amount.toLocaleString('uk-UA')} ${currency}`
      : '-';
  };

  const handleClick = () => {
    if (priceId && hotelId != null) {
      navigate(`/tour/${priceId}/${hotelId}`);
    } else {
      console.warn('Cannot navigate: priceId or hotelId is missing', {
        priceId,
        hotelId,
      });
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <p>
        Дати: {formatDate(startDate)} - {formatDate(endDate)}
      </p>
      <p>Ціна: {formatPrice(amount, currency)}</p>
      <button onClick={handleClick}>Відкрити ціну</button>
    </div>
  );
};
