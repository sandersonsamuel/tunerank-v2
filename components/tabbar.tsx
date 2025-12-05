"use client"

import { cn } from "@/lib/utils"
import { House, Search, Star, User } from "lucide-react"
import { motion } from "motion/react"
import { usePathname, useRouter } from "next/navigation"

export const Tabbar = () => {

  const pathName = usePathname()
  const router = useRouter()

  const tabs = [
    {
      icon: <House className="size-5" />,
      href: "/"
    }, {
      icon: <Search className="size-5" />,
      href: "/search"
    },
    {
      icon: <Star className="size-5" />,
      href: "/my/reviews"
    }, {
      icon: <User className="size-5" />,
      href: "/my/profile"
    },
  ]

  return (
    <div className="sm:hidden fixed flex bottom-0 left-1/2 -translate-x-1/2 m-0 z-50 bg-slate-950/95 p-3 gap-5 rounded-4xl mb-2">
      {tabs.map((tab, index) => (
        <motion.div whileTap={{ scale: 0.7 }} transition={{ duration: 0.2 }} key={index} onClick={() => router.push(tab.href)} className={cn("flex size-[50px] flex-col items-center justify-center bg-slate-900 rounded-xl", pathName === tab.href ? "bg-slate-800" : "")}>
          {tab.icon}
        </motion.div>
      ))}
    </div>
  )

}