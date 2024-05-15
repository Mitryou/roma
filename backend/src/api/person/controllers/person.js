'use strict';

/**
 * person controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::person.person', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query('api::person.person').findOne({
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
    const entities = await strapi.db.query('api::person.person').findMany({
      select: ['slug', 'title', 'name'],
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
