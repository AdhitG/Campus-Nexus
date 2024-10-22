index.js
 import { createRouter, createWebHistory } from 'vue-router'
 import Userhome from '../views/Userhome.vue'
 import Clubevents from '../views/Clubevents.vue'
 import Events from '../views/Events.vue'
 import Eventdetails from '../views/Eventdetails.vue'
 import Clubinfo from '../views/Clubinfo.vue'
 import Steventregistration from '../views/Steventregistration.vue'
 import Myregistrations from '../views/Myregistrations.vue'
 import Registration from '../views/Registration.vue'
 import Login from '../views/Login.vue'
 import Adminlogin from '../views/Adminlogin.vue'
 import Adminregistration from '../views/Adminregistration.vue'
 import Adminhome from '../views/Adminhome.vue'
 import Adminclubevents from '../views/Adminclubevents.vue'
 import Admineventregistration from '../views/Admineventregistration.vue'
 import Admineditevent from '../views/Admineditevent.vue'
 const routes = [
 {
 path: '/',
 name: 'Userhome',
 component: Userhome
 },
 {
 },
 {
 },
 {
 },
 {
 },
 {
 path: '/:clubid/events',
 name: 'Clubevents',
 component: Clubevents,
 meta: { requiresAuth: true, role: 'user' }
 path: '/myregistrations',
 name: 'Myregistrations',
 component: Myregistrations,
 meta: { requiresAuth: true, role: 'user' }
 path: '/events',
 name: 'Events',
 component: Events,
 meta: { requiresAuth: true, role: 'user' }
 path: '/:clubid/events/:eventid',
 name: 'Eventdetails',
 component: Eventdetails,
 meta: { requiresAuth: true, role: 'user' }
 path: '/:clubid/about',
name: 'Clubinfo',
 component: Clubinfo,
 meta: { requiresAuth: true, role: 'user' }
 },
 {
 },
 {
 },
 {
 },
 {
 },
 {
 },
 {
 },
 {
 },
 {
 path: '/:clubid/events/:eventid/register',
 name: 'Steventregistration',
 component: Steventregistration,
 meta: { requiresAuth: true, role: 'user' }
 path: '/register',
 name: 'Registration',
 component: Registration,
 path: '/login',
 name: 'Login',
 component: Login,
 meta: { requiresGuest: true }
 path: '/adminlogin',
 name: 'Adminlogin',
 component: Adminlogin
 path: '/adminregister',
 name: 'Adminregistration',
 component: Adminregistration
 path: '/adminhome',
 name: 'Adminhome',
 component: Adminhome,
 meta: { requiresAuth: true, role: 'admin' }
 path: '/adminhome/events',
 name: 'Adminclubevents',
 component: Adminclubevents,
 meta: { requiresAuth: true, role: 'admin' }
 path: '/adminhome/registerevent',
 name: 'Admineventregistration',
 component: Admineventregistration,
 meta: { requiresAuth: true, role: 'admin' }
 },
{
 },
 ]
 path: '/adminhome/editevent/:eventid',
 name: 'Admineditevent',
 component: Admineditevent,
 meta: { requiresAuth: true, role: 'admin' }
 const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes
 })
 router.beforeEach((to, from, next) => {
 const token = localStorage.getItem('token');
 const role = localStorage.getItem('role');
 if (to.matched.some(record => record.meta.requiresAuth)) {
 if (!token) {
 if (from.name === 'Userhome') {
 alert('Please login first to continue.');
 next(false);
 } else {
 alert('Please login first to continue.');
 next({ name: 'Userhome' });
 }
 }
 else{
 if (to.meta.role && to.meta.role !== role) {
 alert(`Access denied for ${role === 'user' ? 'users' : 'admins'}.`);
 next(false);
 }
 else {
 next();
 }
 }
 } else if (to.matched.some(record => record.meta.requiresGuest)) {
 if (token) {
 alert('You are already logged in.');
 next({ name: role === 'user' ? 'Userhome' : 'Adminhome' });
 } else {
 next();
 }
 } else {
 next();
 }
 });
 export default router