import React from "react"
import "./Character.css"

class Character extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.character.name,
            initiativeRoll: this.props.character.initiativeRoll,
            ac: this.props.character.ac,
            hp: this.props.character.hp,
            currentHP: this.props.character.hp,
            ra: false,
            la: this.props.character.la,
            lr: this.props.character.lr,
            type: this.props.character.type,
        }
    }

    changeHandler(event) {
        this.setState({ [event.target.name]: event.target.checked })
    }

    handleHP(event) {
        this.setState({ currentHP: parseInt(event.target.value) })
    }

    render() {
        let color
        if (this.state.type === "PC") {
            color = "blue"
        } else if (this.state.type === "NPC") {
            color = "violet"
        } else if (this.state.type === "Monster") {
            color = "red"
        } else if (this.state.type === "Legendary Monster") {
            color = "gold"
        }
        return (
            <div className="character" style={{backgroundColor: color}}>
                <div id="initiative">{this.state.initiativeRoll}</div>
                <div id="name">{this.state.name}</div>
                <div id="ac">{this.state.ac}</div>
                <div id="hp"><input id="hp-box" type="number" value={this.state.currentHP} onChange={event => this.handleHP(event)}/> / {this.state.hp}</div>
                <div id="ra"><input type="checkbox" name="ra" checked={this.state.ra} onChange={event => this.changeHandler(event)}/></div>
                <div id="legendary"></div>
            </div>
        )
    }

}

export default Character