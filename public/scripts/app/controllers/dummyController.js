define("controllers/dummyController", [], function(){

	var NavController = function($scope) {

            $scope.dummy = function()
            {
                console.log("this is dummy method");
            }
        }

	return NavController;
});