import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { noMovies, badRequest } from '../../services/toasts';
import type { Movie } from '../../types/movie';
import FetchMovies from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setError(false);
      setMovies([]);
      const moviesList = await FetchMovies({ query });

      if (moviesList.length === 0) {
        noMovies();
        return;
      }

      setMovies(moviesList);
    } catch (error) {
      setError(true);
      badRequest();
      console.error(error);
    }
  };
  const handleSelect = (movie: Movie) => {
    console.log(movie);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage />}
      {!error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
    </div>
  );
}

export default App;
