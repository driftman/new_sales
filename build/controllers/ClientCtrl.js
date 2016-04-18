app.controller('ClientCtrl', function ($scope,
                                        $stateParams,
                                        $ionicSideMenuDelegate,
                                        $timeout,
                                        $rootScope,
                                        $ionicSlideBoxDelegate,
                                        Missions,
                                        Clients,
                                        Commandes,
                                        LigneCommandes,
                                        Articles,
                                        ionicMaterialMotion,
                                        ionicMaterialInk,
                                        Promotions,
                                        $document,
                                        $cordovaGeolocation,
                                        $state,
                                        $ionicLoading,
                                        $ionicPopup,
                                        IonicPopUpUtilities,
                                        CallSteps,
                                        checkPoint,
                                        EntryPoint,
                                        $filter, ca) {
        $scope.ca = ca.ca;
        $scope.infos = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);
        $scope.vente = typeof window.localStorage['cart'] == "undefined";
        $scope.chargement = typeof window.localStorage['cart'] != "undefined" && JSON.parse(window.localStorage['cart']).action == "chargement" ? true : false;


        $scope.checkPoint = function () {


            var isVendeur = JSON.parse(window.localStorage['profile']).fonction == "vendeur";
            if (checkPoint == "app.brands") {
                $state.transitionTo(checkPoint, {
                    vendeur: isVendeur,
                    chargement: false,
                    prelevement: false,
                    retour: false
                });
            }
            else {
                $state.transitionTo(checkPoint);
            }
        };

        // Set Motion
        ionicMaterialMotion.fadeSlideInRight();

        // Set Ink
        ionicMaterialInk.displayEffect();
        $ionicSlideBoxDelegate.update();
        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicSlideBoxDelegate.update();
        });
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $scope.clients = [];
        $scope.infos = JSON.parse(window.localStorage['profile'] || "{}");
        $scope.client = {};
        var clientObject;
        $scope.mission_id = $rootScope.mission;
        $scope.center = {
            lat: 33.565721,
            lng: -7.626388,
            zoom: 14
        };
        $scope.defaults = {
            zoomControl: false,
            layerControl: false,
            tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        };
        $scope.markers = {
            m2: {
                lat: 33.565721,
                lng: -7.626388,
                focus: true,
                draggable: false,
                message: "<h5><b>Votre client est ici !</b></h5>",
                icon: {
                    iconUrl: 'img/red.png',
                    iconSize: [46, 46], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                }
            },
            vendeur: {
                lat: 33.565721,
                lng: -7.626388,
                focus: false,
                draggable: false,
                message: "<h5><b>Vous êtes ici</b></h5>",
                icon: {
                    iconUrl: "img/vendeur.png",
                    iconSize: [46, 46], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                }
            }


        };

        var latClient = 0;
        var lngClient = 0;

        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                console.log(position);
                latClient = $scope.markers.vendeur.lat = position.coords.latitude;
                lngClient = $scope.markers.vendeur.lng = position.coords.longitude;

            }, function (err) {
                console.log(err.message);
            });

        $scope.goClient = function () {

            go();

        };


        var choices = [
            {title: "Rupture", code: 0},
            {title: "Urgent", code: 1}
        ];
        $scope.choices = {items: choices, choosen: 0};

        var destination = null;

        function go() {


            $ionicLoading.show({template: "Préparation de la visite en cours !"});

            var steps = [];
            CallSteps.get().then(
                function (success) {
                    if (success.length > 0) {

                        for (var i = 0; i < success.length; i++) {
                            var object = {
                                rank: success[i].rank,
                                title: success[i].title,
                                name: success[i].name
                            };
                            if (success[i].rank == 1) {
                                object.active = true;
                                destination = success[i];
                                break;
                            }
                        }

                        window.localStorage['callSteps'] = JSON.stringify(success);

                        var startDay = new Date();

                        var mission = {
                            ville: "Casablanca",
                            region: "GRAND CASABLANCA",
                            route: clientObject.route,
                            nom: clientObject.nom,
                            prenom: clientObject.prenom,
                            codeClient: clientObject.code_client,
                            typeClient: clientObject.type || 0,
                            channelClient: clientObject.channel || 0,
                            lat: latClient,
                            lng: lngClient,
                            return_id: clientObject.return_id,
                            route_id: $scope.client.route,
                            client_id: $scope.client.id_db,
                            date_start: startDay.getTime(),
                            local: 1,
                            state: 0,
                            synced: false,
                            entryDate: Date.now()
                        };

                        console.log(mission);

                        if (($scope.client.lat == null || $scope.client.lat == 0) || ($scope.client.lng == null || $scope.client.lng == 0)) {
                            var posOptions = {timeout: 10000, enableHighAccuracy: false};
                            $cordovaGeolocation
                                .getCurrentPosition(posOptions)
                                .then(function (position) {
                                    var object = {};
                                    object.lat = position.coords.latitude;
                                    object.lng = position.coords.longitude;
                                    console.log(object);
                                    console.log(clientObject.id_db);
                                    Clients.updateClientCoords(clientObject.id_db, object).then(
                                        function (success) {
                                            console.log("Successfully up to date !");
                                            console.log(success);
                                        },
                                        function (error) {
                                            console.log("Error while updating");
                                        });
                                }, function (err) {
                                    console.log("WE'LL TRY NEXT TIME!");
                                });
                        }

                        if (typeof window.localStorage['mission'] == "undefined") {
                            window.localStorage['mission'] = JSON.stringify(mission);
                        }
                        else {
                            var localMission = JSON.parse(window.localStorage['mission']);
                            if (localMission.client_id != $scope.client.id_db) {
                                window.localStorage['mission'] = JSON.stringify(mission);
                            }
                        }

                        var finalMission = JSON.parse(window.localStorage["mission"] || "{}");

                        if (finalMission.local == 1) {
                            $ionicLoading.hide();
                            var popUpCauses = $ionicPopup.alert({

                                title: "Cause sortie de route",
                                buttons: [
                                    {
                                        text: "OK",
                                        type: "button-assertive",
                                        cssClass: "assertive-survey",
                                        onTap: function (e) {

                                            e.preventDefault();

                                            if ($scope.choices.choosen != 0) {
                                                finalMission.cause = $scope.choices.choosen;

                                                console.log(finalMission);

                                                window.localStorage["mission"] = JSON.stringify(finalMission);

                                                popUpCauses.close();

                                                finalStep();
                                            }

                                        }
                                    }
                                ],
                                templateUrl: "causes.html",
                                scope: $scope

                            });
                        }
                        else {
                            finalStep();
                        }


                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Essayez de faire une synchronisation pour récupérer les étapes de vente"));
                    }
                },
                function (error) {
                    console.log(error);
                });


        };

        function finalStep() {
            EntryPoint.prepare(clientObject.id_db).then(function (success) {

                var profile = JSON.parse(window.localStorage["profile"] || "{}");

                var isVendeur = typeof(profile.fonction) != "undefined" && profile.fonction == "vendeur";

                $timeout(function () {
                    $ionicLoading.hide();
                }, 900);


                $scope.charakas = JSON.parse(window.localStorage['charakas'] || "[]");

                if ($scope.charakas.length > 0) {
                    var popUpCharakas = $ionicPopup.alert({

                        title: $scope.charakas.length > 0 ? "Vous avez droit à des promotions charaka (" + $scope.charakas.length + ")" : "Vous avez droit à une promotion charaka",
                        buttons: [
                            {
                                text: "OK",
                                type: "button-assertive",
                                cssClass: "assertive-survey",
                                onTap: function (e) {

                                    e.preventDefault();

                                    popUpCharakas.close();

                                    if (destination.name == "app.brands") {
                                        $state.go(destination.name, {
                                            vendeur: isVendeur,
                                            chargement: false,
                                            prelevement: false,
                                            retour: false
                                        });
                                    }
                                    else {
                                        $state.go(destination.name);
                                    }
                                }
                            }
                        ],
                        templateUrl: "charaka.html",
                        scope: $scope

                    });
                }

                else {
                    if (destination.name == "app.brands") {
                        $state.go(destination.name, {
                            vendeur: isVendeur,
                            chargement: false,
                            prelevement: false,
                            retour: false
                        });
                    }
                    else {
                        $state.go(destination.name);
                    }
                }

            }).finally(function () {


            });
        }

        var clientName;
        Clients.getClient($stateParams.id).then(
            function (client) {
                // TO MAKE SURE NO ERROR WILL OCCURE !!
                if (typeof client.lat != "undefined" && typeof client.lng != "undefined") {
                    if (client.lat != null && client.lng != null) {
                        if (client.lat != 0 && client.lng != 0) {
                            $scope.center.lat = $scope.markers.m2.lat = client.lat;
                            $scope.center.lng = $scope.markers.m2.lng = client.lng;
                        }
                    }
                }
                $scope.markers.m2.message = '<h5><b style="color: #B71C1C;">' + client.nom + " " + client.prenom + "</b></h5> <br>Adresse : " + client.address + "<br> Telephone : 0651239689";
                $scope.client = client;
                clientObject = client;
                clientName = clientObject.name;
            },
            function (error) {
                console.log(error.message);
            });
        Commandes.getCAVendeur().then(
            function (result) {
                console.log(result);
                $scope.caVendeur = result.ca;
            },
            function (error) {
                console.log(error.message);
            });
        Commandes.getCAClient($stateParams.id).then(
            function (data) {
                $scope.ca = data.ca;
            },
            function (error) {
                console.log(error.message);
            });
        Commandes.getAVGClient($stateParams.id).then(
            function (data) {
                $scope.avg = data.avg;
            },
            function (error) {
                console.log(error.message);
            });

        $scope.commandes = [];
        Commandes.getCommandesByClient($stateParams.id).then(
            function (data) {
                console.log(data);
                var object = {};
                for (var j = 0; j < data.length; j++) {
                    console.log(data[j].code_commande);
                    object[data[j].code_commande] = 0;
                }
                var distinctArray = Object.keys(object);
                for (var i = 0; i < distinctArray.length; i++) {
                    var trueObject = {};
                    trueObject.code_commande = distinctArray[i];
                    trueObject.ligneCommandes = [];
                    for (var j = 0; j < data.length; j++) {
                        if (data[j].code_commande === distinctArray[i]) {
                            var ligneCommande = {
                                designation: data[j].designation,
                                packets: data[j].packets,
                                total: data[j].total,
                                units: data[j].units,
                                prixVente: data[j].prixVente
                            };
                            trueObject.ligneCommandes.push(ligneCommande);
                        }
                    }
                    $ionicSlideBoxDelegate.update();
                    $scope.commandes.push(trueObject);
                    $ionicSlideBoxDelegate.update();
                }
            },
            function (error) {
                console.log(error.message);
            });


        /*markers: {
         m1: {
         lat: 33.533333,
         lng: -7.583333,
         focus: false,
         draggable: false,
         message: "Je suis là !",
         icon: {
         iconUrl: 'img/vendeur.png',
         iconSize:     [46, 46], // size of the icon
         shadowSize:   [50, 64], // size of the shadow
         iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
         popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
         }
         },
         m2: {
         lat: 33.565721,
         lng: -7.626388,
         focus: true,
         draggable: false,
         message: "<h5><b>Votre client est ici !</b></h5>",
         icon: {
         iconUrl: 'img/red.png',
         iconSize:     [46, 46], // size of the icon
         shadowSize:   [50, 64], // size of the shadow
         iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
         popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
         }
         }

         },*/


        /*angular.extend($scope, {

         client2: {
         lat: 33.533333,
         lng: -7.583333,
         zoom: 13
         },
         markers2: {
         m1: {
         lat: 33.533333,
         lng: -7.583333,
         focus: true,
         draggable: false,
         message: $scope,
         icon: {
         iconUrl: 'img/red.png',
         iconSize:     [46, 46], // size of the icon
         shadowSize:   [50, 64], // size of the shadow
         iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
         popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
         }
         }
         },
         layers: {
         baselayers: {
         googleTerrain: {
         name: 'Google Terrain',
         layerType: 'TERRAIN',
         type: 'google'
         },
         googleHybrid: {
         name: 'Google Hybrid',
         layerType: 'HYBRID',
         type: 'google'
         },
         googleRoadmap: {
         name: 'Google Streets',
         layerType: 'ROADMAP',
         type: 'google'
         }
         }
         }
         });*/


    })

    