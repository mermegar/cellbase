/**
 * Created by jag on 06/03/2014.
 */

myApp2.factory('proteinService', function($rootScope) {
    var proteinService = {};

    proteinService.message = '';

    proteinService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    proteinService.proteinChange = function(msg) {
        this.message = msg;
        $rootScope.$broadcast('broadcastProteinChange');
    };

    proteinService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return proteinService;
});

var proteinCtrl = myApp.controller('proteinCtrl', ['$scope', '$rootScope', 'mySharedService', 'CellbaseService','proteinService', function ($scope, $rootScope, mySharedService, CellbaseService, proteinService) {

 $scope.proteinChange = function(msg){
    proteinService.proteinChange(msg);
 }

}]);

function proteinSelect($scope, proteinService) {
    $scope.handleClick = function(msg) {
        proteinService.prepForBroadcast(msg);
    };

    $scope.$on('handleBroadcast', function() {
        $scope.message = proteinService.message;
    });

    $scope.colors = [
        {name:'black', shade:'dark'},
        {name:'white', shade:'light'},
        {name:'red', shade:'dark'},
        {name:'blue', shade:'dark'},
        {name:'yellow', shade:'light'}
    ];
    $scope.color = $scope.colors[2];

    $scope.selectedOption  = function(){
        console.log($scope.color.name)
        proteinService.prepForBroadcast($scope.color.name);
    }
}

function proteinResult($scope, proteinService) {
    $scope.change = function(){
        $scope.proteinChange($scope.message);
    }

    $scope.selectedOption  = function(){
        proteinService.prepForBroadcast($scope.color.name);
    }
    $scope.$on('handleBroadcast', function() {
        $scope.message =  proteinService.message;
    });
    $scope.$on('broadcastProteinChange', function() {
        $scope.message =  proteinService.message;
    });
}

function proteinView($scope, proteinService) {

    $scope.change = function(){
        $scope.proteinChange($scope.message);
    }

    $scope.$on('handleBroadcast', function() {
        $scope.message =  proteinService.message;
    });

    $scope.$on('broadcastProteinChange', function() {
        $scope.message =  proteinService.message;
    });
}

proteinCtrl.$inject = ['$scope', 'mySharedService'];
proteinCtrl.$inject = ['$scope', 'proteinService'];
