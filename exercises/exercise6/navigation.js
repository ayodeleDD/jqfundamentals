'use strict';

class DropDownNavigation {
  constructor($navList) {
    this.$navList = $navList;
    this.init();
  }

  init() {
    this.showMenu(this.$navList);
  }

  showMenu($navList) {
    // Hovering over an item in the main menu should show that item's submenu items, if any.
    // Exiting an item should hide any submenu items.
    // To accomplish this, use the $.fn.hover method to add and remove a class from the submenu items to control whether they're visible or hidden. 
    // (The file at /exercises/css/styles.css includes the "hover" class for this purpose.)
    $navList.hover(function() {
      $(this)
        .toggleClass('hover')
        .children('ul')
        .slideToggle('slow');
    });
  }
}

$(function() {
  const $navList = $('#nav li');
  new DropDownNavigation($navList);
});
