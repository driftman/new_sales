app.controller('ClientCtrl', function ($scope,
                                        $stateParams,
                                        $cordovaLaunchNavigator,
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
                                        $filter, 
                                        ca,
                                        CartUtilities,
                                        DateUtilities) {

        $scope.ca = ca.ca;

        var profile = JSON.parse(window.localStorage["profile"] || "{}");

        var activite = profile.activite || 0;
        var parametrage = profile.parametrage || {};
        var company = parametrage.company || {};
        var tenant_id = company.id || 0;
        var vendeur_id = profile.id_db || 0;

        $scope.isVendeur = typeof(profile.fonction) != "undefined" && profile.fonction == "vendeur";

        $scope.infos = profile;

        $scope.mission = JSON.parse(window.localStorage["mission"] || "{}");

        ionicMaterialMotion.fadeSlideInRight();

        checkPoint = checkPoint || "";
        
        $scope.venteEnCours = typeof window.localStorage['cart'] != "undefined" && checkPoint != "";
        $scope.echangeEnCours = typeof window.localStorage['echange'] != "undefined";
        var chargement = typeof(JSON.parse(window.localStorage['cart'] || '{}').action) != "undefined" && JSON.parse(window.localStorage['cart'] || '{}').action == "chargement";
        $scope.chargementEnCours = typeof window.localStorage['cart'] != "undefined" && chargement ? true : false;

        $scope.launchNavigator = function() {
            if(!$scope.client.lng || !$scope.client.lat || $scope.client.lat == 0 || $scope.client.lng == 0)
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Pas d'itinéraire", "Le client n'a pas de coordonées valides"));
            }
            else
            {
                var destination = [$scope.center.lat, $scope.center.lng];
                var start = "Trento";
                launchnavigator.navigate("London, UK", {
                    start: "Manchester, UK"
                });
            }
        };

        $scope.checkPoint = function () {

            console.log(checkPoint);

            console.log(CallSteps);

            if (checkPoint == "app.brands") {
                $state.transitionTo(checkPoint, {
                    vendeur: $scope.isVendeur,
                    chargement: false,
                    prelevement: false,
                    retour: false
                });
            }
            else {
                $state.transitionTo(checkPoint);
            }
        };

        var clientName;

        var choices = [
            {title: "Rupture", code: 0},
            {title: "Urgent", code: 1}
        ];

        var actions = [
            {title: "Vente", code: 1},
            {title: "Echange", code: 2}
        ];

        $scope.choices = {items: choices, choosen: 0};

        $scope.actions = {items: actions, choosen: 0};

        var destination = null;

        $scope.infos = JSON.parse(window.localStorage['profile'] || "{}");

        $scope.client = {};

        $scope.chooseAction = function() {

            var actionPopUp = $ionicPopup.alert({

                                title: "<h4>Veuillez choisir une action</h4>",
                                buttons: [
                                    {
                                        text: "OK",
                                        type: "button-assertive",
                                        cssClass: "assertive-survey",
                                        onTap: function (e) {

                                            e.preventDefault();

                                            if ($scope.actions.choosen != 0) {
                                                actionPopUp.close();
                                                actionDecision($scope.actions.choosen);
                                            }

                                        }
                                    }
                                ],
                                templateUrl: "actions.html",
                                scope: $scope

                            });
        };

        function echange() {

            var clientId = clientObject.id_db || 0;
            if(clientId == 0) {
                return;
            }
            EntryPoint.prepareEchange(clientId).then(
                function(success){

                    var methode_paiement = JSON.parse(window.localStorage["methode_paiement"] || "[]");

                    if( methode_paiement.length > 0 ) {
                        
                        var object = { client_id: clientId, entrant: { items: [] }, sortant: { items: [] } };
                        window.localStorage["echange"] = JSON.stringify(object || {});
                        $state.go("app.in");

                    } else {
                        doNotHaveAnyPaymentMode();
                    }
                })
        }

        function actionDecision(input) {
            if(input == 1) {
                go();
            } else {
                echange();
            }
        }

        $scope.markers = {
            m2: {
                focus: true,
                draggable: false,
                message: "<h5><b>Votre client est ici !</b></h5>",
                icon: {
                    iconSize: [30, 30], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                }
            },
            vendeur: {
                focus: false,
                draggable: false,
                message: "<h5><b>Vous êtes ici</b></h5>",
                icon: {
                    iconUrl: "img/vendeur.png",
                    iconSize: [30, 30], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                }
            }


        };

        var clientObject;

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

        $scope.markers.m2.lat = 0;
        $scope.markers.m2.lng = 0;

        $scope.markers.vendeur.lat = 0;
        $scope.markers.vendeur.lng = 0;

        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {

                $scope.markers.vendeur.lat = position.coords.latitude;
                $scope.markers.vendeur.lng = position.coords.longitude;

                if($scope.markers.m2.lat == 0 || $scope.markers.m2.lng == 0)
                {
                    $scope.markers.m2.lat = $scope.markers.vendeur.lat;
                    $scope.markers.m2.lng = $scope.markers.vendeur.lng;
                }

            }, function (err) {
                console.log(err.message);
            });

        Clients.getClient($stateParams.id, tenant_id, activite).then(
            function (client) {
                console.log(client);
                $scope.markers.m2.lat = client.lat || 0;
                $scope.markers.m2.lng = client.lng || 0;
                client.last = DateUtilities.convertLongToYYYYMMDDHHmmss(client.last);
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

        
        
        $scope.goClient = function () {

            go();

        };


        

        function go() {


            

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

                        var pass = false;

                        if( typeof(clientObject.pass) != "undefined" && clientObject.pass == 1 ) {
                            pass = true;
                        }

                        var mission = {
                            classeClient: clientObject.classe,
                            ville: "Casablanca",
                            region: "GRAND CASABLANCA",
                            route: clientObject.route,
                            nom: clientObject.nom,
                            prenom: clientObject.prenom,
                            codeClient: clientObject.code_client,
                            typeClient: clientObject.type || 0,
                            channelClient: clientObject.channel || 0,
                            lat: $scope.markers.vendeur.lat || 0,
                            lng: $scope.markers.vendeur.lng || 0,
                            return_id: clientObject.return_id,
                            route_id: $scope.client.route,
                            client_id: $scope.client.id_db,
                            date_start: startDay.getTime(),
                            local: 1,
                            state: 0,
                            synced: false,
                            entryDate: Date.now(),
                            pass: pass
                        };

                        if (($scope.client.lat == null || $scope.client.lat == 0) || ($scope.client.lng == null || $scope.client.lng == 0)) {

                            var object = {};
                            object.lat = $scope.markers.vendeur.lat || 0;
                            object.lng = $scope.markers.vendeur.lng || 0;
                            Clients.updateClientCoords(clientObject.id_db, object).then(
                            function (success) {
                            },
                            function (error) {
                            });
                        }

                        if (typeof window.localStorage['mission'] == "undefined") {
                            window.localStorage['mission'] = JSON.stringify(mission || {});
                        }
                        else {
                            var localMission = JSON.parse(window.localStorage['mission'] || {});
                            if (localMission.client_id != $scope.client.id_db) {
                                window.localStorage['mission'] = JSON.stringify(mission);
                            }
                        }

                        var finalMission = JSON.parse(window.localStorage["mission"] || "{}");

                        console.log("finalMission", finalMission);

                        var passAuthorization = typeof(finalMission.pass) != "undefined" && finalMission.pass == true;

                        if ( finalMission.local == 1 && !passAuthorization) {

                            console.log("YES");

                            $ionicLoading.hide();
                            var popUpCauses = $ionicPopup.alert({

                                title: "<h4>Sortie de route</h4>",
                                buttons: [
                                    {
                                        text: "OK",
                                        type: "button-assertive",
                                        cssClass: "assertive-survey",
                                        onTap: function (e) {

                                            e.preventDefault();

                                            if ($scope.choices.choosen != 0) {
                                                popUpCauses.close();

                                                finalMission.cause = $scope.choices.choosen;

                                                console.log(finalMission);

                                                window.localStorage["mission"] = JSON.stringify(finalMission);

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
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Informations manquantes", "Essayez de faire une synchronisation pour récupérer les étapes de vente"));
                    }
                },
                function (error) {
                    console.log(error);
                });


        };

        function doNotHaveAnyPaymentMode() {

            CartUtilities.clearVisit().then(function(success) {

                var popUpPaymentMode = $ionicPopup.alert({

                                title: "<h4>Méthode de paiement</h4>",
                                buttons: [
                                    {
                                        text: "OK",
                                        type: "button-assertive",
                                        cssClass: "assertive-survey",
                                        onTap: function (e) {

                                        }
                                    }
                                ],
                                template: '<div style="font-size: 13px;" > - Aucune méthode de paiement n\'est associée à ce client <br>  - Prise de commande impossible </div>'

                            });
            });
            
        }

        function finalStep() {

                var clientId = clientObject.id_db || 0;
                EntryPoint.prepare(clientId).then(function (success) {

                    console.log(success);

                    var methode_paiement = JSON.parse(window.localStorage["methode_paiement"] || "[]");

                    if(methode_paiement.length < 1)
                    {
                        doNotHaveAnyPaymentMode();
                        return;
                    }
                    else
                    {
                        console.log("YOU ARE LUCKY !!");
                        var profile = JSON.parse(window.localStorage["profile"] || "{}");

                        var isVendeur = typeof(profile.fonction) != "undefined" && profile.fonction == "vendeur";



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
                    }

                

            }, function(error){
                console.error(error);
            }).finally(function () {

                console.log("DONE");
            });
        }


    })

    