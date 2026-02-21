import { axiosClient } from "@/http/axios/client/axios.client"
import { UserResponseReviews } from "../types/review.type"

export const getReviews = async () => {
    const response = await axiosClient.get<UserResponseReviews>('/rating/user')
    return response.data
}