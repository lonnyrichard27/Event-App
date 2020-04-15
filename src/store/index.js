import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {id: 'abc123', name: 'Adam Jahr'},
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    events: []
  },
  mutations: {
    ADD_EVENT(state,events){
      // pushing the event that we just got
      state.events.push(events)
    }
  },
  actions: {
    createEvent({ commit }, event) {
     return EventService.postEvent(event).then(() =>{
      commit('ADD_EVENT', event)
     })
    }
  },
  modules: {},
  // declaring the getters, now we shall access this in our desired component see EventCreate
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      // filtering the todos by the ones that are done
      return state.todos.filter(todo => todo.done)
    },
    // getting the todos that are not done
    activeTodosCount: state => {
      return state.todos.filter(todo => !todo.done)
    }
  }
})
