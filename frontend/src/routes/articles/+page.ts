import type { Load } from '@sveltejs/kit';
import {API_URL} from '../../config';
import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ fetch }) => {
    const articles = await fetch(`${API_URL}/articles?populate=*`)
        .then(response => response.json())
        .then(json => {
            if (json) return json.data;

            error(500, 'Что-то пошло не так! Попробуйте позже.');
        });

    return { articles };
};
