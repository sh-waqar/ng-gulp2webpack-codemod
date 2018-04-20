import _ from 'lodash';
import { modules } from './config';
import {
  isBeforeEach,
  isModule,
  isInject,
  isLiteral,
  isFuntion,
  isFixture
} from './helpers';

export default function transformer(file, api) {
  const j = api.jscodeshift;

  let fixtureRegex = /^_fixture(\w*)$/;
  let modulesArr = [];

  function getModule(module) {
    if (!modules[module] && !isFixture(module)) {
      return ["NOT_FOUND", "NOT_FOUND"];
    }

    if (isFixture(module)) {
      let path = module.replace(/fixture/, "fixturePath");
      let moduleName = _.camelCase(module.replace(/^.*[\\\/]/, "").replace(/.json/, "Fixture"));
      return [moduleName, path];
    }

    return modules[module];
  }

  function removeFixtureInjection(functionParams) {
    return functionParams.filter(param => {
      return !fixtureRegex.test(param.name);
    });
  }

  function importStatementGenerator(moduleName, path) {
    let importSpecifier = j.importDefaultSpecifier(j.identifier(moduleName), null);
    let importStatement = j.importDeclaration([importSpecifier], j.literal(path));

    return importStatement;
  }

  let withoutIIFE = j(file.source)
    .find(j.ExpressionStatement)
    .filter((path) => path.value.expression.value !== 'use strict')
    .at(1)
    .nodes();

  j(withoutIIFE)
    .find(j.ExpressionStatement)
    .forEach(node => {
      if (isBeforeEach(node) && isInject(node)) {
        node.value.expression.arguments[0].arguments[0].params = removeFixtureInjection(node.value.expression.arguments[0].arguments[0].params);
        node.value.expression.arguments[0].callee.name = "angular.mock.inject";
      }

      if (isBeforeEach(node) && isModule(node) && isFuntion(node)) {
        node.value.expression.arguments[0].callee = 'angular.mock.module';
      }

      if (isBeforeEach(node) && isModule(node) && isLiteral(node)) {

        var module = node.value.expression.arguments[0].arguments[0].value;
        modulesArr.push(module);

        if (isFixture(module)) {
          j(node).remove()
        } else {
          node.value.expression.arguments[0] = j.identifier("angular.mock.module(" + getModule(module)[0] + ")");
        }

      }

      return node;
    })
    .nodes();

  j(withoutIIFE)
    .find(j.Identifier, n => fixtureRegex.test(n.name))
    .forEach(node => {
      node.value.name = _.camelCase(node.value.name
        .replace(/_fixture/, '')
        .replace(/_$/, 'Fixture')
      )
    })

  let importStatements = modulesArr.map(module => {
    return importStatementGenerator(getModule(module)[0], getModule(module)[1]);
  });

  let nodes = [].concat(importStatements, withoutIIFE);
  let prog = j.program(nodes);

  return j(prog).toSource({
    quote: 'single'
  });
}