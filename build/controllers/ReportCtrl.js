app.controller('ReportCtrl', function ($timeout, $scope, $state, $ionicPopup, $ionicLoading, Ventes, Chargement, IonicPopUpUtilities, Stock, PrinterService) {

        var profile = JSON.parse(window.localStorage["profile"] || "{}");

        var isLivreur = ( (typeof(profile.fonction) != "undefined") && (profile.fonction == "livreur") );

        $scope.isLivreur = isLivreur;

        var choices = [{title: "Stock", code: 0}, {title: "Ventes", code: 2}];

        if (!isLivreur) {
            choices.push({title: "Chargement", code: 1});
        }

        $scope.choices = {items: choices, choosen: 1};

        $scope.checked = function (code) {
            console.debug($scope.choices.choosen);
        };

        $scope.print = function () {

            var popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "choix.html",

                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            var choice = $scope.choices.choosen;
                            popUp.close();
                            print(choice);
                        }
                    }
                ],
                title: 'Choix',
                subTitle: '(' + $scope.choices.items.length + ')'
            });
        };


        function print(choice) {
            if (choice == 0) {
                printStock();
            }
            else if (choice == 1) {
                printChargement();
            }
            else if (choice == 2) {
                printVentes();
            }
            else {
                console.debug("NOTHING !");
            }
        }

        $scope.menu = function () {
            if (profile.fonction == "livreur") {
                $state.transitionTo("menu.entry2");
            }
            else {
                $state.transitionTo("menu.entry");
            }

        };

        function printVentes() {

            Ventes.get(profile.id_db)
                .then(
                    function (commandes) {
                        console.debug(commandes);
                        PrinterService.formattedContentVentes(commandes)
                            .then(function (content) {
                                cordova.exec(printSucces, printError, "ZebraBluetoothPrinter", "zebra", [content]);
                            });
                    },
                    function (error) {
                        console.debug(error);
                    });

        }

        function printError(msg) {
            console.log(msg);
            $ionicLoading.hide();
            $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth"));

        }

        function printSucces(msg) {
            console.log(JSON.stringify(msg));
            $ionicLoading.hide();
            $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Etat chargement imprimée avec succès"));
        }


        function printChargement() {

            $ionicLoading.show({
                template: "Collecte d'informations en cours ..."
            });

            Chargement.getLastDetailedChargements(profile.id_db)
                .then(
                    function (input) {

                        $ionicLoading.show({
                            template: "Impression chargement en cours ..."
                        });

                        var demande = {};
                        var lignes = input.output;
                        console.debug(lignes);
                        demande.lignes = lignes;
                        demande.code = input.chargement_id;
                        demande.date = input.date;

                        PrinterService.formattedContentChargement(demande)
                            .then(
                                function (content) {
                                    cordova.exec(printSucces, printError, "ZebraBluetoothPrinter", "zebra", [content]);
                                });
                    },
                    function (error) {
                        console.debug(error);
                    }).finally(function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 900);
            });
        }

        function printStock() {

            $ionicLoading.show({
                template: "Collecte d'informations en cours ..."
            });

            var stock = [];

            Stock.get(profile.id_db).then(
                function (success) {

                    console.debug(success);

                    $ionicLoading.show({
                        template: "Impression état stock en cours ..."
                    });

                    angular.forEach(success, function (ligne, index) {

                        var packet = Math.trunc(ligne.totalStock / ligne.unitConversion);
                        var unit = ligne.totalStock % ligne.unitConversion;

                        ligne.caisse = packet;
                        ligne.unite = unit;

                        stock.push(ligne);
                    });

                    PrinterService.formatedContentStock([stock]).then(
                        function (content) {
                            console.debug(content);
                            cordova.exec(printSucces, printError, "ZebraBluetoothPrinter", "zebra", [content]);
                        },
                        function (error) {
                            console.debug(error);
                        });

                },
                function (error) {
                    console.debug(error);
                }).finally(function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 900);
            });
        };
    })

    