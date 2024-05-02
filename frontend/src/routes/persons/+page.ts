import type { Load } from '@sveltejs/kit';
import {API_URL} from '../../config';
import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ fetch }) => {
    const persons = await fetch(`${API_URL}/people` +
        '?fields[0]=title' +
        '&fields[1]=slug' +
        '&fields[2]=name' +
        '&populate[thumbnail][fields][0]=name&populate[thumbnail][fields][1]=url')
        .then(response => response.json())
        .then(json => {
            if (json) {
                return json.data;
            }

            error(500, 'Что-то пошло не так! Попробуйте позже.');
        });

    return { persons };
};
