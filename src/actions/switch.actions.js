import axios from "axios"

export const switchActions = {
    ObtenerSwitch,
    ObtenerEstadosSwitch
}

function ObtenerSwitch(requestBody) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    return axios.post('http://sofogal.dlinkddns.com:3001/switch', requestBody, headers)
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((error) => {
            console.log(error)
        })
}

function ObtenerEstadosSwitch(num) {
    return axios.get(`http://sofogal.dlinkddns.com:3001/estados-switch`)
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((error) => {
            console.log(error)
        })
}