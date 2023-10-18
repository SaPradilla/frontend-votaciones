<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RouterLink from '../components/UI/RouterLink.vue';
// Api Endpoints
import ApiServiceCandidatos from '../services/candidatoService'
import ApiServiceVotar from '../services/votosService'
import ApiServiceVotantes from '../services/VotanteService'

// Componentes
import Login from '../views/Login.vue';
import Formulario from '../views/Formulario.vue';
import Completado from './Completado.vue';
// Instancias de vue-router
const route = useRoute()
const router = useRouter()
// State
const token = ref('')
const candidatos = ref([])
const seleccion = ref('')
const seleccionado = ref(false)
const seleccionadoBlanco = ref(false)
const candidatoSeleccionado = ref({})
const identificadorPersona = ref(0)
const tieneCuenta = ref(true)
const yaVotoSeleccion = ref(false)
const cargando = ref(false)
const seleccionesVotadas = ref([])
const isMenorEdad = ref(false)

// Ciclo de vida, se ejecuta cada que haga un cambio
onMounted(() => {
    seleccion.value = route.params.seleccion
    ObtenerToken()
    ObtenerIdVotante()
    ObtenerMenor()
    ApiServiceCandidatos.obtenerCandidatos(seleccion.value)
        .then(respuesta => {
            respuesta.data.Candidatos
            candidatos.value = respuesta.data.Candidatos
        })
        .catch(error => console.log('Hubo un error'))
})

watch(token, () => {
    ObtenerToken()
    ObtenerSeleccionesVotadas()

})

const ObtenerSeleccionesVotadas = () => {
    if(localStorage.getItem('selecciones-votadas')){
        seleccionesVotadas.value = JSON.parse(localStorage.getItem('selecciones-votadas'))
        if (seleccionesVotadas.value.find((seleccionesVotadas) => seleccionesVotadas === seleccion.value)) {
            yaVotoSeleccion.value = true
        }
    }
    else{
        ApiServiceVotantes.validarEleccionesVotadas(identificadorPersona.value)
            .then(respuesta =>{
                const selecciones = respuesta.data.SeleccionesVotadas 
                if(selecciones.length > 0){
                    seleccionesVotadas.value = respuesta.data.SeleccionesVotadas
                    localStorage.setItem('selecciones-votadas', JSON.stringify(respuesta.data.SeleccionesVotadas))
                }
                return
            }).catch(error=> console.log(error))
            setTimeout(() => {   
                if (seleccionesVotadas.value.find((seleccionesVotadas) => seleccionesVotadas === seleccion.value)) {
                    yaVotoSeleccion.value = true
                }
            }, 1000)
    }

    
}
const ObtenerToken = () => {
    // Obtiene el token de localstorage y si es existe
    if (localStorage.getItem('token')) {
        // Guarda el token en setToken y lo asigna a state
        token.value = localStorage.getItem('token')
    }
    return
}
const ObtenerIdVotante = () => {
    // Obtiene el token de localstorage y si es existe
    if (localStorage.getItem('exits-user')) {
        // Guarda el token en setToken y lo asigna a state
        identificadorPersona.value = parseInt(localStorage.getItem('exits-user'))
    }
    return
}
const ObtenerMenor = () => {
    if (localStorage.getItem('validationMenor')) {
        isMenorEdad.value = localStorage.getItem('validationMenor')
    }
    return
}
const Seleccionar = (candidato) => {
    candidatoSeleccionado.value = candidato
    seleccionado.value = true
    seleccionadoBlanco.value = false
}
const SeleccionarBlanco = () => {
    if (seleccionado.value) {
        seleccionado.value = false
    }
    seleccionadoBlanco.value = true
}
const Votar = (candidato) => {
    if (window.confirm(`Quiere votar por el candidato ${candidato.nombre} `)) {
        cargando.value = true
        ApiServiceVotar.Votar(seleccion.value, candidatoSeleccionado.value.id, identificadorPersona.value)
            .then(respuesta => {
                if (respuesta.data.yaVoto) {
                    yaVotoSeleccion.value = true
                }
                seleccionesVotadas.value.push(respuesta.data.seleccion)

                localStorage.setItem('selecciones-votadas', JSON.stringify(seleccionesVotadas.value))
            })
            .catch(error => {
                console.log(error)
            })

        setTimeout(() => {
            cargando.value = false
            router.push({ name: 'inicio' })
        }, 1500)
    }
    else {
        return
    }
}
const votarBlanco = () => {
    if (window.confirm('Quiere votar en blanco? ')) {
        cargando.value = true
        ApiServiceVotar.VotarBlanco(seleccion.value, identificadorPersona.value)
            .then(respuesta => {
                if (respuesta.data.yaVoto) {
                    yaVotoSeleccion.value = true
                }
                seleccionesVotadas.value.push(respuesta.data.seleccion)
                localStorage.setItem('selecciones-votadas', JSON.stringify(seleccionesVotadas.value))

            }).catch(error => {
                console.log(error)
            })
        setTimeout(() => {
            cargando.value = false
            router.push({ name: 'inicio' })
        }, 1500)
    }
}

</script>

