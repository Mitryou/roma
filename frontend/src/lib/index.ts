type Blocks = 'blocks.text' | 'blocks.images' | 'blocks.image-with-text' | 'blocks.related-material';
type Media = 'media.image' | 'media.video' | 'media.slider';
type Typography = 'typography.title' | 'typography.paragraph' | 'typography.strong-text' | 'typography.blockquote';

type ComponentName = Blocks | Media | Typography;

export type TParagraph = {
    id: number,
    text: string
}

export type TImage = {
    id: number,
    caption: string,
    sourceText: string,
    sourceLink: string,
    image: any
}

export type TBlockquote = {
    id: number,
    text: string,
    author: string
}

export type TVideo = {
    id: number,
    link: string,
    description: string
}

export type TStrongText = {
    id: number,
    text: string
}

export interface IDynamicZoneComponent {
    id: number,
    __component: ComponentName
    [key: string]: unknown
}

export interface IParagraphComponent extends IDynamicZoneComponent {
    text: string
}

export interface ITextComponent extends IDynamicZoneComponent {
    paragraphGroup: TParagraph[];
}

export interface IImageWithTextComponent extends IDynamicZoneComponent {
    imageComponent: any;
    imageAlign: 'left' | 'right';
    paragraphGroup: IParagraphComponent[];
}

export enum ImagesLayout {
    BY_THREE_COLS = 'byThreeCols',
    BY_IMAGES_COUNT = 'byImagesCount'
}

export interface IImagesComponent extends IDynamicZoneComponent {
    imageGroup: TImage[],
    layout: ImagesLayout
}

export interface ISliderComponent extends IDynamicZoneComponent {
    imageGroup: TImage[]
}
