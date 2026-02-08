"use client"

import { LikesPageContainer } from "@/components/layout/pages/likes-page"
import { Suspense } from "react"

export default function LikesPage() {

    return (
        <div className="p-3 w-screen">
            <Suspense>
                <LikesPageContainer />
            </Suspense>
        </div>
    )


}