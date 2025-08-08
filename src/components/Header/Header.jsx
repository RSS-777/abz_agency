import { Button } from "../Button/Button";
import styles from './Header.module.scss';
import logoImage from '../../assets/images/Logo.svg'

const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
};

export const Header = () => {
    return (
        <header className={styles['header']}>
            <div className={styles['header__container']}>
                <img className={styles['header__images']} src={logoImage} alt="Image logo" />
                <nav className={styles['header__buttons']}>
                    <Button label='Users' onClick={() => handleScrollTo('users')} />
                    <Button label='Sign up' onClick={() => handleScrollTo('sign-up')} />
                </nav>
            </div>
        </header>
    )
};