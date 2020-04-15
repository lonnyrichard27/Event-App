<template>
<div>
  <h1>Create an Event</h1>
  <!-- <p>This event was created by {{ userId }}</p>
  <ul>
    <li v-for="category in categories" :key="category">{{ category }}</li>
  </ul>
  <p>There are {{ catLength }} categories</p> -->
  <form @submit.prevent="createEvent">
    <label>Select a category</label>
    <select v-model="event.category">
      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
    </select>
    <h3>Name & describe your event</h3>
    <div class="field">
      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Add an event title"/>
    </div>
    <div class="field">
      <label>Description</label>
      <input v-model="event.description" type="text" placeholder="Add a description"/>
    </div>
    <h3>Where is your event?</h3>
    <div class="field">
      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Add a location"/>
    </div>
    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker v-model="event.date" placeholder="Select a date"/>
    </div>
    <div class="field">
      <label>Select a time</label>
      <select v-model="event.time">
        <option v-for="time in times" :key="time">{{ time }}</option>
      </select>
    </div>
    <input type="submit" class="button -fill-gradient" value="Submit"/>
  </form>
</div>
</template>

<script>
// import {mapState} from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  data () {
    // algo for the times data i.e when i is less than or equal to 24 inrement i and add ':00'
    const times = []
    for(let i = 1; i <= 24; i++){
      times.push(i + ':00')
    }
    return{
      // retrieving the categories array from the state
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      this.$store.dispatch('createEvent', this.event)
        .then(() => {
          // routing to this page after the user has finished creating the event
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id}
          })
          this.event = this.createFreshEventObject()
        })
        .catch((error) => {
          console.log('There was a problem creating your event.' + error)
        })
    },
    createFreshEventObject() {
      //getting whatever user is sored within our state
      const user = this.$store.state.user
      // creating a random id for each user
      const id = Math.floor(Math.random() * 100000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
    }
  }
}
  // computed: {
    // this is one of the ways to reference your state in the computed values
    // userName() {
      // referencing the state
    //   return this.$store.state.user.name
    // },
    // userId() {
      // referncing the id
  //     return this.$store.state.user.id
  //   }
  // }
  // accessing the state through getters
  // computed: {
    
      // catLength() {
      //   return this.$store.getters.catLength
      // },
      // the three dots below is known as the object spread operator and it allows us to add additional methods in the computed property despite having the mapState
  //   ...mapState({
  //     userName: state => state.user.name,
  //     userID: state => state.user.id,
  //     categories: state => state.categories
  // })
  // }
}
</script>

<style scoped>
  .field {
    margin-bottom: 24px;
  }
</style>