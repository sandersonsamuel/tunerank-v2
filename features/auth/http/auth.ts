import { axiosClient } from "@/http/axios/client/axios.client"
import { AuthMeResponse, LoginSchemaType, RegisterSchemaType, ResendVerificationSchemaType } from "../schemas/auth.schemas"

export const getAuth = async () => {
    const response = await axiosClient.get<AuthMeResponse>('/auth/me')
    return response.data
}

export const login = async (loginData: LoginSchemaType) => {
    return await axiosClient.post("/auth/login", loginData)
}

export const register = async (registerData: RegisterSchemaType) => {
    return await axiosClient.post("/auth/register", registerData)
}

export const logout = async () => {
    return await axiosClient.post("/auth/logout")
}

export const verifyEmail = async (token: string) => {
    return await axiosClient.get(`/auth/verify-email?token=${token}`)
}

export const resendVerification = async (data: ResendVerificationSchemaType) => {
    return await axiosClient.post("/auth/resend-verification", data)
}