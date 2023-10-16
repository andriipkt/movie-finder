import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';

const SearchForm = ({ onSubmit, previousQuery }) => {
  const [formQuery, setFormQuery] = useState(
    previousQuery ? previousQuery : ''
  );

  const handleChange = ({ target: { value } }) => {
    setFormQuery(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (formQuery.trim() === '') {
      return Notify.warning('Please enter a movie name');
    }
    onSubmit(formQuery);
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
          value={formQuery}
        />
        <button className="btn btn-warning" type="submit" id="button-addon2">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
