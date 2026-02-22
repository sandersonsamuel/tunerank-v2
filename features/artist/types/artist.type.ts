export type Artist = {
    id: string
    name: string
    images: { url: string }[]
    external_urls: {
        spotify: string
    }
}