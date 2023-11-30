<script setup>
  import {onMounted,watch} from 'vue'
  import { useAuth } from './stores/auth';
  const auth = useAuth()

    // Metodo ciclo de vida
    onMounted(() => {
        auth.ObtenerToken()
        auth.isAdmin()
    })
    
    watch(auth.token, () => {
        auth.ObtenerToken()
        auth.isAdmin()

    })
</script>

<template>
  <!-- Header -->
  <header class=" bg-green-500">
    <div class="contenedor-banner flex justify-between items-center">

      <!-- Si el usuario es admin muestra el link a el dashboard de admin -->
      <div 
      v-if="auth.admin"
      class="admin flex justify-start items-center gap-3 px-8 w-max bg-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <path fill="#ffffff" d="m12 1l9 4v6c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4m0 2.18L5 6.3v4.92C5 15.54 8.25 20 12 21c3.75-1 7-5.46 7-9.78V6.3l-7-3.12M16 14v1.59c-.04.22-.22.37-.47.41H8.47c-.25-.04-.43-.19-.47-.41V14h8m1-6l-1 5H8L7 8l2.67 2.67L12 8.34l2.33 2.33L17 8Z"/>
        </svg>
        <RouterLink 
        style="text-align: center; font-size: 1.5em; color: white;"
        to="admin">Admin</RouterLink>
      </div>
      <!-- Si el usuario esta logueado -->
      <div class=" mx-auto max-w-6xl py-10">
        <h1 class="text-4xl text-center font-bold  text-white">
          VOTACIONES
        </h1>
      </div>
      <nav v-if="auth.logueado" class="">
        <div @click="auth.logout">
          <img 
            class=" cursor-pointer w-16 min-[700px]:hidden max-[700px]:-mt-3 max-[700px]:-mr-22"
            src="./assets/img/salirIcono.png"
            alt=""
            srcset="">
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

</style>