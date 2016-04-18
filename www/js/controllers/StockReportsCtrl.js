app.controller('StockReportsCtrl', function ($scope, $ionicPopup, $state, $timeout, IonicPopUpUtilities, $ionicLoading, $cordovaPrinter, PrinterService, CartUtilities, Chargement, Stock, ViewController,$stateParams) {
    $scope.$parent.clearFabs();

        $scope.$parent.setHeaderFab('none');

    $scope.stockOnly = typeof($stateParams.stockOnly) != "undefined" && $stateParams.stockOnly=="true";
    console.log($stateParams);
    var profile = JSON.parse(window.localStorage["profile"] || "{}");

    // TWO WAY DATA BINDING
    $scope.stock = [];
    var isVendeur = $scope.isVendeur = profile.fonction == "vendeur" ? true : false;
    //

    ////////////////// ACTIONS
    $scope.print = function () {
        console.log("print2 !");
    };

    $scope.menu = function () {
        $state.transitionTo("menu.entry");
    };

    $scope.change = function (article) {
        change(article);
    };

    /*$scope.discard = function(){
     //window.localStorage.removeItem("dechargement")
     PrinterService.formatedContentStock([angular.copy($scope.stock)]).then(
     function(success){
     console.log(success);
     cordova.plugins.zbtprinter.print(success,
     function(success) {
     $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Facture imprimée avec succès"));
     var mission = JSON.parse(window.localStorage['mission'] || "{}");
     mission.cancel = false;
     window.localStorage['cart'] = JSON.stringify(mission);
     }, function(fail) {
     $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth"));
     }
     );
     },
     function(error){
     console.debug(error);
     });
     };*/

    $scope.confirm = function () {

        var myPopup = $ionicPopup.alert({
            title: "Etes-vous sûr de vouloir valider ?",
            buttons: [
                {
                    text: "oui",
                    type: "button-assertive",
                    cssClass: "assertive-survey",
                    onTap: function (e) {
                        e.preventDefault();
                        action();
                        myPopup.close();
                    }
                },
                {
                    text: "non",
                    onTap: function (e) {

                    },
                    type: "button-assertive",
                    cssClass: "assertive-survey"
                }
            ],
            template: '<span style="font-size: 12px; font-weight: 600;">Les modifications aûront un impact sur votre stock mobile.</span>'
        });

    };

    function action() {
        $ionicLoading.show({template: "Validation de votre demande en cours ... "});
        var cart = JSON.parse(window.localStorage["dechargement"] || "{}");
        var items = typeof(cart.items) != "undefined" ? cart.items : [];
        var scopeItems = angular.copy($scope.stock);
        console.log(scopeItems);
        Stock.recoverItemsWithNoValues(scopeItems)
            .then(
                function (success) {
                    console.debug(success);

                    ///////////////////////////////////////////////////////
                    if (items.length > 0) {
                        Chargement.dechargement(profile.id_db, items).then(
                            function (success) {
                                console.debug(success);
                                CartUtilities.clearVisit().then(function () {


                                });
                            },
                            function (error) {
                                console.debug(error);
                            }).
                        finally(function () {

                            $timeout(function () {

                                    init();
                                    $ionicLoading.hide();

                                }
                                , 1500);
                        });
                    }
                    else {
                        // DELETE ALL NON SYNCED DECHARGEMENTS !
                        //console.debug("ERROR");
                        Chargement.clearNonSyncedDechargements()
                            .then(
                                function (success) {
                                    init();
                                },
                                function (error) {
                                    console.debug("ERROR WHILE CLEARING ! ");
                                    init();
                                }).finally(function () {

                            $timeout(
                                function () {

                                    init();

                                    $ionicLoading.hide();
                                }
                                , 1500);
                        });
                    }
                    ///////////////////////////////////////////////////////
                },
                function (error) {
                    console.debug(error)
                });


    }

    /////////////////CANCELING DECHARGEMENT !


    $scope.discard = function () {
        if($scope.stockOnly){
         discard();
        }
        else{
        var myPopup = $ionicPopup.alert({
            title: "<h5>Etes-vous sûr de vouloir annuler ?</h5>",
            buttons: [
                {
                    text: "oui",
                    type: "button-assertive",
                    cssClass: "assertive-survey",
                    onTap: function (e) {
                        e.preventDefault();
                        discard();
                        myPopup.close();
                    }
                },
                {
                    text: "non",
                    onTap: function (e) {

                    },
                    type: "button-assertive",
                    cssClass: "assertive-survey"
                }
            ],
            template: '<span style="font-size: 12px; font-weight: 500;"> Les modifications que vous avez fait ne seront pas prise en considération</span>'
        });
        }
    };

    function discard() {
        window.localStorage.removeItem("dechargement");
        if (profile.fonction == "livreur") {
            $state.transitionTo("menu.entry2");
        }
        else {
            $state.transitionTo("menu.entry");
        }
    }

    /////////////////////////////////////////


    // SERVICES !!
    // INITIALIZERS !!

    init();

    function change(article) {
        ViewController.check(article, false, isVendeur, false, false, true);
    }

    function init() {
        window.localStorage.removeItem("dechargement");

        $scope.stock = [];

        Stock.get(profile.id_db).then(
            function (success) {
                console.debug(success);
                success = ViewController.prepare(success, null, false, false, false, true);
                console.debug(success);
                angular.forEach(success, function (ligne, index) {

                    var packet = Math.trunc(ligne.totalStock / ligne.unitConversion);
                    var unit = ligne.totalStock % ligne.unitConversion;

                    ligne.caisse = packet;
                    ligne.unite = unit;

                    ligne.csUn = packet + ", " + unit;
                    ligne.stockPacket=packet;
                    ligne.stockUnit=unit;

                    if (ligne.packet > 0 || ligne.unit > 0) {
                        change(ligne);
                    }
                    $scope.stock.push(ligne);
                });
            },
            function (error) {
                console.debug(error);
            });
    }


})

    