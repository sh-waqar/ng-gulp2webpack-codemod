import j from 'jscodeshift';
import { alias } from './config';

export function isConstant(path) {
  return path.value.arguments[1].type === 'ArrayExpression' ||
    path.value.arguments[1].type === 'ObjectExpression'
}

export function isBeforeEach(node) {
  return node.value.expression.type === "CallExpression" &&
    node.value.expression.callee.name === "beforeEach";
}

export function isModule(node) {
  if (!node.value.expression.arguments) {
    return false;
  }
  if (!node.value.expression.arguments[0].callee) {
    return false;
  }

  return node.value.expression.arguments[0].callee.name === "module";
}

export function isInject(node) {
  if (!node.value.expression.arguments) {
    return false;
  }
  if (!node.value.expression.arguments[0].callee) {
    return false;
  }

  return node.value.expression.arguments[0].callee.name === "inject";
}

export function isLiteral(node) {
  if (!node.value.expression.arguments) {
    return false;
  }

  return node.value.expression.arguments[0].arguments[0].type === "Literal";
}

export function isFuntion(node) {
  if (!node.value.expression.arguments) {
    return false;
  }
  if (!node.value.expression.arguments[0].callee) {
    return false;
  }

  return node.value.expression.arguments[0].arguments[0].type === "FunctionExpression";
}

export function isFixture(module) {
  return module ? module.indexOf("fixture") > -1 : false;
}

export function removeNgInject(path) {
  let commentBody = path.node.comments[0].value.toString().replace(/@ngInject/, '');
  return j.block(commentBody);
}

function _tplToRequire(url) {
  var fileName = url.replace(/^.*[\\\/]/, './');
  return j.callExpression(j.identifier('require'), [j.literal(fileName)]);
}

function _tplToRequireRoute(url) {
  var fileName = url.replace(/^app\/([a-z-]+)*/, '.');
  return j.callExpression(j.identifier('require'), [j.literal(fileName)]);
}

export function templateUrlToTemplate(path) {
  if (path.value.key.name !== 'templateUrl') {
    return;
  }

  let templateUrl = path.value.value.value;

  if (templateUrl) {
    path.value.key.name = 'template'
    path.value.value = _tplToRequire(templateUrl);
  }
}

export function modalTplToRequire(path) {
  if (path.key.name !== 'tpl') {
    return;
  }

  let templateUrl = path.value.value;

  if (templateUrl) {
    path.value = _tplToRequire(templateUrl);
  }
}

export function exportStatement(modules) {
  var specifiers = modules.map((mod) => {
    return j.exportSpecifier(j.identifier(mod), j.identifier(mod));
  })
  return j.exportNamedDeclaration(null, specifiers)
}

export function routeTemplateUrlToTemplate(path) {
  if (path.value.key.name !== 'templateUrl') {
    return;
  }

  let templateUrl = path.value.value.value;

  if (templateUrl) {
    path.value.key.name = 'template'
    path.value.value = _tplToRequireRoute(templateUrl);
  }
}