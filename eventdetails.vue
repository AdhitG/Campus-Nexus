eventdetails.vue
 <template>
 <head>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 </head>
 <body style="background-color: #f5f5f7;">
 <div class="navbar">
 <ul>
 <li><a href="/">CampusNexus</a></li>
 <li><router-link
 v-bind:to="`/${eventdetails.club_id}/events`">Events</router-link></li>
 </ul>
 </div>
 <div class="image-section">
 <img src="https://tinyurl.com/brkmdkjna" alt="Event Image" style="width: 100%;height: 100%;">
 </div>
 <div class="clubs">
 <div class="left">
 43
<div class="event-details" id="event-details">
 <h2>{{ eventdetails.event_name }}</h2>
 <p>{{ eventdetails.description }}</p>
 </div>
 <div class="instructions">
 <h3>Instructions/Rules</h3>
 <p>{{ eventdetails.instructions }}</p>
 </div>
 </div>
 <div class="right">
 <div class="card">
 <div class="card-body">
 <div style="display: flex; align-items: center; margin-bottom: 5%;">
 <div style="padding-right: 15px;">
 <i class="bi bi-people" style="font-size: 2rem;"></i>
 </div>
 <div style="display: flex; flex-direction: column;">
 <span style="font-size: 14px; color: gray;">Team Size</span>
 <strong>
 <span v-if="eventdetails.min_team_size === eventdetails.max_team_size">
 <span v-if="eventdetails.min_team_size === 1" style="font-size:
 14px;">{{ eventdetails.min_team_size }} Member</span>
 <span style="font-size: 14px;" v-else>{{ eventdetails.min_team_size
 }} Members</span>
 </span>
 <span style="font-size: 14px;" v-else>{{ eventdetails.min_team_size }}- {{ eventdetails.max_team_size }} Members</span>
 </strong>
 </div>
 </div>
 <div style="display: flex; align-items: center; margin-bottom: 5%;">
 <div style="padding-right: 15px;">
 <i class="bi bi-wallet2" style="font-size: 2rem;"></i>
 </div>
 <div style="display: flex; flex-direction: column;">
 <span style="font-size: 14px; color: gray;">Registration Fee</span>
 <strong>
 <span v-if="eventdetails.registration_fee == 0" style="font-size:
 14px;">Free</span>
 }}</span>
 <span style="font-size: 14px;" v-else>{{ eventdetails.registration_fee
 </strong>
 </div>
 </div>
 <div v-if="eventdetails.prize_money != 0" style="display: flex; align-items:
 center; margin-bottom: 5%;">
 <div style="padding-right: 15px;">
 <i class="bi bi-cash-stack" style="font-size: 2rem;"></i>
 </div>
 <div style="display: flex; flex-direction: column;">
 <span style="font-size: 14px; color: gray;">Prize Money</span>
 <strong>
 <span style="font-size: 14px;">{{ eventdetails.prize_money }}</span>
 </strong>
 </div>
 </div>
 44
<div style="display: flex; align-items: center; margin-bottom: 5%;">
 <div style="padding-right: 15px;">
 <i class="bi bi-calendar-event" style="font-size: 2rem;"></i>
 </div>
 <div style="display: flex; flex-direction: column;">
 <span style="font-size: 14px; color: gray;">Date</span>
 <strong>
 <span style="font-size: 14px;">{{ eventdetails.date }}</span>
 </strong>
 </div>
 </div>
 <div style="display: flex; align-items: center; margin-bottom: 5%;">
 <div style="padding-right: 15px;">
 <i class="bi bi-clock" style="font-size: 2rem;"></i>
 </div>
 <div style="display: flex; flex-direction: column;">
 <span style="font-size: 14px; color: gray;">Time</span>
 <strong>
 <span style="font-size: 14px;">{{ eventdetails.time }}</span>
 </strong>
 </div>
 </div>
 <div style="display: flex; align-items: center; margin-bottom: 5%;">
 <div style="padding-right: 15px;">
 <i class="bi bi-geo-alt" style="font-size: 2rem;"></i>
 </div>
 <div style="display: flex; flex-direction: column;">
 <span style="font-size: 14px; color: gray;">Venue</span>
 <strong>
 <span style="font-size: 14px;">{{ eventdetails.venue }}</span>
 </strong>
 </div>
 </div>
 </div>
 <div class="card-footer">
 <router-link
 v-bind:to="`/${this.eventdetails['club_id']}/events/${this.eventdetails['id']}/register`"
 class="container btn btn-outline-dark">Register</router-link>
 </div>
 </div>
 </div>
 </div>
 </body>
 </template>
 <script>
 import axios from 'axios'
 export default{
 name : 'Eventdetails',
 data(){
 return {
 eventdetails : []
 }
 },
 45
mounted() {
 this.geteventdetails()
 },
 methods : {
 async geteventdetails(){
 const clubid = this.$route.params.clubid
 const eventid = this.$route.params.eventid
 await axios
 .get(`api/v1/userhome/${clubid}/events/${eventid}`)
 .then(response => {
 this.eventdetails = response.data,
 document.title = this.eventdetails.event_name
 console.log(this.eventdetails)
 })
 .catch(error => {console.log(error)})
 }
 }
 }
 </script>
 <style scoped>
 @import
 url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&fam
 ily=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,
 400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,70
 0;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,70
 0;1,700&display=swap');
 .navbar {
 background-color: #333;
 overflow: hidden;
 }
 .navbar ul {
 list-style-type: none;
 margin: 0;
 padding: 0;
 overflow: hidden;
 background-color: #333;
 }
 }
 .navbar li {
 float: left;
 .navbar li a {
 display: block;
 color: white;
 text-align: center;
 padding: 14px 16px;
 text-decoration: none;
 margin-left: 15px;
 }
 46
.navbar li a:hover {
 background-color: #ddd;
 color: black;
 }
 body, html {
 margin: 0;
 padding: 0;
 font-family: Arial, sans-serif;
 height: 100%;
 }
 .clubs {
 display: flex;
 height: 100vh;
 margin-left: 5%;
 margin-right: 5%;
 justify-content: space-between;
 }
 .left {
 width: 75%;
 padding: 20px;
 overflow-y: auto;
 }
 .right {
 width: 25%;
 padding: 20px;
 position: sticky;
 top: 0;
 box-sizing: border-box;
 }
 .card {
 background-color: #fff;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 border-radius: 8px;
 border: none;
 height: fit-content;
 }
 .instructions{
 background-color: #fff;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 border-radius: 8px;
 padding: 20px 25px;
 text-align: justify;
 }
 .event-details {
 background-color: #fff;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 border-radius: 8px;
 padding: 20px;
 margin-bottom: 1%;
 47
font-size: 1rem;
 }
 .card-footer{
 background-color: unset;
 border-top: none;
 padding-right: 1rem;
 padding-bottom: 1rem;
 justify-self: end !important;
 }
 </style>