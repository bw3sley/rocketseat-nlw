import { UserRoundPlus, ArrowRight } from "lucide-react";

import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
    openConfirmTripModal: () => void

    openGuestsModal: () => void

    emailsToInvite: string[]
}

export function InviteGuestsStep({ emailsToInvite, openGuestsModal, openConfirmTripModal }: InviteGuestsStepProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
                <UserRoundPlus className="size-5 text-zinc-500" />

                {emailsToInvite.length > 0 ? (
                    <span className="text-lg text-zinc-100 flex-1">
                        {emailsToInvite.length} pessoa(s) convidada(s)
                    </span>
                ) : (
                    <span className="text-lg text-zinc-400 flex-1">Quem estará na viagem?</span>
                )}
            </button>

            <div className="w-px h-6 bg-zinc-800"></div>

            <Button onClick={openConfirmTripModal}>
                Confirmar viagem
                <ArrowRight className="size-5" />
            </Button>
        </div>
    )
}