import type { Schema, Attribute } from '@strapi/strapi';

export interface BlocksImageWithText extends Schema.Component {
  collectionName: 'components_blocks_image_with_texts';
  info: {
    displayName: 'ImageWithText';
    description: '';
  };
  attributes: {
    imageComponent: Attribute.Component<'media.image'>;
    imageAlign: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'left'>;
    paragraphGroup: Attribute.Component<'typography.paragraph', true> &
      Attribute.Required;
  };
}

export interface BlocksImages extends Schema.Component {
  collectionName: 'components_blocks_images';
  info: {
    displayName: 'Images';
    icon: 'picture';
    description: '';
  };
  attributes: {
    imageGroup: Attribute.Component<'media.image', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 3;
        },
        number
      >;
    layout: Attribute.Enumeration<['byThreeCols', 'byImagesCount']> &
      Attribute.DefaultTo<'byThreeCols'>;
  };
}

export interface BlocksListItem extends Schema.Component {
  collectionName: 'components_blocks_list_items';
  info: {
    displayName: 'ListItem';
  };
  attributes: {
    author: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    source: Attribute.String & Attribute.Required;
    pageNumber: Attribute.String;
    link: Attribute.String;
  };
}

export interface BlocksSourceList extends Schema.Component {
  collectionName: 'components_blocks_source_lists';
  info: {
    displayName: 'Source list';
  };
  attributes: {
    item: Attribute.Component<'blocks.list-item', true>;
  };
}

export interface BlocksText extends Schema.Component {
  collectionName: 'components_blocks_texts';
  info: {
    displayName: 'Text';
    icon: 'strikeThrough';
    description: '';
  };
  attributes: {
    paragraphGroup: Attribute.Component<'typography.paragraph', true> &
      Attribute.Required;
  };
}

export interface MediaImage extends Schema.Component {
  collectionName: 'components_media_images';
  info: {
    displayName: 'Image';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    sourceText: Attribute.String;
    caption: Attribute.Text;
    sourceLink: Attribute.String;
  };
}

export interface MediaSlider extends Schema.Component {
  collectionName: 'components_media_sliders';
  info: {
    displayName: 'Slider';
    description: '';
  };
  attributes: {
    imageGroup: Attribute.Component<'media.image', true> & Attribute.Required;
  };
}

export interface MediaVideo extends Schema.Component {
  collectionName: 'components_media_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    link: Attribute.String & Attribute.Required;
    description: Attribute.Text;
  };
}

export interface TypographyBlockquote extends Schema.Component {
  collectionName: 'components_typography_blockquotes';
  info: {
    displayName: 'Blockquote';
    icon: 'quote';
    description: '';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
    author: Attribute.String;
  };
}

export interface TypographyHeading extends Schema.Component {
  collectionName: 'components_typography_headings';
  info: {
    displayName: 'Title';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    level: Attribute.Enumeration<['h1', 'h2', 'h3', 'h4', 'h5', 'h6']> &
      Attribute.Required &
      Attribute.DefaultTo<'h1'>;
  };
}

export interface TypographyParagraph extends Schema.Component {
  collectionName: 'components_typography_paragraphs';
  info: {
    displayName: 'Paragraph';
    icon: 'strikeThrough';
    description: '';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
  };
}

export interface TypographyStrongText extends Schema.Component {
  collectionName: 'components_typography_strong_texts';
  info: {
    displayName: 'Strong Text';
    description: '';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.image-with-text': BlocksImageWithText;
      'blocks.images': BlocksImages;
      'blocks.list-item': BlocksListItem;
      'blocks.source-list': BlocksSourceList;
      'blocks.text': BlocksText;
      'media.image': MediaImage;
      'media.slider': MediaSlider;
      'media.video': MediaVideo;
      'typography.blockquote': TypographyBlockquote;
      'typography.heading': TypographyHeading;
      'typography.paragraph': TypographyParagraph;
      'typography.strong-text': TypographyStrongText;
    }
  }
}
