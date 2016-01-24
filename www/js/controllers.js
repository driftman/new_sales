/*global angular, document, window */
'use strict';
var current_user = {};
angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($state, $scope, $ionicModal, $ionicPopover, $timeout, $rootScope, $ionicLoading) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }


    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    //$scope.infos = JSON.parse(window.localStorage['profile']);
    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };
    var profile = JSON.parse(window.localStorage['profile'] || '{}');
    $scope.profile = profile;
    $scope.goProfile = function(){
        if(profile.fonction == 'livreur')
        {
            $state.go("app.profile2");
        }
        else if(profile.fonction == 'prevendeur')
        {
            $state.go("app.profile");
        }
        else
        {
            console.log("R.A.S");
        }
    };
    $scope.test = function(){
        window.open('img/test.pdf', '_blank', 'location=yes');
    };
    $scope.logout = function(){
        $ionicLoading.show({
            template: 'Deconnexion en cours ...'
        });
        $timeout(
            function(){
                window.localStorage.clear();
                $state.transitionTo("menu.login");
                $ionicLoading.hide();
            }, 2000);
        
    }

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
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

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('PromotionsCtrl', function(
    $scope, 
    $stateParams, 
    $ionicSideMenuDelegate, 
    $timeout, 
    $rootScope,
    ionicMaterialMotion, 
    ionicMaterialInk, 
    Promotions,
    $state)
{
    $scope.infos = JSON.parse(window.localStorage['profile']);
    $scope.$parent.clearFabs();
    // Set Header
    $ionicSideMenuDelegate.canDragContent(true);
    $timeout(function()
        {
            $scope.$parent.showHeader();
        }, 500);
    
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 1000);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 1000
        });
    }, 1500);

    // Set Ink
    ionicMaterialInk.displayEffect();
    $scope.promotions = [];
    Promotions.getAllPromotions().then(
        function(promotions){
                angular.forEach(promotions, function(promotion){
                    $scope.promotions.push(promotion);
                });
            
        }, 
        function(error){
            console.log("Erreur : "+error.message);
        });
})

.controller('PromotionCtrl', ['$scope', '$stateParams', function($scope, $stateParams){

}])

.controller('LoginCtrl', function($scope, $rootScope, $timeout, $cordovaToast, $ionicLoading,
    $stateParams, $ionicSideMenuDelegate, $state, $ionicModal, ionicMaterialInk, Accounts, Profile, Clients) {
    $rootScope.infos = {};
    $scope.$parent.clearFabs();
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.error_change_password = false;
    $scope.error_forgot_password = false;

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal_change_password = modal;
      });
    $ionicModal.fromTemplateUrl('modal-password.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal_forgot_password = modal;
      });
    var object = null;
    var reponse_secrete = "";
    var trustedUser = null;
    var subCurrentUser = null;
    $scope.question = "";
    
    function updateIonicLoading(message)
    {
        $ionicLoading.hide();
        $ionicLoading.show({
            template : message
        });
        $timeout(
        function(){
            $ionicLoading.hide();
        }, 2000);
    }
    $scope.getAccount = function(username)
    {
        Accounts.getAccountByUserName(username).then(
            function(account){
                object = {};
                console.log(account);
                $scope.error_forgot_password=false;
                $scope.question = account.question_secrete;
                object.reponse_secrete = account.reponse_secrete;
                object.question_secrete = account.question_secrete;
                subCurrentUser = account;
            },
            function(error){
                console.log(error.message);
                $scope.info = error.message;
                $scope.error_forgot_password=true;
            });
    };
    $scope.login = function(object) {  
        $ionicLoading.show({
          template : 'Connexion en cours ...'
        });   
        console.log(typeof object);
      if(typeof object != "undefined" && typeof object.username != "undefined" && typeof object.password != "undefined")
      {
        Accounts.getAccountByUserNameAndPassword(object.username, object.password).then(
        function(user){
            console.log(user);
            if(typeof user === "undefined")
            {
                updateIonicLoading('Erreur fatale !');
                return;
            }
            if(user != null && user.first_login == 1)
            {
                window.localStorage['profile'] = JSON.stringify(user);
                updateIonicLoading('Connexion réussi !');
                current_user = user;
                $timeout(function(){
                    if(user.fonction == "prevendeur")
                    {
                        $state.go("menu.entry");
                    }
                    else if(user.fonction == "livreur")
                    {
                        $state.go("menu.entry2");
                    }
                }, 2000);

            }
            else if( user != null && user.first_login === 0)
            {
                window.localStorage['profile'] = JSON.stringify(user);
                updateIonicLoading('Connexion réussi !');
                current_user = user;
                $timeout(function(){
                    if(user.fonction == "vendeur")
                    {
                        $state.go("menu.entry");
                    }
                    else if(user.fonction == "livreur")
                    {
                        $state.go("menu.entry2");
                    }
                }, 2000);
            }
            else
            {
                updateIonicLoading('Tentative de connexion à NewSales ');
                Accounts.connectFromAPI(object).then(
                    function(success){
                        console.log(success);
                        var profileToProfile = {};
                        updateIonicLoading("Connexion réussi !");
                        var data = success.data.content.mobile.employee;
                        var activite = success.data.content.mobile.activite;
                        console.log(JSON.stringify(data));
                        var _id_db = success.data.content.mobile.employee.id;
                        var goldenPointsVendeur = data.goldenPoints != null ? data.goldenPoints : 0;
                        console.log(typeof data.goldenPoints);
                        var account = {
                            id_db : data.id,
                            username : object.username,
                            password : object.password,
                            golden_points : success.data.content.mobile.fonction == 'vendeur' ? goldenPointsVendeur : 0,
                            golden_stores : success.data.content.mobile.fonction == 'vendeur' ? goldenPointsVendeur : 0 ,
                            fonction : success.data.content.mobile.fonction,
                            activite : data.activiteID,
                            token: success.data.content.token
                        };
                        console.log(account);
                        Accounts.addAccount(account).then(
                                function(success1){
                                    console.log("addAccount !");
                                    console.log(success1);
                                    if(typeof success1.insertId !== "undefined")
                                    {
                                        var profile = {
                                            id_db : _id_db,
                                            name : data.nom,
                                            second_name : data.prenom,
                                            address : data.adresse,
                                            email_address : data.email,
                                            phone_number : data.telMobile != null ? data.telMobile : "0663310772",
                                            id_account : success1.insertId,
                                            activite: data.activiteID,
                                            token: account.token
                                        };
                                        
                                        Profile.addProfile(profile).then(
                                            function(success2){
                                                console.log(JSON.stringify(success2));
                                                if(typeof success2.insertId !== "undefined")
                                                {
                                                    profile.golden_stores = account.golden_stores;
                                                    profile.golden_points = account.golden_points;
                                                    profile.fonction = account.fonction;
                                                    window.localStorage['profile'] = JSON.stringify(profile);
                                                    updateIonicLoading("Votre espace personnel a été créé avec succes !");
                                                    if(JSON.parse(window.localStorage['profile'] || '{}').fonction == "prevendeur")
                                                    {
                                                        $state.go("menu.entry");
                                                    }
                                                    else if(JSON.parse(window.localStorage['profile'] || '{}').fonction == "livreur")
                                                    {
                                                        $state.go("menu.entry2");
                                                    }
                                                }
                                                else
                                                {
                                                    Profile.getProfiles(
                                                        function(success){
                                                            console.log(JSON.stringify(success));
                                                        }, function(error){
                                                            console.log(JSON.stringify(error));
                                                        });
                                                    updateIonicLoading("Erreur lors de la création de votre personnel !");
                                                    console.log(success2);
                                                }
                                            },
                                            function(error){
                                                console.log(error.message);
                                            });
                                    }
                                    else
                                    {
                                        Profile.getProfiles(
                                                        function(success){
                                                            console.log(JSON.stringify(success));
                                                        }, function(error){
                                                            console.log(JSON.stringify(error));
                                                        });
                                        updateIonicLoading("Erreur lors de la création de votre personnel !");
                                    }
                            },
                            function(error){
                                console.log(error);
                            });

                    }, 
                    function(error){
                        console.log(JSON.stringify(error));
                        switch(error.status)
                        {
                            case 404:
                                updateIonicLoading("Erreur lors de la connexion");
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
                    });
            }
        },
        function(message){
            console.log(JSON.stringify(message));
            
        });
      }
      else
      {
        updateIonicLoading("Veuillez remplir tout les champs !");
      }
    };
    
    $scope.reponse = function(reponse){
        if(object !== null)
        {
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
        else
        {
            console.log("Essayez de répondre !");
            $scope.error_forgot_password=false;
        }
    };
    $scope.password_forgot = function(){
        $scope.username = "";
        $scope.question = "";
        $scope.reponse.value = "";
        $scope.modal_forgot_password.show()
    };
    $scope.changementMDP = function(object) {
        if(!object.password || !object.second_password || !object.question_secrete || !object.reponse_secrete)
        {
            $scope.error_change_password = true
        }
        if(object.password !== object.second_password)
        {
            $scope.error_change_password = true;
        }
        else
        {
            Accounts.changePassword(current_user.username, object.password, object.question_secrete, object.reponse_secrete)
            .then(
            function(){
                $scope.error = false;
                $scope.modal_change_password.hide();
                $state.go("menu.entry");
            },
            function(erreur){
                console.log("Une erreur est survenu lors du changement de mot de passe !"+erreur.message);
            });
        }
    };
    
})

.controller('EntryCtrlLivreur', function($scope, Livreur, $ionicPopup, SynchronisationV2, $ionicLoading, $http, $timeout, Articles, Marques, Missions){
    
    $scope.profile = JSON.parse(window.localStorage['profile'] || "{}");
    console.log($http.defaults);
    var infos = JSON.parse(window.localStorage['profile']);
    $scope.synchronization = function(){
        $ionicLoading.show({
            template : "Synchronisation en cours ..."
        });
        SynchronisationV2.syncV2LivreurAll(infos.id_db).then(
            function(success){
                console.log(success);
            }, 
            function(error){
                console.log(error);
            }).finally(function(){
                console.log("END !");
                 $ionicLoading.hide();
            });


        
    };
})

.controller('EntryCtrl', function($scope, $rootScope, DumpDB, Surveys, ModePaiement, ca,  $timeout, $ionicPopup, CallSteps, $ionicLoading, $state, Routes, BrandFive, SBD, Commandes, Missions, Clients, Articles, Promotions, Marques, SynchronisationV2){
    
    $scope.ca = ca.ca;
    $scope.test = function(){
        window.open('img/test.pdf', '_blank', 'location=yes');
    };
    $scope.infos = JSON.parse(window.localStorage['profile']);
    var infos = JSON.parse(window.localStorage['profile']);
    $scope.synchronization = function(){
        //SBD.syncSBDFromAPI();
        $ionicLoading.show({
            template : "Synchronisation en cours ..."
        });
        //Promotions.syncPromotions();
        //ModePaiement.sync();
        SynchronisationV2.syncV2(infos.id_db).then(
            function(success){
                console.log(success);
            }, 
            function(error){
                console.log(error);
            }).finally(function(){
                console.log("final !");
                $timeout(function(){
                    $ionicLoading.hide();
                }, 1000);
            });





            BrandFive.addBrandFive({
                id_db: 1,
                code_marque: "GILLETTE",
                name: "GILLETTE"
            });
            BrandFive.addBrandFive({
                id_db: 2,
                code_marque: "DURACELL",
                name: "DURACELL"
            });
            BrandFive.addBrandFive({
                id_db: 3,
                code_marque: "PANTENE",
                name: "PANTENE"
            });
            BrandFive.addBrandFive({
                id_db: 4,
                code_marque: "ORALB",
                name: "ORALB"
            });
        /*Commandes.syncCommandes().then(
            function(success){
               Commandes.sendCommandeToAPI(success);
               console.log(JSON.stringify(success));
            }, 
            function(error){
                console.log(JSON.stringify(error));
            });
*/


        /*var array = [
        
        'update marque SET logo = "img/always.jpg" WHERE marqueArticle like "%ALWA%";',
        'update marque SET logo = "img/PAMPERS.jpg" WHERE marqueArticle like "%PAMPERS%";',
        'update marque SET logo = "img/ARIEL.jpg" WHERE marqueArticle like "%ARIE%";',
        'update marque SET logo = "img/ACE.png" WHERE marqueArticle like "%ACE%";', 
        'update marque SET logo = "img/KOLESTONE.jpg" WHERE marqueArticle like "%KOLESTO%";',
        'update marque SET logo = "img/gillette.png" WHERE marqueArticle like "%GILLETT%";',
        'update marque SET logo = "img/HS.jpg" WHERE marqueArticle like "%H&S%";',
       ' update marque SET logo = "img/MRPROPRE.png" WHERE marqueArticle like "%MRPROPRE%"; ',
        'update marque SET logo = "img/PANTENE.png" WHERE marqueArticle like "%PANT%";',
        'update marque SET logo = "img/tide.jpg" WHERE marqueArticle like "%TID%"',
        'update marque SET logo = "img/PANTENE.png" WHERE marqueArticle like "%PANT%"',
        'update marque SET logo = "img/PRETPLUS.jpg" WHERE marqueArticle like "%PLUS%"',
        'update marque SET logo = "img/FAIRY.jpg" WHERE marqueArticle like "%FAIR%"',
        'update marque SET logo = "img/DOWNY.gif" WHERE marqueArticle like "%DOW%"',
        'update marque SET logo = "img/DURACELL.png" WHERE marqueArticle like "%DURACELL%"'];

        DumpDB.dump(array);

        $ionicLoading.show({
            template : "Synchronisation en cours ..."
        });



        $timeout(function(){
            $ionicLoading.hide();
            $ionicPopup.alert({
             title: 'Terminé',
             template: 'Synchronisation terminée !'
           });
        }, 8000);*/

        //SBD.syncSBDFromAPI();
       /* Promotions.syncPromotions();
        Commandes.syncCommandes().then(
            function(success){
               Commandes.sendCommandeToAPI(success);
               console.log(JSON.stringify(success));
            }, 
            function(error){
                console.log(JSON.stringify(error));
            });
*/
        //Routes.syncRoutes(infos.id_db);
        /*Missions.syncMissions(infos.id_db).then(
            function(success){
                console.log(success);
            },
            function(error){
                console.log(error.message)
            });*/

       /* Clients.syncClients(infos.id_db);
        Articles.syncArticles();
        Marques.getAll().then(
            function(success){
                console.log(JSON.stringify(success));
            },
            function(error){
                console.log(JSON.stringify(error));
            });
        ///////////////////////////////////////////
        BrandFive.addBrandFive({
            id_db: 1,
            code_marque: "GILLETTE",
            name: "GILLETTE"
        });
        BrandFive.addBrandFive({
            id_db: 2,
            code_marque: "DURACELL",
            name: "DURACELL"
        });
        BrandFive.addBrandFive({
            id_db: 4,
            code_marque: "PANTENE",
            name: "PANTENE"
        });
        BrandFive.addBrandFive({
            id_db: 5,
            code_marque: "ORALB",
            name: "ORALB"
        });
        BrandFive.addBrandFive({
            id_db: 3,
            code_marque: "DURACELL",
            name: "DURACELL"
        });*/
        /////////////////////////////////////////////

    };
})

