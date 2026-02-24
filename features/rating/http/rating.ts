import { axiosClient } from "@/http/axios/client/axios.client"
import { Rate, ReleaseRatesResponse, UserRatesResponse } from "../types/rate.type"
import { CreateRateDto } from "../schemas/rating.schemas"

export const getUserRates = async () => {
    const response = await axiosClient.get<UserRatesResponse>('/rating/user')
    return response.data
}

export const getUserRate = async (releaseId: string) => {
    const response = await axiosClient.get<Rate>(`/rating/release/${releaseId}/me`)
    return response.data
}

export const createRate = async (rate: CreateRateDto) => {
    const response = await axiosClient.post<UserRatesResponse>('/rating/create', rate)
    return response.data
}

export const getReleaseRates = async (releaseId: string) => {
    const response = await axiosClient.get<ReleaseRatesResponse>(`/rating/release/${releaseId}`)
    return response.data
}
