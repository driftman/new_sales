//By Rajeshwar Patlolla - rajeshwar.patlolla@gmail.com
//https://github.com/rajeshwarpatlolla

(function(){
  'use strict';

  angular.module('ionic-datepicker')
    .service('IonicDatepickerService',IonicDatepickerService);

  IonicDatepickerService.$inject = [];
  function IonicDatepickerService(){
    var currentDate = new Date();
    this.monthsList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    this.yearsList = [2015, 2016, 2017];
    for(var i = currentDate.getFullYear() ; i < currentDate.getFullYear() + 10 ; i++)
    {
      this.yearsList.push(i);
    }

  }

})();