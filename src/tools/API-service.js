import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmU2YjY1ZTMxMTBhNjkxNDA3YjE5OTQ3NTU2OGE0MCIsInN1YiI6IjY1MjJhODhhZWE4NGM3MDE0ZTAwYTdhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pDU1fQ8fOwN3u4oBiI329tuDtbQb0vPuXqnKbxMG0a0';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export async function fetchHomeMoviesAPI() {
  const response = await axios.get(
    '/trending/movie/day?language=en-US',
    options
  );

  return response.data;
}

export async function fetchMovieDetailsAPI(id) {
  const response = await axios.get(`/movie/${id}?language=en-US`, options);

  return response.data;
}

export async function fetchMovieCredits(id) {
  const response = await axios.get(
    `/movie/${id}/credits?language=en-US`,
    options
  );

  return response.data;
}

export async function fetchMovieReviews(id) {
  const response = await axios.get(
    `/movie/${id}/reviews?language=en-US&page=1`,
    options
  );

  return response.data;
}

export async function fetchMovieByQuery(searchQuery) {
  const response = await axios.get(
    `search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
    options
  );

  return response.data;
}
