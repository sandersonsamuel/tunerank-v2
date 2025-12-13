"use client"

import { SearchBar } from "@/components/features/search/search-input"
import { MAIN_PAGES } from "@/constants"
import { cn } from "@/lib/utils"
import { userState } from "@/valtio"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSnapshot } from "valtio"

export const NavigationHeader = () => {

  const user = useSnapshot(userState)
  const pathName = usePathname()

  return (
    <div className={cn("px-3 md:px-5 py-3 flex justify-between gap-3 items-center", MAIN_PAGES.includes(pathName) ? "" : "hidden")}>
      <Link href={"/"} className="sm:w-full">
        <img className="w-44 sm:w-60" src="/Tune_Rank.svg" alt="logo tune rank" />
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