.controller('ClientCtrl', function(
    $scope, 
    $stateParams, 
    $ionicSideMenuDelegate, 
    $timeout, 
    $rootScope,
    $ionicSlideBoxDelegate,
    Missions,
    Clients,
    Commandes,
    LigneCommandes,
    Articles,
    ionicMaterialMotion, 
    ionicMaterialInk, 
    Promotions,
    $document,
    $cordovaGeolocation,
    $state,
    $ionicLoading,
    CallSteps,
    checkPoint,
    EntryPoint)
{
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.vente = typeof window.localStorage['cart'] == "undefined";
    $scope.checkPoint = function(){
        $state.go(checkPoint);
    };
    console.log($scope.vente);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
    $ionicSlideBoxDelegate.update();
    $scope.$on('$ionicView.beforeEnter', function() {
        $ionicSlideBoxDelegate.update();
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.clients = [];
    $scope.infos = JSON.parse(window.localStorage['profile']);
    $scope.client = {};
    var clientObject;
    $scope.mission_id = $rootScope.mission;
    $scope.center = {
            lat: 33.565721, 
            lng: -7.626388,
            zoom: 15
        };
    $scope.defaults = { zoomControl: false, layerControl: false, tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'};
    $scope.markers = { 
            m2: {
                lat: 33.565721, 
                lng: -7.626388,
                focus: true,
                draggable: false,
                message: "<h5><b>Votre client est ici !</b></h5>",
                icon: {
                    iconUrl: 'img/red.png',
                    iconSize:     [46, 46], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                }
            } 

        };

    $scope.goClient = function(){
        console.log(clientObject);
        var steps = [];
        CallSteps.get().then(
            function(success){
                for(var i = 0 ; i < success.length ; i++)
                {
                    var object = {
                        rank: success[i].rank,
                        title: success[i].title,
                        name: success[i].name
                    };
                    if(success[i].rank == 1)
                    {
                        object.active = true;
                    }
                    else
                    {
                        object.active = false;
                    }
                    steps.push(object);
                }
                window.localStorage['callSteps'] = JSON.stringify(steps);
                EntryPoint.prepare(clientObject.id_db);
            }, 
            function(error){
                console.log(error);
            });
        $ionicLoading.show({
            template : "Préparation de la visite en cours ..."
        });
        var startDay = new Date();
        var mission = {
            ville: "Casablanca",
            region: "GRAND CASABLANCA",
            route: clientObject.route,
            nom: clientObject.nom,
            prenom: clientObject.prenom,
            codeClient: clientObject.code_client,
            lat: clientObject.lat,
            lng: clientObject.lng,
            route_id: $scope.client.route,
            client_id: $scope.client.id_db,
            date_start: startDay.getTime(),
            state: 0,
            synced: false,
            entryDate : Date.now()
        };
        if(($scope.client.lat == null || $scope.client.lat == 0) || ($scope.client.lng == null || $scope.client.lng == 0))
        {
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                      var object = {};
                      object.lat  = position.coords.latitude;
                      object.lng = position.coords.longitude;
                      console.log(object);
                      console.log(clientObject.id_db);
                      Clients.updateClientCoords(clientObject.id_db, object).then(
                        function(success){
                            console.log("Successfully up to date !");
                            console.log(success);
                        },
                        function(error){
                            console.log("Error while updating");
                        });
                    }, function(err) {
                      console.log("WE'LL TRY NEXT TIME!");
                });
        }
        else
        {
            console.log("no need !");
        }
        if(typeof window.localStorage['mission'] == "undefined")
        {
            window.localStorage['mission'] = JSON.stringify(mission);
        }
        else
        {
            var localMission = JSON.parse(window.localStorage['mission']);
            if(localMission.client_id != $scope.client.id_db)
            {
                window.localStorage['mission'] = JSON.stringify(mission);
            }
        }
        $timeout(
            function(){
                $ionicLoading.hide();
                var callSteps = JSON.parse(window.localStorage['callSteps']);
                for(var i = 0 ; i < callSteps.length ; i++)
                {
                    if(callSteps[i].active)
                    {
                        $state.go(callSteps[i].name);
                        console.log("Go to : "+callSteps[i].name)
                    }
                }
            }, 5000);
        
        
    };

    var clientName;
    Clients.getClient($stateParams.id).then(
        function(client){
            // TO MAKE SURE NO ERROR WILL OCCURE !!
            if(typeof client.lat != "undefined" && typeof client.lng != "undefined")
            {
                if(client.lat != null && client.lng != null)
                {
                    if(client.lat != 0 && client.lng != 0)
                    {
                        $scope.center.lat =  $scope.markers.m2.lat = client.lat;
                        $scope.center.lng =  $scope.markers.m2.lng = client.lng;
                    }
                }
            }
            $scope.markers.m2.message = '<h5><b style="color: #B71C1C;">'+ client.nom+" "+client.prenom+"</b></h5> <br>Adresse : "+ client.address+"<br> Telephone : 0651239689";
            $scope.client = client;
            clientObject = client;
            clientName  = clientObject.name;
        }, 
        function(error){
            console.log(error.message);
        });
    Commandes.getCAVendeur().then(
        function(result){
            console.log(result);
            $scope.caVendeur = result.ca;
        }, 
        function(error){
            console.log(error.message);
        });
    Commandes.getCAClient($stateParams.id).then(
        function(data){
            $scope.ca = data.ca;
        },
        function(error){
            console.log(error.message);
        });
    Commandes.getAVGClient($stateParams.id).then(
        function(data){
            $scope.avg = data.avg;
        },
        function(error){
            console.log(error.message);
        });

    $scope.commandes = [];
    Commandes.getCommandesByClient($stateParams.id).then(
        function(data){
            console.log(data);
            var object = {};
            for(var j = 0 ; j < data.length ; j++)
            {
                console.log(data[j].code_commande);
                object[data[j].code_commande] = 0;
            }
            var distinctArray = Object.keys(object);
            for(var i = 0 ; i < distinctArray.length ; i++)
            {
                var trueObject = {};
                trueObject.code_commande = distinctArray[i];
                trueObject.ligneCommandes = [];
                for(var j = 0 ; j < data.length ; j++)
                {
                    if(data[j].code_commande === distinctArray[i])
                    {
                        var ligneCommande = {
                            designation: data[j].designation,
                            packets: data[j].packets,
                            total: data[j].total,
                            units: data[j].units,
                            prixVente: data[j].prixVente
                        };
                        trueObject.ligneCommandes.push(ligneCommande);
                    }
                }
                $ionicSlideBoxDelegate.update();
                $scope.commandes.push(trueObject);
                $ionicSlideBoxDelegate.update();
            }
        }, 
        function(error){
            console.log(error.message);
        });


        
        /*markers: {
            m1: {
                lat: 33.533333,
                lng: -7.583333,
                focus: false,
                draggable: false,
                message: "Je suis là !",
                icon: {
                    iconUrl: 'img/vendeur.png',
                    iconSize:     [46, 46], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
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
                    iconSize:     [46, 46], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                }
            } 

        },*/


    /*angular.extend($scope, {
        
        client2: {
            lat: 33.533333,
            lng: -7.583333,
            zoom: 13
        },
        markers2: {
            m1: {
                lat: 33.533333,
                lng: -7.583333,
                focus: true,
                draggable: false,
                message: $scope,
                icon: {
                    iconUrl: 'img/red.png',
                    iconSize:     [46, 46], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
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
            });*/


        

})

.controller('RoutesCtrl', function($scope, $ionicLoading, $ionicPopup, $rootScope, $ionicModal,
    Missions, Clients, Commandes,
    $ionicSideMenuDelegate, $state, $timeout, ionicMaterialMotion, ionicMaterialInk){
    $scope.ca = 0;
    $scope.missions = [];
    $scope.data = {};
    var length = 0;
    var scrollPosition = 0;
    $scope.$parent.clearFabs();
    $timeout(function()
        {
            $scope.$parent.showHeader();
        }, 500);
    $scope.$parent.setHeaderFab('left');
    $scope.infos = JSON.parse(window.localStorage['profile']);
    var profile = JSON.parse(window.localStorage['profile']);
    $scope.address = "";
    $scope.noMoreItemsAvailable = false;
    $scope.data.missions = [];
    
    /****************************************************/
    $scope.days = [];
    var today = new Date(Date.now());
    today.setHours(0,0,0,0);
    var todayMs = today.getTime();
    var todayDay = today.getDay();
    var startDay = todayDay + 1;
    while(startDay <= 6)
    {
        $scope.days.push(startDay);
        startDay+=1;
    }
    /***************************************************/
    $scope.day = 0;
    $scope.test = function(){
        $scope.missions = [];
        $ionicLoading.show({
            template: "chargement ..."
        });
        $timeout(function(){

            var requestDate = new Date(Date.now()+($scope.day - todayDay)*24*60*60*1000);
            requestDate.setHours(0,0,0,0);
            var time = requestDate.getTime();
            console.log("Between : "+new Date(time)+" and : "+new Date((time+24*60*60*1000)));
            Missions.getMissionsBetween(time, time+24*60*60*1000, profile.id_db).then(
                function(missions){
                    
                    angular.forEach(missions, function(mission){
                        $scope.missions.push(mission);
                    });
                }, 
                function(error){
                    console.log(error.message);
                });
            $ionicLoading.hide();
        }, 1000);
        
    };
    Missions.getTodaysMissions(profile.id_db).then(
            function(missions){
                angular.forEach(missions, function(mission){
                    $scope.missions.push(mission);
                });
            }, 
            function(error){
                console.log(error.message);
            });

    $scope.today = function(){
        $scope.missions = [];
        $ionicLoading.show({
            template: "chargement ..."
        });
        $timeout(function(){
            Missions.getTodaysMissions(profile.id_db).then(
            function(missions){
                angular.forEach(missions, function(mission){
                    $scope.missions.push(mission);
                });
            }, 
            function(error){
                console.log(error.message);
            });
            $ionicLoading.hide();
        }, 1000);
    };

    $scope.retard = function(){
        $scope.missions = [];
        $ionicLoading.show({
            template: "chargement ..."
        });
        $timeout(function(){
            $ionicLoading.hide();
            Missions.getOtherMissions(profile.id_db).then(
                function(missions){
                    console.log(missions);
                    angular.forEach(missions, function(mission){
                        $scope.missions.push(mission);
                    });
                }, 
                function(error){
                    console.log(error.message);
                });
        }, 1000);
    };


    $scope.goToClient = function(mission){
        if( (mission.state == null) || (mission.state == 0) )
        {
            mission.entryDate = Date.now();
            window.localStorage['mission'] = JSON.stringify(mission);
            $state.go("app.client", {id : mission.client_id});
        }
        else
        {
            console.log(mission);
            $ionicPopup.alert({
                title : "Visité !"
            });
        }
    };

    
    
    $scope.goClient = function(_id)
    {
        $state.go('app.client',{ id : _id});
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
                    iconSize:     [46, 46], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
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
                    iconSize:     [46, 46], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
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
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function(address) {
        $scope.address = address;
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        // Execute action
      });

                     
    
})

.controller('ClientsCtrl', function($scope, $stateParams, $state, $timeout, $cordovaGeolocation,Routes, Clients, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.clearFabs();
    $timeout(function()
        {
            $scope.$parent.showHeader();
        }, 500);
    $scope.$parent.setHeaderFab('left');
    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();
    var infos = JSON.parse(window.localStorage['profile']);
    $scope.infos = infos;
    // Set Ink
    $scope.clients = [];
    $scope.$parent.clearFabs();
    $scope.sync = function(){
        Clients.syncClients(1);
    };
    Clients.getAllClients(infos.id_db).then(

        function(clients){
            console.log(JSON.stringify(clients));
            var routes = {};
            angular.forEach(clients, function(client){
                    routes[client.route] = "";
                    $scope.clients.push(client);
                });
            $scope.routes = Object.keys(routes);
        }, 
        function(error){
            console.log(JSON.stringify(error));
        });
    $scope.goClient = function(_id){
        $state.transitionTo('app.client', { id : _id});
    };
    

    
})
.controller('Profile2Ctrl', function($scope, $ionicSideMenuDelegate, IonicPopUpUtilities, $ionicLoading, $timeout, EntryPoint, Promotions, $state, $ionicPopup, $ionicModal, ionicMaterialMotion, ionicMaterialInk, Livreur, Missions){
    $scope.profile = JSON.parse(window.localStorage['profile'] || '{}');
    var profile = JSON.parse(window.localStorage['profile'] || '{}');
    $scope.$parent.clearFabs();
    $ionicSideMenuDelegate.canDragContent(true);
    $timeout(function()
        {
            $scope.$parent.showHeader();
        }, 500);
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 1000);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 1000
        });
    }, 1500);

    // Set Ink
    ionicMaterialInk.displayEffect();
    $scope.missions = [];
    $scope.mission = {};
    Livreur.getLivreurMission(profile.id_db).then(
        function(success){
            console.log(success);
            angular.forEach(success, function(mission){
                mission.lignes = JSON.parse(mission.lignes);
                $scope.missions.push(mission);
            });
        }, 
        function(error){
            console.log(error);
        });

    $scope.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Succès',
         template: 'La livraison a bien été confirmé'
       });
     };

    $scope.valid = function(mission)
    {
        Missions.setMissionLivreurToLivred(mission.id_db).then(
            function(success){
                console.log(success);
                mission.state = 1;
                $scope.modal.hide();
                $ionicPopup.alert({
                     title: 'Succès',
                     template: 'La livraison a bien été confirmé'
                   });
            }, 
            function(error){
                console.log(error);
            })
    }

    $ionicModal.fromTemplateUrl('delivery.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.goto = function(mission) {
        if(mission.state == 0)
        {
            console.log(mission)
            var keys = Object.keys(window.localStorage);
            for(var i = 0 ; i < keys.length ; i++)
            {
                if(keys[i] != "profile")
                {
                    window.localStorage.removeItem(keys[i]);
                }
            }
            EntryPoint.prepare(mission.clientId, true);
            var cart = JSON.parse(window.localStorage['cart']);
            cart.mission = mission.missionId;
            cart.items = [];
            angular.forEach(mission.lignes, function(ligne){
                cart.items.push(ligne);
            })
            window.localStorage['cart'] = JSON.stringify(cart)
            $ionicLoading.show({
                template: "Preparation de la visite en cours ..."
            });
            $timeout(function() { $ionicLoading.hide(); $state.go("app.cartLivreur"); }, 5000);
        }
        else
        {
            switch(mission.state)
            {
                case 1:
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Déjà livré !", "La livraison est déjà faite."));
                    break;
                case 2:
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Livraison annulée !", "La livraison à été annulée."));
                    break;
                default:
                    break;

            }
            $ionicPopup.alert(IonicPopUpUtilities.alert("Déjà livré !", "La livraison est déjà faite."))
        }
        /*$scope.mission =mission;
        $scope.modal.show();
        if(mission.state == 1 || mission.finished == 1)
        {
            console.log("WHAT !!");
        }
        else
        {
            $scope.mission =mission;
            $scope.modal.show();
        }*/
      };
      
    
})
.controller('CartLivreurCtrl', function($scope, $timeout, $state, $ionicPopup, Livreur, IonicPopUpUtilities, $ionicLoading, Missions, SBD, Promotions, ModePaiement){
    $ionicLoading.show({
        template: "Chargement des articles ..."
    });

    $scope.data = {};
    $scope.currentDiscount = 0;
    $scope.data.ttc = 0;
    $scope.data.ht = 0;
    $scope.data.items = [];
    var payments = [];


    $scope.cancel = function(){
        console.log("WANNA CANCEL !!")
        Livreur.cancelLivreurMission(JSON.parse(window.localStorage['cart']).mission).then(
            function(success){
                $ionicPopup.alert(IonicPopUpUtilities.alert("Annulée !", "La livraison a bien été annulée "));
                var keys = Object.keys(window.localStorage);
                for(var i = 0 ; i < keys.length ; i++)
                {
                    if(keys[i] != "profile")
                    {
                        window.localStorage.removeItem(keys[i]);
                    }
                }
                $state.transitionTo("app.profile2");
            }, 
            function(error){
                $state.transitionTo("app.profile2");
            });
    };

    $scope.clicked = function(item){
        console.log(item)
        var cart = JSON.parse(window.localStorage['cart']);
        var cartItems = cart.items;
        if(typeof(cartItems) != "undefined" && cartItems.length > 0)
        {   
            for(var i = cartItems.length - 1 ; i >= 0 ; i--)
            {
                var cartItem = cartItems[i];
                if(cartItem.id_db == item.id_db && cartItem.prixVente != 0)
                {
                    cartItems.splice(i, 1);
                }
            }
            window.localStorage['cart'] = JSON.stringify(cart);
        }
        update();
    }

    $scope.finish = function()
    {
        if($scope.currentMethod != null || payments.length == 0)
        {
            var found = false;
            var scopeItems = angular.copy($scope.data.items);
            for(var i = 0, len = scopeItems.length ; i < len ; i++)
            {
                var item = scopeItems[i];
                var outOfStock = item.stock - (item.packet * item.unitConversion + item.unit) < 0
                if(outOfStock && item.prixVente != 0)
                {
                    found = true;
                    break;
                }
            }
            if(!found)
            {
                var cart = JSON.parse(window.localStorage['cart'] || '{}');
                Missions.missionFinishForLivreur([cart.mission, $scope.data.ttc, $scope.data.ht, scopeItems, $scope.currentDiscount])
                .then(
                    function(success){


                        var keys = Object.keys(window.localStorage);

                        for(var i = 0 ; i < keys.length ; i++)
                        {
                            if(keys[i] != "profile")
                            {
                                window.localStorage.removeItem(keys[i]);
                            }
                        }

                        cordova.plugins.zbtprinter.print(success,
                            function(success) { 

                                $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Facture imprimée avec succès")); 

                            }, function(fail) { 

                                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth")); 

                            }
                        );

                    }, 
                    function(error){
                        console.log(error);
                    });
                $ionicLoading.show({ template : "Finalisation de la livraison en cours ..."});
                $timeout(
                    function(){
                        $ionicLoading.hide();
                        $state.go("app.profile2");
                    }, 2000);
            }
            else
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Stock insuffisant !", "Veuillez modifier les quantités."));
            }
        }
        else
        {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Méthode de paiement !", "Veuillez choisir une méthode de paimement."));
        }
    };

    function update()
    {
        $scope.data.items = [];
        var cart = JSON.parse(window.localStorage['cart']);
        var objectStock = JSON.parse(window.localStorage['stock'] || '{}');
        for(var i = 0 ; i < cart.items.length ; i++)
        {
            var item = cart.items[i];
            if(typeof(item.stock) == "undefined" || item.stock == null)
            {
                item.stock = item.packetStock*item.unitConversion + item.unitStock;
            }
            var itemCurrent = item.packet*item.unitConversion + item.unit;
            var diff = item.stock - itemCurrent;

            objectStock[item.id_db] = diff;
            window.localStorage['stock'] = JSON.stringify(objectStock);

            var cartSub = JSON.parse(window.localStorage['cart']);
            var itemsCartSub = cartSub.items;
            for(var j = i+1, len = itemsCartSub.length ; j < len ; j++)
            {
                var subItem = itemsCartSub[j];
                if(subItem.id_db == item.id_db)
                {
                    subItem.stock = diff;
                    var newCart = { mission: cart.mission, items : itemsCartSub};
                    console.log(newCart);
                    window.localStorage['cart'] = JSON.stringify(newCart);
                    break;
                }
            }
            window.localStorage['cart'] = JSON.stringify(cart);
            check(item);
            $scope.data.items.push(item);
            
            if(i == cart.items.length - 1)
            {
                console.log(JSON.parse(window.localStorage['promotions']));
                
                $ionicLoading.hide();
            }
        }
        cart = JSON.parse(window.localStorage['cart']);
        var object = Promotions.promotionDiscountsWithPriorities();
        $scope.data.ht = object.ht;
        $scope.data.ttc = object.ttc;

    }


    update();
    var object = Promotions.promotionDiscountsWithPriorities();
    $scope.data.ht = object.ht;
    $scope.data.ttc = object.ttc;
    addGiftsToCart();
    update();


    var cart = JSON.parse(window.localStorage['cart']);
    for(var i = 0, len = cart.items.length ; i < len ; i++)
    {
        var item = cart.items[i];
        // Promotions Treatments + SBDs Treatments  !!
        // Should be outside for new elements !!
        check(item);
    }
    var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
    for(var i = 0 , len = promotions.length ; i < len ; i++)
    {
        var promotion = promotions[i];
        if(promotion.consumed)
        {
            console.log("THIS PROMOTION IS CONSUMED !");
        }
        else
        {
            console.log("THIS PROMOTIONS IS NOT !!");
        }
    }


    $scope.modalities = false;
    $scope.paymentMethods = [];
    ModePaiement.getAll().then(
    function(success){
        console.log(success);
        payments = success;
        angular.forEach(success, function(payment){
            payment.remises = JSON.parse(payment.remises);
            console.log(payment);
            $scope.paymentMethods.push(payment);
        });
    }, 
    function(error){    
        console.log(error);
    });
    $scope.paymentDate = new Date();
    $scope.currentDiscount = 0;
    $scope.currentMethod = null;
    $scope.openDatePicker = function()
    {
        $cordovaDatePicker.show({

            date: new Date(),
            mode: 'date', 
            minDate: new Date(),
            maxDate: new Date() + 3*30*24*60*60*1000,
            allowOldDates: false,
            allowFutureDates: true,
            doneButtonLabel: 'OK',
            doneButtonColor: '#F2F3F4',
            cancelButtonLabel: 'ANNULER',
            cancelButtonColor: '#000000'

        }).then(function(date){
            $scope.paymentDate = date;
            countDiscount($scope.currentMethod.remises, ($scope.paymentDate.getTime() - new Date(new Date().setHours(0,0,0,0)).getTime())/(24*60*60*1000));
        });
    };
    $scope.change = function(id)
    {
        for(var i = 0 ; i < payments.length ; i++)
        {
            console.log($scope.currentMethod);
            if(payments[i].id == id)
            {

                $scope.currentMethod = payments[i];
                console.log($scope.currentMethod);
                if(typeof(payments[i].remises) != "undefined" && payments[i].remises != null && payments[i].remises.length > 0)
                    {
                        countDiscount(payments[i].remises, ($scope.paymentDate.getTime() - new Date(new Date().setHours(0,0,0,0)).getTime())/(24*60*60*1000));
                    }
                    else
                    {
                        $scope.currentDiscount = 0.7;
                    }
            }
            
        }
        $scope.details = [];
    }
    function countDiscount(discounts, difference)
    {
        console.log(discounts);
        difference = difference < 0 ? -1*difference : difference;
        $scope.currentDiscount = 0;
        for(var i = 0 ; i < discounts.length ; i++)
        {
            if(difference >= discounts[i].min && difference < discounts[i].max)
            {
                $scope.currentDiscount = discounts[i].remise;
                break;
            }
        }
    }


    $scope.check = function(target){
        check(target);
        update();
    };

    function cleanCart()
    {
        var items = $scope.data.items;
        for(var i = items.length - 1 ; i >= 0 ; i--)
        {
            var item = items[i];
            if(item.prixVente == 0)
            {
                items.splice(i, 1);
            }
        }
    }

    function addGiftsToCart()
    {
        cleanCart();
        var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
        var promotionsIds = [];
        for(var i = 0 ; i < promotions.length ; i++)
        {
            var promotion = promotions[i];
            if(promotion.consumed)
            {
                promotionsIds.push(promotion.id);
                if(promotion.gratuites != null && promotion.gratuites.length > 0)
                {
                    console.log(i)
                    var cumule = (promotion.cumule != null && typeof(promotion.cumule) != "undefined") ? promotion.cumule : 1;
                    console.log(cumule);
                    for(var j = 0 ; j < promotion.gratuites.length ; j++)
                    {
                        var gratuite = promotion.gratuites[j];
                        var trueItem = {
                            id : gratuite.id,
                            id_db : gratuite.id,
                            designation : gratuite.designation,
                            unit : gratuite.qty*cumule,
                            packet : 0,
                            prixVente : 0,
                            promo : true,
                            remise : 0
                        };
                        $scope.data.items.push(trueItem);
                        window.localStorage['gratuites'] = JSON.stringify(promotions);
                    }
                }
            }

        }
    }

    function check(item)
    {
        var valid = ( item.stock - ( (item.packet * item.unitConversion) + item.unit) ) > 0;
        // ADD OR REMOVE FROM CART !!
        var cart = JSON.parse(window.localStorage['cart'] || '{}');

        var found = false;
        for(var i = cart.items.length - 1, min = 0 ; i >= 0 ; i--)
        {
            var cartItem = cart.items[i];
            if(valid && cartItem.id_db == item.id_db)
            {
                cartItem.unit = item.unit;
                cartItem.packet = item.packet;
                cartItem.valid = true;
                found = true;
                continue;
            }
            else if(!valid && cartItem.id_db == item.id_db)
            {
                cartItem.unit = item.unit;
                cartItem.packet = item.packet;
                cartItem.valid = false;
                found = true;
                continue;
            }
            else
            {
                continue;
            }  
        }

        if(!found && valid)
        {
            item.valid = true;
            cart.items.push(item);
        }
        window.localStorage['cart'] = JSON.stringify(cart);

        if(item.groupeSBD != null && item.groupeSBD != 0)
        {
            console.log("SBD");
            SBD.SBDTreatment(item);
            addGiftsToCart();
        }

        if(item.promotions != null)
        {
            var itemStock = (item.packetStock*item.unitConversion) + item.unitStock;
            var itemCurrentQty = (item.packet*item.unitConversion) + item.unit;
            if(item.promotions.length > 0)
            {
                Promotions.promotionTreatment(item, true);
                addGiftsToCart();
            }
        }
        
        
    }


})

