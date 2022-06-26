import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
		path: '/board',
		name: 'board',
		// route level code-splitting
		// this generates a separate chunk (Board.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../views/BoardView.vue')
	  }
  ]
})

export default router
