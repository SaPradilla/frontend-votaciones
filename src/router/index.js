// Importaciones
import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../components/Inicio.vue'
import ListaCandidatos from '../components/ListaCandidatos.vue'
// Enrutador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/votar/:seleccion',
      name: 'Votar',
      component: () => import('../components/Cantidatos.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/DashboardAdmin.vue')
    },
    {
      path: '/registrar-votante/:seleccion',
      name: 'registro-votante',
      component: () => import('../views/Formulario.vue'),
      props: true,

    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },{
      path: '/admin',
      name: 'admin',
      component: () => import('../views/DashboardAdmin.vue'),
      // Ruta protegida
      meta: { requireAuth: true },
    },{
      path: '/candidatos',
      name: 'candidatos',
      component: ListaCandidatos,
      // Ruta protegida
      meta: { requireAuth: true },
    }
  ]
})

// Validación para las rutas protegidas
router.beforeEach((to, from, next) => {
  //Busca si la la ruta protegida tiene un meta requeriAuth = true y retorna false o true
  if(to.matched.some(record => record.meta.requireAuth)){

    if (localStorage.getItem('admin')) {
      // sigue a la ruta protegida
      next()
    } else {
      // se sale de la ruta porque esta protegida
      next('/')

    }
  }else {
    // Si la ruta no requiere autenticación, permite el acceso
    next()
  }

})

export default router
