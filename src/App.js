import React from 'react';
//bibliothèques :
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages :
import Home from './pages/home/Home';
import Projet from './pages/projet/Projet';
import MiniJeux from './pages/minijeux/MiniJeux';
import Credits from './pages/credits/Credits';
import Other from './pages/other/Other';



const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projet" element={<Projet />} />
        <Route path="/mini-jeux" element={<MiniJeux />} />
        <Route path="/credits" element={<Credits />} />
        {/* path="*" fonctionne si l'url ne correspond à rien de déclaré au dessus*/}
        <Route path="*" element={<Other />} />
      </Routes>
    </BrowserRouter> 
    </>);
};

export default App;