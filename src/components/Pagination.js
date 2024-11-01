import {
    paginationEl,
    pageBtnBackEl,
    pageBtnNextEl,
    pageBtnBackNumberEl,
    pageBtnNextNumberEl,
    state,
} from '../common.js';
import renderSearchResults from './SearchResults.js';

paginationEl.addEventListener('click', e => {
    const clickedBtn = e.target.closest('.page__btn');
    if (!clickedBtn) return;

    const nextBtn = clickedBtn.className.includes('next');
    nextBtn ? state.actualPage++ : state.actualPage--;

    // Change button number
    pageBtnBackNumberEl.textContent = state.actualPage - 1;
    pageBtnNextNumberEl.textContent = state.actualPage + 1;

    // If there's results in the next page, show 'next' btn
    state.actualPage < state.searchResults.length / 4
        ? pageBtnNextEl.classList.remove('page__btn--hidden')
        : pageBtnNextEl.classList.add('page__btn--hidden');

    // If page's higher than 1, show 'back' btn
    state.actualPage > 1
        ? pageBtnBackEl.classList.remove('page__btn--hidden')
        : pageBtnBackEl.classList.add('page__btn--hidden');

    // Render results
    renderSearchResults();
});
