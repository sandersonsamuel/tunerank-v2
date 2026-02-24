import { z } from "zod";

export const createRateSchema = z.object({
    releaseId: z.string("Release Id nao encontrado"),
    rating: z.number("Rating nao encontrado").min(0.5, "Rating deve ser entre 0.5 e 5").max(5, "Rating deve ser entre 0.5 e 5"),
    review: z.string().optional(),
    type: z.enum(["ALBUM", "TRACK"]),
})

export type CreateRateDto = z.infer<typeof createRateSchema>