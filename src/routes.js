angular.module('app', ['ui.router']);
angular.module('app').config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', 
    {
        url:'/home',
		controller: 'HomeController',
		templateUrl: 'templates/home-template.html'
    });
});