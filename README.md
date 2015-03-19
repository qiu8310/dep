# dep 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Code Climate][climate-image]][climate-url] [![Coverage Status][coveralls-image]][coveralls-url]

Parse shallow depends to deep depends.


## Install

```bash
$ npm install --save dep.js
```


## Usage

```javascript
var dep = require('dep.js'),
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
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).


## License

Copyright (c) 2015 Zhonglei Qiu. Licensed under the MIT license.


[climate-url]: https://codeclimate.com/github/qiu8310/dep
[climate-image]: https://codeclimate.com/github/qiu8310/dep/badges/gpa.svg
[npm-url]: https://npmjs.org/package/dep
[npm-image]: https://badge.fury.io/js/dep.svg
[travis-url]: https://travis-ci.org/qiu8310/dep
[travis-image]: https://travis-ci.org/qiu8310/dep.svg?branch=master
[daviddm-url]: https://david-dm.org/qiu8310/dep.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/qiu8310/dep
[coveralls-url]: https://coveralls.io/r/qiu8310/dep
[coveralls-image]: https://coveralls.io/repos/qiu8310/dep/badge.png
