// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', 
    ['ionic', 'starter.controllers', 'starter.services', 'ionic-material', 'ionMdInput','ngCordova',  'leaflet-directive', 'chart.js'])

.run(function($ionicPlatform, $cordovaSQLite, $timeout, DB) {

    
    $ionicPlatform.ready(function(){
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        
    });
    DB.init();

          
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

     .state('menu', {
        url: '/menu',
        abstract: true,
        templateUrl: 'templates/noSideBar.html',
        controller: 'AppCtrl'
    })

     .state('menu.entry', {
        url: '/entry',
        views: {
            'menuContent': {
                templateUrl: 'templates/entry.html',
                controller: 'EntryCtrl'
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

    .state('app.clients', {
        url: '/clients',
        views: {
            'menuContent': {
                templateUrl: 'templates/clients.html',
                controller: 'ClientsCtrl'
            },
            'fabContent': {
                template: '<button ui-sref="app.add" style="background-color: #B71C1C;" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-person-add"></i></button>',
                controller: 'ClientsCtrl'
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
            },
            'fabContent': {
                template: '',
        }}
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
            },
            'fabContent': {
                template: '<button ui-sref="app.profile" style="background-color: #B71C1C;" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-home"></i></button>'
            }
        }
    })

    .state('app.promotion', {
        url : "/promotions/:name/:url",
        views : {
            'menuContent': {
                templateUrl: 'templates/promotion.html',
                controller: 'PromotionCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.brandfive', {
        url : "/brandfive",
        views : {
            'menuContent': {
                templateUrl: 'templates/brandFive.html',
                controller: 'BrandFiveCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.brands', {
        url : "/brands/:mission",
        views : {
            'menuContent': {
                templateUrl: 'templates/brands.html',
                controller: 'BrandsCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.add', {
        url : "/add",
        views : {
            'menuContent': {
                templateUrl: 'templates/add.html',
                controller: 'AddCtrl'
            },
            'fabContent': {
                template: '<button ui-sref="app.entry" style="background-color: #B71C1C;" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-home"></i></button>',
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
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.cart', {
        url : "/cart",
        views : {
            'menuContent': {
                templateUrl: 'templates/cart.html',
                controller: 'CartCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.brand', {
        url : "/brands/:mission/:name",
        views : {
            'menuContent': {
                templateUrl: 'templates/brand.html',
                controller: 'BrandCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button ui-sref="menu.entry" style="background-color: #B71C1C;" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-home"></i></button>',
                controller: 'ProfileCtrl'
                }
            }
        
    })

    .state('app.routes',{
        url : '/routes',
        views : {
            'menuContent' : {
                templateUrl : 'templates/routes.html',
                controller : 'RoutesCtrl'
            },
            'fabContent' :  {
                template: '<button ui-sref="menu.entry" style="background-color: #B71C1C;" id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-home"></i></button>',
                controller: 'RoutesCtrl'
            }
        }
    })

    .state('app.client', {
        url: '/clients/:id',
        views : {
            'menuContent': {
                templateUrl: 'templates/client.html',
                controller: 'ClientCtrl'
                }
            },
            'fabContent': {
                template: '',
                controller: ''
            }
        });

/*.state('app.forgot-password', {
        url: '/forgot-password',
        views : {
            'menuContent': {
                templateUrl: 'templates/password_forgot.html',
                controller: 'ClientCtrl'
                }
            },
            'fabContent': {
                template: ''
            }
        });*/

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/menu/login');
});
