import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { formatDate } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import styles from './TourInfo.module.scss';

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
  const location = useLocation();

  const isTourPage = location.pathname.startsWith('/tour/');

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
    <div className={styles.tourInfo}>
      <p>
        Дати: {formatDate(startDate)} - {formatDate(endDate)}
      </p>
      <p>Ціна: {formatPrice(amount, currency)}</p>
      {!isTourPage && (
        <button onClick={handleClick} className={styles.button}>
          Відкрити ціну
        </button>
      )}
    </div>
  );
};
