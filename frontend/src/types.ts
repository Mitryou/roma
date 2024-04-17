import type {Feature, Polygon, Position} from 'geojson';

export interface Location {
    id: number
    title: string;
    description: string;
    coordinates: [number, number];
    link: string;
}

export interface CustomFeature extends Feature {
    id: number;
    geometry: Polygon;
    properties: {
        title: string;
        description: string;
        link: string;
    }
}

export interface Place {
    id: string;
    title: string;
    description: string;
    link: string;
    coordinates: Position | Position[] | Position[][];
}
