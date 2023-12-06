import { defineStore } from "pinia";
import { onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'

export const useOpcion = defineStore('opcionAdmin', () => {
    // states
    const dashboard = ref(true)

    const candidatos =  ref(false)
    const registroCandidato = ref(false)
    const incioCandidato = ref(false)

    const Seleccion = ref(null)

    // Instancia 
   
    // Metodos
    const handleCandidatos = ()=>{
        dashboard.value = false
        candidatos.value = true
        incioCandidato.value = true

    }
    const handleDashboard = ()=>{
        candidatos.value = false
        dashboard.value = true
    }
    const handleincioCandidato= ()=>{
        incioCandidato.value = true
        registroCandidato.value = false

    }

    const handleregistroCandidato = ()=>{
        incioCandidato.value = false
        registroCandidato.value = true
    }

    return {
        candidatos,
        registroCandidato,
        dashboard,
        incioCandidato,
        Seleccion,

        handleCandidatos,
        handleDashboard,
        handleregistroCandidato,
        handleincioCandidato
        
    }
})