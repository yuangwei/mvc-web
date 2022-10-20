/**
 * `nofound` middleware
 */

import { Strapi } from '@strapi/strapi';
import { render } from '../utils/render';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
      await render(config, ctx, '404', {});
      ctx.status = 404;
    }
  };
};
