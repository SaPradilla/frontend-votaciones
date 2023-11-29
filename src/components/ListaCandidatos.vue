<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, } from '@headlessui/vue'
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RouterLink from '../components/UI/RouterLink.vue'
// Api Endpoints
import ApiServiceCandidatos from '../services/candidatoService'
import ApiServiceVotar from '../services/votosService'
import ApiServiceVotantes from '../services/VotanteService'

// Componentes
import Login from '../views/Login.vue'
import Formulario from '../views/Formulario.vue'
import Completado from './Completado.vue'
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
const modal = ref(false)

// Ciclo de vida, se ejecuta cada que haga un cambio
onMounted(() => {
    seleccion.value = route.params.seleccion
    ObtenerToken()
    ObtenerIdVotante()
    ObtenerMenor()
    ApiServiceCandidatos.obtenerTodosCandidatos()
        .then(respuesta => {
            respuesta.data.Candidatos
            candidatos.value = respuesta.data.Candidatos
        })
        .catch(error => console.log('Hubo un error'))
})
// Observa los cambios del token cuando se logue
watch(token, () => {
    ObtenerToken()
})


// Obtiene le token
const ObtenerToken = () => {
    // Obtiene el token de localstorage y si es existe
    if (localStorage.getItem('token')) {
        // Guarda el token en setToken y lo asigna a state
        token.value = localStorage.getItem('token')
    }
    return
}
// Obtiene el id votante
const ObtenerIdVotante = () => {
    // Obtiene el token de localstorage y si es existe
    if (localStorage.getItem('exits-user')) {
        // Guarda el token en setToken y lo asigna a state
        identificadorPersona.value = parseInt(localStorage.getItem('exits-user'))
    }
    return
}
// Obtiene si es usuario es menor de localstorage
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
        candidatoSeleccionado.value = {}
    }
    seleccionadoBlanco.value = true
}
const Votar = () => {
    modalOpen()
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
const votarBlanco = () => {
    modalOpen()
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
const modalOpen = () => {
    modal.value = !modal.value
}
</script>

<template>
    <!-- Pantalla de cargar se muestra dependiento del state de cargando -->
    <div v-if="cargando" class="text-center">
        <Completado />
    </div>

    <div v-else class="contenedor">

        <div>
            <!-- Modal  para votar-->
            <div>
                <!-- Contenedor que muesta el contenido dependiendo del state modal -->
                <TransitionRoot appear :show="modal" as="template">
                    <!-- Contenedor del modal y se cierra dependiendo del state-->
                    <Dialog as="div" @close="modalOpen" class="relative z-10">
                        <!-- Animacion de inicio del modal -->
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                            enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
                            leave-to="opacity-0">
                            <!-- Background de fondo -->
                            <div class="fixed inset-0 bg-black bg-opacity-25" />
                        </TransitionChild>
                        <!-- Contenido del modal -->
                        <div class="fixed inset-0 overflow-y-auto">
                            <div class="flex min-h-full items-center justify-center p-4 text-center">
                                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                                    enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                                    leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">


                                    <!-- Titulos -->
                                    <DialogPanel
                                        class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                            {{ candidatoSeleccionado.nombre ? '¿Estas seguro que deseas votar por ' +
                                                candidatoSeleccionado.nombre : '¿Estas seguro que deseas votar en Blanco ' }} ?
                                        </DialogTitle>

                                        <div class="mt-2">
                                            <p class="text-sm text-gray-500">
                                                <span class=" font-semibold text-black">Importante :</span> Solo podras
                                                votar una vez y no puedes cambiar el voto.
                                            </p>
                                        </div>
                                        <!--  -->

                                        <!-- Botones -->
                                        <div class="flex space-x-40">
                                            <!-- Boton de Votar -->
                                            <div class="mt-4">
                                                <button type="button"
                                                    class=" w-max inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    @click="candidatoSeleccionado ? Votar() : votarBlanco()">
                                                    Editar {{ candidatoSeleccionado.nombre ? 'por   '+candidatoSeleccionado.nombre : 'en Blanco ' }}
                                                                                                        
                                                </button>
                                            </div>
                                            <!-- Boton de cerrar -->
                                            <div class="mt-4">
                                                <button type="button"
                                                    class="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    @click="modalOpen">
                                                    Borrar
                                                </button>
                                            </div>
                                            <!-- Boton de cerrar -->
                                            <div class="mt-4">
                                                <button type="button"
                                                    class="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    @click="modalOpen">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>

                                    </DialogPanel>

                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </TransitionRoot>
            </div>

            <!-- Si token existe es porque esta logueado y muestra este contenedor -->
            <div v-if="token" class="contenedor">
                <div class="flex justify-end">

                    <RouterLink style="background-color: #22c55e;" to="admin">
                        Volver
                    </RouterLink>
                </div>


                <h1 class=" text-5xl text-zinc-800 font-bold uppercase text-center "> Administrar Candidatos </h1>
                <p class="text-2xl mt-5 text-center">Seleccione un candidato para administrar</p>
                <div class="flex justify-end">

                    <RouterLink
                        style="  background-color: #22c55e; width: 300px; height: 50px; text-align: center; padding: 13px; font-size: 1.5em;"
                        to="formCandidato">Añadir Candidato
                    </RouterLink>
                </div>

                <!-- Contenedor de candidatos -->
                <div class="grid  grid-cols-3 max-[600px]:grid-cols-1   ">

                    <!-- Candidatos -->
                    <div v-for="candidato in candidatos" @click="Seleccionar(candidato)" :key="candidato.div"
                        :class="{ 'seleccionado': candidato.id === candidatoSeleccionado.id && seleccionado }"
                        class="candidato rounded-lg bg-[#f7f7f7] w-80 min-h-0  m-12 p-7 shadow-2xl cursor-pointer max-[600px]:w-80">

                        <!-- Se activa la clase dinamica al seleccionar un candidato -->
                        <div class="seleccionadoBoton -ml-8 absolute ">
                            <!-- Boton de votar aparece solo cuando se selecciona un candidato -->
                            <FormKit v-if="seleccionado && candidato.id === candidatoSeleccionado.id"
                                style="border-radius: 0; box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1); font-size: 1.4em; background-color:#10e45e ; width: 318px; height: 50px;   padding: 10px;"
                                type="button" @click="modalOpen">
                                <p>Adminitrar <span class="font-bold"> {{ candidatoSeleccionado.nombre }}</span></p>
                            </FormKit>
                        </div>

                        <!-- Info de los candidatos -->
                        <img :class="{ 'seleccionadoItems': candidato.id === candidatoSeleccionado.id && seleccionado }"
                            class=" m-auto shadow-sm  rounded-full w-44 h-44" :src="candidato.foto"
                            :alt="'imagen_candidato ' + candidato.nombre" srcset="">
                        <h3 :class="{ 'seleccionadoItems': candidato.id === candidatoSeleccionado.id && seleccionado }"
                            class="text-center text-neutral-800  text-3xl  font-semibold">{{ candidato.nombre }} {{
                                candidato.apellido }}</h3>
                        <h3 :class="{ 'seleccionadoItems': candidato.id === candidatoSeleccionado.id && seleccionado }"
                            class=" mb-6 text-center  text-neutral-600 italic  text-2xl font-semibold">
                            {{ candidato.cargo_postulante }}</h3>
                    </div>


                </div>

            </div>



        </div>

    </div>
</template>
<style>
/* Clases dinamicas al seleccionar */
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