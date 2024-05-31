'use strict';

/**
 * chapter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::chapter.chapter', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query('api::chapter.chapter').findOne({
      where: { slug: id },
      populate: {
        content: {
          populate: [
            'paragraphGroup',
            'imageComponent',
            'imageComponent.image',
            'imageGroup',
            'imageGroup.image'
          ],
        }
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async find(ctx) {
    const entities = await strapi.db.query('api::chapter.chapter').findMany({
      select: ['slug', 'title']
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);

    return this.transformResponse(sanitizedEntities);
  }
}));
