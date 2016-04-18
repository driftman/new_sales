app.controller('BrandsCtrl', function ($scope, $timeout, $state, total, ca, Prelevements, Retours, CallSteps, CartUtilities, $log, $ionicLoading, Chargement, Commandes, IonicPopUpUtilities, $ionicPopup, position, LigneCommandes, $stateParams, Articles, $ionicModal, Missions, $filter) {

        $scope.ca = ca.ca;
        $scope.infos = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");

        console.log(ca)
        console.debug(total);

        // TOTAL INITIALIZATION TO 0 !
        $scope.total = total;

        function cartInitialization() {
            CartUtilities.totalCart(true, false, true)
                .then(function (success) {
                    $scope.total = success;
                });
        }

        // To know if the current objectif is to add stock to van or if the employee connected is
        // from profile type "vendeur" to display only the items in stock or all !!

        var isVendeur = $scope.isVendeur = $stateParams.vendeur == "true" ? true : false;
        var forChargement = $scope.forChargement = $stateParams.chargement == "true" ? true : false;
        var prelevement = $scope.prelevement = $stateParams.prelevement == "true" ? true : false;
        var retour = $scope.retour = $stateParams.retour == "true" ? true : false;

        console.debug(forChargement);

        if (forChargement) {
            $scope.title = "DEMANDE DE CHARGEMENT";
        }
        else if (prelevement) {
            $scope.title = "PRELEVEMENT STOCK CLIENT"
        }
        else if (retour) {
            $scope.title = "RETOURS CLIENT"
        }
        else {
            $scope.title = "AUTRES MARQUES"
        }

        console.debug(retour);


        //PROPER TO CALL STEPS !!

        if (prelevement || retour) {
            var _target = prelevement ? "app.prelevement" : "app.retour";
            CallSteps.checkForSteps(_target)
                .then(function (result) {
                    $scope.hasNext = result.hasNext;
                    $scope.hasPrevious = result.hasPrevious;
                });
        }
        else {
            $scope.hasNext = position.hasNext;
            $scope.hasPrevious = position.hasPrevious;
        }


        // NEXT STEP !!
        $scope.next = function () {
            next();
        };
        function next() {
            // PRELEVEMENT AND RETOUR ARE NOT REAL CALL STEPS
            // THEY ARE A JUST A WORKAROUND
            // SO THE POSITION WIRED WITH THIS CONTROLLER IS NOT THE REAL POSITION IN THE CALLSTEP
            // I HAVE TO FORCE THE SEARCH FOR THE CURRENT STEP
            if (prelevement || retour) {
                var _target = prelevement ? "app.prelevement" : "app.retour";
                CallSteps.checkForSteps(_target)
                    .then(function (result) {
                        if (result.hasNext) {
                            if (result.nextStep.name != "app.brands") {
                                console.debug(result.nextStep.name);
                                $state.transitionTo(result.nextStep.name);
                            }
                            else {
                                // WE ARE INT PRELEVEMENT SO WE SHOULD SET IT TO FALSE !
                                // PRELEVEMENT IS NOT A PART FROM THE CALL STEPS !
                                $state.transitionTo(result.nextStep.name, {
                                    vendeur: isVendeur,
                                    chargement: false,
                                    prelevement: false,
                                    retour: false
                                });
                            }
                        }
                        else {
                            console.debug("WHAT TO DO ? !!");
                        }
                    });
            }
            else {
                if (position.hasNext) {
                    var marques = JSON.parse(window.localStorage['marques'] || "{}")
                    var canGo = typeof(marques.exclusion) == "undefined" ? false : marques.exclusion.canGo;
                    var gone = typeof(marques.exclusion) == "undefined" || typeof(marques.exclusion.gone) == "undefined" ? false : marques.exclusion.gone;
                    if (canGo && !gone) {
                        marques.exclusion.gone = true;
                        window.localStorage['marques'] = JSON.stringify(marques);
                        $state.go('app.brand', {
                            name: 10,
                            vendeur: isVendeur,
                            chargement: false,
                            prelevement: false,
                            retour: false
                        });
                    }
                    else {
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

                }
                else {
                    console.debug("WHAT TO DO ? !!");
                }
            }
        }

        // PREVIOUS STEP !!
        $scope.previous = function () {
            previous();
        };
        function previous() {
            if (prelevement || retour) {
                var _target = prelevement ? "app.prelevement" : "app.retour";
                CallSteps.checkForSteps(_target)
                    .then(function (result) {
                        if (result.hasPrevious) {
                            if (result.previousStep.name != "app.brands") {
                                $state.transitionTo(result.previousStep.name);
                            }
                            else {
                                $state.transitionTo(result.previousStep.name, {
                                    vendeur: isVendeur,
                                    chargement: false,
                                    prelevement: false,
                                    retour: false
                                });
                            }
                        }
                        else {
                            console.debug("WHAT TO DO ? !!");
                        }

                    });
            }
            else {
                if (position.hasPrevious && !forChargement) {
                    if (position.previousStep.name != "app.brands") {
                        $state.transitionTo(position.previousStep.name);
                    }
                    else {
                        $state.transitionTo(position.previousStep.name, {
                            vendeur: isVendeur,
                            chargement: false,
                            prelevement: false,
                            retour: false
                        });
                    }
                }
                else {
                    console.debug("WHAT TO DO ? !!");
                }
            }
        }

        $scope.sendPrelevement = function () {
            var popup = $ionicPopup.alert({
                title: "Confirmation",
                buttons: [
                    {
                        text: "OK",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {

                            e.preventDefault();

                            console.debug("IM SURE !");
                            var prelevement = JSON.parse(window.localStorage["prelevement"] || "{}");
                            var items = typeof(prelevement.items != "undefined") ? prelevement.items : [];
                            var mission = JSON.parse(window.localStorage["mission"] || "{}");
                            var clientId = mission.client_id || 0;
                            Prelevements.add(items, clientId).then(
                                function (success) {
                                    console.debug(success);
                                    // GO TO NEXT STEP !
                                    popup.close();
                                    next();
                                },
                                function (error) {
                                    console.error(success);
                                    popup.close();
                                });
                        }
                    },
                    {
                        text: "ANNULER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {

                            e.preventDefault();

                            console.debug("NO IM NOT !");

                            popup.close();
                        }
                    }
                ],
                template: '<span style="font-size: 12px; font-weight: 600;"> Etes-vous sûr de vouloir confirmer ?</span>'
            })

        };

        //Send retours !!

        $scope.sendRetour = function () {

            var popup = $ionicPopup.alert({
                title: "Confirmation",
                buttons: [
                    {
                        text: "OK",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {

                            e.preventDefault();

                            console.debug("IM SURE !");

                            var retour = JSON.parse(window.localStorage["retour"] || "{}");
                            var items = typeof(retour.items != "undefined") ? retour.items : [];

                            Retours.clearCartFromRetours(items).then(
                                function (success) {
                                    popup.close();
                                    next();

                                },
                                function (error) {
                                    console.error(success);
                                    popup.close();
                                });
                        }
                    },
                    {
                        text: "ANNULER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {

                            e.preventDefault();

                            console.debug("NO IM NOT !");

                            popup.close();
                        }
                    }
                ],
                template: '<span style="font-size: 12px; font-weight: 600;"> Etes-vous sûr de vouloir confirmer ?</span>'
            })
        };


        $scope.cancelDemande = function () {
            $ionicLoading.show({
                template: "Annulation en cours ... "
            });

            CartUtilities.clearVisit()
                .then(function (success) {

                }).finally(function () {
                $timeout(function () {
                    $ionicLoading.hide();
                    $state.transitionTo("menu.entry");
                }, 900);
            });
        }

        //Send the demand !!

        $scope.sendDemande = function () {


            var cart = JSON.parse(window.localStorage["cart"] || "{}");

            if (typeof(cart.items) != "undefined" && cart.items.length > 0) {
                $ionicLoading.show({
                    template: "Enregistrement de votre demande ..."
                });

                var lignes = cart.items;

                Chargement.add($scope.infos.id_db, lignes).then(
                    function (success) {
                        console.debug(success);
                        if (!(typeof(success.rowsAffected) == "undefined")) {
                            $ionicPopup.alert(IonicPopUpUtilities.alert("Succès", "Demande enregistrée"));
                            window.localStorage.removeItem('cart');
                            var keys = Object.keys(window.localStorage);
                            for (var i = 0; i < keys.length; i++) {
                                if (keys[i] != "profile") {
                                    window.localStorage.removeItem(keys[i]);
                                }
                            }
                            $state.transitionTo("app.profile");
                        }
                        else {
                            $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", success.message));

                        }
                    },
                    function (error) {
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", error.message));
                    }).finally(function () {

                    $timeout(function () {

                        $ionicLoading.hide();

                    }, 500);

                });
            }
            else {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Aucune ligne ajoutée"));
            }


        };

        // EXCLUSIONS FROM THE MEETING OF 21/01/2016  , Proposed by MONCEF in order to access to a predefined brand by conditions !!
        // HERE the brand that is in condition is ACE.
        var _marques = JSON.parse(window.localStorage['marques'] || "{}");
        var _gone = typeof(_marques.exclusion) == "undefined" || typeof(_marques.exclusion.gone) == "undefined" ? false : _marques.exclusion.gone;
        var exclusion = _gone ? [] : [10];

        $scope.infos = JSON.parse(window.localStorage['profile'] || "{}");

        $scope.rows = [];

        var marques = JSON.parse(window.localStorage['marques'] || "{}");

        var canGoToExclusion = typeof(marques.exclusion) != "undefined" && marques.exclusion.canGo && !prelevement && !retour && !forChargement;

        Articles.getMarques(exclusion, isVendeur, forChargement, retour).then(
            function (marques) {
                if (prelevement) {
                    marques.push({id: null, marqueArticle: "STOCK CONCURRENT", logo: "img/logo.png"});
                }
                var count = marques.length;
                var exclusionCount = 0;
                for (var i = 0; i < count - (count % 5); i += 5) {
                    var row = [];
                    for (var j = i; j < i + 5; j++) {
                        var checked = typeof(JSON.parse(window.localStorage['marques'] || "{}")[marques[j].id]) != "undefined";
                        if (checked) {
                            ++exclusionCount;
                        }
                        marques[j].checked = checked;
                        row.push(marques[j]);
                    }
                    $scope.rows.push(row);
                }
                var finalRow = [];
                for (var i = count - (count % 5); i < count; i++) {
                    var checked = typeof(JSON.parse(window.localStorage['marques'] || "{}")[marques[i].id]) != "undefined";
                    if (checked) {
                        ++exclusionCount;
                    }
                    marques[i].checked = checked;
                    finalRow.push(marques[i]);
                }
                $scope.rows.push(finalRow);
                // IF THE CAN GO IS ALREADY SETTED THERE IS NO NEED TO SET !!

                var _marques = JSON.parse(window.localStorage['marques'] || "{}");

                if (typeof(_marques.exclusion) == "undefined") {
                    if (exclusionCount === count && !prelevement && !retour && !forChargement) {
                        canGoToExclusion = true;
                        _marques.exclusion = {};
                        _marques.exclusion.canGo = canGoToExclusion;
                        window.localStorage['marques'] = JSON.stringify(_marques);
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Bravo !", "Vous avez atteint l'objectif 100% distribution"));
                    }
                }

            },
            function (error) {
                $log.error(error);
            });

        $scope.goToBrand = function (marque_id) {
            $state.go('app.brand', {
                name: marque_id,
                vendeur: isVendeur,
                chargement: forChargement,
                prelevement: prelevement,
                retour: retour
            });
        };
    })

    