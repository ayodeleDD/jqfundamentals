'use strict';

class AjaxLoadHtml {
  constructor($blog) {
    this.$blog = $blog;
    this.init();
  }

  init() {
    const $h3 = this.$blog.find('h3');
    this.loadContent($h3);
  }

  loadContent($h3) {
    $h3
    .each(function() {
      const $div = $('<div />');
      $(this).data('ajax-content', $div);
    });

    $h3.on('click', function(e) {
      e.preventDefault();
      const href = $(this)
        .find('a')
        .attr('href')
        .split('#')[1];

      $(this)
        .after($(this)
        .data('ajax-content')
        .load(`../data/blog.html div#${href}`));
    });
  }
}

$(function() {
  const $blog = $('div#blog');
  new AjaxLoadHtml($blog);
});
