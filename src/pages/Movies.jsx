import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMovieByQuery } from 'tools/API-service';
import { RotatingLines } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MoviesList from 'components/MoviesList/MoviesList';
import SearchForm from 'components/SearchForm/SearchForm';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [query, setQuery] = useState('');

  const savedQuery = useRef(query);
  console.log(savedQuery);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const movieSearchQuery = searchParams.get('query') ?? '';
  // const savedQuery = useRef(movieSearchQuery);

  useEffect(() => {
    if (!query) return;

    const fetchMoviesAPI = async () => {
      try {
        setLoading(true);
        const response = await fetchMovieByQuery(query);
        const { results } = response;

        if (results.length === 0) {
          setLoading(false);
          return Notify.warning(`We don't have any movies for this query`);
        }

        setMovies(results);
        savedQuery.current = query;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // if (savedQuery.current) {
    //   fetchMoviesAPI();
    // }
    fetchMoviesAPI();
    // savedQuery.current && fetchMoviesAPI();
  }, [query]);

  // const updateQueryString = event => {
  //   const queryValue = event.target.value.trim();

  //   const nextParams = queryValue !== '' ? { query: queryValue } : {};
  //   setSearchParams(nextParams);
  // };

  const handleSubmit = movieSearchQuery => {
    if (movieSearchQuery === query) {
      return Notify.warning('Please enter another query');
    }

    setQuery(movieSearchQuery);
  };

  return (
    <>
      <h2>Movies</h2>
      <SearchForm onSubmit={handleSubmit} />

      {loading ? (
        <RotatingLines strokeColor="orange" width="36" />
      ) : (
        <MoviesList movies={movies} location={location} />
      )}
    </>
  );
};

export default Movies;
