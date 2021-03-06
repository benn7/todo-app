// handles client SPA routing

(function() {
    angular.module('toDoApp')
      .config(function($routeProvider) {
          $routeProvider.when('/completed', {
              templateUrl: 'completed.html',
              controller: 'CompletedCtrl'
          })
            .when('/', {
                templateUrl: 'welcome.html',
                controller: 'MainCtrl'
            })
            .otherwise({ redirectTo: '/'})
      });
})();