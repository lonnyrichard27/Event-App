<template>
<div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
</div>
  
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";

export default {
    components: {
        EventCard
    },
    data() {
        return{
            events: []
        }
    },
    created() {
        // this eventservice is a way of preventing too much api calls in our app so i created a services folder and put in a .js file which consists of the api call and other little functionalities which will make our app more modular
        
        EventService.getEvents()
        .then(response => {
            this.events = response.data
        })
        .catch(error => {
            console.log('There was an error:' + error.response)
        })
    }
}
</script>

<style scoped>

</style>