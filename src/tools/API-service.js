export function fetchHomeMoviesAPI() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmU2YjY1ZTMxMTBhNjkxNDA3YjE5OTQ3NTU2OGE0MCIsInN1YiI6IjY1MjJhODhhZWE4NGM3MDE0ZTAwYTdhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pDU1fQ8fOwN3u4oBiI329tuDtbQb0vPuXqnKbxMG0a0',
    },
  };

  return fetch(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    options
  )
    .then(response => response.json())
    .catch(err => console.error(err));
}

export function fetchMovieDetailsAPI(id) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmU2YjY1ZTMxMTBhNjkxNDA3YjE5OTQ3NTU2OGE0MCIsInN1YiI6IjY1MjJhODhhZWE4NGM3MDE0ZTAwYTdhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pDU1fQ8fOwN3u4oBiI329tuDtbQb0vPuXqnKbxMG0a0',
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  )
    .then(response => response.json())
    .catch(err => console.error(err));
}
