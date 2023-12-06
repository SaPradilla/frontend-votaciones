<script setup>
    // Importaciones
    import {ref,onMounted} from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const selecciones = ref([
        'Alcalde',
        'Gobernador',
        'Junta comunal',
        'Representante SENA',
        'Asamblea'
    ])
    const seleccionesVotadas = ref([])

    const obtenerSelecciones = ()=>{
        if(localStorage.getItem('selecciones-votadas')){
            seleccionesVotadas.value = JSON.parse(localStorage.getItem('selecciones-votadas'))
        }
        return 
    }
    defineProps({
        titulo: {
            type: String,
            
        }
    })

    const seleccion = ref('')
    
    const redirigir = ( ) =>{
        router.push({ name: 'Votar',  params: { seleccion: seleccion.value  } })
    }

    const validarElecciones = ()=>{
        selecciones.value = selecciones.value.filter(seleccion => seleccionesVotadas.value.indexOf(seleccion) === -1);

    }

    onMounted(()=>{
        obtenerSelecciones()
        validarElecciones()
    })
</script>

<template>
    <div>
        <h1 v-if="selecciones.length !== 0" class="  text-center text-green-500 text-5xl font-semibold ">Bienvenido al sistema de votación</h1>
        <!-- <div class="imagen_fondo absolute ">
            <img class="bg-cover w-screen bg-center " :src="ImagenBackgraound" alt="imagen_fondo" srcset="">
        </div>
         -->
        <div class="flex mt-44 justify-center p-5 mr-8 space-x-10 ">

                <FormKit
                    v-if="selecciones.length !== 0"
                    v-model="seleccion"
                    type="select"
                    label="Selecione su tipo de votacion"
                    placeholder="Selecione"
                    name="small_country"
                    :options="selecciones"
                    help="Elige una opción para poder continuar"
                />
                <div v-else class="">
                   
                    <h1 class=" text-4xl text-center " > Ya has votado por todas las elecciones</h1>
                    <p class=" text-center text-lg ">Gracias por Votar 😊</p>
                </div>

        </div>
        <div class="boton flex justify-center mt-44 mr-8">

            <FormKit
                style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px;"
                class=" "
                v-if="seleccion"
                
                type="button"
                @click="redirigir"
            >
            <p>Votar en <span class="font-bold"> {{ seleccion  }}</span></p> 
            
            </FormKit>
        </div>
     
        
    </div>
</template>
