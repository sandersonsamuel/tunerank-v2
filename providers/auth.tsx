"use client"

import { auth } from "@/firebase/config"
import { userState } from "@/valtio"
import { onAuthStateChanged } from "firebase/auth"
import { ref } from "valtio"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

type Props = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userState.data = ref(user)
    } else {
      userState.data = null
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

}