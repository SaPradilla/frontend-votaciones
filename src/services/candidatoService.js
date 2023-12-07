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
    },
    obtenerTodosCandidatos(){
        return api.get('/candidato/listar')
    },
    editarCandidato(id,data){
        return api.put(`/candidato/editar/${id}`,data,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    borrarCandidato(id){
        return api.delete(`/candidato/borrar/${id}`)
    }

}
