import './sass/main.scss';

import './js/apiService';

import refs from './js/refs';
import createMarkUp from './js/create-markup';
import fetchImages from './js/apiService';

refs.form.addEventListener('submit', fetchPictures);
refs.button.addEventListener('click', onBtnClick);

let pageNumber = 1;
let searchQuery = '';

function fetchPictures(e) {
  e.preventDefault();
  searchQuery = refs.input.value.trim();
  console.log(pageNumber);
  fetchImages(searchQuery, pageNumber).then(data => {
    createMarkUp(data);
  });
  refs.button.classList.remove('is-hidden');
  pageNumber += 1;
}

function onBtnClick() {
  console.log(pageNumber);
  console.log(searchQuery);
  fetchImages(searchQuery, pageNumber).then(data => {
    createMarkUp(data);
  });
  pageNumber += 1;
}
