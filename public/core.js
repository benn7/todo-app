// our angular app, keeping it to one file since it's a small app.

(function() {
    angular.module('toDoApp', ['ngRoute'])
      .controller('MainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', '$http', 'HttpHelper','$rootScope'];
    function mainCtrl($scope, $http, HttpHelper, $rootScope) {
        $scope.user = {
            name: '',
            password: ''
        };
        

        $scope.logout = function() {
            $rootScope.loggedIn = false;
        };

        $scope.deleteTodo = function(index,todo) {
            console.log(todo);
            HttpHelper.remove(index).then(function(resp) {
                $rootScope.tdList = resp.data.tdList;
            }, function(err) {
                console.log(err);
            });
        };

        $scope.createTodo = function() {
            if (typeof($scope.user.formText) !== 'undefined' && $scope.user.formText !== '') {
                HttpHelper.create($scope.user.formText).then(function(resp) {
                    console.log(resp.data);
                    $rootScope.tdList = resp.data.tdList;
                }, function(err) {
                    console.log(err);
                });
            }
            $scope.user.formText = '';
        };

        $scope.login = function() {

            var data = {name: $scope.user.name, password: $scope.user.password};
            var config = {headers: {'Content-Type': 'application/json'}};
            $http.post('/authenticate', data, config).then(success, fail);

            function success(resp) {
                if (resp.data.success == true) {
                    $scope.user.failedLogin = false;
                    $rootScope.loggedIn = true;
                    displayTodos(resp.data.tdList);
                }
                else {
                    loginFail();
                }

            }

            function fail(err) {
                console.log(err);
            }

        };

        function displayTodos(tdList) {
            $rootScope.tdList = tdList;
        }

        function loginFail() {
            $scope.user.failedLogin = true;
        }

    }
})();