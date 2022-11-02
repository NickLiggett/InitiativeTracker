import React from "react";
import "./InitiativeField.css";
import Character from "../Character/Character";

const InitiativeField = ({ initiative, removeFromInitiative, setEditedCharacter, setShowEditScreen }) => {
  const characters = initiative.map((character) => {
    return (
      <Character
        key={character.name}
        character={character}
        initiative={initiative}
        removeFromInitiative={removeFromInitiative}
        setEditedCharacter={setEditedCharacter}
        setShowEditScreen={setShowEditScreen}
      />
    );
  });

  return <div key={Date.now()} className="initiative-wrapper">{characters}</div>;
};

export default InitiativeField;
