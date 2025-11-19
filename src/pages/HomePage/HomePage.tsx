import { CountriesList } from '@/components/CountriesList/CountriesList';
import { TourSearch } from '@/components/TourSearch/TourSearch';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.padding}>
        <CountriesList />
      </div>
      <TourSearch />
    </div>
  );
};