.controller('ProfileCtrl', function($scope,  $http, $rootScope, $stateParams, $ionicSlideBoxDelegate,
    Routes, SynchronizationService,$ionicLoading, Profile, $cordovaToast, Commandes, BrandFive, Missions, LigneCommandes,
    $ionicSideMenuDelegate, Surveys, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, ca) {
    
    Surveys.getFormattedSurveys().then(
        function(success){
            console.log(success);
        }, 
        function(error){
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
    $timeout(function()
        {
            $scope.$parent.showHeader();
        }, 500);
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.ca = ca.ca;
    $scope.finishedMissions = [];
    var infos = JSON.parse(window.localStorage['profile'] || "{}"); 
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
    Profile.getGPAccount().then(function(ca){$scope.gp = ca.golden_points; }, function(){err});
    BrandFive.getCABrandFive(infos.id_db).then(
        function(brands){
            console.log(brands);
            angular.forEach(brands, function(brand){
                $scope.brandfive.push(brand);
            });
        }, 
        function(error){
            console.log(error.message);
        });

    Missions.countMissions(infos.id_db).then(
        function(result){
            console.log(result);
            $scope.data = [];
            $scope.colours = ["#81C784", "#F57C00", "#FF5252"];
            $scope.data.push(result.finished, result.waiting, result.problem);
        }, 
        function(error){
            console.log(error.message);
        });
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 1000);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 1000
        });
    }, 1500);

    // Set Ink
    ionicMaterialInk.displayEffect();
    
    Missions.getFinishedMissions(infos.id_db).then(
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
        });
   


})

