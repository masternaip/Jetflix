export const base_img_url = 'https://image.tmdb.org/t/p/original';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = 'a1e72fd93ed59f56e6332813b9f8dcae';

export const fetchData = {
  fetchLatest: `${BASE_URL}/movie/latest?api_key=${API_KEY}`,
  fetchPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  fetchUpcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  fetchNowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
};
