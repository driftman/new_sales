app.controller('ResteCtrl', function ($scope, $rootScope, $ionicPopup, CartUtilities, Promotions, DateUtilities, $state, $stateParams, Articles, ViewController, ca, $filter) {

        $scope.ca = ca.ca;
        var infos = $scope.infos = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");

        var profile = infos;
        var mission = JSON.parse(window.localStorage["mission"] || "{}");

        var client_id = mission.client_id || 0;

        var today = DateUtilities.convertLongToYYYYMMDD(new Date());

        var employee = profile.id_db || 0;

        $scope.isVendeur = profile.fonction == "vendeur";
        $scope.prelevement = false;
        $scope.retour = false;
        $scope.forChargement = false;

        var id = $stateParams.id || 0;
        var promotion = $stateParams.promotion || "false";
        var sbd = $stateParams.sbd || "false";

        $scope.isPromotion = promotion == "true";

        $scope.isSBD = sbd == "true";

        $scope.promotion = null;

        $scope.sbd = null;

        if ($scope.isPromotion) {
            $scope.promotion = Promotions.getPromotionFromLocalStorage(id);
            console.log($scope.promotion);
        }

        if ($scope.isSBD) {
            $scope.sbd = Promotions.getSBDFromLocalStorage(id);
        }

        $scope.articles = [];

        $scope.height = "";

        $scope.total = 0;

        $scope.motifs = {
            choosen: 0,
            items: [{motif: "Stock insuffisant"}, {motif: "Manque de moyen"}, {motif: "Pas interessé"}]
        };

        $scope.openPopUp = function () {
            var myPopup = $ionicPopup.alert({
                templateUrl: "motifRemaining.html",
                scope: $scope,
                buttons: [
                    {
                        text: "OK",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            if ($scope.promotion != null) {
                                Promotions.addCause($scope.promotion.id, $scope.motifs.choosen);
                            }
                            else if ($scope.sbd != null) {
                                Promotions.addCauseSBD($scope.sbd.id, $scope.motifs.choosen);
                            }

                            $state.go("app.remainings");
                            myPopup.close();
                        }
                    }
                ],
                title: 'Motifs',
                subTitle: '(' + $scope.motifs.items.length + ')'
            });
        };

        function cartInitialization() {
            $scope.total = 0;
            CartUtilities.totalCart(true, false, true).then(function (total) {
                $scope.total = total;
            });
        }

        cartInitialization();


        if ($scope.isPromotion) {
            Articles.getPromotionArticles(client_id, today, employee, id)
                .then(
                    function (data) {
                        $scope.height = data.length > 5 ? "350px;" : "auto;";
                        data = ViewController.prepare(data, null, false, false, false, false);
                        angular.forEach(data, function (article) {
                            $scope.articles.push(article);
                        });
                    },
                    function (error) {
                        console.log(error);
                    });
        }
        else if ($scope.isSBD) {
            Articles.getSBDArticles(client_id, today, employee, id)
                .then(
                    function (data) {
                        $scope.height = data.length > 5 ? "350px;" : "auto;";
                        data = ViewController.prepare(data, null, false, false, false, false);
                        angular.forEach(data, function (article) {
                            $scope.articles.push(article);
                        });
                    },
                    function (error) {
                        console.log(error);
                    });
        }
        else {
            console.log("NOTHING !");
        }


        $scope.change = function (article) {
            ViewController.check(article, false, $scope.isVendeur, false, false, false);
            if ($scope.isPromotion) {
                $scope.promotion = Promotions.getPromotionFromLocalStorage(id);
                console.log($scope.promotion);
            }

            if ($scope.isSBD) {
                $scope.sbd = Promotions.getSBDFromLocalStorage(id);
            }
            cartInitialization();
        };


        console.log(id);
    })

    