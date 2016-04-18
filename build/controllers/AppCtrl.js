app.controller('AppCtrl', function ($state, $scope, $ionicModal, $ionicPopover, $timeout, $rootScope, $ionicLoading) {
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
        $scope.goProfile = function () {
            if (profile.fonction == 'livreur') {
                $state.go("app.profile2");
            }
            else if (profile.fonction == 'prevendeur' || 'vendeur') {
                $state.go("app.profile");
            }
            else {
                console.log("R.A.S");
            }
        };
        $scope.test = function () {
            window.open('img/test.pdf', '_blank', 'location=yes');
        };
        $scope.logout = function () {
            $ionicLoading.show({
                template: 'Deconnexion en cours ...'
            });
            $timeout(
                function () {
                    window.localStorage.clear();
                    $state.transitionTo("menu.login");
                    $ionicLoading.hide();
                }, 2000);

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
    })

    