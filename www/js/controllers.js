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

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };
    $scope.test = function(){
        window.open('img/test.pdf', '_blank', 'location=yes');
    };
    $scope.synchronization = function(){
        Missions.syncMissions($scope.infos.account.id_db).then(
            function(success){
                console.log(success);
            },
            function(error){
                console.log(error.message)
            });

        Clients.syncClients($scope.infos.account.id_db);
    };
    $scope.logout = function(){
        $ionicLoading.show({
            template: 'Deconnexion en cours ...'
        });
        $timeout(
            function(){
                window.localStorage['profile'] = 'null';
                $state.go("menu.login");
                $ionicLoading.hide();
            }, 3000);
        
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
    $scope.$parent.clearFabs();
    // Set Header
    $ionicSideMenuDelegate.canDragContent(true);
    $scope.$parent.showHeader();
    
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
    $stateParams, $ionicSideMenuDelegate, $state, $ionicModal, ionicMaterialInk, Accounts, Profile) {
    $scope.$on('$ionicView.beforeEnter', function() {
        if(window.localStorage['profile'] !== 'null')
        {
            $state.go("menu.entry");
        }
    });
    $rootScope.infos = {};
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    $ionicSideMenuDelegate.canDragContent(false);
    ionicMaterialInk.displayEffect();

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
      Accounts.getAccountByUserNameAndPassword(object.username, object.password).then(
        function(user){
            console.log("THIS IS IT : "+user);
            if(typeof user === "undefined")
            {
                updateIonicLoading('Erreur fatale !');
                return;
            }
            if(user != null && user.first_login === 1)
            {
                $rootScope.infos.account = user;
                updateIonicLoading('Connexion réussi !');
                Profile.getProfile(user.id_db).then(
                    function(profile){
                        $rootScope.infos.profile = profile;
                    }, 
                    function(error){
                    });
                console.log(JSON.stringify(user));
                current_user = user;
                console.log(user);
                $scope.modal_change_password.show();

            }
            else if( user != null && user.first_login === 0)
            {
                $rootScope.infos.account = user;
                updateIonicLoading('Connexion réussi !');
                Profile.getProfile(user.id_db).then(
                    function(profile){
                        $rootScope.infos.profile = profile;
                        window.localStorage['profile'] = JSON.stringify($rootScope.infos);
                    }, 
                    function(error){
                    });
                console.log(JSON.stringify(user));
                current_user = user;
                console.log(user);
                $timeout(function(){
                    $state.go("menu.entry")
                }, 2000);
            }
            else
            {
                updateIonicLoading('Tentative de connexion à NewSales ');
                Accounts.connectFromAPI(object).then(
                    function(success){
                        updateIonicLoading("Connexion réussi !");
                        var data = success.data;
                        var account = {
                            id_db : data.employee.id,
                            username : data.username,
                            password : data.password,
                            golden_points : data.employee.golden_points
                        };
                        Accounts.addAccount(account).then(
                                function(success1){
                                    if(typeof success1.insertId !== "undefined")
                                    {
                                        $rootScope.infos.account = account;
                                        console.log(success1);  
                                        console.log("Compte ajouté avec succes");
                                        var profile = {
                                            name : data.firstName,
                                            second_name : data.lastName,
                                            address : data.address,
                                            email_address : data.email,
                                            phone_number : data.telMobile,
                                            id_account : success1.insertId
                                        };
                                        
                                        Profile.addProfile(profile).then(
                                            function(success2){
                                                if(typeof success2.insertId !== "undefined")
                                                {
                                                    $rootScope.infos.profile = profile;
                                                    window.localStorage['profile'] = JSON.stringify($rootScope.infos);
                                                    updateIonicLoading("Votre espace personnel a été créé avec succes !");
                                                    $state.go("menu.entry");
                                                }
                                                else
                                                {
                                                    updateIonicLoading("Erreur lors de la création de votre personnel !");
                                                }
                                            },
                                            function(error){
                                                console.log(error.message);
                                            });
                                    }
                                    else
                                    {
                                        updateIonicLoading("Erreur lors de la création de votre personnel !");
                                    }
                            },
                            function(error){
                                console.log(error.message);
                            });

                    }, 
                    function(error){
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
                                updateIonicLoading("Problème de connexion");
                                break;
                        }
                    });
            }
        },
        function(message){
            console.log(JSON.stringify(message));
            
        });
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

