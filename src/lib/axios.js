import axios from 'axios'

// baseURL: 'https://api-votaciones.onrender.com/api'
const api = axios.create({
    baseURL: 'https://backend-votaciones-production.up.railway.app/api'
    // baseURL:'http://localhost:5650/api'
})

export default api