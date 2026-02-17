"use client"

import { cn } from "@/lib/utils"

type Props = {
    className?: string
} & React.HTMLAttributes<HTMLImageElement>

export const Logo = ({ className, ...rest }: Props) => {
    return (
        <img className={cn("w-44 sm:w-60", className)} src="/Tune_Rank.svg" alt="logo tune rank" {...rest} />
    )
}