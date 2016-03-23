
(function() {
    angular.module('toDoApp')
      .controller('CompletedCtrl', completedCtrl);
    
    completedCtrl.$inject = ['$rootScope', '$scope', 'HttpHelper'];
    
    function completedCtrl($rootScope, $scope, HttpHelper) {
        $rootScope.loggedIn = true;
        HttpHelper.getCompleted().then(function(resp) {
            displayCompleted(resp);
        }, function(err) {
            console.log(err);
        });

        function displayCompleted(resp) {
            $rootScope.completedTodos = resp.data.completedList;
            console.log($rootScope.completedTodos);
        }
    }
})();