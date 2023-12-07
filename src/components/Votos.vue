<script setup>
    // Importaciones
    import { reactive, ref, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import ApiServiceVotar from '../services/votosService'

    import Grafica from './Grafica.vue';
    import RouterLink from '../components/UI/RouterLink.vue';
    import { useVotos } from '../stores/votos';
    import {  useOpcion } from '../stores/opcionAdmin';

    // Instancia
    const Opcion = useOpcion()
    const Voto = useVotos()
    // States
    const seleccion = ref('')

    // Metodo ciclo de vida
    onMounted(() => {
        Voto.obtenerVotos()
        Voto.obtenerCandidatos()
    })


</script>

<template>
    <div>
        <RouterLink class=" float-right" to="admin">
            Volver
        </RouterLink>
        <h1 class="text-center text-5xl font-semibold text-gray-900 uppercase">Votos de {{ Opcion.Seleccion }}</h1>
    </div>
    <div class="contenedor mt-10 ">

        <h1 class="text-center  text-3xl text-green-500 uppercase  font-semibold">Candidatos</h1>
        <!-- Candidatos -->
        <div class="mt-10 grid grid-cols-6 gap-6 ">
                <div v-for="candidato in Voto.candidatoDB"
                    class=" rounded-lg  bg-[#f7f7f7] h-auto  w-36 min-h-0   shadow-lg cursor-pointer max-[600px]:w-24">
                    <img class=" m-auto shadow-sm  rounded-full w-20 h-20"
                        :src="candidato.foto" alt="nose" srcset="">
    
                    <h3 class="text-center text-neutral-800  text-lg  font-semibold">{{ candidato.nombre }} {{
                        candidato.apellido }}</h3>
    
                </div>
                <div class="w-36 shadow-lg bg-[#f7f7f7]  text-center cursor-pointer">
    
                    <h1 class="text-2xl mt-9 font-bold uppercase text-center">BLANCO</h1>
                </div>
            </div>
        <!-- Grafica de votos -->
        <div class=" flex justify-center space-x-4">
            <!-- Se le pasan los states -->
            <Grafica />
    
        </div>
    </div>
</template>
