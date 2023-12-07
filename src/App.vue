<script setup>
import { onMounted, watch ,ref} from 'vue'
import { useAuth } from './stores/auth';
import {useRoute,useRouter} from 'vue-router'
import { useOpcion } from './stores/opcionAdmin';

const auth = useAuth()
const router = useRouter()
const route = useRoute()
const Opcion = useOpcion()


const selecciones = ref([
    'Alcalde',
    'Gobernador',
    'Junta comunal',
    'Representante SENA',
    'Asamblea'
])

// Metodo ciclo de vida
onMounted(() => {
  auth.ObtenerToken()
  auth.isAdmin()
  console.log(route.name)
})

watch(auth.token, () => {
  auth.ObtenerToken()
  auth.isAdmin()
  

})



</script>

<template>
  <!-- Header -->
  <div v-if="route.fullPath === '/admin'|| route.name === 'Votos'" class=""> 
  <aside class="h-full bg-green-500 w-40 fixed top-0  shadow-2xl">
    <div class="contenedor-aside-admin flex flex-col justify-center items-center">
      <h1 class="text-white text-2xl font-semibold">Admin</h1>
      <h1 class="text-white text-2xl font-bold">Votaciones</h1>

      <div class="opciones mt-10 flex flex-col gap-4 ">
        <!-- Dashboard -->
        <div 
        :class=" Opcion.dashboard ? 'seleccion' : ''"
        class="dashbooard-opcion flex  items-center cursor-pointer" @click="Opcion.handleDashboard">
            <svg 
            class=" fill-[#42a567] "
            xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
              <path
                d="m12 1l9 4v6c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4m0 2.18L5 6.3v4.92C5 15.54 8.25 20 12 21c3.75-1 7-5.46 7-9.78V6.3l-7-3.12M16 14v1.59c-.04.22-.22.37-.47.41H8.47c-.25-.04-.43-.19-.47-.41V14h8m1-6l-1 5H8L7 8l2.67 2.67L12 8.34l2.33 2.33L17 8Z" />
            </svg>
            <p class="text-1xl uppercase font-bold text-[#42a567] ">Dashboard</p>
          
            <hr>
        </div>
        <!-- Candidatos  -->
        <div 
          :class=" Opcion.candidatos ? 'seleccion' : ''"
          class="candidatos-opcion flex  items-center cursor-pointer  "  @click="Opcion.handleCandidatos">
          <svg class=" fill-[#42a567] " xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 256 256">
            <path  d="M164.47 195.63a8 8 0 0 1-6.7 12.37H10.23a8 8 0 0 1-6.7-12.37a95.83 95.83 0 0 1 47.22-37.71a60 60 0 1 1 66.5 0a95.83 95.83 0 0 1 47.22 37.71Zm87.91-.15a95.87 95.87 0 0 0-47.13-37.56A60 60 0 0 0 144.7 54.59a4 4 0 0 0-1.33 6a75.83 75.83 0 0 1 3.63 89.94a4 4 0 0 0 1.07 5.53a112.32 112.32 0 0 1 29.85 30.83a23.92 23.92 0 0 1 3.65 16.47a4 4 0 0 0 3.95 4.64h60.3a8 8 0 0 0 7.73-5.93a8.22 8.22 0 0 0-1.17-6.59Z"/></svg>
          <p class="text-1xl uppercase font-bold text-[#42a567] ">Candidatos</p>
        </div>

        <!-- Votos  -->
        <div 
        @click="Opcion.handleModalSelect()"
       
          class=" flex cursor-pointer flex-col " >
          <div 
          :class=" Opcion.votos ? 'seleccion' : ''" 
          class="votos flex items-center  ">

            <svg class=" fill-[#42a567] "   xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path  d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4l-3-3m-1-5.05l-4.95 4.95L8.5 9.36l4.96-4.95L17 7.95m-4.24-5.66L6.39 8.66a.996.996 0 0 0 0 1.41L11.34 15c.39.41 1.02.41 1.41 0l6.36-6.34a.996.996 0 0 0 0-1.41L14.16 2.3a.975.975 0 0 0-1.4-.01Z"/></svg>
            <p class="text-1xl uppercase font-bold text-[#42a567] ">Votos</p>
          </div>

        </div>
      </div>
      
      <div v-if="Opcion.modalSelect"  @click="Opcion.handleModalSelect()"  class=" w-max fixed ml-[310px] mt-[300px] bg-green-500 z-10">
          <!-- Hacer el modal de seleccion -->
          <p @click="Opcion.redirigirVotos('Alcalde')" class=" font-bold text-white cursor-pointer  border-black hover:bg-green-300">Alcalde</p>
          <p @click="Opcion.redirigirVotos('Gobernador')" class=" font-bold text-white cursor-pointer  border-black hover:bg-green-300">Gobernador</p>
          <p @click="Opcion.redirigirVotos('Junta Comunal')" class=" font-bold text-white cursor-pointer  border-black hover:bg-green-300">Junta Comunal</p>
          <p @click="Opcion.redirigirVotos('Representante SENA')" class=" font-bold text-white cursor-pointer  border-black hover:bg-green-300">Representante SENA</p>
          <p @click="Opcion.redirigirVotos('Asamblea')" class=" font-bold text-white cursor-pointer  border-black hover:bg-green-300">Asamblea</p>

      </div>
    </div>
  </aside>
  </div>

  <header  v-else
  
    class=" w-full bg-green-500">

    <div class="contenedor-banner flex  justify-between items-center">

      <!-- Si el usuario es admin muestra el link a el dashboard de admin -->
      <div v-if="auth.admin" class="admin flex justify-start items-center gap-3 px-8 w-max bg-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <path fill="#ffffff"
            d="m12 1l9 4v6c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4m0 2.18L5 6.3v4.92C5 15.54 8.25 20 12 21c3.75-1 7-5.46 7-9.78V6.3l-7-3.12M16 14v1.59c-.04.22-.22.37-.47.41H8.47c-.25-.04-.43-.19-.47-.41V14h8m1-6l-1 5H8L7 8l2.67 2.67L12 8.34l2.33 2.33L17 8Z" />
        </svg>
        <RouterLink style="text-align: center; font-size: 1.5em; color: white;" to="admin">Admin</RouterLink>
      </div>

      <div v-else class="admin flex justify-start items-center gap-3 px-8 w-max bg-green-500"></div>
      <!-- Si el usuario esta logueado -->
      <div class=" mx-auto max-w-6xl py-10">
        <h1 class="text-4xl text-center font-bold max-[700px]:text-2xl text-white">
          VOTACIONES
        </h1>
      </div>

      <nav v-if="auth.logueado" class="">
        <div @click="auth.logout">
          <img class=" cursor-pointer w-16 min-[700px]:hidden max-[700px]:-mt-3 max-[700px]:-mr-22"
            src="./assets/img/salirIcono.png" alt="" srcset="">
          <p class=" cursor-pointer uppercase text-2xl font-semibold hidden md:block min-[700px]:mr-10 text-white">Cerrar
            Sesión</p>
        </div>
      </nav>
      
    </div>

  </header>
  <!-- Contenido de todo el proyecto -->
  <main class="max-w-6xl mx-auto mt-10">
    <RouterView />
  </main>
</template>
<style scoped>
.candidatos-opcion p,.candidatos-opcion svg,
.dashbooard-opcion p,.dashbooard-opcion  svg,
.votos p,.votos  svg
{
  transition: all 0.2s ease-in;
}
.candidatos-opcion:hover.candidatos-opcion p,.candidatos-opcion:hover.candidatos-opcion svg,
.dashbooard-opcion:hover.dashbooard-opcion p,.dashbooard-opcion:hover.dashbooard-opcion svg,
.votos:hover.votos p,.votos:hover.votos svg
{
  fill: rgba(255, 255, 255, 0.668);
  color: rgba(255, 255, 255, 0.668);
}

.candidatos-opcion.seleccion p,.candidatos-opcion.seleccion svg,
.dashbooard-opcion.seleccion p,.dashbooard-opcion.seleccion svg,
.votos.seleccion p,.votos.seleccion svg

{
  fill: white;
  color: white;
}

</style>