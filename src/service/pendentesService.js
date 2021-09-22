import axios from "axios"

class PendentesService{

    async cadastrar(data){
        return axios({
            url: "https://appsalao1.herokuapp.com/pendentes/cadastrar",
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
            url: "https://appsalao1.herokuapp.com/pendentes/listar",
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
            url: "https://appsalao1.herokuapp.com/pendentes/data/"+data,
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
            url: "https://appsalao1.herokuapp.com/pendentes/id/"+data,
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
            url: "https://appsalao1.herokuapp.com/pendentes/delete/"+data,
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