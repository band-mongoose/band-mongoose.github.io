var mongoose = angular.module('mongoose', ['ngRoute', 'twitter.timeline']);
mongoose
	.factory('musicInfo', function ($http) {
		return $http.get('/assets/json/music.json');
	})
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
			}).when('/videos', {
				templateUrl: 'assets/templates/video.html',
				controller: 'VideoController'
			}).when('/talk', {
				templateUrl: 'assets/templates/talk.html',
				controller: 'TalkController'
			}).when('/contact', {
				templateUrl: 'assets/templates/contact.html'
			}).when('/former', {
				templateUrl: 'assets/templates/former.html'
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

mongoose.controller('VideoController', function ($scope) {
	$('#container').ytv({
		user: 'woU_LoYT63nwgRg3z2fS7Q',
		accent: '#008D54',
		browsePlaylists: true,
		controls: true,
		autoplay: false
	});
});

mongoose.controller('MusicController', function ($scope) {
	$(function () {
		var $container = $('#container');
		$container.imagesLoaded(function () {
			$container.masonry({
				itemSelector: '.item',
				isFitWidth: true,
				isAnimated: !Modernizr.csstransitions
			});
		});
	});
});

mongoose.controller('MusicDetailController', function ($scope, $routeParams, $sce, musicInfo) {
	musicInfo.success(function (data) {
		var info = data[$routeParams.id];
		$scope.title = info.title;
		$scope.description = $sce.trustAsHtml('/assets/templates/music/description/' + $routeParams.id + '.html');
		$scope.soundcloud = $sce.trustAsResourceUrl(info.soundcloud);
	});
});