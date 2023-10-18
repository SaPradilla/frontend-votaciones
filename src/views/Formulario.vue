<script setup>
    import { FormKit } from '@formkit/vue'
    import {reactive,ref,onMounted} from 'vue'
    import { useRouter,useRoute } from 'vue-router'
    import ServiceApi from '../services/VotanteService.js'
    import Spinner from '../components/Spinner.vue';
    import Alerta from '../components/Alerta.vue';
    const Error = ref('')

    const emit = defineEmits(['update:existe','update:tieneCuenta'])
    const route = useRoute()

    const seleccion = ref('')

    const cargando = ref(false)

    const persona = reactive({
        nombre:'',
        apellido:'',
        tipo_documento:'',
        documento:'',
        numero_celular:'',
        correo:'',
        contrasena:''
    })

    onMounted(() => {
        seleccion.value = route.params.seleccion
        console.log(seleccion.value)

    })

    const registrarVotante = (data) => {
        // if(data.contrasena !== data.confirm_contrasena){
        //     setTimeout(()=>{
        //         Error.value = 'La contraseña no coincide'
        //     },1500)
        //     Error.value = ''
        //     return 
        // }
        cargando.value = true
        ServiceApi.agregarVotante(data) 
            .then(respuesta => {
                console.log('registro exitoso')
            })
            .catch(error => console.log(error))
        setTimeout(()=>{
            cargando.value = false
            emit('update:tieneCuenta',true)
        },2000)
    }
const loguear = ()=>{
    emit('update:tieneCuenta',true)
}
</script>

<template>
    <div>
        <div v-if="cargando" class="text-center">
            <Spinner/>
            <h2 class=" font-semibold text-3xl">Registrando..</h2>
        </div>
        <div v-else class="mx-auto mt-10 bg-white shadow">
            <h1 class="text-4xl py-6 text-green-500 text-center font-bold uppercase"> Registro </h1>
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit
                    type="form"
                    id="formulario"
                    :actions="false"
                    @submit="registrarVotante"
                    :value="persona"
                >
                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre de Cliente"
                        validation="required"
                        :validation-messages="{ required: 'El Nombre es Obligatorio' }"
                        v-model="persona.nombre"
                    />

                    <FormKit 
                        type="text"
                        label="Apellido"
                        name="apellido"
                        placeholder="Apellido de Cliente"
                        validation="required"
                        :validation-messages="{ required: 'El Apellido es Obligatorio' }"
                        v-model="persona.apellido"

                    />
                    <FormKit
                        type="select"
                        label="Tipo de documento"
                        placeholder="Seleccione el tipo de documento"
                        name="tipo_documento"
                        :options="[
                            'CC',
                            'TI',
                            
                        ]"
                        help="Elige una opción para poder continuar"
                        validation="required"
                        v-model="persona.tipo_documento"

                    />
                    <FormKit 
                        type="text"
                        label="Documento"
                        name="documento"
                        placeholder="Número de documento"
                        v-model="persona.documento"
                        validation="number|required|?length:10"
                        :validation-messages="{
                            length: 'Documento invalido',
                            required: 'Documento es obligatorio',
                            number:'No puedes ingresar letras'
                        }"

                    />
                    <FormKit 
                        type="text"
                        label="Número Celular"
                        name="numero_celular"
                        placeholder="Teléfono: XXX-XXX-XXXX"
                        v-model="persona.numero_celular"
                        validation="number|required|?length:10"
                        :validation-messages="{
                            length: 'Ingrese un número de celular válido',
                            required: 'Documento es obligatorio',
                            number:'No puedes ingresar letras'
                        }"

                    />

                    <FormKit 
                        type="text"
                        label="Correo"
                        name="correo"
                        placeholder="Email de Cliente"
                        validation="required|email"
                        :validation-messages="{ required: 'El Email es Obligatorio', email: 'Coloca un email válido' }"
                        v-model="persona.correo"
                   
                    />
      
                    <FormKit type="password" label="Contraseña" name="contrasena" placeholder="Ingrese su contraseña"
                        validation="required|?length:8"
                        :validation-messages="{
                            required: 'Contraseña es obligatorio',
                            length: 'La contraseña debe tener al menos 8 caracteres',        
                        }"
                
                        v-model="persona.contrasena"
                        />
                
                    <FormKit
                        style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px; text-align: center;"
                        type="submit"
                        label="Registrarse"
                    />
                </FormKit>
                <button  class=" justify-center" @click="loguear">
                    <p class=" cursor-pointer font-semibold text-lg text-gray-600 ">Ya tienes una cuenta? <span class="text-gray-800">Iniciar Sesion</span></p>
                </button>
                
            </div>
        </div>
    </div>
</template>

<style >

    #formulario .formkit-wrapper {
        max-width: 100%;
    }

</style>