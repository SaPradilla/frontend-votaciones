import { defineStore } from "pinia";
import { onMounted, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useCandidatos } from "./candidatos";

export const useOpcion = defineStore('opcionAdmin', () => {

    // Instancias
    const router = useRouter()
    const Candidato = useCandidatos()
    // states
    const dashboard = ref(true)

    const candidatos =  ref(false)
    const registroCandidato = ref(false)
    const editCandidato = ref(false)

    const incioCandidato = ref(false)
    const votos = ref(false)

    const Seleccion = ref('')
    const modalSelect = ref(false)
    
    
    // Instancia 
    const redirigirVotos = (xd) => {
        dashboard.value = false
        candidatos.value = false
        incioCandidato.value = false
        Seleccion.value = xd
        console.log(Seleccion.value)
        votos.value = true
        if(votos.value){
            votos.value = false
            setTimeout(()=>{
                votos.value = true

            },800)
        }
    }
    
    // Metodos

    const handleModalSelect = ()=>{

        modalSelect.value = !modalSelect.value
        setTimeout(() =>{
            if(modalSelect.value){
                modalSelect.value = false
            }
        },1500)

    }

    const handleCandidatos = ()=>{
        votos.value = false
        dashboard.value = false
        candidatos.value = true
        incioCandidato.value = true

    }
    const handleDashboard = ()=>{
        votos.value = false
        candidatos.value = false
        dashboard.value = true
    }
    const handleincioCandidato= ()=>{
        votos.value = false
        incioCandidato.value = true
        registroCandidato.value = false

    }

    const handleregistroCandidato = ()=>{
        votos.value = false
        incioCandidato.value = false
        registroCandidato.value = true
    }
    const handlEditCandidato = ()=>{
        incioCandidato.value = false
        registroCandidato.value = false
        editCandidato.value = true

    }
    return {
        candidatos,
        registroCandidato,
        dashboard,
        incioCandidato,
        Seleccion,
        modalSelect,
        votos,
        editCandidato,

        
        handleCandidatos,
        handleDashboard,
        handleregistroCandidato,
        handleincioCandidato,
        redirigirVotos,
        handleModalSelect,
        handlEditCandidato
        
    }
})