import pictureTemplate from '../templates/picture.hbs';
import refs from '../js/refs.js';

export default function createMarkUp(array) {
  const markUp = array.hits.map(pictureTemplate).join('');
  refs.list.insertAdjacentHTML('beforeend', markUp);
}
