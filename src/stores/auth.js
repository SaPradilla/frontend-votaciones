import { defineStore } from "pinia";
import { onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
    // states
       
    // Instancia 
    const router = useRouter()
    // States
    const logueado = ref(false)
    const token = ref(null)
    const admin = ref(false)
   
    // Se ejecuta al haber un cambio en los states
 
  

    // Metodos ---->
    const isAdmin = () => {
        if (localStorage.getItem('admin')) {
            admin.value = true
        }
        return
    }

    const logout = () => {
        localStorage.clear()
        admin.value = false
        token.value = null
        logueado.value = false
        router.push({ name: 'inicio' })
        logueado.value = false
    }
    const ObtenerToken = () => {
        
        // Obtiene el token de localstorage y si es existe
        if (localStorage.getItem('token')) {
            // Guarda el token en setToken y lo asigna a state
            token.value = localStorage.getItem('token')
            if (token.value) {
                logueado.value = true
            }
        }
        return
    }
   
    // Metodos
    
    return {
        logueado,
        token,
        admin,

        logout,
        isAdmin,
        ObtenerToken
        
    }
})