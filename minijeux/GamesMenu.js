import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ElementGame  from "./Game1";

export default function GamesMenu({}) {

    const gameList = [
        {id: uuidv4(), name: "Game1", component: "Game1"},
        {id: uuidv4(), name: "Game2", component: "Game2"},
        {id: uuidv4(), name: "Game3", component: "Game3"},
        {id: uuidv4(), name: "Game4", component: "Game4"},
        {id: uuidv4(), name: "Un jeu au hazard", component: "Game5"}
    ];


    const [selectedGame, setSelectedGame] = useState(null);
    const [menuDeroulantOuvert, setMenuDeroulantOuvert] = useState(false);
    const [isSelectionButton, setSelectionButton] = useState(false);
    const [menuGlobalOuvert, setMenuGlobalOuvert] = useState(false);

    const menuRef = useRef(null);


    // au chargement, charger un jeu au hazard
    useEffect(() => {
        setSelectedGame(gameList[gameList.length - 1]);
        setSelectionButton(true);
        setMenuGlobalOuvert(true);
      }, []);



    function Play(){
        if(selectedGame.component === "Game5"){
            const random = Math.floor(Math.random() * (gameList.length-1));
            setSelectedGame(gameList[random]);
        }
        
        console.log(selectedGame.component);
        setMenuGlobalOuvert(false);
    }

    function loadGame(){
        try{
          return (
            <div>
              <ElementGame /> 
            </div>
          );
        }catch(error){
            console.log(error);
        }
    }




    


    // Menu déroulant LOGIQUE
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuDeroulantOuvert(false);
          setSelectionButton(true);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };

    }, [menuRef]);


    function handleMenuClick() {
        setMenuDeroulantOuvert((prevState) => !prevState);
        setSelectionButton(false);
    }
    function handleGameClick(game) {
        setSelectedGame(game);
        setMenuDeroulantOuvert(false);
        setSelectionButton(true);
    }
    // Menu déroulant LOGIQUE



     
    return (
      <>
        {menuGlobalOuvert && (
        <div className="gameMenu">

          <button className="button" onClick={(event) => Play(event)}>
            Jouer
          </button>

          <h1>à</h1>

          <div>

            {isSelectionButton && (
              <button className="button"  onClick={handleMenuClick}>
              {selectedGame ? selectedGame.name : "Sélectionner un jeu"}
              </button>
            )}

            {/*Menu déroulant*/}
            {menuDeroulantOuvert && (
               <div ref={menuRef}>
                 {gameList.map((game) => ( 
                     // Chaque ligne pour un jeu
                   <button className="button" key={game.id} onClick={() => handleGameClick(game)}>
                     {game.name}
                   </button> 
                 ))}
               </div>
            )}
          </div>
        </div>
        )}

        {selectedGame && !menuGlobalOuvert && (
            <div>
                {loadGame()}
            </div>
        )}
      </>
    );
}