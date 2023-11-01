    <script setup>
    // Importaciones
    import { reactive, ref, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import ApiServiceVotar from '../services/votosService'
    import ApiServiceCandidatos from '../services/candidatoService'
    import Grafica from './Grafica.vue';
    import RouterLink from '../components/UI/RouterLink.vue';
    // Instancia
    const route = useRoute()

    // States
    const seleccion = ref('')
    const votos = ref([])
    const cantidadVotos = ref([])
    const candidatos = ref([])
    const candidatoDB = ref([])

    // Metodo ciclo de vida
    onMounted(() => {
        // Obtiene seleccion de los parametros
        seleccion.value = route.params.seleccion
        // Obtiene los votos de los candidatos
        ApiServiceVotar.obtenerVotos(seleccion.value)
            .then(respuesta => {
                // La respuesta la almacena en el state
                votos.value = respuesta.data.Votos
                obtenerCantidadVotos()

            })
            .catch(error => console.log(error))

        // Obtiene los candidatos
        ApiServiceCandidatos.obtenerCandidatos(route.params.seleccion)
            .then(respuesta => {
                // La respuesta la almacena en el state
                candidatoDB.value = respuesta.data.Candidatos
            })
            .catch(error => console.log('Hubo un error'))

    })
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
        <!-- Candidatos -->
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
        <!-- Grafica de votos -->
        <div class=" flex justify-center space-x-4">
            <!-- Se le pasan los states -->
            <Grafica :cantidadVotos="cantidadVotos" :candidatos="candidatos" />
    
        </div>
    </div>
</template>
