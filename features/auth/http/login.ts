import { axiosClient } from "@/http/axios/client/axios.client"
import { LoginSchemaType } from "../schemas/auth.schemas"

export const login = async (loginData: LoginSchemaType) => {
    return await axiosClient.post("/auth/login", loginData)
}