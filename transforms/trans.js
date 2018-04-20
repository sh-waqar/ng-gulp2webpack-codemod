import _ from 'lodash';
import {
  isConstant,
  removeNgInject,
  templateUrlToTemplate,
  exportStatement
} from './helpers';

export default function controller(file, api) {
  const j = api.jscodeshift;
  let modules = {};
  let modFuntions = [];
  let functions = [];

  function handleDirective(path) {
    j(path)
      .find(j.Property)
      .forEach(templateUrlToTemplate);
  }

  // extract modules
  j(file.source)
    .find(j.ExpressionStatement)
    .filter((path) => path.value.expression.value !== 'use strict')
    .at(1)
    .find(j.CallExpression, (path) => path.callee.type === 'MemberExpression')
    .forEach(path => {
      if (path.value.callee.property.name === 'module' || path.value.callee.object.type !== 'CallExpression') return;

      modules[
        path.value.arguments[0].value
      ] = path.value.callee.property.name;

      modFuntions.push(path.value.arguments[0].value);

      if (isConstant(path)) {
        let name = path.value.arguments[0].value;
        let dec = j.variableDeclarator(j.identifier(name), path.value.arguments[1]);
        functions = functions.concat(j.variableDeclaration('let', [dec]))
      }

      if (path.value.arguments[1].type === 'FunctionExpression') {
        path.value.arguments[1].type = 'FunctionDeclaration';
        path.value.arguments[1].id = j.identifier(path.value.arguments[0].value);
        path.value.arguments[1].body.directives = [j.literal('ngInject')];
        functions = functions.concat(path.value.arguments[1])
      }
    });

  let definedFunctions = j(file.source)
    .find(j.FunctionDeclaration)
    .filter((func) => {
      return modFuntions.indexOf(func.value.id.name) > -1;
    })
    .forEach(path => {
      path.value.body.directives = [j.literal('ngInject')];

      if (path.node.comments) {
        path.node.comments[0] = removeNgInject(path);
      }

      if (modules[path.value.id.name] === 'directive') {
        handleDirective(path);
      }
    })
    .nodes();

  functions = functions.concat(definedFunctions);

  let program = j.program([
    ...functions,
    // exportStatement(modFuntions)
  ]).get('body').insertAfter(exportStatement(modFuntions))

  return j(functions).toSource({
    quote: 'single'
  });
}