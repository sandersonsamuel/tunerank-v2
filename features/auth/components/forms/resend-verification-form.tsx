"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { resendVerificationSchema, ResendVerificationSchemaType } from "@/features/auth/schemas/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { resendVerification } from "../../http/auth"
import { Spinner } from "@/components/ui/spinner"

export function ResendVerificationForm() {
    const { mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn: resendVerification
    })

    const { handleSubmit, control } = useForm<ResendVerificationSchemaType>({
        resolver: zodResolver(resendVerificationSchema),
        defaultValues: { email: "" }
    })

    const onSubmit = (data: ResendVerificationSchemaType) => {
        toast.promise(
            mutateAsync(data),
            {
                loading: "Reenviando...",
                success: "Email de verificação reenviado! Verifique sua caixa de entrada."
            }
        )
    }

    if (isSuccess) {
        return (
            <p className="text-sm text-muted-foreground">
                Email reenviado! Verifique sua caixa de entrada e clique no link de verificação.
            </p>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
                <Controller name="email" control={control} render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel htmlFor="resend-email">Email da conta</FieldLabel>
                        <Input
                            {...field}
                            id="resend-email"
                            type="email"
                            placeholder="m@example.com"
                            autoComplete="email"
                            required
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )} />
                <Field>
                    <Button disabled={isPending} type="submit" variant="outline">
                        {isPending ? <Spinner /> : "Reenviar email"}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}
