import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import RoomsView from './views/RoomsView.vue'
import AdminView from './views/AdminView.vue'
import ServicesView from './views/ServicesView.vue'
import RestaurantsView from './views/RestaurantsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/services', name: 'services', component: ServicesView },
    { path: '/restaurants', name: 'restaurants', component: RestaurantsView },
    { path: '/rooms', name: 'rooms', component: RoomsView },
    { path: '/admin', name: 'admin', component: AdminView },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
