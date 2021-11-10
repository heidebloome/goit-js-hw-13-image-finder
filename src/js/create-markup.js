import refs from '../js/refs.js';
import pictureTemplate from '../templates/picture.hbs';

export default function createMarkUp(array) {
  const markUp = array.map(pictureTemplate).join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markUp);
}
