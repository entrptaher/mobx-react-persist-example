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
          onKeyPress={event => store.addTodo(event)}
        />
        <h3>Todos</h3>
        <ul>
          {store.todos.map((e, i) => (
            <li key={e.id} onClick={() => store.removeTodo(e.id)}>
              {e.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