<template>
    <div v-if="cargando" class="text-center">
        <Completado />
    </div>

    <div v-else class="contenedor">
        <!-- En caso de que sea menor de edad o ya haya votada por este cargo -->
        <div v-if="yaVotoSeleccion || isMenorEdad && seleccion !== 'Asamblea' && seleccion !== 'Representante SENA'"
            class="mt-12">
            <h1 class="text-5xl  font-bold text-green-500 uppercase text-center"> {{  isMenorEdad ? 'No puedes votar por este cargo eres menor de edad' : 'Ya votaste por este cargo' }}</h1>
            <div class="flex justify-center mt-12">
                <RouterLink
                    style="  background-color: #22c55e; width: 300px; height: 50px; text-align: center; padding: 14px; font-size: 1.5em;"
                    to="inicio">
                    Volver
                </RouterLink>
            </div>

        </div>
        <div v-else>

            <!-- Si token existe es porque esta logueado y muestra este contenedor -->
            <div v-if="token" class="contenedor">
                <div class="flex justify-end">
                    <RouterLink style="background-color: #22c55e;" to="inicio">
                        Volver
                    </RouterLink>
                </div>

                <h1 class=" text-4xl text-zinc-800 font-bold uppercase text-center "> Candidatos a {{ seleccion }} </h1>
                <p class="text-2xl text-center">Seleccione un candidato</p>
                <div class="grid  grid-cols-3 max-[600px]:grid-cols-1   ">
                    <!-- Candidatos -->
                    <div v-for="candidato in candidatos" @click="Seleccionar(candidato)" :key="candidato.div"
                        :class="{ 'seleccionado': candidato.id === candidatoSeleccionado.id && seleccionado }"
                        class="candidato rounded-lg bg-slate-50 w-80 min-h-0  m-12 p-7 shadow-2xl cursor-pointer max-[600px]:w-80">

                        <div class="seleccionadoBoton -ml-8 absolute ">

                            <FormKit v-if="seleccionado && candidato.id === candidatoSeleccionado.id"
                                style="border-radius: 0; box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1); font-size: 1.4em; background-color:#10e45e ; width: 318px; height: 50px;   padding: 10px;"
                                type="button" @click="Votar(candidatoSeleccionado)">

                                <p>Votar por <span class="font-bold"> {{ candidatoSeleccionado.nombre }}</span></p>

                            </FormKit>

                        </div>

                        <img :class="{ 'seleccionadoItems': candidato.id === candidatoSeleccionado.id && seleccionado }"
                            class=" m-auto border-green-600 border-4  rounded-full w-44 h-44"
                            :src="`http://localhost:5650/candidatos/${candidato.foto}`" alt="nose" srcset="">

                        <h3 :class="{ 'seleccionadoItems': candidato.id === candidatoSeleccionado.id && seleccionado }"
                            class="text-center text-green-600  text-3xl font-semibold">{{ candidato.nombre }} {{
                                candidato.apellido }}</h3>

                        <h3 :class="{ 'seleccionadoItems': candidato.id === candidatoSeleccionado.id && seleccionado }"
                            class=" mb-16 text-center text-neutral-800 italic  text-2xl font-semibold">
                            {{ candidato.cargo_postulante }}</h3>

                        <div :class="{ 'seleccionadoItems': candidato.id === candidatoSeleccionado.id && seleccionado }"
                            class="biografia">
                            <h3 class=" break-words text-neutral-800  text-xl font-semibold">{{ candidato.biografia }} </h3>
                        </div>



                    </div>
                    <!-- Voto en blanco -->
                    <div class="col-span-1  flex m-auto   items-centerjustify-center  ">
                        <div @click="SeleccionarBlanco" class="w-80 h-80 p-7 shadow-2xl m-16 text-center cursor-pointer"
                            :class="{ 'seleccionado seleccionadoItems': seleccionadoBlanco }">

                            <h1 :class="{ 'seleccionadoItems': seleccionadoBlanco }"
                                class="text-5xl mt-24  font-bold uppercase text-center">BLANCO</h1>
                            <div class="seleccionadoBoton -ml-8  ">

                                <FormKit v-if="seleccionadoBlanco"
                                    style=" border-radius: 0px 0px 5px 5px; font-size: 1.4em; background-color:#22c55e ; width: 318px; height: 50px; text-align:center;  padding: 10px;"
                                    type="button" @click="votarBlanco">
                                    <p>Votar en <span class="font-bold"> BLANCO </span></p>

                                </FormKit>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <!-- Sino Se logea -->
            <div v-else class="">
                <div class="flex justify-end">
                    <RouterLink style="background-color: #22c55e;" to="inicio">
                        Cancelar
                    </RouterLink>
                </div>
                <div class="mx-auto mt-10 rounded-md bg-white shadow  md:w-1/2 py-20 px-6">
                    <Login v-if="tieneCuenta" v-model:identificadorPersona="identificadorPersona" v-model:token="token"
                        v-model:tieneCuenta="tieneCuenta" v-model:isMenorEdad="isMenorEdad" />
                    <Formulario v-else v-model:tieneCuenta="tieneCuenta" />
                </div>
            </div>

        </div>

    </div>
</template>
<style>
.seleccionado {
    border: solid #22c55e 3px;
    background-color: #198f3d8c;
}

.seleccionado .seleccionadoBoton {
    filter: none;
    z-index: 1000;
    margin-top: 15%;
}

.seleccionado .seleccionadoItems {
    filter: blur(1.5px);

}
</style>