.controller('BrandsCtrl', function($scope, $state, Commandes, IonicPopUpUtilities, $ionicPopup, position, LigneCommandes, $stateParams, Articles, $ionicModal, Missions){
    
    
    // PROPER TO DATA !!
    $scope.data = {};
    $scope.data.items = JSON.parse(window.localStorage['cart']).items;

    //PROPER TO CALL STEPS !!
    $scope.hasNext = position.hasNext;
    $scope.hasPrevious = position.hasPrevious;

    // NEXT STEP !!
    $scope.next = function(){
        if(position.hasNext)
            {
                var marques = JSON.parse(window.localStorage['marques'] || "{}")
                var canGo = typeof(marques.exclusion) == "undefined" ? false : marques.exclusion.canGo;
                var gone = typeof(marques.exclusion) == "undefined" || typeof(marques.exclusion.gone) == "undefined"  ? false : marques.exclusion.gone;
                if(canGo && !gone)
                {
                    marques.exclusion.gone = true;
                    window.localStorage['marques'] = JSON.stringify(marques);
                    $state.go('app.brand',{ name:  "ACE", mission: $stateParams.mission});
                }
                else
                {
                    $state.go(position.nextStep.name);
                }
                
            }
    };
    // PREVIOUS STEP !!
    $scope.previous = function(){
        if(position.hasPrevious)
            {
                $state.go(position.previousStep.name);
            }
    };

    // EXCLUSIONS FROM THE MEETING OF 21/01/2016  , Proposed by MONCEF in order to access to a predefined brand by conditions !!
    // HERE the brand that is in condition is ACE.
    var _marques = JSON.parse(window.localStorage['marques'] || "{}");
    var _gone = typeof(_marques.exclusion) == "undefined" || typeof(_marques.exclusion.gone) == "undefined"  ? false : _marques.exclusion.gone;
    var exclusion = _gone ? [] : [10];


    
    $scope.ca = 0;
    $scope.goCart = function(){
        if(JSON.parse(window.localStorage['done']))
        {
            $state.go("app.remainings");
        }
        else
        {
            if(JSON.parse(window.localStorage['cart']).items.length > 0)
            {
                $state.go("app.cart");
            }
            else
            {
                $ionicPopup.alert({
                    title: "Panier vide !",
                    buttons: [
                        {
                            text: "OK",
                            type: "button-assertive",
                            cssClass: "assertive-survey"
                        }
                    ],
                    template: '<span style="font-size: 12px; font-weight: 600;">Le panier doit au moins contenir un article.</span>'
                });
            }
            
        }
    };


    $scope.infos = JSON.parse(window.localStorage['profile']);    $scope.rows = [];
    
    var marques = JSON.parse(window.localStorage['marques'] || "{}");

    var canGoToExclusion = typeof(marques.exclusion) != "undefined" && marques.exclusion.canGo;
    
    Articles.getMarques(exclusion).then(
        function(marques){
            var count = marques.length;
            var exclusionCount = 0;
            for(var i = 0 ; i < count - (count % 5) ; i+=5)
            {
                var row = [];
                for(var j = i ; j < i+5 ; j++)
                {
                    var checked = typeof(JSON.parse(window.localStorage['marques'] || "{}")[marques[j].marqueArticle]) != "undefined";
                    if(checked)
                    {
                        ++exclusionCount;
                    }
                    marques[j].checked = checked;
                    row.push(marques[j]);
                }
                $scope.rows.push(row);
            }
            var finalRow = [];
            for(var i = count - (count % 5) ; i < count ; i++)
            {
                var checked = typeof(JSON.parse(window.localStorage['marques'] || "{}")[marques[i].marqueArticle]) != "undefined";
                if(checked)
                {
                    ++exclusionCount;
                }
                marques[i].checked = checked;
                finalRow.push(marques[i]);
            }
            $scope.rows.push(finalRow);
            // IF THE CAN GO IS ALREADY SETTED THERE IS NO NEED TO SET !!

            var _marques = JSON.parse(window.localStorage['marques'] || "{}");

            if(typeof(_marques.exclusion) == "undefined")
            {
                if(exclusionCount === count)
                {
                    canGoToExclusion = true;
                    _marques.exclusion = {};
                    _marques.exclusion.canGo = canGoToExclusion;
                    window.localStorage['marques'] = JSON.stringify(_marques);
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Bravo !", "Vous avez atteint l'objectif 100% distribution"));
                }
            }

        }, 
        function(error){
            console.log(error);
        });
    
    $scope.goToBrand = function(marque){
        $state.go('app.brand',{ name:  marque, mission: $stateParams.mission});
    };
})

.controller('AddCtrl', function($scope, $state, $timeout, $ionicLoading, $cordovaGeolocation, Missions, Clients){
      

      $scope.goHome= function(){
        $state.transitionTo("app.profile");
      };
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $scope.ca = 0;
      $scope.client = {};
      $scope.routes = [];
      $scope.infos = JSON.parse(window.localStorage['profile']);      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
            $scope.client.lat  = position.coords.latitude;
            $scope.client.lng = position.coords.longitude;
            console.log(position.coords);
        }, function(err) {
          // error
          console.log(error.message);
        });
      Missions.getVendeurRoutes().then(
      function(routes){
        angular.forEach(routes, function(route){
            $scope.routes.push(route.route_id);
        });
      },
      function(error){
        console.log(error.message);
      });
      console.log(JSON.stringify($scope.client));
      $scope.addNewClient = function(client){
        $ionicLoading.show({
          template: 'Loading...'
        });
        Clients.addNewClient(client).then(
            function(success){
                console.log(success);
                $ionicLoading.hide();
                $ionicLoading.show({
                  template: typeof success.insertId === "undefined" ? "Erreur lors de l'ajout !" : "Client ajouté avec succes !"
                });
                $timeout(function(){$ionicLoading.hide();}, 1000);
            },
            function(error){
                $ionicLoading.hide();
                $ionicLoading.show({
                  template: 'Erreur ...'
                });
                $timeout(function(){$ionicLoading.hide();}, 1000);
            });
      };
})

