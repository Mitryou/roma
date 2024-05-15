import type { Load } from '@sveltejs/kit';
import {API_URL} from '../../config';
import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ fetch }) => {
    const persons = await fetch(`${API_URL}/people`)
        .then(response => response.json())
        .then(json => {
            if (json) return json.data;

            error(500, 'Что-то пошло не так! Попробуйте позже.');
        });

    return { persons };
};
