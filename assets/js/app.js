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
				templateUrl: 'assets/templates/music.html'
			}).when('/music/:id', {
				templateUrl: 'assets/templates/music/music.html',
				controller: 'MusicController'
			}).when('/photos', {
				templateUrl: 'assets/templates/photo.html'
			}).when('/videos', {
				templateUrl: 'assets/templates/video.html'
			}).when('/talk', {
				templateUrl: 'assets/templates/talk.html',
				controller: 'HomeController'
			}).when('/contact', {
				templateUrl: 'assets/templates/contact.html'
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

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false) {
			$(document).ready(function(){
				$.stratus({
					links: 'http://soundcloud.com/band-mongoose',
					auto_play: true,
					download: false,
					random: true
				});
			});
		}
	});

mongoose.controller('HomeController', function ($scope, $location, $routeParams, $timeout) {
	$timeout(function() {
		$.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache:true}).done(function(){
			console.log('test');
		});
	}, 500);
});

mongoose.controller('PhotoController', function ($scope) {
});

mongoose.controller('MusicController', function ($scope, $routeParams, $sce, musicInfo) {
	musicInfo.success(function (data) {
		var info = data[$routeParams.id];
		$scope.title = info.title;
		$scope.description = $sce.trustAsHtml('/assets/templates/music/description/' + $routeParams.id + '.html');
		$scope.soundcloud = $sce.trustAsResourceUrl(info.soundcloud);
	});
});