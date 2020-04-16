import EventService from "@/services/EventService.js";

// ensures that all mutations, Actions and Getters will be namespaced under 'event'
export const namespaced = true

export const state = {
    user: {id: 'abc123', name: 'Adam Jahr'},
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    events: [],
    eventsTotal: 0,
    event: {}
  }
  export const mutations = {
    // the 'events' being passed in as a parameter is a payload
    ADD_EVENT(state,events){
      // pushing the event that we just got
      state.events.push(events)
    },
    SET_EVENTS(state, events){
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  }
  export const actions = {
    // commit in this parameter here gives us access to our mutations that we set
    createEvent({ commit }, event) {
     return EventService.postEvent(event).then(() =>{
      commit('ADD_EVENT', event)
     })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents( perPage, page )
      .then(response => {
        // in this console.log we are printing the total events as seen in the network panel on the browsers devtools cos we want the 'next page link' to stop show on each page meaning we want it to stop when it reaches a particular page
        console.log('Total events are' + response.headers['x-total-count'])
        commit(
          'SET_EVENTS_TOTAL',
          parseInt(response.headers['x-total-count'])
        )
          commit('SET_EVENTS', response.data)
      })
      .catch(error => {
          console.log('There was an error:' + error.response)
      })
    },
    // the function or method below is preventing api to show event details to be called twice
      fetchEvent({ commit, getters }, id) {
// above we're accessing the getters by adding it as a params
        var event = getters.getEventById(id)
        // if we find that event commit it otherwise make the API call
        if (event) {
          commit('SET_EVENT', event)
        } else {
        EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
      }
    }
  }
  // declaring the getters, now we shall access this in our desired component see EventCreate
  export const getters = {
    // preventing api to show event details to be called twice
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    },
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