import React from "react"
import "./InitiativeField.css"
import Character from "../Character/Character"

const InitiativeField = ({ initiative }) => {
   
    const characters = initiative.map(character => {
        return <Character key={character.name} character={character}/>
    })
    
    return (
        <div className="initiative-wrapper">      
            {characters}
        </div>
    )
}

export default InitiativeField