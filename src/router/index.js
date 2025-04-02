import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductAPI from '@/views/Product_API.vue'
import customer from '@/views/Customer.vue'
import ProductTable from '@/views/ProductTable.vue'
import All_product from '@/views/All_product.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/All_product',
    name: 'All_product',
    component: All_product
  },
  {
    path: '/customer',
    name: 'customer',
    component: customer
  },
  {
    path: '/ProductTable',
    name: 'ProductTable',
    component: ProductTable
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/productapi',
    name: 'productapi',
    component: ProductAPI
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
