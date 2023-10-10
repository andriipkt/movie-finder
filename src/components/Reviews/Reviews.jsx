import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import { fetchMovieReviews } from 'tools/API-service';
import { RotatingLines } from 'react-loader-spinner';

const Reviews = () => {
  const { movieId } = useParams();
  const [movieReview, setMovieReview] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetchMovieReviews(movieId);
        const { results } = response;

        setMovieReview(results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAPI();
  }, [movieId]);

  return (
    <>
      <h2 style={{ marginBottom: '40px' }}>Reviews</h2>
      {loading ? (
        <RotatingLines strokeColor="orange" width="36" />
      ) : (
        <ul
          className="list-group list-group-flush"
          style={{ display: 'inline-block' }}
        >
          {movieReview.length > 0 ? (
            movieReview.map(review => {
              return (
                <li key={review.id} className="list-group-item">
                  <h3>{review.author}</h3>
                  <p>{review.content}</p>
                </li>
              );
            })
          ) : (
            <h3>We don't have any reviews for this movie.</h3>
          )}
        </ul>
      )}
    </>
  );
};

export default Reviews;
