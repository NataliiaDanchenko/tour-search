import { countryFlags } from '@/constants/countryFlags';
import { getServiceIcon } from '@/constants/getServiceIcon';
import { serviceNames } from '@/constants/serviceNames';
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
      <div className={styles.topInfo}>
        <h1 className={styles.hotelName}>{name}</h1>

        <div className={styles.countryRow}>
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
          <span>{countryName}</span>
        </div>

        <div className={styles.cityRow}>🏙️ {cityName}</div>
      </div>

      {img && (
        <div className={styles.imageWrapper}>
          <img
            src={img}
            alt={name}
            className={styles.hotelImage}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {showDescription && description && (
        <p className={styles.hotelDescription}>{description}</p>
      )}

      {showServices && services && Object.keys(services).length > 0 && (
        <div className={styles.hotelServices}>
          <div className={styles.servicesLabel}>Сервіси:</div>

          <div className={styles.servicesList}>
            {Object.entries(services)
              .filter(([_, value]) => value === 'yes') 
              .map(([service]) => (
                <span key={service} className={styles.hotelService}>
                  <span>
                    {getServiceIcon(service)}
                  </span>
                  {serviceNames[service.toLowerCase()] || service}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
