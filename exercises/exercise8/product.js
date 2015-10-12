'use strict';

class ProductDisplay {
  constructor() {
    this.init();
  }

  init() {
    this.getProductDetails();
    this.data;
    this.$brands = $('#brands');
    this.$colors = $('#colors');
    this.$available = $('#available');
    this.$brands
      .add(this.$colors)
      .add(this.$available)
      .on('click', function() {
        this.getCheckedOptions();
      }.bind(this));

    $('#all').on('click', function() {
      this.getAllProducts(this.data);
    }.bind(this));
  }

  getProductDetails() {
    $.ajax({
      url: 'product.json',
      dataType: 'json',
      success: function(data) {
        this.cachedData(data);
      }.bind(this),
      error: function() {
        console.log(`Error loading specials.json`);
      },
      cache: false
    });
  }

  cachedData(data) {
    this.data = data;
    this.getAllProducts(this.data);
  }

  getCheckedOptions() {
    const $checkedBrands = this.$brands.find('input:checked');
    const $checkedColors = this.$colors.find('input:checked');
    const availability = $('#available').is(':checked');
    let itemStatus = ''
    if(availability) {
      itemStatus = 0;
    }
    this.filterProducts($checkedBrands, $checkedColors, itemStatus);
  }

  filterProducts(brands, colors, itemStatus) {
    const $products = $('#main_content');
    const $span = $('span');
    let $brandDataValue = '';
    let $colorDataValue = '';
    let filter = [];
    $products
      .find('span:visible')
      .hide();

    if (brands.length && colors.length && itemStatus === 0) {
      brands.each(function() {
        $brandDataValue = $(this).val();
        colors.each(function() {
          $colorDataValue = $(this).val();
          $($span.filter(`[data-brand="${$brandDataValue}"]`).filter(`[data-color="${$colorDataValue}"]`).filter(`[data-soldout="${itemStatus}"]`)).show();
        });
      });
    } else if (brands.length && colors.length || brands.length && itemStatus === 0 || colors.length && itemStatus === 0) {
        brands.each(function() {
          $brandDataValue = $(this).val();
          colors.each(function() {
            $colorDataValue = $(this).val();
            $($span.filter(`[data-brand="${$brandDataValue}"]`).filter(`[data-color="${$colorDataValue}"]`)).show();
          });
        });
        brands.each(function() {
          $brandDataValue = $(this).val();
          $($span.filter(`[data-brand="${$brandDataValue}"]`).filter(`[data-soldout="${itemStatus}"]`)).show();
        });
        colors.each(function() {
          $colorDataValue = $(this).val();
          $($span.filter(`[data-color="${$colorDataValue}"]`).filter(`[data-soldout="${itemStatus}"]`)).show();
        });
      } else if (brands.length || colors.length || itemStatus === 0) {
        brands.each(function() {
          $brandDataValue = $(this).val();
          $($span.filter(`[data-brand="${$brandDataValue}"]`)).show();
        });
        colors.each(function() {
          $colorDataValue = $(this).val();
          $($span.filter(`[data-color="${$colorDataValue}"]`)).show();
        });
        $($span.filter(`[data-soldout="${itemStatus}"]`)).show();
      } else {
        this.getAllProducts(this.data);
      }
  }

  displayProducts(data) {
    const $span = $('<span />')
      .attr({
        'data-name': data.name,
        'data-color': data.color,
        'data-brand': data.brand,
        'data-soldout': data.sold_out
      })
    let $image = $('<img />').attr('src',  `images/${data.url}`);
    $span.append($image);
    $('#main_content').append($span);
  }

  getAllProducts(data) {
    $('#main_content').empty();
    $('#filter').find('input:checked').prop('checked', false);
    $.each(data, function(index, data) {
      this.displayProducts(data);
    }.bind(this));
  }
}

$(function() {
  new ProductDisplay();
});
