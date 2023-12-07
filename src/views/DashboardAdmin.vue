<script setup>
    // Importaciones
    import { ref, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import Grafica from '../components/Grafica.vue';
    import RouterLink from '../components/UI/RouterLink.vue';
    import ImagenBackgraound from '../assets/img/votacionbg.jpg'
    import { useOpcion } from '../stores/opcionAdmin';  
    import Votos from '../components/Votos.vue';
    import FormularioCandidato from '../components/FormularioCantidato.vue'
    import ListaCandidatos from '../components/ListaCandidatos.vue';
    import EditCandidato from '../components/EditCandidato.vue';

    // Instancias
    const router = useRouter()
    const route = useRoute()
    const Opcion = useOpcion()
    // Props recibidos del compontes padre
    defineProps({
        titulo: {
            type: String,

        }
    })
    
    // State
    const seleccion = ref('')
    // Metodo ciclo de vida
    onMounted(() => {
        // Obtiene de los parametros la seleccion y lo almacena al state
        seleccion.value = route.params.seleccion
    })
    // Metodos
</script>

<template>
    <div class="contenedor-admin">

        <div 
            v-if="Opcion.dashboard"
            class="dashboard"
        >

        </div>

        <div 
            v-if="Opcion.candidatos"
            class="candidatos"
        >
            <FormularioCandidato v-if="Opcion.registroCandidato"/>
            <ListaCandidatos v-if="Opcion.incioCandidato"/>
            <EditCandidato v-if="Opcion.editCandidato"/>

        </div>

        <div 
            v-if="Opcion.votos"
            class="votos"
        >
        
            <Votos v-if="Opcion.Seleccion"/>
        

        </div>
        



        <!-- <h1 class="  text-center text-green-500 text-5xl font-bold ">PANEL ADMIN</h1> -->

        <!-- <div class="flex  justify-between">

          
            <RouterLink
                style="  background-color: #22c55e; width: 300px; height: 70px; text-align: center; padding: 13px; font-size: 1.5em;"
                to="candidatos">Candidatos
            </RouterLink>

            <div class="votos ">
            <div class="contenedor  ">
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

        </div> -->
        




    </div>
</template>
