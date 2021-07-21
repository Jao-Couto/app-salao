import axios from "axios"

class AtendimentoService{

    async marcarHora(data){
        return axios({
            url: "http://192.168.1.240:3000/atendimentos/cadastrar",
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

    async listarAtendimentos(){
        return axios({
            url: "http://192.168.1.240:3000/atendimentos/listar",
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

    async listarData(data){
        return axios({
            url: "http://192.168.1.240:3000/atendimentos/data/"+data,
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
            url: "http://192.168.1.240:3000/atendimentos/id/"+data,
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
            url: "http://192.168.1.240:3000/atendimentos/delete/"+data,
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

const atendimentoService = new AtendimentoService()
export default atendimentoService