app.controller('CartLivreurCtrl', function (Articles, DB, $cordovaDatePicker, Missions, RollBack, $scope, $timeout, $state, $ionicPopup, DateUtilities, PrinterService, Livreur, IonicPopUpUtilities, $ionicLoading, Missions, SBD, Promotions, ModePaiement, CartUtilities, ViewController) {
        /* $ionicLoading.show({
         template: "Chargement des articles ..."
         });*/
        var infos = JSON.parse(window.localStorage["profile"] || "{}");
        var mission = JSON.parse(window.localStorage["mission"] || "{}");

        // PRINTED ITEMS !!
        var finalItems;


        function cleanToPrint(input)
        {
            console.log(input.length);
            for(var i = input.length - 1 ; i >= 0 ; i--)
            {
                var item = input[i];
                if(Articles.outOfStock(item) && item.isGift == 0)
                {
                    input.splice(i, 1)
                }
            }
            return input;
        }


       $scope.print = function () {

            finalItems = cleanToPrint(angular.copy($scope.data.items));

            if($scope.choosenMethod == null || $scope.currentDiscount == null)
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Action manquante", "Veuillez choisir une méthode de paiement"));
            }
            else
            {
                PrinterService.formatedContent([finalItems, JSON.parse(window.localStorage['mission'] || '{}'), $scope.totalHT, $scope.totalTTC, $scope.currentDiscount], "Livreur")
                .then(
                    function (content) {

                        var mission = JSON.parse(window.localStorage["mission"] || "{}");
                        mission.contentToPrint = content;
                        mission.cancel = false;
                        window.localStorage["mission"] = JSON.stringify(mission || {});

                        cordova.exec(
                            function (success) {
                                $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Facture imprimée avec succès"));
                                
                                mission.cancel = false;
                                window.localStorage['mission'] = JSON.stringify(mission || {});
                            },
                            function (fail) {
                                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth"));
                            },
                            "ZebraBluetoothPrinter",
                            "zebra",
                            [content]);
                    }).finally(function () {

                    });
            }
        };


        $scope.cancel = function () {

            var mission = JSON.parse(window.localStorage["mission"] || "{}");
            if(typeof(mission.cancel) != "undefined" && mission.cancel == false)
            {
                var popUpMessage = $ionicPopup.alert(
                {
                    title: "Action non valide",
                    template: 'Vous ne pouvez pas annuler une livraison après impression de la facture ',
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
            else
            {
                var popUpCancel = $ionicPopup.alert(
                {
                    title: "ANNULATION DE LA LIVRAISON",
                    template: '<b>Etes-vous sûr de vouloir annuler la livraison ? </b>',
                    buttons: [
                        {
                            text: "OUI",
                            type: "button-assertive",
                            cssClass: "assertive-survey",
                            onTap: function (e) {
                                e.preventDefault();
                                popUpCancel.close();
                                cancel();
                            }
                        },

                        {
                            text: "NON",
                            type: "button-assertive",
                            cssClass: "assertive-survey",
                            onTap: function (e) {
                            }
                        }
                    ]
                });
            }


        };


        function cancel() {
            DB.query("UPDATE missions SET state = 2 WHERE id_db = " + mission.missionId + ";")
                .then(
                    function (success) {
                        CartUtilities.clearVisit().then(function () {
                            $state.go("menu.entry2");
                        });
                    },
                    function (error) {
                        console.log(error);
                    });
        }

        $scope.finish = function () {
            var items;
            if( typeof(finalItems) == "undefined" )
            {
                items = angular.copy($scope.data.items);
            }
            else
            {
                items = finalItems;
            }

            console.log(JSON.stringify(items));
            var outOfStock = false;
            var atLeastOne = false;

            for (var i = items.length - 1; i >= 0; i--) {
                var item = items[i];
                if (item.prixVente > 0) {
                    var current = (item.packet * item.unitConversion) + item.unit;
                    if (current > item.totalStock) {
                        item.valid = false;
                        outOfStock = true;
                    }
                    else {
                        item.valid = true;
                        atLeastOne = true;
                    }
                }
                else {
                    item.valid = true;
                }
            }


            if (!atLeastOne) {
                var popUpOutLeastOne = $ionicPopup.alert(
                    {
                        title: "STOCK INSUFFISANT",
                        template: '<b>Aucun des articles ne respecte les quantités disponibles en stock</b> <br> <br> - En cliquant sur "OK" les articles avec des quantités supérieurs aux celles disponible en stock seront ignorés. <br> <br> - Les gratuitées seront prises en considération.',
                        buttons: [
                            {
                                text: "OK",
                                type: "button-assertive",
                                cssClass: "assertive-survey",
                                onTap: function (e) {
                                    e.preventDefault();
                                    popUpOutLeastOne.close();
                                    finish(items);
                                }
                            },

                            {
                                text: "ANNULER",
                                type: "button-assertive",
                                cssClass: "assertive-survey",
                                onTap: function (e) {
                                }
                            }
                        ]
                    });
            }
            else if (outOfStock) {
                var popUpOutOfStock = $ionicPopup.alert(
                    {
                        title: "STOCK INSUFFISANT",
                        template: '<b>Les quantitées saisies ne sont pas disponible</b> <br> <br> - En cliquant sur "OK" les articles avec des quantités supérieurs aux celles disponibles en stock seront ignorés. <br> <br> - Les gratuitées seront prises en considération.',
                        buttons: [
                            {
                                text: "OK",
                                type: "button-assertive",
                                cssClass: "assertive-survey",
                                onTap: function (e) {
                                    e.preventDefault();
                                    popUpOutOfStock.close();
                                    finish(items);
                                }
                            },

                            {
                                text: "ANNULER",
                                type: "button-assertive",
                                cssClass: "assertive-survey",
                                onTap: function (e) {
                                }
                            }
                        ]
                    });
            }
            else {
                var popUpOutFinish = $ionicPopup.alert(
                    {
                        title: "QUANTITES CORRECTES",
                        template: '<b>Etes-vous sûr de vouloir cloturer la livraison ?</b>',
                        buttons: [
                            {
                                text: "OUI",
                                type: "button-assertive",
                                cssClass: "assertive-survey",
                                onTap: function (e) {
                                    e.preventDefault();
                                    popUpOutFinish.close();
                                    finish(items);
                                }
                            },

                            {
                                text: "ANNULER",
                                type: "button-assertive",
                                cssClass: "assertive-survey",
                                onTap: function (e) {
                                }
                            }
                        ]
                    });
            }
            //console.log(items);

        };

        function addContentPrint() {
            var cartObject = JSON.parse(window.localStorage["cart"] || "{}");
            var missionObject = JSON.parse(window.localStorage["mission"] || "{}");
            PrinterService.formatedContent([angular.copy($scope.data.items), JSON.parse(window.localStorage['mission'] || '{}'), $scope.totalHT, $scope.totalTTC, $scope.currentDiscount], "Livreur")
                    .then(
                        function (content) {

                            
                            missionObject.contentToPrint = content;
                            missionObject.cancel = false;
                            console.log(missionObject)
                            window.localStorage["mission"] = JSON.stringify(missionObject || {});
                        });
        }

        function finish(items) {

            var cartObject = JSON.parse(window.localStorage["cart"] || "{}");
            var missionObject = JSON.parse(window.localStorage["mission"] || "{}");
            missionObject.exitDate = new Date().getTime();
            window.localStorage["mission"] = JSON.stringify(missionObject);

            if($scope.currentDiscount == null || $scope.choosenMethod == null)
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Méthode de paiement", "Veuillez choisir une méthode de paiement avant de finaliser la livraison"));
            }
            else
            {
                console.log("BEFORE");
                console.log(items);
                console.log($scope.currentDiscount);
                console.log($scope.choosenMethod);
                

                for (var i = items.length - 1; i >= 0; i--) {
                    (function (i) {
                        var item = items[i];
                        if (item.prixVente > 0 && Articles.outOfStock(item)) {
                            console.log("THIS ONE ");
                            console.log(item);
                            items.splice(i, 1);
                        }
                        else {
                            item.valid = true;
                        }
                    })(i);
                }

                console.log("AFTER");
                console.log(items);


                $ionicLoading.show({template: "Finalisation de la livraison en cours ..."});

                PrinterService.formatedContent([items, JSON.parse(window.localStorage['mission'] || '{}'), $scope.totalHT, $scope.totalTTC, $scope.currentDiscount], "Livreur")
                    .then(
                        function (content) {


                            
                            missionObject.contentToPrint = content;
                            missionObject.cancel = false;
                            window.localStorage["mission"] = JSON.stringify(missionObject || {});

                            Missions.checkOut(
                            missionObject.missionId,
                            //CartUtilities.getCartItems(),
                            items,
                            0,
                            angular.copy($scope.choosenMethod.id_db),
                            angular.copy($scope.paymentDate),
                            $scope.totalTTC,
                            $scope.totalHT,
                            cartObject.discountHistory || [],
                            $scope.currentDiscount,
                            totalFactureDiscounts,
                            $scope.charaka,
                            charakasUpdate,
                            true
                        ).then(
                            function (success) {
                                //console.log(success);
                                //$ionicPopup.alert(IonicPopUpUtilities.alert("Succès !", "La commande a bien été enregistrée !"));
                                $ionicLoading.show({template: "La commande a bien été enregistrée !"});

                                $timeout(function () {
                                    CartUtilities.clearVisit().then(
                                        function(success){
                                            $state.go("app.profile2");
                                        });
                                    
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
                        });
                
                
            }
        }

        $scope.choice = {
            id: 0
        };

        $scope.currentDiscount = null;
        $scope.choosenMethod = null;

        // PAYMENT DATE !!
        $scope.paymentDate = new Date();
        // MODE PAIEMENTS METHODES !!
        $scope.paymentMethods = [];

        // MODE PAIEMENT !
        ModePaiement.getAll(mission.clientId).then(
            function (success) {
                console.log(success);
                $scope.paymentMethods = success;
            },
            function (error) {
                $log.error(error);
            });
        // CHANGE LISTENER
        /*$scope.paymentChange = function (method) {
            console.log($scope.paymentMethods);
            $scope.choosenMethod = method;
            countDiscount($scope.choosenMethod, $scope.paymentDate);
        };*/
		   $scope.timbre=0;
        $scope.paymentChange = function (method) {
        $scope.choosenMethod = method;
        var timbre=JSON.parse(window.localStorage['timbre']||{});
        var mission=JSON.parse(window.localStorage['mission']||{});
        if(timbre.type==method.id_db && $scope.totalHT>0){
            $scope.timbre=(timbre.percentage/100)*$scope.totalHT>50?50:(timbre.percentage/100)*$scope.totalHT;
            $scope.totalHT=$scope.totalHT+$scope.timbre;
            $scope.totalTTC=  $scope.totalTTC+$scope.timbre;

        }
        else{
            $scope.totalHT=$scope.totalHT-$scope.timbre;
            $scope.totalTTC=  $scope.totalTTC-$scope.timbre;
            $scope.timbre=0;
        }
        mission.timbre=$scope.timbre;
        window.localStorage["mission"]=JSON.stringify(mission);
        countDiscount($scope.choosenMethod, $scope.paymentDate);



    };


        var popUp = null;

        $scope.data = {};
        $scope.currentDiscount = 0;
        $scope.promotionDiscount = 0;
        $scope.data.items = [];
        $scope.totalTTC = 0;
        $scope.totalHT = 0;
        //Promotions conflicts !
        $scope.groups = [];

        // PROPER TO THE MODAL !
        $scope.nextPopUpShow = true;
        $scope.previousPopUpShow = false;
        $scope.currentIndex = 0;

        $scope.hello = function (group, index) {
            group.choosen = index;
        };

        var charakasUpdate = [];
        var totalFactureDiscounts = 0;

        var payments = [];

        function init() {
            //console.log("INITIALIZATION");

            $scope.totalTTC = 0;

            $scope.totalHT = 0;

            var cart = JSON.parse(window.localStorage["cart"] || "{}");
            var items = cart.items || [];
            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                if (item.totalStock > 0 && item.prixVente > 0) {
                    check(item);
                }
            }

            update();
        }

        init();

        function update() {

            

            $scope.totalTTC = 0;

            $scope.totalHT = 0;

            console.log("UPDATE");

            //$scope.groups = [];

            CartUtilities.getCartItems()
                .then(function (input) {

                    console.log(input);

                    console.debug(input);
                    $scope.data.items = [];

                    $scope.groups = [];

                    var items = input.items;

                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];

                        if (Object.prototype.toString.call(item) != "[object Array]") {
                            // IGNORING OUT OF STOCK && GIFTS !
                            if (item.prixVente > 0 && ( item.totalStock >= ( (item.packet * item.unitConversion) + item.unit ) )) {
                                console.debug(item);

                                item.ht = item.ht - item.remise;

                                var tva = (typeof(item.tva) != "undefined" && item.tva != null && item.prixVente > 0) ? item.ht * item.tva / 100 : 0;

                                item.ttc = item.ht + tva;

                                $scope.totalTTC += item.ttc;

                                $scope.totalHT += item.ht;
                            }
                            $scope.data.items.push(item);
                        }
                        else {
                            //console.log("gift");
                            $scope.groups.push({conflicts: item, choosen: null});
                            //console.log($scope.groups);
                        }
                        if ((i == items.length - 1)) {
                            // FOR COMMANDE DISCOUNT !!
                            var discounts = input.discounts;

                            console.log(discounts);

                            //console.log(discounts);

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
                            //charakasProcess();
                            // GIFTS CHOICES !!
                            promptGiftsOrAddThem();
                        }
                    }

                });
            /*$scope.data.items = [];
             var cart = JSON.parse(window.localStorage['cart'] || "{}");
             for(var i = 0 ; i < cart.items.length ; i++)
             {
             var item = cart.items[i];
             var units = item.stock % unit.unitConversion;
             var packets = Math.trunc(item.stock / item.unitConversion);
             item.stock = packets+", "+units;
             $scope.data.items.push(item);
             }
             cart = JSON.parse(window.localStorage['cart']);*/
            //var object = Promotions.promotionDiscountsWithPriorities();
            //$scope.data.ht = object.ht;
            //$scope.data.ttc = object.ttc;

        }


        function addGiftsToCart() {

        }

        $scope.check = function (item) {
            check(item);
            update();
        };

        function check(item) {
            ViewController.check(item, false, true, false, false, false, true);
        }


        function promptGiftsOrAddThem() {
            $scope.group = null;
            $scope.nextPopUpShow = true;
            $scope.previousPopUpShow = false;
            $scope.currentIndex = 0;

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
                    $scope.group = $scope.groups[$scope.currentIndex];
                    if ($scope.groups.length == 1) {
                        $scope.nextPopUpShow = false;
                    }
                    showPopup();

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


        function showPopup() {
            if (popUp != null) {
                popUp.close();
            }

            popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "gratuitesLivreur.html",


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


    })

    