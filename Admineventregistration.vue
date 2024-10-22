Admineventregistration.vue
 <template>
 <head>
 <meta name="viewport" content="width=device-width, initial-scale = 10">
 </head>
 <body>
 <div class="navbar">
 <ul>
 <li><a href="/adminhome">CampusNexus</a></li>
 </ul>
 </div>
 <div v-if="alertMessage" :class="['alert', alertClass]" class="alert alert-warning
 alert-dismissible fade show" role="alert">
 <strong>{{ alertMessage }}</strong>
 <button type="button" class="btn-close" data-bs-dismiss="alert"
 aria-label="Close"></button>
 </div>
 <div class="container">
 <h1 style="color: #82001A;">Event Registration</h1>
 <form class="row g-3 needs-validation" novalidate @submit.prevent="validateForm">
 <div class="col-md-6">
 <label for="validationCustom1" class="form-label">Event Name</label>
<input type="text" class="form-control" id="validationCustom1" placeholder="Enter
 Event Name" required>
 <div class="invalid-feedback" id="feedbackMessage1">
 Please provide Event Name
 </div>
 </div>
 <div class="col-md-6">
 <label for="Clubname" class="form-label">Club Name</label>
 <input type="text" class="form-control" :value="this.club['name']" id="Clubname"
 disabled>
 </div>
 <div class="col-md-6">
 <label for="validationCustom2" class="form-label">Minimum Team Size</label>
 <select class="form-select" id="validationCustom2" required>
 <option selected disabled value="Select Team Size...">Select Team
 Size...</option>
 <option v-for="size in this.teamsizes" :value="size">{{ size }}</option>
 </select>
 <div class="invalid-feedback" id="feedbackMessage2">
 Please select Minimum Team Size
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom3" class="form-label">Maximum Team Size</label>
 <select class="form-select" id="validationCustom3" required>
 <option selected disabled value="Select Team Size...">Select Team
 Size...</option>
 <option v-for="size in this.teamsizes" :value="size">{{ size }}</option>
 </select>
 <div class="invalid-feedback" id="feedbackMessage3">
 Please select Maximum Team Size
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom4" class="form-label">Date</label>
 <input type="Date" class="form-control" id="validationCustom4" required>
 <div class="invalid-feedback" id="feedbackMessage4">
 Please select Date
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom5" class="form-label">Time</label>
 <input type="time" class="form-control" id="validationCustom5" required>
 <div class="invalid-feedback" id="feedbackMessage5">
 Please select Time
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom6" class="form-label">Venue</label>
 <input type="text" class="form-control" id="validationCustom6" placeholder="Enter
 Venue" required>
 <div class="invalid-feedback" id="feedbackMessage6">
 Please provide Venue
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom7" class="form-label">Registration Fee</label>
<input type="number" min="0" max="10000" step="1" class="form-control"
 id="validationCustom7" placeholder="Enter Registration Fee" v-model="numberInput1" required
 @input="validateRegistrationFee">
 <div class="invalid-feedback" id="feedbackMessage7">
 Please provide Registration Fee
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom8" class="form-label">Prize Money</label>
 <input type="number" min="0" max="10000" step="1" class="form-control"
 id="validationCustom8" placeholder="Enter Prize Money" v-model="numberInput2" required
 @input="validatePrizeMoney">
 <div class="invalid-feedback" id="feedbackMessage8">
 Please provide Prize Money
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom9" class="form-label">Poster url</label>
 <input type="url" class="form-control" id="validationCustom9" placeholder="Enter
 poster url" required>
 <div class="invalid-feedback" id="feedbackMessage9">
 Please provide poster url
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom10" class="form-label">Description</label>
 <textarea maxlength="500" rows="5" class="form-control" id="validationCustom10"
 placeholder="Enter Description" required></textarea>
 <div class="invalid-feedback" id="feedbackMessage10">
 Please provide Description
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom11" class="form-label">Instructions/Rules</label>
 <textarea maxlength="1000" rows="5" class="form-control" id="validationCustom11"
 placeholder="Enter Instructions/Rules" required></textarea>
 <div class="invalid-feedback" id="feedbackMessage11">
 Please provide Instructions/Rules
 </div>
 </div>
 <div class="col-12">
 <button class="btn btn-primary" type="submit">Register</button>
 </div>
 </form>
 </div>
 </body>
 </template>
 <script>
 import axios from 'axios'
 export default {
 name: 'Admineventregistration',
 data(){
 return {
 events : [],
club : [],
 formcontrols : new Array(11).fill(false),
 teamsizes : [1,2,3,4],
 clubid : localStorage.getItem('clubid'),
 numberInput1: '',
 numberInput2: '',
 alertMessage: '',
 alertClass: '',
 }
 },
 mounted() {
 document.title = "Event registration";
 this.getevents()
 },
 methods: {
 validateRegistrationFee(event) {
 let value = event.target.value;
 const cleanedValue = value.replace(/\D/g, '');
 if (value !== cleanedValue) {
 alert('Only integer values accepted');
 }
 this.numberInput1 = cleanedValue;
 },
 validatePrizeMoney(event) {
 let value = event.target.value;
 const cleanedValue = value.replace(/\D/g, '');
 if (value !== cleanedValue) {
 alert('Only integer values accepted');
 }
 this.numberInput2 = cleanedValue;
 },
 async getevents(){
 await axios
 .get(`api/v1/adminhome/${this.clubid}/registerevent`)
 .then(response => {
 this.events = response.data['events'],
 this.club = response.data['club'],
 console.log(this.events),
 console.log(this.club)
 })
 .catch(error => {console.log(error)})
 },
 checkValidity() {
 console.log("entered check validity")
 let isValid = true;
 for(let i = 1; i <= 11; i++){
 const ele = document.getElementById(`validationCustom${i}`)
 if(!ele || !ele.value){
this.formcontrols[i-1] = true;
 isValid = false;
 }
 else{
 this.formcontrols[i-1] = false;
 }
 }
 return isValid;
 },
 validateeventname() {
 console.log("entered validate event name")
 let isValid = true;
 const feedbackElement = document.getElementById('feedbackMessage1');
 let event_name = document.getElementById('validationCustom1').value.toLowerCase();
 let exists_en = false;
 if(event_name == ""){
 feedbackElement.textContent = 'Please provide Event Name';
 feedbackElement.style.display = 'block';
 this.formcontrols[0] = true;
 isValid = false;
 }
 if(!this.formcontrols[0]){
 for(let i = 0; i < this.events.length; i++){
 if(this.events[i]['event_name'].toLowerCase() === event_name){
 exists_en = true;
 break;
 }
 }
 if(exists_en){
 console.log("event name exists")
 feedbackElement.textContent = 'Event Name already used';
 feedbackElement.style.display = 'block';
 this.formcontrols[0] = true;
 isValid = false;
 }
 else{
 console.log("event name doesn't exists")
 feedbackElement.style.display = 'none';
 this.formcontrols[0] = false;
 isValid = true;
 }
 }
 return isValid;
 },
 validateteamsize() {
 console.log("entered validate team size")
 let isValid = true;
 const feedbackElement1 = document.getElementById('feedbackMessage2');
const feedbackElement2 = document.getElementById('feedbackMessage3');
 let min_teamsize = document.getElementById('validationCustom2').value
 let max_teamsize = document.getElementById('validationCustom3').value
 console.log(min_teamsize)
 if(min_teamsize == "Select Team Size..."){
 feedbackElement1.textContent = 'Please select Minimum Team Size';
 feedbackElement1.style.display = 'block';
 this.formcontrols[1] = true;
 isValid = false;
 }
 else{
 feedbackElement1.style.display = 'none';
 this.formcontrols[1] = false;
 }
 if(max_teamsize == "Select Team Size..."){
 feedbackElement2.textContent = 'Please select Maximum Team Size';
 feedbackElement2.style.display = 'block';
 this.formcontrols[2] = true;
 isValid = false;
 }
 else{
 feedbackElement2.style.display = 'none';
 this.formcontrols[2] = false;
 }
 if(max_teamsize != "Select Team Size..." && min_teamsize != "Select Team Size..." &&
 min_teamsize > max_teamsize){
 feedbackElement1.textContent = 'Minimum team size should be less than or equal to
 Maximum team size';
 feedbackElement1.style.display = 'block';
 feedbackElement2.textContent = 'Minimum team size should be less than or equal to
 Maximum team size';
 feedbackElement2.style.display = 'block';
 this.formcontrols[1] = true;
 this.formcontrols[2] = true;
 isValid = false;
 }
 else{
 isValid = true;
 }
 return isValid;
 },
 validatedate() {
 console.log("entered validate date")
 let isValid = true;
 const feedbackElement = document.getElementById('feedbackMessage4');
 let dateInput = document.getElementById('validationCustom4').value
 if(dateInput == ""){
 feedbackElement.textContent = 'Please select Date';
 feedbackElement.style.display = 'block';
 this.formcontrols[3] = true;
 isValid = false;
}
 const inputDate = new Date(dateInput);
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 if(!this.formcontrols[3]){
 if (inputDate < today) {
 isValid = false;
 feedbackElement.textContent = 'Date must be greater than or equal to today\'s
 date.';
 feedbackElement.style.display = 'block';
 this.formcontrols[3] = true;
 } else {
 feedbackElement.style.display = 'none';
 this.formcontrols[3] = false;
 }
 }
 return isValid;
 },
 validatetime() {
 console.log("entered validate time")
 let isValid = true;
 const feedbackElement = document.getElementById('feedbackMessage5');
 let timeInput = document.getElementById('validationCustom5').value
 if(timeInput == ""){
 feedbackElement.textContent = 'Please select Time';
 feedbackElement.style.display = 'block';
 this.formcontrols[4] = true;
 isValid = false;
 }
 const [hours, minutes] = timeInput.split(':').map(Number);
 const time = new Date();
 time.setHours(hours, minutes, 0, 0);
 const startTime = new Date();
 startTime.setHours(9, 0, 0, 0); // 9:00 AM
 const endTime = new Date();
 endTime.setHours(15, 0, 0, 0); // 3:00 PM
 if(!this.formcontrols[4]){
 if (time < startTime || time > endTime) {
 isValid = false;
 feedbackElement.textContent = 'Time must be between 9:00 AM and 3:00 PM.';
 feedbackElement.style.display = 'block';
 this.formcontrols[4] = true;
 } else {
 feedbackElement.style.display = 'none';
 this.formcontrols[4] = false;
 isValid = true;
 }
}
 return isValid;
 },
 async submitForm() {
 console.log("entered submitform")
 const eventname = document.getElementById('validationCustom1').value;
 const min_teamsize = document.getElementById('validationCustom2').value;
 const max_teamsize = document.getElementById('validationCustom3').value;
 const date = document.getElementById('validationCustom4').value;
 const time = document.getElementById('validationCustom5').value;
 const venue = document.getElementById('validationCustom6').value;
 const registrationfee = document.getElementById('validationCustom7').value;
 const prizemoney = document.getElementById('validationCustom8').value;
 const posterurl = document.getElementById('validationCustom9').value;
 const description = document.getElementById('validationCustom10').value;
 const instructions = document.getElementById('validationCustom11').value;
 try{
 }
 const response = await axios.post(`api/v1/adminhome/${this.clubid}/registerevent`, {
 eventname: eventname,
 min_teamsize: min_teamsize,
 max_teamsize: max_teamsize,
 date: date,
 time: time,
 venue: venue,
 registrationfee: registrationfee,
 prizemoney: prizemoney,
 posterurl: posterurl,
 description: description,
 instructions: instructions
 });;
 if(response.status == 200){
 this.alertMessage = 'Event Registered Successfull!!!';
 this.alertClass = 'alert-success';
 setTimeout(() => {
 this.$router.push({ name: 'Adminclubevents' })
 }, 2000);
 }
 else {
 throw new Error('Event Registration failed');
 }
 catch(error){
 this.alertMessage = 'Event Registration failed';
 this.alertClass = 'alert-danger';
 console.log(error)
 }
 },
 validateForm(event){
 event.preventDefault();
event.stopPropagation();
 let isValid = true;
 if(!this.checkValidity()){
 isValid = false;
 }
 if(!this.validateeventname()){
 isValid = false;
 }
 if (!this.validateteamsize()) {
 isValid = false;
 }
 if (!this.validatedate()) {
 isValid = false;
 }
 if(!this.validatetime()){
 isValid = false;
 }
 if(isValid){
 this.submitForm();
 }
 else {
 event.preventDefault();
 event.stopPropagation();
 console.log(this.formcontrols)
 for(let i=1;i<=11;i++){
 if(this.formcontrols[i-1]){
 document.getElementById(`validationCustom${i}`).classList = 'form-control
 is-invalid'
 is-valid'
 },
 }
 else{
 document.getElementById(`validationCustom${i}`).classList = 'form-control
 }
 }
 }
 convertToUpperCase(event) {
 const inputValue = event.target.value;
 const upperCaseValue = inputValue.toUpperCase();
 event.target.value = upperCaseValue;
 },
 }
 }
 </script>
 <style scoped>
 h1 {
 text-align: center;
 }
 @import '@/assets/Steventregistration.css';
 </style>
