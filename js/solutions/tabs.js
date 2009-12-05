$(document).ready(function() {
	var $modules = $('div.module').hide();
	
	var $nav = $('<ul/>')
		.addClass('tabs')
		.insertBefore($modules.eq(0));
		
	$modules.each(function() {
		var $module = $(this);
		var $title = $module.find('h2').remove();

		var $tab = $('<li>' + $title.text() + '</li>')
			.appendTo($nav);

		$tab.click(function() {
			$tab.addClass('current');
			$module.show().siblings('.module').hide();
		});
	});
	
	$modules.eq(0).show();
});