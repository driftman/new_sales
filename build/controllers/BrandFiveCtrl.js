app.controller('BrandFiveCtrl', function ($http, $log, $scope, ca, $cordovaVibration, $ionicLoading, total, ViewController, SBD, CartUtilities, IonicPopUpUtilities, $stateParams, $state, Commandes, Articles, Promotions, Marques, $ionicPopup, $timeout, Missions, LigneCommandes, position, $filter) {

        $scope.ca = ca.ca;

        // TOTAL INITIALIZATION TO 0 !
        $scope.total = total;

        function cartInitialization() {
            CartUtilities.totalCart(true, false, true)
                .then(
                    function (success) {
                        console.log(success);
                        $scope.total = success;
                    });
        }

        //THE CALLER INFOS !! (PREVENDEUR - VENDEUR)
        var infos = JSON.parse(window.localStorage['profile']);

        $scope.infos = infos;
        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");


        var isVendeur = typeof(infos.fonction) != "undefined" && infos.fonction == "vendeur";

        // We normally have no chargement for prevendeur || vendeur .
        var forChargement = false;

        $scope.isVendeur = isVendeur;

        $scope.brandFives = [];

        Marques.getBrandFiveFromLocalDB().then(
            function (brandfives) {
                if (brandfives.length > 0) {
                    console.log(brandfives);
                    $scope.brandFives = brandfives;
                    $scope.currentBrand = $scope.brandFives[$scope.currentStep];
                    //console.log($scope.currentBrand);
                    refreshBrand($scope.currentBrand);
                }
                else {
                    //nextStep();
                    $scope.currentBrand = null;
                    $scope.forw = false;
                    $scope.done = true;
                }
            },
            function (error) {
                console.log(error);
            });

        $scope.footerBar = true;
        window.addEventListener("native.keyboardshow", keyboardShowHandler);
        window.addEventListener("native.keyboardhide", keyboardHideHandler);
        function keyboardShowHandler(e) {
            $scope.footerBar = false;
        }

        function keyboardHideHandler(e) {
            $scope.footerBar = true;
        }

        window.localStorage['done'] = typeof window.localStorage['done'] == "undefined" ? JSON.stringify(false) : JSON.parse(window.localStorage['done']);

        $scope.hasNext = position.hasNext;
        $scope.hasPrevious = position.hasPrevious;

        $scope.next = function () {
            nextStep();
        };

        function nextStep() {
            //$cordovaVibration.vibrate(100);
            $log.debug(isVendeur);
            if (position.hasNext && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles), isVendeur, false, false, false)) {
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
            else if (!Articles.itemInScopeOutOfQuota(angular.copy($scope.articles), isVendeur, false, false, false)) {
                CartUtilities.clearVisit().then(
                    function (success) {
                        $state.transitionTo("menu.entry");
                    });
            }
            else {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté", "Veuillez modifier les quantités."));
            }
        }

        $scope.previous = function () {
            //$cordovaVibration.vibrate(100);
            if (position.hasPrevious && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles), isVendeur, false, false, false)) {
                console.debug(position);
                //$cordovaVibration.vibrate(100);

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
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté", "Veuillez modifier les quantités."));
            }
        };

        //DEFAULT SETTINGs
        var defaultStep = 0;
        //
        $scope.currentStep = defaultStep;
        //CAN GO BACK "BY DEFAULT THE FIRST STEP IS 0 SO  -1 IS IMPOSSIBLE"
        $scope.back = false;
        //BY DEFAULT WE WAN MOVE FORWARD IF AND ONLY IF THE SIZE OF THE BRANDS IS STRICTLY GREATHER THAN 0
        $scope.forw = true;
        //IF THE THE LAST BRAND IS ALREADY ACHIEVED !! SO WE CAN MOVE TO THE NEXT CALL STEP !
        $scope.done = JSON.parse(window.localStorage['done'] || 'false');

        $scope.marques = [];

        $scope.brandFives = [];

        $scope.brand = {};

        $scope.currentBrand = {};

        $scope.articles = [];

        //THE SCOPE CONTAINING THE ITEMS !
        $scope.articles = [];


        //REAL TIME PROCESS !!
        //ADDING ITEMS TO CART, REMOVING THEM, MODIFY QTYs, PROMOTIONS && SBDs
        $scope.change = function (article) {
            ViewController.check(article, false, isVendeur, false, false, false);
            cartInitialization();
        };

        function refreshBrand(brand) {
            console.log(brand);
            $ionicLoading.show({
                template: "chargement ..."
            });

            Articles.getArticlesByMarque(brand.brand_id, isVendeur, forChargement, infos.id_db).then(
                function (articles) {
                    //console.debug(articles)
                    $scope.articles = [];

                    var _articles = ViewController.prepare(articles, brand.brand_id, false, false, false, false);

                    for (var i = 0, len = _articles.length; i < len; i++) {
                        $scope.articles.push(_articles[i]);
                    }

                })
                .finally(function () {
                    $ionicLoading.hide();
                });

        }


        $scope.backward = function () {
            //$cordovaVibration.vibrate(100);

            if ($scope.back && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles), isVendeur, false, false, false)) {
                if ($scope.currentStep > 0) {
                    $scope.forw = true;

                    --$scope.currentStep;

                    $scope.currentBrand = $scope.brandFives[$scope.currentStep];

                    refreshBrand($scope.currentBrand);

                    if ($scope.currentStep == 0) {
                        $scope.back = false;
                    }
                }
                else {
                    $scope.back = false;
                }
            }
            else {
                console.debug(Articles.itemInScopeOutOfQuota(angular.copy($scope.articles), isVendeur));
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté", "Veuillez modifier les quantités."));
            }
        };
        $scope.forward = function () {
            $log.debug(isVendeur);
            //$cordovaVibration.vibrate(100);
            if ($scope.forw && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles), isVendeur, false, false, false)) {

                if ($scope.currentStep < $scope.brandFives.length) {
                    $scope.back = true;

                    ++$scope.currentStep;

                    $scope.currentBrand = $scope.brandFives[$scope.currentStep];

                    refreshBrand($scope.currentBrand);

                    if ($scope.currentStep == $scope.brandFives.length - 1) {
                        $scope.forw = false;
                        //WE ACHIEVED THE GOAL !!
                        $scope.done = true;
                        window.localStorage['done'] = JSON.stringify(true);
                    }
                }
            }
            else {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté", "Veuillez modifier les quantités."));
            }
        };


    })

    