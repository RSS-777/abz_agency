import styles from './SectionHero.module.scss';
import { Button } from '../Button/Button';
import { useSelector } from 'react-redux';

const handleScrollToSignUp = () => {
    const element = document.getElementById('sign-up')

    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
};

export const SectionHero = () => {
    const isSuccess = useSelector(state => state.auth.isSuccess)

    return (
        <section className={styles['section-hero']}>
            <div className={styles['section-hero__text-block']}>
                <h1 className={styles['section-hero__title']}>Test assignment for front-end developer</h1>
                <p className={styles['section-hero__text']}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                <Button label='sign-up' onClick={handleScrollToSignUp} disabled={isSuccess} />
            </div>
        </section>
    )
};