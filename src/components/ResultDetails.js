import {
    detailsEmptyEl,
    detailsContentEl,
    searchListEl,
    searchResultsMobileEl,
    state,
} from '../common.js';

searchListEl.addEventListener('click', e => {
    const clickedResult = e.target.closest('.result');
    if (!clickedResult) return;

    // Get id from clicked result
    const id = clickedResult.getAttribute('href').slice(1);

    // Find result in results list and save to 'active result'
    state.activeResult = state.searchResults.find(result => result.id == id);

    // Add loading skeleton
    detailsContentEl.classList.add('loading');

    // Remove welcome screen
    detailsEmptyEl.classList.add('hidden');

    // MOBILE
    if (document.documentElement.clientWidth < 1024) {
        searchResultsMobileEl.classList.add('hidden');
        document.querySelector('.details').classList.add('details--visible');
    }

    // Render details of result
    const detailsHTML = `
    <button class="details__back-btn">
            <span class="details__back-btn--icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" class="size-5">
                    <path fill-rule="evenodd"
                        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                        clip-rule="evenodd" />
                </svg>
            </span>
        </button>
        <div class="details__cover">
            <div class="skeleton skeleton-details--cover"></div>
            <img src="${
                state.activeResult.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${state.activeResult.backdrop_path}`
                    : './images/image-details-not-found.webp'
            }"
                class="details__cover-img skeleton details__skeleton">
        </div>
        <div class="details__body">
            <div class="skeleton skeleton-details--title"></div>
            <h4 class="details__title details__skeleton">${
                state.activeResult.title
            }</h4>
            <div class="skeleton skeleton-details--date"></div>
            <div class="details__year details__skeleton">${state.activeResult.release_date.slice(
                0,
                4
            )}</div>
            <div class="skeleton skeleton-details--description"></div>
            <div class="skeleton skeleton-details--description"></div>
            <div class="skeleton skeleton-details--description"></div>
            <div class="skeleton skeleton-details--description"></div>
            <div class="skeleton skeleton-details--description"></div>
            <p class="details__description details__skeleton">${
                state.activeResult.overview
            }</p>
        </div>
        <div class="details__bottom">
            <div class="details__info">
                <div class="info">
                    <div class="skeleton skeleton-details--info"></div>
                    <span class="info__icon info__icon--vote details__skeleton"><svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="size-6">
                            <path fill-rule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clip-rule="evenodd" />
                        </svg></span>
                    <span class="info__text details__skeleton">${state.activeResult.vote_average.toFixed(
                        2
                    )}</span>
                    <span class="info__description details__skeleton">Vote average</span>
                </div>
                <div class="info">
                    <div class="skeleton skeleton-details--info"></div>
                    <span class="info__icon info__icon--popularity details__skeleton"><svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="size-5">
                            <path fill-rule="evenodd"
                                d="M13.5 4.938a7 7 0 1 1-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 0 1 .572-2.759 6.026 6.026 0 0 1 2.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0 0 13.5 4.938ZM14 12a4 4 0 0 1-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 0 0 1.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 0 1 1.315-4.192.447.447 0 0 1 .431-.16A4.001 4.001 0 0 1 14 12Z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                    <span class="info__text details__skeleton">${state.activeResult.popularity.toFixed(
                        1
                    )}</span>
                    <span class="info__description details__skeleton">Popularity</span>
                </div>
            </div>
            <div class="skeleton skeleton-details--btn"></div>
            <button class="details__btn details__skeleton">
                <span class="details__btn--icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor" class="size-5">
                        <path fill-rule="evenodd"
                            d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
                Save to favorites</button>
        </div>
    `;
    detailsContentEl.innerHTML = detailsHTML;

    // After cover image loads, remove skeleton loading
    document
        .querySelector('.details__cover-img')
        .addEventListener('load', () => {
            detailsContentEl.classList.remove('loading');
            document.querySelector('.details__cover-img').style.opacity = 1;
        });
});

document.querySelector('.details__content').addEventListener('click', e => {
    const backBtnEl = e.target.closest('.details__back-btn');
    if (!backBtnEl) return;
    searchResultsMobileEl.classList.remove('hidden');
    document.querySelector('.details').classList.remove('details--visible');
});
