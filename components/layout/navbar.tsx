"use client"

import Link from "next/link"
import { SearchBar } from "@/components/features/search/search-input"
import { useSnapshot } from "valtio"
import { userState } from "@/valtio"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const NavigationHeader = () => {

  const user = useSnapshot(userState)
  const pathName = usePathname()

  return (
    <div className="px-3 md:px-5 py-3 flex justify-between gap-3 items-center">
      <Link href={"/"} className="sm:w-full">
        <img className="w-44 sm:w-60" src="Tune_Rank.svg" alt="logo tune rank" />
      </Link>

      <div className={cn("sm:flex gap-5 sm:w-full items-center justify-end", pathName != "/search" ? "hidden" : "")}>
        <span className="hidden sm:block">
          {
            !user.data && <Link className="hover:underline" href={"/login"}>Entrar</Link>
          }
        </span>
        <SearchBar />
      </div>
    </div>
  )
}