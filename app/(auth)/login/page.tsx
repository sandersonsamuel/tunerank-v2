"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/firebase/config"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function Login() {

  const router = useRouter()

  const loginWithGoogle = async () => {

    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      toast.success("Login realizado com sucesso")
      router.push("/")
    } catch (error) {
      toast.error("Ocorreu um erro ao fazer login")
      console.log(error)
    }

  }

  return (
    <div className="flex justify-center h-full">
      <Card className="w-[80%] sm:w-[400px] h-fit mt-20 scale-110">
        <CardHeader>
          <CardTitle>Faça login com sua conta google</CardTitle>
          <CardDescription>Entre com sua conta google e comece a avaliar.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={loginWithGoogle} variant={"outline"} className="w-full flex items-center">
            Entrar com google
            <img src="google_logo.png" className="size-5" alt="google logo" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}