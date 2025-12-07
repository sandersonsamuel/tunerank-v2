"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { userState } from "@/valtio";
import { ArrowRight } from "lucide-react";
import { motion } from 'motion/react'
import { useRouter } from "next/navigation";
import Typewriter from 'typewriter-effect';
import { useSnapshot } from "valtio";

export default function Home() {

  const names = ["kendrick lammar",
    "racionais mc",
    "jorge da capadócia",
    "luther", "sabotage",
    "chromakopia", "Pride", "Nego drama",
    "CALL ME IF YOU GET LOST", "Heaven Can Wait",
    "Mina feia"];

  const { data } = useSnapshot(userState)
  const router = useRouter()

  const redirect = () => {
    if (data) {
      return router.push("/search")
    }

    return router.push("/login")
  }

  return (
    <div className='bg-background min-h-screen flex flex-col items-center gap-5'>
      <div className="text-4xl font-black text-center">
        <h1>Seu gosto,</h1>
        <h1 className="text-primary">Quantificado.</h1>
      </div>
      <h2 className="text-center mx-3">
        Acompanhe cada batida, avalie cada detalhe e
        compartilhe suas opiniões mais sinceras.
      </h2>

      <motion.div
        initial={{ rotate: 1.5 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <Button size="lg" className="flex items-center gap-2 text-lg rounded-full" onClick={redirect}>Comece a avaliar <ArrowRight /></Button>
      </motion.div>

      <div className="w-full bg-accent text-slate-300 py-4 overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12 text-4xl font-display font-black uppercase tracking-tighter px-4"
        >
          {names.map((name, index, array) => (
            <span key={`first-set-${index}`}>
              <span>{name}</span> {index < array.length - 1 ? "•" : ""}
            </span>
          ))}
        </motion.div>
      </div>

      <Card className="w-[90%] md:max-w-[500px] mx-3 gap-0 rounded-4xl border-0 overflow-hidden pb-0">
        <CardHeader className="text-2xl font-bold">
          Compartilhe suas avaliações
        </CardHeader>
        <CardContent>
          <p>Compartilhe suas avaliações em outras redes com o nosso template de review.</p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileTap={{ height: "200px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeIn" }}
            className="bg-white/10 mt-2 h-32 backdrop-blur-md p-3 rounded-t-xl flex items-center gap-3 border border-white/10 transform group-hover:translate-y-[-5px] transition-transform">
          </motion.div>
        </CardContent>
      </Card>

      <Card className="w-[90%] md:max-w-[500px] mx-3 gap-0 bg-linear-to-b from-primary to-indigo-900 rounded-4xl border-0 overflow-hidden">
        <CardHeader className="text-2xl font-bold">
          Conecte-se
        </CardHeader>
        <CardContent>
          <p>Siga seus amigos, descubra o que eles estão ouvindo.</p>
          <div className="space-y-2 mt-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                initial={{ opacity: 0, x: -1000, zIndex: -1, rotateX: 0 }}
                whileTap={{ scale: 0.95 }}
                style={{ perspective: 1000 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: i * 0.1, ease: "easeInOut" }}
                key={i} className="bg-white/10 backdrop-blur-md p-3 rounded-xl flex items-center gap-3 border border-white/10 transform group-hover:translate-y-[-5px] transition-transform" >
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <div className="flex-1 h-2 bg-white/20 rounded-full w-20" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mx-2 text-center text-2xl space-y-2">
        <p className="">Pesquise por <b> albuns</b>, <b>musicas</b> ou <b>artistas</b>: </p>

        <Typewriter options={{
          strings: ['Kendrick lammar', 'Nego drama', 'Nada como um dia após o outro'],
          autoStart: true,
          loop: true,
          cursor: "_",
        }} />

      </div>

    </div>
  );
}
