import {
  removeNgInject,
  routeTemplateUrlToTemplate
} from './helpers'

export default function controller(file, api) {
  const j = api.jscodeshift;

  let definedFunctions = j(file.source)
    .find(j.FunctionDeclaration)
    .forEach(path => {
    	path.value.body.directives = [j.literal('ngInject')];

      if (path.node.comments) {
        path.node.comments[0] = removeNgInject(path);
      }

      j(path)
        .find(j.ObjectExpression)
        .filter(node => {
          return node.name === 1;
        })
        .find(j.Property)
        .forEach(routeTemplateUrlToTemplate)
    })
    .nodes();

  return j(j.exportDefaultDeclaration(definedFunctions[0])).toSource({
    quote: 'single'
  });
}