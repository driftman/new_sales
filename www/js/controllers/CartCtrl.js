app.controller('CartCtrl', function ($log, $state, $stateParams, EchangeService, Depot, RollBack, ionicDatePicker, ViewController, CartUtilities, $filter, $ionicLoading, IonicPopUpUtilities, PrinterService, Promotions, $timeout, $cordovaDatePicker, $cordovaFile, $scope, $ionicPopup, $cordovaPrinter, ca, position, Commandes, Accounts, Clients, Missions, LigneCommandes, Articles, ModePaiement) {

        $scope.ca = ca.ca;

        $scope.infos = JSON.parse(window.localStorage["profile"] || "{}");

        var echange = $scope.echange = ( typeof($stateParams.echange) != "undefined" && $stateParams.echange == "true" ) ? true : false;

        console.log("isEchange : ", echange);
        console.log($stateParams);

        var missionObject = JSON.parse(window.localStorage['mission'] || "{}");
        $scope.choice = {
            id: 0
        };

        $scope.choices = {items: [], choosen: 0, adresse_livraison: "Adresse par défaut du client", date_livraison: null};

       
        $scope.choices.choosen = 0;

        $scope.showModerneProcess = false;

        if (missionObject.typeClient == 2) {           
            $scope.showModerneProcess = true;
        } else {
            $scope.showModerneProcess = false;
            $scope.choices.choosen = -1;
        }


        


        Depot.get(missionObject.client_id)
            .then(
                function (depots) {
                    console.log(depots);
                    if (depots.length > 0) {
                        angular.forEach(depots, function (depot) {
                            $scope.choices.items.push({title: depot.depot_name, code: depot.depot_id});
                        });
                    }
                    else {
                        $scope.choices.choosen = -1;
                        $scope.showModerneProcess = false;
                    }

                },
                function (error) {
                    console.log(error);
                });


        $scope.currentDiscount = null;
        $scope.choosenMethod = null;

        $scope.timbre = 0;

        // PAYMENT DATE !!
        $scope.paymentDate = new Date();
        // MODE PAIEMENTS METHODES !!
        $scope.paymentMethods = [];

        // MODE PAIEMENT !
        $scope.paymentMethods = JSON.parse(window.localStorage["methode_paiement"] || "[]");
        // CHANGE LISTENER
        $scope.paymentChange = function (method) {

            $scope.choosenMethod = method;

            var timbre = JSON.parse(window.localStorage['timbre'] || "{}");
            var mission = JSON.parse(window.localStorage["mission"] || "{}");

            // INIT
            mission.timbre = 0;

            if(typeof(timbre.type) != "undefined" && typeof(timbre.percentage) != "undefined") {
                
                if( $scope.totalTTC >= 20000 && timbre.type == method.id_db ) { 
                    $scope.totalHT=$scope.totalHT-$scope.timbre;
                    $scope.totalTTC=  $scope.totalTTC-$scope.timbre;
                    $scope.timbre = 50;
                    $scope.totalHT=$scope.totalHT+50;
                    $scope.totalTTC=  $scope.totalTTC+50;
                    mission.timbre = 50;
                } else {
                    if(timbre.type==method.id_db && $scope.totalHT>0) {

                        $scope.timbre = ( (timbre.percentage*$scope.totalHT) > 50 ) ? 50 : timbre.percentage * $scope.totalHT;
                        $scope.totalHT = $scope.totalHT+$scope.timbre;
                        $scope.totalTTC=  $scope.totalTTC+$scope.timbre;
                        mission.timbre = angular.copy($scope.timbre);
                    } else {
                        $scope.totalHT=$scope.totalHT-$scope.timbre;
                        $scope.totalTTC=  $scope.totalTTC-$scope.timbre;
                        $scope.timbre = 0;
                        mission.timbre = 0;
                    }
                }

            } 

            window.localStorage["mission"] = JSON.stringify(mission || {});

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
                        console.log($scope.totalTTC * (discount / 100) )
                    });
        }


        //
        $scope.concluded = missionObject.concluded || false;

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


        ///////////////////////////////////////////

        // PART MODERN CLIENTS FORMULAiRE

        //$scope.choices = {items: [], choosen: 0, adresse_livraison: "Adresse par défaut du client", date_livraison: null};

        function ifModerneProcessValid() {
            var testChoices = angular.copy($scope.choices);
            console.log(testChoices);
            return ( $scope.showModerneProcess != true || ( $scope.showModerneProcess == true && (testChoices.choosen != 0 && testChoices.choosen != -1 && testChoices.adresse_livraison != null && testChoices.adresse_livraison != "" && testChoices.date_livraison != null ) ) );
        }


        function clientModerneProcess() {
            var popUpDepots = $ionicPopup.alert({

                templateUrl: "depots.html",
                scope: $scope,
                title: "Veuillez choisir un entrepôt",
                buttons: [
                    {
                        text: "VALIDER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            if($scope.choices.choosen > 0)
                            {
                                popUpDepots.close();
                            }
                        }
                    }

                    ,

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

        $scope.openDepotPicker = function(){
            clientModerneProcess();
        };  
        var ipObj1 = {
          callback: function (val) {  //Mandatory
            $scope.choices.date_livraison = new Date(val).getTime();
          },
          from: new Date(2012, 1, 1), //Optional
          to: new Date(2016, 10, 30), //Optional
          inputDate: new Date(),      //Optional
          mondayFirst: true,          //Optional
          disableWeekdays: [0],       //Optional
          closeOnSelect: false,       //Optional
          templateType: 'popup'       //Optional
        };

        $scope.openDatePickerLivraison = function() {
            ionicDatePicker.openDatePicker(ipObj1);
        };
        


        $scope.dateLivraison = null;
        $scope.adresseLivraison = "";
        $scope.depotID = 0;


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
                template: '<span style="font-size: 12px; font-weight: 600;">Etes-vous sûr de vouloir valider la prise de commande ?</span>'
            });
        }

        function checkOut() {


            // RENITIALIZE THE CART !! 
            // FOR ACCURATE INFORMATIONS
            // missionObject.
            //console.log(missionObject)
            if (!missionObject.concluded) {

                
                        
                if ( $scope.currentDiscount != null && $scope.choosenMethod != null && ifModerneProcessValid() ) {

                
                    var modernProcessObject = angular.copy($scope.choices);

                    modernProcessObject.items = null;

                    missionObject.modernProcess = modernProcessObject;

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


                    PrinterService.formatedContent([angular.copy($scope.data.items), JSON.parse(window.localStorage['mission'] || '{}'), $scope.totalHT, $scope.totalTTC, $scope.currentDiscount], "Pre-vendeur")
                    .then( function (content) {
                        console.log(missionObject, "BEFORE");
                        missionObject.contentToPrint = content;
                        window.localStorage["mission"] = JSON.stringify(missionObject || {});
                        console.log(missionObject, "AFTER");



                        Missions.checkOut(
                            missionObject.id_mission,
                            //CartUtilities.getCartItems(),
                            angular.copy($scope.data.items),
                            local,
                            angular.copy($scope.choosenMethod.id_db || 0),
                            angular.copy($scope.paymentDate),
                            $scope.totalTTC,
                            $scope.totalHT,
                            cartObject.discountHistory || [],
                            $scope.currentDiscount,
                            totalFactureDiscounts,
                            $scope.charaka,
                            charakasUpdate,
                            false
                        ).then(
                            function (success) {
                                //console.log(success);
                                //$ionicPopup.alert(IonicPopUpUtilities.alert("Succès !", "La commande a bien été enregistrée !"));
                                $ionicLoading.show({template: "La commande a bien été enregistrée !"});

                                $timeout(function () {
                                    $scope.concluded = true;
                                    missionObject.concluded = true;
                                    missionObject.totalTTC = $scope.totalTTC;
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
                                $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Erreur lors de l'enregistrement \n :" + JSON.stringify(error) + " \n"));

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
                else if ($scope.choosenMethod == null) {

                    $ionicPopup.alert(IonicPopUpUtilities.alert("Action manquante", "Veuillez choisir une méthode de paiement"));
                }
                else if (!ifModerneProcessValid()) {
                    
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Actions manquantes", "C'est un client moderne, la saisie des donneés de livraison est obligatoire: <br> - Dépot  <br> - Adresse livraison  <br> - Date livraison "));
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

        if(echange) {
            $scope.totalHT = 0;
            $scope.totalTTC = 0
            CartUtilities.prepareEchangeItems().then(
                function(items){
                    for(var i = 0 ; i < items.length ; i++) {
                        var item = items[i];

                        item.ht = CartUtilities.totalToAddOrRemove(item);

                        console.log("PRIX " + item.ht);

                        item.ttc = item.ht + ( item.ht * ( 20 / 100 ) );

                        $scope.totalHT = $scope.totalHT + item.ht;

                        console.log("CHECK : " + $scope.totalHT);

                        $scope.totalTTC = $scope.totalTTC + item.ttc;

                        /*if(item.ht > 0) {

                            var tvaValue = item.ht * ( item.tva / 100 );

                            item.ttc = 0;

                            item.ttc = item.ht + tvaValue;

                            $scope.totalTTC = $scope.totalTTC + item.ttc;
                        } else {
                            item.ttc = item.ht;
                            $scope.totalTTC = $scope.totalTTC + item.ttc;
                        }*/

                        $scope.data.items.push(item);
                    }
                    console.log("FINAL COUNT : " + $scope.totalHT)
                });
        } else {
            init();
        }

        function endEchange(input) {

            $ionicLoading.show({ template: "Finalisation de l'échange en cours ... " });

            
            PrinterService.formattedContentEchange(angular.copy(input)).then(
                function(print_content){

                    input = angular.copy(input);
                    input.print_content = print_content;
                    
                    EchangeService.add(input).then(
                       function(success){
                        console.log(success);

                        cordova.exec(
                            function (success) {
                                console.log("print success");
                            },
                            function (fail) {
                                console.log("print error");
                                console.log(fail);
                            },
                            "ZebraBluetoothPrinter",
                            "zebra",
                            [print_content]);

                    }, function(error){
                        console.log(error);
                    }).finally(function(){
                        
                        CartUtilities.clearVisit().then(function(){
                            $timeout(function(){
                                $ionicLoading.hide();
                                $state.go("menu.entry");
                            }, 1200);
                        });

                    });

                    
            });

        }

        $scope.finishEchange = function() {

            console.log(Math.trunc($scope.totalHT));

            if($scope.choosenMethod == null || $scope.currentDiscount == null) {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Méthode de paiement", "Veuiller choisir une méthode de paiement pour valider l'échange "));
            } else if(Math.trunc($scope.totalHT) < 0) {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Non autorisé", "Le total de la facture doit être supérieur ou égal à zero"));
            } else {

                var items = angular.copy($scope.data.items);
                var totalTTC = angular.copy($scope.totalTTC);
                var totalHT = angular.copy($scope.totalHT);

                var echange = JSON.parse(window.localStorage["echange"] || "{}");
                var profile = JSON.parse(window.localStorage["profile"] || "{}");

                var client_id = echange.client_id || 0;

                var profile_id = profile.id_db || 0;

                totalTTC = totalTTC > 0 ? totalTTC : Math.trunc(totalTTC);
                totalHT = totalHT > 0 ? totalHT : Math.trunc(totalHT);

                var currentDiscount = $scope.currentDiscount;

                var toDiscount = totalTTC > 0 ? ( totalTTC * ( currentDiscount / 100) ) : 0;

                totalTTC = totalTTC > 0 ? ( totalTTC - toDiscount ) : totalTTC;

                var output = {
                        lignes: items,
                        client: client_id,
                        vendeur: profile_id,
                        totalTTC: totalTTC,
                        totalHT: totalHT,
                        paymentMode: angular.copy($scope.choosenMethod.id_db),
                        currentDiscountValue: toDiscount,
                        currentDiscount: currentDiscount,
                        date: new Date().getTime(),
                        timbre: angular.copy($scope.timbre)
                };

                console.log(output);
                

                var echangePopUp = $ionicPopup.show({

                    scope: $scope,

                    template: '<span style="font-size: 13px; font-weight: 400;"> N.B: Une copie de la facture sera enregistrée pour une réimpression ultérieure.</span>',


                    buttons: [
                        {
                            text: "OUI",
                            type: "button-assertive",
                            cssClass: "assertive-survey",
                            onTap: function (e) {
                                e.preventDefault();
                                echangePopUp.close();
                                endEchange(output);
                            }
                        },
                        {
                            text: "NON",
                            type: "button-assertive",
                            cssClass: "assertive-survey",
                            onTap: function (e) {
                            }
                        }
                    ],
                    title: '<h4> Etes-vous sûr de vouloir valider ? </h4>',
                    subTitle: '(' + $scope.data.items.length + ')'
                });

            }
        };

        

        function init() {

            $scope.totalHT = 0;
            $scope.totalTTC = 0
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
                                $scope.totalHT = $scope.totalTTC - discount.remiseV;
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

            if($scope.choosenMethod == null || $scope.currentDiscount == null)
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Action manquante", "Veuillez choisir une méthode de paiement"));
            }
            else
            {
                PrinterService.formatedContent([angular.copy($scope.data.items), JSON.parse(window.localStorage['mission'] || '{}'), $scope.totalHT, $scope.totalTTC, 0.7], "Pre-vendeur")
                .then(
                    function (content) {

                        
                        missionObject.contentToPrint = content;
                        window.localStorage["mission"] = JSON.stringify(missionObject || {});

                        cordova.exec(
                            function (success) {
                                $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Facture imprimée avec succès"));
                                missionObject = JSON.parse(window.localStorage['mission'] || "{}");
                                missionObject.cancel = false;
                                window.localStorage['mission'] = JSON.stringify(missionObject);
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
                $ionicPopup.alert(IonicPopUpUtilities.alert("Action non autorisée", "Vous n'êtes pas autorisé à annuler une commande après l'impression"));
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

        $scope.hasNext = position.hasNext && !echange;
        $scope.hasPrevious = position.hasPrevious && !echange;

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

    