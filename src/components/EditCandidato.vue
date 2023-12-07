<script setup>
    // Importaciones
    import {reactive,ref} from 'vue'
    import RouterLink from '../components/UI/RouterLink.vue';
    import ServiceApi from '../services/candidatoService'
    import Spinner from '../components/Spinner.vue'
    import Alerta from '../components/Alerta.vue';
    import { useOpcion } from '../stores/opcionAdmin';
    import { useCandidatos } from '../stores/candidatos';
    
    const Opcion = useOpcion()
    const Candidato = useCandidatos()
    // States
    const errorMensaje = ref('')

    


</script>

<template>
    <div>
        <div v-if="errorMensaje">
            <Alerta>{{ errorMensaje }}</Alerta>
        </div>
        <!-- Boton de incio -->
        <div class="flex p-6 justify-end">
                    <div  
                    class=" bg-green-500 h-10 w-36 text-white cursor-pointer text-center rounded-lg flex justify-center  items-center" 
                    @click="Opcion.handleincioCandidato" 
                    >
                        Cancelar
                    </div>
  
        </div>
        <!-- Si el state de cargando esta activado muesta el componente  -->
        <div v-if="Candidato.cargando" class="text-center">
            <Spinner/>
            <h2 class=" text-green-500 font-semibold text-3xl">Actualizando candidato..</h2>
        </div>
        <!-- Sino muestra todo lo demas -->
        <div v-else class="mx-auto">
            <h1 class="text-4xl pt-4 text-green-500 text-center font-bold uppercase"> Actualizar Candidato</h1>
            <!-- Formulario de registro -->
            <div class="mx-auto md:w-1/2 py-14">
                
                <FormKit
                    
                    id="formCantidato"
                    type="form"
                    :actions="false"
                    @submit="Candidato.editCandidato"
                    
                >
                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre del Candidato"
                        validation="required"
                        :validation-messages="{ required: 'El Nombre es Obligatorio' }"
                        v-model="Candidato.candidatoUpdate.nombre"
                        :value="Candidato.candidatoUpdate.nombre"
                    />
                    
                    <FormKit 
                        
                        type="text"
                        label="Apellido"
                        name="apellido"
                        placeholder="Apellido del Candidato"
                        validation="required"
                        :validation-messages="{ required: 'El Apellido es Obligatorio' }"
                        v-model="Candidato.candidatoUpdate.apellido"

                    />
                    <FormKit 
                        type="textarea"
                        label="Biografia"
                        name="biografia"
                        placeholder="Biografia del Candidato"
                        validation="required"
                        :validation-messages="{ required: 'La biografia es Obligatoria' }"
                        v-model="Candidato.candidatoUpdate.biografia"

                    />

                    <FormKit
                        type="select"
                        label="Cargo a postular"
                        placeholder="Seleccione el tipo de cargo"
                        disabled 
                        name="cargo_postulante"
                        :options="[
                            'Alcalde',
                            'Gobernador',
                            'Junta comunal',
                            'Representante SENA',
                            'Asamblea'
                        ]"
                        help="Elige una opción para poder continuar"
                        validation="required"
                        :validation-messages="{ required: 'El cargo es Obligatorio' }"
                        v-model="Candidato.candidatoUpdate.cargo_postulante"

                    />
                    <FormKit
                        type="file"
                        label="Foto"
                        help="Imagen del rostro del candidato."
                        accept=".png,.jpg,.jpeg,.jfif"
                        name="foto"
                        v-model="Candidato.foto"
                    />
                    <FormKit
                        style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px; text-align: center;"
                        type="submit"
                        label="Actualizar"
                    />
                </FormKit>
                
            </div>
        </div>
    </div>
</template>

<style >
    #formCantidato .formkit-wrapper {
        max-width: 100%;
    }
</style>