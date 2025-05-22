import { createRouter, createWebHashHistory } from 'vue-router'

import Seat from '../pages/purchaseSeat.vue'
import Spec from '../pages/purchaseSpec.vue'
import Write from '../pages/Write.vue'
import Home from '../pages/Home.vue'
import Peek from '../pages/peek.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
      path: '/purchaseSeat',
    component: Seat,
  },
  {
    path: '/purchaseSpec',
    component: Spec,
  },
  {
    path: '/write',
    component: Write,
    },
  {
    path: '/Home',
    component: Home,
  },
  {
    path: '/peek',
    component: Peek,
  },
  {
    path: '/',
    redirect:'/Home'
  }
  ],
})

export default router