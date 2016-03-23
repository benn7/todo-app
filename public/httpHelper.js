// a service to add, create, and delete todos

(function() {
    angular.module('toDoApp')
      .factory('HttpHelper', httpHelper);

    httpHelper.$inject = ['$http'];

    function httpHelper($http) {
        return {
            remove: remove,
            create: create,
            getCompleted: getCompleted
        };

        function getCompleted() {
            return $http.get('/completed');
        }
        
        function remove(index) {
            return $http.delete('/remove/' + index);
        }

        function create(text) {
            return $http.post('/add', {todoTxt: text});
        }
    }
})();