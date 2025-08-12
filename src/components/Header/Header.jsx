import { useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { Button } from "../Button/Button";
import { handleScrollTo } from "../../utils/scroll";
import logoImage from '../../assets/images/Logo.svg';

export const Header = () => {
    const isSuccess = useSelector(state => state.auth.isSuccess)

    return (
        <header className={styles['header']}>
            <div className={styles['header__container']}>
                <img className={styles['header__images']} src={logoImage} alt="Image logo" />
                <nav className={styles['header__buttons']}>
                    <Button label='Users' onClick={() => handleScrollTo('users')} />
                    {!isSuccess && <Button label='Sign up' onClick={() => handleScrollTo('sign-up')} />} 
                </nav>
            </div>
        </header>
    )
};