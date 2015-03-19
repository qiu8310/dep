/*
 * dep
 * https://github.com/qiu8310/dep"
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Parse shallow depends to deep depends
 *
 * @param {object[]} items - The shallow depend relation objects, the item will be polluted by deepDepends
 * @param {array} items[].depends - The shallow depends of a item, which contains values
 * @param {*} items[].value - The value of a item
 */
function dep (items) {

  if (!items || !items.length) {
    return [];
  }

  var i, len = items.length,

  // find a item by value
    find = function(value) {
      for (var i = 0; i < len; i++) {
        if (items[i].value === value) { return items[i]; }
      }
      throw new Error('No item for value ' + String(value));
    };

  function run(road) {
    var i, target, val = road.pop();
    while (typeof val !== 'undefined') {
      target = find(val);
      if (!target.deepDepends) { target.deepDepends = []; }
      for (i = 0; i < road.length; i++) {
        if (target.deepDepends.indexOf(road[i]) < 0) {
          target.deepDepends.push(road[i]);
        }
      }
      val = road.pop();
    }
  }

  function walk(item, road) {
    road = road || [];
    var i, len = item.depends.length, cloneRoad;

    if (road.indexOf(item.value) >= 0) {
      throw new Error('Cycle depend on ' + String(item.value));
    }
    road.unshift(item.value);
    if (!len) {
      run(road);
    } else {
      for (i = 0; i < len; i++) {
        cloneRoad = [].concat(road);
        walk(find(item.depends[i]), cloneRoad);
      }
    }
  }

  // walk that not walked
  for (i = 0; i < len; ++i) {
    if (!items[i].deepDepends) { walk(items[i]); }
  }

  // reorder the deepDepends values
  function sortFn(a, b) {
    return find(a).deepDepends.indexOf(b) >= 0 ? 1 : find(b).deepDepends.indexOf(a) >= 0 ? -1 : 0;
  }
  for (i = 0; i < len; ++i) {
    items[i].deepDepends = items[i].deepDepends.sort(sortFn);
  }

  return items;
}

if ( typeof module === 'object' && typeof module.exports === 'object' ) {
  module.exports = dep;
}
