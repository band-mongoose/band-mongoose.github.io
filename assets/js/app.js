var mongoose = angular.module('mongoose', ['ngRoute']);

mongoose.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'assets/templates/home.html'
			}).
			when('/about', {
				templateUrl: 'assets/templates/about.html'
			}).
			when('/photo', {
				templateUrl: 'assets/templates/photo.html',
				controller: 'PhotoController'
			}).
			when('/discography', {
				templateUrl: 'assets/templates/discography.html'
			}).
			when('/record', {
				templateUrl: 'assets/templates/record.html'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);

//mongoose.controller('TalkController', function($scope) {
//});

mongoose.controller('PhotoController', function ($scope) {
	$("#gallery").jsFlickrGallery(
		{
			'structure': {
				'liClass': '.col-md-2'
			},
			'modal': {
				'generate': false
			}
		}
	);
});


//// global. currently active menu item
//var current_item = 0;
//
//// few settings
//var section_hide_time = 1300;
//var section_show_time = 1300;
//
//// jQuery stuff
//jQuery(document).ready(function($) {
//
//	// Switch section
//	$("a", '.mainmenu').click(function()
//	{
//		if( ! $(this).hasClass('active') ) {
//			current_item = this;
//			// close all visible divs with the class of .section
//			$('.section:visible').fadeOut( section_hide_time, function() {
//				$('a', '.mainmenu').removeClass( 'active' );
//				$(current_item).addClass( 'active' );
//				var new_section = $( $(current_item).attr('href') );
//				new_section.fadeIn( section_show_time );
//			} );
//		}
//		return false;
//	});
//});