'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query('api::post.post').findOne({
      where: { slug: id },
      populate: {
        thumbnail: {
          select: ['name', 'url'],
        },
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async find(ctx) {
    const entities = await strapi.db.query('api::post.post').findMany({
      select: ['slug', 'title', 'publishedAt'],
      populate: {
        thumbnail: {
          select: ['name', 'url'],
        },
      },
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);

    return this.transformResponse(sanitizedEntities);
  }
}));
