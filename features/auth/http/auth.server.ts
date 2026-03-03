import { axiosServer } from "@/http/axios/server/axios.server"
import { AuthMeResponse } from "../schemas/auth.schemas"

export const getAuthServer = async () => {
    const response = await axiosServer.get<AuthMeResponse>('/auth/me')
    return response.data
}