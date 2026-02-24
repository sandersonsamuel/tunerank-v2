"use client"

import { SearchBar } from "@/features/search/components/search-input"
import { MAIN_PAGES } from "@/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/features/auth/hooks/auth.hooks"

export const NavigationHeader = () => {

  const { data: user } = useAuth()
  const pathName = usePathname()

  return (
    <div className={cn("px-3 md:px-5 py-3 flex justify-between gap-3 items-center", MAIN_PAGES.includes(pathName) ? "" : "hidden")}>
      <Link href={"/"} className="sm:w-full">
        <img className="w-44 sm:w-60" src="/Tune_Rank.svg" alt="logo tune rank" />
      </Link>

      <div className={cn("sm:flex gap-5 sm:w-full items-center justify-end", pathName != "/search" ? "hidden" : "")}>
        <span className="hidden sm:block">
          {
            !user && <Link className="hover:underline" href={"/auth/login"}>Entrar</Link>
          }
        </span>
        <SearchBar />
      </div>
    </div>
  )
}