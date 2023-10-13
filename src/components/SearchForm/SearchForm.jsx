// import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const SearchForm = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieSearchQuery = searchParams.get('query') ?? '';

  // const savedQuery = useRef(movieSearchQuery);

  const handleChange = event => {
    const queryValue = event.target.value.trim();

    const nextParams = queryValue !== '' ? { query: queryValue } : {};
    setSearchParams(nextParams);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (movieSearchQuery.trim() === '') {
      return Notify.warning('hooiya');
      //  return Notify.warning('Please enter a movie name');
    }
    onSubmit(movieSearchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a movie name"
          aria-label="Enter a movie name"
          aria-describedby="button-addon2"
          onChange={handleChange}
          value={movieSearchQuery}
        />
        <button className="btn btn-warning" type="submit" id="button-addon2">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
