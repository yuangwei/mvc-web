export default {
  async api_login(ctx, next) {
    await ctx.api.success({
      hello: 'world'
    })
  }
};
