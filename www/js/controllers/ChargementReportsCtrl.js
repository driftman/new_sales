app.controller('ChargementReportsCtrl', function ($scope, $state, Chargement) {
        $scope.menu = function () {
            $state.transitionTo("menu.entry");
        };

        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.lignes = [];
        $scope.chargement = {};
        Chargement.getLastDetailedChargements(profile.id_db)
            .then(
                function (input) {

                    console.debug(input);

                    var lignes = input.output;
                    $scope.chargement.id = input.chargement_id;
                    $scope.chargement.date = input.date;

                    angular.forEach(lignes, function (ligne) {
                        $scope.lignes.push(ligne);
                    });
                },
                function (error) {
                    console.debug(error);
                });
    })

    