Userhome.vue
 <template>
 <head>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 </head>
 <body style="background-color: #f5f5f7;">
 <div id="sectionHome">
 <div>
 <nav class="nav nav-pills flex-column flex-sm-row" style="background-color: #333">
 <router-link v-bind:to="`/`" class="flex-sm-fill text-sm-center nav-link"
 style="text-decoration: none" aria-current="page">CampusNexus</router-link>
 <router-link v-bind:to="`/events`" class="flex-sm-fill text-sm-center nav-link"
 style="text-decoration: none">Events</router-link>
 <router-link v-bind:to="`#gallery`" class="flex-sm-fill text-sm-center nav-link"
 style="text-decoration: none">Gallery</router-link>
 <router-link v-bind:to="`/myregistrations`" class="flex-sm-fill text-sm-center nav-link"
 style="text-decoration: none">My Registrations</router-link>
 <li class="nav-item dropdown" v-if="!token">
 <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
 aria-expanded="false">Login</a>
 <ul class="dropdown-menu">
 <li><router-link v-bind:to="`/login`" class="flex-sm-fill text-sm-center nav-link"
 style="text-decoration: none; color: black;" aria-current="page">Student Login</router-link></li>
 <li><router-link v-bind:to="`/adminlogin`" class="flex-sm-fill text-sm-center nav-link"
 style="text-decoration: none; color: black;" aria-current="page">Admin Login</router-link></li>
 </ul>
 </li>
 <li class="nav-item" v-else>
 <a class="nav-link" href="#" @click="logout">Logout</a>
 </li>
 </nav>
 </div>
 <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
 <div class="carousel-inner">
 <div class="carousel-item active" data-bs-interval="5000">
 <img src="https://tinyurl.com/griet-event-3" class="d-block w-100" alt="...">
 </div>
 <div class="carousel-item" data-bs-interval="5000">
 <img src="https://tinyurl.com/griet-event-2" class="d-block w-100" alt="...">
 </div>
 <div class="carousel-item" data-bs-interval="5000">
 <img src="https://tinyurl.com/griet-event-1" class="d-block w-100" alt="...">
 </div>
 </div>
 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
 data-bs-slide="prev">
 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
 <span class="visually-hidden">Previous</span>
 </button>
 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
 data-bs-slide="next">
 <span class="carousel-control-next-icon" aria-hidden="true"></span>
 <span class="visually-hidden">Next</span>
 </button>
