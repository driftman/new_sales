app.controller('SurveyCtrl', function ($scope, $timeout, total, position, CartUtilities, Surveys, $state, $ionicPopup, ca, $filter) {

        $scope.ca = ca.ca;
        var infos = $scope.infos = JSON.parse(window.localStorage["profile"] || "{}");
        $scope.objStr = 'C.A:  ' + $filter('number')($scope.ca || 0, 2) + ' / ' + ($scope.infos.objectifCA ? ($fiter('number')($scope.infos.objectifCA)) + " DHS" : "NA") + " | " + "G.P: " + $scope.infos.golden_points + " / " + ($scope.infos.objectifGP ? $scope.infos.objectifGP + " pts" : "NA");

        // TOTAL INITIALIZATION TO 0 !
        $scope.total = total;

        //cartInitialization();

        function cartInitialization() {
            CartUtilities.totalCart(true, false, true)
                .then(function (total) {
                    $scope.total = total;
                });
        }

        $scope.$parent.clearFabs();
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;
        /*$timeout(function()
         {
         $scope.$parent.showHeader();
         }, 500);*/
        $scope.isExpanded = true;


        /*******************************PROPER TO CALL STEPS*********************************/
        $scope.hasNext = position.hasNext;
        $scope.hasPrevious = position.hasPrevious;
        $scope.next = function () {
            console.log($scope.surveys);
            var surveys = angular.copy($scope.surveys);
            var remainings = false;
            for (var i = 0; i < surveys.length; i++) {

                if (surveys[i].required == true && surveys[i].choosen === "") {
                    remainings = true;
                }
            }
            if (remainings && !JSON.parse(window.localStorage['surveys'] || "{}").done) {
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
            else if (JSON.parse(window.localStorage['surveys']).done) {
                if (position.hasNext) {
                    if (position.nextStep.name == "app.brands") {
                        var profile = JSON.parse(window.localStorage['profile'] || "{}");
                        var isVendeur = profile.fonction == "vendeur";
                        console.log("going to : ");
                        console.log({vendeur: isVendeur, chargement: false, prelevement: false, retour: false});
                        $state.go("app.brands", {
                            vendeur: isVendeur,
                            chargement: false,
                            prelevement: false,
                            retour: false
                        });

                    }
                    else {
                        $state.go(position.nextStep.name);
                    }
                }
                else {
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
            else {
                console.log("About to add them to local DB !");
                if (surveys.length == 0) {
                    if ($scope.hasNext) {
                        console.log("hasNext!");
                        $state.transitionTo(position.nextStep.name, {vendeur: true, chargement: false});
                    }
                    else {
                        console.log("!hasNext");
                        var keys = Object.keys(window.localStorage);
                        for (var i = 0; i < keys.length; i++) {
                            if (keys[i] != "profile") {
                                window.localStorage.removeItem(keys[i]);
                            }
                        }
                        $state.transitionTo("app.profile");
                    }
                }
                Surveys.addSurveyClientAnswers(surveys, JSON.parse(window.localStorage['mission']).client_id).then(
                    function (success) {
                        window.localStorage['surveys'] = JSON.stringify({done: true, surveys: surveys});
                        var popUp = $ionicPopup.alert({
                            title: "Terminé !",
                            buttons: [
                                {
                                    text: position.hasNext ? "étape suivante" : "OK",
                                    onTap: function (event) {
                                        if (position.hasNext) {
                                            if (position.nextStep.name == "app.brands") {
                                                var profile = JSON.parse(window.localStorage['profile'] || "{}");
                                                var isVendeur = profile.fonction == "vendeur";
                                                console.log("going to : ");
                                                console.log({
                                                    vendeur: isVendeur,
                                                    chargement: false,
                                                    prelevement: false,
                                                    retour: false
                                                });
                                                $state.go("app.brands", {
                                                    vendeur: isVendeur,
                                                    chargement: false,
                                                    prelevement: false,
                                                    retour: false
                                                });

                                            }
                                            else {
                                                $state.go(position.nextStep.name);
                                            }
                                        }
                                        else {
                                            popUp.close();
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
                                    type: "button-assertive",
                                }
                            ],
                            template: '<span style="font-size: 12px; font-weight: 600;">Le questionnaire à bien été enregistré !</span>'
                        });


                    },
                    function (error) {
                        console.log(error);
                    });
            }
            //$state.transitionTo(position.nextStep.name);
        };
        $scope.previous = function () {
            if (position.previousStep.name == "app.brands") {
                var profile = JSON.parse(window.localStorage['profile'] || "{}");
                var isVendeur = profile.fonction == "vendeur";
                $state.transitionTo(position.previousStep.name, {
                    vendeur: isVendeur,
                    chargement: false,
                    prelevement: false
                });
            }
            else {
                $state.transitionTo(position.previousStep.name);
            }

        };
        /*******************************--------------------*********************************/
        $scope.surveys = [];
        var surveys = JSON.parse(window.localStorage['surveys'] || '{}');


        /*if(surveys.surveys.length == 0)
         {
         $state.go("app.profile")
         }*/


        if (surveys.surveys.length > 0) {
            console.log("HERE !")
            angular.forEach(surveys.surveys, function (survey, index) {
                switch (survey.type) {
                    case(1):
                        survey.choosen = true;
                        break;
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
        }

        $scope.clicked = function () {
            console.log($scope.surveys);
        };
        $scope.changed = function ($index) {
            console.log($index);
        };
    })

    