app.controller('AppCtrl', function ($state, $ionicPopup, Stock, Ventes, Chargement, PrinterService, $interval, $scope, $ionicModal, $ionicPopover, $timeout, $rootScope, $ionicLoading) {
        // Form data for the login modal
        $scope.loginData = {};
        $scope.isExpanded = false;
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;

        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function () {
                this.classList.toggle('active');
            });
        }

        $scope.ventesChecked = $state.is("app.ventes");

        ''
        


        ////////////////////////////////////////
        // Layout Methods
        ////////////////////////////////////////

        $scope.hideNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        };

        $scope.showNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        };

        //$scope.infos = JSON.parse(window.localStorage['profile']);
        $scope.noHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };
        var profile = JSON.parse(window.localStorage['profile'] || '{}');
        $scope.profile = profile;
        var isLivreur = ( (typeof(profile.fonction) != "undefined") && (profile.fonction == "livreur") );

        $scope.isLivreur = isLivreur;
        $scope.isVendeur=( (typeof(profile.fonction) != "undefined") && (profile.fonction == "vendeur") );
        $scope.isPrevendeur=( (typeof(profile.fonction) != "undefined") && (profile.fonction == "prevendeur") );

        var choices;
        if(profile.fonction == "vendeur") {
            choices = [{title: "Stock", code: 0}, {title: "Chargement", code: 1}, {title: "Ventes", code: 2}];
        } 
        else if(profile.fonction == "livreur") {
            choices = [{title: "Stock", code: 0}];
        } else {
            choices = [{title: "Ventes", code: 2}];
        }


        if (!isLivreur) {
            choices.push({title: "Chargement", code: 1});
        }

        $scope.choices = {items: choices, choosen: -1};

        $scope.goProfile = function () {
            
            if (profile.fonction == 'livreur') {
                $state.go("app.profile2");
            }
            else if (profile.fonction == 'prevendeur' || profile.fonction == 'vendeur') {
                $state.go("app.profile");
            }
            else {
                console.log("R.A.S");
            }
        };

        $scope.goHome = function () {
            
            if (profile.fonction == 'livreur') {
                $state.go("menu.entry2");
            }
            else if (profile.fonction == 'prevendeur' || profile.fonction == 'vendeur') {
                $state.transitionTo("menu.entry");
            }
            else {
                console.log("R.A.S");
            }
        };

        $scope.test = function () {
            window.open('img/test.pdf', '_blank', 'location=yes');
        };
        $scope.logout = function () {


            var popUp = $ionicPopup.show({

                template: '<div style="font-size: 13px;" >Etes-vous sûr de vouloir vous déconnecter ? <br><br> <div style="font-size: 12px;"> <b>N.B</b>: Vos ventes en cours seront toutes supprimées. </div></div>',

                buttons: [
                    {
                        text: "OUI",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {

                            e.preventDefault();

                            popUp.close();

                            $ionicLoading.show({
                                template: 'Déconnection en cours ...'
                            });

                            $timeout(
                                function () {
                                    window.localStorage.clear();
                                    $state.transitionTo("menu.login");
                                    $ionicLoading.hide();
                                }, 2000);

                        }
                    },
                    {
                        text: "NON",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                        }
                    }
                ],
                title: '<h4>Déconnection</h4>'
            });


            

        }

        $scope.setExpanded = function (bool) {
            $scope.isExpanded = bool;
        };

        $scope.setHeaderFab = function (location) {
            var hasHeaderFabLeft = false;
            var hasHeaderFabRight = false;

            switch (location) {
                case 'left':
                    hasHeaderFabLeft = true;
                    break;
                case 'right':
                    hasHeaderFabRight = true;
                    break;
            }

            $scope.hasHeaderFabLeft = hasHeaderFabLeft;
            $scope.hasHeaderFabRight = hasHeaderFabRight;
        };

        $scope.hasHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }

        };

        $scope.hideHeader = function () {
            $scope.hideNavBar();
            $scope.noHeader();
        };

        $scope.showHeader = function () {
            $scope.showNavBar();
            $scope.hasHeader();
        };

        $scope.clearFabs = function () {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };



        $scope.checked = function (code) {
            console.debug($scope.choices.choosen);
        };

        $scope.print = function () {

            var popUp = $ionicPopup.show({

                scope: $scope,

                templateUrl: "choix.html",

                buttons: [
                    {
                        text: "TERMINER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            var choice = $scope.choices.choosen;
                            popUp.close();
                            print(choice);
                        }
                    },
                    {
                        text: "ANNULER",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                        }
                    }
                ],
                title: 'Impression',
                subTitle: '(' + $scope.choices.items.length + ')'
            });
        };


        function print(choice) {
            if (choice == 0) {
                printStock();
            }
            else if (choice == 1) {
                printChargement();
            }
            else if (choice == 2) {
                printVentes();
            }
            else {
                console.debug("NOTHING !");
            }
        }

        $scope.menu = function () {
            console.log("--")
            if (profile.fonction == "livreur") {
                $state.transitionTo("menu.entry2");
            }
            else {
                $state.transitionTo("menu.entry");
            }

        };

        function printVentes() {

            Ventes.get(profile.id_db)
                .then(
                    function (commandes) {
                        console.debug(commandes);
                        PrinterService.formattedContentVentes(commandes)
                            .then(function (content) {
                                cordova.exec(printSucces, printError, "ZebraBluetoothPrinter", "zebra", [content]);
                            });
                    },
                    function (error) {
                        console.debug(error);
                    });

        }

        function printError(msg) {
            console.log(msg);
            $ionicLoading.hide();
            $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth"));

        }

        function printSucces(msg) {
            console.log(JSON.stringify(msg));
            $ionicLoading.hide();
            $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Etat chargement imprimée avec succès"));
        }


        function printChargement() {

            $ionicLoading.show({
                template: "Collecte d'informations en cours ..."
            });

            Chargement.getLastDetailedChargements(profile.id_db)
                .then(
                    function (input) {

                        $ionicLoading.show({
                            template: "Impression chargement en cours ..."
                        });

                        var demande = {};
                        var lignes = input.output;
                        console.debug(lignes);
                        demande.lignes = lignes;
                        demande.code = input.chargement_id;
                        demande.date = input.date;

                        PrinterService.formattedContentChargement(demande)
                            .then(
                                function (content) {
                                    cordova.exec(printSucces, printError, "ZebraBluetoothPrinter", "zebra", [content]);
                                });
                    },
                    function (error) {
                        console.debug(error);
                    }).finally(function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 900);
            });
        }

        function printStock() {

            $ionicLoading.show({
                template: "Collecte d'informations en cours ..."
            });

            var stock = [];

            Stock.get(profile.id_db).then(
                function (success) {

                    console.debug(success);

                    $ionicLoading.show({
                        template: "Impression état stock en cours ..."
                    });

                    angular.forEach(success, function (ligne, index) {

                        var packet = Math.trunc(ligne.totalStock / ligne.unitConversion);
                        var unit = ligne.totalStock % ligne.unitConversion;

                        ligne.caisse = packet;
                        ligne.unite = unit;

                        stock.push(ligne);
                    });

                    PrinterService.formatedContentStock([stock]).then(
                        function (content) {
                            console.debug(content);
                            cordova.exec(printSucces, printError, "ZebraBluetoothPrinter", "zebra", [content]);
                        },
                        function (error) {
                            console.debug(error);
                        });

                },
                function (error) {
                    console.debug(error);
                }).finally(function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 900);
            });
        }
    })

    