import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetailsAPI } from 'tools/API-service';
import styled from 'styled-components';
import { RotatingLines } from 'react-loader-spinner';

const StyledLink = styled(Link)`
  font-size: 22px;
`;

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const backLinkLocation = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchMovieDetailsAPI(movieId);

        setMovieDetails(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [movieId]);

  return (
    <>
      {movieDetails ? (
        <>
          <Link
            className="btn btn-warning"
            style={{ marginBottom: '24px' }}
            to={backLinkLocation.current}
          >
            Back
          </Link>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`https://www.themoviedb.org/t/p/w300${movieDetails.poster_path}`}
                  alt="poster"
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title">{movieDetails.title}</h2>
                  <p className="card-text">
                    User score:{' '}
                    {`${Math.round((movieDetails.vote_average / 10) * 100)}%`}
                  </p>
                  <h3 className="card-title">Overview</h3>
                  <p className="card-text">{movieDetails.overview}</p>
                  <h3 className="card-title">Genres</h3>
                  <ul>
                    {movieDetails.genres.map(genre => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4>Additionl information</h4>

            <ul>
              <li>
                <StyledLink to="cast">Cast</StyledLink>
              </li>
              <li>
                <StyledLink to="reviews">Reviews</StyledLink>
              </li>
            </ul>
          </div>
          <Suspense
            fallback={<RotatingLines strokeColor="orange" width="36" />}
          >
            <Outlet />
          </Suspense>
        </>
      ) : (
        <RotatingLines strokeColor="orange" width="36" />
      )}
    </>
  );
};

export default MovieDetails;
