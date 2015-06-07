/*
 * Animatify
 *
 * Copyright (c) 2015 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
/*global document*/
'use strict';

var animate = require('../lib/animate');

var h1 = document.querySelector('h1');
animate(h1, 'bounceInUp', function () {
  animate(h1, 'rubberBand', {
    delay: '1s'
  }, function () {
    animate(h1, 'pulse', {
      iterationCount: 2
    }, function () {
      animate(h1, 'hinge', function () {
        h1.style.display = 'none';
      });
    });
  });
});
