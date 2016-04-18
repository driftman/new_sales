// Ionic Starter App ttttt

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',
    ['ionic', 'starter.controllers', 'starter.services', 'ionic-material', 'ionMdInput','ngCordova', 'ionic-datepicker', 'leaflet-directive', 'chart.js'])

    .run(function($ionicPlatform, $interval, $cordovaSQLite, $ionicPopup, $timeout, $rootScope, DB, $state, $cordovaLocalNotification, SynchronisationV2) {


        /*while(true)
         {
         $timeout(
         function(){
         console.log("hello");
         }, 3000);
         }*/
        /*$interval( function() {
         $rootScope.$broadcast("success-01");
         }, 3000);*/

        $rootScope.$on('$cordovaLocalNotification:trigger', function(event, notification, state) {
            console.log("notification");
            console.log(JSON.stringify(notification));
            //FOR SYNC !
            if(notification.id == 1)
            {
                console.log("c est une alerte de synchro !");
                var profile = JSON.parse(window.localStorage["profile"] || "{}");
                if(profile.id_db != "undefined")
                {
                    console.log("There is a connected user !");
                    // CHECK IF IT IS A LIVREUR/VENDEUR PROFILE !!
                    if(profile.fonction == "prevendeur" || profile.fonction == "vendeur")
                    {
                        /*SynchronisationV2.syncV2(profile.id_db).then(
                         function(success){
                         console.log(JSON.stringify(success));
                         },
                         function(error){
                         console.log(error);
                         });*/
                    }
                    else if(profile.fonction == "livreur")
                    {

                    }
                    else
                    {
                        //SOMETHING STRANGE !
                    }
                }
                else
                {
                    console.log("No need to do anything !");
                }
            }
        });

        $rootScope.$on('$cordovaLocalNotification:schedule', function(event, notification, state) {
            console.log("notification");
            console.log(JSON.stringify(notification));
        })


        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams)
            {

                /* if((toState.name == "menu.login") && !(typeof(window.localStorage['profile']) == "undefined"))
                 {
                 event.preventDefault();
                 $state.transitionTo("menu.entry");
                 }
                 if((toState == "app.profile") && (typeof(window.localStorage['profile']) == "undefined"))
                 {
                 event.preventDefault();
                 $state.transitionTo("menu.login");
                 }*/

                if(toState.name == "app.prelevement")
                {
                    event.preventDefault();
                    var profile = JSON.parse(window.localStorage["profile"] || "{}");
                    var _vendeur = typeof(profile.fonction) != "undefined" && profile.fonction == "vendeur";
                    $state.transitionTo("app.brands", { vendeur: _vendeur, chargement: false, prelevement: true, retour: false});
                }

                if(toState.name == "app.retour")
                {
                    event.preventDefault();
                    $state.transitionTo("app.brands", { vendeur: true, chargement: false, prelevement: false, retour: true});
                }

                if(toState.name  == "app.echange") {
                    event.preventDefault();
                    $state.transitionTo("app.brands", { vendeur: true, chargement: false, prelevement: false, retour: false, echange: true, input: 1, output: 0 });
                }

                if(toState.name == "app.in") {
                    event.preventDefault();
                    $state.transitionTo("app.brands", { vendeur: true, chargement: false, prelevement: false, retour: false, echange: true, input: 1, output: 0 });
                }

                if(toState.name == "app.cartEchange") {
                    event.preventDefault();
                    $state.transitionTo("app.cart", { echange: true });
                }

                if(toState.name == "app.out") {
                    event.preventDefault();
                    $state.transitionTo("app.brands", { vendeur: true, chargement: false, prelevement: false, retour: false, echange: true, input: 0, output: 1 });
                }


                if(toState.name == "app.in.brand") {
                    event.preventDefault();
                    $state.transitionTo("app.brand", { name: 1, vendeur: true, chargement: false, prelevement: false, retour: false, echange: true, input: 1, output: 0 });
                }

                if(toState.name == "app.out.brand") {
                    event.preventDefault();
                    $state.transitionTo("app.brand", { name: 1, vendeur: true, chargement: false, prelevement: false, retour: false, echange: true, input: 0, output: 1 });
                }

                if(toState.name == "app.stock"){
                    event.preventDefault();
                    console.log("app.stocks");
                    $state.transitionTo("app.stocks", { stockOnly:true});

                }

                if(toState.name == "app.dechargement"){
                    event.preventDefault();
                    console.log("app.dechargement");
                    $state.transitionTo("app.stocks", { stockOnly:false});

                }

            });

        

        $ionicPlatform.registerBackButtonAction(function(){

            

            var popUp = $ionicPopup.show({

                template: '<div style="font-size: 13px;" >Etes-vous sûr de vouloir quitter l\'application ? <br><br> <div style="font-size: 12px;"> <b>N.B</b>: Vos ventes en cours seront sauvegardées jusqu\'à nouvelle connection. </div></div>',

                buttons: [
                    {
                        text: "OUI",
                        type: "button-assertive",
                        cssClass: "assertive-survey",
                        onTap: function (e) {
                            e.preventDefault();
                            popUp.close();
                            navigator.app.exitApp();
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
                title: '<h4>Sortie de l\'application</h4>'
            });

        }, 100);

        
        DB.init();
        $ionicPlatform.ready(function(){


            
           
            
            
            // Cancelling a previous one !!
            $cordovaLocalNotification.cancel(1).then(function (result) {
                console.log(JSON.stringify(result));
            });
            // console.log("hello !");
            $cordovaLocalNotification.schedule({
                id: 2,
                title: 'Synchronisation',
                text: 'La synchronisation se fait à toute heure.',
                every: 'hour'
            }).then(

                function (result) {
                    console.log("DONE !");
                    console.log(JSON.stringify(result));
                },
                function (error) {
                    console.log("NOT DONE");
                    console.log(JSON.stringify(error));
                });


            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

        });





    })


    .config(function (ionicDatePickerProvider) {
        var datePickerObj = {
          inputDate: new Date(),
          setLabel: 'Valider',
          todayLabel: 'Today',
          closeLabel: 'Annuler',
          mondayFirst: false,
          weeksList: ["S", "L", "M", "M", "J", "V", "S"],
          monthsList: ["Jan", "Fév", "Mars", "Avril", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
          templateType: 'popup',
          from: new Date(),
          to: new Date(2033, 8, 1),
          showTodayButton: false,
          dateFormat: 'dd MMMM yyyy',
          closeOnSelect: false,
          disableWeekdays: [6],
        };
        ionicDatePickerProvider.configDatePicker(datePickerObj);
  })

    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.views.transition('android');
        $httpProvider.interceptors.push('httpRequestInterceptor');
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl',
                data : {
                    authentication : true
                }
            })

            .state('menu', {
                url: '/menu',
                abstract: true,
                templateUrl: 'templates/noSideBar.html',
                controller: ''
            })

            .state('reports', {
                url: "/reports",
                abstract: true,
                templateUrl: "templates/reports.html",
                controller: "ReportCtrl"
            })


            .state('app.cartLivreur', {
                url: '/cartLivreur',
                views : {
                    'menuContent': {
                        templateUrl: 'templates/cartLivreur.html',
                        controller: 'CartLivreurCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })

            .state('menu.entry', {
                url: '/entry',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/entry.html',
                        controller: 'EntryCtrl'
                    }
                },
                resolve : {
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                }
            })

            .state('menu.entry2', {
                url: '/entry2',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/entryLivreur.html',
                        controller: 'EntryCtrlLivreur'
                    }
                }
            })

            .state('menu.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('app.missions', {
                url: '/missions',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/missions.html',
                        controller: 'MissionsCtrl'
                    },
                    'fabContent': {
                        template: '<button style="background-color: #B71C1C;" id="fab-missions" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-missions').classList.toggle('on');
                            }, 200);
                        }
                    }
                }
            })

            .state('app.echanges', {
                url: '/echanges',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/echanges.html',
                        controller: 'EchangesCtrl'
                    }
                }
            })

            .state('app.clients', {
                url: '/clients',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/clients.html',
                        controller: 'ClientsCtrl'
                    }
                },
                resolve : {
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                }
            })

            .state('app.products', {
                url: '/products',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/products.html',
                        controller: 'ProductsCtrl'
                    },
                    'fabContent': {
                        template: '<button ng-click="test()" ui-sref="app.profile" style="background-color: #B71C1C;" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-arrow-swap"></i></button>',
                        controller: 'ProfileCtrl'
                    }}
            })

            .state('app.remainings', {
                url: '/remainings',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/remaining.html',
                        controller: 'RemainingCtrl'
                    }
                }
                ,
                resolve : {
                    position : function(CallSteps){
                        return CallSteps.checkForSteps("app.remainings");
                    },
                    total : function(CartUtilities){
                        return CartUtilities.totalCart(true, false, true);
                    },
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                }
            })


            .state('app.conflicts', {
                url: '/conflicts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/exclusions.html',
                        controller: 'ExclusionsCtrl'
                    },
                    'fabContent': {
                        template: '',
                    }}
            })

            .state('app.promotions', {
                url : "/promotions",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/promotions.html',
                        controller: 'PromotionsCtrl'
                    }
                }
            })

            .state('app.promotion', {
                url : "/promotions/:name/:url",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/promotion.html',
                        controller: 'PromotionCtrl'
                    }
                }
            })

            .state('menu.configuration', {
                url : "/configurations",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/configuration.html',
                        controller: 'ConfigurationCtrl'
                    }
                }
            })

            .state('app.chargements', {
                url : "/chargements",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/chargement.html',
                        controller: 'ChargementReportsCtrl'
                    }/*,
                    'fabContent': {
                        template: '<button ng-click="print()" style="background-color: rgba(183, 28, 28, 0.57);" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-android-print"></i></button>'
                    }*/
                }
            })

            .state('app.stocks', {
                url : "/stocks/:stockOnly",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/stock.html',
                        controller: 'StockReportsCtrl'
                    }/*,
                    'fabContent': {
                        template: '<button ng-click="print()" style="background-color: rgba(183, 28, 28, 0.57);" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-android-print"></i></button>'
                    }*/
                }
            })

            .state('app.ventes', {
                url : "/ventes",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/ventes.html',
                        controller: 'VentesReportsCtrl'
                    }/*,
                    'fabContent': {
                        template: '<button ng-click="print()" style="background-color: rgba(183, 28, 28, 0.57);" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-android-print"></i></button>'
                    }*/
                }
            })




            .state('app.brandfive', {
                url : "/brandfive",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/brandFive.html',
                        controller: 'BrandFiveCtrl'
                    }
                },
                resolve : {
                    position : function(CallSteps){
                        return CallSteps.checkForSteps("app.brandfive");
                    },
                    total : function(CartUtilities){
                        return CartUtilities.totalCart(true, false, true);
                    },
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                }
            })

            .state('app.brands', {
                url : "/brands/:vendeur/:chargement/:prelevement/:retour/:echange/:input/:output",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/brands.html',
                        controller: 'BrandsCtrl'
                    }
                }
                ,resolve : {
                    position : function(CallSteps){
                        return CallSteps.checkForSteps("app.brands");
                    },
                    total : function(CartUtilities, $stateParams){
                        var echange = typeof($stateParams.echange) != "undefined" && $stateParams.echange == "true" ? true : false;
                        if(echange) {
                            return CartUtilities.totalEchange();
                        } else {
                            return CartUtilities.totalCart(true, false, true);
                        }
                        
                    },
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                }
            })

            .state('app.add', {
                url : "/add",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/add.html',
                        controller: 'AddCtrl'
                    }
                }

            })

            .state('app.entry', {
                url : "/entry",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/entry.html',
                        controller: 'EntryCtrl'
                    }
                }
            })

            .state('app.cart', {
                url : "/cart/:echange",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/cart.html',
                        controller: 'CartCtrl'
                    }
                },
                resolve : {
                    position : function(CallSteps){
                        return CallSteps.checkForSteps("app.cart");
                    },
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                }
            })

            .state('app.brand', {
                url : "/brand/:name/:vendeur/:chargement/:prelevement/:retour/:echange/:input/:output",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/brand.html',
                        controller: 'BrandCtrl'
                    }
                },
                resolve : {
                    total : function(CartUtilities){
                        return CartUtilities.totalCart(true, false, true);
                    },
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                }
            })


            .state('app.remainingBrand', {
                url : "/remaining/:sbd/:promotion/:id",
                views : {
                    'menuContent': {
                        templateUrl: 'templates/reste.html',
                        controller: 'ResteCtrl'
                    }
                },
                resolve : {
                    total : function(CartUtilities){
                        return CartUtilities.totalCart(true, false, true);
                    },
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                }
            })


            // WORKAROUNDS NO MORE !
            .state('app.in', {

            })
            .state('app.out', {

            })
            .state('app.echange', {

            })
            .state('app.prelevement', {

            })
            .state('app.retour', {

            })
            .state('app.dechargement',{

            })
            .state('app.stock',{

            })
            .state('app.cartEchange',{

            })
            

            /////////////////////////

            .state('app.profile', {
                url: '/profile',
                resolve : {
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl'
                    }/*,
                    'fabContent': {
                        template: '<button ui-sref="menu.entry" style="background-color: #B71C1C;" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-home"></i></button>',
                        controller: 'ProfileCtrl'
                    }*/
                }

            })

            .state('app.profile2', {
                url: '/profile2',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/profile2.html',
                        controller: 'Profile2Ctrl'
                    }/*,
                    'fabContent': {
                        template: '<button ui-sref="menu.entry2" style="background-color: #B71C1C;" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-home"></i></button>',
                        controller: 'Profile2Ctrl'
                    }*/
                }

            })

            .state('app.survey', {
                url: '/survey',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/survey.html',
                        controller: 'SurveyCtrl'
                    }
                },
                resolve : {
                    position : function(CallSteps){
                        return CallSteps.checkForSteps("app.survey");
                    },
                    total : function(CartUtilities){
                        return CartUtilities.totalCart(true, false, true);
                    },
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                }
            })

            .state('app.routes',{
                url : '/routes',
                resolve : {
                    todayMissions : function(Missions){
                        return Missions.getTodaysMissions(JSON.parse(window.localStorage['profile']).id_db);
                    }
                },
                views : {
                    'menuContent' : {
                        templateUrl : 'templates/routes.html',
                        controller : 'RoutesCtrl'
                    }
                }
            })

            .state('app.client', {
                url: '/clients/:id',
                resolve : {
                    checkPoint : function(CallSteps){
                        return CallSteps.checkPoint();
                    },
                    ca : function(Commandes){
                        return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                    }
                },
                views : {
                    'menuContent': {
                        templateUrl: 'templates/client.html',
                        controller: 'ClientCtrl'
                    }
                }
            }).state('app.analyse', {
            url: '/analyse',
            views : {
                'menuContent': {
                    templateUrl: 'templates/analyseVente.html',
                    controller: 'AnalyseCtrl'
                }
            },
            resolve : {
                position : function(CallSteps){
                    return CallSteps.checkForSteps("app.analyse");
                },
                ca : function(Commandes){
                    return Commandes.getCAVendeur(JSON.parse(window.localStorage['profile']).id_db);
                }
            }
        });

        //$urlRouterProvider.otherwise('/menu/login');
        $urlRouterProvider.otherwise( function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("menu.login");
        });
    });
