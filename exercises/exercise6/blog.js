'use strict';

class RevealHiddenText {
  constructor($blog) {
    this.$blog = $blog;
    this.init();
  }

  init() {
    this.revealExcerpt(this.$blog);
  }

  revealExcerpt($blog) {
    // Clicking on a headline in the #blog div should slide down the excerpt paragraph
    // Clicking on another headline should slide down its excerpt paragraph, and slide up any other currently showing excerpt paragraphs.
    $blog.find('h3').on('click', function(e) {
      e.preventDefault();
      const $p = $(this).next();

      $p.slideToggle('slow');

      $('p.excerpt')
        .not($p)
        .slideUp();
    });
  }
}

$(function() {
  const $blog = $('#blog');
  new RevealHiddenText($blog);
});
