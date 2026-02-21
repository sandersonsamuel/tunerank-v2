import { axiosClient } from "@/http/axios/client/axios.client"
import { AuthMeResponse } from "../schemas/auth.schemas"

export const getAuth = async () => {
    const response = await axiosClient.get<AuthMeResponse>('/auth/me')
    return response.data
}