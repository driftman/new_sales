app.controller('EntryCtrlLivreur', function ($scope, Livreur, $interval, $state, $ionicPopup, SynchronisationV2, Parametrage, $ionicLoading, $http, $timeout, Articles, Marques, Missions) {

        $scope.profile = JSON.parse(window.localStorage['profile'] || "{}");

        var serverConfiguration = Parametrage.server();

        // DONT KNOW WHY BUT SHOULD BE REMOVED
        var infos = JSON.parse(window.localStorage['profile'] || "{}");

        $scope.today = new Date();

        $interval( function() {
            $scope.today = new Date();
        },
        1000);


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


        $scope.prepareDechargement = function () {


            var myPopUp2 = $ionicPopup.alert({

                title: "Demande de déchargement",
                buttons: [
                    {
                        text: "décharger",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            myPopUp2.close();
                            $state.go("app.stocks");

                        }
                    },
                    {
                        text: "annuler",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                        }
                    }
                ],
                template: '<span style="font-size: 12px; font-weight: 600;"> <b style="font-weight: 900;">Décharger</b>: Une liste contenant les articles disponibles en stock vous pouvez insérer les qté CS/UN que vous voulez décharger </span>'

            });


        };
    })

    