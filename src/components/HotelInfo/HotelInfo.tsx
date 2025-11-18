import { countryFlags } from '@/constants/countryFlags';
import styles from './HotelInfo.module.scss';

export type HotelInfoProps = {
  hotel: {
    id: string | number;
    name: string;
    img: string;
    cityName: string;
    countryName: string;
    countryId: string;
    description?: string;
    services?: Record<string, string>;
  } | null;
  showDescription?: boolean;
  showServices?: boolean;
};

export const HotelInfo: React.FC<HotelInfoProps> = ({
  hotel,
  showDescription = true,
  showServices = true,
}) => {
  if (!hotel) {
    return <div className={styles.hotelError}>Hotel data not available</div>;
  }

  const { name, img, cityName, countryName, countryId, description, services } =
    hotel;

  return (
    <div className={styles.hotelInfo}>
      {img && (
        <img
          src={img}
          alt={name}
          className={styles.hotelImage}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      )}

      <div className={styles.hotelDetails}>
        <div className={styles.hotelHeader}>
          {countryId && countryFlags[countryId] && (
            <img
              src={`https://flagcdn.com/24x18/${countryFlags[countryId]}.png`}
              alt={`${countryName} flag`}
              className={styles.hotelFlag}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <h3 className={styles.hotelName}>{name}</h3>
        </div>

        <p className={styles.hotelLocation}>
          {cityName}, {countryName}
        </p>

        {showDescription && description && (
          <p className={styles.hotelDescription}>{description}</p>
        )}

        {showServices && services && Object.keys(services).length > 0 && (
          <div className={styles.hotelServices}>
            {Object.entries(services).map(([service, value]) => (
              <span
                key={service}
                className={`${styles.hotelService} ${
                  value === 'yes' ? styles.yes : styles.no
                }`}
              >
                {service.toUpperCase()}: {value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
