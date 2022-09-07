import React from "react"
import "./Headings.css"

const Headings = () => {
    return (
        <div className="headings">
            <div className="heading" id="initiative-heading">Initiative</div>
            <div className="heading" id="name-heading">Name</div>
            <div className="heading" id="ac-heading">AC</div>
            <div className="heading" id="hp-heading">HP</div>
            <div className="heading" id="ra-heading">RA</div>
            <div className="heading" id="legendary-heading">Legendary Options</div>
          </div>
    )
}

export default Headings