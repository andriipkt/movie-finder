import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchHomeMoviesAPI } from 'tools/API-service';

const Home = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetchHomeMoviesAPI();
        const { results } = response;

        setMovies(results);
      } catch (error) {
        throw error;
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {movies ? (
        <ul>
          {movies.map(({ id, title }) => (
            <Link key={id} to={`movies/${id}`}>
              <li>{title}</li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
