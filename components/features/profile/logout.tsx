import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { logout } from "@/features/auth/http/auth"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const LogoutButton = () => {

    const queryClient = useQueryClient()

    const logoutMutation = useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] })
            toast.success("Logout realizado com sucesso!")
        },
        onError: () => {
            toast.error("Erro ao realizar logout!")
        }
    })

    const handleLogout = () => {
        logoutMutation.mutate()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size={"lg"} className="w-full justify-start py-7 text-lg">
                    <LogOut className="size-6 mr-2"/> Sair
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso encerrará sua sessão atual.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleLogout}>Sair</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}