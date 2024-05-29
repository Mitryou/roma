import type {Load} from '@sveltejs/kit';
import {API_URL} from '../../../../../config';
import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({fetch, params, parent}) => {
    const history = await fetch(`${API_URL}/history`)
        .then(response => response.json())
        .then(json => (json ? json.data : null));

    const chapters = await fetch(`${API_URL}/chapters`)
        .then(response => response.json())
        .then(json => json ? json.data : []);

    const chapter = await fetch(`${API_URL}/chapters/${params.slug}`)
        .then(response => response.json())
        .then(json => {
            if (json) return json.data;

            error(500, 'Что-то пошло не так! Попробуйте позже.');
        });

    if (!chapter) error(404, 'Такой страницы не существует!');

    return { history, chapters, chapter };
}
