app.controller('EntryCtrl', function ($scope, $rootScope, $ionicPlatform, $cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2, $cordovaBatteryStatus, StockConcurrent, Charaka, Retours, Chargement, Parametrage, EntryPoint, DumpDB, Surveys, ModePaiement, ca, $timeout, IonicPopUpUtilities, $ionicPopup, CallSteps, $ionicLoading, $state, Routes, BrandFive, SBD, Commandes, Missions, Clients, Articles, Promotions, Marques, SynchronisationV2, $filter) {

        var infos;

        $scope.infos = infos = JSON.parse(window.localStorage['profile'] || "{}");

        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");


        var isVendeur = typeof(infos.fonction) != "undefined" && infos.fonction == "vendeur";

        var serverConfiguration = Parametrage.server();

        console.debug(isVendeur);

        $scope.isVendeur = isVendeur;

        /* document.addEventListener("deviceready", function () {
         $rootScope.$on('$cordovaBatteryStatus:status', function (result) {
         var batteryLevel = result.level;
         var isPluggedIn  = result.isPlugged;
         if(isPluggedIn)
         {

         }
         else
         {

         }
         });
         }, false);*/

        $scope.ca = ca.ca;

        $scope.test = function () {
            window.open('img/test.pdf', '_blank', 'location=yes');
        };


        function charger() {
            var cart = JSON.parse(window.localStorage['cart'] || "{}");

            if (!Object.keys(cart).length > 0) {
                cart.action = "chargement";

                cart.items = [];

                window.localStorage['cart'] = JSON.stringify(cart);

                $state.transitionTo("app.brands", {vendeur: true, chargement: true, prelevement: false, retour: false});
            }
            else {
                if (cart.action == "chargement") {
                    $state.transitionTo("app.brands", {
                        vendeur: true,
                        chargement: true,
                        prelevement: false,
                        retour: false
                    });
                }
                else {
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Vous devez finir votre visite "));
                }
            }
        }

        function rapport() {

        }

        function optionChargement() {
            Chargement.searchForWaiting(infos.id_db)
                .then(
                    function (success) {
                        console.debug(success);
                        if (success.rows.length > 0) {
                            var myPopUp = $ionicPopup.alert({

                                title: "Demande de chargement en cours ...",
                                buttons: [
                                    {
                                        text: "OK",
                                        type: "button-assertive",
                                        cssClass: "assertive-survey",
                                        onTap: function (e) {
                                        }
                                    }
                                ],
                                template: '<span style="font-size: 12px; font-weight: 600;">La demande précédemment envoyée est en attente de validation.</span>'

                            });
                        }
                        else {
                            charger();
                        }
                    },
                    function (error) {
                        console.debug("Une erreur est survenue !");
                    });

        }


        $scope.prepareChargement = function () {


            var myPopUp = $ionicPopup.alert({

                title: "Veuillez choisir une option ",
                buttons: [
                    {
                        text: "charger",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            myPopUp.close();
                            optionChargement();

                        }
                    },
                    {
                        text: "stock/rapports",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            myPopUp.close();
                            $state.transitionTo("reports.chargements");
                        }
                    }
                ],
                template: '<span style="font-size: 12px; font-weight: 600;"> <b style="font-weight: 900;">Charger</b>: Ajout d\'une nouvelle demande de chargement. <br> <b style="font-weight: 900;">Rapport</b>: rapport du dernier chargement. </span>'

            });


        };


        var choices = [
            {title: "3G", code: 0},
            {title: "WI-FI", code: 1},
            {title: "CABLE", code: 2}
        ]
        $scope.choices = {items: choices, choosen: 0};


        var methods = [
            {title: "Générer", code: 0},
            {title: "Synchroniser", code: 1}
        ]
        $scope.methods = {items: methods, choosen: 0};


        var sbdMethods = [
            {title: "Visualiser", code: 0},
            {title: "Télecharger la brochure", code: 1}
        ]
        $scope.sbdMethods = {items: sbdMethods, choosen: 0};


        $scope.sbdPopup = function () {
            openSbdPopUp();
        };

        function openSbdPopUp() {
            var sbdPopUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "sbdChoix.html",

                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            var code = $scope.sbdMethods.choosen;
                            sbdPopUp.close();
                            sbdOpen(code);
                        }
                    }
                ],
                title: 'Choix',
                subTitle: '(' + $scope.sbdMethods.items.length + ')'
            });
        };

        $scope.progressValue = 0;

        function sbdOpen(code) {
            var PARENT_FOLDER = "file:///storage/sdcard0/";

            var FOLDER = "DCIM/new_sales/";

            var FILE_NAME = "test.pdf";

            var url = "http://192.168.100.180:8082/newsales/pdfs/nhibernate.pdf";

            var target = PARENT_FOLDER + "" + FOLDER + "" + FILE_NAME;

            var options = {};

            // FOR SECURITY CERTS !
            var trustAllHosts = false;


            if (code == 0) {
                $cordovaFileOpener2.open(
                    target,

                    'application/pdf'
                ).then(function () {

                    console.log("Fichier ouvert avec succès !");
                }, function (err) {

                    $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Erreur lors de l\'ouverture du fichier "));

                });
            }
            else if (code == 1) {
                $ionicLoading.show(
                    {
                        templateUrl: 'spinner.html',
                        scope: $scope
                    });

                $cordovaFileTransfer.download(url, target, options, trustAllHosts)
                    .then(function (result) {

                        console.log(JSON.stringify(result));

                    }, function (err) {

                        console.log(JSON.stringify(err));


                    }, function (progress) {
                        $timeout(function () {

                            //$scope.downloadProgress = ;
                            $scope.progressValue = Math.trunc(((progress.loaded / progress.total) * 100));
                            //$scope.progressValue = progressValue;
                            console.log($scope.progressValue);
                            if ($scope.progressValue == 100) {
                                $ionicLoading.hide();
                                openSbdPopUp();
                            }
                        });
                    });
            }
            else {
                console.debug("NOTHING !");
            }
        }


        function popUpWireChoice() {
            var popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "choixWire.html",

                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            var choice = $scope.methods.choosen;
                            popUp.close();
                            syncWire(choice);
                        }
                    }
                ],
                title: 'Choix',
                subTitle: '(' + $scope.methods.items.length + ')'
            });
        }

        function getStringFromCode(code) {
            switch (code) {
                case 1:
                    return "Chemin incorrecte";
                case 2:
                    return "Problème de sécurité";
                case 3:
                    return "Processus abandonné par le système";
                case 4:
                    return "Impossible de lire les données";
                case 5:
                    return "Problème d'encodage";
                case 6:
                    return "Les modifications ne sont pas autorisées";
                case 7:
                    return "Etat invalide";
                case 8:
                    return "Erreur de syntaxe";
                case 9:
                    return "Modification invalide";
                case 10:
                    return "Vous n'avez pas respécté les quota du système";
                case 11:
                    return "Le type du fichier et invalide";
                case 12:
                    return "Le chemin n'existe pas";
                default:
                    return null;
            }
        }

        function syncWire(input) {
            var PARENT_FOLDER = "file:///storage/sdcard0/";

            var FOLDER = "DCIM/new_sales/";

            console.debug(PARENT_FOLDER + "" + FOLDER);

            var OFILE = "output.json";

            var IFILE = "input.json";

            if (input == 1) {
                $ionicLoading.show({template: "Synchronisation par câble en cours ..."});

                $cordovaFile.readAsText(PARENT_FOLDER + "" + FOLDER, IFILE)
                    .then(function (text) {


                        var object = JSON.parse(text);

                        SynchronisationV2.processData(object, infos.id_db, [])
                            .then(
                                function (success) {
                                    console.log(JSON.stringify(success));
                                },
                                function (error) {
                                    console.log(JSON.stringify(success));
                                })
                            .finally(function () {
                                $timeout(function () {
                                    $ionicLoading.hide();
                                }, 1500);
                            });

                    }, function (error) {

                        var msg = getStringFromCode(error.code);
                        msg = msg == null ? "--" : msg;
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", msg));

                    });
            }
            else if (input == 0) {
                SynchronisationV2.gatherSyncOutputData(infos.id_db, true)
                    .then(
                        function (success) {

                            var syncData = success;

                            console.log(syncData);

                            $cordovaFile.createFile(PARENT_FOLDER + "" + FOLDER, OFILE, true)
                                .then(
                                    function (file) {

                                        console.log(device.uuid);

                                        var object = {
                                            infos: {vendeurID: infos.id_db, phoneInfos: device.uuid},
                                            data: syncData
                                        };

                                        object = JSON.stringify(object);

                                        $cordovaFile.writeFile(PARENT_FOLDER + "" + FOLDER, OFILE, object, true)
                                            .then(
                                                function (complete) {

                                                    $ionicPopup.alert(IonicPopUpUtilities.alert("Succès", "Les données sont prêtes pour la synchronisation "));

                                                },
                                                function (writeCode) {

                                                    var msg = getStringFromCode(writeCode.code)
                                                    msg = msg == null ? "" : msg;
                                                    $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", msg));

                                                });

                                    },

                                    function (errorCode) {
                                        var msg = getStringFromCode(errorCode.code)
                                        msg = msg == null ? "--" : msg;
                                        $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", msg));
                                    });
                        },

                        function (error) {
                            alert(JSON.stringify(error));
                        });
            }
            else {
                console.debug("NOTHING !");
            }


        }

        function syncWifi() {
            /*Charaka.add().then(
             function(success){
             console.log(success);
             },
             function(error){
             console.log(error);
             });
             BrandFive.fromAPI()
             .then(
             function(success){
             console.debug(success);
             },
             function(error){
             console.debug(error);
             });*/

            /*StockConcurrent.out(43).then(function(success){ console.log(success); });*/
            /*$ionicLoading.show({
             template : "Synchronisation en cours ..."
             });
             SynchronisationV2.syncV2(infos.id_db).then(
             function(success){

             console.log(success);
             },
             function(error){
             console.log(error);

             }).finally(function(){
             $timeout(function(){
             $ionicLoading.hide();
             }, 1000);
             });
             */


            /*BrandFive.addBrandFive({
             id_db: 1,
             code_marque: "GILLETTE",
             name: "GILLETTE"
             });
             BrandFive.addBrandFive({
             id_db: 2,
             code_marque: "DURACELL",
             name: "DURACELL"
             });
             BrandFive.addBrandFive({
             id_db: 3,
             code_marque: "PANTENE",
             name: "PANTENE"
             });
             BrandFive.addBrandFive({
             id_db: 4,
             code_marque: "ORALB",
             name: "ORALB"
             });*/
        }

        function syncGGG() {


            console.log(serverConfiguration);

            $ionicLoading.show({
                template: "Synchronisation en cours <br> " + serverConfiguration.name + ": " + serverConfiguration.ip + ""
            });


            //console.log(ip);
            SynchronisationV2.syncV2(infos.id_db, serverConfiguration.ip).then(
                function (success) {

                    console.log(success);
                    checkIfBrandFiveObjectifsWhereGoalReached();

                },
                function (error) {
                    console.log(error);

                }).finally(function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            });


        }

        function showCongratsPopup(brandNames) {
            console.log(brandNames);

            var popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "brandFiveCongrats.html",

                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            popUp.close();
                        }
                    }
                ],
                title: 'Félicitations !!!',
                subTitle: 'Vous avez atteint votre objectif dans les marques: ' + brandNames
            });
            console.log(popUp);

        }

        function checkIfBrandFiveObjectifsWhereGoalReached() {
            var brandFiveObjectifLines = [];
            BrandFive.getBrandLinesWhereGoalWasReached().then(
                function (brandLines) {
                    console.log(brandLines);
                    brandFiveObjectifLines = brandLines;
                    var brandNames = "";
                    for (var i = 0; i < brandLines.length; i++) {
                        brandNames += brandLines[i].name + (brandLines.length === i + 1 ? "." : ", ");
                        console.log(brandLines[i]);
                    }
                    console.log(brandNames);
                    if (brandNames !== "") {
                        showCongratsPopup(brandNames);
                    }
                }
                , function (error) {
                    console.log(error);
                });


        }


        function sync(code) {
            if (code == 0) {
                syncGGG();
            }
            else if (code == 1) {
                syncWifi();
            }
            else if (code == 2) {
                popUpWireChoice();
            }
            else {
                console.debug("NOTHING !");
            }
        }

        $scope.synchronization = function () {


            var popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "choixSync.html",

                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            var choice = $scope.choices.choosen;
                            popUp.close();
                            sync(choice);
                        }
                    }
                ],
                title: 'Choix',
                subTitle: '(' + $scope.choices.items.length + ')'
            });


            /*Retours.sync().then(

             function(success){
             console.debug(success);
             },
             function(error){
             console.debug(error);
             }).finally(function(){
             $timeout(function(){
             $ionicLoading.hide();
             }, 1000);
             });*/


            /*Promotions.syncPromotions()
             .then(
             function(success){
             console.debug(success);
             },
             function(error){
             console.debug(error);
             }).finally(function(){
             $ionicLoading.hide();
             });*/

            /*SynchronisationV2.syncCommandes(1).then(
             function(success){
             console.log(success);
             },
             function(error){
             console.log(error);
             }).finally(function(){
             console.log("final !");
             $timeout(function(){
             $ionicLoading.hide();
             }, 1000);
             });*/


        };
    })

    