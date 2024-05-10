import type { Load } from '@sveltejs/kit';
import {API_URL} from '../../../config';
import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ params, fetch }) => {
    const person = await fetch(`${API_URL}/people/${params.slug}`)
        .then(response => response.json())
        .then(json => {
            if (json) return json.data;

            error(500, 'Что-то пошло не так! Попробуйте позже.');
        });

    if (!person) error(404, 'Такой страницы не существует!');

    return { person };
};
