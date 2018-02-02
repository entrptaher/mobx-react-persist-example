import { observable, action, autorun } from "mobx";
import { create, persist } from "mobx-persist";

function randomString(len = 16, charSet) {
  charSet =
    charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var randomString = "";
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

class Store {
  @persist("list")
  @observable
  todos = [{ id: randomString(), text: "Hello from Mobx" }];

  // various store related actions
  @action
  addTodo(event) {
    const text = event.target.value;

    // if user presses Enter and the input field has value
    if (event.key === "Enter" && text && text.length) {
      // add to list
      this.todos.push({
        id: randomString(),
        text
      });

      // empty the input
      event.target.value = "";
    }
  }

  @action
  removeTodo(todoId) {
    const todoIndex = this.todos.findIndex(e => e.id === todoId);
    this.todos.splice(todoIndex, 1);
  }
}

// create a store and export it
// You can access the store from any component
const store = new Store();
export default store;

// OPTIONALS

// Save in localstorage, it'll be loaded automatically
const hydrate = create({
  storage: localStorage,
  jsonify: true
});
const rehydrate = hydrate("HelloWorld", store).rehydrate;

// update localstorage on interval (on all tabs)
setInterval(() => {
  rehydrate();
}, 500);
