<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ApiServiceVotar from '../services/votosService'
import ApiServiceCandidatos from '../services/candidatoService'

import Grafica from './Grafica.vue';
const route = useRoute()
import RouterLink from '../components/UI/RouterLink.vue';

// States
const seleccion = ref('')
const votos = ref([])
const cantidadVotos = ref([])
const candidatos = ref([])
const candidatoDB = ref([])


onMounted(() => {
    seleccion.value = route.params.seleccion
    ApiServiceVotar.obtenerVotos(seleccion.value)
        .then(respuesta => {
            votos.value = respuesta.data.Votos
            obtenerCantidadVotos()

        })
        .catch(error => console.log(error))
    ApiServiceCandidatos.obtenerCandidatos(route.params.seleccion)
        .then(respuesta => {
            candidatoDB.value = respuesta.data.Candidatos
        })
        .catch(error => console.log('Hubo un error'))

})
// Logica by ChatGpt
const obtenerCantidadVotos = () => {
    const conteoVotos = {};
    votos.value.forEach(voto => {
        const nombre = voto.candidato && voto.candidato.nombre ? voto.candidato.nombre : 'Blanco';
        if (nombre in conteoVotos) {
            conteoVotos[nombre]++;
        } else {
            conteoVotos[nombre] = 1;
        }
    })
    // Obtener los nombres de candidatos sin repetir
    candidatos.value = Object.keys(conteoVotos);

    // Obtener la cantidad de votos en el mismo orden que los nombres
    cantidadVotos.value = candidatos.value.map(nombre => conteoVotos[nombre]);

}


</script>

<template>
    <div>
        <h1 class="text-center text-5xl font-semibold text-gray-900 uppercase">Votos de elecciones para {{ seleccion }}</h1>
    </div>
    <RouterLink class=" float-right" to="admin">
        Volver
    </RouterLink>
    <div class="contenedor mt-10 ">

        <h1 class="text-center  text-3xl text-green-500 uppercase  font-semibold">Candidatos</h1>
        <div class="mt-10 grid grid-cols-6 gap-6 ">
                <div v-for="candidato in candidatoDB"
                    class=" rounded-lg  bg-[#f7f7f7] h-auto  w-36 min-h-0   shadow-lg cursor-pointer max-[600px]:w-24">
                    <img class=" m-auto shadow-sm  rounded-full w-20 h-20"
                        :src="`http://localhost:5650/candidatos/${candidato.foto}`" alt="nose" srcset="">
    
                    <h3 class="text-center text-neutral-800  text-lg  font-semibold">{{ candidato.nombre }} {{
                        candidato.apellido }}</h3>
    
                </div>
                <div class="w-36 shadow-lg bg-[#f7f7f7]  text-center cursor-pointer">
    
                    <h1 class="text-2xl mt-9 font-bold uppercase text-center">BLANCO</h1>
                </div>
            </div>
        <div class=" flex justify-center space-x-4">
           
            <Grafica :cantidadVotos="cantidadVotos" :candidatos="candidatos" />
    
        </div>
    </div>
</template>
