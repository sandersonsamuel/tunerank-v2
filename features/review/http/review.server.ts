import { axiosServer } from "@/http/axios/server/axios.server"
import { UserResponseReviews } from "../types/review.type"

export const getReviewsServer = async () => {
    const response = await axiosServer.get<UserResponseReviews>('/rating/user')
    return response.data
}
