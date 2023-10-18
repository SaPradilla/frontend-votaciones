import axios from 'axios'

const api = axios.create({
    baseURL: 'https://backend-votaciones.onrender.com/api'
})

export default api