'use strict';

class SlideShow {
  constructor() {
    this.init();
    this.speed = 1000;
  }

  init() {
    const $slideElements = $('#slideshow');
    this.showInitialSlide($slideElements);
    $('<div />').addClass('currentIndex').insertAfter($slideElements);
  }

  showCurrentAndTotalSlide($slideElements) {
    const $total = $slideElements.find('li').length;
    const $current = $slideElements.find('li:visible').index() + 1;
    $('div.currentIndex').html(`${$current} of ${$total}`);
  }

  showInitialSlide($slideElements) {
    const $slides = $slideElements.prependTo('body');
    const $items = $slides.find('li').hide();
    $slideElements.find('p').css({'width': '67%', 'text-align': 'justify'});
    $items.first().fadeIn(this.speed, function() {
      this.showCurrentAndTotalSlide($slideElements);
      this.doSlideShow($slideElements);
    }.bind(this)).delay(1000);
  }

  doSlideShow($slideElements) {
    const $visible = $slideElements.find('li:visible');
    let $next = $visible.next();
    (!$next.length) ? ($next = $slideElements.find('li').first()) : $next;
    $visible.fadeOut(1000, function() {
      $next.fadeIn(this.speed).delay(200);
    });
    setTimeout(function() {
      this.showCurrentAndTotalSlide($slideElements);
      this.doSlideShow($slideElements);
    }.bind(this), 300);
  }
}

$(function() {
  new SlideShow();
});
