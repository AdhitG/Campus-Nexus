Steventregistration.vue
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
 <label for="Eventname" class="form-label">Event Name</label>
 <input type="text" class="form-control" :value="this.event['event_name']"
 id="Eventname" disabled>
 </div>
 <div class="col-md-6">
 <label for="validationCustom01" class="form-label">Team Size</label>
 <select class="form-select" id="validationCustom01" required
 v-model="selectedTeamSize">
 <option selected disabled value="Select Team Size...">Select Team
 Size...</option>
 <option v-for="size in teamSizes" :value="size">{{ size }}</option>
 </select>
 <div class="invalid-feedback">
 Please select Team Size
 </div>
 </div>
 <div class="col-md-6">
 <label for="validationCustom02" class="form-label">Team Name</label>
 <input type="text" class="form-control" id="validationCustom02" placeholder="Enter
 Team Name" required>
 <div class="invalid-feedback" id="feedbackMessage02">
 Please provide a Team Name
 </div>
 </div>
 <div v-if="this.selectedTeamSize" v-for="(index,iteration) in selectedTeamSize"
 :key="(3 + parseInt(iteration))" class="col-md-6">
 <label :for="'validationCustom0' + (3 + parseInt(iteration))"
 class="form-label">Member {{ index- this.min_team_size + 1 }}</label>
 <input type="text" :id="'validationCustom0' + (3 + parseInt(iteration))"
 class="form-control" :placeholder="'Enter Roll No of Member ' + (index- this.min_team_size + 1) "
 required @input="convertToUpperCase($event)">
 <div class="invalid-feedback" :id="'feedbackMessage0' + (3 + parseInt(iteration))">
 Please provide a Roll No
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
 name: 'Steventregistration',
 data(){
 return {
 event : [],
 registrations : [],
 students : [],
 min_team_size :0,
 max_team_size : 0,
 selectedTeamSize : null,
 registeredRollnos : new Map(),
 formcontrols : new Array(2).fill(false),
 teamnames : new Map(),
 alertMessage: '',
 alertClass: '',
 }
 },
 methods: {
 async submitForm(){
 console.log("entered submit form")
 const teamsize = document.getElementById('validationCustom01').value;
 let teamname = null;
 if(this.min_team_size != this.max_team_size || this.min_team_size != 1){
 console.log("entered if in submit form")
 teamname = document.getElementById('validationCustom02').value;
 }
 const teammembers = new Array(this.selectedTeamSize).fill("")
 for(let i = 0; i <this.selectedTeamSize;i++){
 teammembers[i] = document.getElementById(`validationCustom0${3+i}`).value;
 }
 console.log(this.selectedTeamSize + teammembers + teamname)
 try{
 const clubid = this.$route.params.clubid
 const eventid = this.$route.params.eventid
 const response = await
 axios.post(`api/v1/userhome/${clubid}/events/${eventid}/register`, {
 teamsize: this.selectedTeamSize,
 teamname: teamname,
teammembers: teammembers
 });;
 if(response.status == 200){
 this.alertMessage = 'Registered Successfull!!!';
 this.alertClass = 'alert-success';
 setTimeout(() => {
 this.$router.push({ name: 'Myregistrations' })
 }, 2000);
 }
 else {
 throw new Error('Registration failed');
 }
 }
 catch(error){
 this.alertMessage = 'Registration Failed';
 this.alertClass = 'alert-danger';
 console.log(error)
 }
 },
 async getregistrations(){
 const clubid = this.$route.params.clubid
 const eventid = this.$route.params.eventid
 await axios
 .get(`api/v1/userhome/${clubid}/events/${eventid}/register`)
 .then(response => {
 this.event = response.data['Event'],
 this.students = response.data['Students'],
 this.registrations = response.data['Registrations'],
 this.min_team_size = this.event['min_team_size'],
 this.max_team_size = this.event['max_team_size']
 })
 .catch(error => {console.log(error)})
 },
 getregrollnos(){
 this.registrations.forEach(registration => {
 if(registration['team_name'] != null &&
 !this.teamnames.has(registration[`team_name`].toUpperCase())){
 this.teamnames.set(registration[`team_name`].toUpperCase(),1)
 }
 for(let i = 1; i<=4; i++ ){
 if(registration[`member_${i}_rollno`] != null){
 const regRollNo = registration[`member_${i}_rollno`].toUpperCase();
 if(!(this.registeredRollnos.has(regRollNo))){
 this.registeredRollnos.set(regRollNo,regRollNo)
 }
 }
 }
 });
 },
 checkValidity() {
 console.log("entered check validity")
 let isValid = true;
for(let i = 1; i <= 2 + this.selectedTeamSize; i++){
 const ele = document.getElementById(`validationCustom0${i}`)
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
 validateteamname() {
 console.log("entered validate team name")
 let isValid = true;
 const tmname = document.getElementById('validationCustom02').value
 if(tmname == ""){
 document.getElementById('feedbackMessage02').textContent = 'Please provide Team Name';
 document.getElementById('feedbackMessage02').style.display = 'block';
 this.formcontrols[1] = true;
 isValid = false;
 }
 if(!this.formcontrols[1]){
 console.log(tmname + " team name")
 console.log(this.teamnames.has(tmname.toUpperCase()) + " not statement " +
 !(this.teamnames.has(tmname.toUpperCase())))
 console.log("before")
 console.log(this.formcontrols)
 if(tmname != '' && this.teamnames.has(tmname.toUpperCase())){
 console.log("entered if for dict has teamname")
 document.getElementById('feedbackMessage02').textContent = 'Team Name already
 used';
 document.getElementById('feedbackMessage02').style.display = 'block';
 this.formcontrols[1] = true;
 isValid = false
 return isValid;
 }
 if(tmname == ''){
 document.getElementById('feedbackMessage02').textContent = 'Please provide a Team
 Name';
 document.getElementById('feedbackMessage02').style.display = 'block';
 this.formcontrols[1] = true;
 isValid = false
 return isValid;
 }
 else{
 console.log("enteredelse")
 document.getElementById('feedbackMessage02').textContent = '';
 document.getElementById('feedbackMessage02').style.display = 'block';
 this.formcontrols[1] = false;
 isValid = true;
 return isValid;
 }
 }
 return isValid;
 },
validateStudent() {
 console.log("entered validate student")
 let isValid = true;
 for (let i = 3; i < 3 + this.selectedTeamSize; i++) {
 const rollNo = document.getElementById(`validationCustom0${i}`).value.toUpperCase();
 const feedbackElement = document.getElementById(`feedbackMessage0${i}`);
 const studentExists = this.students.some(student => student.roll_no.toUpperCase() ===
 rollNo);
 },
 if(document.getElementById(`validationCustom0${i}`).value == ""){
 feedbackElement.textContent = 'Please provide Roll No';
 feedbackElement.style.display = 'block';
 this.formcontrols[i-1] = true;
 isValid = false;
 }
 else if (!studentExists){
 feedbackElement.textContent = 'Student not registered';
 feedbackElement.style.display = 'block';
 this.formcontrols[i-1] = true;
 isValid = false;
 }
 else{
 this.formcontrols[i-1] = false;
 feedbackElement.textContent = '';
 feedbackElement.style.display = 'block';
 }
 }
 return isValid;
 validateDuplicates() {
 console.log("entered validate duplicates")
 let isValid = true;
 const memberRollNumbersMap = new Map();
 const duplicateRollNumbersMap = new Map();
 const unqrollMap = new Map();
 let hasnull = false;
 for (let i = 3; i < 3 + this.selectedTeamSize; i++) {
 const rollNo = document.getElementById(`validationCustom0${i}`).value.toUpperCase();
 memberRollNumbersMap.set(`validationCustom0${i}`,[`feedbackMessage0${i}`, rollNo]);
 if(rollNo != ""){
 unqrollMap.set(rollNo,1)
 }
 if(rollNo == ""){
 hasnull = true;
 }
 }
 for(let i=3; i<3+this.selectedTeamSize; i++){
 const inputId = `validationCustom0${i}`;
 const rollNo = memberRollNumbersMap.get(inputId)[1];
 if(this.registeredRollnos.has(rollNo)){
 duplicateRollNumbersMap.set(inputId, `feedbackMessage0${i}`);
 }
 }
 console.log(duplicateRollNumbersMap);
if (duplicateRollNumbersMap.size > 0) {
 duplicateRollNumbersMap.forEach( (feedbackid,inputid) => {
 const index = inputid.replace('validationCustom0', '');
 const feedbackElement = document.getElementById(feedbackid);
 feedbackElement.textContent = 'This roll number is already registered';
 feedbackElement.style.display = 'block';
 this.formcontrols[index-1] = true;
 document.getElementById(inputid).classList = 'form-control is-invalid';
 isValid = false;
 })
 }
 if(!hasnull && unqrollMap.size != 0 && unqrollMap.size != this.selectedTeamSize){
 for(let i=2;i<2+this.selectedTeamSize;i++){
 this.formcontrols[i] = true;
 document.getElementById(`feedbackMessage0${i+1}`).textContent = 'Duplicate Roll No
 not allowed';
 document.getElementById(`feedbackMessage0${i+1}`).style.display = 'block';
 }
 isValid = false;
 }
 return isValid;
 },
 validateForm(event){
 event.preventDefault();
 event.stopPropagation();
 let isValid = true;
 if(!this.checkValidity()){
 isValid = false;
 }
 if(!this.validateteamname()){
 isValid = false;
 }
 if(!this.validateStudent()) {
 isValid = false;
 }
 if(!this.validateDuplicates()) {
 isValid = false;
 }
 if (isValid) {
 console.log("entered")
 this.submitForm();
 }
 else{
 event.preventDefault();
 event.stopPropagation();
 console.log(this.formcontrols)
 for(let i=0;i<2+this.selectedTeamSize;i++){
 if(this.formcontrols[i]){
 document.getElementById(`validationCustom0${i+1}`).classList = 'form-control
 is-invalid'
 is-valid'
 }
 else{
 document.getElementById(`validationCustom0${i+1}`).classList = 'form-control
 38
}
 }
 }
 },
 convertToUpperCase(event) {
 const inputValue = event.target.value;
 const upperCaseValue = inputValue.toUpperCase();
 event.target.value = upperCaseValue;
 },
 },
 mounted() {
 document.title = "Event registration";
 this.getregistrations().then(() => {
 this.getregrollnos();
 });
 },
 watch: {
 selectedTeamSize(newSize) {
 this.formcontrols = new Array(newSize+2).fill(false);
 }
 },
 computed: {
 teamSizes() {
 }
 }
 }
 </script>
 if (!this.min_team_size || !this.max_team_size) {
 return [];
 }
 const sizes = [];
 for (let i = this.event['min_team_size']; i <= this.event['max_team_size']; i++) {
 sizes.push(i);
 }
 return sizes;
 <style scoped>
 h1 {
 text-align: center;
 }
 @import '@/assets/Steventregistration.css';
 </style>