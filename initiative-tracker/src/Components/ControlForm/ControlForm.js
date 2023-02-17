import React, { useState } from "react";
import "./ControlForm.css";

const ControlForm = ({
  addToInitiative,
  clearInitiative,
  sortInitiative,
  nextTurn,
  backTurn,
}) => {
  const [name, setName] = useState("");
  const [initiativeRoll, setInitiativeRoll] = useState("");
  const [ac, setAc] = useState("");
  const [hp, setHp] = useState("");
  const [reaction, setRa] = useState(false);
  const [legendaryActions, setLa] = useState([]);
  const [numOfLegActs, setNumOfLegActs] = useState("");
  const [legendaryResistances, setLr] = useState([]);
  const [numOfLegRes, setNumOfLegRes] = useState("");
  const [mob, setMob] = useState(false);
  const [type, setType] = useState("PC");
  const [error, setError] = useState(false);

  const addHandler = (event) => {
    event.preventDefault();
    if (type !== "") {
      for (let i = 0; i < numOfLegActs; i++) {
        legendaryActions.push(false);
      }
      for (let i = 0; i < numOfLegRes; i++) {
        legendaryResistances.push(false);
      }
      addToInitiative(event, {
        name: name,
        initiativeRoll: initiativeRoll,
        ac: ac,
        hp: hp,
        currentHP: hp,
        reaction: reaction,
        legendaryActions: legendaryActions,
        legendaryResistances: legendaryResistances,
        mob: mob,
        type: type,
        id: Date.now(),
      });
      clearInputs();
    } else {
      setError(true);
    }
  };

  const clearInputs = () => {
    setName("");
    setInitiativeRoll("");
    setAc("");
    setHp("");
    setLa([]);
    setLr([]);
    setMob(false);
    setNumOfLegActs("");
    setNumOfLegRes("");
  };

  const radioButtonHandler = (event) => {
    setError(false);
    setType(event.target.value);
  };

  return (
    <form className="control-form">
      <div className="inputs-1">
        <div className="input-wrapper">
          <div className="form-input" id="name-input-wrapper">
            Name:{" "}
            <input
              value={name}
              maxLength={20}
              name="name"
              id="name-input"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
            </div>
            <div className="form-input" id="initiative-input-wrapper">
              Initiative:{" "}
              <input
                value={initiativeRoll}
                name="initiativeRoll"
                id="initiative-input"
                type="text"
                onChange={(event) => setInitiativeRoll(event.target.value)}
              />
            </div>
            <div className="form-input" id="ac-input-wrapper">
              AC:{" "}
              <input
                value={ac}
                name="ac"
                id="ac-input"
                type="text"
                onChange={(event) => setAc(event.target.value)}
              />
            </div>
            <div className="form-input" id="hp-input-wrapper">
              HP:{" "}
              <input
                value={hp}
                name="hp"
                id="hp-input"
                type="text"
                onChange={(event) => setHp(event.target.value)}
              />
            </div>
            {type === "Monster" && (
              <div className="form-input" id="mob-input-wrapper">
                Mob:{" "}
                <input
                  id="mob-input"
                  type="checkbox"
                  onChange={() => setMob(!mob)}
                />
              </div>
            )}
          
        </div>
        <div className="input-wrapper">
          <div className="form-input" id="type-input-wrapper">
            <div>
              <input
                type="radio"
                name="type"
                className="type-radio-button"
                id="PC"
                value="PC"
                onChange={(event) => radioButtonHandler(event)}
                checked={type === "PC" ? "checked" : false}
              />
              PC
            </div>
            <div>
              <input
                type="radio"
                name="type"
                className="type-radio-button"
                id="NPC"
                value="NPC"
                onChange={(event) => radioButtonHandler(event)}
              />
              NPC
            </div>
            <div>
              <input
                type="radio"
                name="type"
                className="type-radio-button"
                id="Monster"
                value="Monster"
                onChange={(event) => radioButtonHandler(event)}
              />
              Monster
            </div>
            <div>
              <input
                type="radio"
                name="type"
                className="type-radio-button"
                id="Legendary"
                value="Legendary"
                onChange={(event) => radioButtonHandler(event)}
              />
              Legendary
            </div>
            <div>
              <input
                type="radio"
                name="type"
                className="type-radio-button"
                id="Other"
                value="Other"
                onChange={(event) => radioButtonHandler(event)}
              />
              Other
            </div>
          </div>
          {type === "Legendary" && (
            <div className="legendary-input-wrapper">
              <div className="form-input" id="legendaryActions-input-wrapper">
                Legendary Actions:
                <input
                  id="legendaryActions-input"
                  type="text"
                  value={numOfLegActs}
                  onChange={(event) => setNumOfLegActs(event.target.value)}
                />
              </div>
              <div
                className="form-input"
                id="legendaryResistances-input-wrapper"
              >
                Legendary Resistances:
                <input
                  id="legendaryResistances-input"
                  type="text"
                  value={numOfLegRes}
                  onChange={(event) => setNumOfLegRes(event.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="button-wrapper">
        <div className="add-clear-buttons">
          <button id="add-button" onClick={(event) => addHandler(event)}>
            Add
          </button>
          <button
            id="clear-button"
            onClick={(event) => {
              clearInitiative(event);
            }}
          >
            Clear
          </button>
          <button id="sort-button" onClick={(event) => sortInitiative(event)}>
            Sort
          </button>
        </div>
        <div className="navigation-buttons">
          <button
            id="next-button"
            onClick={(event) => {
              event.preventDefault();
              nextTurn();
            }}
          >
            Next
          </button>
          <button
            id="back-button"
            onClick={(event) => {
              event.preventDefault();
              backTurn();
            }}
          >
            Back
          </button>
          <button id="top-button" onClick={(event) => event.preventDefault()}>
            Top
          </button>
        </div>
      </div>
    </form>
  );
};

export default ControlForm;
