"use client"

import Form from 'next/form'
import { Input } from "@/components/ui/input"

export const SearchBar = () => {

  return (
    <Form action={"/search"} className="w-fit">
      <Input name="query" placeholder="Procurar" className="w-full max-w-[200px] sm:max-w-[300px]" required />
    </Form>
  )
}