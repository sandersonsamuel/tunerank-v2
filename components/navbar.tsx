import Link from "next/link"
import { SearchInput } from "./search-input"

export const NavBar = () => {

  return (
    <div className="md:px-5 py-3 flex justify-between items-center">
      <Link href={"/"} className="w-full">
        <img className="w-44 sm:w-60" src="Tune_Rank.svg" alt="logo tune rank" />
      </Link>

      <div className="hidden sm:flex gap-5 w-full items-center justify-end">
        <Link className="hover:underline" href={"/login"}>Entrar</Link>
        <Link className="hover:underline" href={"/register"}>Criar Conta</Link>
        <SearchInput />
      </div>
    </div>
  )
}