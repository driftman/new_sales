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
        else if(profile.fonction == 'prevendeur' || 'vendeur')
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
                console.debug(user);
                $timeout(function(){
                    if(user.fonction == "prevendeur" || user.fonction == "vendeur")
                    {
                        console.debug("NOT LIVREUR !");
                        $state.go("menu.entry");
                    }
                    else if(user.fonction == "livreur")
                    {
                        console.debug("LIVREUR !");
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
                    if(user.fonction == "prevendeur" || user.fonction == "vendeur")
                    {
                        console.debug("NOT LIVREUR !");
                        $state.go("menu.entry");
                    }
                    else if(user.fonction == "livreur")
                    {
                        console.debug("LIVREUR !");
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
                                                    var fonction = JSON.parse(window.localStorage['profile'] || '{}').fonction || "";
                                                    if(fonction == "prevendeur" || fonction == "vendeur")
                                                    {
                                                        $state.go("menu.entry");
                                                    }
                                                    else if(fonction == "livreur")
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

.controller('EntryCtrl', function($scope, $rootScope, DumpDB, Surveys, ModePaiement, ca,  $timeout, IonicPopUpUtilities, $ionicPopup, CallSteps, $ionicLoading, $state, Routes, BrandFive, SBD, Commandes, Missions, Clients, Articles, Promotions, Marques, SynchronisationV2){
    
    $scope.ca = ca.ca;
    $scope.test = function(){
        window.open('img/test.pdf', '_blank', 'location=yes');
    };
    $scope.infos = JSON.parse(window.localStorage['profile']);
    var infos = JSON.parse(window.localStorage['profile']);

    var isVendeur = typeof(infos.fonction) != "undefined" && infos.fonction == "vendeur";

    $scope.isVendeur = isVendeur;

    $scope.prepareChargement = function()
    {

        var cart = JSON.parse(window.localStorage['cart'] || "{}");

        if(!Object.keys(cart).length > 0)
        {
            cart.action = "chargement";

            cart.items = [];

            window.localStorage['cart'] =  JSON.stringify(cart);

            $state.transitionTo("app.brands", { vendeur: true, chargement: true} );
        }
        else
        {
            if( cart.action == "chargement" )
            {
                $state.transitionTo("app.brands", { vendeur: true, chargement: true} );
            }
            else
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", "Vous devez finir votre visite "));
            }
        }
        
    };
    $scope.synchronization = function(){
       
        $ionicLoading.show({
            template : "Synchronisation en cours ..."
        });

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
    $scope.chargement = typeof window.localStorage['cart'] != "undefined" && JSON.parse(window.localStorage['cart']).action == "chargement" ? true : false;
    

    $scope.checkPoint = function(){
        $state.go(checkPoint);
        var isVendeur = JSON.parse(window.localStorage['profile']).fonction == "vendeur";
        if(checkPoint == "app.brands" && isVendeur)
        {
            $state.go(checkPoint, { vendeur: true, chargement: false });
        }
        else
        {
            $state.go(checkPoint);
        }
    };

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
                        var isVendeur = JSON.parse(window.localStorage['profile']).fonction == "vendeur";
                        if(callSteps[i].name == "app.brands" && isVendeur)
                            {
                                $state.go(callSteps[i].name, { vendeur: true, chargement: false });
                            }
                            else
                            {
                                $state.go(callSteps[i].name);
                            }
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

.controller('BrandsCtrl', function($scope, $timeout, $state, CallSteps, CartUtilities, $log, $ionicLoading, Chargement, Commandes, IonicPopUpUtilities, $ionicPopup, position, LigneCommandes, $stateParams, Articles, $ionicModal, Missions){
    
    // TOTAL INITIALIZATION TO 0 !
    $scope.total = 0;

    cartInitialization();

    function cartInitialization()
    {
        CartUtilities.totalCart(true, false, true)
        .then(function(success){
            $scope.total = success;
        });
    }

    // To know if the current objectif is to add stock to van or if the employee connected is
    // from profile type "vendeur" to display only the items in stock or all !!

    var isVendeur = $scope.isVendeur = $stateParams.vendeur == "true" ? true : false;
    var forChargement = $scope.forChargement = $stateParams.chargement == "true" ? true : false;
    var prelevement = $scope.prelevement = $stateParams.prelevement == "true" ? true : false;
    var retour = $scope.retour = $stateParams.retour == "true" ? true : false;

    if(forChargement)
    {
        $scope.title = "Demande de chargement";
    }
    else if(prelevement)
    {
        $scope.title = "Prélèvement stock client"
    }
    else if(retour)
    {
        $scope.title = "Retours client"
    }
    else
    {
        $scope.title = "Autres marques"
    }

    console.debug(retour);
    

    //PROPER TO CALL STEPS !!
    
    if(prelevement || retour)
    {
       var _target = prelevement ? "app.prelevement" : "app.retour";
       CallSteps.checkForSteps(_target)
        .then(function(result){
            $scope.hasNext = result.hasNext;
            $scope.hasPrevious = result.hasPrevious;
        });
    }
    else
    {
        $scope.hasNext = position.hasNext;
        $scope.hasPrevious = position.hasPrevious;
    }

    

    // NEXT STEP !!
    $scope.next = function(){
        next();
    };
    function next()
    {
        if(prelevement || retour)
        {
            var _target = prelevement ? "app.prelevement" : "app.retour";
            CallSteps.checkForSteps(_target)
            .then(function(result){
                if(result.hasNext)
                {
                    if(result.nextStep.name != "app.brands")
                    {
                        console.debug(result.nextStep.name);
                        $state.transitionTo(result.nextStep.name);
                    }
                    else
                    {
                        // WE ARE INT PRELEVEMENT SO WE SHOULD SET IT TO FALSE !
                        // PRELEVEMENT IS NOT A PART FROM THE CALL STEPS !
                        $state.transitionTo(result.nextStep.name, { vendeur: isVendeur, chargement: false, prelevement: false, retour: false});
                    }
                }
                else
                {
                    console.debug("WHAT TO DO ? !!");
                }
            });
        }
        else
        {
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
                    if(position.nextStep.name != "app.brands")
                    {
                        $state.transitionTo(position.nextStep.name);
                    }
                    else
                    {
                        $state.transitionTo(position.nextStep.name, { vendeur: isVendeur, chargement: false, prelevement: false, retour: false });
                    }
                }
                
            }
            else
            {
                console.debug("WHAT TO DO ? !!");
            }
        }
    }
    // PREVIOUS STEP !!
    $scope.previous = function(){
        previous();
    };
    function previous()
    {
        if(prelevement || retour)
        {
            var _target = prelevement ? "app.prelevement" : "app.retour";
            CallSteps.checkForSteps(_target)
            .then(function(result){
                if(result.hasPrevious)
                {
                    if(result.previousStep.name != "app.brands")
                    {
                        $state.transitionTo(result.previousStep.name);
                    }
                    else
                    {
                        $state.transitionTo(result.previousStep.name, { vendeur: isVendeur, chargement: false, prelevement: false, retour: false});
                    }
                }
                else
                {
                    console.debug("WHAT TO DO ? !!");
                }
                
            });
        }
        else
        {
            if(position.hasPrevious && !forChargement)
            {
                if(position.previousStep.name != "app.brands")
                {
                    $state.transitionTo(position.previousStep.name);
                }
                else
                {
                    $state.transitionTo(position.previousStep.name, { vendeur: isVendeur, chargement: false, prelevement: false, retour: false});
                }
            }
            else
            {
                console.debug("WHAT TO DO ? !!");
            }
        }
    }

    $scope.sendPrelevement = function()
    {
        console.debug("SEND PRELEVEMENT !!");
        Chargement
        .addPrelevementClient(1, JSON.parse(window.localStorage["prelevement"] || "{}").items)
        .then(
            function(success)
            {
                next();
            });
    };

    //Send retours !!

    $scope.sendRetour = function(){
        next();
    };

    //Send the demand !!

    $scope.sendDemande = function()
    {

        $ionicLoading.show({
            template : "Enregistrement de votre demande ..."
        });

        Chargement.add().then(
            function(success){
                if(!(typeof(success.rowsAffected) == "undefined"))
                {
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Succès", success.rowsAffected+" ligne(s) ajoutés"));
                    window.localStorage.removeItem('cart');
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
                else
                {
                    $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", success.message));
                    
                }
            }, 
            function(error){
                $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur", error.message));
             }).finally(function(){

                $timeout(function(){

                    $ionicLoading.hide();

                }, 500);

            });
    };

    // EXCLUSIONS FROM THE MEETING OF 21/01/2016  , Proposed by MONCEF in order to access to a predefined brand by conditions !!
    // HERE the brand that is in condition is ACE.
    var _marques = JSON.parse(window.localStorage['marques'] || "{}");
    var _gone = typeof(_marques.exclusion) == "undefined" || typeof(_marques.exclusion.gone) == "undefined"  ? false : _marques.exclusion.gone;
    var exclusion = _gone ? [] : [10];

    $scope.infos = JSON.parse(window.localStorage['profile']);    

    $scope.rows = [];
    
    var marques = JSON.parse(window.localStorage['marques'] || "{}");

    var canGoToExclusion = typeof(marques.exclusion) != "undefined" && marques.exclusion.canGo;
    
    Articles.getMarques(exclusion, isVendeur, forChargement).then(
        function(marques){
            $log.debug(marques);
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
            $log.error(error);
        });
    
    $scope.goToBrand = function(marque){
        $state.go('app.brand', { name:  marque, vendeur: isVendeur, chargement: forChargement, prelevement: prelevement, retour: retour} );
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
      $scope.infos = JSON.parse(window.localStorage['profile']);      
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
            $scope.client.lat  = position.coords.latitude;
            $scope.client.lng = position.coords.longitude;
            console.log(position.coords);
        }, function(err) {
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

.controller('CartCtrl', function($log, $state, $stateParams, ViewController, CartUtilities, $filter, $ionicLoading, IonicPopUpUtilities, PrinterService, Promotions, $timeout, $cordovaDatePicker,$cordovaFile, $scope, $ionicPopup, $cordovaPrinter,  ca, position, Commandes, Accounts, Clients, Missions, LigneCommandes, Articles, ModePaiement){
    
    $scope.choice = {
        id: 0
    };

    $scope.currentDiscount = null;
    $scope.choosenMethod = null;

    // PAYMENT DATE !!
    $scope.paymentDate = new Date();
    // MODE PAIEMENTS METHODES !!
    $scope.paymentMethods = [];

    // MODE PAIEMENT !
    ModePaiement.getAll().then(
        function(success){
            $scope.paymentMethods = success;
        }, 
        function(error){
            $log.error(error);
        });
    // CHANGE LISTENER
    $scope.paymentChange = function(method){
        $scope.choosenMethod = method;
        countDiscount($scope.choosenMethod, $scope.paymentDate);
    };

    // TOTAL INITIALIZATION TO 0 !
    $scope.totalTTC = 0;
    $scope.totalHT = 0;

    //Promotions conflicts !
    $scope.groups = [];

    // PROPER TO THE MODAL !
    $scope.nextPopUpShow = true;
    $scope.previousPopUpShow = false;

    $scope.group = [];

    $scope.currentIndex = 0;

    
    $scope.data = {};

    $scope.data.items = [];

    $scope.totalTTC = 0;

    $scope.totalHT = 0;

    $scope.checkOut = function(){
        var missionObject = JSON.parse(window.localStorage['mission'] || "{}");

        if(!missionObject.concluded)
        {
            if($scope.currentDiscount != null && $scope.choosenMethod != null)
            {
                var cartObject = JSON.parse(window.localStorage['cart'] || "{}");

                var local = typeof(missionObject.id_mission) == "undefined";

                $ionicLoading.show({
                    template : "finalisation de la vente en cours ..."
                });

                Missions.checkOut(

                    missionObject.id_mission, 
                    //CartUtilities.getCartItems(), 
                    angular.copy($scope.data.items),
                    local, 
                    angular.copy($scope.choosenMethod.id), 
                    angular.copy($scope.paymentDate)

                    ).then(
                    function(success){
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Succès !", "La commande a bien été enregistrée"));
                        missionObject.concluded = true;
                        window.localStorage['mission'] = JSON.stringify(missionObject);
                    }, 
                    function(error){
                        $ionicPopup.alert(IonicPopUpUtilities.alert("Erreur !", "Erreur lors de l'enregistrement : \n "+error.message));
                    }).
                finally(function(){
                    $timeout(function(){
                        $ionicLoading.hide();
                    }, 1000);
                });
            } 
            else
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Etape manquante !", "Veuillez choisir une méthode de paiement"));
            }
        }
        else
        {
            $ionicPopup.alert(IonicPopUpUtilities.alert("Déjà enregistré !", "La commande a bien été enregistrée"));
        }
    };

    function init()
    {
        $scope.data.items = [];

        var items = CartUtilities.getCartItems();
        var done = false;
        CartUtilities.getCartItems()
        .then(function(items){

            for(var i = 0; i < items.length ; i++)
            {
                var item = items[i];

                if(Object.prototype.toString.call(item) != "[object Array]")
                {
                    item.tva = item.tva - item.remise;

                    if(item.prixVente != 0)
                    {
                        $scope.totalTTC+=item.tva;

                        $scope.totalHT+=item.ht;
                    }

                    $scope.data.items.push(item);
                }
                else
                {
                    $scope.groups.push({conflicts: item, choosen: null});
                }
                if(i == items.length - 1)
                {
                    promptGiftsOrAddThem();
                    /*done = true;
                    var change = JSON.parse(window.localStorage["change"] || "true");
                    console.debug(change);
                    if(!done && !change)
                    {
                        console.debug("SHOULD DO THIS !");
                       
                        items = items.concat(JSON.parse(window.localStorage['gifts'] || '[]'));
                    }
                    else
                    {
                        console.debug("SHOULD NOT DO THIS !");
                        
                    } */    
                }
            }

        });

        function promptGiftsOrAddThem()
        {
            var change = JSON.parse(window.localStorage["change"] || "true");
            var gifts = JSON.parse(window.localStorage['gifts'] || "[]");
            if(!change && gifts.length > 0)
            {
                console.debug("Add them directly !");
                for(var i = 0 ; i < gifts.length ; i++)
                {
                    $scope.data.items.push(gifts[i]);
                }
            }
            else
            {
                if($scope.groups.length >= 1)
                {
                    showPopup();
                    $scope.group = $scope.groups[$scope.currentIndex];
                    if($scope.groups.length == 1)
                    {
                        $scope.nextPopUpShow = false;
                    }
                    
                }
            }
            
        }

        var promotions = JSON.parse(window.localStorage['promotions'] || "[]");
        for(var i = 0 ; i < promotions.length ; i++)
        {
            var promotion = promotions[i];
            if(promotion.type == "PC")
            {
                console.debug($scope.totalHT);
                console.debug(promotion.ca);
                if(promotion.ca <= $scope.totalHT)
                {
                    promotion.consumed = true;
                }
                else
                {
                    promotion.consumed = false;
                }
            }
        }
        window.localStorage['promotions'] = JSON.stringify(promotions);
    }

    $scope.hello = function(group, index){
        group.choosen = index;
    };

    /*
    $scope.nextPopUpShow = true;
    $scope.previousPopUpShow = false;
    */


    $scope.previousPopUp = function()
    {
        $scope.group = $scope.groups[--$scope.currentIndex];
        $scope.nextPopUpShow = true;
        if($scope.currentIndex == 0)
        {
            $scope.previousPopUpShow = false;
        }
    };
    $scope.nextPopUp = function()
    {   
        
        $scope.group = $scope.groups[++$scope.currentIndex];
        $scope.previousPopUpShow = true;
        if($scope.currentIndex == $scope.groups.length - 1)
        {
            $scope.nextPopUpShow = false;
        }
    };

    $scope.checked = function(group, index)
    {
        if(group.choosen == index)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function checkIfConflictRemaining()
    {
        var groups = angular.copy($scope.groups)
        for(var i = 0 ; i < groups.length ; i++)
        {
            if(groups[i].choosen == null)
            {
                return true;
            }
        }
        return false;
    }

    function addChoosenGifts()
    {
        var groups = angular.copy($scope.groups);
        var savedGifts = [];
        for(var i = 0 ; i < groups.length ; i++)
        {
            var group = groups[i];
            var index =  group.choosen;
            var _loopContinue = false;
            for(var j = 0 ; j < group.conflicts.length ; j++)
            {
                if(j == index)
                {
                    var items = group.conflicts[j];
                    savedGifts = savedGifts.concat(items);
                    for(var k = 0 ; k < items.length ; k++)
                    {
                        var item = items[k];
                        $scope.data.items.push(item);
                    }
                    _loopContinue = true;
                    continue;
                }
            }
            if(_loopContinue)
            {
                continue;
            }
        }
        window.localStorage['gifts'] = JSON.stringify(savedGifts);
        window.localStorage["change"] = "false";
    }
    $scope.msg = "title";

    function showPopup()
    {
        var popUp = $ionicPopup.show({

            scope: $scope,

            templateUrl : "gratuites.html",

            

            buttons: [
                {
                    text: "TERMINER",
                    type: "button-assertive",
                    cssClass: "assertive-survey",
                    onTap: function(e){
                        e.preventDefault();
                        if(checkIfConflictRemaining())
                        {
                            console.debug("mazal");
                        }
                        else
                        {
                            addChoosenGifts();
                            popUp.close();
                        }
                    }
                }
            ],
            title: 'Gratuités',
            subTitle: '('+$scope.groups.length+')'
        });
        console.debug(popUp);
    }

    init();

    var promotionsSuccess = [];
    var replace = true;

    $scope.change = function(article){

        //Promotions and SBDs 
        ViewController.check(article);
        init();
    };
    

    $scope.print = function(){

        PrinterService.formatedContent( [CartUtilities.getCartItems(), JSON.parse(window.localStorage['mission'] || '{}'), $scope.totalHT, $scope.totalTTC, 0.7 ],"Pre-vendeur" )
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
                                $state.transitionTo(position.nextStep.name, { vendeur: true, chargement: false });
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
            $state.transitionTo(position.previousStep.name, { vendeur: true, chargement: false });
        }
    };
    
    
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
            countDiscount($scope.choosenMethod, date);
        });
    };
    function countDiscount(method, date)
    {
        ModePaiement.escompte(angular.copy(method), date)
        .then(
            function(discount){
                $scope.currentDiscount = discount;
            });
    }

    
    
    
})

.controller('SurveyCtrl', function($scope, $timeout,position, CartUtilities, Surveys, $state, $ionicPopup){
    
    // TOTAL INITIALIZATION TO 0 !
    $scope.total = 0;

    cartInitialization();

    function cartInitialization()
    {
         CartUtilities.totalCart(true, false, true)
        .then(function(total){
            $scope.total = total;
        });
    }

    $scope.$parent.clearFabs();
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $timeout(function()
        {
            $scope.$parent.showHeader();
        }, 500);
    $scope.isExpanded = true;

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
                    $state.transitionTo(position.nextStep.name, { vendeur: true, chargement: false });
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
                    $state.transitionTo(position.nextStep.name, { vendeur: true, chargement: false });
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
                    if(position.nextStep.name == "app.brands")
                    {
                        var profile = JSON.parse(window.localStorage['profile'] || "{}");
                        var isVendeur = profile.fonction == "vendeur";
                        $state.transitionTo(position.previousStep.name, { vendeur: isVendeur, chargement: false, prelevement: false });
                    }
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
        if(position.previousStep.name == "app.brands")
        {
            var profile = JSON.parse(window.localStorage['profile'] || "{}");
            var isVendeur = profile.fonction == "vendeur";
            $state.transitionTo(position.previousStep.name, { vendeur: isVendeur, chargement: false, prelevement: false });
        }
        else
        {
            $state.transitionTo(position.previousStep.name);
        }
        
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

.controller('BrandCtrl', function($scope, $log, $state, $ionicPopup, $stateParams, CartUtilities, IonicPopUpUtilities, Articles, ViewController, $ionicLoading){
   

    // TOTAL INITIALIZATION TO 0 !
    $scope.total = 0;

    cartInitialization();

    function cartInitialization()
    {
        $scope.total = CartUtilities.totalCart(true, false, true);
    }

    var isVendeur = $scope.isVendeur = $stateParams.vendeur && $stateParams.vendeur == "true" ? true : false;

    var prelevement = $scope.prelevement = $stateParams.prelevement == "true" ? true : false;

    var forChargement = $scope.forChargement = $stateParams.chargement && $stateParams.chargement == "true" ? true : false;

    var retour = $scope.retour = $stateParams.retour && $stateParams.retour == "true" ? true : false;

    console.debug(retour);
    
    var brand = $scope.brand = typeof($stateParams.name) != "undefined" ? $stateParams.name: "NONE";

    var vendeurId = JSON.parse(window.localStorage['profile'] || "{}").id_db;

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
    
    $ionicLoading.show({
                template: "chargement ..."
            });
    
   
    if(true)
    {
        // add the brand name + true if it is a vendeur profile + true if it is for chargement
        // + the id of vendeur if it is the current profile !
        Articles.getArticlesByMarque(brand, isVendeur, forChargement, vendeurId, retour).then(
            function(articles){

                $log.debug(articles);

                $scope.articles = [];
                console.debug(prelevement);

                var _articles = ViewController.prepare(articles, brand, forChargement, prelevement, retour);

                for(var i = 0 , len = _articles.length ; i < len ; i++)
                {
                    var _article = _articles[i];
                    if(forChargement)
                    {
                        if(_article.demandeUnit > 0 || _article.demandeStock > 0)
                        {
                            if(!(_article.unit > 0 || _article.packet > 0))
                            {
                                _article.unit = _article.demandeUnit;
                                _article.packet = _article.demandePacket;
                                ViewController.check(_article, forChargement, isVendeur);
                            }
                        }
                    }
                    $scope.articles.push(_article);
                }

            }, 
            function(error){
                console.log(error);
            })
            .finally(function(){
                $ionicLoading.hide();
            });

        $scope.change = function(article){

            ViewController.check(article, forChargement, isVendeur, prelevement, retour);
            console.debug(retour);
            if(!prelevement && !forChargement && !retour)
            {
                cartInitialization();
            }
            else
            {
                console.debug("YES NO CART INITIALIZATION !");
            }
            
        };
        // As the brand has no role in the call steps and is directly linked to the brands steps we only have to
        // associate it to the brands route

        $scope.back = function(){
            //Deep copy of the article in the scope !!
            //To avoid the launch of the watchers !!
            //&& to not point on them !!
            var _articles = angular.copy($scope.articles);

            if(!Articles.itemInScopeOutOfQuota(_articles, isVendeur, prelevement, retour))
            {
                $state.transitionTo("app.brands", { vendeur: isVendeur, chargement: forChargement, prelevement: prelevement, retour: retour });
            }
            else
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté !", "Veuillez modifier les quantités."));
            }
            
        };
    }
})

.controller('ExclusionsCtrl', function($scope,$state){
    
})

.controller('RemainingCtrl', function($scope, $state,ViewController, Articles, Promotions, SBD, position){
    console.log(position);
    $scope.hasNext = position.hasNext;
    $scope.hasPrevious = position.hasPrevious;
    $scope.next = function(){
        if(position.hasNext)
            {
                console.log(position.nextStep.name);
                $state.transitionTo(position.nextStep.name);
            }
    };

    $scope.previous = function(){
        if(position.hasPrevious)
            {
                $state.go(position.previousStep.name);
            }
    };

    $scope.change = function(article){

        ViewController.check(article);

        //initialize();
    };

    $scope.infos = JSON.parse(window.localStorage['profile']);

    $scope.articles = [];

    initialize();

    function initialize()
    {
        var ids = ViewController.idsRemaining();

        Articles.getArticlesInRange(ids).then(
            function(articles){
                $scope.articles = [];
                
                var _articles = ViewController.prepare(articles);

                for(var i = 0, len = _articles.length ; i < len ; i++)
                {
                    var article = _articles[i];
                    $scope.articles.push(article);
                }
            }, 
            function(error){
                console.log(error);
            }).finally(function(){
                console.log("END !!");
            });
    }

})

.controller('BrandFiveCtrl', function($http, $filter, $log,  $scope, $cordovaVibration, $ionicLoading, ViewController, SBD, CartUtilities, IonicPopUpUtilities, $stateParams, $state,Commandes, Articles, Promotions, Marques, $ionicPopup, $timeout, Missions, LigneCommandes, position){
   
    // TOTAL INITIALIZATION TO 0 !
    $scope.total = 0;

    cartInitialization();

    function cartInitialization()
    {
        CartUtilities.totalCart(true, false, true)
        .then(
            function(success){
                console.log(success);
                $scope.total = success;
        });
    }

    //THE CALLER INFOS !! (PREVENDEUR - VENDEUR)
    var infos = JSON.parse(window.localStorage['profile']);

    $scope.infos = infos;

    var isVendeur = typeof(infos.fonction) != "undefined" && infos.fonction == "vendeur";

    // We normally have no chargement for prevendeur || vendeur .
    var forChargement = false;

    $scope.isVendeur = isVendeur;

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
        //$cordovaVibration.vibrate(100);
        $log.debug(isVendeur);
        if(position.hasNext && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles), isVendeur))
            {

                //$cordovaVibration.vibrate(100);
                $state.go(position.nextStep.name, { vendeur: isVendeur, chargement: false });
            }
            else
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté", "Veuillez modifier les quantités."));
            }
    };
    $scope.previous = function(){
        //$cordovaVibration.vibrate(100);

        if(position.hasPrevious && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles)))
            {
                //$cordovaVibration.vibrate(100);
                $state.go(position.previousStep.name, { vendeur: isVendeur, chargement: false });
            }
            else
            {
                $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté", "Veuillez modifier les quantités."));
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

    

    //REAL TIME PROCESS !!
    //ADDING ITEMS TO CART, REMOVING THEM, MODIFY QTYs, PROMOTIONS && SBDs
    $scope.change = function(article) {
        ViewController.check(article, forChargement, isVendeur);
        cartInitialization();
    };
    
    function refreshBrand(brandName)
    {
        $ionicLoading.show({
                template: "chargement ..."
            });
    
        Articles.getArticlesByMarque(brandName, isVendeur, forChargement, infos.id_db).then(
            function(articles){

                $scope.articles = [];

                var _articles = ViewController.prepare(articles, brandName);

                for(var i = 0 , len = _articles.length ; i < len ; i++)
                {
                    $scope.articles.push(_articles[i]);
                }

            }, 
            function(error){
                console.log(error);
            })
            .finally(function(){
                $ionicLoading.hide();
            });

    }

    
    
    $scope.backward = function(){
        //$cordovaVibration.vibrate(100);

        if($scope.back && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles), isVendeur))
        {
            //
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
            $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté", "Veuillez modifier les quantités."));
        }
    };
    $scope.forward = function(){
        $log.debug(isVendeur);
        //$cordovaVibration.vibrate(100);
        if($scope.forw && !Articles.itemInScopeOutOfQuota(angular.copy($scope.articles), isVendeur))
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
            $ionicPopup.alert(IonicPopUpUtilities.alert("Problème de qté", "Veuillez modifier les quantités."));
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
