import React from 'react';
import Navigation from '../../components/navbar/Navigation';
import ArrowUp from '../../components/arrow-up/ArrowUp';
import Quizz from '../../components/minijeux/Quizz';
import Footer from '../../components/footer/Footer';
import GamesMenu from '../../components/minijeux/GamesMenu';


const MiniJeux = () => {
    return (
        <div id='minijeux'>
            <Navigation />
            <ArrowUp />
            <div className="gameMenu">
                <GamesMenu/> 
            </div>
            <Footer />
        </div>
    );
};

export default MiniJeux;