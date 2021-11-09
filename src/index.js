import './sass/main.scss';

import refs from './js/refs';
import createMarkUp from './js/create-markup';
import fetchImages from './js/apiService';

refs.form.addEventListener('submit', fetchPictures);
refs.searchButton.addEventListener('click', fetchPictures);
refs.moreButton.addEventListener('click', onBtnClick);

let pageNumber = 1;
let searchQuery = '';

function fetchPictures(e) {
  e.preventDefault();
  searchQuery = refs.input.value.trim();
  if (!searchQuery) return;
  refs.list.innerHTML = '';
  refs.moreButton.classList.add('is-hidden');
  fetchImages(searchQuery, pageNumber).then(data => {
    createMarkUp(data);
    if (data.hits.length < 12) return;
    refs.moreButton.classList.remove('is-hidden');
  });
  pageNumber += 1;
}

function onBtnClick() {
  fetchImages(searchQuery, pageNumber).then(data => {
    createMarkUp(data);
    if (data.hits.length < 12) {
      refs.moreButton.classList.add('is-hidden');
    }
  });
  pageNumber += 1;
  refs.moreButton.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
