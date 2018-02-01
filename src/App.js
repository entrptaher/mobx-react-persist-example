import React, {Component} from 'react';
import {observer} from "mobx-react";
import store from './store';

// observe this component renders
@observer
class App extends Component {
  render() {
    return (
      <div>
        <h1>{store.title}</h1>
        <input
          value={store.title}
          // you can use autobind or arrow functions
          onChange={(event)=>store.updateTitle(event)}
        />
      </div>
    );
  }
}

export default App;
