app.controller('AddCtrl', function ($scope, $state, $timeout, $ionicLoading, $cordovaGeolocation, Missions, Clients) {


        $scope.goHome = function () {
            $state.transitionTo("app.profile");
        };

        var profile = JSON.parse(window.localStorage["profile"] || "{}");

        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        $scope.ca = 0;
        $scope.client = {};
        $scope.routes = [];
        $scope.infos = JSON.parse(window.localStorage['profile'] || '{}');
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.client.lat = position.coords.latitude;
                $scope.client.lng = position.coords.longitude;
                console.log(position.coords);
            }, function (err) {
                console.log(err.message);
            });
        Missions.getVendeurRoutes(profile.id_db).then(
            function (routes) {
                angular.forEach(routes, function (route) {
                    $scope.routes.push(route.code);
                });
            },
            function (error) {
                console.log(error.message);
            });
        console.log(JSON.stringify($scope.client));
        $scope.cancel = function () {
            $state.transitionTo("app.profile");
        };
        $scope.addNewClient = function (client) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            Clients.addNewClient(client).then(
                function (success) {
                    console.log(success);
                    $ionicLoading.hide();
                    $ionicLoading.show({
                        template: typeof success.insertId === "undefined" ? "Erreur lors de l'ajout !" : "Client ajouté avec succes !"
                    });
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 1000);
                },
                function (error) {
                    $ionicLoading.hide();
                    $ionicLoading.show({
                        template: 'Erreur ...'
                    });
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 1000);
                });
        };
    })

    