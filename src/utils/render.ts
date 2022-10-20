import getPaths from 'get-paths';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';

const viewPath = join(process.cwd(), 'view');

export function render(config, ctx, relPath = '/', data = {}) {
  return getPaths(viewPath, relPath, 'html').then(paths => {
    // const suffix = paths.ext;
    const state = Object.assign({}, ctx.data || {}, data);
    state.partials = Object.assign(Object.create(null), config.partials || {});
    ctx.type = 'text/html';

    for (let partial in config.partials) {
      Handlebars.registerPartial(partial, config.partials[partial]);
    }
    for (let helper in config.helpers) {
      Handlebars.registerHelper(helper, config.helpers[helper]);
    }
    const tpl = readFileSync(join(viewPath, paths.rel));
    const compile = Handlebars.compile(tpl.toString());
    ctx.body = compile(state);
  })
}