 <template>
 <head>
 <meta name="viewport" content="width=device-width, initial-scale = 10">
 </head>
 <body>
 <div class="navbar">
 <ul>
 <li><a href="/adminhome">CampusNexus</a></li>
 <li><router-link v-bind:to="`/adminhome/events`">Events</router-link></li>
 <li><router-link v-bind:to="`/adminhome/registerevent`">Create Event</router-link></li>
 <li class="nav-item" v-if="token">
 <a class="nav-link" @click="logout">Logout</a>
 </li>
 </ul>
 </div>
 <div class="image-section" style="height: 80%;">
 <img :src="club.homephoto" alt="Event Image" style="width: 100%;height:41rem;">
 </div>
 <div style="margin-left: 5%;margin-right: 5%; margin-top: 2%;">
 <h2 style="display: inline;font-size: 2.5rem;">Welcome to </h2><h1 style="color:
 #82001A;display: inline; font-size: 3rem;">{{ club.name }} </h1><h2 style="display: inline;font-size:
 2.5rem;">Club</h2><br>
 <div class="heading-container" style="margin-left: 0%;margin-bottom: 1%;">
 <h1 style="font-size: 2rem;">About Us</h1>
 </div>
 <p style="text-align: justify;">{{ club['aboutus'] }}</p>
 <div class="heading-container" style="margin-left: 0%;margin-bottom: 1%;">
 <h1 style="font-size: 2rem;">Vision</h1>
 </div>
 <p style="text-align: justify;">{{ club.vision }}</p>
 <div class="heading-container" style="margin-left: 0%;margin-bottom: 1%;">
 <h1 style="font-size: 2rem;">Mission</h1>
 </div>
 <p style="text-align: justify;">{{ club.mission }}</p>
 <div class="heading-container" style="margin-left: 0%;margin-bottom: 3%;">
 <h1 style="font-size: 2.5rem;"> Our Core Committee</h1>
 </div>
 <div class="row row-cols-1 row-cols-md-4 g-4">
 <div class="col" style="justify-content: center;">
 <section class="review">
 <div class="box">
 <div class="user">
 <img
 src="https://res.cloudinary.com/ddrgalqdl/image/upload/v1713770437/campusnexus/Corecommittee/CSI/presi
 dent.png" alt=""><br>
 <div class="card-body" style="margin-top: 5%;">
 <h5 class="card-title">{{ corecommittee.president }}</h5>
 <p class="card-text">President</p>
 </div>
 </div>
 </div>
</section>
 </div>
 <div class="col" style="justify-content: center;">
 <section class="review">
 <div class="box">
 <div class="user">
 <img
 src="https://res.cloudinary.com/ddrgalqdl/image/upload/v1713770437/campusnexus/Corecommittee/CSI/presi
 dent.png" alt=""><br>
 <div class="card-body" style="margin-top: 5%;">
 <h5 class="card-title">{{ corecommittee.vice_president }}</h5>
 <p class="card-text">Vice President</p>
 </div>
 </div>
 </div>
 </section>
 </div>
 <div class="col" style="justify-content: center;">
 <section class="review">
 <div class="box">
 <div class="user">
 <img
 src="https://res.cloudinary.com/ddrgalqdl/image/upload/v1713770437/campusnexus/Corecommittee/CSI/presi
 dent.png" alt=""><br>
 <div class="card-body" style="margin-top: 5%;">
 <h5 class="card-title">{{ corecommittee.treasurer }}</h5>
 <p class="card-text">Treasurer</p>
 </div>
 </div>
 </div>
 </section>
 </div>
 </div>
 <div class="heading-container" style="margin-left: 0%;margin-bottom: 1%;">
 <h1 style="font-size: 2rem;">Follow Us</h1>
 </div><br>
 <a :href="club.insta_link" target="_blank" style="color: inherit; font-size: 2.5rem;"><i
 class="bi bi-instagram"></i></a>
 </div>
 </body>
 </template>
 <script>
 import axios from 'axios'
 export default {
 name: 'Adminhome',
 data(){
 return {
 club : [],
 corecommittee : [],
 clubid : localStorage.getItem('clubid'),
 token: localStorage.getItem('token')
 }
 }
mounted() {
 this.getClubdetails(),
 document.title = "CampusNexus"
 },
 methods: {
 getClubdetails() {
 axios
 .get(`api/v1/adminhome/${this.clubid}`)
 .then(response => {this.club = response.data['club'],
 this.corecommittee = response.data['corecommittee']
 })
 .catch(error => {console.log(error)})
 },
 logout() {
 localStorage.removeItem('token');
 localStorage.removeItem('clubid')
 localStorage.removeItem('email')
 localStorage.removeItem('role')
 this.token = null;
 this.$router.push('/');
 }
 }
 }
 </script>
 <style scoped>
 @import '@/assets/clubinfo.css'
 </style>