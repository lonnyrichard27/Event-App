<template>
  <div>
      <div class="event-header">
        <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
        <h1 class="title">{{ event.title }}</h1>
        <!-- the code below is a shorthand for a conditional statement stating that if the user has a name the system should show and then if not it should display an empty string -->
        <h5>Organized by {{ event.organizer.name ? event.organizer.name : '' }}</h5>
        <h5>Category: {{ event.category }}</h5>
      </div>
      <BaseIcon name="map"><h2>Location</h2></BaseIcon>
      <address>{{ event.location }}</address>
      <h2>Event details</h2>
      <p>{{ event.description }}</p>
      <h2>Attendees
        <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
      </h2>
      <ul class="list-group">
        <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
          <b>{{ attendee.name }}</b>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ['id'],
  created() {
    // we're adding 'event' before the ferchEvent because we have set the namespaced to true in the event.js module we should do this in all of our components and views but we're doing it here for demo sake
    this.$store.dispatch("event/fetchEvent", this.id)
},

// here's the original access from the state the ones below are accessed from a folder in the module folder 
// computed: mapState(['event'])

// below we are accessing from the 'event' module but instead pof changing event in all of our code we make it an object and map it through
computed: mapState({
  event: state => state.event.event
})
  
}
</script>

<style scoped>
   .location {
      margin-bottom: 0;
    }
    .location > .icon {
      margin-left: 10px;
    }
    .event-header > .title {
      margin: 0;
    }
    .list-group {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .list-group > .list-item {
      padding: 1em 0;
      border-bottom: solid 1px #e5e5e5;
    }
</style>