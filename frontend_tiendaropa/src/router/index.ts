import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue')
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: () => import('../views/EmpleadoView.vue')
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/CategoriaView.vue')
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/ProductoView.vue')
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/VentaView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
    // {
    //   path: '/canciones',
    //   name: 'canciones',
    //   component: () => import('../views/CancionView.vue')
    // },
    // {
    //   path: '/albumes',
    //   name: 'albumes',
    //   component: () => import('../views/AlbumView.vue')
    // },
  ]
})

// router.beforeEach(async to => {
//   const publicPages = ["/login", "/", "/about"];
//   const authRequired = !publicPages.includes(to.path);
//   const authStore = useAuthStore();

//   if (authRequired && !getTokenFromLocalStorage()) {
//     if (authStore) authStore.logout();
//     authStore.returnUrl = to.fullPath;
//     return "/login";
//   }
// });

// router.beforeEach(async (to, from, next) => {
//   const publicPages = ['/', '/login','/clientes', '/empleados', '/categorias','/productos','/ventas'] // Páginas públicas
//   const authRequired = !publicPages.includes(to.path)
//   const authStore = useAuthStore()

//   // Verificar si el usuario tiene un token válido
//   if (authRequired && !getTokenFromLocalStorage()) {
//     if (authStore) authStore.logout()
//     authStore.returnUrl = to.fullPath
//     return next({ name: 'login' })  // Redirige a la página de login
//   }
// })

export default router

