app.controller('VentesReportsCtrl', function ($scope, $state, Ventes) {
        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.menu = function () {
            $state.transitionTo("menu.entry");
        };
        $scope.missions = [];
        $scope.total = 0;
        Ventes.get(profile.id_db || 0)
            .then(
                function (commandes) {
                    console.debug(JSON.stringify(commandes));
                    angular.forEach(commandes, function (commande) {
                        var date = new Date(commande.date);
                        commande.day = date.getDate();
                        commande.month = date.getMonth() + 1;
                        commande.promotions = JSON.parse("[" + commande.promotions + "]");
                        commande.sbds = JSON.parse("[" + commande.sbds + "]");
                        if (commande.state == 1) {
                            commande.state = "avec commande";
                        }
                        else if (commande.state == 2) {
                            commande.state = "visite annulée";
                        }
                        else {
                            commande.state = "--";
                        }


                        commande.promotions = commande.promotions.length;
                        commande.sbds = commande.sbds.length;
                        $scope.total += commande.totalTTC;

                        $scope.missions.push(commande);
                    });
                },
                function (error) {
                    console.debug(error);
                });

    })

    