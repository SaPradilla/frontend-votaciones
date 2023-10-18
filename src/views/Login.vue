<script setup>
// Importanciones
import { FormKit } from '@formkit/vue'
import { reactive, ref,onMounted ,watch} from 'vue'
// Componentes
import ServiceApi from '../services/VotanteService.js'
import Spinner from '../components/Spinner.vue';
import Alerta from '../components/Alerta.vue';

// Acciones de actualizar states
const emit = defineEmits(['update:token','update:identificadorPersona','update:tieneCuenta','update:isMenorEdad'])
// states
const cargando = ref(false)
const Error = ref('')
const persona = reactive({
    documento: '',
    contrasena: ''
})

const inciarSesion = (data) => {
    // Activa el componente de cargar
    cargando.value = true
    let findtoken
    // Consulta a la Api con un metodo post
    ServiceApi.loguearVotante(data)
        .then(respuesta => {
            // Gaurdar el token en el localstorage
            localStorage.setItem('token', respuesta.data.data.token)
            findtoken = respuesta.data.data.token
            // Añade el id al localstorage para luego validarlo con las votaciones
            localStorage.setItem('exits-user',respuesta.data.ide)
            // Lo actualiza en el state del componente candidatos
            emit('update:identificadorPersona',respuesta.data.ide)
            // Si el usuario registrado es menor de edad activa una restriccion
            if(respuesta.data.isMenor){
                localStorage.setItem('validationMenor',true)
                emit('update:isMenorEdad',true)
            }
            // Si el usuario es admin, le dara permisos
            if(respuesta.data.permisosAdmin){
                localStorage.setItem('admin',true)
            }
        })
        .catch(error => {
            console.log(error)
            Error.value = 'Credenciales incorrectas'
        })
        // para que el metodo de cargar espere un rato y se vea realista xd
        // tambien para que le de tiempo de guardar el token y asignarlo al state en candidatos
        setTimeout(() => {
            cargando.value = false
            emit('update:token',findtoken)
        }, 1500)
        setTimeout(()=>{
            Error.value = ''
        },3000)

}
// Regirige a registrarse actualizando un state en el componente candidatos
const registrarse = () => {
    emit('update:tieneCuenta',false)
}
const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
    <div>
        <!-- Componente de cargar -->
        <div v-if="cargando" class="text-center">
            <Spinner />
            <h2 class=" font-semibold text-3xl">Iniciando sesion...</h2>
        </div>
        <!-- Si no esta cargando mostrara lo demás -->
        <div v-else >
            <!-- Si al loguearse generar error -->
            <div v-if="Error">
                <Alerta>{{ Error }}</Alerta>
            </div>
            <!-- Login -->
            <h1 class="text-4xl py-6 text-green-500 text-center font-bold uppercase"> Iniciar Sesion </h1>
            <div class="">
                <FormKit type="form" id="formulario" :actions="false" @submit="inciarSesion" :value="persona">

                    <FormKit type="text" label="Documento" name="documento" placeholder="Número de documento"
                        v-model="persona.documento" 
                        validation="number|required|?length:10"
                        :validation-messages="{
                            length: 'Documento invalido',
                            required: 'Documento es obligatorio',
                            number:'No puedes ingresar letras'
                        }"
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
                        validation="required|?length:8"
                        :validation-messages="{
                                required: 'Contraseña es obligatorio',
                                length: 'La contraseña debe tener al menos 10 caracteres',
                                
                        }"
                    />
                    <FormKit
                        style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px; text-align: center; "
                        type="submit" label="Loguear" 
                        :errors="['Ingrese sus datos para continuar']"
                        />
                </FormKit>
              
            </div>
            <button  class=" justify-center" @click="registrarse">
                <p class=" cursor-pointer font-semibold text-lg text-gray-600 ">¿Aún no tienes una cuenta? <span class="text-gray-800">Registrate</span></p>
            </button>
        </div>
    </div>
</template>

<style >
#formulario .formkit-wrapper {
    max-width: 100%;
}
</style>