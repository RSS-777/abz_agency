import successImage from '../../assets/images/success-image.svg';
import styles from './SuccessMessage.module.scss';

export const SuccessMessage = () => (
    <div className={styles['success-message']}>
        <h2 className={styles['success-message__title']}>User successfully registered</h2>
        <img
            src={successImage}
            alt="Successfully registered"
            className={styles['success-message__img']}
        />
        <p className={styles['success-message__copyright']}>© abz.agency specially for the test task</p>
    </div>
);