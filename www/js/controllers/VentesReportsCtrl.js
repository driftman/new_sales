app.controller('VentesReportsCtrl', function ($scope, $state, Ventes, $ionicPopup) {
        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.menu = function () {
            $state.transitionTo("menu.entry");
        };
        $scope.missions = [];
        $scope.total = 0;

        function printError(msg) {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth"));

        }

        function printSucces(msg) {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Etat chargement imprimée avec succès"));
        }


        function print(content) {
            cordova.exec(printSucces, printError, "ZebraBluetoothPrinter", "zebra", [content]);
        }

        $scope.prompt = function (nom, prenom, content) {

            var prompt = $ionicPopup.alert(
                {
                    title: "<h4> Réimpression de la commande de " + nom + " " + prenom + "</h4>",
                    template: 'Etes-vous sûr de vouloir réimprimer la commande ?',
                    buttons: [
                        {
                            text: "oui",
                            type: "button-assertive",
                            cssClass: "assertive-survey",
                            onTap: function (e) {
                                e.preventDefault();
                                print(content || "NA");
                                prompt.close();
                            }
                        },

                        {
                            text: "non",
                            type: "button-assertive",
                            cssClass: "assertive-survey",
                            onTap: function (e) {
                            }
                        }
                    ]
                });


        };

        Ventes.get(profile.id_db || 0)
            .then(
                function (commandes) {
                    //console.debug(commandes);
                    //console.debug(JSON.stringify(commandes));
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

    