app.controller("EchangesCtrl", function(EchangeService, $state, $scope, $ionicPopup){

	$scope.title = "ECHANGES";
	$scope.echanges = [];

	EchangeService.getAll().then(
		function(echanges){
			console.log(echanges);
			angular.forEach(echanges, function(echange){
				var date = new Date(echange.date_start);
                echange.day = date.getDate();
                echange.month = date.getMonth() + 1;
				$scope.echanges.push(echange);
			});
		}, 
		function(error){
			console.error(error);
		});

	$scope.prompt = function(nom, prenom, print_content) {

		var prompt = $ionicPopup.alert(
                {
                    title: "<h4> Réimpression de l'échange de " + nom + " " + prenom + "</h4>",
                    template: 'Etes-vous sûr de vouloir réimprimer la commande ?',
                    buttons: [
                        {
                            text: "oui",
                            type: "button-assertive",
                            cssClass: "assertive-survey",
                            onTap: function (e) {
                                e.preventDefault();
                                print(print_content || "NA");
                                prompt.close();
                            }
                        },

                        {
                            text: "non",
                            type: "button-assertive",
                            cssClass: "assertive-survey",
                            onTap: function (e) {
                            }
                        }
                    ]
                });

	};


	function print(print_content) {
		console.log(print_content);
		cordova.exec(
        function (success) {
            console.log("print success");
        },
        function (fail) {
            console.log("print error");
            console.log(fail);
        },
        "ZebraBluetoothPrinter",
        "zebra",
        [print_content]);
	}
});