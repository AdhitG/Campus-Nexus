Myregistrations.vue
 <template>
 <head>
 <meta name="viewport" content="width=device-width, initial-scale = 10">
 </head>
 <body>
 <div class="navbar">
 <ul>
 <li><a href="/">CampusNexus</a></li>
 </ul>
 </div>
 <h1 style="color: #82001A; text-align:center">My Registrations</h1>
 <div class="container">
 <div class="row row-cols-3">
 <div v-for="i in myreg" class="col-6 col-md-4" style="margin-bottom: 20px;">
 <div class="card mb-3 h-100" style="max-width: 540px;">
 <div class="row g-0 h-100">
 <div class="col-md-4" style="padding-bottom: 0;">
 <img :src="i['event']['poster']" class="img-fluid rounded-start h-100"
 style="object-fit: cover;">
 </div>
 <div class="col-md-8">
 <div class="card-body d-flex flex-column justify-content-between"
 style="padding-bottom: 0;">
 <h4 class="card-title">{{ i['event']['event_name'] }}</h4>
 <p class="card-text">{{ i['event']['description'] }}</p>
 <span><strong><i class="bi bi-calendar-event" style="font-size:
 1rem;"></i> {{ i['event']['date'] }}</strong></span>
 <span><strong><i class="bi bi-clock" style="font-size: 1rem;"></i> {{
 i['event']['time'] }}</strong></span>
 <span><strong><i class="bi bi-geo-alt" style="font-size: 1rem;"></i> {{
 i['event']['venue'] }}</strong></span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </body>
 </template>
 <script>
 import axios from 'axios'
 export default{
 name : 'Myregistrations',
 data() {
 return {
 myreg : [],
 rollno : localStorage.getItem('rollno')
 }
 },
mounted(){
 document.title = "My Registrations",
 this.getmyreg();
 },
 methods : {
 async getmyreg(){
 await axios
 .get(`api/v1/userhome/${this.rollno}/myregistrations`)
 .then(response => {
 this.myreg = response.data
 console.log(this.myreg['event_name'])
 })
 .catch(error => {console.log(error)})
 }
 }
 }
 </script>
 <style>
 @import '@/assets/Steventregistration.css';
 </style>
 <template>
 <head>
 <meta name="viewport" content="width=device-width, initial-scale = 10">
 </head>
 <body>
 <div class="navbar">
 <ul>
 <li><a href="/">CampusNexus</a></li>
 </ul>
 </div>
 <div>
 <div class="heading-container">
 <h1 style="font-size: 2.5rem;">Ongoing Events</h1>
 </div>
 <br>
 <div class="img-container">
 <div class="row row-cols-1 row-cols-md-5 g-4">
 <div class="col" v-for="i in ongoing_events">
 <div class="card text-end h-100">
 <img :src="i['poster']" class="card-img-top" alt="...">
 <div class="card-body">
 <h5 class="card-title text-start" style="font-size: 1.5rem;">{{
 i['event_name'] }}</h5>
 <p class="card-text text-start">{{i['description']}}</p>
 </div>
 <div class="card-footer justify-content-end">
 <router-link v-bind:to="`/${i.club_id}/events/${i.id}`" class="btn
 btn-outline-dark">Register</router-link>
 </div>
 </div>
 </div>
 </div>
</div>
 <div class="heading-container">
 <h1 style="font-size: 2.5rem;">Upcoming Events</h1>
 </div>
 <br>
 <div class="img-container">
 <div class="row row-cols-1 row-cols-md-5 g-4">
 <div class="col" v-for="i in upcoming_events">
 <div class="card text-end h-100">
 <img :src="i['poster']" class="card-img-top" alt="...">
 <div class="card-body">
 <h5 class="card-title text-start" style="font-size: 1.5rem;">{{
 i['event_name'] }}</h5>
 <p class="card-text text-start">{{i['description'] }}</p>
 </div>
 <div class="card-footer justify-content-end">
 <router-link v-bind:to="`/${i.club_id}/events/${i.id}`" class="btn
 btn-outline-dark">Register</router-link>
 </div>
 </div>
 </div>
 </div>
 </div>
 <div class="heading-container">
 <h1 >Past Events</h1>
 </div>
 <br>
 <div class="img-container">
 <div class="row row-cols-1 row-cols-md-5 g-4">
 <div class="col" v-for="i in past_events">
 <div class="card text-end h-100">
 <img :src="i['poster']" class="card-img-top" alt="...">
 <div class="card-body">
 <h5 class="card-title text-start" style="font-size: 1.5rem;">{{
 i['event_name'] }}</h5>
 <p class="card-text text-start">{{i['description'] }}</p>
 </div>
 <div class="card-footer justify-content-end">
 <a href="#" class="btn btn-outline-dark">Know more</a>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </body>
 </template>
 <script>
 import axios from 'axios'
 export default{
 name : 'Clubevents',
 data(){
 return {
 upcoming_events : [],
 
ongoing_events : [],
 past_events : [],
 }
 },
 mounted() {
 this.geteventslist();
 document.title = "Events";
 },
 methods : {
 async geteventslist(){
 await axios
 .get('api/v1/userhome/events')
 .then(response => {
 this.upcoming_events = response.data['upcoming_events'],
 this.ongoing_events = response.data['ongoing_events'],
 this.past_events = response.data['past_events']
 })
 .catch(error => {console.log(error)})
 }
 }
 }
 </script>
 <style scoped>
 @import '@/assets/clubevents.css';
 .card-footer{
 background-color: unset;
 border-top: none;
 padding-right: 1rem;
 padding-bottom: 1rem;
 justify-self: end !important;
 }
 </style>