import { observable, action, autorun } from "mobx";
import { create, persist } from "mobx-persist";

class Store {
  @observable todos = ["Hello from Mobx"];

  // various store related actions
  @action
  updateTitle(event) {
    if (event.key === "Enter") {
      const todo = event.target.value;
      if (todo) {
        this.todos.push(event.target.value);
        event.target.value = "";
      }
    }
  }
}

// create a store and export it
// You can access the store from any component
const store = new Store();

autorun(() => {
  console.log(store.todos.length);
});

export default store;
