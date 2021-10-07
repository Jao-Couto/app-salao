import axios from "axios"
import Globais from "../globais"

class PendentesService{

    async cadastrar(data){
        return axios({
            url: "http://192.168.1.240:3000/pendentes/cadastrar",
            method: "POST",
            timeout: 5000,
            data: data,
            header:{
                Accept: 'application/json'
            }
        }).then((response)=>{
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async listarPendentes(){
        return axios({
            url: "http://192.168.1.240:3000/pendentes/listar"+Globais.user,
            method: "GET",
            timeout: 5000,
            header:{
                Accept: 'application/json'
            }
        }).then((response)=>{
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async listarId(data){
        return axios({
            url: "http://192.168.1.240:3000/pendentes/id/"+data,
            method: "GET",
            timeout: 5000,
            header:{
                Accept: 'application/json'
            }
        }).then((response)=>{
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async deletarId(data){
        return axios({
            url: "http://192.168.1.240:3000/pendentes/delete/"+data,
            method: "DELETE",
            timeout: 5000,
            header:{
                Accept: 'application/json'
            }
        }).then((response)=>{
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }
}

const pendentesService = new PendentesService()
export default pendentesService