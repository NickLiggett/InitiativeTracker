import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Headings from "../Headings/Headings";
import InitiativeField from "../InitiativeField/InitiativeField";
import ControlForm from "../ControlForm/ControlForm";
import EditCharacterMenu from "../EditCharacterMenu/EditCharacterMenu";
import dungeonPic from "../../Assets/dungeon.jpeg";
import castleBridge from "../../Assets/castle-bridge.jpeg";
import floatingRocks from "../../Assets/floating-rocks.jpeg";
import nightCity from "../../Assets/night-city.webp";
import d20Icon from "../../Assets/d20-icon.png";
import enchantedForrest from "../../Assets/enchantedForrest.jpg"
import darkForrest from "../../Assets/darkForrest.jpeg"
import shoreCity from "../../Assets/shoreCity.jpg"
import battleAtSea from "../../Assets/battleAtSea.jpeg"

const possibleBackgrounds = [
  dungeonPic,
  castleBridge,
  floatingRocks,
  nightCity,
  enchantedForrest,
  darkForrest,
  shoreCity,
  battleAtSea
];

const characters = [
  {
    name: "Nick",
    initiativeRoll: 13,
    hp: 75,
    currentHP: 75,
    type: "Monster",
    legendaryActions: [],
    legendaryResistances: [],
    reaction: false,
    ac: 18,
    id: 123,
  },
  {
    name: "Alex",
    initiativeRoll: 7,
    hp: 82,
    currentHP: 82,
    legendaryActions: [],
    legendaryResistances: [],
    type: "PC",
    reaction: false,
    ac: 16,
    id: 456,
  },
  {
    name: "Lauren",
    initiativeRoll: 16,
    hp: 78,
    currentHP: 78,
    type: "Legendary",
    legendaryActions: [false, false, false],
    legendaryResistances: [false, false],
    reaction: false,
    ac: 17,
    id: 789,
  },
];

const App = () => {
  const [initiative, setInitiative] = useState(characters);
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState({});
  const [background, setBackground] = useState(possibleBackgrounds[0]);

  if (initiative.length) {
    if (initiative[0].legendaryActions.length) {
      initiative[0].legendaryActions = initiative[0].legendaryActions.map(
        (act) => (act = false)
      );
    }
    if (initiative[0].reaction) {
      initiative[0].reaction = false;
    }
  }

  const cycleBackgrounds = () => {
    possibleBackgrounds.push(possibleBackgrounds[0]);
    possibleBackgrounds.shift();
    setBackground(possibleBackgrounds[0]);
  };

  const nextTurn = () => {
    console.log(initiative)
    let newOrder = initiative;
    newOrder.push(newOrder[0]);
    newOrder.shift();
    newOrder[0].reaction = false;
    setInitiative([...newOrder]);
  };

  const backTurn = () => {
    let newOrder = initiative;
    newOrder.unshift(newOrder[newOrder.length - 1]);
    newOrder.pop();
    setInitiative([...newOrder]);
  };

  const addToInitiative = (event, newCharacter) => {
    event.preventDefault();
    setInitiative([...initiative, newCharacter]);
    document.getElementById("name-input").focus();
  };

  const removeFromInitiative = (event, character) => {
    event.preventDefault();
    setInitiative(initiative.filter((char) => char !== character));
  };

  const sortInitiative = (event) => {
    event.preventDefault();
    setInitiative([
      ...initiative.sort((a, b) => b.initiativeRoll - a.initiativeRoll),
    ]);
  };

  const clearInitiative = (event) => {
    event.preventDefault();
    setInitiative([]);
  };

  const handleKeyPress = (event) => {
    if (
      document.getElementById("name-input") !== document.activeElement &&
      document.getElementById("edit-name") !== document.activeElement &&
      document.getElementById("edit-type") !== document.activeElement
    ) {
      if (event.key === " ") {
        nextTurn();
      } else if (event.key === "b") {
        backTurn();
      } else if (event.key === "s") {
        sortInitiative(event);
      }
    }
  };

  const editCharacter = (characterID) => {
    const theChar = initiative.find(
      (character) => characterID === character.id
    );
    theChar.name = document.getElementById("edit-name").value;
    theChar.initiativeRoll = document.getElementById("edit-initiative").value;
    theChar.ac = document.getElementById("edit-ac").value;
    theChar.hp = document.getElementById("edit-hp").value;
    theChar.type = document.getElementById("edit-type").value;
    if (document.getElementById("edit-legendary-actions")) {
      theChar.legendaryActions.length = document.getElementById(
        "edit-legendary-actions"
      ).value;
      theChar.legendaryResistances.length = document.getElementById(
        "edit-legendary-resistances"
      ).value;
    }
    setShowEditScreen(false);
  };

  useEffect(() => {
    document.querySelector(
      "main"
    ).style.backgroundImage = `url("${background}")`;
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <main>
      <img
        className="toggle-background-button"
        src={d20Icon}
        onClick={() => cycleBackgrounds()}
      />
      <div className="main">
        <Header />
        <Headings />
        <InitiativeField
          initiative={initiative}
          removeFromInitiative={removeFromInitiative}
          setEditedCharacter={setEditedCharacter}
          setShowEditScreen={setShowEditScreen}
        />
        <ControlForm
          addToInitiative={addToInitiative}
          clearInitiative={clearInitiative}
          sortInitiative={sortInitiative}
          nextTurn={nextTurn}
          backTurn={backTurn}
        />
        {showEditScreen && (
          <EditCharacterMenu
            editedCharacter={editedCharacter}
            editCharacter={editCharacter}
            setShowEditScreen={setShowEditScreen}
          />
        )}
      </div>
    </main>
  );
};

export default App;
