"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/features/auth/auth.schemas"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Logo } from "../../components/logo"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = (data: z.infer<typeof registerSchema>) => {
        console.log(data)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <Logo className="mb-2" />
                    <CardTitle>Cadastre-se</CardTitle>
                    <CardDescription>
                        Insira seu nome, email e senha abaixo para fazer cadastro
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <FieldGroup >
                            <Controller name="username" control={control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="username">Nome</FieldLabel>
                                    <Input
                                        {...field}
                                        id="username"
                                        type="text"
                                        placeholder="José da Silva"
                                        required
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />
                            <Controller name="email" control={control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />
                            <Controller name="password" control={control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        required
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />
                            <Field>
                                <Button type="submit">Cadastrar</Button>
                                <FieldDescription className="text-center">
                                    Já tem uma conta? <Link href="/login">Entrar</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
