import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetailsAPI } from 'tools/API-service';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const location = useLocation();
  const backLinkLocation = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchMovieDetailsAPI(movieId);
        console.log(response);

        setMovieDetails(response);
      } catch (error) {
        throw error;
      }
    };

    fetchDetails();
  }, [movieId]);

  return (
    <>
      {movieDetails ? (
        <>
          <Link to={backLinkLocation.current}>
            <button>back btn</button>
          </Link>

          <h1>MovieDetails: {movieDetails.title}</h1>

          <div>
            <p>Additionl information</p>

            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default MovieDetails;
