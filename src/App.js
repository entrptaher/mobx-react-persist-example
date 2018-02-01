import React, { Component } from "react";
import { observer } from "mobx-react";
import store from "./store";

// observe this component renders
@observer
class App extends Component {
  render() {
    return (
      <div>
        <input
          // you can use autobind or arrow functions
          onKeyPress={event => store.updateTitle(event)}
        />
        <h3>Todos</h3>
        <ul>{store.todos.map((e, i) => <li key={i}>{e}</li>)}</ul>
      </div>
    );
  }
}

export default App;
