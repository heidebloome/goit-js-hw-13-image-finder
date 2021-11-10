import './sass/main.scss';

import refs from './js/refs';
import FetchImages from './js/apiService';
import createMarkUp from './js/create-markup';
import '@pnotify/core/dist/BrightTheme.css';
import { success, info, error } from '@pnotify/core';
import * as basicLightbox from 'basiclightbox';

const fetchImages = new FetchImages();

refs.form.addEventListener('submit', findPictures);
refs.searchButton.addEventListener('click', findPictures);
refs.moreButton.addEventListener('click', onLoadMoreBtnClick);

function findPictures(e) {
  e.preventDefault();

  const searchQuery = refs.input.value.trim();
  if (!searchQuery) {
    const myError = error({
      text: 'Please enter a valid search query!',
      sticker: false,
      icon: false,
      closer: false,
      delay: 250,
      addClass: 'notice',
    });
    return;
  }
  fetchImages.query = searchQuery;

  refs.list.innerHTML = '';
  refs.moreButton.classList.add('is-hidden');

  fetchImages.resetPage();

  fetchImages.fetchImages().then(data => {
    createMarkUp(data);
    console.log(data);

    if (data.length === 12) {
      refs.moreButton.classList.remove('is-hidden');
      return;
    }

    if (data.length === 0) {
      const myError2 = error({
        text: 'Please enter a valid search query!',
        sticker: false,
        icon: false,
        closer: false,
        delay: 250,
        addClass: 'notice',
      });
      return;
    }
  });
}

function onLoadMoreBtnClick() {
  fetchImages.fetchImages().then(data => {
    createMarkUp(data);

    if (data.length < 12) {
      refs.moreButton.classList.add('is-hidden');
    }
  });
}

refs.list.addEventListener('click', onImgClick);

function onImgClick(e) {
  e.preventDefault();

  if (e.target === e.currentTarget) return;

  basicLightbox
    .create(
      `
		<img width="1400" height="900" src=${e.target.src}>
	`,
    )
    .show();
}
