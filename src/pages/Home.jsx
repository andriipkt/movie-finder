import MoviesList from 'components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchHomeMoviesAPI } from 'tools/API-service';
import { RotatingLines } from 'react-loader-spinner';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetchHomeMoviesAPI();
        const { results } = response;

        setMovies(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAPI();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {movies ? (
        <MoviesList movies={movies} location={location} />
      ) : (
        <RotatingLines strokeColor="orange" width="36" />
      )}
    </div>
  );
};

export default Home;
