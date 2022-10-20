/**
 * `api` middleware
 */

 import { Strapi } from '@strapi/strapi';

 export default (config, { strapi }: { strapi: Strapi }) => {
   // Add your own logic here.
   return async (ctx, next) => {
      function success(data) {
        ctx.type = 'application/json';
        ctx.body = {
          code: 0,
          message: 'OK',
          data,
        }
      }

      function error(code, message) {
        ctx.type = 'application/json';
        ctx.body = {
          code,
          message,
          data: null,
        }
      }
      ctx.response.api = ctx.api = {};
      ctx.response.api.success = ctx.api.success = success;
      ctx.response.api.error = ctx.api.error = error;
      return next();
 
   };
 };
 