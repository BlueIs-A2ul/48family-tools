import { createRouter, createWebHistory } from 'vue-router'

import Seat from '../pages/purchaseSeat.vue'
import Spec from '../pages/purchaseSpec.vue'
import Write from '../pages/Write.vue'
import Home from '../pages/Home.vue'
import Peek from '../pages/peek.vue'
import Ep from '../pages/puchaseEP.vue'  
const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/purchaseSeat',
    component: Seat,
  },
  {
    path: '/purchaseSpec',
    component: Spec,
  },
  {
    path: '/purchaseEP',
    component: Ep,
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