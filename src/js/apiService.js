export default class FetchImages {
  constructor() {
    this.pageNumber = 1;
    this.searchQuery = '';

    this.KEY = '24186443-1921da3d98fb9233d7b210f5d';
    this.BASE_URL = 'https://pixabay.com/api';
  }

  fetchImages() {
    return fetch(
      `${this.BASE_URL}/?q=${this.searchQuery}&image_type=photo&page=${this.pageNumber}&per_page=12&key=${this.KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(value) {
    this.searchQuery = value;
  }
}
