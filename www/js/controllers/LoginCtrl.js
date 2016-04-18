app.controller('LoginCtrl', function ($scope, $rootScope, $ionicPopup, IonicPopUpUtilities, $timeout, $cordovaToast, $ionicLoading,
                                       $stateParams, Parametrage, $ionicSideMenuDelegate, $state, $ionicModal, ionicMaterialInk, Accounts, Profile, Clients) {


        var serverConfiguration = Parametrage.server();
       $rootScope.infos = {};
        $scope.error_change_password = false;
        $scope.error_forgot_password = false;

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal_change_password = modal;
        });
        $ionicModal.fromTemplateUrl('modal-password.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal_forgot_password = modal;
        });
        var object = null;
        var reponse_secrete = "";
        var trustedUser = null;
        var subCurrentUser = null;
        $scope.question = "";

        function updateIonicLoading(message) {
            $ionicLoading.hide();
            $ionicLoading.show({
                template: message
            });
            $timeout(
                function () {
                    $ionicLoading.hide();
                }, 2000);
        }

        $scope.getAccount = function (username) {
            Accounts.getAccountByUserName(username).then(
                function (account) {
                    object = {};
                    console.log(account);
                    $scope.error_forgot_password = false;
                    $scope.question = account.question_secrete;
                    object.reponse_secrete = account.reponse_secrete;
                    object.question_secrete = account.question_secrete;
                    subCurrentUser = account;
                },
                function (error) {
                    console.log(error.message);
                    $scope.info = error.message;
                    $scope.error_forgot_password = true;
                });
        };
        $scope.login = function (object) {

            window.localStorage.removeItem("profile");
            $ionicLoading.show({
                template: 'Connexion en cours ...'
            });
            console.log(typeof object);
            if (typeof object != "undefined" && typeof object.username != "undefined" && typeof object.password != "undefined") {
                Accounts.getAccountByUserNameAndPassword(object.username, object.password).then(
                    function (user) {


                        if (typeof user === "undefined") {
                            updateIonicLoading('Erreur fatale !');
                            return;
                        }
                        if (user != null) {

                            updateIonicLoading('Bienvenue à bord');
                            current_user = user;

                            Parametrage.get().then(function (object) {

                                user.parametrage = object;

                                window.localStorage['profile'] = JSON.stringify(user);

                                $timeout(function () {
                                    if (user.fonction == "prevendeur" || user.fonction == "vendeur") {
                                        console.debug("NOT LIVREUR !");
                                        $state.go("menu.entry");
                                    }
                                    else if (user.fonction == "livreur") {
                                        console.debug("LIVREUR !");
                                        $state.go("menu.entry2");
                                    }
                                }, 2200);
                            });

                        }
                        else if (user != null && user.first_login === 0) {
                            window.localStorage['profile'] = JSON.stringify(user);
                            updateIonicLoading('Bienvenue à bord');
                            current_user = user;
                            $timeout(function () {
                                if (user.fonction == "prevendeur" || user.fonction == "vendeur") {
                                    console.debug("NOT LIVREUR !");
                                    $state.go("menu.entry");
                                }
                                else if (user.fonction == "livreur") {
                                    console.debug("LIVREUR !");
                                    $state.go("menu.entry2");
                                }
                            }, 2200);
                        }
                        else {
                            Parametrage.get().then(function (conf) {

                                // updateIonicLoading();
                                if (conf.server.name == "" || conf.server.ip == "") {
                                    $ionicLoading.hide();
                                    $ionicPopup.alert(IonicPopUpUtilities.alert("Configuration", "Veuiller configurer l'adresse du serveur et la société"));
                                    return;
                                }
                                else {
                                    var parametrageObject = JSON.stringify({ parametrage: ( conf || {} ) });
                                    window.localStorage["profile"] = parametrageObject;
                                    $ionicLoading.show({template: 'Tentative de connexion à ' + conf.server.name});
                                    Accounts.connectFromAPI(object, conf.server.ip).then(
                                        function (success) {
                                            console.log(success);
                                            var profileToProfile = {};
                                            updateIonicLoading("Bienvenue à bord");
                                            var data = success.data.content.mobile.employee;
                                            var activite = success.data.content.mobile.activite;
                                            console.log(JSON.stringify(data));
                                            var _id_db = success.data.content.mobile.employee.id;
                                            var goldenPointsVendeur = data.goldenPoints != null ? data.goldenPoints : 0;
                                            console.log(typeof data.goldenPoints);
                                            var account = {
                                                id_db: data.id,
                                                username: object.username,
                                                password: object.password,
                                                type: object.type || 0,
                                                golden_points: success.data.content.mobile.fonction == 'vendeur' ? goldenPointsVendeur : 0,
                                                golden_stores: success.data.content.mobile.fonction == 'vendeur' ? goldenPointsVendeur : 0,
                                                fonction: success.data.content.mobile.fonction,
                                                activite: data.activiteID,
                                                societe: conf.company.id,
                                                token: success.data.content.token
                                            };
                                            console.log(account);
                                            Accounts.addAccount(account).then(
                                                function (success1) {
                                                    console.log("addAccount !");
                                                    console.log(JSON.stringify(success1));
                                                    if (typeof success1.insertId != "undefined") {
                                                        var profile = {
                                                            id_db: _id_db,
                                                            name: data.nom,
                                                            second_name: data.prenom,
                                                            address: data.adresse,
                                                            email_address: data.email,
                                                            phone_number: data.telMobile != null ? data.telMobile : "0663310772",
                                                            id_account: success1.insertId,
                                                            activite: data.activiteID,
                                                            token: account.token,
                                                            parametrage: conf,
                                                            objectif_golden_points: "NA",
                                                            objectif_golden_stores: "NA",
                                                            objectif_ca: "NA",
                                                            ca: 0,
                                                            golden_stores: account.golden_stores,
                                                            golden_points: account.golden_points,
                                                            fonction: account.fonction
                                                            
                                                        };

                                                        window.localStorage['profile'] = JSON.stringify(profile || {});

                                                        Profile.addProfile(profile).then(
                                                            function (success2) {
                                                                console.log(JSON.stringify(success2));
                                                                if (typeof success2.insertId !== "undefined") {
                                                                    
                                                                    updateIonicLoading("Votre espace personnel a été créé avec succes !");
                                                                    var fonction = JSON.parse(window.localStorage['profile'] || '{}').fonction || "";
                                                                    if (fonction == "prevendeur" || fonction == "vendeur") {
                                                                        $state.go("menu.entry");
                                                                    }
                                                                    else if (fonction == "livreur") {
                                                                        $state.go("menu.entry2");
                                                                    }
                                                                }
                                                                else {
                                                                    updateIonicLoading("Erreur lors de la création de votre personnel !");
                                                                    console.log(success2);
                                                                }
                                                            },
                                                            function (error) {
                                                                console.log(error.message);
                                                            });
                                                    }
                                                    else {
                                                        updateIonicLoading("Erreur lors de la création de votre personnel !");
                                                    }
                                                },
                                                function (error) {
                                                    console.log(error);
                                                });

                                        },
                                        function (error) {
                                            console.log(error);
                                            switch (error.status) {
                                                case 404:
                                                    updateIonicLoading("Erreur lors de la connexion");
                                                    break;
                                                case 401:
                                                    updateIonicLoading("Username ou mot de passe incorrecte .");
                                                    break;
                                                case 400:
                                                    updateIonicLoading("Username ou mot de passe incorrecte .");
                                                    break;
                                                case 403:
                                                    updateIonicLoading("Connexion refusée");
                                                    break;
                                                case 500:
                                                    updateIonicLoading("Problème technique");
                                                    break;
                                                default:
                                                    updateIonicLoading("Username ou mot de passe incorrecte .");
                                                    break;
                                            }
                                        }).finally(function () {
                                        
                                    });
                                }

                            });
                        }
                    },
                    function (message) {
                        console.log(JSON.stringify(message));

                    });
            }
            else {
                updateIonicLoading("Veuillez remplir tout les champs !");
            }
        };

        $scope.reponse = function (reponse) {
            if (object !== null) {
                console.log("Votre réponse est : ");
                console.log(JSON.stringify(reponse));
                console.log(object);
                console.log(reponse);
                console.log(reponse === object.reponse_secrete);
                object = null;
                current_user = subCurrentUser;
                console.log("THE CURRENT USER : ");
                console.log(current_user);
                $scope.modal_forgot_password.hide();
                $scope.modal_change_password.show();
            }
            else {
                console.log("Essayez de répondre !");
                $scope.error_forgot_password = false;
            }
        };
        $scope.password_forgot = function () {
            $scope.username = "";
            $scope.question = "";
            $scope.reponse.value = "";
            $scope.modal_forgot_password.show()
        };
        $scope.changementMDP = function (object) {
            if (!object.password || !object.second_password || !object.question_secrete || !object.reponse_secrete) {
                $scope.error_change_password = true
            }
            if (object.password !== object.second_password) {
                $scope.error_change_password = true;
            }
            else {
                Accounts.changePassword(current_user.username, object.password, object.question_secrete, object.reponse_secrete)
                    .then(
                        function () {
                            $scope.error = false;
                            $scope.modal_change_password.hide();
                            $state.go("menu.entry");
                        },
                        function (erreur) {
                            console.log("Une erreur est survenu lors du changement de mot de passe !" + erreur.message);
                        });
            }
        };

    })

    