app.controller('CartCtrl', function ($log, $state, $stateParams, Depot, RollBack, ViewController, CartUtilities, $filter, $ionicLoading, IonicPopUpUtilities, PrinterService, Promotions, $timeout, $cordovaDatePicker, $cordovaFile, $scope, $ionicPopup, $cordovaPrinter, ca, position, Commandes, Accounts, Clients, Missions, LigneCommandes, Articles, ModePaiement) {

        $scope.ca = ca.ca;
        $scope.infos = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");

        var missionObject = JSON.parse(window.localStorage['mission'] || "{}");
        $scope.choice = {
            id: 0
        };

        $scope.choices = {items: [], choosen: 0};

        if (missionObject.typeClient != 2) {
            $scope.choices.choosen = -1;
        }

        Depot.get($scope.infos.id_db)
            .then(
                function (depots) {

                    if (depots.length > 0) {
                        angular.forEach(depots, function (depot) {
                            $scope.choices.items.push({title: depot.depot_name, code: depot.depot_id});
                        });
                    }
                    else {
                        $scope.choices.choosen = -1;
                    }

                },
                function (error) {
                    console.log(error);
                });


        $scope.currentDiscount = null;
        $scope.choosenMethod = null;

        // PAYMENT DATE !!
        $scope.paymentDate = new Date();
        // MODE PAIEMENTS METHODES !!
        $scope.paymentMethods = [];

        // MODE PAIEMENT !
        ModePaiement.getAll(missionObject.client_id).then(
            function (success) {
                console.log(success);
                $scope.paymentMethods = success;
            },
            function (error) {
                console.log(error);
            });
        // CHANGE LISTENER
        $scope.paymentChange = function (method) {
            $scope.choosenMethod = method;
            countDiscount($scope.choosenMethod, $scope.paymentDate);
        };

        $scope.openDatePicker = function () {
            $cordovaDatePicker.show({

                date: new Date(),
                mode: 'date',
                minDate: new Date(),
                maxDate: new Date() + 3 * 30 * 24 * 60 * 60 * 1000,
                allowOldDates: false,
                allowFutureDates: true,
                doneButtonLabel: 'OK',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'ANNULER',
                cancelButtonColor: '#000000'

            }).then(function (date) {
                console.log(date);
                $scope.paymentDate = date;
                countDiscount($scope.choosenMethod, date);
            });
        };
        function countDiscount(method, date) {
            ModePaiement.escompte(angular.copy(method), date)
                .then(
                    function (discount) {
                        $scope.currentDiscount = discount;
                    });
        }

        // TOTAL INITIALIZATION TO 0 !
        $scope.totalTTC = 0;
        $scope.totalHT = 0;

        //Promotions conflicts !
        $scope.groups = [];

        // PROPER TO THE MODAL !
        $scope.nextPopUpShow = true;
        $scope.previousPopUpShow = false;

        $scope.group = [];

        $scope.currentIndex = 0;

        $scope.promotionDiscount = 0;

        $scope.data = {};

        $scope.data.items = [];

        $scope.totalTTC = 0;

        $scope.totalHT = 0;

        $scope.charaka = 0;

        var charakasUpdate = [];

        var totalFactureDiscounts = 0;

        $scope.checkOut = function () {
            //
            checkOutPopup();
        };


        function checkOutPopup() {
            var myPopup = $ionicPopup.alert({
                title: "Validation",
                buttons: [
                    {
                        text: "oui",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            checkOut();
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
                template: '<span style="font-size: 12px; font-weight: 600;">Etes-vous sûr de vouloir valider ?</span>'
            });
        }

        function checkOut() {


            if (!missionObject.concluded) {
                if ($scope.currentDiscount != null && $scope.choosenMethod != null && $scope.choices.choosen != 0) {
                    var cartObject = JSON.parse(window.localStorage['cart'] || "{}");

                    if ($scope.choices.choosen != -1) {
                        missionObject.depot = $scope.choices.choosen;
                    }
                    else {
                        missionObject.depot = null;
                    }

                    var local = missionObject.local == 1;

                    missionObject.exitDate = new Date().getTime();

                    console.log(missionObject);

                    window.localStorage["mission"] = JSON.stringify(missionObject);

                    $ionicLoading.show({
                        template: "finalisation de la vente en cours ..."
                    });


                    Missions.checkOut(
                        missionObject.id_mission,
                        //CartUtilities.getCartItems(),
                        angular.copy($scope.data.items),
                        local,
                        angular.copy($scope.choosenMethod.id),
                        angular.copy($scope.paymentDate),
                        $scope.totalTTC,
                        $scope.totalHT,
                        cartObject.discountHistory || [],
                        $scope.currentDiscount,
                        totalFactureDiscounts,
                        $scope.charaka,
                        charakasUpdate
                    ).then(
                        function (success) {
                            //console.log(success);
                            //$ionicPopup.alert(IonicPopUpUtilities.alert("Succès !", "La commande a bien été enregistrée !"));
                            $ionicLoading.show({template: "La commande a bien été enregistrée !"});

                            $timeout(function () {
                                missionObject.concluded = true;
                                window.localStorage['mission'] = JSON.stringify(missionObject);
                                if (position.hasNext) {
                                    if (position.nextStep.name != "app.brands") {
                                        $state.transitionTo(position.nextStep.name);
                                    }
                                    else {
                                        $state.transitionTo(position.nextStep.name, {
                                            vendeur: isVendeur,
                                            chargement: false,
                                            prelevement: false,
                                            retour: false
                                        });
                                    }
                                }
                                else {
                                    CartUtilities.clearVisit()
                                        .then(function (success) {
                                            $state.transitionTo("menu.entry");
                                        });
                                }
                            }, 1200);

                        },
                        function (error) {

                            console.log(error);
                            $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur !", "Erreur lors de l'enregistrement \n :" + JSON.stringify(error) + " \n En cours de dévelopement !"));

                            RollBack.mission(error).then(
                                function (success2) {
                                    console.debug(success2);
                                },
                                function (error2) {
                                    console.debug(error2);
                                });
                        }).
                    finally(function () {
                        $timeout(function () {
                            $ionicLoading.hide();
                        }, 1000);
                    });
                }
                else if ($scope.choosenMethod == null) {
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Veuillez choisir une méthode de paiement"));
                }
                else if ($scope.choices.choosen == 0) {
                    var popUpDepots = $ionicPopup.alert({

                        templateUrl: "depots.html",
                        scope: $scope,
                        title: "Veuillez choisir un entrepôt",
                        buttons: [
                            {
                                text: "OK",
                                type: "button-assertive",
                                cssClass: "assertive-survey",
                                onTap: function (e) {

                                }
                            }
                        ]
                    });
                }
                else {
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "En cours de dévelopement .."));
                }
            }
            else {
                var donePopUp = $ionicPopup.alert({

                    title: "Déjà enregistré !",
                    buttons: [
                        {
                            text: "OK",
                            type: "button-assertive",
                            cssClass: "assertive-survey",
                            onTap: function (e) {
                                e.preventDefault();
                                donePopUp.close();
                                if (position.hasNext) {
                                    if (position.nextStep.name != "app.brands") {
                                        $state.transitionTo(position.nextStep.name);
                                    }
                                    else {
                                        $state.transitionTo(position.nextStep.name, {
                                            vendeur: isVendeur,
                                            chargement: false,
                                            prelevement: false,
                                            retour: false
                                        });
                                    }
                                }
                                else {
                                    CartUtilities.clearVisit()
                                        .then(function (success) {
                                            $state.transitionTo("menu.entry");
                                        });
                                }
                            }
                        }
                    ],
                    template: '<span style="font-size: 12px; font-weight: 600;"> La commande est déjà enregistrée </span>'

                });
            }
        };

        init();

        function init() {
            $scope.data.items = [];
            $scope.promotionDiscount = 0;
            var done = false;
            CartUtilities.getCartItems()
                .then(function (input) {

                    console.debug(input);

                    var items = input.items;

                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];

                        if (Object.prototype.toString.call(item) != "[object Array]") {
                            if (item.prixVente != 0) {
                                console.debug(item);

                                item.ht = item.ht - item.remise;

                                var tva = (typeof(item.tva) != "undefined" && item.tva != null && item.prixVente > 0) ? item.ht * item.tva / 100 : 0;

                                console.debug(tva);

                                item.ttc = item.ht + tva;

                                $scope.totalTTC += item.ttc;

                                $scope.totalHT += item.ht;
                            }
                            $scope.data.items.push(item);
                        }
                        else {
                            $scope.groups.push({conflicts: item, choosen: null});
                        }
                        if (i == items.length - 1) {
                            // FOR COMMANDE DISCOUNT !!
                            var discounts = input.discounts;

                            //SORTING THE PROMOTIONS !!
                            discounts = discounts.sort(function (a, b) {
                                a = a.priorite;
                                b = b.priorite;

                                if (a > b) {
                                    return 1;
                                }
                                else if (a < b) {
                                    return -1;
                                }
                                else {
                                    return 0;
                                }
                            });
                            // AN EMPTY THAT WILL HOLD ALL THE FINAL DETAILED DISCOUNTS!
                            // AND THEN SAVED INTO CART ITEMS DISCOUNT HISTORY OBJEECT !
                            var discounts_history = [];
                            totalFactureDiscounts = 0;

                            angular.forEach(discounts, function (discount, discountsIndex) {
                                discount.value = $scope.totalTTC;
                                discount.rank = discountsIndex + 1;
                                discount.remiseP = discount.remise;
                                discount.remiseV = discount.value * (discount.remiseP / 100);
                                totalFactureDiscounts += discount.remiseV;
                                $scope.totalTTC = $scope.totalTTC - discount.remiseV;
                                $scope.promotionDiscount += discount.remiseV;
                                discounts_history.push(discount);
                                if (discountsIndex == discounts.length - 1) {
                                    var cart = JSON.parse(window.localStorage["cart"]);
                                    cart.discountHistory = discounts_history;
                                    window.localStorage["cart"] = JSON.stringify(cart);
                                }
                            });

                            // CHARAKAS PART !!
                            charakasProcess();
                            // GIFTS CHOICES !!
                            promptGiftsOrAddThem();
                        }
                    }

                });


            function charakasProcess() {
                var charakas = JSON.parse(window.localStorage["charakas"] || "[]");
                charakasUpdate = [];
                angular.forEach(charakas, function (charaka, $index) {

                    var given = 0;

                    if (charaka.reste < $scope.totalTTC) {
                        given = charaka.reste;
                        $scope.totalTTC -= given;
                        $scope.charaka += charaka.reste;
                        charaka.reste = 0;
                    }
                    else if ($scope.totalTTC > 0) {
                        given = $scope.totalTTC;
                        $scope.charaka += $scope.totalTTC;
                        charaka.reste -= $scope.totalTTC;
                        $scope.totalTTC = 0;
                    }

                    charakasUpdate.push({id: charaka.id, reste: charaka.reste, given: given});

                });
            }

            function promptGiftsOrAddThem() {
                var change = JSON.parse(window.localStorage["change"] || "true");
                var gifts = JSON.parse(window.localStorage['gifts'] || "[]");
                if (!change && gifts.length > 0) {
                    console.debug("Add them directly !");
                    for (var i = 0; i < gifts.length; i++) {
                        $scope.data.items.push(gifts[i]);
                    }
                }
                else {
                    if ($scope.groups.length >= 1) {
                        showPopup();
                        $scope.group = $scope.groups[$scope.currentIndex];
                        if ($scope.groups.length == 1) {
                            $scope.nextPopUpShow = false;
                        }

                    }
                }

            }
        }


        $scope.hello = function (group, index) {
            group.choosen = index;
        };


        $scope.previousPopUp = function () {
            $scope.group = $scope.groups[--$scope.currentIndex];
            $scope.nextPopUpShow = true;
            if ($scope.currentIndex == 0) {
                $scope.previousPopUpShow = false;
            }
        };
        $scope.nextPopUp = function () {

            $scope.group = $scope.groups[++$scope.currentIndex];
            $scope.previousPopUpShow = true;
            if ($scope.currentIndex == $scope.groups.length - 1) {
                $scope.nextPopUpShow = false;
            }
        };

        $scope.checked = function (group, index) {
            if (group.choosen == index) {
                return true;
            }
            else {
                return false;
            }
        }

        function checkIfConflictRemaining() {
            var groups = angular.copy($scope.groups)
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].choosen == null) {
                    return true;
                }
            }
            return false;
        }

        function addChoosenGifts() {
            var groups = angular.copy($scope.groups);
            var savedGifts = [];
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                var index = group.choosen;
                var _loopContinue = false;
                for (var j = 0; j < group.conflicts.length; j++) {
                    if (j == index) {
                        var items = group.conflicts[j];
                        savedGifts = savedGifts.concat(items);
                        for (var k = 0; k < items.length; k++) {
                            var item = items[k];
                            $scope.data.items.push(item);
                        }
                        _loopContinue = true;
                        continue;
                    }
                }
                if (_loopContinue) {
                    continue;
                }
            }
            window.localStorage['gifts'] = JSON.stringify(savedGifts);
            window.localStorage["change"] = "false";
        }

        $scope.msg = "title";

        function showPopup() {
            var popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "gratuites.html",


                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            if (checkIfConflictRemaining()) {
                                console.debug("mazal");
                            }
                            else {
                                addChoosenGifts();
                                popUp.close();
                            }
                        }
                    }
                ],
                title: 'Gratuités',
                subTitle: '(' + $scope.groups.length + ')'
            });
            console.debug(popUp);
        }


        var promotionsSuccess = [];
        var replace = true;


        $scope.print = function () {

            //console.log(JSON.stringify());


            PrinterService.formatedContent([angular.copy($scope.data.items), JSON.parse(window.localStorage['mission'] || '{}'), $scope.totalHT, $scope.totalTTC, 0.7], "Pre-vendeur")
                .then(
                    function (content) {

                        cordova.exec(
                            function (success) {
                                $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Facture imprimée avec succès"));
                                var mission = JSON.parse(window.localStorage['mission'] || "{}");
                                mission.cancel = false;
                                window.localStorage['cart'] = JSON.stringify(mission);
                            },
                            function (fail) {
                                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth"));
                            },
                            "ZebraBluetoothPrinter",
                            "zebra",
                            [content]);
                    }).finally(function () {

            });
        };

        $scope.cancel = function () {
            var mission = JSON.parse(window.localStorage['mission'] || "{}");
            if (typeof(mission.cancel) == "undefined" || mission.cancel) {
                if (mission.local == 1) {
                    console.debug("LOCAL !!");
                    cancelProcess();
                }
                else {
                    console.debug("NOT LOCAL !!");
                    Missions.cancel(mission.id_mission)
                        .then(
                            function (success) {
                                console.debug(success);
                                cancelProcess();
                            },
                            function (error) {
                                $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Erreur lors de l\'annulation de la visite "));
                            })
                }
            }
            else {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur !", "Vous n'êtes pas autorisé à annuler une commande après l'impression. "));
            }
        }

        function cancelProcess() {
            CartUtilities.clearVisit().then(
                function (success) {
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Annulée", "La visite a bien été annulée "));
                    $state.transitionTo("menu.entry");
                },
                function (error) {
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Erreur lors de l\'annulation de la visite "));
                })

        }

        $scope.footerBar = true;
        window.addEventListener("native.keyboardshow", keyboardShowHandler);
        window.addEventListener("native.keyboardhide", keyboardHideHandler);
        function keyboardShowHandler(e) {
            $scope.footerBar = false;
        }

        function keyboardHideHandler(e) {
            $scope.footerBar = true;
        }

        $scope.hasNext = position.hasNext;
        $scope.hasPrevious = position.hasPrevious;

        $scope.next = function () {

            checkOutPopup();
            /* var cart = JSON.parse(window.localStorage['cart'] || '{}');

             var items = cart.items;

             PrinterService.formatedContent( [angular.copy($scope.data.items), JSON.parse(window.localStorage['mission'] || '{}'), $scope.data.ht, $scope.data.ttc, $scope.currentDiscount ],"Pre-vendeur" )
             .then(
             function(success){
             console.log(success);
             cordova.plugins.zbtprinter.print(success,
             function(success) {
             $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Facture imprimée avec succès"));
             }, function(fail) {
             $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth"));
             }
             );
             }).finally(function(){
             //$ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "-"));
             });

             if($scope.currentMethod != null && typeof($scope.currentMethod) != "undefined")
             {
             $scope.pay();
             if($scope.hasNext)
             {
             $state.transitionTo(position.nextStep.name, { vendeur: true, chargement: false });
             }
             else
             {
             $state.transitionTo("app.profile");
             }
             }
             else
             {
             $ionicPopup.alert({
             title: "Etape manquante !",
             buttons: [
             {
             text: "Terminer",
             type: "button-assertive",
             cssClass: "assertive-survey"
             }
             ],
             template: '<span style="font-size: 12px; font-weight: 600;">Veuillez choisir une méthode de paiement !</span>'
             });
             }*/
        };
        $scope.previous = function () {
            if (position.hasPrevious) {
                $state.transitionTo(position.previousStep.name, {vendeur: true, chargement: false});
            }
        };


    })

    