app.controller('BrandCtrl', function ($scope, $log, $state, ca, $ionicPopup, $stateParams, total, Retours, CartUtilities, IonicPopUpUtilities, Articles, ViewController, $ionicLoading, $filter) {

        $scope.ca = ca.ca;

        var infos = $scope.infos = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");

        var isVendeur = $scope.isVendeur = $stateParams.vendeur && $stateParams.vendeur == "true" ? true : false;

        var prelevement = $scope.prelevement = $stateParams.prelevement == "true" ? true : false;

        var forChargement = $scope.forChargement = $stateParams.chargement && $stateParams.chargement == "true" ? true : false;

        var retour = $scope.retour = $stateParams.retour && $stateParams.retour == "true" ? true : false;

        $scope.articles = [];

        // TOTAL INITIALIZATION TO 0 !
        $scope.total = total;

        $scope.motifs = {items: [], choosen: ""};

        Retours.get(1)
            .then(
                function (success) {
                    $scope.motifs.items = [];
                    angular.forEach(success.motifs, function (motif) {
                        $scope.motifs.items.push(motif);
                    });
                },
                function (error) {
                    console.debug(error);
                });

        function showPopup(article) {
            var popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "motifs.html",

                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            article.cause = $scope.motifs.choosen;
                            console.debug(article);
                            if (true) {
                                popUp.close();
                            }
                            else {
                                popUp.close();
                            }
                        }
                    }
                ],
                title: 'Motifs',
                subTitle: '(' + $scope.motifs.items.length + ')'
            });
        }


        $scope.ajouterMotif = function (article) {
            showPopup(article);
        };

        //cartInitialization();

        function cartInitialization() {
            $scope.total = 0;
            CartUtilities.totalCart(true, false, true).then(function (total) {
                $scope.total = total;
            });
        }


        var condition = $stateParams.name == "" && typeof($stateParams.name) != "undefined";


        var brand = $scope.brand = !condition ? $stateParams.name : null;


        var vendeurId = JSON.parse(window.localStorage['profile'] || "{}").id_db;

        window.addEventListener("native.keyboardshow", keyboardShowHandler);
        window.addEventListener("native.keyboardhide", keyboardHideHandler);
        function keyboardShowHandler(e) {
            $scope.footerBar = false;
        }

        function keyboardHideHandler(e) {
            $scope.footerBar = true;
        }

        $scope.change = function (article) {

            console.log(article)

            ViewController.check(article, forChargement, isVendeur, prelevement, retour, false);
            console.debug(retour);
            if (!prelevement && !forChargement && !retour) {
                console.debug("SHOULD DO IT");
                cartInitialization();
            }
            else {
                console.debug("YES NO CART INITIALIZATION !");
            }

        };
        // As the brand has no role in the call steps and is directly linked to the brands steps we only have to
        // associate it to the brands route

        $scope.back = function () {
            //Deep copy of the article in the scope !!
            //To avoid the launch of the watchers !!
            //&& to not point on them !!
            var _articles = angular.copy($scope.articles);

            if (!Articles.itemInScopeOutOfQuota(_articles, isVendeur, prelevement, retour, forChargement)) {
                $state.transitionTo("app.brands", {
                    vendeur: isVendeur,
                    chargement: forChargement,
                    prelevement: prelevement,
                    retour: retour
                });
            }
            else {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté !", "Veuillez modifier les quantités."));
            }

        };


        if (brand != null) {
            $ionicLoading.show({
                template: "chargement ..."
            });
            // add the brand name + true if it is a vendeur profile + true if it is for chargement
            // + the id of vendeur if it is the current profile !
            Articles.getArticlesByMarque(brand, isVendeur, forChargement, vendeurId, retour).then(
                function (articles) {
                    console.debug(articles);


                    var _articles = ViewController.prepare(articles, brand, forChargement, prelevement, retour);

                    for (var i = 0, len = _articles.length; i < len; i++) {
                        var _article = _articles[i];
                        if (forChargement) {
                            if (_article.unit > 0 || _article.packet > 0) {
                                console.debug("SHOULD VERIFY !");
                                ViewController.check(_article, forChargement, isVendeur, false, false, false);
                            }
                        }
                        else {
                            console.debug("NOTHING !");
                        }
                        $scope.articles.push(_article);
                    }

                },
                function (error) {
                    console.log(error);
                })
                .finally(function () {
                    $ionicLoading.hide();
                });


        }
        else {
            console.log("STOCK CONCURRENT !");
            Articles.getArticlesConcurrent().then(function (success) {
                console.log(success);
                var _articles = ViewController.prepare(success, brand, forChargement, prelevement, retour);
                console.log(_articles);
                angular.forEach(_articles, function (article) {
                    $scope.articles.push(article);
                });
            }, function (error) {
                console.log(error);
            });
        }
    })

    