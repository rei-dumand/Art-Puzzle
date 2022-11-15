type Artwork = {
    id: number;
    artist_title: string;
    date_end: number;
    date_start: number;
    dimensions: string;
    image_id: string;
    medium_display: string;
    place_of_origin: string;
    title: string;
    _score: number
}

// Might not longer be needed
type ArtworkDataRes = {
    data: Artwork[]
}

export { Artwork, ArtworkDataRes };