.controller('CartCtrl', function($state, $stateParams, $filter, IonicPopUpUtilities, PrinterService, Promotions, $timeout, $cordovaDatePicker,$cordovaFile, $scope, $ionicPopup, $cordovaPrinter,  ca, position, Commandes, Accounts, Clients, Missions, LigneCommandes, Articles, ModePaiement){
    var promotionsSuccess = [];
    var replace = true;
    

    $scope.print = function(){

        PrinterService.formatedContent( [angular.copy($scope.data.items), JSON.parse(window.localStorage['mission'] || '{}'), $scope.data.ht, $scope.data.ttc, $scope.currentDiscount ],"Pre-vendeur" )
        .then(
            function(success){
                console.log(success);
                cordova.plugins.zbtprinter.print(success,
                    function(success) { 
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Facture imprimée avec succès")); 
                        var mission = JSON.parse(window.localStorage['mission'] || "{}");
                        mission.cancel = false;
                        window.localStorage['cart'] = JSON.stringify(mission);
                    }, function(fail) { 
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth")); 
                    }
                );
            }).finally(function(){
                //$ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "-"));
            });
    };

    $scope.cancel = function(){
        var mission = JSON.parse(window.localStorage['mission'] || "{}");
        if(typeof(mission.cancel) == "undefined" || mission.cancel)
        {
            var keys = Object.keys(window.localStorage);
            for(var i = 0 ; i < keys.length ; i++)
            {
                if(keys[i] != "profile")
                {
                    window.localStorage.removeItem(keys[i]);
                }
            }
            $ionicPopup.alert(IonicPopUpUtilities.alert("Annulée !", "La commande a bien été annulée "))
            $state.transitionTo("app.profile");
        }
        else
        {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur !", "Vous n'êtes pas autorisé à annuler une commande après l'impression. "));
        }
    }
    $scope.footerBar = true;
    window.addEventListener("native.keyboardshow", keyboardShowHandler);
    window.addEventListener("native.keyboardhide", keyboardHideHandler);
    function keyboardShowHandler(e)
    {
        $scope.footerBar = false;
    }
    function keyboardHideHandler(e)
    {
        $scope.footerBar = true;
    }
    console.log(position);
    $scope.hasNext = position.hasNext;
    $scope.hasPrevious = position.hasPrevious;
    $scope.next = function(){
        var cart = JSON.parse(window.localStorage['cart'] || '{}');

                    var items = cart.items;

                    PrinterService.formatedContent( [angular.copy($scope.data.items), JSON.parse(window.localStorage['mission'] || '{}'), $scope.data.ht, $scope.data.ttc, $scope.currentDiscount ],"Pre-vendeur" )
                    .then(
                        function(success){
                            console.log(success);
                            cordova.plugins.zbtprinter.print(success,
                                function(success) { 
                                    $ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "Facture imprimée avec succès")); 
                                }, function(fail) { 
                                    $ionicPopup.alert(IonicPopUpUtilities.alert("Problème d'impression", "Veuillez activer/désactiver le Bluetooth")); 
                                }
                            );
                        }).finally(function(){
                            //$ionicPopup.alert(IonicPopUpUtilities.alert("Impression terminée", "-"));
                        });

                   if($scope.currentMethod != null && typeof($scope.currentMethod) != "undefined")
                        {
                            $scope.pay();
                            if($scope.hasNext)
                            {
                                $state.transitionTo(position.nextStep.name);
                            }
                            else
                            {
                                $state.transitionTo("app.profile");
                            }
                        }
                        else
                        {
                            $ionicPopup.alert({
                                title: "Etape manquante !",
                                buttons: [
                                    {
                                        text: "Terminer",
                                        type: "button-assertive",
                                        cssClass: "assertive-survey"
                                    }
                                ],
                                template: '<span style="font-size: 12px; font-weight: 600;">Veuillez choisir une méthode de paiement !</span>'
                            });
                        }
    };
    $scope.previous = function(){
        if(position.hasPrevious)
            {
                $state.transitionTo(position.previousStep.name);
            }
    };
    $scope.ca = ca.ca;
    $scope.hasModes = false;
    var cart = JSON.parse(window.localStorage['cart'] || '{}');
    var canFinish = JSON.parse(window.localStorage['done'] || 'false');
    $scope.infos = JSON.parse(window.localStorage['profile']);    $scope.canFinish = canFinish;
    $scope.data = {};
    $scope.data.items = [];
    $scope.data.ttc = 0;
    $scope.data.ht = 0;
    $scope.currentDiscount = 0;
    if(typeof cart.items != "undefined" && typeof(cart.items) != "undefined" && cart.items.length > 0)
    {
        var promotions = JSON.parse(window.localStorage['promotions']);
        for(var i = 0 ; i < cart.items.length ; i++)
        {
            var item = cart.items[i];
            item.remises = [];
            if(item.promotions != null && item.promotions.length > 0)
            {
                for(var j = 0 ; j < item.promotions.length ; j++)
                {
                    var idPromo = item.promotions[j];
                    for(var k = 0 ; k < promotions.length ; k++)
                    {
                        var promotion = promotions[k];
                        if(idPromo == promotion.id && promotion.consumed && promotion.remise != null && promotion.type != "PC")
                        {
                            item.remises.push({ remise: promotion.remise, priorite: promotion.priorite});
                        }
                    }
                }
            }

            for(var j = 0 ; j < item.remises.length - 1 ; j++)
            {
                for(var k = j+1 ; k < item.remises.length ; k++)
                {
                    if(item.remises[k].priorite < item.remises[j].priorite)
                    {
                        var permut = item.remises[k];
                        item.remises[k] = item.remises[j];
                        item.remises[j] = permut;
                    }
                }
            }
            var remises = 0;
            var prixInitial = (item.packet*item.unitConversion + item.unit) * item.prixVente;
            var prixUnderDiscounts = prixInitial;
            for(var j = 0 ; j < item.remises.length ; j++)
            {
                console.log(item.remises[j]);
                prixUnderDiscounts-=item.remises[j].remise/100*prixUnderDiscounts;
            }
            item.remise = prixInitial - prixUnderDiscounts;
            item.prixBRUT = prixInitial - item.remise;
            $scope.data.ht += item.prixBRUT;
            item.prixTVA = item.prixBRUT * item.tva/100;
            item.prixTTC = item.prixBRUT + item.prixTVA;
            $scope.data.ttc += item.prixTTC;
            $scope.data.items.push(item);
        }
       promotionsSuccess = addGiftsToCart();
       window.localStorage["cart"] = JSON.stringify(cart);
    }
    if(cart != null && typeof cart.mission != "undefined" && cart.mission != null)
    {
        Missions.getMission(cart.mission).then(
        function(mission){
            console.log(mission);
            $scope.data.client = mission.client_id;
        });
    }
    $scope.choice = {
        id: 0,
        details : []
    };

    function getMaxDelayRemise(array)
    {
        var max = array[0].max;
        console.log(array);
        for(var j = array.length - 1 ; j >= 0 ; j--)
        {
            for(var k = 1 ;  k < j ; k++)
            {
                var first = array[k-1];
                var second = array[k];
                if(first.max > second.max)
                {
                    max = first.max;
                }
            }
        }
        return max;
    }
    $scope.modalities = false;
    
    ModePaiement.getAll().then(
    function(success){
        console.log(success);
        payments = success;
        angular.forEach(success, function(payment){
            payment.remises = JSON.parse(payment.remises);
            console.log(payment);
            $scope.paymentMethods.push(payment);
        });
    }, 
    function(error){    
        console.log(error);
    });
    $scope.paymentDate = new Date();
    $scope.currentMethod;
    $scope.currentDiscount = 0;
    $scope.openDatePicker = function()
    {
        $cordovaDatePicker.show({

            date: new Date(),
            mode: 'date', 
            minDate: new Date(),
            maxDate: new Date() + 3*30*24*60*60*1000,
            allowOldDates: false,
            allowFutureDates: true,
            doneButtonLabel: 'OK',
            doneButtonColor: '#F2F3F4',
            cancelButtonLabel: 'ANNULER',
            cancelButtonColor: '#000000'

        }).then(function(date){
            $scope.paymentDate = date;
            countDiscount($scope.currentMethod.remises, ($scope.paymentDate.getTime() - new Date(new Date().setHours(0,0,0,0)).getTime())/(24*60*60*1000));
        });
    };
    $scope.change = function(id)
    {
        for(var i = 0 ; i < payments.length ; i++)
        {
            if(payments[i].id == id)
            {

                $scope.currentMethod = payments[i];
                if(typeof(payments[i].remises) != "undefined" && payments[i].remises != null && payments[i].remises.length > 0)
                    {
                        countDiscount(payments[i].remises, ($scope.paymentDate.getTime() - new Date(new Date().setHours(0,0,0,0)).getTime())/(24*60*60*1000));
                    }
                    else
                    {
                        $scope.currentDiscount = 0.7;
                    }
            }
            
        }
        $scope.details = [];
    }
    function countDiscount(discounts, difference)
    {
        console.log(discounts);
        difference = difference < 0 ? -1*difference : difference;
        $scope.currentDiscount = 0;
        for(var i = 0 ; i < discounts.length ; i++)
        {
            if(difference >= discounts[i].min && difference < discounts[i].max)
            {
                $scope.currentDiscount = discounts[i].remise;
                break;
            }
        }
    }
    var payments = [];
    $scope.paymentMethods = [];
    
    function addGiftsToCart()
    {
        cleanCart();
        var cart = JSON.parse(window.localStorage['cart']);
        var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
        var promotionsIds = [];
        for(var i = 0 ; i < promotions.length ; i++)
        {
            var promotion = promotions[i];
            if(promotion.consumed)
            {
                promotionsIds.push(promotion.id);
                if(promotion.gratuites != null && promotion.gratuites.length > 0)
                {
                    console.log(i)
                    var cumule = (promotion.cumule != null && typeof(promotion.cumule) != "undefined") ? promotion.cumule : 1;
                    console.log(cumule);
                    for(var j = 0 ; j < promotion.gratuites.length ; j++)
                    {
                        var gratuite = promotion.gratuites[j];
                        var trueItem = {
                            id : gratuite.id,
                            id_db : gratuite.id,
                            nomArticle : gratuite.designation,
                            unit : gratuite.qty*cumule,
                            packet : 0,
                            prixVente : 0,
                            promo : true,
                            remise : 0
                        };
                        $scope.data.items.push(trueItem);
                        window.localStorage['gratuites'] = JSON.stringify(promotions);
                    }
                }
            }

        }
        console.log(promotionsIds);
        return promotionsIds;
    }
    function cleanCart()
    {
        var cartItems = angular.copy($scope.data.items);
        for(var i = cartItems.length - 1 ; i >= 0; i--)
        {
            var cartItem = cartItems[i];
            if(cartItem.prixVente == 0)
            {
                $scope.data.items.splice(i, 1);
            }
        }
    }
    function refreshTotalBill()
    {
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
        $scope.totalBill = 0;
        for(var i = 0 ; i < cart.items.length ; i++)
        {
            var noTva = (((cart.items[i].packet*cart.items[i].unitConversion)+(cart.items[i].unit))*(cart.items[i].prixVente));
            if(cart.items[i].tva != null && cart.items[i].tva > 0)
            {
                $scope.totalBill+=( (noTva * cart.items[i].tva / 100) + noTva );
            }
            else
            {
                $scope.totalBill+=noTva;
            }
            
        }
        cart = null;

    }
    refreshTotalBill();
    var missionDB = true;
    $scope.pay = function(){
        var count = countAndCheckGPGS();
        $scope.sbdShow = false;
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
        var mission = JSON.parse(window.localStorage['mission'] || '{}');
        mission.exitDate = Date.now();
        mission.state = true;
        if(cart.mission == null || typeof mission.id_mission == "undefined")
        {
            missionDB = false;
            Missions.addLocalMission(mission).then(
                function(success){
                    var cart = JSON.parse(window.localStorage['cart'] || '{}');
                    var mission = JSON.parse(window.localStorage['mission'] || '{}');
                    cart.mission = success;
                    mission.id_mission = success;
                    window.localStorage['cart'] = JSON.stringify(cart);
                    window.localStorage['mission'] = JSON.stringify(mission);
                    addCommande(cart.mission, mission.client_id, count, promotionsSuccess, $scope.paymentDate.getTime(), $scope.currentDiscount, $scope.currentMethod.id);
                }, 
                function(error){
                    console.log(error);
                });
        }
        else
        {
            addCommande(cart.mission, mission.client_id,  count, promotionsSuccess, $scope.paymentDate.getTime(), $scope.currentDiscount, $scope.currentMethod.id);
        }      
        
    };

    function countAndCheckGPGS()
    {
        console.log("countAndCheckGPGS");
        var sbds = JSON.parse(window.localStorage['sbd']);
        var count = 0;
        for(var i=0;i<sbds.length;i++)
        {
            var min = sbds[i].min;
            var current = 0;
            for(var j=0;j<sbds[i].articles.length;j++)
            {
                current+=sbds[i].articles[j].qty;
            }
            if(current>=min)
            {
                count+=1;
            }
        }
        if(count > 0)
        {
            var profile = JSON.parse(window.localStorage['profile']);
            var mission = JSON.parse(window.localStorage['mission']);
            Accounts.addGoldenPoints(profile.id_db, count).then(
                function(success){
                    console.log(success);
                    profile.golden_stores = profile.golden_stores + count;
                }, 
                function(error){
                    console.log(error);
                });
            Clients.addGoldenStore(mission.client_id, count).then(
                function(success){
                    if(Boolean(success))
                    {
                        $ionicPopup.alert({
                            title: "Bravo Mr. "+mission.nom+" "+mission.prenom+" !",
                            buttons: [
                                {
                                    text: "OK",
                                    type: "button-assertive",
                                    cssClass: "assertive-survey"
                                }
                            ],
                            template: '<span style="font-size: 12px; font-weight: 600;">Vous avez atteint votre objectif GOLDEN STORE !</span>'
                        });
                    }
                    else
                    {
                        console.log("PAS ENCORE");
                    }
                }, 
                function(error){
                    console.log(error);
                });
        }
        return count;
    }

    function addCommande(mission_id, client_id, sbds, promotions, paymentDate, currentDiscount, currentMethod)
    {
        console.log(promotions);
        console.log(sbds);
        var finalCart = JSON.parse(window.localStorage['cart'] || '[]');
        var scopeItems = $scope.data.items;
        for(var i = 0 ; i < scopeItems.length ; i++)
        {
            var scopeItem = scopeItems[i];
            if(scopeItem.prixVente == 0)
            {
                finalCart.items.push(scopeItem);
            }
        }
        var code_commande = "CM"+Date.now();
        Commandes.addCommande(code_commande, mission_id, client_id, sbds, promotions, paymentDate, currentDiscount, currentMethod).then(
            function(success){
                console.log(success);
                
                if(success.insertId != null && typeof(success.insertId) != "undefined")
                {
                    var commande_id = success.insertId;
                    var items = finalCart.items;
                    if(typeof commande_id === "number")
                    {

                        angular.forEach(items, function(item){



                            var ligneCommande = {
                                nomArticle : item.nomArticle,
                                prixVente : item.prixVente,
                                packet : item.packet,
                                unit : item.unit,
                                id : item.id_db,
                                isGift: item.prixVente == 0 ? 1 : 0,
                                remise : item.remise > 0 ? item.remise : 0
                            };
                            console.log(ligneCommande)

                            LigneCommandes.addLigneCommande(ligneCommande, commande_id).then(
                                function(success){
                                    console.log(success);
                                },
                                function(error){
                                    console.log(error.message);
                                });
                        });

                        console.log("ABOUT TO UPDATE MISSION WITH ID : "+mission_id+", AND INJECT COMMANDE : "+commande_id+" TO IT !");
                        var m = JSON.parse(window.localStorage['mission']);
                        if(missionDB)
                        {
                            console.log("THIS IS A MISSION FROM API");
                            Missions.setMissionToSucceed(mission_id, commande_id, m.entryDate, Date.now()).then(
                            function(success){
                                console.log(success);
                            }, 
                            function(error){
                                console.log(error);
                            });
                        }
                        else
                        {
                            console.log("THIS IS A MISSION FROM PHONE");
                            Missions.setMissionToSucceedLocal(mission_id, commande_id).then(
                            function(success){
                                console.log(success);
                            }, 
                            function(error){
                                console.log(error);
                            });
                        }
                    }
                    $scope.canFinish = false
                    var mission = JSON.parse(window.localStorage['mission']);
                    mission.done = true;
                    window.localStorage['mission'] = JSON.stringify(mission);
                    if(!position.hasNext)
                    {
                        window.localStorage.removeItem('cart');
                        window.localStorage.removeItem('sbd');
                        window.localStorage.removeItem('promotions');
                        window.localStorage.removeItem('marques');
                        window.localStorage.removeItem('mission');
                        window.localStorage.removeItem('done');
                        window.localStorage.removeItem('callSteps');
                        window.localStorage.removeItem('surveys');
                        window.localStorage.removeItem('gratuites');
                    }
                }
            }, 
            function(error){
                console.log(error);
            });
        $timeout(
            function(){
                if(position.hasNext)
                {
                   // $state.transitionTo(position.nextStep.name);
                }
                else
                {
                   // $state.transitionTo("app.profile");
                }
            }, 1000);
    }

    $scope.check = function(){
        check(angular.copy($scope.data.items));
        addGiftsToCart();
    };

    function check(articles){
                refreshTotalBill();
                var start = Date.now();
                //Getting the current items in cart to work with !
                var currentBasket = JSON.parse(window.localStorage['cart'] || '{}');
                // Same thing for the Shopper Based Design
                var sbds = JSON.parse(window.localStorage['sbd']);
                angular.forEach(articles, function(article)
                {
                    console.log(article)
                        /******************** TAKING ON CONSIDERATION ONLY THE ONES WITH QTY gt 0 *******************/
                    if((article.packet > 0 || article.unit > 0) && typeof article.promo == "undefined")
                    {
                        /******************** STARTING WITH THE SBD ********************/
                        angular.forEach(sbds, function(sbd){
                            if(article.groupeSBD != null && article.groupeSBD == sbd.id)
                                {
                                    if(sbd.articles != null && sbd.articles.length > 0)
                                    {
                                        angular.forEach(sbd.articles, function(innerArticle){
                                            if(article.id_db == innerArticle.id)
                                            {
                                                innerArticle.qty = article.unit+(article.packet*article.unitConversion);        
                                            }
                                        });
                                    }
                                }
                        });
                       window.localStorage['sbd'] = JSON.stringify(sbds);
                       /************************************************************/
                       

                       /*********************** IF THE CART IS EMPTY WE ADD DIRECTLY THE ARTICLE ***********************/
                       if(currentBasket.items.length == 0)
                        {
                            article.inCart = true;
                            currentBasket.items.push(article);
                        }
                        /*********************** WE'LL SEARCH FOR THE ARTICLE WITH THE SAME ID *************************/
                        else
                        {
                            // FALSE BY DEFAULT !
                            var found = false;
                            angular.forEach(currentBasket.items, function(item){
                                if(item.id_db == article.id_db)
                                {
                                    console.log("INCART");
                                    // ARTICLE FOUND FOR THE CURRENT ITERATION
                                    found = true;
                                    if(article.packet > 0)
                                    {
                                        // THE DIFFERENCE BETWEEN THE CURRENT AND CART VERSION IS ADDED
                                        console.log("Article Packet : "+article.packet);
                                        item.packet=article.packet;
                                    }
                                    if(article.unit > 0)
                                    {
                                        console.log("Article Units : "+article.unit);
                                        item.unit=article.unit;
                                    }
                                    console.log(item.unit);
                                    console.log(article.unit);
                                }
                            });
                            window.localStorage['cart'] = JSON.stringify(currentBasket);
                            if(!found)
                            {
                                // NOT FOUND IN CART WE ADD THE ARTICLE TO CART
                                article.inCart = true;
                                // PUSHED TO CART
                                currentBasket.items.push(article);
                            }
                                
                        }

                        /******************************** PROMOTIONS PART ************************************/
                        var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
                        refreshTotalBill();
                         for(var i = 0 ; i < promotions.length ; i++)
                        {
                            if(promotions[i].type == 'PC')
                            {
                                //console.log("Promotion Client FOR YOU !!");
                                console.log(promotions[i]);
                                console.log($scope.totalBill);
                                if(promotions[i].ca <= $scope.totalBill)
                                {
                                    
                                    promotions[i].consumed = true;
                                   // console.log("CONSOMME");

                                }
                                else
                                {
                                    promotions[i].consumed = false;
                                    console.log("NON CONSOMME");
                                }
                            }
                        }
                        window.localStorage['promotions'] = JSON.stringify(promotions);

                        if(article.promotions != null)
                        {
                            Promotions.promotionTreatment(article);
                        }
                    }
                });
                window.localStorage['cart'] = JSON.stringify(currentBasket);
                refreshTotalBill();
    }

})

