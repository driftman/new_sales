app.controller('ConfigurationCtrl', function ($rootScope, $scope, $timeout, $ionicPopup, $ionicLoading, Parametrage, $state, IonicPopUpUtilities) {
        $scope.newForm = false;
        $scope.disableAdd = false;
        $scope.disableConfirmation = true;
        $scope.chosen = {};

        Parametrage.get().then(
            function (success) {
                console.log(JSON.stringify(success));
                $scope.chosen = success;
            },
            function (error) {
                console.log(JSON.stringify(error));
                $scope.chosen = error;
            });
        //$scope.chosen.printer.name == ""

        $scope.confirm = function () {
            if ($scope.chosen.server.name == "" || $scope.chosen.company.name == "") {
                console.log("NO !");
            }
            else {
                $ionicLoading.show({template: "Enregistrement des paramètres en cours ... "});

                Parametrage.set($scope.chosen).then(
                    function (success) {
                        console.log(JSON.stringify(success));
                        $timeout(function () {
                            $ionicLoading.hide();
                            $state.go("menu.login");
                        }, 1200);

                    },
                    function (error) {
                        console.log(JSON.stringify(error));
                        $timeout(function () {
                            $ionicLoading.hide();
                            $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Une erreur est survenue"));
                        }, 1200);

                    });
            }
        };

        $scope.printers = [];

        function printSuccess(data) {
            var keys = Object.keys(data);

            angular.forEach(keys, function (key) {
                $scope.printers.push({name: key, mac: data[key]});
            });
        }

        function printError(error) {
            console.log(error)
            console.log("error" + JSON.stringify(error));
        }

        //cordova.exec(printSuccess, printError, "ZebraBluetoothPrinter", "bluetooth", ["DO NOT REMOVE THIS!"]);

        $scope.showAddForm = function () {
            $scope.newForm = true;
            $scope.disableAdd = true;
            $scope.disableConfirmation = false;
            console.log("show add");

        }

        $scope.testing = function () {
            console.log("azer");

        }
        $scope.aChanged = function () {
            console.log("ff", $scope);

        }
        $scope.wasSelected = function (item, listName) {
            $scope.chosen.server = item;
        }

        $scope.showScope = function () {
            console.log("showScope", $scope);
        }

        $scope.partsChanged = function (chara) {
            console.log('chara', chara, $scope.server[chara + 'Part']);
            if (typeof($scope.server[chara + 'Part']) !== 'undefined' && chara !== 'p' && $scope.server[chara + 'Part'] > 255)
                $scope.server[chara + 'Part'] = 255;
            if (typeof($scope.server[chara + 'Part']) !== 'undefined' && chara === 'p' && $scope.server[chara + 'Part'] > 65535)
                $scope.server[chara + 'Part'] = 65535;
        }

        $scope.companies = [{name: "DISLOG", id: 2}, {name: "COMUNIVERS", id: 1}];

        $scope.servers = [{name: "comunivers", ip: "192.168.100.148:8082"}];

        $scope.showPrintersPop = function showPopup() {
            console.log("inside popup");
            var popUp = $ionicPopup.show({
                scope: $scope,
                templateUrl: "printers.html",
                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            popUp.close();
                        }
                    }
                ],
                title: 'Imprimantes',
                subTitle: "(" + $scope.printers.length + ")"
            });
            console.debug(popUp);
        }
        $scope.showCompsPopup = function showPopup() {
            console.log("inside popup");
            var popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "companies.html",
                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            popUp.close();
                        }
                    }
                ],
                title: 'Sociétés',
                subTitle: "(" + $scope.companies.length + ")"
            });
            console.debug(popUp);
        }

        $scope.showServersPop = function showPopup() {
            var serversSize = $scope.servers.length;
            console.log($scope.servers.length);
            $scope.server = {"test": "qsdfs"};
            $scope.createServerEntry = function () {
                console.log($scope.server);
                return {
                    "name": $scope.server.name.toUpperCase(),
                    "ip": $scope.server.aPart + "." + $scope.server.bPart + "." + $scope.server.cPart + "." + $scope.server.dPart + ":" + $scope.server.pPart
                };
            }
            $scope.confirmAddition = function () {
                console.log("confirmAddition", $scope);
                var serverEntry = $scope.createServerEntry();
                console.log("dsf", serverEntry);
                if (serverEntry.ip.search("undefined") < 0 && serverEntry.ip.search("null") < 0) {
                    $scope.servers.push(serverEntry);
                    console.log("servers content", $scope.servers);
                    $scope.server = {};
                    $scope.newForm = false;
                    $scope.disableAdd = false;
                    $scope.disableConfirmation = true;
                }
            }
            console.log("inside popup", $scope);
            var popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "servers.html",
                buttons: [

                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            console.log("servers", $scope);
                            e.preventDefault();
                            popUp.close();
                        }
                    }
                ],
                title: 'Servers'
            });
            console.debug(popUp);
        }

    })

    