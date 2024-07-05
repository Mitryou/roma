import type {Load} from '@sveltejs/kit';
import {error} from '@sveltejs/kit';
import {API_URL} from '../../../../config';

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({fetch, params, parent}) => {
    const history = await fetch(`${API_URL}/history?populate=chapters`)
        .then(response => response.json())
        .then(json => (json ? json.data : null));


    if (!history) error(404, 'Такой страницы не существует!');

    return { history };
}
