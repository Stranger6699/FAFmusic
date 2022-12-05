import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/homeMusic',
    name: 'homeMusic',
    component: () => import(/* webpackChunkName: "about" */'./../components/homeMusic/homeMusic.vue'),
    children: [
      { path: '/homeMusic/audioUnit', name: 'audioUnit', component: () => import("@/components/audioUnit/audioUnit.vue")},
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */'../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
