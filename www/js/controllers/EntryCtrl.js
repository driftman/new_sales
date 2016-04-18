app.controller('EntryCtrl', function ($scope, DB, $rootScope, ionicDatePicker, $interval, $ionicPlatform, $cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2, $cordovaBatteryStatus, StockConcurrent, Charaka, Retours, Chargement, Parametrage, EntryPoint, DumpDB, Surveys, ModePaiement, ca, $timeout, IonicPopUpUtilities, $ionicPopup, CallSteps, $ionicLoading, $state, Routes, BrandFive, SBD, Commandes, Missions, Clients, Articles, Promotions, Marques, SynchronisationV2, $filter,$sce) {
//[{"condition":boolean,"content":htmlContent}...]



    $scope.body = '<div style="width:200px; height:200px; border:1px solid blue;">ddd</div>';

    $scope.myDate = new Date();

    $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 2,
      $scope.myDate.getDate());

    $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());
  
  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  }

    var infos;
    $scope.tablesToTrack=[
    {"displayName":"accounts","tableName":"accounts"},
    {"displayName":"articles SBD ","tableName":"article_sbd"},
    {"displayName":"articles","tableName":"articles"},
    {"displayName":"brand Five","tableName":"brand_five"},
    {"displayName":"etapes de vente","tableName":"call_steps"},
    {"displayName":"client osb","tableName":"client_osb"},
    {"displayName":"articles gratuite","tableName":"gratuite_article"},
    {"displayName":"marques","tableName":"marque"},
    {"displayName":"missions","tableName":"missions"},
    {"displayName":"missions","tableName":"missions_livreur"},
    {"displayName":"nouveaux clients","tableName":"new_clients"},
    {"displayName":"plans tarifaire","tableName":"plan_tarifaire"},
    {"displayName":"promotions","tableName":"promotions"},
    {"displayName":"quotas vendeur","tableName":"quota_vendeur"},
    {"displayName":"article de retour","tableName":"return_item"},
    {"displayName":"regles de retour","tableName":"returns"},
    {"displayName":"sous-marques","tableName":"sousmarques"},
    {"displayName":"questionnaires","tableName":"surveys"}
    ];

        $scope.today = new Date();

        var syncSBD = false;
        var sbdDetails = {};

        $interval( function() {
            $scope.today = new Date();
        },
        1000);

        $scope.infos = infos = JSON.parse(window.localStorage['profile'] || "{}");

      

        var isVendeur = typeof(infos.fonction) != "undefined" && infos.fonction == "vendeur";
        var isLivreur= typeof(infos.fonction) != "undefined" && infos.fonction == "livreur";

        var serverConfiguration = Parametrage.server();

        console.debug(isVendeur);

        $scope.isVendeur = isVendeur;
        $scope.isLivreur= isLivreur;

       

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

                title: "Demande de chargement",
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
                        text: "annuler",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                        }
                    }
                ],
                template: '<span style="font-size: 12px; font-weight: 600;"> <b style="font-weight: 900;">Charger</b>: Ajout d\'une nouvelle demande de chargement qui sera validée ou non par le magasinier à qui vous êtes affécté. </span>'

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


        var choices = [
            {title: "3G/WI-FI", code: 0},
            {title: "CABLE", code: 2}
        ];
        $scope.choices = {items: choices, choosen: 0};


        var methods = [
            {title: "Générer", code: 0},
            {title: "Synchroniser", code: 1}
        ];
        $scope.methods = {items: methods, choosen: 0};


        var parametrage = infos.parametrage || {};
        var sbd = parametrage.sbd || {};
        var needDownload = sbd.sbd_new || 0;
        var sbdMethods;
        $scope.sbdMethods;

        if(needDownload == 1)
        {
            sbdMethods = [
                {title: "Télecharger la brochure", code: 1}
            ];
            
            $scope.sbdMethods = {items: sbdMethods, choosen: 1};
        }
        else
        {
            sbdMethods = [
                {title: "Visualiser", code: 0}
            ];
            $scope.sbdMethods = {items: sbdMethods, choosen: 0};
        }


        


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
                    },
                    {
                        text: "ANNULER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                        }
                    }
                ],
                title: 'Brochure SBD',
                subTitle: '(' + $scope.sbdMethods.items.length + ')'
            });
        };

        $scope.progressValue = 0;

        function sbdOpen(code) {

            
            
            var PARENT_FOLDER = "file:///storage/sdcard0/";

            var FOLDER = "DCIM/new_sales/";

            var FILE_NAME = "brochure_sbd.pdf";

            var url = sbd.sbd_url || "";

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

                console.log("I'LL DOWNLOAD WITH THESE PARAMETERS : ", url, target, options, trustAllHosts);
                $ionicLoading.show(
                    {
                        templateUrl: 'spinner.html',
                        scope: $scope
                    });

                $cordovaFileTransfer.download(url, target, options, trustAllHosts)
                    .then(function (result) {

                        
                        console.log(JSON.stringify(result));

                        Parametrage.updateSBD(sbd).then(
                            function(success){
                                sbd.sbd_new = 0;

                                Parametrage.updateSBD(sbd);

                                var finalProfileObject = JSON.parse(window.localStorage["profile"] || "{}");

                                finalProfileObject.parametrage.sbd = sbd;

                                $scope.infos = infos = finalProfileObject;

                                sbdMethods = [
                                    {title: "Visualiser", code: 0}
                                ];
                                $scope.sbdMethods = {items: sbdMethods, choosen: 0};

                                window.localStorage["profile"] = JSON.stringify(finalProfileObject || {});

                            }, function(error){
                                console.log(JSON.stringigy(error));

                            })

                    }, function (err) {

                        console.log(JSON.stringify(err));
                        $ionicLoading.hide();

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


            DB.clean(infos.id_db).then(function(success){return success})
                      .then(function(success){

                            initializeCount($scope.tablesToTrack, SynchronisationV2.countDB($scope.tablesToTrack));
                        }).finally(function(){
                            SynchronisationV2.syncV2(infos.id_db, serverConfiguration.ip).then(
                                function (success) {
                                    $scope.infos = infos = JSON.parse(window.localStorage['profile'] || "{}");
                                    parametrage = infos.parametrage || {};
                                    sbd = parametrage.sbd || {};
                                    needDownload = sbd.sbd_new || 0;
                                    if(needDownload == 1)
                                    {
                                        var sbdMethods = [
                                            {title: "Télecharger la brochure", code: 1}
                                        ];

                                        $scope.sbdMethods = {items: sbdMethods, choosen: 1};
                                    }
                                },
                                function (error) {
                                    console.log(error);
                                }).finally(function () {

                                    infos = JSON.parse(window.localStorage['profile'] || "{}");
                                    $scope.infos = infos;
                                    computeCount($scope.tablesToTrack,SynchronisationV2.countDB($scope.tablesToTrack));
                                    checkIfBrandFiveObjectifsWhereGoalReached();

                                    $timeout(function () {
                                        $ionicLoading.hide();
                                    }, 1200);
                                    
                                });
                        });

            


           

    }

       
        function computeCount(list,promise){
            promise.then(function(success){
                var prefixAndCount="";
                list.forEach(function(item){
                     prefixAndCount=item.tableName+"Count";
                    item.diffCount=success[0][prefixAndCount]-item.diffCount;
                });
                console.log("list ",list," $scope.tablesToTrack ",$scope.tablesToTrack);
            },function(error){
                console.log(error, "happened in EntryCtrl::compute")
            })
        }

        function initializeCount(countTable,promise){
              promise.then(function(success){
               console.log('dbCount',success[0].accountsCount);
               var prefixAndCount="";
               var tempTable=countTable.map(function(item){
                   prefixAndCount=item.tableName+'Count';
                   item.diffCount=success[0][prefixAndCount];
                   return item;
               });
               countTable=tempTable;
               console.log("countTable ",countTable," $scope.tablesToTrack ",$scope.tablesToTrack);

           },function(error){

           });
          }

          function showCongratsPopup(brandNames,changedTables) {
                console.log(brandNames);
                $scope.changedTables=changedTables;
                $scope.brandNames=brandNames;
                var popUp = $ionicPopup.show({

                    scope: $scope,

                    templateUrl: "brandFiveCongrats.html",

                    buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            
                        }
                    }
                    ],
                    title: 'Resumé'
                });
                console.log(popUp);

            }

           function getBrandNames(brandLines){
            var brandNames = "";
                        for (var i = 0; i < brandLines.length; i++) {
                            brandNames += brandLines[i].name + (brandLines.length === i + 1 ? "." : ", ");
                            console.log(brandLines[i]);
                        }
                        return brandNames;

           }
           function getChangedTables(list){
            var prefixAndCount="";
            var test=false;
            var selectedElm=list.filter(function(item){
                test=item.diffCount>0;
                if(test){
                    item.displayName=item.displayName[0].toUpperCase()+item.displayName.substr(1);
                }
                return test;
            });
            return selectedElm;
           }
            function checkIfBrandFiveObjectifsWhereGoalReached() {
              
                BrandFive.getBrandLinesWhereGoalWasReached().then(
                    function (brandLines) {
                        console.log(brandLines);
                        var brandNames =getBrandNames(brandLines);
                        var changedTables=getChangedTables($scope.tablesToTrack);
                        if (brandNames !== "" || changedTables.length>0 ) {
                            showCongratsPopup(brandNames,changedTables);
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
    try{
        $scope.nouveau=$scope.infos.parametrage.sbd.sbd_new == 1 ? '(nouveau)' : '';
    }
    catch(err){
        $scope.nouveau='';
    }
    var tiles=[
        {"condition":true,"content":'<div class="col col-50" style="border: none;"><div class="card stable-bg ink ink-dark" ui-sref="app.profile" style="position: relative; box-shadow: 0 5px 5px 0 rgba(0, 150, 136, 0.54); background-color: rgb(0, 150, 136); min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="    color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Mes indicateurs</h3> </div> <i class="icon ion-speedometer" style="font-size: 55px; color: rgba(255,255,255,1); position: absolute; bottom: 10px; right: 10px;"></i> </div> </div>'},
        {"condition":true,"content":'<div class="col col-50" style="border: none;"> <div class="card stable-bg ink ink-dark" ui-sref="app.routes({ code : 0 })" style="position: relative; box-shadow: 0 5px 5px 0 rgba(244, 67, 54, 0.54); background-color: rgb(244, 67, 54); min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Ma Journée</h3> </div> <i class="icon ion-map" style="font-size: 55px; color: rgba(255,255,255,1); position: absolute; bottom: 10px; right: 10px;"></i> </div> </div>'},
        {"condition":true,"content":'<div class="col col-50" style="border: none;"> <div class="card stable-bg ink ink-dark" ng-click="sbdPopup()" style="position: relative; box-shadow: 0 5px 5px 0 rgba(33, 150, 243, 0.54); background-color: #2196F3; min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Brochure SBD '+ $scope.nouveau +'</h3> </div> <i class="icon ion-pricetag" style="font-size: 55px; position: absolute; bottom: 10px; right: 10px; color: rgba(255,255,255,1); float: right;"></i> </div> </div>'},
        {"condition":$scope.isVendeur||$scope.isLivreur,"content":'<div class="col col-50" style="border: none;"> <div class="card stable-bg ink ink-dark" ui-sref="app.dechargement" style="position: relative; box-shadow: 0 5px 5px 0 rgba(239, 108, 0, 0.54); background-color: rgb(239, 108, 0); min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Demande de déchargement</h3> </div> <i class="icon ion-android-bus" style="font-size: 55px; color: rgba(255,255,255,1); position: absolute; bottom: 10px; right: 10px;"></i> </div> </div>'},
        {"condition":true,"content":'<div class="col col-50" style="border: none;"> <div class="card stable-bg ink ink-dark" ui-sref="app.clients" style="position: relative; box-shadow: 0 5px 5px 0 rgba(255, 87, 34, 0.34); background-color: rgba(255, 87, 34, 0.9); min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Mes Clients</h3> </div> <i class="icon ion-ios-people" style="font-size: 55px; color: rgba(255,255,255,1); position: absolute; bottom: 10px; right: 10px;"></i> </div> </div>'},
        {"condition":$scope.isVendeur,"content":'<div  class="col col-50" style="border: none;"> <div class="card" ng-click="prepareChargement()" style="position: relative; box-shadow: 0 5px 5px 0 rgba(80, 90, 239, 0.54); background-color: rgb(97, 117, 250); min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Demande de chargement</h3> </div> <i class="icon ion-android-cart" style="font-size: 55px; color: rgba(255,255,255,1); position: absolute; bottom: 10px; right: 10px;"></i> </div> </div>'},
        //{"condition":!$scope.isVendeur,"content":'<div class="col col-50" style="border: none;"> <div class="card stable-bg ink ink-dark" ng-click="synchronization()" style="position: relative; box-shadow: 0 5px 5px 0 rgba(239, 83, 80, 0.54); background-color: rgb(239, 83, 80); min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="    color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Synchronisation</h3> </div> <i class="icon ion-android-upload" style="font-size: 55px; color: rgba(255,255,255,1); position: absolute; bottom: 10px; right: 10px;"></i> </div> </div>'},
        {"condition":$scope.isVendeur,"content":'<div class="col col-50" style="border: none;"> <div class="card stable-bg ink ink-dark" ui-sref="menu.configuration" style="position: relative; box-shadow: 0 5px 5px 0 rgba(239, 83, 80, 0.54); background-color: rgb(206, 67, 101); min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Configuration</h3> </div> <i class="icon ion-android-options" style="font-size: 55px; color: rgba(255,255,255,1); position: absolute; bottom: 10px; right: 10px;"></i> </div> </div>'},
        {"condition":false,"content":'<div class="col col-50" style="border: none;"> <div class="card stable-bg ink ink-dark" ui-sref="app.echange" style="position: relative; box-shadow: 0 5px 5px 0 rgba(80, 239, 96, 0.54); background-color: rgb(22, 164, 72); min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Echange (en cours de dév )</h3> </div> <i class="icon ion-arrow-swap" style="font-size: 55px; color: rgba(255,255,255,1); position: absolute; bottom: 10px; right: 10px;"></i> </div> </div>'},
        {"condition":true,"content":'<div class="col col-50" style="border: none;"> <div class="card stable-bg ink ink-dark" ng-click="synchronization()" style="position: relative; box-shadow: 0 5px 5px 0 rgba(239, 83, 80, 0.54); background-color: rgb(239, 83, 80); min-height: 130px; max-height: 200px; margin: 0;"> <div class="item item-text-wrap"> <h3 style="color: rgba(255,255,255,1); font-size: 14px; font-weight: 300;">Synchronisation</h3> </div> <i class="icon ion-android-upload" style="font-size: 55px; color: rgba(255,255,255,1); position: absolute; bottom: 10px; right: 10px;"></i> </div> </div>'}

    ];
    $scope.renderHtml = function () {
        var i=0;
        var tilesToShow=tiles.filter(function(item){return item.condition});
        var htmlToRender=tilesToShow.reduce(function(result,item){
                result+=(i%2==0)?'<div class="row" style="border: none;">'+item.content : item.content+'</div>';
                i++;
                return result;
            },
            "");
        htmlToRender=(i%2==0)?htmlToRender+'</div>':htmlToRender;
        return htmlToRender;
    };
    $scope.htmlToRender= $scope.renderHtml();

}).directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}]);

    