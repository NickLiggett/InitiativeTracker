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
      initiative: [{name: "Nick", initiativeRoll: 19, hp: 80, type: "Monster"}, {name: "Alex", initiativeRoll: 17, hp: 80, type: "Monster"}, {name: "Lauren", hp: 80, initiativeRoll: 16, type: "Legendary Monster"}]
      
    }
  }

  nextTurn = () => {
    let newOrder = this.state.initiative
    newOrder.push(newOrder[0])
    newOrder.shift()
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
          <InitiativeField initiative={this.state.initiative}/>
          <ControlForm addToInitiative={this.addToInitiative} clearInitiative={this.clearInitiative} nextTurn={this.nextTurn}/>
      </main>
    )
  }
}

export default App