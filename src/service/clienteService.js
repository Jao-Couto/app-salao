import axios from "axios"
import Globais from "../globais"

class ClienteService {

    async cadastrarCliente(data) {
        return axios({
            url: Globais.url + "/cliente/cadastrar",
            method: "POST",
            timeout: 5000,
            data: data,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async atualizarCliente(data) {
        return axios({
            url: Globais.url + "/cliente/update",
            method: "POST",
            timeout: 5000,
            data: data,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async listarClientes() {
        return axios({
            url: Globais.url + "/cliente/listar" + Globais.user,
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async listarId(data) {
        return axios({
            url: Globais.url + "/cliente/" + data,
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async deletarId(data) {
        return axios({
            url: Globais.url + "/cliente/delete/" + data,
            method: "DELETE",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}

const clienteService = new ClienteService()
export default clienteService