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
      <li onClick={() => editHandler()}>Edit</li>
      <li onClick={(event) => removeFromInitiative(event, character)}>
        Delete
      </li>
    </ul>
  );
};

export default OptionsMenu;
