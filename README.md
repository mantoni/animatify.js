# Animatify

[![SemVer]](http://semver.org)
[![License]](https://github.com/mantoni/animatify.js/blob/master/LICENSE)

A CommonJS utility for [Animate.css][] for use with [Browserify][].

- No dependencies.
- Use in a modern browser.


## Install

```
npm install animatify --save
```

## Usage

```js
var animate = require('animatify');

var element = document.querySelector('h1');
animate(element, 'bounceInUp', function () {
  animate(element, 'pulse');
});
```

Configure `"dependencies"` and `"scripts"` in your package.json:

```
"dependencies": {
  "animatify": "*",
  "animate.css": "*"
},
"scripts": {
  "build:css": "cp node_modules/animate.css/animate.css public/",
  "build:js": "browserify -o public/bundle.js .",
  "build": "npm run build:css && npm run build:js"
}
```

## API

- `animate(element, animation[, opts][, callback])`: Animates an element with
  the named animation and invokes the callback when done.
    - `element`: A DOM element.
    - `animation`: The name of one of the [Animate.css][] animations.
    - `opts`: An object with any of these properties (defaults apply as defined
      by animate.css):
        - `delay`: A delay, e.g. '1s'.
        - `duration`: A duration, e.g. '1.5s'.
        - `iterationCount`: The number of iterations.
    - `callback`: A function that will be invoked once the animation finished.
- `animate.disable()`: Disables animations and always invokes the callback
  immidiately. Useful for test runs or to allow disabling animations in your
  app.

## License

MIT

[SemVer]: http://img.shields.io/:semver-%E2%9C%93-brightgreen.svg
[License]: http://img.shields.io/npm/l/animatify.svg
[Animate.css]: http://daneden.github.io/animate.css/
[Browserify]: http://browserify.org
