import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "../Header/Header";
import Headings from "../Headings/Headings";
import InitiativeField from "../InitiativeField/InitiativeField";
import ControlForm from "../ControlForm/ControlForm";
import OptionsMenu from "../OptionsMenu/OptionsMenu";

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
    },
  ]);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setAnchorPoint, setShow]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document
      .querySelectorAll(".character")
      .forEach((element) =>
        element.addEventListener("contextmenu", handleContextMenu)
      );
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document
        .querySelectorAll(".character")
        .forEach((element) =>
          element.removeEventListener("contextmenu", handleContextMenu)
        );
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyPress);
    };
  })

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

  const reactionHandler = (state) => {
    let theOrder = initiative;
    let character = theOrder.find((char) => char.name === state.name);

    if (state.reaction) {
      state.reaction = false;
    } else {
      state.reaction = true;
    }

    theOrder.splice(theOrder.indexOf(character), 1, state);

    setInitiative(theOrder);
  };

  const backTurn = () => {
    let newOrder = initiative;
    newOrder.unshift(newOrder[newOrder.length - 1]);
    newOrder.pop();
    setInitiative([...newOrder]);
  };

  const addToInitiative = (event, newCharacter) => {
    event.preventDefault();
    if (newCharacter.type !== "") {
      setInitiative([...initiative, newCharacter]);
    } else {
      console.log("You must select a Type");
    }
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
    if (document.querySelector("#name-input") !== document.activeElement) {
      if (event.key === " ") {
        nextTurn();
      } else if (event.key === "b") {
        backTurn();
      } else if (event.key === "s") {
        sortInitiative(event);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <main>
      <Header />
      <Headings />
      <InitiativeField
        initiative={initiative}
        reactionHandler={reactionHandler}
        removeFromInitiative={removeFromInitiative}
        // onDragStart={onDragStart}
      />
      <ControlForm
        addToInitiative={addToInitiative}
        clearInitiative={clearInitiative}
        sortInitiative={sortInitiative}
        nextTurn={nextTurn}
        backTurn={backTurn}
      />
      {show && <OptionsMenu anchorPoint={anchorPoint} />}
    </main>
  );
};

export default App;
