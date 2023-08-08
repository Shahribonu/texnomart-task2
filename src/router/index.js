import { createRouter, createWebHistory } from 'vue-router'
import Page404 from '../views/Page404.vue'
import ProductList from '../modules/products/views/ProductList.vue'
import ProductDetails from '../modules/products/views/ProductDetails.vue'
import Register from '../modules/auth/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    
      component: ProductList
    },
    {
      path: '/products/:id',
      name: 'productDetails',
      component: ProductDetails
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
   
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Page404
    },
  ]
})

export default router
