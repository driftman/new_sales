app.controller('ClientsCtrl', function ($scope, $stateParams, $state, $timeout, $cordovaGeolocation, Routes, Clients, ionicMaterialInk, ionicMaterialMotion, ca, $filter) {
        $scope.ca = ca.ca;
        $scope.infos = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");

        // Set Header
        $scope.$parent.clearFabs();
        $timeout(function () {
            $scope.$parent.showHeader();
        }, 500);
        $scope.$parent.setHeaderFab('left');
        // Set Motion
        ionicMaterialMotion.fadeSlideInRight();
        var infos = JSON.parse(window.localStorage['profile'] || "{}");
        $scope.infos = infos;
        // Set Ink
        $scope.clients = [];
        $scope.routes = [];
        $scope.$parent.clearFabs();
        $scope.sync = function () {
            Clients.syncClients(1);
        };
        Clients.getAllVendeurRoutes(infos.id_db).then(
            function (routes) {
                angular.forEach(routes, function (route) {
                    $scope.routes.push(route.code);
                });
            },
            function (error) {

            });


        Clients.getAllClients(infos.id_db).then(
            function (clients) {
                console.log(JSON.stringify(clients));

                angular.forEach(clients, function (client) {
                    $scope.clients.push(client);
                });
            },
            function (error) {
                console.log(JSON.stringify(error));
            });
        $scope.goClient = function (_id) {
            $state.transitionTo('app.client', {id: _id});
        };


    })
    