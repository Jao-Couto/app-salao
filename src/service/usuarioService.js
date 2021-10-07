import axios from "axios"

class UsuarioService{

    async cadastrarUsuario(data){
        return axios({
            url: "http://192.168.1.240:3000/usuario/cadastrar",
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

    async loginUsuario(data){
        return axios({
            url: "http://192.168.1.240:3000/usuario/login",
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

    async listarUsuario(){
        return axios({
            url: "http://192.168.1.240:3000/usuario/listar",
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



const usuarioService = new UsuarioService()
export default usuarioService