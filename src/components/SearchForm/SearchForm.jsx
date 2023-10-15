import { Notify } from 'notiflix/build/notiflix-notify-aio';

const SearchForm = ({ onSubmit, onChange, value }) => {
  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      return Notify.warning('Please enter a movie name');
    }
    onSubmit(value);
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
          onChange={onChange}
          value={value}
        />
        <button className="btn btn-warning" type="submit" id="button-addon2">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
