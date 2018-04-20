import test from 'ava';
import jscodeshift from 'jscodeshift';
import { readFileSync } from 'fs';
import 'babel-core/register';

import transformer from '../transforms/trans.js';
import routeTransform from '../transforms/route.js';
import specTransform from '../transforms/spec.js';

test(t => {
  const source = readFileSync('tests/fixtures/controller.before.js').toString();
  const expected = readFileSync('tests/fixtures/controller.after.js').toString();

  const result = transformer({ source }, { jscodeshift });
  t.is(result, expected);
})
//
// test(t => {
//   const source = readFileSync('tests/fixtures/controller-without-strict.before.js').toString();
//   const expected = readFileSync('tests/fixtures/controller.after.js').toString();
//
//   const result = transformer({ source }, { jscodeshift });
//   t.is(result, expected);
// })
//
// test(t => {
//   const source = readFileSync('tests/fixtures/directive.before.js').toString();
//   const expected = readFileSync('tests/fixtures/directive.after.js').toString();
//
//   const result = transformer({ source }, { jscodeshift });
//   t.is(result, expected);
// })
//
// test(t => {
//   const source = readFileSync('tests/fixtures/constant.before.js').toString();
//   const expected = readFileSync('tests/fixtures/constant.after.js').toString();
//
//   const result = transformer({ source }, { jscodeshift });
//   t.is(result, expected);
// })
//
// test(t => {
//   const source = readFileSync('tests/fixtures/routes.before.js').toString();
//   const expected = readFileSync('tests/fixtures/routes.after.js').toString();
//
//   const result = routeTransform({ source }, { jscodeshift });
//   t.is(result, expected);
// })
//
// test(t => {
//   const source = readFileSync('tests/fixtures/tests.before.js').toString();
//   const expected = readFileSync('tests/fixtures/tests.after.js').toString();
//
//   const result = specTransform({ source }, { jscodeshift });
//   t.is(result, expected);
// })
//
// test(t => {
//   const source = readFileSync('tests/fixtures/tests-without-strict.before.js').toString();
//   const expected = readFileSync('tests/fixtures/tests.after.js').toString();
//
//   const result = specTransform({ source }, { jscodeshift });
//   t.is(result, expected);
// })