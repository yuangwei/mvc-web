/**
 * `view` middleware
 */
import getPaths from 'get-paths';
import { Strapi } from '@strapi/strapi';
import Handlebars from 'handlebars';
import * as path from 'path';
import { readFileSync } from 'fs';
import { render } from '../../../utils/render';


const viewPath = path.join(process.cwd(), 'view');


export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.response.render = ctx.render = function(relPath = '/', data = {}) {
      return render(config, ctx, relPath, data);
    };
    return next();
  };
};
