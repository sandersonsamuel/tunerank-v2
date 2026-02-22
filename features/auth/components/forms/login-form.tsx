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
import { loginSchema } from "@/features/auth/schemas/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import Link from "next/link"
import { Logo } from "@/components/logo"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { login } from "../../http/auth"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const router = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: login
    })

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        toast.promise(
            mutateAsync(data),
            {
                loading: "Entrando...",
                success: "Login realizado com sucesso!"
            }
        ).then(() => {
            router.push("/")
        })
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
                                <Button disabled={isPending} type="submit">
                                    {isPending ? <Spinner /> : "Entrar"}
                                </Button>
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
