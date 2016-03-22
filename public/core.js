// our angular app, keeping it to one file since it's a small app.

(function() {
    angular.module('toDoApp', ['ngRoute'])
      .controller('MainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', '$http', 'HttpHelper'];
    function mainCtrl($scope, $http, HttpHelper) {
        $scope.user = {
            name: '',
            password: '',
            loggedIn: false
        };

        $scope.logout = function() {
            $scope.user.loggedIn = false;
        };

        $scope.deleteTodo = function(index,todo) {
            console.log(todo);
            HttpHelper.remove(index).then(function(resp) {
                $scope.user.tdList = resp.data.tdList;
            }, function(err) {
                console.log(err);
            });
        };

        $scope.createTodo = function() {
            if (typeof($scope.user.formText) !== 'undefined' && $scope.user.formText !== '') {
                HttpHelper.create($scope.user.formText).then(function(resp) {
                    $scope.user.tdList = resp.data.tdList;
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
                    $scope.user.loggedIn = true;
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
            $scope.user.tdList = tdList;
        }

        function loginFail() {
            $scope.user.failedLogin = true;
        }

    }
})();