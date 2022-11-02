import "./OptionsMenu.css"

const OptionsMenu = ({
  anchorPoint,
  character,
  removeFromInitiative,
  setEditedCharacter,
  setShowEditScreen
}) => {
  const editHandler = () => {
    setShowEditScreen(true)
    setEditedCharacter(character)
  };

  return (
    <ul
      className="menu"
      style={{
        top: anchorPoint.y,
        left: anchorPoint.x,
      }}
    >
      <li className="menu-option" onClick={() => editHandler()}>Edit</li>
      <li className="menu-option" onClick={(event) => removeFromInitiative(event, character)}>
        Delete
      </li>
    </ul>
  );
};

export default OptionsMenu;
