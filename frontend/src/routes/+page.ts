import type { Load } from '@sveltejs/kit';
import {error} from '@sveltejs/kit';
import {API_URL} from '../config';

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ fetch }) => {
    const history = await fetch(`${API_URL}/history?populate=chapters`)
        .then(response => response.json())
        .then(json => {
            if (json) return json.data;

            error(500, 'Что-то пошло не так! Попробуйте позже.');
        });

    const posts = await fetch(`${API_URL}/posts`)
        .then(response => response.json())
        .then(json => {
            if (json) return json.data;

            error(500, 'Что-то пошло не так! Попробуйте позже.');
        });

    const persons = await fetch(`${API_URL}/people`)
        .then(response => response.json())
        .then(json => {
            if (json) return json.data;

            error(500, 'Что-то пошло не так! Попробуйте позже.');
        });

    return { history, posts, persons };
};
