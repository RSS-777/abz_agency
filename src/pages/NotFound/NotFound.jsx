import styles from './NotFound.module.scss';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate()

  const handleLink = () => {
    navigate('/')
  }

  return (
    <main className={styles['not-found']}>
      <h1 className={styles['not-found__title']}>404</h1>
      <p className={styles['not-found__text']}>Сторінку не знайдено</p>
      <Button label='На головну' onClick={handleLink} />
    </main>
  );
};

export default NotFound;