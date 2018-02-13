import test from 'ava';
import jscodeshift from 'jscodeshift';
import { readFileSync } from 'fs';
import 'babel-core/register';

import controllerTransform from '../transforms/controller.js';
import directiveTransform from '../transforms/directive.js';

test(t => {
  const source = readFileSync('tests/fixtures/controller.before.js').toString();
  const expected = readFileSync('tests/fixtures/controller.after.js').toString();

  const result = controllerTransform({ source }, { jscodeshift });
  t.is(result, expected);
})

test(t => {
  const source = readFileSync('tests/fixtures/directive.before.js').toString();
  const expected = readFileSync('tests/fixtures/directive.after.js').toString();

  const result = directiveTransform({ source }, { jscodeshift });
  t.is(result, expected);
})