import React from "react"
import "./App.css"
import Header from "../Header/Header"
import Headings from "../Headings/Headings"
import InitiativeField from "../InitiativeField/InitiativeField"
import ControlForm from "../ControlForm/ControlForm"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      initiative: [
        {name: "Nick", initiativeRoll: 19, hp: 80, type: "Monster", ra: false}, 
        {name: "Alex", initiativeRoll: 17, hp: 80, type: "PC", ra: false}, 
        {name: "Lauren", hp: 80, initiativeRoll: 16, type: "Legendary Monster", ra: false}
    ]
    }
  }

  nextTurn = () => {
    let newOrder = this.state.initiative
    newOrder.push(newOrder[0])
    newOrder.shift()
    newOrder[0].ra = false
    this.setState({ initiative: newOrder })
  }

  onDragStart = (event, name) => {
    console.log('dragstart: ', name, event)
  }

  reactionHandler = (state) => {
    let theOrder = this.state.initiative
    let character = theOrder.find(char => char.name === state.name)

    if (state.ra) {
      state.ra = false
    } else {
      state.ra = true
    }

    theOrder.splice(theOrder.indexOf(character), 1, state)
   
    this.setState({ initiative: theOrder })
  }

  backTurn = () => {
    let newOrder = this.state.initiative
    newOrder.unshift(newOrder[newOrder.length - 1])
    newOrder.pop()
    this.setState({ initiative: newOrder })
  }

  addToInitiative = (newCharacter) => {
    this.setState({ initiative: [...this.state.initiative, newCharacter].sort((a, b) => b.initiativeRoll - a.initiativeRoll) })
  }

  clearInitiative = () => {
    this.setState({ initiative: [] })
  }

  render() {
    return (
      <main>
          <Header />
          <Headings />
          <InitiativeField initiative={this.state.initiative} reactionHandler={this.reactionHandler} onDragStart={this.onDragStart}/>
          <ControlForm 
          addToInitiative={this.addToInitiative} 
          clearInitiative={this.clearInitiative} 
          nextTurn={this.nextTurn} 
          backTurn={this.backTurn}/>
      </main>
    )
  }
}

export default App