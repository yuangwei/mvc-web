/**
 * A set of functions called "actions" for `home`
 */

 export default {
  async index(ctx) {
    await ctx.render('/', {
      title: "Hello"
    });
  }
};
