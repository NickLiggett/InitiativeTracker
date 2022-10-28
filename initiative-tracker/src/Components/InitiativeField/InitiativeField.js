import React from "react";
import "./InitiativeField.css";
import Character from "../Character/Character";

const InitiativeField = ({ initiative, reactionHandler, removeFromInitiative }) => {
  const characters = initiative.map((character) => {
    return (
      <Character
        key={character.name}
        character={character}
        initiative={initiative}
        reactionHandler={reactionHandler}
        removeFromInitiative={removeFromInitiative}
      />
    );
  });

  return <div key={Date.now()} className="initiative-wrapper">{characters}</div>;
};

export default InitiativeField;
