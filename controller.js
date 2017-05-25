var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/login', {
		templateUrl: 'login.html'
	})
	.when('/', {
		resolve:{
			"chek": function($location, $rootScope){
				if(!$rootScope.login){
					$location.path('/login');
				}
			}
		},
		templateUrl: 'chat.html'
	})
	.otherwise({
		redirectTo: "/login"
	});
});

var user = {};

app.controller('logCtrl', function($scope, $location, $rootScope){
	$scope.submit = function(){
		if($scope.password == "1111"){
			user.name = $scope.username;
			$rootScope.login = true;
			$location.path("/");
		}else{
			alert("access denied");
		}
	}
});

app.controller('ChatController', function($interval){
	this.messages = [];
	this.sendAs = user.name;
	this.sendMessage = function(message){
		var messageData = {
			from: this.sendAs,
			time: new Date().getHours() + ":" + new Date().getMinutes(),
			text: message
		};
		this.messages.push( messageData );
	};

	var startRobot = $interval(() => {
		this.messages.push({
			from: robot.name,
			time: new Date().getHours() + ":" + new Date().getMinutes(),
			text: robot.text[Math.floor(Math.random()*robot.text.length)]
		});
	},5000);

	var robot = {
		name: "dareDavil",
		text: [
		"hi there",
		" ahahaha. ok ok =)",
		"you still here?"]
	};

});


