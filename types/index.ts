export type Movie = {
  id: number
  title: string
  poster: string | undefined
  price: number
  vote_average?: number
  genre_ids?: number[]
  releaseDate?: string | undefined
  poster_path?: string
  rating?: number
  genre?: string
}
