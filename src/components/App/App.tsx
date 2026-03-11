import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { noMovies, badRequest } from '../../services/toasts';
import type { Movie } from '../../types/movie';
import FetchMovies from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setError(false);
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {loading && <Loader />}
      {error && !loading && <ErrorMessage />}
      {!error && !loading && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </div>
  );
}

export default App;
