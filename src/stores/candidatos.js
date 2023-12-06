import { defineStore } from "pinia";
import { onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import candidatoService from '../services/candidatoService';

export const useCandidatos = defineStore('candidatos', () => {
    // states
    const candidatosVotos = ref([])
    const candidatosAlcalde = ref([])
    const candidatosGobernador = ref([])
    const candidatosJunta = ref([])
    const candidatosAsamblea = ref([])
    const candidatosRepresentante = ref([])

    const selecciones = ref([
        'Alcalde',
        'Gobernador',
        'Junta comunal',
        'Representante SENA',
        'Asamblea'
    ])

    // Metodos
    const obtenerTodosCandidatos = async()=>{
        for (const element of selecciones.value) {
            
            try {

                const res = await candidatoService.obtenerCandidatos(element)

                switch (element) {
                    case 'Alcalde':
                        candidatosAlcalde.value = res.data.Candidatos
                        break
                    case 'Gobernador':
                        candidatosGobernador.value = res.data.Candidatos
                        break
                    case 'Junta comunal':
                        candidatosJunta.value = res.data.Candidatos
                        break
                    case 'Representante SENA':
                        candidatosRepresentante.value = res.data.Candidatos
                        break
                    case 'Asamblea':
                        candidatosAsamblea.value = res.data.Candidatos
                        break
                    default:
                        break
                }
            } catch (error) {
                console.error(`Error obteniendo candidatos para ${element}:`, error)
            }
        }
    }
    return {

        candidatosVotos,
        candidatosAlcalde,
        candidatosGobernador,
        candidatosAsamblea,
        candidatosJunta,
        candidatosRepresentante,

        obtenerTodosCandidatos
    }
})