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
import { isAxiosError } from "axios"
import { useState } from "react"
import { Eye, EyeOff, MailCheck } from "lucide-react"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const router = useRouter()
    const [emailNotVerified, setEmailNotVerified] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setEmailNotVerified(false)
        const toastId = toast.loading("Entrando...")
        try {
            await mutateAsync(data)
            toast.success("Login realizado com sucesso!", { id: toastId })
            router.push("/")
        } catch (error) {
            toast.dismiss(toastId)
            if (isAxiosError(error) && error.response?.status === 403) {
                setEmailNotVerified(true)
            }
        }
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
                        <FieldGroup>
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
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="pr-9"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => setShowPassword(prev => !prev)}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
                                            tabIndex={-1}
                                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                        >
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </Button>
                                    </div>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />
                            {emailNotVerified && (
                                <div className="flex items-start gap-3 rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-600 dark:text-yellow-400">
                                    <MailCheck size={16} className="mt-0.5 shrink-0" />
                                    <div className="flex flex-col gap-1">
                                        <span>Seu email ainda não foi verificado.</span>
                                        <Link
                                            href="/verify-email/resend"
                                            className="font-medium underline underline-offset-4 hover:text-yellow-500"
                                        >
                                            Reenviar email de verificação
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <Field>
                                <Button disabled={isPending} type="submit">
                                    {isPending ? <Spinner /> : "Entrar"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Não tem uma conta? <Link href="/auth/register">Cadastre-se</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
