<script setup>
    // Importanciones
    import { FormKit } from '@formkit/vue'
    import {reactive,ref,onMounted} from 'vue'
    import { useRouter,useRoute } from 'vue-router'
    import ServiceApi from '../services/VotanteService.js'
    import Spinner from '../components/Spinner.vue';
    import Alerta from '../components/Alerta.vue';
    import Completado from '../components/Completado.vue'


    // Acciones de actualizar states
    const emit = defineEmits(['update:existe','update:tieneCuenta'])
    // States
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
    const errorMensaje = ref('')
    // Metodos de ciclo de vida
    onMounted(() => {
        seleccion.value = route.params.seleccion
    })
    // Metodo para crear el voto
    const registrarVotante = (data) => {
        // Activa el state
        cargando.value = true
        ServiceApi.agregarVotante(data)
            .then(respuesta => {
                console.log('registro exitoso')
            })
            .catch(error => {
                console.log(error.response.data)

                if(error.response.data.msg){
                    Error.value = error.response.data.msg
                    return
                }
                    
            })
        // Se ejecuta en 2000ms
        setTimeout(()=>{
            // Desactiva el state de cargando
            cargando.value = false
            // Actualize el state del componente padre
            emit('update:tieneCuenta',true)
        },2000)
    }
    // Metodo para loguear
    const loguear = ()=>{
        emit('update:tieneCuenta',true)
    }
    // Metodo para ver la contrasena con el ojito ese
    const handleIconClick = (node, e) => {
        node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
        node.props.type = node.props.type === 'password' ? 'text' : 'password'
    }
</script>

<template>
    <div>
        <div v-if="errorMensaje">
            <Alerta>{{ errorMensaje }}</Alerta>
        </div>
        <!-- Componente de cargar -->
        <div v-if="cargando" class="text-center">
            <Spinner/>
            <h2 class=" font-semibold text-3xl">Registrando..</h2>
        </div>
        <!-- Si no esta cargando mostrara lo demás -->
        <div v-else class="mx-auto mt-10 bg-white shadow">
            <h1 class="text-4xl py-6 text-green-500 text-center font-bold uppercase"> Registro </h1>
            <!-- Formulario -->
            <div class="mx-auto py-20 px-6">
                <FormKit
                    type="form"
                    id="formulario"
                    :actions="false"
                    @submit="registrarVotante"
                    :value="persona"
                    incomplete-message="Ingrese los datos para continuar"

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
                            'CE',
                            'PPT',
                            'PP',
                        ]"
                        help="Elige una opción para poder continuar"
                        validation="required"
                        :validation-messages="{ required: 'El tipo de documento es Obligatorio' }"

                        v-model="persona.tipo_documento"

                    />
                    <FormKit
                        type="text"
                        label="Documento"
                        name="documento"
                        placeholder="Número de documento"
                        v-model="persona.documento"
                        validation="number|required|length:10"
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
                        placeholder="Teléfono: 310-000-0000"
                        prefix-icon="telephone"
                        v-model="persona.numero_celular"
                        validation="number|required|length:9"
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
                        prefix-icon="email"
                        placeholder="Email de Cliente"
                        validation="required|email"
                        :validation-messages="{ required: 'El Email es Obligatorio', email: 'Coloca un email válido' }"
                        v-model="persona.correo"
                    />

                    <FormKit
                    placeholder="Ingrese su contraseña"
                        name="contrasena"
                        type="password"
                        label="Contraseña"
                        value="mySecretPassword!"
                        prefix-icon="password"
                        suffix-icon="eyeClosed"
                        @suffix-icon-click="handleIconClick"
                        v-model="persona.contrasena"
                        validation="required|length:8"
                        :validation-messages="{
                                required: 'La contraseña es obligatoria',
                                length: 'La contraseña debe tener al menos 8 caracteres',

                        }"
                    />
                    <FormKit
                        style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px; text-align: center;"
                        type="submit"
                        label="Registrarse"
                        validation="required"
                        :validation-messages="{
                            required: 'Valide todos sus datos',
                        }"
                        :errors="['Ingrese sus datos para continuar']"
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
    /* Estilo del formulario */
    #formulario .formkit-wrapper {
        max-width: 100%;
    }
</style>