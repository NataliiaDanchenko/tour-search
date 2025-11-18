import { CountriesList } from '@/components/CountriesList/CountriesList';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <CountriesList />
    </div>
  );
};
