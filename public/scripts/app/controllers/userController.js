define("controllers/userController", [], function(){

	var UserController = function ($scope, $http, InfoService) {

        $scope.users = [];

        $scope.getUsers = function()
        {
            var thing = {thing: $scope.thing};

            $http({ method: 'GET', url: '/api/users'})
            .success(function(data, status, headers, config) {
                $scope.users = data;
            })
            .error(function(data, status, headers, config) {                    
                InfoService.error(data);  
            });
        }

        $scope.deleteUser = function(index){
            
            if (index >= $scope.users.length)
                return;

            var id = $scope.users[index]._id;                
            $http({method: 'DELETE', url: '/api/user/' + id})
            .success(function(data, status, headers, config) {
                $scope.getUsers();
            })
            .error(function(data, status, headers, config) {
                InfoService.error(data);                  
            });
        }

        $scope.getUsers(); 

    };

    UserController.$inject = ['$scope', '$http', 'InfoService'];

	return UserController;
});