import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { markupGallery } from './js/markup';
import { getPictures, page, query } from './js/fetch';
import { formEl, galleryEl, buttonEl } from './js/refs';

formEl.addEventListener('submit', searchInfo);
buttonEl.addEventListener('click', onBtnClick);

const lightbox = new SimpleLightbox('.gallery a');

async function searchInfo(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  if (!searchQuery) {
    Notiflix.Notify.failure('Enter something');
    return;
  }

  try {
    const searchData = await getPictures(searchQuery);
    const { hits, totalHits } = searchData;
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    const markup = hits.map(item => markupGallery(item)).join('');
    galleryEl.innerHTML = markup;
    if (totalHits > 40) {
      buttonEl.classList.remove('js-load-btn');
      page += 1;
    }
    lightbox.refresh();
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong! Please retry');
    console.log(error);
  }
}

async function onBtnClick() {
  const response = await getPictures(query);
  const { hits, totalHits } = response;
  const markup = hits.map(item => markupGallery(item)).join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  const amountPages = totalHits / 40 - page;
  if (amountPages < 1) {
    buttonEl.classList.add('js-load-btn');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
