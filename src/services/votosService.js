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
    
    // actualizarUsuario(id, data) {
    //    return api.put('/admin/edit/user/' + id,data)
    // },
    // cambiarEstado(id, data) {
    //     return api.patch('/clientes/' + id, data)
    // },
    // eliminarCliente(id) {
    //     return api.delete('/clientes/' + id)
    // }
}
