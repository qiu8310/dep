'use strict';


/*
  ASSERT:
    ok(value, [message]) - Tests if value is a true value.
    equal(actual, expected, [message]) - Tests shallow, coercive equality with the equal comparison operator ( == ).
    notEqual(actual, expected, [message]) - Tests shallow, coercive non-equality with the not equal comparison operator ( != ).
    deepEqual(actual, expected, [message]) - Tests for deep equality.
    notDeepEqual(actual, expected, [message]) - Tests for any deep inequality.
    strictEqual(actual, expected, [message]) - Tests strict equality, as determined by the strict equality operator ( === )
    notStrictEqual(actual, expected, [message]) - Tests strict non-equality, as determined by the strict not equal operator ( !== )
    throws(block, [error], [message]) - Expects block to throw an error.
    doesNotThrow(block, [error], [message]) - Expects block not to throw an error.
    ifError(value) - Tests if value is not a false value, throws if it is a true value. Useful when testing the first argument, error in callbacks.

  SHOULD.JS:
    http://shouldjs.github.io/
*/

var dep = require('../');
var should = require('should');

describe('dep', function () {

  it('should return empty array when input is illegal', function () {
    should.deepEqual(dep(), []);
    should.deepEqual(dep({}), []);
    should.deepEqual(dep([]), []);
  });

  it('should work on string value', function() {
    should.deepEqual(
      dep([
        {value: 'a', depends: ['b']},
        {value: 'b', depends: ['c']},
        {value: 'c', depends: ['d']},
        {value: 'd', depends: []}
      ]),
      [
        {value: 'a', depends: ['b'], deepDepends: ['d', 'c', 'b']},
        {value: 'b', depends: ['c'], deepDepends: ['d', 'c']},
        {value: 'c', depends: ['d'], deepDepends: ['d']},
        {value: 'd', depends: [], deepDepends: []}
      ]
    );
  });

  it('should work on object value', function() {
    var a = {a: 'a'}, b = {b: 'b'}, c = {c: 'c'}, d = {d: 'd'};

    var items = [
      {value: a, depends: [b, c]},
      {value: b, depends: [d, c]},
      {value: c, depends: []},
      {value: d, depends: [c]}
    ];
    dep(items);
    should.deepEqual(items[0].deepDepends, [c, d, b]);
    should.deepEqual(items[1].deepDepends, [c, d]);
    should.deepEqual(items[2].deepDepends, []);
    should.deepEqual(items[3].deepDepends, [c]);
  });

  it('should work on complex mix value', function() {
    var a = [], b = {}, c = 0, d = false, e = 'e';
    var items = [
      {value: a, depends: [b, c, d]},
      {value: b, depends: []},
      {value: c, depends: [b, d]},
      {value: d, depends: [b]},
      {value: e, depends: [c]}
    ];
    dep(items);
    should.deepEqual(items[0].deepDepends, [b, d, c]);
    should.deepEqual(items[1].deepDepends, []);
    should.deepEqual(items[2].deepDepends, [b, d]);
    should.deepEqual(items[3].deepDepends, [b]);
    should.deepEqual(items[4].deepDepends, [b, d, c]);
  });

  it('should order by depends when there is no relations between depends', function() {
    var items = [
      {value: 1, depends: [2, 3, 4]},
      {value: 2, depends: []},
      {value: 3, depends: []},
      {value: 4, depends: []}
    ];
    dep(items);
    should.deepEqual(items[0].deepDepends, [2, 3, 4]);
  });

  it('should throw when there is a cycle depends', function() {
    (function() {
      dep([
        {value: 1, depends: [2]},
        {value: 2, depends: [3, 4]},
        {value: 3, depends: [4]},
        {value: 4, depends: [1]}
      ]);
    }).should.throw();
  });

  it('should throw when can not find a value the require on depends', function() {
    (function() {
      dep([
        {value: 1, depends: [2]},
        {value: 3, depends: [4]}
      ]);
    }).should.throw();
  });


  it('should make example work', function() {
    require('../example/simple');
  });

});
