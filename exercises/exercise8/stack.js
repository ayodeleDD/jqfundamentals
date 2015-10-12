'use strict';

class StackedDiv {
  constructor(addButton) {
    this.$addButton = addButton;
    this.$mainContainer = $('#main_content');
    this.counter = 1;
    this.init();
    this.highlightAndDelete();
  }

  init() {
    this.$addButton.on('click', function() {
      this.addStackedDiv();
    }.bind(this));
  }

  addStackedDiv() {
    const $div = $('<div/>');
    const $p = $('<p/>').html(this.counter++);
    this.$mainContainer.append($div.append($p));
  }

  highlightAndDelete() {
    const self = this;
    this.$mainContainer.on('click', 'div', function() {
      if($(this).is(':last-child')) {
        $(this).remove();
        --self.counter;
      } else {
        $(this).toggleClass('highlight');
      }
    });
  }
}

$(function () {
  const $addButton = $('#addButton');
  new StackedDiv($addButton);
});
