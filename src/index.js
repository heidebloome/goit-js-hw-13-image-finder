import './sass/main.scss';

import refs from './js/refs';
import PicturesService from './js/apiService';
import createMarkUp from './js/create-markup';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import * as basicLightbox from 'basiclightbox';

const picturesService = new PicturesService();

// EVENT LISTENERS

refs.searchFormEl.addEventListener('submit', findPictures);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
refs.galleryEl.addEventListener('click', onImgClick);

// FUNCTIONS

function findPictures(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.query.value.trim();

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

  picturesService.query = searchQuery;

  clearMarkUp();
  picturesService.resetPage();

  picturesService.fetchImages().then(data => {
    createMarkUp(data);

    if (data.length === 12) {
      refs.loadMoreBtnEl.classList.remove('is-hidden');
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
  picturesService.fetchImages().then(data => {
    createMarkUp(data);

    if (data.length < 12) {
      refs.loadMoreBtnEl.classList.add('is-hidden');
    }

    refs.loadMoreBtnEl.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}

function onImgClick(e) {
  if (e.target === e.currentTarget) return;

  basicLightbox
    .create(
      `
		<img width="1400" height="900" src=${e.target.src}>
	`,
    )
    .show();
}

function clearMarkUp() {
  refs.galleryEl.innerHTML = '';
  refs.loadMoreBtnEl.classList.add('is-hidden');
}
