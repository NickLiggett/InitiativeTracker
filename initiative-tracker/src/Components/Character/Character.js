import { useState } from "react";
import "./Character.css";
import cross from "../../Assets/cross.png";

const Character = ({
  character,
  initiative,
  reactionHandler,
  removeFromInitiative,
}) => {
  const {
    name,
    ac,
    hp,
    initiativeRoll,
    legendaryActions,
    legendaryResistances,
    mob,
    reaction,
    type,
  } = character;

  const [isChecked, setChecked] = useState(false);
  const [usedReaction, setUsedReaction] = useState(reaction)

  const changeHandler = (event) => {
    let theChar = initiative.find((char) => char.name === event.target.id);
    theChar.reaction = !theChar.reaction
    setChecked(!isChecked);

  }

  const actionCheckboxHandler = (event, i) => {
    let theChar = initiative.find((char) => char.name === event.target.id);
    theChar.legendaryActions[i] = !theChar.legendaryActions[i];
    setChecked(!isChecked);
  };

  const resistancesCheckboxHandler = (event, i) => {
    let theChar = initiative.find((char) => char.name === event.target.id);
    theChar.legendaryResistances[i] = !theChar.legendaryResistances[i];
    setChecked(!isChecked);
  };

  const legendaryActionBoxes = [];
  for (let i = 0; i < legendaryActions.length; i++) {
    legendaryActionBoxes.push(
      <input
        key={i}
        className="legendary-checkbox"
        type="checkbox"
        id={name}
        checked={legendaryActions[i]}
        onChange={(event) => actionCheckboxHandler(event, i)}
      ></input>
    );
  }

  const legendaryResistanceBoxes = [];
  for (let i = 0; i < legendaryResistances.length; i++) {
    legendaryResistanceBoxes.push(
      <input
        key={i}
        className="legendary-checkbox"
        type="checkbox"
        id={name}
        checked={legendaryResistances[i]}
        onChange={(event) => resistancesCheckboxHandler(event, i)}
      ></input>
    );
  }



  const handleHP = (event) => {
    let theChar = initiative.find((char) => char.name === event.target.id);
    theChar.currentHP = event.target.value;
  };

  const dragStart = (event) => {
    event.preventDefault();
  };

  let color;

  if (type === "PC") {
    color = "rgb(19 148 255 / 0.5)";
  } else if (type === "NPC") {
    color = "rgb(113 0 195 / 50%)";
  } else if (type === "Monster") {
    color = "rgb(255 0 0 / 0.5)";
  } else if (type === "Legendary") {
    color = "rgb(255 209 0 / 50%)";
  }

  return (
    <div
      className="character"
      style={{ backgroundColor: color }}
      onDragStart={(event) => dragStart(event)}
      draggable
    >
      <div id="initiative">{initiativeRoll}</div>
      <div id="name">{name}</div>
      <div id="ac">{ac}</div>
      <div id="hp">
        <input
          className="hp-box"
          id={name}
          type="number"
          defaultValue={character.currentHP}
          onChange={(event) => handleHP(event)}
        />{" "}
        / {hp}
      </div>
      <div id="reaction">
        <input
          type="checkbox"
          name="reaction"
          checked={reaction}
          id={name}
          onChange={(event) => {
            changeHandler(event);
          }}
        />
      </div>
      <div id="legendary">
        {type === "Legendary" && (
          <div>
            <div className="legendary-checkboxes">
              Legendary Actions: {legendaryActionBoxes}
            </div>
            <div className="legendary-checkboxes">
              Legendary Resistances: {legendaryResistanceBoxes}
            </div>
          </div>
        )}
      </div>
      <img
        src={cross}
        className="delete-icon"
        onClick={(event) => removeFromInitiative(event, character)}
      />
    </div>
  );
};

export default Character;
