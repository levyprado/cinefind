import { state, searchListEl } from '../common.js';

function renderSearchResults() {
    // Empty result list
    searchListEl.innerHTML = '';

    state.searchResults
        .slice((state.actualPage - 1) * 4, state.actualPage * 4)
        .forEach(result => {
            const resultsHTML = `
        <li class="result-item">
            <a href="#${result.id}" class="result">
                <div class="result__img-container">
                    <img class="result__img"
                        src="${
                            result.poster_path
                                ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
                                : './images/image-not-found.webp'
                        }" alt="">
                </div>
                <div class="result__info">
                    <div>
                        <h3 class="result__title ">${
                            result?.title || result?.name
                        }</h3>
                        <p class="result__text result__date ">${result.release_date.slice(
                            0,
                            4
                        )}</p>
                    </div>
                    <div class="result__bottom">
                        <div class="result__bottom-item ">
                            <span class="result__icon"><svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                            <p class="result__text">${result.vote_average.toFixed(
                                2
                            )}</p>
                        </div>
                        <button class="result__bottom-item result__like-btn ">
                            <p class="result__text">See more...</p>
                        </button>
                    </div>
                </div>
            </a>
        </li>
        `;
            searchListEl.insertAdjacentHTML('beforeend', resultsHTML);
        });
}

export default renderSearchResults;
