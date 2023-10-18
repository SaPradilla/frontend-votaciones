import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5650/api'
})

export default api