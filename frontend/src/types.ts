import type {Feature} from 'geojson';

export interface Location {
    title: string;
    description: string;
    coordinates: [number, number];
    link: string;
}

export interface CustomFeature extends Feature {
    properties: {
        title: string;
        description?: string;
    }
}
