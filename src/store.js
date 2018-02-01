import { observable, action } from "mobx";
import { create, persist } from 'mobx-persist'

class Store {
  @persist @observable title = "Hello from Mobx";

  // various store related actions
  @action updateTitle(event){
    this.title = event.target.value;
  }
}

// create a store and export it
// You can access the store from any component
const store = new Store();
export default store;

// Save in localstorage, it'll be loaded automatically
const hydrate = create({
    storage: localStorage,
    jsonify: true
});
const rehydrate = hydrate('HelloWorld', store).rehydrate

// update localstorage on interval (on all tabs)
setInterval(() => {
    rehydrate().then(() => console.log('rehydrated'))
}, 500)
