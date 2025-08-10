import { Header } from "../../components/Header/Header";
import { SectionHero } from "../../components/SectionHero/SectionHero";
import { SectionUsers } from "../../components/SectionUsers/SectionUsers";
import { SectionForm } from "../../components/SectionForm/SectionForm";
import style from './Home.module.scss'

const Home = () => {
    return (
        <>
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