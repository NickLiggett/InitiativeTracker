import { useState } from "react";

const EditCharacterMenu = ({
  editedCharacter,
  editCharacter,
  setShowEditScreen,
}) => {
  const { name, ac, initiativeRoll, hp, type, legendaryActions } = editedCharacter;

  const [editedName, setEditedName] = useState(name);
  const [editedAc, setEditedAc] = useState(ac);
  const [editedInitiative, setEditedInitiative] = useState(initiativeRoll)
  const [editedHp, setEditedHp] = useState(hp)
  const [editedType, setEditedType] = useState(type)
  const [editedLegActs, setEditedLegActs] = useState(legendaryActions.length)
  const [editedLegRes, setEditedLegRes] = useState(legendaryActions.length)

  return (
    <div className="edit-screen">
      <h3>Character Editor</h3>
      <p>
        Initiative:{" "}
        <input
          type="text"
          id="edit-initiative"
          value={editedInitiative}
          onChange={(event) => setEditedInitiative(event.target.value)}
        />
      </p>
      <p>
        Name:{" "}
        <input
          type="text"
          id="edit-name"
          value={editedName}
          onChange={(event) => setEditedName(event.target.value)}
        />
      </p>
      <p>
        AC:{" "}
        <input
          type="text"
          id="edit-ac"
          value={editedAc}
          onChange={(event) => setEditedAc(event.target.value)}
        />
      </p>
      <p>
        Max HP:{" "}
        <input type="text" id="edit-hp" value={editedHp} onChange={(event) => setEditedHp(event.target.value)}/>
      </p>
      <p>
        Type:{" "}
        <input type="text" id="edit-type" value={editedType} onChange={(event) => setEditedType(event.target.value)}/>
      </p>
        {editedType === "Legendary" && <div>
          <p>
            Legendary Actions:{" "}
            <input
              type="text"
              id="edit-legendary-actions"
              value={editedLegActs}
              onChange={(event) => setEditedLegActs(event.target.value)}
            />
          </p>
          <p>
            Legendary Resistances:{" "}
            <input
              type="text"
              id="edit-legendary-resistances"
              value={editedLegRes}
              onChange={(event) => setEditedLegRes(event.target.value)}
            />
          </p>
        </div>}
      
      <div className="edit-button-wrapper">
        <button onClick={() => editCharacter(editedCharacter.id)}>
          Submit
        </button>
        <button onClick={() => setShowEditScreen(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default EditCharacterMenu;
