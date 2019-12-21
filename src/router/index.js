import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/archives',
    name: 'archives',
    // route level code-splitting
    // this generates a separate chunk (archives.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "archives" */ '../views/archives.vue')
  },
  {
    path: '/archive',
    name: 'archive',
    // route level code-splitting
    // this generates a separate chunk (archive.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "archive" */ '../views/archive.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
