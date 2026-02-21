export type Album = {
    id: string
    name: string
    images: {
        url: string
        height: number
        width: number
    }[]
    artists: {
        id: string
        name: string
    }[]
    release_date: string
    total_tracks: number
    tracks: {
        total: number
        items: {
            artists: {
                external_urls: {
                    spotify: string
                },
                href: string,
                id: string,
                name: string,
                type: string,
                uri: string
            }[],
            duration_ms: number
            id: string
            name: string
            uri: string
        }[],

    }[]
    type: string
}