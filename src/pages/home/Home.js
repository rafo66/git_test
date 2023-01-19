import React from 'react';
import Navigation from '../../components/navbar/Navigation';
import Footer from '../../components/footer/Footer';
import ArrowUp from '../../components/arrow-up/ArrowUp';

const Home = () => {
    return (
        <div id='home'>
            <Navigation />
            <ArrowUp />
            <div className="content">
                <div className='grid'>
                    <div className='element' id="element1"><h1>Titre 1</h1></div>
                    <div className='element' id="element2"><h1>Titre 2</h1></div>
                    <div className='element' id="element3"><h1>Titre 3</h1></div>
                    <div className='element' id="element4"><h1>Titre 4</h1></div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;