"use client"

import Form from 'next/form'
import { Input } from "./ui/input"

export const SearchInput = () => {

  return (
    <Form action={"/search"}>
      <Input name="query" placeholder="Procurar" className="w-full max-w-[300px]" required />
    </Form>
  )
}