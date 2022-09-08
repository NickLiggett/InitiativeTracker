import React from "react"
import "./ControlForm.css"

class ControlForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            initiative: '',
            ac: '',
            hp: '',
            la: '',
            lr: '',
            mob: false,
            type: ''
        }
    }

    changeHandler(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    clearInputs() {
        this.setState({
            name: '',
            initiative: '',
            ac: '',
            hp: '',
            la: '',
            lr: '',
            mob: false
        })
    }

    render() {
        return (
            <form className="control-form">
                <div className="inputs">
                    <div className="form-input" id="name-input-wrapper">Name: <input value={this.state.name} name="name" id="name-input" type="text" onChange={event => this.changeHandler(event)}/></div>
                    <div className="form-input" id="initiative-input-wrapper">Initiative: <input value={this.state.initiative} name="initiative" id="initiative-input" type="text" onChange={event => this.changeHandler(event)}/></div>
                    <div className="form-input" id="ac-input-wrapper">AC: <input value={this.state.ac} name="ac" id="ac-input" type="text" onChange={event => this.changeHandler(event)}/></div>
                    <div className="form-input" id="hp-input-wrapper">HP: <input value={this.state.hp} name="hp" id="hp-input" type="text" onChange={event => this.changeHandler(event)}/></div>
                    
                    <div className="form-input" id="type-input-wrapper">
                        <div><input type="radio" name="type" value="PC" onChange={event => this.changeHandler(event)}/>PC</div>
                        <div><input type="radio" name="type" value="NPC" onChange={event => this.changeHandler(event)}/>NPC</div>
                        <div><input type="radio" name="type" value="Monster" onChange={event => this.changeHandler(event)}/>Monster</div>
                        <div><input type="radio" name="type" value="Legendary Monster" onChange={event => this.changeHandler(event)}/>Legendary Monster</div>
                    </div>
                    <div className="form-input" id="mob-input-wrapper">Mob: <input id="mob-input" type="checkbox"/></div>   
                    <div className="form-input" id="la-input-wrapper">LA: <input id="la-input" type="text"/></div>
                    <div className="form-input" id="lr-input-wrapper">LR: <input id="lr-input" type="text"/></div>
                </div>
                <div className="button-wrapper">
                    <div className="add-clear-buttons">
                        <button onClick={event => {
                            event.preventDefault()
                            this.props.addToInitiative({
                                name: this.state.name,
                                initiativeRoll: this.state.initiative,
                                ac: this.state.ac,
                                hp: this.state.hp,
                                ra: this.state.ra,
                                la: this.state.la,
                                lr: this.state.lr,
                                mob: this.state.mob,
                                type: this.state.type
                            })
                            this.clearInputs()
                        }}>Add to Initiative</button>
                        <button onClick={event => {
                            event.preventDefault()
                            this.props.clearInitiative()
                        }}>Clear Initiative</button>
                    </div>
                    <div className="navigation-buttons">
                        <button onClick={event => {
                            event.preventDefault()
                            this.props.nextTurn()
                        }}>Next</button>
                        <button onClick={event => {
                            event.preventDefault()
                            this.props.backTurn()
                        }}>Back</button>
                        <button>Top</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default ControlForm