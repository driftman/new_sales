app.controller('EntryCtrlLivreur', function ($scope, Livreur, $ionicPopup, SynchronisationV2, Parametrage, $ionicLoading, $http, $timeout, Articles, Marques, Missions) {

        $scope.profile = JSON.parse(window.localStorage['profile'] || "{}");

        var serverConfiguration = Parametrage.server();

        // DONT KNOW WHY BUT SHOULD BE REMOVED
        var infos = JSON.parse(window.localStorage['profile'] || "{}");

        $scope.synchronization = function () {
            $ionicLoading.show({
                template: "Synchronisation en cours <br> " + serverConfiguration.name + ": " + serverConfiguration.ip
            });

            SynchronisationV2.livreurSync(infos.id_db, serverConfiguration.ip).then(
                function (success) {
                    console.log(success);
                },
                function (error) {
                    console.log(error);
                }).finally(function () {
                console.log("END !");
                $ionicLoading.hide();
            });


        };
    })

    