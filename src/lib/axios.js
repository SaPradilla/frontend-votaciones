import axios from 'axios'

// baseURL: 'https://backend-votaciones.onrender.com/api'
const api = axios.create({
    baseURL: 'http://localhost:5650/api'
})

export default api