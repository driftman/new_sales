app.controller('RoutesCtrl', function ($scope, $cordovaGeolocation, $ionicLoading, $ionicPopup, $rootScope, $ionicModal,
                                        Missions, Clients, Commandes, GPS,
                                        $ionicSideMenuDelegate, $state, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        $scope.ca = 0;
        $scope.missions = [];
        $scope.data = {};
        $scope.$parent.clearFabs();
        $timeout(function () {
            $scope.$parent.showHeader();
        }, 500);

        $scope.$parent.setHeaderFab('left');

        var profile = $scope.infos = JSON.parse(window.localStorage['profile'] || "{}");

        $scope.data.missions = [];

        /****************************************************/
        $scope.days = [];
        var today = new Date(Date.now());
        today.setHours(0, 0, 0, 0);
        var todayMs = today.getTime();
        var todayDay = today.getDay();
        var startDay = todayDay + 1;
        while (startDay <= 6) {
            $scope.days.push(startDay);
            startDay += 1;
        }
        /***************************************************/
        $scope.day = 0;
        $scope.test = function () {
            $scope.missions = [];
            $ionicLoading.show({
                template: "chargement ..."
            });
            $timeout(function () {

                var requestDate = new Date(Date.now() + ($scope.day - todayDay) * 24 * 60 * 60 * 1000);
                requestDate.setHours(0, 0, 0, 0);
                var time = requestDate.getTime();
                console.log("Between : " + new Date(time) + " and : " + new Date((time + 24 * 60 * 60 * 1000)));
                Missions.getMissionsBetween(time, time + 24 * 60 * 60 * 1000, profile.id_db).then(
                    function (missions) {

                        angular.forEach(missions, function (mission) {
                            $scope.missions.push(mission);
                        });
                    },
                    function (error) {
                        console.log(error.message);
                    });
                $ionicLoading.hide();
            }, 1000);

        };

        todayMissions();

        $scope.codeRoute = "";

        $scope.showCodeRoute = false;

        $scope.hier = function () {
            yesterdayMissions();
        };

        function yesterdayMissions() {
            $scope.missions = [];


            $ionicLoading.show({
                template: "Recherche en cours ..."
            })
            Missions.getYesterdayMissions(profile.id_db).then(
                function (missions) {
                    console.log(missions);
                    if (missions.length > 0) {
                        $scope.showCodeRoute = true;
                        $scope.codeRoute = missions[0].codeRoute;
                    }
                    else {
                        $scope.codeRoute = "";
                    }
                    angular.forEach(missions, function (mission, index) {
                        $scope.missions.push(mission);
                    });
                },
                function (error) {

                })
                .finally(function () {
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 600);
                });
        }


        function todayMissions() {
            $scope.missions = [];


            $ionicLoading.show({
                template: "Recherche en cours ..."
            })
            Missions.getTodaysMissions(profile.id_db).then(
                function (missions) {

                    if (missions.length > 0) {
                        $scope.showCodeRoute = true;
                        $scope.codeRoute = missions[0].codeRoute;
                    }
                    else {
                        $scope.codeRoute = "";
                    }

                    angular.forEach(missions, function (mission, index) {

                        /*// IF ACTIVITE HAS GPS RULE !
                         if(false)
                         {
                         if(GPS.distance(object, mission, 300))
                         {
                         $scope.missions.push(mission);
                         }
                         }
                         else
                         {

                         }*/
                        $scope.missions.push(mission);

                    });
                },
                function (error) {

                })
                .finally(function () {
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 600);
                });
        }

        $scope.today = function () {

            todayMissions();
        };


        $scope.retard = function () {
            $scope.missions = [];
            $scope.showCodeRoute = false;
            $ionicLoading.show({
                template: "chargement ..."
            });
            $timeout(function () {
                $ionicLoading.hide();
                Missions.getOtherMissions(profile.id_db).then(
                    function (missions) {
                        angular.forEach(missions, function (mission) {
                            $scope.missions.push(mission);
                        });
                    },
                    function (error) {
                        console.log(error.message);
                    });
            }, 1000);
        };


        $scope.goToClient = function (mission) {
            if ((mission.state == null) || (mission.state == 0)) {
                mission.entryDate = Date.now();
                window.localStorage["mission"] = JSON.stringify(mission);
                /*if(window.localStorage.getItem("mission") == null)
                 {

                 }*/
                $state.go("app.client", {id: mission.client_id});
            }
        };


        $scope.goClient = function (_id) {
            $state.go('app.client', {id: _id});
        };
        angular.extend($scope, {
            client: {
                lat: 33.565721,
                lng: -7.626388,
                zoom: 12
            },
            markers: {
                m1: {
                    lat: 33.533333,
                    lng: -7.583333,
                    focus: false,
                    draggable: false,
                    message: "Je suis là !",
                    icon: {
                        iconUrl: 'img/vendeur.png',
                        iconSize: [46, 46], // size of the icon
                        shadowSize: [50, 64], // size of the shadow
                        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                    }
                },
                m2: {
                    lat: 33.565721,
                    lng: -7.626388,
                    focus: true,
                    draggable: false,
                    message: "<h5><b>Votre client est ici !</b></h5>",
                    icon: {
                        iconUrl: 'img/red.png',
                        iconSize: [46, 46], // size of the icon
                        shadowSize: [50, 64], // size of the shadow
                        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                    }
                }

            },
            layers: {
                baselayers: {
                    googleTerrain: {
                        name: 'Google Terrain',
                        layerType: 'TERRAIN',
                        type: 'google'
                    },
                    googleHybrid: {
                        name: 'Google Hybrid',
                        layerType: 'HYBRID',
                        type: 'google'
                    },
                    googleRoadmap: {
                        name: 'Google Streets',
                        layerType: 'ROADMAP',
                        type: 'google'
                    }
                }
            }
        });
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function (address) {
            $scope.address = address;
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });


    })

    