.controller('EntryCtrl', function($scope, $rootScope, $state, Missions, Clients){
    $scope.$on('$ionicView.beforeEnter', function() {
        if(window.localStorage['profile'] !== 'null')
        {
            $scope.infos = JSON.parse(window.localStorage['profile']);
        }
        else
        {
            $state.go("menu.login");
        }
    });
    $scope.test = function(){
        window.open('img/test.pdf', '_blank', 'location=yes');
    };
    $scope.synchronization = function(){
        Missions.syncMissions($scope.infos.account.id_db).then(
            function(success){
                console.log(success);
            },
            function(error){
                console.log(error.message)
            });

        Clients.syncClients($scope.infos.account.id_db);
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
    $state)
{
    $scope.$parent.clearFabs();
    $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.vente = typeof window.localStorage['cart'] == "undefined";

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    $scope.clients = [];
    ionicMaterialInk.displayEffect();
    $scope.client = {};
    $scope.mission_id = $rootScope.mission;
    $ionicSlideBoxDelegate.update();
    $scope.$on('$ionicView.beforeEnter', function() {
        $ionicSlideBoxDelegate.update();
    });
    console.log($rootScope.mission);
    var clientName;
    Clients.getClient($stateParams.id).then(
        function(client){
            $scope.client = client;
            console.log(JSON.stringify(client));
            clientName  = $scope.client.name;
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
    $scope.start = function(){
        Missions.setEntryDate($rootScope.mission, Date.now()).then(function(success){console.log(success)});
        $state.go("app.brandfive", { mission : $rootScope.mission });
    };
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
                            prixVente: data[j].prixVente,
                            total: data[j].total
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
        client2: {
            lat: 33.533333,
            lng: -7.583333,
            zoom: 17
        },
        markers2: {
            m1: {
                lat: 33.533333,
                lng: -7.583333,
                focus: true,
                draggable: false,
                message: "Client",
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


        

})

.controller('RoutesCtrl', function($scope, $rootScope, $ionicModal,
    Missions, Clients,
    $ionicSideMenuDelegate, $state, $timeout, ionicMaterialMotion, ionicMaterialInk){
    $scope.data = {};
    var length = 0;
    var scrollPosition = 0;
    $scope.$parent.clearFabs();
    $scope.$parent.showHeader();
    $scope.$parent.setHeaderFab('left');
    $scope.address = "";
    $scope.noMoreItemsAvailable = false;
    $scope.data.missions = [];
    $scope.missions = [];
    $scope.goToClient = function(mission){
        $rootScope.mission = mission.id_db;
        $state.go("app.client", {id : mission.client_id});
    };
    Missions.getUnfinishedMissions().then(
        function(missions){
            length = missions.length;
            for(var i = 0 ; i < missions.length ; i++)
            {
                $scope.missions.push(missions[i]);
            }
        }, 
        function(error){
            console.log(error.message);
        });
    $scope.test = function(mission_id){
        console.log(mission_id);
        $rootScope.mission = mission_id;
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

.controller('ClientsCtrl', function($scope, $stateParams, $timeout, $cordovaGeolocation, Clients, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.clearFabs();
    $scope.$parent.showHeader();
    $scope.$parent.setHeaderFab('left');
    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    $scope.clients = [];
    $scope.sync = function(){
        Clients.syncClients(1);
    };
   /* angular.forEach(data.data, function(route)
            {
                angular.forEach(route.clients, function(client){
                    $scope.clients.push(client);
                })
            });
            console.log(JSON.stringify($scope.clients));*/
    Clients.getAllClients().then(
        function(clients){
            angular.forEach(clients, function(client){
                    $scope.clients.push(client);
                });
        }, 
        function(error){
            console.log(error);
        });

    
})

.controller('ProfileCtrl', function($scope, $rootScope, $stateParams, $ionicSlideBoxDelegate,
    Routes, SynchronizationService,$ionicLoading, Profile, $cordovaToast, Commandes, BrandFive, Missions, LigneCommandes,
    $ionicSideMenuDelegate, $state, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$on('$ionicView.beforeEnter', function() {
        if(window.localStorage['profile'] === 'null')
        {
            $state.go("menu.login");
        }
    });
    // Set Header
    $scope.$parent.clearFabs();
    $ionicSideMenuDelegate.canDragContent(true);
    $scope.$parent.showHeader();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    console.log($rootScope.infos);
    $scope.unfinishedMissions = [];
    $scope.toggle = function () {
      $scope.type = $scope.type === 'PolarArea' ?
        'Pie' : 'PolarArea';
    };
    $scope.labels = ["Clients facturés", "Clients en attente", "Clients avec problème"];
    $scope.commandes = [];
    $scope.ca = 0;
    $ionicSlideBoxDelegate.update();
    $scope.brandfive = [];
    $scope.gp = 0;
    Profile.getGPAccount().then(function(ca){$scope.gp = ca.golden_points; }, function(){err})
    Commandes.getCAVendeur().then(
        function(result){
            $scope.ca = result.ca;
        }, 
        function(error){
            console.log(error.message);
        });
    BrandFive.getCABrandFive().then(
        function(brands){
            console.log(brands);
            angular.forEach(brands, function(brand){
                $scope.brandfive.push(brand);
            });
        }, 
        function(error){
            console.log(error.message);
        });

    Missions.countMissions().then(
        function(result){
            console.log(result);
            $scope.data = [];
            $scope.colours = ["#81C784", "#F57C00", "#FF5252"];
            $scope.data.push(result.finished, result.waiting, result.problem);
        }, 
        function(error){
            console.log(error.message);
        });

    $scope.colours = ['#1EF9A1','#F44336'];

    Missions.getMissionsWithCommande().then(
        function(missions){
            angular.forEach(missions, function(mission){
                Commandes.getCommande(mission.commande_id).then(
                    function(commandes){
                        angular.forEach(commandes, function(commande){
                            var finalCommande = {};
                            finalCommande.commande = commande;
                            LigneCommandes.getLigneCommande(commande.id).then(
                            function(ligneCommandes){
                                finalCommande.ligneCommandes = ligneCommandes;
                                angular.forEach(ligneCommandes, function(ligne){
                                    $scope.ca += (ligne.qte*ligne.pu_ttc);
                                });
                            }, 
                            function(error){
                                console.log(error.message);
                            });
                        });
                    }, 
                    function(error){
                        console.log("erreur");
                    });
            });
        }, 
        function(error){
            console.log(error.message);
        });

    Missions.getMissions5WithCommande().then(
        function(missions){
            angular.forEach(missions, function(mission){
                Commandes.getCommande(mission.commande_id).then(
                    function(commandes){
                        angular.forEach(commandes, function(commande){
                            var finalCommande = {};
                            finalCommande.commande = commande;
                            LigneCommandes.getLigneCommande(commande.id).then(
                            function(ligneCommandes){
                                finalCommande.ligneCommandes = ligneCommandes;
                                $scope.commandes.push(finalCommande);
                                $ionicSlideBoxDelegate.update();
                                finalCommande = {};
                            }, 
                            function(error){
                                console.log(error.message);
                            });
                        });
                    }, 
                    function(error){
                        console.log("erreur");
                    });
            });
        }, 
        function(error){
            console.log(error.message);
        });

    $scope.test = function(){
        Commandes.getCommandesByClient(1).then(
            function(commandes){
                console.log(JSON.stringify(commandes));
            }, 
            function(error){
                console.log(error);
            });
    }
    $scope.synchronize = function() {
        $cordovaToast
        .show('Synchronisation en cours ...', 'short', 'bottom')
        .then(function(){});
         SynchronizationService.sync().then(
            function(success){
                $cordovaToast
                .show(success, 'short', 'bottom')
                .then(function(){});
            },
            function(error){
                $cordovaToast
                .show(error, 'short', 'bottom')
                .then(function(){});
            });
    };
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

    $scope.all = function(){
        $state.go("app.routes", { code : 1});
    };

    $scope.today = function(){
        $state.go("app.routes", { code : 0});
    };
    
    Missions.getFinishedMissions().then(
        function(missions){
            angular.forEach(missions, function(mission){
                $scope.unfinishedMissions.push(mission);
            });
        }, 
        function(error){
            console.log(error.message);
        });
   


})

.controller('BrandsCtrl', function($scope, $state, Commandes, LigneCommandes, $stateParams, Articles, $ionicModal, Missions){
    $scope.$on('$ionicView.beforeEnter', function() {
        if(window.localStorage['profile'] === 'null')
        {
            $state.go("menu.login");
        }
        Missions.getFinishedMission($scope.idMission).then(
        function(mission){
            if(mission !== null)
            {
                window.localStorage.removeItem('cart');
                $state.go("menu.entry");
            }
        }, 
        function(error){
            console.log(error.message);
        });
        if(typeof window.localStorage['cart'] == "undefined")
        {
            $state.go('menu.login');
        }
    });
    console.log($stateParams.mission);
    $scope.rows = [];
    $scope.totalBill = 0;
    var currentCart = JSON.parse(window.localStorage['cart'] || '{}');
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
    Articles.getMarques().then(
        function(marques){
            var count = marques.length;
            for(var i = 0 ; i < count - (count % 6) ; i+=6)
            {
                var row = [];
                for(var j = i ; j < i+6 ; j++)
                {
                    console.log("j"+j);
                    row.push(marques[j]);
                }
                $scope.rows.push(row);
            }
            var finalRow = [];
            for(var i = count - (count % 6) ; i < count ; i++)
            {
                finalRow.push(marques[i]);
            }
            $scope.rows.push(finalRow);
        }, 
        function(error){
            console.log(error);
        });
    $scope.goToBrand = function(marque){
        $state.go('app.brand',{ name:  marque, mission: $stateParams.mission});
    };
})

.controller('AddCtrl', function($scope, $timeout, $ionicLoading, $cordovaGeolocation, Missions, Clients){
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $scope.client = {};
      $scope.routes = [];
      $cordovaGeolocation
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

.controller('CartCtrl', function($state, $stateParams, $scope, Commandes, Missions, LigneCommandes, Articles){
    var cart = JSON.parse(window.localStorage['cart'] || '{}');
    $scope.data = {};
    $scope.data.items = []
    $scope.data.total = 0;
    $scope.recovery = true;
    
    if(cart !== null)
    {
        Missions.getMission(cart.mission).then(
        function(mission){
            $scope.data.client = mission.client_id;
        });
    }
    $scope.test = JSON.parse(window.localStorage['sbd']);
    console.log($scope.test);
    function refreshTotalBill()
    {
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
        $scope.totalBill = 0;
        for(var i = 0 ; i < cart.items.length ; i++)
        {
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
    $scope.pay = function(){
        $scope.sbdShow = false;
        Missions.setExitDate(cart.mission, Date.now()).then(function(success){console.log(success)});
        $scope.confirm();
        $scope.recovery = false;
        $scope.data.recovery = [];
        var code_commande = "CM"+Date.now();
        console.log(code_commande);
        Commandes.addCommande(code_commande, cart.mission, $scope.data.client).then(
            function(success){
                console.log("start");
                var commande_id = success.insertId;
                console.log(success.insertId)
                console.log(success);
                var cart = JSON.parse(window.localStorage['cart'] || '{}');
                var items = cart.items;
                console.log(items);
                console.log(typeof commande_id);
                if(typeof commande_id === "number")
                {
                    angular.forEach(items, function(item){
                    console.log(item);
                    var ligneCommande = {
                        nomArticle : item.nomArticle,
                        prixVente : item.prixVente,
                        packet : item.packet,
                        unit : item.unit,
                        id : item.id_db
                    };
                    console.log(JSON.stringify(ligneCommande));
                    LigneCommandes.addLigneCommande(ligneCommande, commande_id).then(
                        function(success){
                            //console.log("success");
                            console.log(success);
                        },
                        function(error){
                            console.log(error.message);
                        });
                    });
                    console.log(cart.mission);
                    Missions.setMissionToSucceed(cart.mission, commande_id).then(
                        function(success){
                            console.log(success);
                        }, 
                        function(error){
                            console.log(error);
                        });
                }
                window.localStorage.removeItem('cart');
                window.localStorage.removeItem('sbd');
                window.localStorage.removeItem('promotions');
                window.localStorage.removeItem('marques');
            }, 
            function(error){
                console.log(error);
            });
    };

    function check(){
                refreshTotalBill();
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
                                            if(article.id == innerArticle.id)
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
                                                if(cart.items[l].id == promotions[j].articles[k].id)
                                                {
                                                    console.log("FOUND IN CART");
                                                    count+=qty;
                                                    ca+=amount;
                                                    items.push({ id: cart.items[l].id, qty: qty });
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
                                            console.log("PP");
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
                refreshTotalBill();
    }
    $scope.confirm = function(){
        refreshTotalBill();
        check();
        var mission_id = cart.mission;
        var items = $scope.data.items;
        console.log(items);
        console.log(items.length);
        var cleanOnes = [];
        var sbds = JSON.parse(window.localStorage['sbd'] || '[]');
        angular.forEach(items, function(article){
            if(article.groupeSBD != null)
            {
                console.log(article);
                for(var i = 0 ; i < sbds.length ; i++)
                {
                    if(article.groupeSBD == sbds[i].id)
                    {
                        for(var j = 0 ; j < sbds[i].articles.length ; j++)
                        {
                            if(sbds[i].articles[j].id == article.id)
                            {
                                sbds[i].articles[j].qty = 0;
                            }
                        }
                    }
                }
            }
            window.localStorage['sbd'] = JSON.stringify(sbds);
        });
        for(var i = 0 ; i < items.length ; i++)
        {
            if(!((items[i].packet === 0) && (items[i].unit === 0)))
            {
                cleanOnes.push(items[i]);
            }
        }
        $scope.data.items = [];
        angular.forEach(cleanOnes, function(clean){
            $scope.data.items.push(clean);
        });
        var finalObject = { mission : mission_id, items : cleanOnes };
        window.localStorage['cart'] = JSON.stringify(finalObject);
    }
    if(cart !== null)
    {
        angular.forEach(cart.items, function(item){
        $scope.data.items.push(item);
        $scope.data.total+=(((item.packet*10)+item.unit)*item.prixVente);
        });
    }

})

.controller('BrandCtrl', function($scope, $state, Promotions, Missions, $stateParams, Articles, LigneCommandes){
    $scope.$on('$ionicView.beforeEnter', function() {
        if(window.localStorage['profile'] === 'null')
        {
            $state.go("menu.login");
        }
        Missions.getFinishedMission($scope.idMission).then(
        function(mission){
            if(mission !== null)
            {
                window.localStorage.removeItem('cart');
                $state.go("menu.entry");
            }
        }, 
        function(error){
            console.log(error.message);
        });
        if(typeof window.localStorage['cart'] == "undefined")
        {
            $state.go('menu.login');
        }
    });
    $scope.marque = $stateParams.name;
    $scope.articles = [];
    $scope.totalBill = 0;
    $scope.cnt = 0;
    var currentCart =JSON.parse(window.localStorage['cart'] || '{}');
    console.log("current Cart "+JSON.stringify(currentCart));
     function refreshTotalBill()
    {
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
        $scope.totalBill = 0;
        for(var i = 0 ; i < cart.items.length ; i++)
        {
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
    console.log('TEST');
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
                    article.promotions = article.promotions != null ? article.promotions.split(', ').map(Number) : null;
                    
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
                        if(article.id_db == cartItem.id)
                        {
                            inCart = true;
                            angular.forEach(sbds, function(sbd){
                                if(cartItem.groupeSBD != null && cartItem.groupeSBD == sbd.id)
                                {
                                    var total = 0;
                                    var found = false;
                                    angular.forEach(sbd.articles, function(innerArticle){
                                        total+=innerArticle.qty;
                                        if(cartItem.id == innerArticle.id)
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
                refreshTotalBill();

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
                    refreshTotalBill();
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

                    });
    }

    function check(realtime){
                refreshTotalBill();
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
                                        if(article.id == innerArticle.id)
                                        {
                                            innerArticle.qty = article.unit+(article.packet*10);        
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
                                if(item.id == article.id)
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
                        if(article.promotions != null)
                        {
                            console.log('Cet Article Est En Promo');
                            var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
                            console.log(promotions);
                            console.log(article);
                            var cart = currentBasket;
                            for(var i = 0 ; i < article.promotions.length ; i++)
                            {
                                for(var j = 0 ; j < promotions.length ; j++)
                                {
                                    if(promotions[j].id == article.promotions[i])
                                    {
                                        console.log('GOTCHA !!');
                                        console.log(promotions[j]);
                                        // Count the qty of all articles that are inclueded in this promotion
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
                                                if(cart.items[l].id == promotions[j].articles[k].id)
                                                {
                                                    console.log("FOUND IN CART");
                                                    count+=qty;
                                                    ca+=amount;
                                                    items.push({ id: cart.items[l].id, qty: qty });
                                                }
                                                else
                                                {
                                                    console.log("NOT FOUND IN CART");
                                                }
                                                total+=amount;
                                            }
                                        }
                                        if(promotions[j].type == "PMT")
                                        {
                                            if(ca>=promotions[j].ca)
                                            {
                                                promotions[j].consumed = true;
                                                console.log(promotions[j].consumed);
                                                console.log(promotions[j].id);
                                                window.localStorage['promotions'] = JSON.stringify(promotions);
                                            }
                                            else
                                            {
                                                promotions[j].consumed = false;
                                                console.log("NO GIFT !");
                                                window.localStorage['promotions'] = JSON.stringify(promotions);
                                            }
                                        }
                                        if(promotions[j].type == "PP")
                                        {
                                            if(Boolean(promotions[j].melange))
                                            {
                                                console.log(items);
                                                console.log("MELANGE");
                                                if(Boolean(promotions[j].cummulable))
                                                {
                                                    console.log("MELANGE CUMMULABLE");
                                                    console.log("MIN :");
                                                    console.log(promotions[j].qte);
                                                    console.log("CURRENT :");
                                                    console.log(count);
                                                    if(promotions[j].qte <= count)
                                                    {
                                                        promotions[j].consumed = true;
                                                        console.log("I THINK YOU ARE NOT FAR FROM THIS PROMOTION'S GIFTS !");
                                                        var repetitions = Math.trunc(count / promotions[j].qte);
                                                        console.log(repetitions);
                                                        if(repetitions >= promotions[j].max)
                                                        {
                                                            promotions[j].cumule = promotions[j].max;
                                                        }
                                                        else
                                                        {
                                                            promotions[j].cumule = repetitions;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        promotions[j].consumed = false;
                                                        console.log("FAR AWAY BUDDY !");
                                                        console.log("MIN :");
                                                        console.log(promotions[j].qte);
                                                        console.log("CURRENT :");
                                                        console.log(count);
                                                    }
                                                }
                                                else
                                                {
                                                    if(promotions[j].qte <= count)
                                                    {
                                                        promotions[j].consumed = true;
                                                        promotions[j].cumule = 1;
                                                    }
                                                    else
                                                    {
                                                        promotions[j].consumed = false;
                                                    }
                                                }
                                            }
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
        $scope.totalBill = 0;
        refreshTotalBill();
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
                        if(sbds[i].articles[j].id == article.id)
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

.controller('ExclusionsCtrl', function($scope){
    var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
    var max = 0;
    $scope.data = {};
    $scope.data.conflicts = [];
    for(var i = 0 ; i < promotions.length ; i++)
    {
        if(promotions[i].exclusions != null  && promotions[i].exclusions.length > 0)
        {
           var object = {};
           object.promotion = promotions[i];
           object.inConflictWith = [];
           for(var j = 0 ; j < promotions[i].exclusions.length ; j++)
           {
                for(var k = 0 ; k < promotions.length ; k++)
                {
                    if(promotions[i].exclusions[j] == promotions[k].id)
                    {
                        object.inConflictWith.push(promotions[k]);
                    }
                }
           }
           $scope.data.conflicts.push(object);
           console.log($scope.data.conflicts);
        }
    }
    console.log(max);
})

.controller('RemainingCtrl', function($scope, $state, Articles){
    var cart = JSON.parse(window.localStorage['cart'] || '{}');
    var sbd = JSON.parse(window.localStorage['sbd'] || '[]');
    var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
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
                if(sbd[i].articles[j].id == cart.items[k].id)
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
    array = Array.from(new Set(array));
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
                    if(cartItem.id == article.id)
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

                    });
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
                                            if(article.id == innerArticle.id)
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
                                                if(cart.items[l].id == promotions[j].articles[k].id)
                                                {
                                                    console.log("FOUND IN CART");
                                                    count+=qty;
                                                    ca+=amount;
                                                    items.push({ id: cart.items[l].id, qty: qty });
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
                        if(sbds[i].articles[j].id == article.id)
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

.controller('BrandFiveCtrl', function($http, $scope, $ionicLoading, $stateParams, $state, Articles, Promotions, Marques, $ionicPopup, $timeout, Missions, LigneCommandes){
    $scope.$on('$ionicView.beforeEnter', function() {
        if(window.localStorage['profile'] === 'null')
        {
            $state.go("menu.login");
        }
        Missions.getFinishedMission($scope.idMission).then(
        function(mission){
            if(mission != null)
            {
                window.localStorage.removeItem('cart');
                $state.go("menu.entry");
            }
        }, 
        function(error){
            console.log(error.message);
        });
    });
    var firstEntry = { mission : $stateParams.mission, items : [] };
    $scope.idMission = $stateParams.mission;
    $scope.change = function(){
        refreshBrandRealTime();
    };
    window.localStorage['cart'] = typeof window.localStorage['cart'] != 'undefined' ? window.localStorage['cart'] : JSON.stringify(firstEntry);
    console.log(window.localStorage['cart']);
    $scope.totalBill = 0;
    $scope.articles = [];
    $scope.cnt = 0;
    var currentCart = JSON.parse(window.localStorage['cart'] || '{}');
    console.log("current Cart "+JSON.stringify(currentCart));
    angular.forEach(currentCart.items, function(value){
        if(typeof value === "object")
        {
            $scope.totalBill+=(((value.packet*10)*(value.prixVente))+(value.unit*value.prixVente));
        }
    });

    if(typeof window.localStorage['promotions'] == 'undefined')
    {
        
       Promotions.getClientPromotions(1).then(
        function(result){
            console.log(result);
            var articles = [];
            var promotions = [];
            angular.forEach(result, function(promotion){
                promotion.articles = promotion.articles != null ? JSON.parse(promotion.articles) : [];
                promotion.inclusions = promotion.inclusions != null ? promotion.inclusions.split(',').map(Number) : [];
                promotion.exclusions = promotion.exclusions != null ? promotion.exclusions.split(',').map(Number) : [];
                promotion.gratuites = promotion.gratuites != null ? JSON.parse(promotion.gratuites) : [];
                promotion.consumed = false;
                console.log(promotion);
            });
            window.localStorage['promotions'] = JSON.stringify(result);
        }, 
        function(error){
            console.log(error.message);
        });
    }
    if(typeof window.localStorage['sbd'] == 'undefined')
    {
        Articles.getArticleWithSBD().then(
        function(result){
            console.log(result);
            var sbds = [];
            angular.forEach(result, function(sbd){
                var object = {};
                object.id = sbd.id;
                object.min = sbd.min;
                object.articles = [];
                var array = sbd.articles != null ? sbd.articles.split(",").map(Number) : [];
                angular.forEach(array, function(_id){
                    var article = { id : _id, qty : 0};
                    object.articles.push(article);
                });
                object.qty = 0;
                sbds.push(object);
            });
            window.localStorage['sbd'] = JSON.stringify(sbds);
        }, 
        function(error){
            console.log(error.message);
        });
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
                        if(sbds[i].articles[j].id == article.id)
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

    $scope.toBrands = function(){
        refreshBrandRealTime();
        $state.go('app.brands', { mission : $stateParams.mission });
    };

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
    function refreshBrandRealTime(){
        refreshTotalBill();
        check(false);
        refreshTotalBill();
        $scope.totalBill = 0;
        angular.forEach($scope.articles, function(article){
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
                        console.log(article.done);
                    }
                }
            });

        });
        refreshTotalBill();
    }
    function refreshBrand(brandName){
        refreshTotalBill();
        $scope.totalBill = 0;
        var testItems = [];
        var cart = JSON.parse(window.localStorage['cart'] || '{}');
        refreshTotalBill();
        Articles.getArticlesByMarque(brandName).then(
            function(articles){
                console.log(articles);
                if(typeof window.localStorage['marques'] == "undefined")
                {
                    window.localStorage['marques'] == '{}';
                }
                var marques = JSON.parse(window.localStorage['marques'] || '{}');
                if(typeof marques[brandName] == 'undefined')
                {
                    marques[brandName] = articles;
                    window.localStorage['marques'] = JSON.stringify(marques);
                }
                var from = Date.now();
                $scope.articles = [];
                angular.forEach(articles, function(article){
                    LigneCommandes
                    .pastPurchacedQuantity(article.id_db, cart.mission)
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
                    article.promotions = article.promotions != null ? article.promotions.split(', ').map(Number) : null;
                    var items = JSON.parse(window.localStorage['cart'] || '{}');
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
                        if(article.id_db == cartItem.id)
                        {
                            inCart = true;
                            angular.forEach(sbds, function(sbd){
                                if(cartItem.groupeSBD != null && cartItem.groupeSBD == sbd.id)
                                {
                                    var total = 0;
                                    var found = false;
                                   if(sbd.articles != null && sbd.articles.length > 0)
                                   {
                                         angular.forEach(sbd.articles, function(innerArticle){
                                            total+=innerArticle.qty;
                                            if(cartItem.id == innerArticle.id)
                                            {
                                                found = true; 
                                            }
                                        });
                                        if(found)
                                        {
                                            cartItem.done = sbd.min <= total ? true : false;
                                        }
                                   }
                                   else
                                   {
                                        cartItem.done = true;
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
                refreshBrandRealTime();

            }, 
            function(error){
                console.log(error.message);
            });
    }
    $scope.back = false;
    $scope.forw = true;
    $scope.otherBrands = false;
    var defaultStep = 0;
    $scope.currentStep = defaultStep;
    $scope.marques = [];
    
    $scope.brandFives = [];
    $scope.brand = {};
    $scope.currentBrand = {};
    $scope.articles = [];
    function check(realtime){
                refreshTotalBill();
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
                                    console.log(article);
                                    if(sbd.articles != null && sbd.articles.length > 0)
                                    {
                                        angular.forEach(sbd.articles, function(innerArticle){
                                            if(article.id == innerArticle.id)
                                            {
                                                innerArticle.qty = article.unit+(article.packet*10);        
                                            }
                                        });
                                    }
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
                                if(item.id == article.id)
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
                                    refreshTotalBill();
                                    return;
                                }
                                refreshTotalBill();
                            });
                            if(!found)
                            {
                                article.inCart = true;
                                currentBasket.items.push(article);
                            }
                            window.localStorage['cart'] = JSON.stringify(currentBasket);
                                
                        }
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
                                    console.log("EN POCHE !");
                                }
                            }
                        }
                        if(article.promotions != null)
                        {
                            console.log('Cet Article Est En Promo');
                            var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
                            console.log(promotions);
                            console.log(article);
                            var cart = currentBasket;
                            for(var i = 0 ; i < article.promotions.length ; i++)
                            {
                                for(var j = 0 ; j < promotions.length ; j++)
                                {
                                    if(promotions[j].id == article.promotions[i])
                                    {
                                        console.log('GOTCHA !!');
                                        console.log(promotions[j]);
                                        // Count the qty of all articles that are inclueded in this promotion
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
                                                if(cart.items[l].id == promotions[j].articles[k].id)
                                                {
                                                    console.log("FOUND IN CART");
                                                    count+=qty;
                                                    ca+=amount;
                                                    items.push({ id: cart.items[l].id, qty: qty });
                                                }
                                                else
                                                {
                                                    console.log("NOT FOUND IN CART");
                                                }
                                                total+=amount;
                                            }
                                        }
                                        if(promotions[j].type == "PMT")
                                        {
                                            if(ca>=promotions[j].ca)
                                            {
                                                promotions[j].consumed = true;
                                                console.log(promotions[j].consumed);
                                                console.log(promotions[j].id);
                                                window.localStorage['promotions'] = JSON.stringify(promotions);
                                            }
                                            else
                                            {
                                                promotions[j].consumed = false;
                                                console.log("NO GIFT !");
                                                window.localStorage['promotions'] = JSON.stringify(promotions);
                                            }
                                        }
                                        if(promotions[j].type == "PP")
                                        {
                                            if(Boolean(promotions[j].melange))
                                            {
                                                console.log(items);
                                                console.log("MELANGE");
                                                if(Boolean(promotions[j].cummulable))
                                                {
                                                    console.log("MELANGE CUMMULABLE");
                                                    console.log("MIN :");
                                                    console.log(promotions[j].qte);
                                                    console.log("CURRENT :");
                                                    console.log(count);
                                                    if(promotions[j].qte <= count)
                                                    {
                                                        promotions[j].consumed = true;
                                                        console.log("I THINK YOU ARE NOT FAR FROM THIS PROMOTION'S GIFTS !");
                                                        var repetitions = Math.trunc(count / promotions[j].qte);
                                                        console.log(repetitions);
                                                        if(repetitions >= promotions[j].max)
                                                        {
                                                            promotions[j].cumule = promotions[j].max;
                                                        }
                                                        else
                                                        {
                                                            promotions[j].cumule = repetitions;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        promotions[j].consumed = false;
                                                        console.log("FAR AWAY BUDDY !");
                                                        console.log("MIN :");
                                                        console.log(promotions[j].qte);
                                                        console.log("CURRENT :");
                                                        console.log(count);
                                                    }
                                                }
                                                else
                                                {
                                                    if(promotions[j].qte <= count)
                                                    {
                                                        promotions[j].consumed = true;
                                                        promotions[j].cumule = 1;
                                                    }
                                                    else
                                                    {
                                                        promotions[j].consumed = false;
                                                    }
                                                }
                                            }
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
                console.log(currentBasket);
                window.localStorage['cart'] = JSON.stringify(currentBasket);
                var end = Date.now();
                console.log("TRUE DURATION :"+(end-start));
                if(realtime)
                {
                    $scope.currentBrand = $scope.brandFives[$scope.currentStep];
                    refreshBrand($scope.currentBrand.name);
                }
                var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
                refreshTotalBill();
                var cart = JSON.parse(window.localStorage['cart']);
                 for(var i = 0 ; i < promotions.length ; i++)
                {
                    cart.remises = typeof cart.remises == "undefined" ? [] : cart.remises;
                    if(promotions[i].type == 'PC')
                    {
                        console.log("Promotion Client FOR YOU !!");
                        console.log(promotions[i]);
                        console.log($scope.totalBill);
                        if(promotions[i].ca <= $scope.totalBill)
                        {
                            promotions[i].consumed = true;
                            console.log("NORMALEMENT EN POCHE !");
                            if(cart.remises.length < 1)
                            {
                                cart.remises.push({ remise : 5, promotion_id : promotions[i].id });
                            }
                            else
                            {
                                for(var j = 0 ; j < cart.remises.length ; j++)
                                {
                                    var found = false;
                                    if(promotions[i].id == cart.remises[j].promotion_id)
                                    {
                                        found = true;
                                        return;
                                    }
                                    if(!found)
                                    {
                                        cart.remises.push({ remise : 5, promotion_id : promotions[i].id });
                                    }
                                }
                            }
                        }
                    }
                }
                window.localStorage['promotions'] = JSON.stringify(promotions);
                window.localStorage['cart'] = JSON.stringify(cart);
    }
    
    $scope.backward = function(){
        if($scope.back)
        {
            check(false);
            if($scope.currentStep > 0)
            {
                $scope.forw = true;
                var result = $scope.currentStep-=1;
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
    };
    $scope.forward = function(){
        if($scope.forw)
            {
                check(false);
                if($scope.currentStep < 5)
                {
                    $scope.back = true;
                    var result = $scope.currentStep+=1;
                    $scope.currentBrand = $scope.brandFives[$scope.currentStep];
                    console.log($scope.currentBrand);
                    refreshBrand($scope.currentBrand.name);
                    if($scope.currentStep == 4)
                    {
                        $scope.forw = false;
                        $scope.otherBrands = true;
                    }
                }
                else
                {
                    $scope.forw = false;
                    $scope.otherBrands = true;
                }
            }
    };
    Marques.getBrandFiveFromLocalDB().then(
        function(brandfives){
            $scope.brandFives = brandfives;
            $scope.currentBrand = $scope.brandFives[$scope.currentStep];
            refreshBrand($scope.currentBrand.name);
        }, 
        function(error){
            console.log(error);
        });
    Articles.getMarques().then(
        function(marques){
            angular.forEach(marques, function(marque){
                $scope.marques.push(marque);
            });
        }, 
        function(error){
            console.log(error);
        });
    Articles.dumpMarques().then(function(result){
        console.log("success");
    });
})

.controller('MissionsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

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
    $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

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
