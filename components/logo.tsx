"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

type Props = {
    className?: string
} & React.HTMLAttributes<HTMLImageElement>

export const Logo = ({ className, ...rest }: Props) => {
    return (
        <Image width={180} height={180} className={cn("w-44 sm:w-60", className)} src="/Tune_Rank.svg" alt="logo tune rank" {...rest} />
    )
}