import api from "../lib/axios";

export default {
    Votar(seleccion,candidatoId,votanteId) {
        return api.post(`votos/registrar/${seleccion}/${candidatoId}/${votanteId}`)
    },
    VotarBlanco(seleccion,votanteId){
        return api.post(`votos/registrar-blanco/${seleccion}/${votanteId}`)
    },
    obtenerVotos(seleccion){
        return api.get(`votos/listar/${seleccion}`)
    }
}
