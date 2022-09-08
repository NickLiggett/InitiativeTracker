import React from "react"
import "./InitiativeField.css"
import Character from "../Character/Character"
// import Draggable from "react-draggable"

const InitiativeField = ({ initiative, reactionHandler, onDragStart }) => {
   
    const characters = initiative.map(character => {
        return <Character 
        key={character.name} 
        character={character} 
        initiative={initiative} 
        reactionHandler={reactionHandler}
        onDragStart={event => onDragStart(event, character.name)}/>
    })
    
    return (
        <div className="initiative-wrapper">

            {characters}
        </div>
    )
}

export default InitiativeField