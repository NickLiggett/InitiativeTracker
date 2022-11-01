const OptionsMenu = ({ anchorPoint }) => {

  const clickHandler = (event) => {
    console.log(event.target)
  };

  return (
    <ul
      className="menu"
      style={{
        top: anchorPoint.y,
        left: anchorPoint.x,
      }}
    >
      <li>Edit</li>
      <li onClick={(event) => clickHandler(event)}>Delete</li>
    </ul>
  );
};

export default OptionsMenu;
