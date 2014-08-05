var mongoose = angular.module('mongoose', ['ngRoute', 'twitter.timeline']);
mongoose
	.config(
	['$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {
			$locationProvider.html5Mode(false).hashPrefix('!');
			$routeProvider.when('/home', {
				templateUrl: 'assets/templates/home.html',
				controller: 'HomeController'
			}).when('/home/:id', {
				templateUrl: 'assets/templates/home.html',
				controller: 'HomeController'
			}).when('/music', {
				templateUrl: 'assets/templates/music.html',
				controller: 'MusicController'
			}).when('/music/:id', {
				templateUrl: 'assets/templates/music/detail.html',
				controller: 'MusicDetailController'
			}).when('/photos', {
				templateUrl: 'assets/templates/photo.html'
			}).when('/video', {
				templateUrl: 'assets/templates/video.html',
				controller: 'VideoController'
			}).when('/video/:playlistId', {
				templateUrl: 'assets/templates/video/playlist.html',
				controller: 'VideoListController'
			}).when('/talk', {
				templateUrl: 'assets/templates/talk.html',
				controller: 'TalkController'
			}).when('/contact', {
				templateUrl: 'assets/templates/contact.html'
			}).when('/former', {
				templateUrl: 'assets/templates/former.html'
			}).when('/ticket', {
				templateUrl: 'assets/templates/ticket.html'
			}).otherwise({
				redirectTo: '/home'
			});
		} ]).run(function ($location) {
		//jQuery to collapse the navbar on scroll

		$(window).scroll(function () {
			if ($(".navbar").offset().top > 50) {
				$(".navbar-fixed-top").addClass("top-nav-collapse");
			} else {
				$(".navbar-fixed-top").removeClass("top-nav-collapse");
			}
		});
		$('.navbar a').click(function () {
			var $collapse = $('.collapse');
			if ($collapse.hasClass('in')) {
				$collapse.collapse('hide')
			}
			;
		});

		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

		ga('create', 'UA-52791836-1', 'auto');
		ga('send', 'pageview');

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false) {
			$(document).ready(function () {
				$.stratus({
					links: 'http://soundcloud.com/band-mongoose',
					auto_play: true,
					download: false,
					random: true
				});
			});
		}

		$.lazyLoadXT.autoInit = false;
	});

mongoose.controller('HomeController', function ($scope, $location, $routeParams, $timeout) {
	$('#news-widget').on('lazyshow', function (event) {
		$timeout(function () {
			$.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache: true});
		}, 500);
	}).lazyLoadXT();
});

mongoose.controller('TalkController', function ($scope, $location, $routeParams, $timeout) {
	$('.spin').append(
		new Spinner({
		lines: 12,
		length: 2,
		width: 2,
		radius: 7,
		color: '#fff'
	}).spin().el);
	$timeout(function () {
		$.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache: true});
	}, 500);
});

mongoose.controller('PhotoController', function ($scope) {
});

mongoose.controller('VideoController', function ($scope, $http) {
});

mongoose.controller('VideoListController', function ($scope, $http, $routeParams) {
	$scope.init = function() {


		$('#links a').on('click', function (event) {
			event.preventDefault();
			blueimp.Gallery($('#links a'), $('#blueimp-gallery').data());
		});

		$('#blueimp-gallery').data('useBootstrapModal', false);


		var id = $routeParams.playlistId;
		$http.get('http://gdata.youtube.com/feeds/api/playlists/' + id + '?v=2&alt=json&format=5').success(function (data) {
			console.log(data);
			$scope.playlists = data.feed.entry;
		});
	}
	$scope.init();
});

mongoose.controller('MusicController', function ($scope) {
	$(function () {
		var $container = $('#container');
		$container.imagesLoaded(function () {
			$container.masonry({
				itemSelector: '.music-item',
				isFitWidth: true,
				isAnimated: !Modernizr.csstransitions
			});
		});
	});
});

mongoose.controller('MusicDetailController', function ($scope, $routeParams, $sce, $http) {
	$http.get('/assets/json/music.json').success(function (data) {
		var info = data[$routeParams.id];
		$scope.title = info.title;
		$scope.description = $sce.trustAsHtml('/assets/templates/music/description/' + $routeParams.id + '.html');
		$scope.soundcloud = $sce.trustAsResourceUrl(info.soundcloud);
	});
});