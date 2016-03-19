// our angular app, keeping it to one file since it's a small app.

(function() {
    angular.module('toDoApp', [])
      .constant('SERVER', 'http://localhost:3000')
      .controller('MainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', '$http'];
    function mainCtrl($scope,$http) {
        $scope.user = {
            name: '',
            password: '',
            loggedIn: false
        };

        $scope.logout = function() {
          $scope.user.loggedIn = false;
        };

        $scope.login = function() {
            console.log($scope.user.name);
            console.log($scope.user.password);

            var data = {name: $scope.user.name, password: $scope.user.password};
            var config = {headers: {'Content-Type': 'application/json'}};
            $http.post('/authenticate', data, config).then(success,fail);

            function success(resp) {
                if(resp.data.success == true) {
                    $scope.user.loggedIn = true;
                    displayTodos(resp.data.tdList);
                }

                console.log(resp);

            }

            function fail(err) {
                console.log(err);
            }

        };

        function displayTodos(tdList) {
            $scope.user.tdList = tdList;
        }
    }
})();