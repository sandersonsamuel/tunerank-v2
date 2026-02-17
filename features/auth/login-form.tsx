"use client"

import { cn } from "@/lib/utils"
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
import { loginSchema } from "@/features/auth/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Logo } from "../../components/logo"
import Link from "next/link"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        console.log(data)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <Logo className="mb-2" />
                    <CardTitle>Entre na sua conta</CardTitle>
                    <CardDescription>
                        Insira seu email e senha abaixo para fazer login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <FieldGroup >
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
                                    <div className="flex items-center">
                                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Esqueceu sua senha?
                                        </a>
                                    </div>
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
                                <Button type="submit">Entrar</Button>
                                <FieldDescription className="text-center">
                                    Não tem uma conta? <Link href="/register">Cadastre-se</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
