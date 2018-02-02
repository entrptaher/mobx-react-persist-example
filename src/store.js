import { observable, action, autorun } from "mobx";

function randomString(len = 16, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}

class Store {
  @observable todos = [{ id: randomString(), text: "Hello from Mobx" }];

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

// this will run everytime there is a change in store
autorun(() => {
  console.log(store.todos.length);
});

export default store;
window.store = store;