.controller('SurveyCtrl', function($scope, $timeout,position, Surveys, $state, $ionicPopup){
    $scope.$parent.clearFabs();
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $timeout(function()
        {
            $scope.$parent.showHeader();
        }, 500);
    $scope.isExpanded = true;
    /*$scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
*/
    $scope.data = {};
    $scope.data.items = JSON.parse(window.localStorage['cart']).items;
    
    /*******************************PROPER TO CALL STEPS*********************************/
    $scope.hasNext = position.hasNext;
    $scope.hasPrevious = position.hasPrevious;  
    $scope.next = function(){
        console.log($scope.surveys);
         var surveys = angular.copy($scope.surveys);
         var remainings = false;
         for(var i = 0 ; i < surveys.length ; i++)
         {
            if( (surveys[i].required) && (surveys[i].choosen == "" || surveys[i].choosen == 0) )
            {
                remainings = true;
            }
         }
         if(remainings && !JSON.parse(window.localStorage['surveys']).done)
         {
            $ionicPopup.alert({
                title: "Incomplet !",
                buttons: [
                    {
                        text: "Terminer",
                        type: "button-assertive",
                        cssClass: "assertive-survey"
                    }
                ],
                template: '<span style="font-size: 12px; font-weight: 600;">Veuillez compléter le questionnaire.</span>'
            });
         }
         else if (JSON.parse(window.localStorage['surveys']).done)
         {
            if($scope.hasNext)
                {
                    $state.transitionTo(position.nextStep.name);
                }
            else
            {
                window.localStorage.removeItem('cart');
                window.localStorage.removeItem('sbd');
                window.localStorage.removeItem('promotions');
                window.localStorage.removeItem('marques');
                window.localStorage.removeItem('mission');
                window.localStorage.removeItem('done');
                window.localStorage.removeItem('callSteps');
                window.localStorage.removeItem('surveys');
                window.localStorage.removeItem('gratuites');
                $state.transitionTo("app.profile");
            }
         }
         else
         {
            console.log("About to add them to local DB !");
            if(surveys.length == 0)
            {
                if($scope.hasNext)
                {
                    console.log("hasNext!");
                    $state.transitionTo(position.nextStep.name);
                }
                else
                {
                    console.log("!hasNext");
                    var keys = Object.keys(window.localStorage);
                    for(var i = 0 ; i < keys.length ; i++)
                    {
                        if(keys[i] != "profile")
                        {
                            window.localStorage.removeItem(keys[i]);
                        }
                    }
                    $state.transitionTo("app.profile");
                }
            }
            Surveys.addSurveyClientAnswers(surveys, JSON.parse(window.localStorage['mission']).client_id).then(
            function(success){
                var popUp = $ionicPopup.alert({
                    title: "Terminé !",
                    buttons : [
                        {
                            text: position.hasNext ? "étape suivante" : "OK",
                            onTap: function(event){
                                if(position.hasNext)
                                {
                                    $state.transitionTo(position.nextStep.name);
                                }
                                else
                                {
                                    popUp.close();
                                }
                            },
                            type: "button-assertive",
                        }
                              ],
                    template: '<span style="font-size: 12px; font-weight: 600;">Le questionnaire à bien été enregistré !</span>'
                });
                window.localStorage['surveys'] =  JSON.stringify({ done: true, surveys: surveys});
                if($scope.hasNext)
                {
                    $state.transitionTo(position.nextStep.name);
                }
                else
                {
                    window.localStorage.removeItem('cart');
                    window.localStorage.removeItem('sbd');
                    window.localStorage.removeItem('promotions');
                    window.localStorage.removeItem('marques');
                    window.localStorage.removeItem('mission');
                    window.localStorage.removeItem('done');
                    window.localStorage.removeItem('callSteps');
                    window.localStorage.removeItem('surveys');
                    window.localStorage.removeItem('gratuites');
                    $state.transitionTo("app.profile");
                }
            }, 
            function(error){
                console.log(error);
            });
         }
        //$state.transitionTo(position.nextStep.name);
    };
    $scope.previous = function(){
        $state.transitionTo(position.previousStep.name);
    };
    /*******************************--------------------*********************************/
    $scope.surveys = [];
    var surveys = JSON.parse(window.localStorage['surveys'] || '[]');
    /*if(surveys.surveys.length == 0)
    {
        $state.go("app.profile")
    }*/
    angular.forEach(surveys.surveys, function(survey, index){
        switch(survey.type)
        {

            case(3):
                survey.choosen = 0;
                break;
            default:
                survey.choosen = "";
                break;
        }
        survey.required = Boolean(survey.required);
        $scope.surveys.push(survey);
    });
    $scope.clicked = function(){
        console.log($scope.surveys);
    };
    $scope.changed = function($index){
        console.log($index);
    };
})

.controller('BrandCtrl', function($scope, $state, $ionicPopup,  $filter, CartUtilities, IonicPopUpUtilities, Promotions, Commandes, Missions, $stateParams, Articles, LigneCommandes){
    $scope.data = {};
    $scope.data.items = JSON.parse(window.localStorage['cart']).items;
    $scope.footerBar = true;
    window.addEventListener("native.keyboardshow", keyboardShowHandler);
    window.addEventListener("native.keyboardhide", keyboardHideHandler);
    function keyboardShowHandler(e)
    {
        $scope.footerBar = false;
    }
    function keyboardHideHandler(e)
    {
        $scope.footerBar = true;
    }
    $scope.checked = function(col){
        return true;
    };
    $scope.ca = 0;
    $scope.infos = JSON.parse(window.localStorage['profile']);    
    $scope.marque = $stateParams.name;
    $scope.articles = [];
    $scope.totalBill = 0;
    $scope.cnt = 0;
    var currentCart =JSON.parse(window.localStorage['cart'] || '{}');
    $scope.goCart = function(){
        if(JSON.parse(window.localStorage['done']))
        {
            $state.go("app.remainings");
        }
        else
        {
            if(JSON.parse(window.localStorage['cart']).items.length > 0)
            {
                $state.go("app.cart");
            }
            else
            {
                $ionicPopup.alert({
                    title: "Panier vide !",
                    buttons: [
                        {
                            text: "OK",
                            type: "button-assertive",
                            cssClass: "assertive-survey"
                        }
                    ],
                    template: '<span style="font-size: 12px; font-weight: 600;">Le panier doit au moins contenir un article.</span>'
                });
            }
            
        }
    };
    $scope.goBack = function(){
        if(!CartUtilities.getOutOfQuota())
        {
            $state.transitionTo("app.brands");
        }
        else
        {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de QUOTA !", "Veuillez modifier les quantités."));
        }
    }
    Articles.getArticlesByMarque($scope.marque).then(
            function(articles){
                console.log(articles);
                var items = JSON.parse(window.localStorage['cart'] || '{}');
                if(typeof window.localStorage['marques'] == "undefined")
                {
                    window.localStorage['marques'] == '{}';
                }
                var marques = JSON.parse(window.localStorage['marques'] || '{}');
                if(typeof marques[$scope.marque] == 'undefined')
                {
                    marques[$scope.marque] = articles;
                    window.localStorage['marques'] = JSON.stringify(marques);
                }
                var from = Date.now();
                $scope.articles = [];
                angular.forEach(articles, function(article){
                    LigneCommandes
                    .pastPurchacedQuantity(article.id_db, items.mission)
                    .then(
                        function(success){
                            if(success.length > 0)
                            {
                                var array = [];
                                angular.forEach(success, function(object)
                                {
                                    array.push(object.qty);
                                });
                                article.past = array.toString();
                            }
                            else
                            {
                                article.past = "0,0,0";
                            }
                        }, 
                        function(error){console.log(error.message);});

                    article.packet = 0;
                    article.unit = 0;
                    article.inCart = false;
                    article.done = article.groupeSBD == null ? true : false;
                    article.promotions = article.promotions != null ? JSON.parse("["+article.promotions+"]"): null;
                    
                    var sbds = (window.localStorage['sbd'] == 'null' || typeof window.localStorage['sbd'] == 'undefined') ? [] : JSON.parse(window.localStorage['sbd']);
                    angular.forEach(sbds, function(sbd){
                        if(article.groupeSBD != null && article.groupeSBD == sbd.id)
                        {
                            var total = 0;
                            var found = false;
                            angular.forEach(sbd.articles, function(innerArticle){
                                total+=innerArticle.qty;
                                if(article.id == innerArticle.id)
                                {
                                    found = true; 
                                }
                            });
                            if(found)
                            {
                                article.done = sbd.min <= total ? true : false;
                            }
                        }
                    });
                    var cartItems = items.items;
                    var inCart = false;
                    angular.forEach(cartItems, function(cartItem){
                        if(article.id_db == cartItem.id_db)
                        {
                            inCart = true;
                            angular.forEach(sbds, function(sbd){
                                if(cartItem.groupeSBD != null && cartItem.groupeSBD == sbd.id)
                                {
                                    var total = 0;
                                    var found = false;
                                    angular.forEach(sbd.articles, function(innerArticle){
                                        total+=innerArticle.qty;
                                        if(cartItem.id_db == innerArticle.id)
                                        {
                                            found = true; 
                                        }
                                    });
                                    if(found)
                                    {
                                        cartItem.done = sbd.min <= total ? true : false;
                                    }
                                }
                            });
                            console.log(cartItem);
                            $scope.articles.push(cartItem);
                        }
                    });
                    if(!inCart)
                    {
                       $scope.articles.push(article);
                    }
                });
                var to = Date.now();
                console.log('Elapsed time : '+(to-from));

            }, 
            function(error){
                console.log(error.message);
            });
    $scope.clearCart = function(){
        console.log("clearing cart ...");
        window.localStorage['cart'] = null;
        $state.go("app.clients", { id : 1});
    };

    $scope.finish = function(){
        console.log("finishing the deal ...");
    };

    function refreshBrandRealTime(){
                    
                    check(false);
                    var testItems = [];
                    angular.forEach($scope.articles, function(article){
                        var sbds = (window.localStorage['sbd'] == 'null' || typeof window.localStorage['sbd'] == 'undefined') ? [] : JSON.parse(window.localStorage['sbd']);
                        angular.forEach(sbds, function(sbd){
                            //console.log(sbd);
                            if(article.groupeSBD != null && article.groupeSBD == sbd.id)
                            {
                                var total = 0;
                                var found = false;
                                angular.forEach(sbd.articles, function(innerArticle){
                                    total+=innerArticle.qty;
                                    if(article.id_db == innerArticle.id)
                                    {
                                        found = true; 
                                    }
                                });
                                if(found)
                                {
                                    article.done = sbd.min <= total ? true : false;
                                }
                            }
                        });

                    });
    }

    function check(realtime){
                var start = Date.now();
                var currentBasket = JSON.parse(window.localStorage['cart'] || '{}');
                var sbds = JSON.parse(window.localStorage['sbd']);
                console.log(sbds);
                var currentArticles =  angular.copy($scope.articles);
                angular.forEach(currentArticles, function(article)
                {
                    if(article.packet > 0 || article.unit > 0)
                    {
                        angular.forEach(sbds, function(sbd){
                            if(article.groupeSBD != null && article.groupeSBD == sbd.id)
                                {
                                    angular.forEach(sbd.articles, function(innerArticle){
                                        if(article.id_db == innerArticle.id)
                                        {
                                            innerArticle.qty = article.unit+(article.packet*article.unitConversion);        
                                        }
                                    });
                                }
                        });
                       window.localStorage['sbd'] = JSON.stringify(sbds);
                       
                       if(currentBasket.items.length == 0)
                        {
                            article.inCart = true;
                            currentBasket.items.push(article);
                        }
                        else
                        {
                            var found = false;
                            angular.forEach(currentBasket.items, function(item){
                                if(item.id_db == article.id_db)
                                {
                                    found = true;
                                    if(article.packet > 0)
                                    {
                                        console.log("Article Packet : "+article.packet);
                                        item.packet+=(article.packet - item.packet);
                                    }
                                    if(article.unit > 0)
                                    {
                                        console.log("Article Units : "+article.unit);
                                        item.unit+=(article.unit - item.unit);
                                    }
                                    return;
                                }
                            });
                            if(!found)
                            {
                                article.inCart = true;
                                currentBasket.items.push(article);
                            }
                                
                        }
                        $scope.data.items = currentBasket.items;
                        var totalToCount = 0;
                        for(var i = 0 ; i < currentBasket.items.length ; i++)
                        {
                            var item = currentBasket.items[i];
                            if(item.quotaVALUE != 0 || item.quotaQTY != 0)
                            {
                              if( ( (item.packet*item.unitConversion) + item.unit <= $filter('quota')(item) ) )
                              {
                                totalToCount+=((item.unit+(item.packet * item.unitConversion))*item.prixVente);
                              }
                              else
                              {
                                continue;
                              }
                            }
                            else
                            {
                              continue;
                            }
                            
                        }
                        console.log("----------------------------------------------------------------------------");
                        console.log("----------------------------------------------------------------------------");
                        console.log("----------------------------------------------------------------------------");
                        console.log("----------------------------------------------------------------------------");
                        console.log(totalToCount)
                        console.log("----------------------------------------------------------------------------");
                        console.log("----------------------------------------------------------------------------");
                        console.log("----------------------------------------------------------------------------");
                        console.log("----------------------------------------------------------------------------");
                        $scope.totalBill = totalToCount;
                        window.localStorage["cart"] = JSON.stringify(currentBasket);
                        var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
                        
                         for(var i = 0 ; i < promotions.length ; i++)
                        {
                            if(promotions[i].type == 'PC')
                            {
                                console.log("Promotion Client FOR YOU !!");
                                console.log(promotions[i]);
                                console.log(totalToCount);
                                if(promotions[i].ca <= totalToCount)
                                {
                                    
                                    promotions[i].consumed = true;
                                    console.log("CONSOMME");

                                }
                                else
                                {
                                    promotions[i].consumed = false;
                                    console.log("NON CONSOMME");
                                }
                            }
                        }
                        window.localStorage['promotions'] = JSON.stringify(promotions);

                        if(article.promotions != null)
                        {
                            Promotions.promotionTreatment(article);
                        }
                        else
                        {
                            console.log("NOT IN PROMOTION");
                        }
                    }
                });
                console.log(currentBasket);
                window.localStorage['cart'] = JSON.stringify(currentBasket);
                var end = Date.now();
                console.log("TRUE DURATION :"+(end-start));
                if(realtime)
                {
                    $scope.currentBrand = $scope.brandFives[$scope.currentStep];
                    refreshBrand($scope.currentBrand.name);
                }
    }



    $scope.confirm = function(){
        refreshBrandRealTime();
    };
    $scope.clicked = function(article){
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
        var sbds = JSON.parse(window.localStorage['sbd'] || '[]');
        var articles = $scope.articles;
        for(var i = 0 ; i < articles.length ; i++)
        {
            if(articles[i].id == article.id)
            {
                articles[i].unit = 0;
                articles[i].packet = 0;
                articles[i].inCart = false;
            }
        }
        for(var i = 0 ; i < cart.items.length || 0 ; i++)
        {
            if(cart.items[i].id_db === article.id_db)
            {
                cart.items.splice(i, 1);
                window.localStorage['cart'] = JSON.stringify(cart);
            }
        }
        console.log(cart);
        cart = null;
        if(article.groupeSBD != null)
        {
            console.log(article);
            for(var i = 0 ; i < sbds.length ; i++)
            {
                if(article.groupeSBD == sbds[i].id)
                {
                    for(var j = 0 ; j < sbds[i].articles.length ; j++)
                    {
                        if(sbds[i].articles[j].id == article.id_db)
                        {
                            sbds[i].articles[j].qty = 0;
                        }
                    }
                }
            }
        }
        window.localStorage['sbd'] = JSON.stringify(sbds);
        console.log(sbds);
        sbds = null;
        refreshBrandRealTime();
    };


})

