import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import { fetchMovieCredits } from 'tools/API-service';
import { RotatingLines } from 'react-loader-spinner';

const defaultImg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhX_KhrF1bKL6pUN-lmhsdTeh9Y5oBKwDornJEZqh3Uh7uRA7s6M49mw0HA3SDGEC_4Gc&usqp=CAU';

const Cast = () => {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetchMovieCredits(movieId);
        const { cast } = response;

        setMovieCredits(cast);
      } catch (error) {
        throw error;
      }
    };

    fetchAPI();
  }, [movieId]);

  return (
    <>
      <h2 style={{ marginBottom: '40px' }}>Cast</h2>
      <ul>
        {movieCredits ? (
          movieCredits.map(credit => {
            return (
              <li key={credit.cast_id} className="list-group-item">
                <div className="card mb-3" style={{ maxWidth: '440px' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        width={'138px'}
                        src={
                          credit.profile_path
                            ? `https://www.themoviedb.org/t/p/w138_and_h175_face${credit.profile_path}`
                            : defaultImg
                        }
                        alt="profile img"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{credit.name}</h5>
                        <p className="card-text">
                          {' '}
                          Character: {credit.character}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <RotatingLines strokeColor="orange" width="36" />
        )}
      </ul>
    </>
  );
};

export default Cast;
