import api from "../lib/axios";

export default {
    agregarVotante(data) {
        return api.post('/votante/registrar', data)
    },
    loguearVotante(data){
        return api.post('/votante/login',data)
    },
    validarEleccionesVotadas(votanteId){
        return api.get(`/votante/validate-seleccion/${votanteId}`)
    }
        
}
