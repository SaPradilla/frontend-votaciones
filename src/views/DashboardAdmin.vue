<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({
    titulo: {
        type: String,

    }
})

const seleccion = ref('')

const redirigirVotos = () => {
    router.push({ name: 'Votos', params: { seleccion: seleccion.value } })
} 
import ImagenBackgraound from '../assets/img/votacionbg.jpg'

</script>

<template>
    <div>
        <h1 class="  text-center text-green-500 text-5xl font-bold ">PANEL ADMIN</h1>
        <!-- <div class="imagen_fondo absolute ">
            <img class="bg-cover w-screen bg-center " :src="ImagenBackgraound" alt="imagen_fondo" srcset="">
        </div>
         -->
        <div class="contenedor ">
            <div class=" w-80 min-h-0  m-12 p-7 shadow-2xl cursor-pointer max-[600px]:w-80">
                <h1 class="text-2xl  font-bold uppercase  text-center">Ver votos</h1>
                <div class="flex mt-10 justify-center space-x-10 ">

                    <FormKit v-model="seleccion" type="select" label="Selecione el cargo" placeholder="Selecione"
                        name="small_country" :options="[
                            'Alcalde',
                            'Gobernador',
                            'Junta comunal',
                            'Representante SENA',
                            'Asamblea'
                        ]" help="Elige una opción para poder continuar" />

                </div>
                <div class="boton flex justify-center ">

                    <FormKit
                        style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px;"
                        class=" " v-if="seleccion" type="button" @click="redirigirVotos">
                        <p>Ver votos de <span class="font-bold"> {{ seleccion }}</span></p>

                    </FormKit>
                </div>
            </div>
        </div>




    </div>
</template>
