import { useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([
    'dracula',
    'obeme',
    'shrek',
    'obeliks',
    'matrix',
  ]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieSearchQuery = searchParams.get('movieId') ?? '';

  const updateQueryString = event => {
    const queryValue = event.target.value;

    const nextParams = queryValue !== '' ? { movieId: queryValue } : {};
    setSearchParams(nextParams);
  };

  const filteredMovies = useMemo(() => {
    return movies.filter(movie =>
      movie.toLowerCase().includes(movieSearchQuery.trim().toLowerCase())
    );
  }, [movies, movieSearchQuery]);

  return (
    <>
      <div>Movies</div>
      <input
        type="text"
        onChange={updateQueryString}
        value={movieSearchQuery}
      />
      {filteredMovies.map(movie => {
        return (
          <li key={movie}>
            <Link to={`${movie}`} state={{ from: location }}>
              {movie}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default Movies;
