import axios from "axios"
import Globais from "../globais"

class ServicoMarcar {

    async marcarServico(data) {
        return axios({
            url: Globais.url + "/servicosMarcados/cadastrar",
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

    async listarId(data) {
        return axios({
            url: Globais.url + "/servicosMarcados/listar/" + data,
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
            url: Globais.url + "/servicosMarcados/delete/" + data,
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