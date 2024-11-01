import { searchResultsSkeletonEl } from '../common.js';

function renderLoadingSkeleton(section) {
    const loadingEL = section === 'search' ? searchResultsSkeletonEl : '';

    loadingEL.classList.toggle('loading');
}

export default renderLoadingSkeleton;
