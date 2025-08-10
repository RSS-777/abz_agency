import { Header } from "../../components/Header/Header";
import { SectionHero } from "../../components/SectionHero/SectionHero";
import { SectionUsers } from "../../components/SectionUsers/SectionUsers";
import { SectionForm } from "../../components/SectionForm/SectionForm";
import style from './Home.module.scss'
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home - ABZ Agency</title>
                <meta name="description" content="Test assignment for ABZ Agency — displaying users and registration form." />
                <meta name="keywords" content="React, test assignment, ABZ Agency, users" />
            </Helmet>
            <Header />
            <main className={style['home']}>
                <SectionHero />
                <SectionUsers />
                <SectionForm />
            </main>
        </>
    )
};

export default Home;