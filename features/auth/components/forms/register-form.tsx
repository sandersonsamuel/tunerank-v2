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
import { registerSchema } from "@/features/auth/schemas/auth.schemas"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Logo } from "@/components/logo"
import { useMutation } from "@tanstack/react-query"
import { register } from "../../http/register"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const router = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: register
    })

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: z.infer<typeof registerSchema>) => {
        toast.promise(
            mutateAsync(data),
            {
                loading: "Cadastrando...",
                success: "Cadastro realizado com sucesso!"
            }
        ).then(() => {
            router.push("/login")
        })
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
                            <Controller name="name" control={control} render={({ field, fieldState }) => (
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
                                <Button disabled={isPending} type="submit">
                                    {isPending ? <Spinner /> : "Cadastrar"}
                                </Button>
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
