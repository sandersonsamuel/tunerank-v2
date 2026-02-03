"use client"

import { useReleasesByUserId } from "@/http/features/rating/hooks"
import { userState } from "@/valtio"
import { useSnapshot } from "valtio"

export default function ReviewsPage() {

    const user = useSnapshot(userState).data

    const { data: releases, isLoading } = useReleasesByUserId(user?.uid || "")

    return (
        <div>
            <h1>Reviews</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {releases?.map((release) => (
                        <li key={release.releaseId}>{release.releaseId}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}