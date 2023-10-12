import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchMovieByQuery } from 'tools/API-service';
import { RotatingLines } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MoviesList from 'components/MoviesList/MoviesList';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieSearchQuery = searchParams.get('query') ?? '';

  const savedQuery = useRef(movieSearchQuery);

  const fetchMoviesAPI = useCallback(async () => {
    try {
      if (movieSearchQuery.trim() === '') {
        return Notify.warning('Please enter a movie name');
      }

      setLoading(true);
      const response = await fetchMovieByQuery(movieSearchQuery);
      const { results } = response;

      if (results.length === 0) {
        setLoading(false);
        return Notify.warning(`We don't have any movies for this query`);
      }

      setMovies(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [movieSearchQuery]);

  useEffect(() => {
    savedQuery.current && fetchMoviesAPI();
  }, [fetchMoviesAPI]);

  const updateQueryString = event => {
    const queryValue = event.target.value.trim();

    const nextParams = queryValue !== '' ? { query: queryValue } : {};
    setSearchParams(nextParams);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      fetchMoviesAPI();
    }
  };

  return (
    <>
      <h2>Movies</h2>
      <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a movie name"
          aria-label="Enter a movie name"
          aria-describedby="button-addon2"
          onKeyDown={handleKeyPress}
          onChange={updateQueryString}
          value={movieSearchQuery}
        />
        <button
          className="btn btn-warning"
          type="button"
          id="button-addon2"
          onClick={fetchMoviesAPI}
        >
          Search
        </button>
      </div>

      {loading ? (
        <RotatingLines strokeColor="orange" width="36" />
      ) : (
        <MoviesList movies={movies} location={location} />
      )}
    </>
  );
};

export default Movies;
