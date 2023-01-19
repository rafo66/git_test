import React from 'react';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer__container'>
                <p className='p1'>
                    Ce site web à été intégralement réalisé par la classe 712 TSTI2D du lycée Henri Loritz.
                    <br />
                    Il s'inscrit comme document de participation au concours Samuel Paty organisé par l'APHG.
                </p>
                <ul>
                    <li>
                        <a href='https://www.aphg.fr/'>Site de l'APGH</a>
                    </li>
                    <li>
                        <a href='https://github.com/mapfire/Projet-Samuel-Paty'>Consulter le <l>GitHub</l> du site</a>
                    </li>
                </ul>




            </div>
        </div>
    );
};

export default Footer;