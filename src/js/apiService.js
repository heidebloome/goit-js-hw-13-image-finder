const KEY = '24186443-1921da3d98fb9233d7b210f5d';
const BASE_URL = 'https://pixabay.com/api';

export default function fetchImages(searchQuery, pageNumber) {
  return fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${KEY}`,
  ).then(response => response.json());
}
