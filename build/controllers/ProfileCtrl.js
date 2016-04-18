app.controller('ProfileCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicSlideBoxDelegate,
                                         Routes, SynchronizationService, $ionicLoading, Profile, $cordovaToast, Commandes, BrandFive, Marques, Missions, LigneCommandes,
                                         $ionicSideMenuDelegate, Surveys, $state, $timeout, Ventes, ionicMaterialMotion, ionicMaterialInk, ca) {

        Surveys.getFormattedSurveys().then(
            function (success) {
                console.log(success);
            },
            function (error) {
                console.log(error);
            });


        /*.then(
         function(success){
         console.log(success);
         },
         function(error){
         console.log(error);
         });*/
        // Set Header
        $scope.$parent.clearFabs();
        $ionicSideMenuDelegate.canDragContent(true);
        $timeout(function () {
            $scope.$parent.showHeader();
        }, 500);
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);
        $scope.ca = ca.ca;
        $scope.finishedMissions = [];
        var infos = JSON.parse(window.localStorage['profile'] || "{}");
        $scope.isVendeur = infos.fonction == "vendeur";
        $scope.infos = infos;
        $scope.toggle = function () {
            $scope.type = $scope.type === 'PolarArea' ?
                'Pie' : 'PolarArea';
        };
        $scope.labels = ["Clients facturés", "Clients en attente", "Clients avec problème"];
        $scope.commandes = [];
        $ionicSlideBoxDelegate.update();
        $scope.brandfive = [];
        $scope.gp = 0;

        Profile.getGPAccount().then(function (ca) {
            $scope.gp = ca.golden_points;
        }, function () {
            err
        });

        Marques.getBrandFiveFromLocalDB().then(
            function (brands) {
                console.log(brands);
                angular.forEach(brands, function (brand) {
                    $scope.brandfive.push(brand);
                });
            },
            function (error) {
                console.log(error.message);
            });

        Missions.countMissions(infos.id_db).then(
            function (result) {
                console.log(result);
                $scope.data = [];
                $scope.colours = ["#81C784", "#F57C00", "#FF5252"];
                $scope.data.push(result.finished, result.waiting, result.problem);
            },
            function (error) {
                console.log(error.message);
            });
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

        /*Missions.getFinishedMissions(infos.id_db).then(
         function(missions){
         angular.forEach(missions, function(mission){
         if(mission.code_mission == null)
         {
         mission.code_mission = '-';
         }
         console.log(mission);
         $scope.finishedMissions.push(mission);
         });
         },
         function(error){
         console.log(error.message);
         });*/
        $scope.missions = [];
        Ventes.get(infos.id_db || 0)
            .then(
                function (commandes) {
                    console.debug(JSON.stringify(commandes));
                    angular.forEach(commandes, function (commande) {
                        var date = new Date(commande.date);
                        commande.day = date.getDate();
                        commande.month = date.getMonth() + 1;
                        commande.promotions = JSON.parse("[" + commande.promotions + "]");
                        commande.sbds = JSON.parse("[" + commande.sbds + "]");
                        if (commande.state == 1) {
                            commande.state = "avec commande";
                        }
                        else if (commande.state == 2) {
                            commande.state = "visite annulée";
                        }
                        else {
                            commande.state = "--";
                        }


                        commande.promotions = commande.promotions.length;
                        commande.sbds = commande.sbds.length;
                        $scope.total += commande.totalTTC;

                        $scope.missions.push(commande);
                    });
                },
                function (error) {
                    console.debug(error);
                });


    })

    