import { RequestMethod } from "@nestjs/common"
import axios, { Method, AxiosResponse, AxiosError } from "axios"
import { config } from "config"

const BaseURL = "https://api.tosspayments.com/v1"


const RequestToss = async (path: string, data: any, method: Method): Promise<AxiosResponse|AxiosError> => {
    return axios(`${BaseURL}${path}`, {
        method: method,
        data: data,
        headers: {
            "Authorization": "Basic " + Buffer.from(config.TOSS_SECRET_KEY + ":").toString("base64"),
            "Content-Type": "application/json"
        }
    })
}

export default RequestToss;