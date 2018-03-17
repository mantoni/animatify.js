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
  element.classList.add('animated');
  element.classList.add(animation);
  function animationEnd() {
    element.removeEventListener(animationEndEvent, animationEnd);
    element.classList.remove('animated');
    element.classList.remove(animation);
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

