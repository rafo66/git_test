import React from 'react';
import { NavLink } from 'react-router-dom';
import './other.scss';
import illustration from './404-illustration.svg'

const Other = () => {
    return (
        <div id="page404">
            <div id="content">
                <div id='container'>
                    <h1>404 :\</h1>
                    <img id="image" src={illustration} alt='illustration' />
                </div>
                <h2>L'<strong>url</strong> que vous avez entré ne renvoie nulle part !</h2>
                <NavLink to={"/"}>
                    <h3>Retourner en lieu sûr</h3>
                </NavLink>
            </div>
        </div >
    );
};

export default Other;