</div>
 </div>
 <br>
 <div class="clubs" style="margin-left:5%;margin-right:5%;display: flex;justify-content:
 space-between;align-items: center;">
 <div class="introleft" style="text-align: justify;">
 <h4 style="margin-bottom: 0;">Welcome to</h4>
 <h1 style="margin-top: 0;margin-bottom: 0;color: #82001A;">CampusNexus</h1>
 <h4>Navigate, Connect, Engage</h4>
 <br>
 <p>Welcome to Campus Nexus, your one-stop platform for staying updated with all club events and
 registrations on campus!<br><br>
 Explore various clubs, view upcoming events, and register for activities that match your
 interests.Welcome to Campus Nexus, the ultimate hub for student life! Explore the vibrant tapestry of
 our campus community through our extensive directory of student clubs. From academic societies to
 cultural organizations, there's something here for everyone.
 <br><br>
 Dive into the diverse array of student-led initiatives, each offering a unique opportunity for
 growth, connection, and fun. Whether you're passionate about sustainability, entrepreneurship, or the
 performing arts, Campus Nexus has you covered.
 Click on any club to unlock a world of exciting events and activities. From workshops and
 seminars to social gatherings and competitions, there's always something happening on campus. Get
 involved, make memories, and forge lifelong friendships with like-minded peers.
 <br><br>
 At Campus Nexus, we believe in the power of student engagement to transform lives and enrich the
 college experience. Join us on this journey of discovery, exploration, and community building. Your
 adventure starts here.
 </p>
 </div>
 <div class="introright">
 <img
 src="https://res.cloudinary.com/ddrgalqdl/image/upload/v1713869168/campusnexus/homepage/homepic.png">
 </div>
 </div>
 <br>
 <center>
 <h1 style="color: #82001A;">Student Clubs</h1>
 </center>
 <br>
 <div class="clubs" style="padding-left: 5%;overflow-x: hidden;">
 <div class="row row-cols-1 row-cols-md-4 g-4">
 <div v-for="i in clubs">
 <router-link v-bind:to="`${i.id}/events`" style="text-decoration: none">
 <div class="col">
 <div class="card h-100">
 <img :src="i.logo" class="card-img-top">
 <div class="card-body">
 <center><h5 class="card-title">{{ i.name }}</h5></center>
 </div>
 </div>
 </div>
 </router-link>
 </div>
 </div>
 </div>
