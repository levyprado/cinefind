import {
    searchEl,
    searchInputEl,
    searchListEl,
    searchResultsQuantityEl,
    state,
    pageBtnNextEl,
    pageBtnBackEl,
    pageBtnNextNumberEl,
} from '../common.js';
import renderError from './Error.js';
import renderLoadingSkeleton from './Loading.js';
import renderSearchResults from './SearchResults.js';

// SEARCH COMPONENT
searchEl.addEventListener('submit', e => {
    // Preventing submiting the form
    e.preventDefault();

    // Get the user input
    const userText = searchInputEl.value.trim();

    // Check if the user input is at least 1 character long
    if (userText.length < 1) {
        // Throw error
        renderError('Type any title at least 1 character long.');
        return;
    }

    // Blur input
    searchInputEl.blur();

    // Remove welcome message (mobile)
    document.querySelector('.search-results__welcome').style.display = 'none';

    // Empty result list
    searchListEl.innerHTML = '';
    // Go back to page 1
    state.actualPage = 1;
    // Reset pagination buttons
    pageBtnBackEl.classList.add('page__btn--hidden');
    pageBtnNextNumberEl.textContent = state.actualPage + 1;
    // If there's results in the next page, show 'next' btn
    state.actualPage < state.searchResults.length / 4
        ? pageBtnNextEl.classList.remove('page__btn--hidden')
        : pageBtnNextEl.classList.add('page__btn--hidden');

    // Show loading skeleton
    renderLoadingSkeleton('search');

    const userSearch = encodeURIComponent(userText);

    // Send request
    async function getResults() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=e84297aa8cf8aa6c8ac7eac02aabf3b4&query=${userSearch}`
            );

            if (!response.ok) {
                renderError('Network response failed');
                throw new Error('Network response was not ok');
            }

            // Get data
            const data = await response.json();
            const { results } = data;

            if (results.length < 1)
                renderError('No results found. Try again with other title.');

            // Remove loading skeleton
            renderLoadingSkeleton('search');

            // Display quantity of results
            searchResultsQuantityEl.textContent = results.length;

            // Update state
            state.searchResults = results;

            // If results are higher than 4, show 'next' btn
            results.length > 4
                ? pageBtnNextEl.classList.remove('page__btn--hidden')
                : pageBtnNextEl.classList.add('page__btn--hidden');

            // Render results in list
            renderSearchResults();
        } catch (error) {
            renderError('Error fetching the data: ', error.message);
            renderLoadingSkeleton('search');
        }
    }
    getResults();
});
