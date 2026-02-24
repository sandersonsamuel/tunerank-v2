import { axiosServer } from "@/http/axios/server/axios.server"
import { UserRatesResponse } from "../types/rate.type"

export const getUserRatesServer = async () => {
    const response = await axiosServer.get<UserRatesResponse>('/rating/user')
    return response.data
}

export const getReleaseUserRateServer = async (releaseId: string) => {
    const response = await axiosServer.get<UserRatesResponse>(`/rating/release/${releaseId}`)
    return response.data
}

export const getReleaseRatesServer = async (releaseId: string) => {
    const response = await axiosServer.get<UserRatesResponse>(`/rating/release/${releaseId}`)
    return response.data
}