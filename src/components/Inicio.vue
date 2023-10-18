<script setup>
    import {ref} from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    
    defineProps({
        titulo: {
            type: String,
            
        }
    })

    const seleccion = ref('')
    
    const redirigir = ( ) =>{
        router.push({ name: 'Votar',  params: { seleccion: seleccion.value  } })
    }
    import ImagenBackgraound from '../assets/img/votacionbg.jpg'

</script>

<template>
    <div>
        <h1 class="  text-center text-green-500 text-5xl font-semibold ">Bienvenido al sistema de votación</h1>
        <!-- <div class="imagen_fondo absolute ">
            <img class="bg-cover w-screen bg-center " :src="ImagenBackgraound" alt="imagen_fondo" srcset="">
        </div>
         -->
        <div class="flex mt-44 justify-center p-5 mr-8 space-x-10 ">

                <FormKit
                    v-model="seleccion"
                    type="select"
                    label="Selecione su tipo de votacion"
                    placeholder="Selecione"
                    name="small_country"
                    :options="[
                        'Alcalde',
                        'Gobernador',
                        'Junta comunal',
                        'Representante SENA',
                        'Asamblea'
                    ]"
                    help="Elige una opción para poder continuar"
                />

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
