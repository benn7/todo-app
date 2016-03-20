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

        $scope.deleteTodo = function(index) {
            $http.delete('/remove/'+index).then(function(resp) {
                $scope.user.tdList = resp.data.tdList;

            },
            function(err) {
                console.log(err);
            })
        };

        $scope.createTodo = function() {
            if(typeof($scope.user.formText) !== 'undefined' && $scope.user.formText !== '') {
                console.log($scope.user.formText);
                $http.post('/add',{todoTxt: $scope.user.formText}).then(function(resp) {
                    $scope.user.tdList = resp.data.tdList;
                }, function(err) {
                    console.log(err);
                });
            }
        };
        
        $scope.login = function() {

            var data = {name: $scope.user.name, password: $scope.user.password};
            var config = {headers: {'Content-Type': 'application/json'}};
            $http.post('/authenticate', data, config).then(success,fail);

            function success(resp) {
                if(resp.data.success == true) {
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