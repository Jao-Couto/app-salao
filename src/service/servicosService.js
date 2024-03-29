import axios from "axios"
import Globais from "../globais"

class ServicosService {

    async cadastrarServico(data) {
        return axios({
            url: Globais.url + "/servicos/cadastrar",
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

    async listarServicos() {
        return axios({
            url: Globais.url + "/servicos/listar/" + Globais.user,
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
            url: Globais.url + "/servicos/id/" + data,
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
            url: Globais.url + "/servicos/delete/" + data,
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

const servicosService = new ServicosService()
export default servicosService