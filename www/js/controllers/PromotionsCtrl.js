app.controller('PromotionsCtrl', function ($scope,
                                            $stateParams,
                                            $ionicSideMenuDelegate,
                                            $timeout,
                                            $rootScope,
                                            ionicMaterialMotion,
                                            ionicMaterialInk,
                                            Promotions,
                                            $state) {
        $scope.infos = JSON.parse(window.localStorage['profile']);
        $scope.$parent.clearFabs();
        // Set Header
        $ionicSideMenuDelegate.canDragContent(true);
        $timeout(function () {
            $scope.$parent.showHeader();
        }, 500);

        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);
        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 1000);

        $timeout(function () {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 1000
            });
        }, 1500);

        // Set Ink
        ionicMaterialInk.displayEffect();
        $scope.promotions = [];
        Promotions.getAllPromotions().then(
            function (promotions) {
                angular.forEach(promotions, function (promotion) {
                    $scope.promotions.push(promotion);
                });

            },
            function (error) {
                console.log("Erreur : " + error.message);
            });
    })

    