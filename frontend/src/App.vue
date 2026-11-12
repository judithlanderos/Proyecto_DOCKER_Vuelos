<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'

let pingInterval = null
let ultimaActividad = Date.now()
const registrarActividad = () => { ultimaActividad = Date.now() }

onMounted(() => {
  window.Swal = Swal
  window.addEventListener('mousemove', registrarActividad)
  window.addEventListener('keydown', registrarActividad)
  window.addEventListener('click', registrarActividad)
  window.addEventListener('scroll', registrarActividad)

  pingInterval = setInterval(async () => {
    try {
      const usuario = localStorage.getItem('usuario')
      if (!usuario) return
      const inactivo = Date.now() - ultimaActividad > 60000
      if (inactivo) return
      await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/ping`,
        { withCredentials: true }
      )
    } catch {}
  }, 60000)
})

onUnmounted(() => {
  clearInterval(pingInterval)
  window.removeEventListener('mousemove', registrarActividad)
  window.removeEventListener('keydown', registrarActividad)
  window.removeEventListener('click', registrarActividad)
  window.removeEventListener('scroll', registrarActividad)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0f0508;
  color: #f0e8e0;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #0f0508;
}

::-webkit-scrollbar-thumb {
  background: #c9a84c;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #f0c96b;
}
</style>