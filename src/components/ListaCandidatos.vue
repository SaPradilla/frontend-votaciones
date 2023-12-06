<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, } from '@headlessui/vue'
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RouterLink from '../components/UI/RouterLink.vue'
// Api Endpoints
import ApiServiceCandidatos from '../services/candidatoService'
import ApiServiceVotar from '../services/votosService'
import ApiServiceVotantes from '../services/VotanteService'
import {useCandidatos} from '../stores/candidatos'
import { useOpcion } from '../stores/opcionAdmin';  

// Componentes

// Instancias de vue-router
const route = useRoute()
const router = useRouter()
const Candidato = useCandidatos()
const Opcion = useOpcion()
// State
const token = ref('')
const seleccionado = ref(false)
const seleccionadoBlanco = ref(false)
const candidatoSeleccionado = ref({})

const modal = ref(false)

// Ciclo de vida, se ejecuta cada que haga un cambio
onMounted(() => {
    Candidato.obtenerTodosCandidatos()
})


</script>

<template>
    <!-- Pantalla de cargar se muestra dependiento del state de cargando -->
    <!-- <div v-if="cargando" class="text-center">
        <Completado />
    </div> -->

    <div class="contenedor">

        <div>
            <!-- Modal  para votar-->
            <div class="contenedor">


                <h1 class=" text-5xl text-zinc-800 font-bold uppercase text-center "> Administrar Candidatos </h1>
                <p class="text-2xl mt-5 text-center">Seleccione un candidato para administrar</p>
                <div class="flex justify-end">
                    <div  
                    class=" bg-green-500 h-10 w-36 text-white cursor-pointer text-center rounded-lg flex justify-center  items-center" 
                    @click="Opcion.handleregistroCandidato" 
                    >
                        Añadir Candidato
                    </div>
  
                </div>

                <!-- Alcaldes -->

                <h1 class="text-center text-5xl" >Alcaldes</h1>
                <div class="grid grid-cols-3 max-[600px]:grid-cols-1   ">    
                    <div v-for="candidato in Candidato.candidatosAlcalde" :key="candidato.id"
                        class="candidato rounded-lg bg-[#f7f7f7] w-80 h-max m-12 p-7 shadow-2xl cursor-pointer">

                        
                        <div class=" flex flex-col gap-2">

                            <img 
                                class=" m-auto shadow-sm  rounded-full w-24 h-24 " :src="candidato.foto"
                                :alt="'imagen_candidato ' + candidato.nombre" srcset="">

                            <h3 
                                class="text-center text-neutral-800  text-3xl  font-semibold">{{ candidato.nombre }} {{
                                    candidato.apellido }}</h3>

                            <h3 
                                class=" text-center  text-neutral-600 italic  text-2xl font-semibold">
                                {{ candidato.cargo_postulante }}</h3>

                        </div>

                    </div>
                </div>

                <h1 class="text-center text-5xl" >Gobernadores</h1>
                <div class="grid grid-cols-3 max-[600px]:grid-cols-1   ">    
                    <div v-for="candidato in Candidato.candidatosGobernador" :key="candidato.id"
                        class="candidato rounded-lg bg-[#f7f7f7] w-80 h-max m-12 p-7 shadow-2xl cursor-pointer">

                        
                        <div class=" flex flex-col gap-2">

                            <img 
                                class=" m-auto shadow-sm  rounded-full w-24 h-24 " :src="candidato.foto"
                                :alt="'imagen_candidato ' + candidato.nombre" srcset="">

                            <h3 
                                class="text-center text-neutral-800  text-3xl  font-semibold">{{ candidato.nombre }} {{
                                    candidato.apellido }}</h3>

                            <h3 
                                class=" text-center  text-neutral-600 italic  text-2xl font-semibold">
                                {{ candidato.cargo_postulante }}</h3>

                        </div>

                    </div>
                </div>

                <h1 class="text-center text-5xl" >Junta Comunal</h1>
                <div class="grid grid-cols-3 max-[600px]:grid-cols-1   ">    
                    <div v-for="candidato in Candidato.candidatosJunta" :key="candidato.id"
                        class="candidato rounded-lg bg-[#f7f7f7] w-80 h-max m-12 p-7 shadow-2xl cursor-pointer">

                        
                        <div class=" flex flex-col gap-2">

                            <img 
                                class=" m-auto shadow-sm  rounded-full w-24 h-24 " :src="candidato.foto"
                                :alt="'imagen_candidato ' + candidato.nombre" srcset="">

                            <h3 
                                class="text-center text-neutral-800  text-3xl  font-semibold">{{ candidato.nombre }} {{
                                    candidato.apellido }}</h3>

                            <h3 
                                class=" text-center  text-neutral-600 italic  text-2xl font-semibold">
                                {{ candidato.cargo_postulante }}</h3>

                        </div>

                    </div>
                </div>


                <h1 class="text-center text-5xl" >Asamblea</h1>
                <div class="grid grid-cols-3 max-[600px]:grid-cols-1   ">    
                    <div v-for="candidato in Candidato.candidatosAsamblea" :key="candidato.id"
                        class="candidato rounded-lg bg-[#f7f7f7] w-80 h-max m-12 p-7 shadow-2xl cursor-pointer">

                        
                        <div class=" flex flex-col gap-2">

                            <img 
                                class=" m-auto shadow-sm  rounded-full w-24 h-24 " :src="candidato.foto"
                                :alt="'imagen_candidato ' + candidato.nombre" srcset="">

                            <h3 
                                class="text-center text-neutral-800  text-3xl  font-semibold">{{ candidato.nombre }} {{
                                    candidato.apellido }}</h3>

                            <h3 
                                class=" text-center  text-neutral-600 italic  text-2xl font-semibold">
                                {{ candidato.cargo_postulante }}</h3>

                        </div>

                    </div>
                </div>


                <h1 class="text-center text-5xl" >Representante </h1>
                <div class="grid grid-cols-3 max-[600px]:grid-cols-1   ">    
                    <div v-for="candidato in Candidato.candidatosRepresentante" :key="candidato.id"
                        class="candidato rounded-lg bg-[#f7f7f7] w-80 h-max m-12 p-7 shadow-2xl cursor-pointer">

                        
                        <div class=" flex flex-col gap-2">

                            <img 
                                class=" m-auto shadow-sm  rounded-full w-24 h-24 " :src="candidato.foto"
                                :alt="'imagen_candidato ' + candidato.nombre" srcset="">

                            <h3 
                                class="text-center text-neutral-800  text-3xl  font-semibold">{{ candidato.nombre }} {{
                                    candidato.apellido }}</h3>

                            <h3 
                                class=" text-center  text-neutral-600 italic  text-2xl font-semibold">
                                {{ candidato.cargo_postulante }}</h3>

                        </div>

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
}

.seleccionado .seleccionadoItems {
    filter: blur(1.5px);
}
</style>