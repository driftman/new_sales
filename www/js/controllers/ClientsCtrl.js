app.controller('ClientsCtrl', function ($scope, $stateParams, $state, $timeout, $cordovaGeolocation, Routes, Clients, ionicMaterialInk, ionicMaterialMotion, ca, $filter) {
        

       
        // Activate ink for controller
        ionicMaterialInk.displayEffect();





        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        var activite = profile.activite || 0;
        var parametrage = profile.parametrage || {};
        var company = parametrage.company || {};
        var tenant_id = company.id || 0;
        var vendeur_id = profile.id_db || 0;


        $scope.infos = profile;

        

        // Set Motion
        ionicMaterialMotion.fadeSlideInRight();
       
        // Set Ink
        $scope.clients = [];
        $scope.routes = [];
        $scope.$parent.clearFabs();
        $scope.sync = function () {
            Clients.syncClients(1);
        };
        Clients.getAllVendeurRoutes(vendeur_id, tenant_id, activite).then(
            function (routes) {
                angular.forEach(routes, function (route) {
                    $scope.routes.push(route.code);
                });
            },
            function (error) {

            });


        Clients.getAllClients(vendeur_id, tenant_id, activite).then(
            function (clients) {

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
    