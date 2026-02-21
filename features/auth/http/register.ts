import { axiosClient } from "@/http/axios/client/axios.client"
import { RegisterSchemaType } from "../schemas/auth.schemas"

export const register = async (registerData: RegisterSchemaType) => {
    return await axiosClient.post("/auth/register", registerData)
}