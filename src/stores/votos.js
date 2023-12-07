import { defineStore } from "pinia";
import { onMounted, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import ApiServiceCandidatos from '../services/candidatoService'
import { useOpcion } from "./opcionAdmin";
import ApiServiceVotar from '../services/votosService'
export const useVotos = defineStore('votos', () => {

    const votos = ref([])
    const cantidadVotos = ref([])
    const candidatos = ref([])
    const candidatoDB = ref([])
    const Opcion = useOpcion()
    

    const obtenerCandidatos = ()=>{
        // Obtiene los candidatos
        ApiServiceCandidatos.obtenerCandidatos(Opcion.Seleccion)
        .then(respuesta => {
            // La respuesta la almacena en el state
            candidatoDB.value = respuesta.data.Candidatos
        })
        .catch(error => console.log('Hubo un error'))
    
    }
    

    const obtenerVotos = () =>{
        ApiServiceVotar.obtenerVotos(Opcion.Seleccion)
        .then(respuesta => {
            // La respuesta la almacena en el state
            votos.value = respuesta.data.Votos
            obtenerCantidadVotos()
    
        })
        .catch(error => console.log(error))
    }

    // Logica by ChatGpt
    const obtenerCantidadVotos = () => {
        const conteoVotos = {};
        // Intera el state de votos
        votos.value.forEach(voto => {
            // Si el voto tiene un candidato.nombre quiere que es un voto pot un candidato y se asigna la varible nombre
            // Sino se llamara blanco
            const nombre = voto.candidato && voto.candidato.nombre ? voto.candidato.nombre : 'Blanco';
            // Cuenta cada vez que existe un candidato 
            if (nombre in conteoVotos) {
                conteoVotos[nombre]++;
            // si es la primera vez asigna 1 al voto
            } else {
                conteoVotos[nombre] = 1;
            }
        })
        // Obtener los nombres de candidatos sin repetir
        candidatos.value = Object.keys(conteoVotos);

        // Obtener la cantidad de votos en el mismo orden que los nombres
        cantidadVotos.value = candidatos.value.map(nombre => conteoVotos[nombre]);
    }
    
    return {
        votos,
        candidatoDB,
        candidatos,
        cantidadVotos,
        
        obtenerVotos,
        obtenerCantidadVotos,
        obtenerCandidatos,
       
        
    }
})