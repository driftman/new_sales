app.controller('Profile2Ctrl', function ($scope, $ionicSideMenuDelegate,  $cordovaGeolocation, IonicPopUpUtilities, $ionicLoading, $timeout, EntryPoint, Promotions, $state, $ionicPopup, $ionicModal, ionicMaterialMotion, ionicMaterialInk, Livreur, Missions) {
        $scope.profile = JSON.parse(window.localStorage['profile'] || '{}');
        var profile = JSON.parse(window.localStorage['profile'] || '{}');
        $scope.$parent.clearFabs();
        $ionicSideMenuDelegate.canDragContent(true);
        $timeout(function () {
            $scope.$parent.showHeader();
        }, 500);
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 1000);

        $timeout(function () {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 1000
            });
        }, 1500);

        // Set Ink
        ionicMaterialInk.displayEffect();
        $scope.missions = [];
        $scope.mission = {};
        Livreur.getLivreurMission(profile.id_db).then(
            function (success) {
                console.log(success);
                angular.forEach(success, function (mission) {
                    console.log(mission)
                    mission.lignes = JSON.parse(mission.lignes);
                    $scope.missions.push(mission);
                });
            },
            function (error) {
                console.log(error);
            });

        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Succès',
                template: 'La livraison a bien été confirmé'
            });
        };

        $scope.valid = function (mission) {
            Missions.setMissionLivreurToLivred(mission.id_db).then(
                function (success) {
                    console.log(success);
                    mission.state = 1;
                    $scope.modal.hide();
                    $ionicPopup.alert({
                        title: 'Succès',
                        template: 'La livraison a bien été confirmé'
                    });
                },
                function (error) {
                    console.log(error);
                })
        }

        $ionicModal.fromTemplateUrl('delivery.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.goto = function (mission) {

            var missionLocalStorage = JSON.parse(window.localStorage["mission"] || "{}");
            if(typeof(missionLocalStorage.cancel) != "undefined" && missionLocalStorage.cancel == false)
            {
                $state.go("app.cartLivreur");
            }
            else if (mission.state == 0) {
                $ionicLoading.show({
                    template: "Preparation de la visite en cours ..."
                });

                mission.entryDate = new Date().getTime();

                var posOptions = {timeout: 9000, enableHighAccuracy: false};
                  $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(
                        function (position) {

                        console.log(position);
                        mission.lat  = position.coords.latitude;
                        mission.lng = position.coords.longitude;


                        var keys = Object.keys(window.localStorage);

                        for (var i = 0; i < keys.length; i++) {
                            if (keys[i] != "profile") {
                                window.localStorage.removeItem(keys[i]);
                            }
                        }

                        window.localStorage["mission"] = JSON.stringify(mission);

                        EntryPoint.prepare(mission.clientId, true)
                            .then(
                                function (success) {
                                    var cart = JSON.parse(window.localStorage['cart'] || "{}");
                                    cart.mission = mission.missionId;
                                    cart.items = [];
                                    angular.forEach(mission.lignes, function (ligne) {
                                        cart.items.push(ligne);
                                    });
                                    window.localStorage['cart'] = JSON.stringify(cart);
                                    $ionicLoading.hide();
                                    $state.go("app.cartLivreur");
                                });


                    }, function(err) {
                      mission.lat  = 0;
                      mission.lng = 0;

                      var keys = Object.keys(window.localStorage);

                        for (var i = 0; i < keys.length; i++) {
                            if (keys[i] != "profile") {
                                window.localStorage.removeItem(keys[i]);
                            }
                        }

                        window.localStorage["mission"] = JSON.stringify(mission);

                        EntryPoint.prepare(mission.clientId, true)
                            .then(
                                function (success) {
                                    var cart = JSON.parse(window.localStorage['cart'] || "{}");
                                    cart.mission = mission.missionId;
                                    cart.items = [];
                                    angular.forEach(mission.lignes, function (ligne) {
                                        cart.items.push(ligne);
                                    });
                                    window.localStorage['cart'] = JSON.stringify(cart);
                                    $ionicLoading.hide();
                                    $state.go("app.cartLivreur");
                                });

                    });


               


            }
            else {
                switch (mission.state) {
                    case 1:
                        promptPrint(mission.nom, mission.prenom, mission.print_content);
                        break;
                    case 2:
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Livraison annulée !", "La livraison à été annulée."));
                        break;
                    default:
                        break;

                }
                //$ionicPopup.alert(IonicPopUpUtilities.alert("Déjà livré !", "La livraison est déjà faite."))
            }
            /*$scope.mission =mission;
             $scope.modal.show();
             if(mission.state == 1 || mission.finished == 1)
             {
             console.log("WHAT !!");
             }
             else
             {
             $scope.mission =mission;
             $scope.modal.show();
             }*/
        };

        function promptPrint(nom, prenom, content) {
            console.log(content);
            var prompt = $ionicPopup.alert(
                {
                    title: "Livraison terminée pour " + nom + " " + prenom,
                    template: 'Voulez-vous réimprimer la facture ?',
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
        }


        function printError(msg) {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth"));

        }

        function printSucces(msg) {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Etat chargement imprimée avec succès"));
        }


        function print(content) {
            cordova.exec(printSucces, printError, "ZebraBluetoothPrinter", "zebra", [content]);
        }


    })
    