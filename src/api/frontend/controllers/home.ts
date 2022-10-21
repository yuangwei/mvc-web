/**
 * A set of functions called "actions" for `home`
 */

 export default {
  async index(ctx) {
    const adminService = strapi.service('plugin::content-manager.content-types');
    const res = await adminService.findAllContentTypes();
    console.log(res);
    await ctx.render('/', {
      title: "Hello"
    });
  }
};
