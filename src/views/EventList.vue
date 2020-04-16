<template>
<div>
    <!-- in the code below there are two 'user' because the we're importing state from the modules folder we created so the first 'user' is the module name while the second 'user' is the state -->
    <h1>Events for {{ user.user.name }}</h1>
    <!-- u can see here that we're also accessing from the 'event' modules -->
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <!-- the code below is that only show previous link if not on first page -->
    <template v-if="page != 1">
        <router-link :to="{name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link> | 
    </template>
    <!-- below is the pagination link that shows previous and next 'rel' in this context allows google to know that we're paginating -->
   
    <router-link :to="{name: 'event-list', query: { page: page + 1 } }" rel="next">Next Page</router-link>
     <!-- end of pagination -->
</div>
  
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";

export default {
components: {
    EventCard
},
created() {
    this.$store.dispatch('fetchEvents', {
        perPage: 3,
        // below we're accessing the page properties
        page: this.page
    })
    // this eventservice is a way of preventing too much api calls in our app so i created a services folder and put in a .js file which consists of the api call and other little functionalities which will make our app more modular
},
// this code below fetches the data and populates it in the card
computed: {
    //the page() method is trying to show the page we're in on the url route, and it assumes that if theres no URL query parameters assume we're on the first page thats why the '1' is there
    page() {
        return parseInt(this.$route.query.page) || 1
    }, 
    // stop displaying 'nextpage' on every page
     hasNextPage() {
    //   return this.eventsTotal > this.page * this.perPage
    //  below is referencing from the 'event' module 
          return this.event.eventsTotal > this.page * this.perPage
    },
    // ...mapState(['events', 'eventsTotal', 'user'])
    // below we're referencing the module name 'event'
     ...mapState(['event', 'eventsTotal', 'user'])
}
       
}
</script>

<style scoped>

</style>
// inside this component we're calling the actions in our state and inside the action we're calling our api, retrieveing the data and commit the mutation after which the mutation sets the state and then in turn the state renders our list of events
// note: $route is used to access our routing system