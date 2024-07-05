import type { Load } from '@sveltejs/kit';
import {error} from '@sveltejs/kit';
import {API_URL} from '../../../config';

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ params, fetch }) => {
    const article = await fetch(`${API_URL}/articles/${params.slug}`)
        .then(response => response.json())
        .then(json => {
            if (json) return json.data;

            error(500, 'Что-то пошло не так! Попробуйте позже.');
        });

    if (!article) error(404, 'Такой страницы не существует!');

    return { article };
};
