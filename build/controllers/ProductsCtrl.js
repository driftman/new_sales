app.controller('ProductsCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
        $scope.$parent.clearFabs();
        $timeout(function () {
            $scope.$parent.showHeader();
        }, 500);
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);
        $scope.infos = JSON.parse(window.localStorage['profile']);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });

    })


    /*---------------------------------YOUNES-------------------------------*/
    