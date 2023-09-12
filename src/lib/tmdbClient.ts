export const tmdbOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Bearer '+import.meta.env.VITE_TMDB_ACCESS_TOKEN,
  }
}