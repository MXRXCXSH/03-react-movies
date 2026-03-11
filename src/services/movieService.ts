import axios from 'axios';
import type { Movie } from '../types/movie';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

interface FetchMoviesParams {
  query: string;
  page?: number;
}

async function FetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> {
  const config = {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await axios.get(BASE_URL, config);

  return response.data.results;
}

export default FetchMovies;
