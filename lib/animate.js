/*
 * Animatify
 *
 * Copyright (c) 2015 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
/*globals document*/
'use strict';

var animationEndEvent;
var durationStyle;
var delayStyle;
var iterationCountStyle;
var allStyle;

(function () {
  var el = document.createElement('div');
  var animations = {
    animation: [
      'animationend',
      'animationDuration',
      'animationDelay',
      'animationIterationCount',
      'animation'
    ],
    MozAnimation: [
      'animationend',
      'mozAnimationDuration',
      'mozAnimationDelay',
      'mozAnimationIterationCount',
      'mozAnimation'
    ],
    WebkitAnimation: [
      'webkitAnimationEnd',
      'webkitAnimationDuration',
      'webkitAnimationDelay',
      'webkitAnimationIterationCount',
      'webkitAnimation'
    ]
  };
  var t, a;
  for (t in animations) {
    if (animations.hasOwnProperty(t) && el.style[t] !== undefined) {
      a = animations[t];
      animationEndEvent = a[0];
      durationStyle = a[1];
      delayStyle = a[2];
      iterationCountStyle = a[3];
      allStyle = a[4];
      return;
    }
  }
}());

var classList = {
  set: function(el, cls) {
    el.className = cls.join(' ');
  },
  get: function(el) {
    return el.className
      ? el.className.replace(/\s+/g, ' ').split(' ')
      : [];
  },
  add: function (el, cls) {
    var originCls = this.get(el);
    cls.forEach(function(i){
      if(originCls.indexOf(i) === -1)
        originCls.push(i);
    });
    this.set(el, originCls);
  },
  remove: function (el, cls) {
    var originCls = this.get(el);
    var newCls = [];
    originCls.forEach(function(i){
      if(cls.indexOf(i) === -1) {
        newCls.push(i);
      }
    });
    this.set(el, newCls);
  }
};

var disabled = false;

function animate(element, animation, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else if (!opts) {
    opts = {};
  }
  if (disabled) {
    if (callback) {
      callback();
    }
    return;
  }
  if (opts.delay) {
    element.style[delayStyle] = opts.delay;
  }
  if (opts.duration) {
    element.style[durationStyle] = opts.duration;
  }
  if (opts.iterationCount) {
    element.style[iterationCountStyle] = opts.iterationCount;
  }
  classList.add(element, ['animated', animation]);
  function animationEnd() {
    element.removeEventListener(animationEndEvent, animationEnd);
    classList.remove(element, ['animated', animation]);
    if (opts.delay || opts.duration || opts.iterationCount) {
      element.style[allStyle] = '';
    }
    if (callback) {
      callback();
    }
  }
  element.addEventListener(animationEndEvent, animationEnd);
}

animate.disable = function () {
  disabled = true;
};

module.exports = animate;
module.exports.classList = classList;