.controller('ExclusionsCtrl', function($scope,$state){
    $scope.ca = 0;
    var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
    $scope.infos = JSON.parse(window.localStorage['profile']);
    function refreshTotalBill()
    {
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
        $scope.totalBill = 0;
        for(var i = 0 ; i < cart.items.length ; i++)
        {
            console.log(cart.items[i]);
            var noTva = (((cart.items[i].packet*10)+(cart.items[i].unit))*(cart.items[i].prixVente));
            if(cart.items[i].tva != null && cart.items[i].tva > 0)
            {
                $scope.totalBill+=( (noTva * cart.items[i].tva / 100) + noTva );
            }
            else
            {
                $scope.totalBill+=noTva;
            }
            
        }
        cart = null;

    }
    refreshTotalBill();
})

.controller('RemainingCtrl', function($scope, $state, Articles, position){
    console.log(position);
    $scope.hasNext = position.hasNext;
    $scope.hasPrevious = position.hasPrevious;
    $scope.next = function(){
        if(position.hasNext)
            {
                console.log(position.nextStep.name);
                $state.transitionTo(position.nextStep.name);
                //$state.go(position.nextStep.name);
            }
    };
    $scope.previous = function(){
        if(position.hasPrevious)
            {
                $state.go(position.previousStep.name);
            }
    };
    $scope.ca = 0;
    refreshTotalBill();
    var cart = JSON.parse(window.localStorage['cart'] || '{}');
    var sbd = JSON.parse(window.localStorage['sbd'] || '[]');
    var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
     $scope.infos = JSON.parse(window.localStorage['profile']);
    $scope.filterValue = "sbd";
    $scope.articles = [];
    console.log(promotions);
    var array = [];
    for(var i = 0 ; i < sbd.length ; i++)
    {
        var count = 0;
        for(var j = 0 ; j < sbd[i].articles.length ; j++)
        {
            for(var k = 0 ; k < cart.items.length ; k++)
            {
                if(sbd[i].articles[j].id == cart.items[k].id_db)
                {
                    count+=((cart.items[k].packet*10) + (cart.items[k].unit));
                }
            }
        }
        if(count<sbd[i].min)
        {
            for(var j = 0 ; j < sbd[i].articles.length ; j++)
            {
                array.push(sbd[i].articles[j].id);
            }
        }
    }
    for(var i = 0 ; i < promotions.length ; i++)
    {
        if(promotions[i].consumed == false)
        {
            for(var j = 0 ; j < promotions[i].articles.length ; j++)
            {
                array.push(promotions[i].articles[j].id);
            }
        }
    }
    var workAroundObject = {};
    for(var i = 0 ; i < array.length ; i++)
    {
        workAroundObject[array[i]] = "-";
    }
    array = Object.keys(workAroundObject);
    if(array.length == 0)
    {
        $state.go("app.cart");
    }
    Articles.getRemainingByIds(array).then(
        function(articles){
            angular.forEach(articles, function(article){
                article.unit = 0;
                article.packet = 0;
                article.done = false;
                article.inCart = false;
                article.promotions = article.promotions != null ? article.promotions.split(', ').map(Number) : null;
                var found = false;
                angular.forEach(cart.items, function(cartItem){
                    if(cartItem.id_db == article.id_db)
                    {
                        found = true;
                        $scope.articles.push(cartItem);
                    }
                });
                if(!found)
                {
                    $scope.articles.push(article);
                }
            });
            refreshBrandRealTime();

        }, 
        function(error){
            console.log(error.message);
        });

    $scope.change = function(){
        refreshBrandRealTime();
    };


     function refreshBrandRealTime(){


                    check();

                    $scope.totalBill = 0;
                    var testItems = [];
                    var newCart = JSON.parse(window.localStorage['cart'] || '{}');
                    angular.forEach(newCart.items, function(value){
                        if(typeof value === "object")
                        {
                            $scope.totalBill+=(((value.packet*10)*(value.prixVente))+(value.unit*value.prixVente));
                        }
                    });

                
                    angular.forEach($scope.articles, function(article){
                        var sbds = (window.localStorage['sbd'] == 'null' || typeof window.localStorage['sbd'] == 'undefined') ? [] : JSON.parse(window.localStorage['sbd']);
                        angular.forEach(sbds, function(sbd){
                            if(article.groupeSBD != null && article.groupeSBD == sbd.id)
                            {
                                var total = 0;
                                var found = false;
                                angular.forEach(sbd.articles, function(innerArticle){
                                    total+=innerArticle.qty;
                                    if(article.id_db == innerArticle.id)
                                    {
                                        found = true; 
                                    }
                                });
                                if(found)
                                {
                                    article.done = sbd.min <= total ? true : false;
                                }
                            }
                        });

                    });
    }
    function refreshTotalBill()
    {
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
        $scope.totalBill = 0;
        for(var i = 0 ; i < cart.items.length ; i++)
        {
            console.log(cart.items[i]);
            var noTva = (((cart.items[i].packet*10)+(cart.items[i].unit))*(cart.items[i].prixVente));
            if(cart.items[i].tva != null && cart.items[i].tva > 0)
            {
                $scope.totalBill+=( (noTva * cart.items[i].tva / 100) + noTva );
            }
            else
            {
                $scope.totalBill+=noTva;
            }
            
        }
        cart = null;

    }

    function check(){
                var start = Date.now();
                //Getting the current items in cart to work with !
                var currentBasket = JSON.parse(window.localStorage['cart'] || '{}');
                // Same thing for the Shopper Based Design
                var sbds = JSON.parse(window.localStorage['sbd']);
                angular.forEach($scope.articles, function(article)
                {
                        /******************** TAKING ON CONSIDERATION ONLY THE ONES WITH QTY gt 0 *******************/
                    if(article.packet > 0 || article.unit > 0)
                    {
                        /******************** STARTING WITH THE SBD ********************/
                        angular.forEach(sbds, function(sbd){
                            if(article.groupeSBD != null && article.groupeSBD == sbd.id)
                                {
                                    if(sbd.articles != null && sbd.articles.length > 0)
                                    {
                                        angular.forEach(sbd.articles, function(innerArticle){
                                            if(article.id_db == innerArticle.id)
                                            {
                                                innerArticle.qty = article.unit+(article.packet*10);        
                                            }
                                        });
                                    }
                                }
                        });
                       window.localStorage['sbd'] = JSON.stringify(sbds);
                       /************************************************************/
                       

                       /*********************** IF THE CART IS EMPTY WE ADD DIRECTLY THE ARTICLE ***********************/
                       if(currentBasket.items.length == 0)
                        {
                            article.inCart = true;
                            currentBasket.items.push(article);
                        }
                        /*********************** WE'LL SEARCH FOR THE ARTICLE WITH THE SAME ID *************************/
                        else
                        {
                            // FALSE BY DEFAULT !
                            var found = false;
                            angular.forEach(currentBasket.items, function(item){
                                if(item.id == article.id)
                                {
                                    // ARTICLE FOUND FOR THE CURRENT ITERATION
                                    found = true;
                                    if(article.packet > 0)
                                    {
                                        // THE DIFFERENCE BETWEEN THE CURRENT AND CART VERSION IS ADDED
                                        console.log("Article Packet : "+article.packet);
                                        item.packet+=(article.packet - item.packet);
                                    }
                                    if(article.unit > 0)
                                    {
                                        console.log("Article Units : "+article.unit);
                                        item.unit+=(article.unit - item.unit);
                                    }
                                    return;
                                }
                            });
                            if(!found)
                            {
                                // NOT FOUND IN CART WE ADD THE ARTICLE TO CART
                                article.inCart = true;
                                // PUSHED TO CART
                                currentBasket.items.push(article);
                            }
                                
                        }

                        /******************************** PROMOTIONS PART ************************************/

                        /******************************** PROMOTION CLIENT ***********************************/
                        var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
                        refreshTotalBill();
                         for(var i = 0 ; i < promotions.length ; i++)
                        {
                            if(promotions[i].type == 'PC')
                            {
                                console.log("Promotion Client FOR YOU !!");
                                console.log(promotions[i]);
                                console.log($scope.totalBill);
                                if(promotions[i].ca <= $scope.totalBill)
                                {
                                    
                                    promotions[i].consumed = true;
                                    console.log("CONSOMME");

                                }
                                else
                                {
                                    promotions[i].consumed = false;
                                    console.log("NON CONSOMME");
                                }
                            }
                        }
                        window.localStorage['promotions'] = JSON.stringify(promotions); 

                        /********************************* OTHERS ********************************************/

                        if(article.promotions != null)
                        {
                            var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
                            var cart = currentBasket;
                            // WE WILL CHECK ALL THE PROMOTIONS THAT ARE IN RELATION WITH THE CURRENT ARTICLE
                            for(var i = 0 ; i < article.promotions.length ; i++)
                            {
                                // IN THE INNER LOOP WE WILL ITERATE WITH ALL PROMOTIONS TO TEST WITH THEM IF THEY SAME ID WITH
                                // OF THE CURRENT ARTICLE'S PROMOTIONS
                                for(var j = 0 ; j < promotions.length ; j++)
                                {
                                    // CHECK IF eq !
                                    if(promotions[j].id == article.promotions[i])
                                    {
                                        // Count the qty of all articles that are included in this promotion
                                        var count = 0;
                                        // Count ca of the articles
                                        var ca = 0;
                                        // total of all items in cart
                                        var total = 0;
                                        // saving all items in an array for PromotionPaliter promotion && especially for the non cummulable case
                                        var items = [];
                                        // Looping into all the articles in this promotion
                                        for(var k = 0 ; k < promotions[j].articles.length ; k++)
                                        {
                                            //Now looping in all articles in CART
                                            console.log("THIS IS THE CART");
                                            console.log(cart);
                                            for(var l = 0 ; l < cart.items.length ; l++)
                                            {
                                                var qty= ((cart.items[l].packet*10) + cart.items[l].unit);
                                                var amount= ((cart.items[l].packet*10 + cart.items[l].unit)*cart.items[l].prixVente);
                                                if(cart.items[l].id_db == promotions[j].articles[k].id)
                                                {
                                                    console.log("FOUND IN CART");
                                                    count+=qty;
                                                    ca+=amount;
                                                    items.push({ id: cart.items[l].id_db, qty: qty });
                                                }
                                                else
                                                {
                                                    console.log("NOT FOUND IN CART");
                                                }
                                                total+=amount;
                                            }
                                        }
                                        // PROMOTION MONTANT -- AMOUNT PROMOTION
                                        if(promotions[j].type == "PMT")
                                        {
                                            // CA OF ALL ARTICLES IN THE PMT PROMOTION SUP THAN MIN QTY OF THE PROMOTION
                                            if(ca>=promotions[j].ca)
                                            {
                                                // THE MINIMAL CONDITION IS RESPECTED
                                                // CURRENT CA OF ALL ARTUCLES IN PROMOTION >= -gt || -eq THE MINIMAL QTY OF THE PROMOTION
                                                promotions[j].consumed = true;
                                                window.localStorage['promotions'] = JSON.stringify(promotions);
                                            }
                                            else
                                            {
                                                promotions[j].consumed = false;
                                                window.localStorage['promotions'] = JSON.stringify(promotions);
                                            }
                                        }
                                        // PROMOTION PALIER
                                        if(promotions[j].type == "PP")
                                        {
                                            // IF MIXED PROMOTION WE CALCULATE THE AMOUNT OF ALL ITEMS WE DO NO HAVE THE OBLIGATION TO CALCULATE
                                            // EACH ARTICLE WITH ITS MINIMAL VALUE AND TO TEST FOR EACH ONE,
                                            // WE JUST HAVE ADD ONE TO THE OTHER UNTIL THE FINISH OF THE LOOP !
                                            if(Boolean(promotions[j].melange))
                                            {
                                                // CUMMULABLE IF THE PRE REQUISITES ARE RESPECTED MORE THAN ONCE WE DOUBLE THE PROMOTION PRIZES
                                                // DEPENDING ON TIME OF REPETITIONs TILL THE MAX IF SETTED !
                                                if(Boolean(promotions[j].cummulable))
                                                {
                                                    if(promotions[j].qte <= count)
                                                    {
                                                        // PROMOTION CONSUMED ! MINIMAL PREREQUISITE RESPECTED !!
                                                        promotions[j].consumed = true;
                                                        // 20/20 == 1 && 25/20 == 1 TRUNCATE WE TAKE THE PART BEFORE COMMA 1,9 ==> 1
                                                        var repetitions = Math.trunc(count / promotions[j].qte);
                                                        // IF MAX_STEPS IS SETTED
                                                        if(promotions[j].max != null)
                                                        {
                                                            if(repetitions >= promotions[j].max)
                                                            {
                                                                // IF TRUNCATED VALUE gt MAX WE TAKE MAX !
                                                                promotions[j].cumule = promotions[j].max;
                                                            }
                                                            else
                                                            {
                                                                // WE TAKE TRUNCATED VALUE
                                                                promotions[j].cumule = repetitions;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            // NO MAX_STEPS SO REPETITIONS !
                                                            promotions[j].cumule = repetitions;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        promotions[j].consumed = false;
                                                    }
                                                }
                                                // NO CUMMULABLE !!
                                                else
                                                {
                                                    if(promotions[j].qte <= count)
                                                    {
                                                        // NO CUMMULABLE SO ONLY 1 !
                                                        promotions[j].consumed = true;
                                                        promotions[j].cumule = 1;
                                                    }
                                                    else
                                                    {
                                                        promotions[j].consumed = false;
                                                    }
                                                }
                                            }
                                            // PAS DE MELANGE !
                                            else
                                            {
                                                var finalRepetitions = 0;
                                                var consumed = false;
                                                if(promotions[j].articles.length == items.length)
                                                {
                                                    var count = 0;
                                                    for(var m = 0; m < promotions[j].articles.length; m++)
                                                    {
                                                        for(var n = 0; n < items.length; n++)
                                                        {
                                                            if(promotions[j].articles[m].id == items[n].id)
                                                            {
                                                                if(promotions[j].articles[m].qty <= items[n].qty)
                                                                {
                                                                    console.log(items[n].qty);
                                                                    items[n].qty = Math.trunc(items[n].qty/promotions[j].articles[m].qty)
                                                                    console.log("RESPECTANT LES CRITERES");
                                                                    ++count;
                                                                    console.log(count);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if(count == promotions[j].articles.length)
                                                    {
                                                        console.log(items);
                                                        var trunQty = 0;
                                                        for(var n = 0; n < items.length; n++)
                                                        {
                                                            console.log(items[n].qty);
                                                            trunQty+=items[n].qty;
                                                        }
                                                        console.log(Math.trunc(trunQty/promotions[j].articles.length));
                                                        promotions[j].cumule = Math.trunc(trunQty/promotions[j].articles.length);
                                                        var trunc = Math.trunc(trunQty/promotions[j].articles.length);
                                                        if(trunc >= 1)
                                                        {
                                                            console.log("CONSUMED");
                                                            promotions[j].consumed = true;
                                                            if(Boolean(promotions[j].cummulable))
                                                            {
                                                                if(promotions[j].max != null || promotions[j].max > 0 || typeof promotions[j].max == "undefined")
                                                                {
                                                                    if(trunc >= promotions[j].max)
                                                                    {
                                                                        promotions[j].cumule = promotions[j].max;
                                                                    }
                                                                    else
                                                                    {
                                                                        promotions[j].cumule = trunc;
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    promotions[j].cumule = trunc;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                promotions[j].cumule = 1;
                                                            }

                                                        }
                                                        else
                                                        {
                                                            console.log("NO CHANCE !");
                                                            promotions[j].consumed = false;
                                                        }
                                                        
                                                    }
                                                    else
                                                    {
                                                        console.log("NO CHANCE !");
                                                        promotions[j].consumed = false;
                                                    }
                                                }
                                                else
                                                {
                                                    console.log("NO CHANCE !");
                                                    promotions[j].consumed = false;
                                                }
                                            }
                                        }
                                    }
                                }
                                console.log(promotions);
                                window.localStorage['promotions'] = JSON.stringify(promotions);
                            }
                            console.log("ALL THE PROMOTIONS ARE UP TO DATE");
                        }
                    }
                });
                window.localStorage['cart'] = JSON.stringify(currentBasket);
    }


    $scope.clicked = function(article){
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
        var sbds = JSON.parse(window.localStorage['sbd'] || '[]');
        var articles = $scope.articles;
        for(var i = 0 ; i < articles.length ; i++)
        {
            if(articles[i].id == article.id)
            {
                articles[i].unit = 0;
                articles[i].packet = 0;
                articles[i].inCart = false;
            }
        }
        for(var i = 0 ; i < cart.items.length || 0 ; i++)
        {
            if(cart.items[i].id === article.id)
            {
                cart.items.splice(i, 1);
                window.localStorage['cart'] = JSON.stringify(cart);
            }
        }
        console.log(cart);
        cart = null;
        if(article.groupeSBD != null)
        {
            console.log(article);
            for(var i = 0 ; i < sbds.length ; i++)
            {
                if(article.groupeSBD == sbds[i].id)
                {
                    for(var j = 0 ; j < sbds[i].articles.length ; j++)
                    {
                        if(sbds[i].articles[j].id == article.id_db)
                        {
                            sbds[i].articles[j].qty = 0;
                        }
                    }
                }
            }
        }
        window.localStorage['sbd'] = JSON.stringify(sbds);
        sbds = null;
        refreshBrandRealTime();
    };
})

.controller('BrandFiveCtrl', function($http, $filter, $scope, $ionicLoading, SBD, CartUtilities, IonicPopUpUtilities, $stateParams, $state,Commandes, Articles, Promotions, Marques, $ionicPopup, $timeout, Missions, LigneCommandes, position){
    

    $scope.brandFives = [];

    Marques.getBrandFiveFromLocalDB().then(
        function(brandfives){
            $scope.brandFives = brandfives;
            $scope.currentBrand = $scope.brandFives[$scope.currentStep];
            refreshBrand($scope.currentBrand.name);
        }, 
        function(error){
            console.log(error);
        });

    $scope.footerBar = true;
    window.addEventListener("native.keyboardshow", keyboardShowHandler);
    window.addEventListener("native.keyboardhide", keyboardHideHandler);
    function keyboardShowHandler(e)
    {
        $scope.footerBar = false;
    }
    function keyboardHideHandler(e)
    {
        $scope.footerBar = true;
    }

    window.localStorage['done'] = typeof window.localStorage['done'] == "undefined" ? JSON.stringify(false) : JSON.parse(window.localStorage['done']);
    
    $scope.hasNext = position.hasNext;
    $scope.hasPrevious = position.hasPrevious;
    $scope.next = function(){
        if(position.hasNext && !CartUtilities.getOutOfQuota())
            {
                $state.go(position.nextStep.name);
            }
            else
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de QUOTA !", "Veuillez modifier les quantités."));
            }
    };
    $scope.previous = function(){
        if(position.hasPrevious && !CartUtilities.getOutOfQuota())
            {
                $state.go(position.previousStep.name);
            }
            else
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de QUOTA !", "Veuillez modifier les quantités."));
            }
    };

    //DEFAULT SETTINGs
    var defaultStep = 0;
    //
    $scope.currentStep = defaultStep;
    //CAN GO BACK "BY DEFAULT THE FIRST STEP IS 0 SO  -1 IS IMPOSSIBLE"
    $scope.back = false;
    //BY DEFAULT WE WAN MOVE FORWARD IF AND ONLY IF THE SIZE OF THE BRANDS IS STRICTLY GREATHER THAN 0
    $scope.forw = true;
    //IF THE THE LAST BRAND IS ALREADY ACHIEVED !! SO WE CAN MOVE TO THE NEXT CALL STEP !
    $scope.done = JSON.parse(window.localStorage['done'] || 'false');

    $scope.marques = [];
    
    $scope.brandFives = [];

    $scope.brand = {};

    $scope.currentBrand = {};

    $scope.articles = [];

    //THE SCOPE CONTAINING THE ITEMS !
    $scope.articles = [];

    //THE CALLER INFOS !! (PREVENDEUR - VENDEUR)
    $scope.infos = JSON.parse(window.localStorage['profile']);

    //REAL TIME PROCESS !!
    //ADDING ITEMS TO CART, REMOVING THEM, MODIFY QTYs, PROMOTIONS && SBDs
    $scope.change = function(article){
        check(article);
    };
    
    

    
    

   
    function refreshBrand(brandName){
        $ionicLoading.show({
                template: "chargement ..."
            });
            
        var testItems = [];
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
    
        Articles.getArticlesByMarque(brandName).then(
            function(articles){

                //ADD BRANDS TO LOCAL STORAGE
                Marques.addMarqueToLocalStorage(brandName, articles);
                //INITIALIZE THE LIST OF ITEMS
                $scope.articles = [];
                //IMPLEMENTATION OF THE DATA STRUCTURE
                for(var i = 0, len = articles.length ; i < len ; i++)
                {


                    var article = articles[i];

                    var cartResult = CartUtilities.existInCart(article);

                    if(cartResult == null)
                    {
                        article = Articles.prepareForScope(article);
                    }
                    else
                    {
                        article = cartResult;
                    }


                    // SHOULD ADD AND SBD TREATMENT !!
                    //
                    //
                    //////////////////////////////////

                    $scope.articles.push(article);

                    
                }

            }, 
            function(error){
                console.log(error);
            })
            .finally(function(){
                $ionicLoading.hide();
            });
    }

    
    function check(article)
    {

                if(!Articles.outOfQuota(article))
                {
                    console.log("GOOD !");
                    var toDrop = false;
                    if(article.unit == 0 && article.packet == 0)
                    {   
                        toDrop = true;
                        CartUtilities.dropFromCart(article);
                    }
                   
                    // ADD IT TO CART OR UPDATE THE QTYs !!
                   
                    if(!toDrop)
                    {
                        CartUtilities.addOrModify(article); 
                    }
                }
                else
                {
                    console.log("NOT GOOD !");
                    CartUtilities.dropFromCart(article);
                }

                if(article.groupeSBD != null && typeof(article.groupeSBD) != "undefined")
                {
                    SBD.SBDTreatment(article);
                }

                Promotions.promotionTreatment(article); 
    }
    
    $scope.backward = function(){

        if($scope.back && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles)))
        {
            if($scope.currentStep > 0)
            {
                $scope.forw = true;

                --$scope.currentStep;

                $scope.currentBrand = $scope.brandFives[$scope.currentStep];

                refreshBrand($scope.currentBrand.name);

                if($scope.currentStep == 0)
                {
                    $scope.back = false;
                }
            }
            else
            {
                $scope.back = false;
            }
        }
        else
        {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de QUOTA !", "Veuillez modifier les quantités."));
        }
    };
    $scope.forward = function(){
        if($scope.forw && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles)))
            {
                if($scope.currentStep < $scope.brandFives.length)
                {
                    $scope.back = true;

                    ++$scope.currentStep;

                    $scope.currentBrand = $scope.brandFives[$scope.currentStep];

                    refreshBrand($scope.currentBrand.name);

                    if($scope.currentStep == $scope.brandFives.length - 1)
                    {
                        $scope.forw = false;
                        //WE ACHIEVED THE GOAL !!
                        $scope.done = true;
                        window.localStorage['done'] = JSON.stringify(true);
                    }
                }
            }
            else
        {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de QUOTA !", "Veuillez modifier les quantités."));
        }
    };

    
})

.controller('MissionsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $timeout(function()
        {
            $scope.$parent.showHeader();
        }, 500);
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.infos = JSON.parse(window.localStorage['profile']);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('ProductsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.clearFabs();
    $timeout(function()
        {
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

;
