var mongoose = angular.module('mongoose', [ 'ngRoute' ]);
mongoose
.config(
		['$routeProvider', '$locationProvider',
				function($routeProvider, $locationProvider) {
					$locationProvider.html5Mode(false).hashPrefix('!');
					$routeProvider.when('/home', {
						templateUrl : 'assets/templates/home.html',
						controller : 'HomeController'
					}).when('/home/:id', {
						templateUrl : 'assets/templates/home.html',
						controller : 'HomeController'
					}).when('/music', {
						templateUrl : 'assets/templates/music.html'
					}).when('/photos', {
						templateUrl : 'assets/templates/photo.html',
						controller : 'PhotoController'
					}).when('/videos', {
						templateUrl : 'assets/templates/video.html'
					}).when('/fans', {
						templateUrl : 'assets/templates/fans.html',
						controller : 'FansController'
					}).otherwise({
						redirectTo : '/home'
					});
				} ]).run(function($location) {
	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		if($(".navbar").offset().top > 50){
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		}else{
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});
});

mongoose.controller('HomeController',
		function($scope, $location, $routeParams) {
			var id = '#' + (angular.isUndefined($routeParams.id) ? 'page-top'
					: $routeParams.id);
			$('html, body').stop().animate({
				scrollTop : $(id).offset().top
			}, 1500, 'easeInOutExpo');
		});

mongoose.controller('PhotoController', function($scope) {
});

mongoose.controller('FansController', function($scope) {
});
//Google Map Skin - Get more at http://snazzymaps.com/
//var myOptions = {
//	zoom : 15,
//	center : new google.maps.LatLng(53.385873, -1.471471),
//	mapTypeId : google.maps.MapTypeId.ROADMAP,
//	disableDefaultUI : true,
//	styles : [ {
//		"featureType" : "water",
//		"elementType" : "geometry",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 17
//		} ]
//	}, {
//		"featureType" : "landscape",
//		"elementType" : "geometry",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 20
//		} ]
//	}, {
//		"featureType" : "road.highway",
//		"elementType" : "geometry.fill",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 17
//		} ]
//	}, {
//		"featureType" : "road.highway",
//		"elementType" : "geometry.stroke",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 29
//		}, {
//			"weight" : 0.2
//		} ]
//	}, {
//		"featureType" : "road.arterial",
//		"elementType" : "geometry",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 18
//		} ]
//	}, {
//		"featureType" : "road.local",
//		"elementType" : "geometry",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 16
//		} ]
//	}, {
//		"featureType" : "poi",
//		"elementType" : "geometry",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 21
//		} ]
//	}, {
//		"elementType" : "labels.text.stroke",
//		"stylers" : [ {
//			"visibility" : "on"
//		}, {
//			"color" : "#000000"
//		}, {
//			"lightness" : 16
//		} ]
//	}, {
//		"elementType" : "labels.text.fill",
//		"stylers" : [ {
//			"saturation" : 36
//		}, {
//			"color" : "#000000"
//		}, {
//			"lightness" : 40
//		} ]
//	}, {
//		"elementType" : "labels.icon",
//		"stylers" : [ {
//			"visibility" : "off"
//		} ]
//	}, {
//		"featureType" : "transit",
//		"elementType" : "geometry",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 19
//		} ]
//	}, {
//		"featureType" : "administrative",
//		"elementType" : "geometry.fill",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 20
//		} ]
//	}, {
//		"featureType" : "administrative",
//		"elementType" : "geometry.stroke",
//		"stylers" : [ {
//			"color" : "#000000"
//		}, {
//			"lightness" : 17
//		}, {
//			"weight" : 1.2
//		} ]
//	} ]
//};

//var map = new google.maps.Map(document.getElementById('map'), myOptions);

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