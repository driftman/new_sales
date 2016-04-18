app.controller('AnalyseCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $log, CartUtilities, $state, Clients, $filter) {
        $log.log("erzer");
        $scope.footerBar = true;
        $scope.fillStar = false;
        $scope.infos = JSON.parse(window.localStorage["profile"]);
        $scope.ca = parseInt($scope.infos.ca);
        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");
        $scope.mission = JSON.parse(window.localStorage["mission"] || "{}");
        var start = $scope.mission.entryDate || 0;
        var now = $scope.mission.exitDate || 0;
        console.log("start", start, "end", now, "date", new Date(now - start), "duree", now - start);
        var duree = new Date(now - start);

        var heures = duree.getUTCHours();
        var minutes = duree.getUTCMinutes();
        var secondes = duree.getUTCSeconds();
        $scope.dureeStr = (('' + heures).length === 1 ? '0' + heures : heures) + ':' + (('' + minutes).length === 1 ? '0' + minutes : minutes) + ':' + (('' + secondes).length === 1 ? '0' + secondes : secondes);

        $scope.sbds = JSON.parse(window.localStorage["sbd"] || []);
        $scope.consumedSbds = $scope.sbds.reduce(function (count, sbd) {
            return (sbd.consumed) ? ++count : count;
        }, 0);
        $scope.promotions = JSON.parse(window.localStorage["promotions"] || []);
        $scope.consumedPromotions = $scope.promotions.reduce(function (count, promotion) {
            return (promotion.consumed) ? ++count : count;
        }, 0);
        Clients.getClient(JSON.parse(window.localStorage["mission"]).client_id).then(function (success) {
            $log.log("success", success);
            $scope.client = success;
            $scope.fillStar = $scope.client.golden_store < $scope.consumedSbds;
            $log.log($scope.fillStar, "fillstar", $scope.client.golden_store, $scope.consumedSbds, $scope.client);

        });


        $scope.promotionRatio = $scope.promotions.length > 0 ? $filter("number")(($scope.consumedPromotions / $scope.promotions.length) * 100, 2) + "%" : "0.00%";
        $scope.sbdRatio = $scope.sbds.length > 0 ? $filter("number")(($scope.consumedSbds / $scope.sbds.length) * 100, 2) + "%" : "0.00%";
        $scope.caRatio = $scope.ca > 0 ? $filter("number")(($scope.ca / $scope.ca) * 100, 2) + "%" : "0.00%";
        $scope.checkout = function () {
            CartUtilities.clearVisit().then(function (success) {
                $state.transitionTo('menu.entry');
            });
        }

        /*        $scope.computeConsumedVals = function (list) {
         list.map(function (item) {
         var arrayName=item + 's';
         var consumedName='consumed' + item[0].toUpperCase() + item.slice(1) + 's';
         $scope[arrayName] = JSON.parse(window.localStorage[item] || []);
         $scope[consumedName] = $scope[arrayName].reduce(function (count, itm) {
         return (itm.consumed) ? ++count : count;
         }, 0)
         });
         }*/
        /*        $scope.computeConsumedVals(["sbd", "promotion"]);*/
    })
    /*---------------------------------YOUNES-------------------------------*/

;