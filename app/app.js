var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ngStorage','chart.js']);
//appModule.config(['$locationProvider', function($locationProvider) {
 // $locationProvider.hashPrefix('');
//}]);
app.config(['ChartJsProvider',function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colors : [ '#803690',  '#DCDCDC','#00ADF9', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
}]); 


app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/update', {
                title: 'Update',
                templateUrl: 'partials/update.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'LineCtrl'
            })
			.when('/races', {
				title: 'Race Dashboard',
                templateUrl: 'partials/race.html',
                controller: 'raceCtrl'
				
			}) 
			.when('/photo', {
                title: 'Photo',
                templateUrl: 'partials/photo.html',
                controller: 'photoCtrl'
            })
			.when('/lists', {
				title: 'lists',
                templateUrl: 'partials/lists.html',
                controller: 'listsCtrl'
				
			})
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }])
 /*   .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
             if (Data.auths.token.length === 0 
                 && next.$$route.originalPath !="/signup") {
             //      $location.path("/login");
                    } 
                
            });
        });
   */     
  app.filter('str2date', function() {
    return function(x) {
        if (x !== undefined ){
        var txt = x.substring(0,10)
        return txt;} else {
            return x ;
        }
    };
});
 