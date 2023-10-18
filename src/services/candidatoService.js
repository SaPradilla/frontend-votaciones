import api from "../lib/axios";

export default {
    agregarCandidato(data){
        return api.post('/candidato/registrar',data,{
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
    },
    obtenerCandidatos(cargo){
        return api.get(`/candidato/listar/${cargo}`)
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
