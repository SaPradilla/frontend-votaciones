import axios from 'axios'

// baseURL: 'https://backend-votaciones.onrender.com/api'
const api = axios.create({
    baseURL: 'https://api-votaciones.onrender.com/api'
})

export default api