'use strict';

class TabbedNavigation {
  constructor() {
    this.init();
  }

  init() {
    const $moduleDivs = $('.module');
    // Hide all of the modules.
    $moduleDivs.hide();

    // Create an unordered list element before the first module.
    const $unorderedItem = $('<ul/>').insertBefore($moduleDivs.first());

    this.appendListItem($moduleDivs, $unorderedItem);
    this.bindEventToList($moduleDivs, $unorderedItem);
  }

  appendListItem($moduleDivs, $unorderedItem) {
    // Iterate over the modules using $.fn.each. 
    // For each module, use the text of the h2 element as the text for a list item that you add to the unordered list element.
    $moduleDivs.each(function() {
      const $h2 = $(this).children('h2').html();
      const $listItem = $('<li/>').html($h2);
      $listItem.appendTo($unorderedItem);
    });
  }

  bindEventToList($moduleDivs, $unorderedItem) {
    // Bind a click event to the list item that:
      // 1. Shows the related module, and hides any other modules
      // 2. Adds a class of "current" to the clicked list item
      // 3. Removes the class "current" from the other list item
    const $listItems = $unorderedItem.children();

    $listItems.on('click', function() {
      const $index = $listItems.index(this);
      $(this).addClass('current')
      .siblings('li')
      .removeClass('current');

      $moduleDivs.eq($index)
        .show('slow')
        .siblings('.module')
        .hide('slow');
    });

    // Finally, show the first tab.
    $listItems.eq(0)
      .addClass('current');

    $moduleDivs.eq(0)
      .show();
  }
}

$(function() {
  new TabbedNavigation();
});
