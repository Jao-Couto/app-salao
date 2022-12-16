import axios from "axios"
import Globais from "../globais"

class PagoService {

    async cadastrar(data) {
        return axios({
            url: Globais.url + "/pagos/cadastrar",
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

    async listar() {
        return axios({
            url: Globais.url + "/pagos/listar" + Globais.user,
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
            url: Globais.url + "/pagos/data/" + data,
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
            url: Globais.url + "/pagos/id/" + data,
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
}

const pagoService = new PagoService()
export default pagoService