</body>
 </template>
 <script>
 import axios from 'axios'
 export default {
 name: 'Userhome',
 data(){
 return {
 clubs : [],
 isDropdownOpen: false,
 token: localStorage.getItem('token')
 }
 },
 mounted() {
 this.getClublist()
 document.title = "Campus Nexus";
 },
 methods: {
 getClublist() {
 axios
 .get('api/v1/userhome')
 .then(response => {this.clubs = response.data})
 .catch(error => {console.log(error)})
 },
 toggleDropdown() {
 console.log("entered dropdown")
 this.isDropdownOpen = !this.isDropdownOpen;
 },
 logout() {
 localStorage.removeItem('token');
 localStorage.removeItem('rollno')
 localStorage.removeItem('role')
 this.token = null;
 this.$router.push('/');
 }
 }
 }
 </script>
 <style scoped>
 .card {
 height: 100%;
 position: relative;
 display: flex ;
 justify-content: center ;
 cursor: pointer ;
 width: 15em ;
 max-width: 80%;
 padding: 2em 0 0 0 ;
 background: #FFF;
box-shadow: 0 0 6px 0 rgba(#202024, .12);
 transition: all .35s ease;
 &::before,
 &::after {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 background: #000;
 height: 4px;
 }
 &::before {
 width: 0 ;
 opacity: 0 ;
 transition: opacity 0 ease, width 0 ease;
 transition-delay: .5s ;
 }
 &::after {
 width: 100%;
 background: white;
 transition: width .5s ease;
 }
 h5 {
 }
 color: #999 ;
 font-weight: 600 ;
 text-transform: uppercase;
 margin: 0 ;
 letter-spacing: 2px ;
 &:hover {
 width: 18em;
 box-shadow: 0 10px 20px 0 rgba(#202024, .12) ;
 &::before {
 width: 100% ;
 opacity: 1 ;
 transition: opacity .5s ease, width .5s ease ;
 transition-delay: 0 ;
 }
 &::after {
 width: 0 ;
 opacity: 0 ;
 transition: width 0 ease;
 }
 }
 }
 @import '@/assets/home.css';
 </style