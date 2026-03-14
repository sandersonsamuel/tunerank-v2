import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { ResendVerificationForm } from "@/features/auth/components/forms/resend-verification-form"

export default function ResendVerificationPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <Logo className="mb-2" />
                        <CardTitle>Reenviar verificação</CardTitle>
                        <CardDescription>
                            Insira seu email para receber um novo link de verificação.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResendVerificationForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
