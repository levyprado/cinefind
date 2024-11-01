// STATE
export const state = {
    searchResults: [],
    actualPage: 1,
    activeResult: {},
};

// SELECTORS
export const searchEl = document.querySelector('.search');
export const searchInputEl = document.querySelector('.search__input');
export const errorEl = document.querySelector('.error');
export const errorMessageEl = document.querySelector('.error__message');
export const searchListEl = document.querySelector('.search-results__list');
export const searchResultsQuantityEl = document.querySelector(
    '.search-results__top--quantity'
);
export const searchResultsSkeletonEl = document.querySelector(
    '.results-skeleton-container'
);
export const paginationEl = document.querySelector(
    '.search-results__pagination'
);
export const pageBtnBackEl = document.querySelector('.page__back');
export const pageBtnNextEl = document.querySelector('.page__next');
export const pageBtnBackNumberEl = document.querySelector(
    '.page__back--number'
);
export const pageBtnNextNumberEl = document.querySelector(
    '.page__next--number'
);
export const detailsEmptyEl = document.querySelector('.details__empty');
export const detailsContentEl = document.querySelector('.details__content');
export const searchResultsMobileEl = document.querySelector(
    '.search-results--mobile'
);
