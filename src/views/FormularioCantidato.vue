<script setup>
    import {reactive,ref} from 'vue'
    import RouterLink from '../components/UI/RouterLink.vue';
    import ServiceApi from '../services/candidatoService'
    import Spinner from '../components/Spinner.vue'

    const cargando = ref(false)

    const persona = reactive({
        nombre:'',
        apellido:'',
        biografia:'',
        cargo_postulante:'',
        foto:null
    })
    // const foto = ref({})
    // console.log(foto.value[0].name)
    
    const handleSubmit = (data) => {
        data.foto = data.foto[0].file
        cargando.value = true
        console.log(data.foto)
        ServiceApi.agregarCandidato(data)
            .then(respuesta => {
                console.log(respuesta)
                // Redireccionar
                // router.push({ name: 'votacion-'})
            })
            .catch(error => console.log(error))
        
        setTimeout(()=>{
            Object.assign(persona,{
                nombre:'',
                apellido:'',
                biografia:'',
                cargo_postulante:'',
                foto:null
            })
            cargando.value = false
        },1500)
    }

</script>
<template>
    <div>

        <div class="flex p-6 justify-end">
            <RouterLink 
            style="background-color: #22c55e;"
                to="inicio"
            >
                Cancelar
            </RouterLink>
        </div>
        <div v-if="cargando" class="text-center">
            <Spinner/>
            <h2 class=" font-semibold text-3xl">Registrando candidato..</h2>
        </div>
        <div v-else class="mx-auto  bg-white shadow">
            <h1 class="text-4xl pt-4 text-green-500 text-center font-bold uppercase"> Registro de Candidato</h1>
            <div class="mx-auto md:w-1/2 py-14">
                <FormKit
                    id="formCantidato"
                    type="form"
                    :actions="false"
                    @submit="handleSubmit"
                    :value="persona"
                >
                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre del Candidato"
                        validation="required"
                        :validation-messages="{ required: 'El Nombre es Obligatorio' }"
                        v-model="persona.nombre"
                    />
                    
                    <FormKit 
                        
                        type="text"
                        label="Apellido"
                        name="apellido"
                        placeholder="Apellido del Candidato"
                        validation="required"
                        :validation-messages="{ required: 'El Apellido es Obligatorio' }"
                        v-model="persona.apellido"

                    />
                    <FormKit 
                        type="textarea"
                        label="Biografia"
                        name="biografia"
                        placeholder="Biografia del Candidato"
                        validation="required"
                        :validation-messages="{ required: 'La biografia es Obligatoria' }"
                        v-model="persona.biografia"

                    />

                    <FormKit
                        type="select"
                        label="Cargo a postular"
                        placeholder="Seleccione el tipo de cargo"
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
                        v-model="persona.cargo_postulante"

                    />
                    <FormKit
                        type="file"
                        label="Foto"
                        help="Imagen del rostro del candidato."
                        accept=".png,.jpg,.jpeg,.jfif"
                        validation="required"
                        name="foto"
                        v-model="persona.foto"
                    />
                    <FormKit
                        style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px; text-align: center;"
                        type="submit"
                        label="Registrar"
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