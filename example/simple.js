/*
 * dep
 * https://github.com/qiu8310/dep"
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */

'use strict';

var dep = require('../'),
  assert = require('assert');


var items = [
  {value: 'a', depends: ['b', 'c']},
  {value: 'b', depends: ['c']},
  {value: 'c', depends: ['d']},
  {value: 'd', depends: []}
];

assert.deepEqual(
  dep(items),
  [
    {value: 'a', depends: ['b', 'c'], deepDepends: ['d', 'c', 'b']},
    {value: 'b', depends: ['c'], deepDepends: ['d', 'c']},
    {value: 'c', depends: ['d'], deepDepends: ['d']},
    {value: 'd', depends: [], deepDepends: []}
  ]
);


