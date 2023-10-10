import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchHomeMoviesAPI } from 'tools/API-service';
import { RotatingLines } from 'react-loader-spinner';

const Home = () => {
  const [movies, setMovies] = useState(null);
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
        <ul
          className="list-group list-group-flush"
          style={{ display: 'inline-block' }}
        >
          {movies.map(({ id, title }) => (
            <li className="list-group-item" key={id}>
              <Link to={`movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <RotatingLines strokeColor="orange" width="36" />
      )}
    </div>
  );
};

export default Home;
