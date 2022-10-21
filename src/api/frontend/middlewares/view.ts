/**
 * `view` middleware
 */
import { Strapi } from '@strapi/strapi';
import { render } from '../../../utils/render';

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.response.render = ctx.render = function(relPath = '/', data = {}) {
      return render(config, ctx, relPath, data);
    };
    return next();
  };
};
