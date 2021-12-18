import axios from "axios"
import Globais from "../globais"

class ServicoMarcar {

    async marcarServico(data) {
        return axios({
            url: "http://192.168.1.248:3000/servicosMarcados/cadastrar",
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

    async listarAtendimentos() {
        return axios({
            url: "http://192.168.1.248:3000/atendimentos/listar" + Globais.user,
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

    async listarData(data) {
        return axios({
            url: "http://192.168.1.248:3000/atendimentos/data" + Globais.user + "/" + data,
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

    async listarHora(data) {
        return axios({
            url: "http://192.168.1.248:3000/atendimentos/hora" + Globais.user + "/" + data,
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
            url: "http://192.168.1.248:3000/atendimentos/id/" + data,
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
            url: "http://192.168.1.248:3000/atendimentos/delete/" + data,
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

const servicoMarcar = new ServicoMarcar()
export default servicoMarcar