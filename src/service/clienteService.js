import axios from "axios"

class ClienteService{

    async cadastrarCliente(data){
        return axios({
            url: "http://192.168.1.240:3000/cliente/cadastrar",
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

    async listarClientes(){
        return axios({
            url: "http://192.168.1.240:3000/cliente/listar",
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
            url: "http://192.168.1.240:3000/cliente/"+data,
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
}

const clienteService = new ClienteService()
export default clienteService