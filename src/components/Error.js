import { errorEl, errorMessageEl } from '../common.js';

function renderError(msg = 'An error occurred') {
    errorMessageEl.textContent = msg;
    errorEl.classList.add('error--visible');

    setTimeout(() => errorEl.classList.remove('error--visible'), 4000);
}

export default renderError;
