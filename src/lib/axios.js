import axios from 'axios'

// baseURL: 'https://api-votaciones.onrender.com/api'
const api = axios.create({
    baseURL: 'https://backend-votaciones-production.up.railway.app/api'
})

export default api