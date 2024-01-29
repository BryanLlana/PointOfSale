import { createRouter, createWebHistory } from 'vue-router'
import ShopViewVue from '@/views/ShopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopViewVue
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      children: [
        {
          path: '/admin/productos',
          name: 'products',
          component: () => import('@/views/admin/ProductsView.vue')
        },
        {
          path: '/admin/productos/nuevo',
          name: 'new-product',
          component: () => import('@/views/admin/NewProductView.vue')
        },
        {
          path: '/admin/productos/editar/:id',
          name: 'edit-product',
          component: () => import('@/views/admin/EditProductView.vue')
        },
        {
          path: '/admin/ventas',
          name: 'sales',
          component: () => import('@/views/admin/SalesView.vue')
        }
      ]
    }
  ]
})

export default router
