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
import Spinner from '../components/Spinner.vue'
// Componentes

// Instancias de vue-router

const Candidato = useCandidatos()
const Opcion = useOpcion()
// State


// Ciclo de vida, se ejecuta cada que haga un cambio
onMounted(() => {
    Candidato.obtenerTodosCandidatos()
})
watch(() => Candidato.candidatosAlcalde, (newTipo) => {
})
watch(() => Candidato.candidatosAsamblea, (newTipo) => {
})
watch(() => Candidato.candidatosGobernador, (newTipo) => {
})
watch(() => Candidato.candidatosJunta, (newTipo) => {
})
watch(() => Candidato.candidatosRepresentante, (newTipo) => {
})

const modalOpen = ()=>{
    Opcion.modal = !Opcion.modal
}

const modalCandidato = (id)=>{
    Opcion.modal = true
    Candidato.idCandidato = id

}

</script>

<template>
    <!-- Pantalla de cargar se muestra dependiento del state de cargando -->
    <div v-if="false" class="text-center  flex flex-col justify-center items-center  h-[90vh]">
        <Spinner/>
        <h1 class="mt-[-80px] text-green-500">Cargando Candidatos..</h1>
    </div>
    <div v-else class="contenedor">
            <!-- Modal  para votar-->
            <div class="modal-decision">
                <!-- Contenedor que muesta el contenido dependiendo del state modal -->
                <TransitionRoot appear :show="Opcion.modal" >
                    <!-- Contenedor del modal y se cierra dependiendo del state-->
                    <Dialog as="div" @close="modalOpen" class="relative z-10">
                    <!-- Animacion de inicio del modal -->
                    <TransitionChild
                        
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                    <!-- Background de fondo -->
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>
                    <!-- Contenido del modal -->
                    <div class="fixed inset-0 overflow-y-auto">
                        <div
                        class="flex min-h-full items-center justify-center p-4 text-center"
                        >
                        <TransitionChild
                           
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >   


                        <!-- Titulos -->
                            <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6  shadow-xl transition-all"
                            >
                            <DialogTitle
                                as="h3"
                                class="text-lg font-medium leading-6 text-gray-900"
                            >
                            ¿Estas seguro que deseas eliminarlo?
                            </DialogTitle>

                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                <span class=" font-semibold text-black">IMPORTANTE :</span> Esta accion es irreversible, no podras RECUPERARLO
                                </p>
                            </div>
                        <!--  -->

                            <!-- Botones -->
                            <div class="flex  justify-between">
                                <!-- Boton de Votar -->
                                <div class="mt-4">
                                    <button
                                    type="button"
                                    class=" w-max inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="Candidato.EliminarCandidato()"
                                    >
                                     Eliminar
                                    </button>
                                </div>
                                <!-- Boton de cerrar -->
                                <div class="mt-4">
                                    <button
                                    type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="modalOpen"
                                    >
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

        <div>
    
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

                        <div class=" flex  justify-between">
                            <div 
                                @click="Opcion.handlEditCandidato(candidato)"
                                class="icon">
                                <svg class="fill-green-500 hover:fill-green-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    
                                <path  d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.588 1.413T19 21H5Zm7-9Zm-3 3v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.138.738t-.437.662L13.25 15H9ZM21.025 4.4l-1.4-1.4l1.4 1.4ZM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575V13Zm6.5-6.5l-.725-.7l.725.7l.7.7l-.7-.7Z"/></svg>
                            </div>
                            <div 
                            @click="modalCandidato(candidato.id)"
                            class="icon">
                                <svg class="fill-red-600 hover:fill-red-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path  d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
                            </div>
                        </div>

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

                          <div class=" flex  justify-between">
                            <div 
                                @click="Opcion.handlEditCandidato(candidato)"
                                class="icon">
                                <svg class="fill-green-500 hover:fill-green-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    
                                <path  d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.588 1.413T19 21H5Zm7-9Zm-3 3v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.138.738t-.437.662L13.25 15H9ZM21.025 4.4l-1.4-1.4l1.4 1.4ZM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575V13Zm6.5-6.5l-.725-.7l.725.7l.7.7l-.7-.7Z"/></svg>
                            </div>
                            <div 
                            @click="modalCandidato(candidato.id)"
                            class="icon">
                                <svg class="fill-red-600 hover:fill-red-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path  d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
                            </div>
                        </div>

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
                        <div class=" flex  justify-between">
                            <div 
                                @click="Opcion.handlEditCandidato(candidato)"
                                class="icon">
                                <svg class="fill-green-500 hover:fill-green-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    
                                <path  d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.588 1.413T19 21H5Zm7-9Zm-3 3v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.138.738t-.437.662L13.25 15H9ZM21.025 4.4l-1.4-1.4l1.4 1.4ZM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575V13Zm6.5-6.5l-.725-.7l.725.7l.7.7l-.7-.7Z"/></svg>
                            </div>
                            <div 
                            @click="modalCandidato(candidato.id)"
                            class="icon">
                                <svg class="fill-red-600 hover:fill-red-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path  d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
                            </div>
                        </div>
                        
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
                        <div class=" flex  justify-between">
                            <div 
                                @click="Opcion.handlEditCandidato(candidato)"
                                class="icon">
                                <svg class="fill-green-500 hover:fill-green-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    
                                <path  d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.588 1.413T19 21H5Zm7-9Zm-3 3v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.138.738t-.437.662L13.25 15H9ZM21.025 4.4l-1.4-1.4l1.4 1.4ZM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575V13Zm6.5-6.5l-.725-.7l.725.7l.7.7l-.7-.7Z"/></svg>
                            </div>
                            <div 
                            @click="modalCandidato(candidato.id)"
                            class="icon">
                                <svg class="fill-red-600 hover:fill-red-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path  d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
                            </div>
                        </div>
                        
                        
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

                        <div class=" flex  justify-between">
                            <div 
                                @click="Opcion.handlEditCandidato(candidato)"
                                class="icon">
                                <svg class="fill-green-500 hover:fill-green-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    
                                <path  d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.588 1.413T19 21H5Zm7-9Zm-3 3v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.138.738t-.437.662L13.25 15H9ZM21.025 4.4l-1.4-1.4l1.4 1.4ZM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575V13Zm6.5-6.5l-.725-.7l.725.7l.7.7l-.7-.7Z"/></svg>
                            </div>
                            <div 
                            @click="modalCandidato(candidato.id)"
                            class="icon">
                                <svg class="fill-red-600 hover:fill-red-300 " xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path  d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
                            </div>
                        </div>
                        
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

</style>