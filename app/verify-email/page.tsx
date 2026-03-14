import { axiosServer } from "@/http/axios/server/axios.server"
import { isAxiosError } from "axios"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ResendVerificationForm } from "@/features/auth/components/forms/resend-verification-form"
import { CheckCircle, XCircle, Clock, MailOpen } from "lucide-react"

type Props = {
    searchParams: Promise<{ token?: string }>
}

type VerifyStatus = "success" | "expired" | "already-verified" | "invalid" | "no-token"

async function verifyToken(token: string): Promise<VerifyStatus> {
    try {
        await axiosServer.get(`/auth/verify-email?token=${token}`)
        return "success"
    } catch (error) {
        if (isAxiosError(error)) {
            const message: string = error.response?.data?.message ?? ""
            if (message.toLowerCase().includes("expir")) return "expired"
            if (message.toLowerCase().includes("already verified")) return "already-verified"
        }
        return "invalid"
    }
}

export default async function VerifyEmailPage({ searchParams }: Props) {
    const { token } = await searchParams

    if (!token) {
        return (
            <VerifyLayout
                title="Link inválido"
                description="Nenhum token foi encontrado. Verifique se o link do email está correto."
            >
                <Link href="/auth/login">
                    <Button>Ir para o login</Button>
                </Link>
            </VerifyLayout>
        )
    }

    const status = await verifyToken(token)

    if (status === "success") {
        return (
            <VerifyLayout
                title="Email verificado!"
                description="Seu email foi verificado com sucesso. Agora você pode entrar na sua conta."
            >
                <Link href="/auth/login">
                    <Button>Fazer login</Button>
                </Link>
            </VerifyLayout>
        )
    }

    if (status === "already-verified") {
        return (
            <VerifyLayout
                title="Email já verificado"
                description="Seu email já foi verificado anteriormente. Você pode entrar na sua conta normalmente."
            >
                <Link href="/auth/login">
                    <Button>Fazer login</Button>
                </Link>
            </VerifyLayout>
        )
    }

    if (status === "expired") {
        return (
            <VerifyLayout
                title="Link expirado"
                description="Seu link de verificação expirou (válido por 24h). Insira seu email para receber um novo link."
            >
                <ResendVerificationForm />
            </VerifyLayout>
        )
    }

    return (
        <VerifyLayout
            title="Token inválido"
            description="O token de verificação não é válido. Solicite um novo link de verificação."
        >
            <ResendVerificationForm />
        </VerifyLayout>
    )
}

function VerifyLayout({
    title,
    description,
    children,
}: {
    title: string
    description: string
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <Logo className="mb-2" />
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
