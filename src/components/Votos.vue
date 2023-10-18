<script setup>
    import { reactive, ref, onMounted, watch } from 'vue'
    import {useRoute} from 'vue-router'
    import ApiServiceVotar from '../services/votosService'
    import Grafica from './Grafica.vue';
    const route = useRoute()

    // States
    const seleccion = ref('')
    const votos = ref([])
    const cantidadVotos = ref([])
    const candidatos = ref([])

    onMounted(()=>{
        seleccion.value = route.params.seleccion
        ApiServiceVotar.obtenerVotos(seleccion.value)
            .then(respuesta =>{
                votos.value = respuesta.data.Votos    
                obtenerCantidadVotos()
                console.log('Se ejecuto')
                    
            })
            .catch(error=> console.log(error))
        
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
        <h1 class="text-center text-4xl font-semibold text-gray-900 uppercase">Votos de elecciones para {{ seleccion }}</h1>
    </div>
    <div class=" flex justify-center mt-10">
        <Grafica
            :cantidadVotos="cantidadVotos"
            :candidatos="candidatos"
        />

    </div>
</template>
