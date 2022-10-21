import getPaths from 'get-paths';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';

const viewPath = join(process.cwd(), 'view');
const viewCache = {};



export function render(config, ctx, relPath = '/', data = {}) {
  return getPaths(viewPath, relPath, 'html').then(paths => {
    const state = Object.assign({}, ctx.data || {}, data);
    state.partials = Object.assign(Object.create(null), config.partials || {});
    ctx.type = 'text/html';
    helpers.forEach(helper => {
      Handlebars.registerHelper(helper.name, helper.action);
    })
    const tpl = utils.readTpl(paths.rel);
    const compile = Handlebars.compile(tpl.toString());
    ctx.body = compile(state);
  })
}

const helpers = [
  {
    name: 'import',
    action(path: string, options: any) {
      const tpl = utils.readTpl(`${path}.html`)
      const compile = Handlebars.compile(tpl.toString());
      let data = {};
      if (options?.data?.root) {
        data = {
          ...options.data.root,
        };
      }
      if (options?.hash) {
        Object.keys(options.hash).forEach(hash => {
          data[`_${hash}`] = options.hash[hash];
        })
      }
      return new Handlebars.SafeString(compile(data));
    }
  }
]

const utils = {
  readTpl(path) {
    const cacheTpl = viewCache[path];
    let tpl;
    if (cacheTpl) {
      tpl = cacheTpl;
    } else {
      tpl = readFileSync(join(viewPath, path));
      viewCache[path] = tpl;
    }
    return tpl;
  }
}