import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "../Header/Header";
import Headings from "../Headings/Headings";
import InitiativeField from "../InitiativeField/InitiativeField";
import ControlForm from "../ControlForm/ControlForm";
import EditCharacterMenu from "../EditCharacterMenu/EditCharacterMenu";

const App = () => {
  const [initiative, setInitiative] = useState([
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
  ]);
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState({});

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

  const nextTurn = () => {
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
      theChar.legendaryActions.length = document.getElementById("edit-legendary-actions").value
      theChar.legendaryResistances.length = document.getElementById("edit-legendary-resistances").value
    }
    setShowEditScreen(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <main>
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
    </main>
  );
};

export default App;
