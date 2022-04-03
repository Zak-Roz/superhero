import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/navigation/Home.vue';
import Help from './views/navigation/Help.vue';
import Profile from './views/navigation/Profile.vue';

import Register from './views/navigation/Register.vue';
import Login from './views/navigation/Login.vue';

import Superhero from './views/heros/Superhero.vue';
import NewSuperhero from './views/heros/NewSuperhero.vue';
import Superheros from './views/heros/Superheros.vue';
import EditSuperhero from './views/heros/EditSuperhero.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new-superhero',
      name: 'NewSuperhero',
      component: NewSuperhero
    },
    {
      path: '/edit-superhero/:id',
      component: EditSuperhero,
      props: true,
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/superhero/:id',
      component: Superhero,
      props: true,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/superheros',
      name: 'Superheros',
      component: Superheros,
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    }
  ]
});