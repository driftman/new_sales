app.controller('RemainingCtrl', function ($scope, $state, $rootScope, $ionicPopup, IonicPopUpUtilities, CartUtilities, total, ViewController, Articles, Promotions, SBD, position, ca, $filter) {
        $scope.ca = ca.ca;
        var infos = $scope.infos = JSON.parse(window.localStorage["profile"] || "{}");

        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        var mission = JSON.parse(window.localStorage["mission"] || "{}");

        var remainings = {initiatives: [], sbds: []};

        $scope.remainings = remainings;

        $scope.hasNext = position.hasNext;

        $scope.hasPrevious = position.hasPrevious;

        $scope.previous = function () {
            $state.go(position.previousStep.name);
        };

        $scope.next = function () {
            if (!Promotions.itemRemainingInScope(angular.copy($scope.remainings))) {
                $state.go(position.nextStep.name);
            }
            else {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Etapes manquantes", "Vous devez au moins donner une justification pour chaque <b>INITIATIVE</b> / <b>SBD</b>"));
            }
        };


        var input = Promotions.getNonConsumedPromotionsAndSBDs();

        $scope.remainings.initiatives = $scope.remainings.initiatives.concat(input.promotions);

        $scope.remainings.sbds = $scope.remainings.sbds.concat(input.sbds);

        $scope.total = 0;

        console.log($scope.remainings);


        function cartInitialization() {
            $scope.total = 0;
            CartUtilities.totalCart(true, false, true).then(function (total) {
                $scope.total = total;
            });
        }

        cartInitialization();


    })

    