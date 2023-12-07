import { defineStore } from "pinia";
import { onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import candidatoService from '../services/candidatoService';
import { useOpcion } from "./opcionAdmin";

export const useCandidatos = defineStore('candidatos', () => {
    // states

    const Opcion = useOpcion()
    const candidatosVotos = ref([])
    const candidatosAlcalde = ref([])
    const candidatosGobernador = ref([])
    const candidatosJunta = ref([])
    const candidatosAsamblea = ref([])
    const candidatosRepresentante = ref([])
    const cargando = ref(false)
    const selecciones = ref([
        'Alcalde',
        'Gobernador',
        'Junta comunal',
        'Representante SENA',
        'Asamblea'
    ])
    const candidatoUpdate = ref(null)
    const foto = ref([])
    const idCandidato = ref(null)
    // Metodos
    const editCandidato = () =>{
        
        cargando.value = true

        if(foto.value.length !== 0){
            console.log('sdfdjsh')
            candidatoUpdate.value.foto = foto.value[0].file
        }else{
            delete candidatoUpdate.value.foto
        }
        candidatoService.editarCandidato(candidatoUpdate.value.id,candidatoUpdate.value)
            .then(res => {
                console.log(res)
                console.log('dfdf')
            })
            .catch(err =>{
                console.log(err)

            })
        setTimeout(()=>{
            cargando.value = false
            Opcion.handleincioCandidato()
        },400)
    }

    const obtenerTodosCandidatos = async()=>{
        cargando.value = true
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
            } finally {
                setTimeout(()=>{
                    cargando.value = false
                },400)
            }
        }
    }

    const EliminarCandidato = () =>{
        // console.log(idCandidato.value)
        candidatoService.borrarCandidato(idCandidato.value)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
        vaciarState()
        obtenerTodosCandidatos()
        Opcion.modal = false
    }
    const vaciarState = ()=>{
        candidatosVotos.value = []
        candidatosAlcalde.value = []
        candidatosGobernador.value = []
        candidatosJunta.value = []
        candidatosAsamblea.value = []
        candidatosRepresentante.value = []
    }
    return {

        candidatosVotos,
        candidatosAlcalde,
        candidatosGobernador,
        candidatosAsamblea,
        candidatosJunta,
        candidatosRepresentante,
        candidatoUpdate,
        foto,
        cargando,
        idCandidato,

        obtenerTodosCandidatos,
        editCandidato,
        EliminarCandidato
    }
})