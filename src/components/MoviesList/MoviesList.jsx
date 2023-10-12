import React from 'react';
import { Link } from 'react-router-dom';

const MoviesList = ({ movies, location }) => {
  return (
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
  );
};

export default MoviesList;
