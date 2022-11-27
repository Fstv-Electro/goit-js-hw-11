export function markupGallery(photos) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = photos;
  return `<div class="photo-card">
      <a href="${largeImageURL}" class="photo-card__link"><img class="photo-card_image" src="${webformatURL}" alt="${tags}" loading="lazy"></a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b> ${likes}</p>
                        <p class="info-item">
                            <b>Views</b> ${views}</p>
                        <p class="info-item">
                            <b>Comments</b> ${comments}</p>
                        <p class="info-item">
                            <b>Downloads</b> ${downloads}</p>
                    </div>
            </div>`;
}