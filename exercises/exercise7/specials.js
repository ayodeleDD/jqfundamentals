'use strict';

class AjaxSpecialsLoad {
  constructor($specials) {
    this.$specials = $specials;
    this.init();
  }

  init() {
    this.$specials.find('li.buttons').remove();
    this.loadJson();
  }

  loadJson() {
    $.ajax({
      url: 'specials.json',
      dataType: 'json',
      success: function(data) {
        this.displayJsonData(data);
      }.bind(this),
      error: function() {
        console.log(`Error loading specials.json`);
      },
      cache: false
    });
  }

  displayJsonData(data) {
    const $div = $('<div />').addClass('target-div').appendTo(this.$specials);
    const $title = $('<h3 />');
    const $text = $('<p />');
    const $image = $('<img />');

    this.$specials.find('select').on('change', function(e) {
      const value = $(this).val();

      if (value.length) {
        $title
          .text(data[value].title)
          .css('color', data[value].color);

        $text.text(`${data[value].text}`);

        $image.attr('src', `..${data[value].image}`);

        $div.append($title, $text, $image);
      } else {
        $div.empty();
      }
    });
  }
}

$(function() {
  const $specials = $('div#specials');
  new AjaxSpecialsLoad($specials);
});
