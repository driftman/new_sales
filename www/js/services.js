

/*


{
  "alwan": 
"caCustomisationDTO": {
"duree": 54,
"dureeIn": "month",
"total": "TTC",
"remise": true
},
"pieChartCustomisationDTO": {
"duree": 93,
"dureeIn": "day", "month"
"type": "distinct", "visites"
},
"brandFiveCustomisationDTO": {
"duree": 88,
"dureeIn": "month", "day"
"objectif": "client", "CA"
"ca": false,
"gp": true,
"gs": true
}
}

*/
/*myapp

myapp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});
455
*/
var DB_CONFIG = { 
    name : "new_sales455",
    tables : 
    [
      {
        name : "clients",
        check_url : "http://197.230.28.154:81/newsales/rest/vendor/roads/check",
        synchronize_url : "http://197.230.28.154:81/newsales/rest/roads/sync/",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique not null" },
          { name : "code_client", value : "text" },
          { name : "address" , value : "text" },
          { name : "lat" , value : "long" },
          { name : "lng" , value : "long" },
          { name : "nom", value : "text not null" },
          { name : "prenom", value : "text" },
          { name : "email", value : "text"},
          { name : "golden_store", value : "long"},
          { name : "chiffreAffaire", value : "long"},
          { name : "classe", value : "text"},
          { name : "route", value : "integer"},
          { name : "timestamp", value : "long not null"}
                   ]
      },

      {
        name: "groupes_sbd",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique not null" },
          { name : "qte_min", value : "integer not null" },
          { name : "classe", value : "text"}
                  ]
      },

      {
        name: "plan_tarifaire",
        columns : [
          { name : "id", value : "integer unique not null"},
          { name : "startDate", value: "date not null"},
          { name : "endDate", value : "date not null"},
          { name : "actif", value : "long not null"},
          { name : "itemId", value : "integer not null"},
          { name : "prixArticle", value : "double not null"},
          { name : "FOREIGN KEY(itemId)", value : "REFERENCES articles(id_db)"}

                  ]
      },

      {
        name: "chargement_vendeur",
        columns : [
          { name : "id", value : "integer primary key autoincrement" },
          { name : "item_id", value : "integer not null" },
          { name : "packet", value : "integer" },
          { name : "unit", value : "integer" },
          { name : "vendeur_id", value : "integer not null" },
          { name : "date", value : "date not null"}
        ]
      },

      {
        name: "quota_vendeur",
        columns: [
          { name : "id", value : "integer primary key" },
          { name : "itemId", value : "integer not null"},
          { name : "qty", value : "long"},
          { name : "value", value: "double"},
          { name : "debut", value: "date"},
          { name : "fin", value: "date"},
          { name : "FOREIGN KEY(itemId)", value: "REFERENCES articles(id_db)"}
                 ]
      },


      {
        name: "stock",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "packet", value : "long not null" },
          { name : "unit", value : "long not null"},
          { name : "item", value : "long not null"},
          { name : "employee_id", value : "long not null"},
          { name : "client_id", value : "long not null"},
          { name : "FOREIGN KEY(item)", value : "REFERENCES articles(id_db)"}
                  ]
      },

      {
        name: "surveys",
        columns : [
          { name : "id", value : "integer primary key autoincrement"},
          { name : "question", value : "text not null"},
          { name : "answers", value : "text not null"},
          { name : "required", value : "boolean"},
          { name : "activity", value : "text"},
          { name : "type", value : "long"}
                  ]
      },

      {
        name: "survey_client",
        columns: [
          
            {name: "id", value: "integer primary key autoincrement"},
            {name: "client_id", value: "integer not null"},
            {name: "survey_id", value:"integer not null"},
            {name: "answer", value: "text not null"},
            { name : "FOREIGN KEY(client_id)", value : "REFERENCES clients(id_db)"},
            { name : "FOREIGN KEY(survey_id)", value : "REFERENCES surveys(id)"}
          
                 ]
      },

      {
        name : "mode_paiements",
        columns : [
            { name : "id", value : "integet primary key not null"},
            { name : "name", value : "text not null"},
            { name : "description", value : "text not null"}
                  ]
      },

      {
        name : "remise_mode_paiement",
        columns : [
            { name : "id", value : "integer primary key not null"},
            { name : "id_mode_paiement", value : "integer not null"},
            { name : "name", value : "text not null"},
            { name : "pourcentage", value : "long not null"},
            { name : "minPeriod", value : "integer not null"},
            { name : "maxPeriod", value : "integer not null"}
        ]
      },

      {
        name: "articles",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique not null" },
          { name : "code" , value : "text unique not null" },
          { name : "nomArticle", value : "text not null" },
          { name : "prixVente", value : "long not null" },
          { name : "tva", value : "long not null" },
          { name : "uniteMesure", value : "text not null"},
          { name : "uniteMesure2", value : "text not null"},
          { name : "marqueArticle", value : "long not null"},
          { name : "sousMarqueArticle", value : "long not null"},
          { name : "unitConversion", value : "long not null"},
          { name : "remise", value : "boolean"},
          { name : "logo", value : "text"},
          { name : "timestamp", value : "long not null"}
                  ]
      },

      {
        name: "call_steps",
        columns: [
          { name : "id", value : "integer primary key autoincrement"},
          { name : "title", value : "string not null"},
          { name : "name", value : "string not null"},
          { name : "rank", value : "integer not null"}
                 ]
      },


      {
        name: "routes",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique not null" },
          { name : "code", value : "text not null" },
          { name : "nom", value : "text not null"},
          { name : "desactive", value : "long not null" },
          { name : "vendeur", value : "integer not null"},
          { name : "timestamp", value : "long not null"}
                  ]
      },

      {
        name: "marque",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "marqueArticle" , value : "text" },
          { name : "logo" , value : "text" }
                  ]
      },

      {
        name: "article_sbd",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_groupe_sbd", value : "integer not null" },
          { name : "id_article", value : "long not null" },
          { name : "FOREIGN KEY(id_article)", value : "REFERENCES articles(id_db)"},
          { name : "FOREIGN KEY(id_groupe_sbd)", value : "REFERENCES groupes_sbd(id_db)"},
                  ]
      },

      {
        name: "brand_five",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique not null" },
          { name : "code_marque", value : "text not null" },
          { name : "name", value : "text not null" },
           { name : "five", value : "boolean" }
                  ]
      },

      {
        name: "sousmarques",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique not null" },
          { name : "code_sousmission", value : "text not null" },
          { name : "description" , value : "text not null" }
                  ]
      },

      {
        name: "new_clients",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "nom", value : "text not null" },
          { name : "prenom" , value : "text not null" },
          { name : "adresse1", value : "text not null" },
          { name : "adresse2" , value : "text not null" },
          { name : "telephone", value : "text not null" },
          { name : "categorie" , value : "text not null" },
          { name : "lat" , value : "long not null" },
          { name : "lng" , value : "long not null" },
          { name : "route", value : "long not null" },
          { name : "timestamp", value : "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" }
                  ]
      },

      {
        name: "missions",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique" },
          { name : "code_mission", value : "text" },
          { name : "client_id" , value : "integer" },
          { name : "route_id", value : "integer"},
          { name : "date_start" , value : "date not null" },
          { name : "date_max" , value : "long" },
          { name : "finished", value : "boolean"},
          { name : "commande_id", value : "integer"},
          { name : "problem", value : "boolean"},
          { name : "problemDescription", value : "text"},
          { name : "state", value : "boolean" },
          { name : "local", value : "integer default 0"},
          { name : "synced", value : "boolean"},
          { name : "livreur", value : "long"},
          { name : "entryDate", value : "long"},
          { name : "exitDate", value : "long"},
          { name : "timestamp", value : "long not null default 0"},
          { name : "FOREIGN KEY(client_id)", value : "REFERENCES clients(id_db)"},
          { name : "FOREIGN KEY(route_id)", value : "REFERENCES routes(id_db)"},
          { name : "FOREIGN KEY(commande_id)", value : "REFERENCES commandes(id)"}
                  ]
      },

      {
        name: "missions_livreur",
        columns : [
          { name : "id_db" , value : "integer unique primary key not null" },
          { name : "code_mission", value : "text" },
          { name : "client_id" , value : "integer" },
          { name : "finished", value : "boolean"},
          { name : "commande_id", value : "integer"},
          { name : "problem", value : "boolean"},
          { name : "problemDescription", value : "text"},
          { name : "state", value : "boolean" },
          { name : "synced", value : "boolean"},
          { name : "livreur", value : "long"},
          { name : "timestamp", value : "long not null"},
          { name : "FOREIGN KEY(client_id)", value : "REFERENCES clients(id_db)"},
          { name : "FOREIGN KEY(commande_id)", value : "REFERENCES commandes_livreur(id_db)"}
                  ]
      },

      {
        name : "commandes",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer" },
          { name : "code_commande", value : "text unique not null" },
          { name : "id_mission", value : "integer unique not null"},
          { name : "id_client", value : "integer not null"},
          { name: "promotions", value : "text"},
          { name : "paymentId", value : "integer"},
          { name : "paymentDate", value : "double"},
          { name : "remise", value : "long"},
          { name : "sbd", value : "integer"},
          { name : "FOREIGN KEY(id_mission)", value : "REFERENCES missions(id)"},
          { name : "FOREIGN KEY(id_client)", value : "REFERENCES clients(id_db)"},
                  ]
      },

      {
        name : "commandes_livreur",
        columns : [
          { name : "id_db" , value : "integer primary key" },
          { name : "code_commande", value : "text not null" },
          { name : "id_mission", value : "integer not null"},
          { name : "id_client", value : "integer not null"},
          { name: "promotions", value : "text"},
          { name : "sbd", value : "integer"},
          { name : "FOREIGN KEY(id_mission)", value : "REFERENCES missions_livreur(id_db)"},
          { name : "FOREIGN KEY(id_client)", value : "REFERENCES clients(id_db)"},
                  ]
      },

      {
        name : "ligneCommandes",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_commande" , value : "integer not null" },
          { name : "id_article", value : "integer not null" },
          { name : "packet", value : "integer not null"},
          { name : "unit", value : "integer not null"},
          { name : "pu_ht", value : "long not null"},
          { name : "remise", value: "double"},
          { name : "isGift", value: "boolean"},
          { name : "FOREIGN KEY(id_commande)", value : "REFERENCES commandes(id)"},
          { name : "FOREIGN KEY(id_article)", value : "REFERENCES articles(id)"}
                  ]
      },


      {
        name : "ligneCommandes_livreur",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_commande" , value : "integer not null" },
          { name : "id_article", value : "integer not null" },
          { name : "packet", value : "integer not null"},
          { name : "unit", value : "integer not null"},
          { name : "pu_ht", value : "long not null"},
          { name : "remise", value: "double"},
          { name : "isGift", value: "boolean"},
          { name : "idLigne", value : "long"},
          { name : "FOREIGN KEY(id_commande)", value : "REFERENCES commandes(id)"},
          { name : "FOREIGN KEY(id_article)", value : "REFERENCES articles(id)"}
                  ]
      },



       {
        name : "promotions",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique not null" },
          { name : "qte" , value : "integer" },
          { name : "ca" , value : "long" },
          { name : "max_steps", value : "integer" },
          { name : "cummulable" , value : "boolean" }, 
          { name : "type", value : "text not null"},
          { name : "starts_at", value : "long not null"},
          { name : "ends_at", value : "long not null"},
          { name : "activated", value : "boolean not null"},
          { name : "conditionning_unit", value : "text"},
          { name : "melange", value : "boolean"}
                  ]
        },

        {
          name : "promotion_palier",
          columns : [
            { name : "id" , value : "integer primary key autoincrement" },
            { name : "id_promotion" , value : "integer not null" },
            { name : "montant", value: "double" },
            { name : "remise", value: "double" },
            { name : "qte", value: "integer" },
            { name : "cummulable", value: "integer" },
            { name : "max", value: "integer" }
                    ]
        },


       {
        name : "promotion_client",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "promotion_id" , value : "integer" },
          { name : "client_id" , value : "integer" },
          { name : "FOREIGN KEY(promotion_id)", value : "REFERENCES promotions(id_db)"},
          { name : "FOREIGN KEY(client_id)", value : "REFERENCES clients(id_db)"},
                  ]
      },


      {
        name : "promotion_article",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "promotion_id" , value : "integer not null" },
          { name : "article_id" , value : "integer not null" },
          { name : "qty" , value : "integer" },
          { name : "conditionning_unit" , value : "text" },
          { name : "FOREIGN KEY(promotion_id)", value : "REFERENCES promotions(id_db)"},
          { name : "FOREIGN KEY(article_id)", value : "REFERENCES articles(id_db)"},
                  ]
      },


      {
        name : "promotion_gratuite",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "promotion_id" , value : "integer" },
          { name : "remise" , value : "integer" },
          { name : "priorite", value : "integer"},
          { name : "FOREIGN KEY(promotion_id)", value : "REFERENCES promotions(id_db)"}
                  ]
      },

      {
        name : "gratuite_article",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "promotion_gratuite_id" , value : "integer" },
          { name : "article_id" , value : "integer" },
          { name : "qte", value : "integer" },
          { name : "groupe", value : "integer"},
          { name : "FOREIGN KEY(promotion_gratuite_id)", value : "REFERENCES promotion_gratuite(id)"},
          { name : "FOREIGN KEY(article_id)", value : "REFERENCES articles(id_db)"}
                  ]
      },

      {
        name : "promotion_inclusion",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "promotion_primary" , value : "integer" },
          { name : "promotion_secondary" , value : "integer" },
          { name : "FOREIGN KEY(promotion_primary)", value : "REFERENCES promotions(id_db)"},
          { name : "FOREIGN KEY(promotion_secondary)", value : "REFERENCES promotions(id_db)"},
                  ]
      },

       {
        name : "promotion_exclusion",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "promotion_primary" , value : "integer" },
          { name : "promotion_secondary" , value : "integer" },
          { name : "FOREIGN KEY(promotion_primary)", value : "REFERENCES promotions(id_db)"},
          { name : "FOREIGN KEY(promotion_secondary)", value : "REFERENCES promotions(id_db)"},
                  ]
      },

      {
        name : "spec_article",
        columns : [
          { name : "id", value : "integer primary key autoincrement"},
          { name : "promotion_id", value : "integer not null"},
          { name : "qte", value : "integer not null"},
          { name : "article_id", value : "integer not null"},
          { name : "FOREIGN KEY(article_id)", value : "REFERENCES promotions(id_db)"}
                  ]
      },

      {
        name : "accounts",
        columns : [
          { name : "id" , value : "integer primary key autoincrement " },
          { name : "id_db" , value : "integer unique not null" },
          { name : "token", value : "string not null"},
          { name : "username" , value : "text unique not null " },
          { name : "password" , value : "text not null " },
          { name : "first_login" , value : "boolean not null "},
          { name : "question_secrete" , value : "text not null"},
          { name : "reponse_secrete" , value : "text not null"},
          { name : "bloque", value : "boolean not null"},
          { name : "golden_points", value : "long"},
          { name : "golden_stores", value : "long"},
          { name : "fonction", value : "text"},
          { name : "activite", value : "long not null"}
        ]
      },

      {
        name : "profiles",
        columns : [
          { name : "id", value : "integer primary key autoincrement" },
          { name : "id_account", value : "integer not null" },
          { name : "name", value : "string not null" },
          { name : "second_name", value : "string not null" },
          { name : "address", value : "string" },
          { name : "email_address", value : "string" },
          { name : "phone_number", value : "string" },
          { name : "FOREIGN KEY(id_account)", value : "REFERENCES accounts(id)"}
        ]
      }
        
    ]
    
  };

angular.module('starter.services', ['ngCordova'])

.filter('backgroundSBD', function(Articles, SBD){
  return function(input, isVendeur, prelevement, retour){
    prelevement = (typeof(prelevement) != "undefined") && (prelevement == true);

    if(!prelevement && !retour)
    {
      if(input.quotaQTY > 0 || input.quotaVALUE > 0)
      {
        if(Articles.outOfQuota(input) || ( isVendeur && Articles.outOfStock(input) ) )
        {
          return "#FFCDD2";
        }
        else
        {
          if(input.groupeSBD != null && !SBD.sbdConsumed(input.groupeSBD))
          {
            return '#90CAF9';
          }
          else
          {
            return 'transparent';
          }
        }
      }
      else
      {
        if(typeof(input.groupeSBD) != "undefined" && input.groupeSBD != null && input.groupeSBD != "" && !SBD.sbdConsumed(input.groupeSBD))
        {
          return '#90CAF9';
        }
        else
        {
          return 'transparent';
        }
      }
    }
    else
    {
      return 'transparent';
    }

  };
})

.filter('surveyFilter', function(){
  return function(surveys, type){
    var finalSurveys = [];
    for(var i = 0 ; i < surveys.length ; i++)
    {
      if(surveys[i].type == type)
      {
        finalSurveys.push(surveys[i]);
      }
    }
    return finalSurveys;
  };
})



.filter('fontWeightSBD', function(){
  return function(input){

    if(input.groupeSBD != null && input.done == false)
    {
      return 900;
    }
    else if(input.groupeSBD != null && input.done == true)
    {
      return 900;
    }
    else
    {
      return 600;
    }

  };
})

.filter('promotionConsumed', function(){
  return function(promotions){

    if(typeof(promotions) != "undefined" && promotions != null && promotions.length > 0 )
    {

      var promotionsMemory = JSON.parse(window.localStorage['promotions'] || '[]');

      var found = false;

      for(var i = 0, _len = promotions.length; i < _len ; i++)
      {
        var _loopExit = false;

        var promotionId = promotions[i];

        for(var j = 0, len = promotionsMemory.length ; j < len ; j++)
        {
          var promotionMemoryId = promotionsMemory[j].id;

          if(promotionId == promotionMemoryId && promotionsMemory[j].consumed)
          {
            _loopExit = true;
            found = true;
            break;
          }
        }

        if(_loopExit)
        {
          break;
        }
        else
        {
          continue;
        }

      }
      if(found)
      {
        return "green;"
      }
      else
      {
        return "red";
      }

    }
    else
    {
      return "red";
    }
    
  };
})

.filter('quota', function(){
  return function(article){
    if(article.quotaQTY != 0 || article.quotaVALUE != 0)
    {
      if(article.quotaQTY != 0)
      {
        return article.quotaQTY;
      }
      else
      {
        if(article.uniteMesure == "CS")
        {
          return Math.trunc(article.quotaVALUE / article.prixVente);
        }
        else
        {
          return Math.trunc( (article.quotaVALUE / article.prixVente ) /  article.unitConversion );
        }
        
      }
    }
    else
    {
      return "-";
    }
  };
})



.filter('flag', function(){
  return function(state){
    switch(state)
    {
      case 0 :
        return "red";
        break;
      case 1 :
        return "green";
        break;
      case 2 :
        return "orange";
        break;
      default:
        return "red";
        break;
    }
  };
})

.factory('DB', function($q){
  var db = null;


    function query(sql_query, bindings){
      var deferred = $q.defer();
      var bindings = (typeof bindings === "undefined") ? [] : bindings;
      db.transaction(function(transaction){ transaction.executeSql(
        sql_query, bindings, 
        function(transaction, result){
            deferred.resolve(result);
          },
        function(transaction, error){
            deferred.reject(error);
          }
          );
      });
      return deferred.promise;
     }

    function init() {
      if(window.sqlitePlugin)
      {
        console.log("SQLITE PLUGIN ADDED !!");
        db = window.sqlitePlugin.openDatabase({name: "my2.db", androidDatabaseImplementation: 2, androidLockWorkaround: 1}
          , function(success){
            console.log(JSON.stringify(success));
          }, function(error){
            console.log(JSON.stringify(error));
          });
        angular.forEach(DB_CONFIG.tables, function(table){
        var columns = [];
        angular.forEach(table.columns, function(column){
          columns.push(column.name + ' ' + column.value);
        });
        var sql_query = "CREATE TABLE IF NOT EXISTS " + table.name + " (" + columns.join(",") + "); ";
        query(sql_query).then(function(success){console.log(JSON.stringify(success));}, function(error){console.log(JSON.stringify(error.message));});
        });
      }
      else
      {
        console.log("SHOULD ADD SQLITE PLUGIN !!");
        db = window.openDatabase(DB_CONFIG.name, '1.0', DB_CONFIG.name , 655367);
        angular.forEach(DB_CONFIG.tables, function(table){
        var columns = [];
        angular.forEach(table.columns, function(column){
          columns.push(column.name + ' ' + column.value);
        });
        var sql_query = "CREATE TABLE IF NOT EXISTS " + table.name + " (" + columns.join(",") + "); ";
        query(sql_query).then(function(success){console.log(JSON.stringify(success));}, function(error){console.log(JSON.stringify(error.message));});
        });
      }
    }


    function fetch(result){
     if( result.rows.length > 0 )
      {
        return result.rows.item(0);
      }
    else
     {
        return null;
     } 
    }

    function fetchAll(result){
      var output = [];
      for( var i = 0 ; i < result.rows.length ; i++ ) {
        output.push(result.rows.item(i));
      }
      return output;
    }

    return {
      fetch : fetch,
      fetchAll : fetchAll,
      init : init,
      query : query
    };
})

.factory("StockLivreur", function(DB, $q, $http){
  return {
    sync : sync
  };

  function sync(id){
    var deferred = $q.defer();
    var requests = [];
    $http.get("http://197.230.28.154:81/newsales/rest/livreurs/"+id+"/stocks").then(
      function(success){
        console.log(success);
        if(typeof(success.data.content) != "undefined")
        {
          var stockLines = success.data.content;
          console.log(stockLines)
          var addons = []
          for(var i = 0, len = stockLines.length; i < len ; i++)
          {
            var stockLine = stockLines[i];
            addons.push(convertStockLineObjectIntoParam(stockLine));
          }
          requests.push("DELETE FROM stock_livreur WHERE livreur_id = "+JSON.parse(window.localStorage["profile"]).id_db+";");
          requests.push("INSERT INTO stock_livreur(item, packet, unit, livreur_id) VALUES "+addons.join(", ")+";");
          console.log(requests);
          for(var i = 0, len = requests.length ; i < len ; i++)
          {
            console.log("THIS IS IT !!")
            console.log(requests[i])
            DB.query(requests[i]).then(
                function(success){
                  console.log(success);
                  deferred.resolve(success);
                }, 
                function(error){
                  console.log(error);
                  deferred.resolve(error);
                });
          }
        }
      }, 
      function(error){
        deferred.resolve([]);
      });
    return deferred.promise;
  }

  function convertStockLineObjectIntoParam(stockLine)
  {
    return "("+stockLine.itemID+", "+stockLine.stockSecondaire+", "+stockLine.stockPrincipale+", "+JSON.parse(window.localStorage["profile"]).id_db+")";
  }
})

.factory('httpRequestInterceptor', function ($q, $window) {
    return {
        request: function (config) {
            var profile = JSON.parse(window.localStorage['profile'] || '{}');
            if (typeof(profile.token) != "undefined") {
                config.headers['Authorization'] = 'Basic ' +profile.token;
                //config.headers['Authorization'] = 'Basic ampqampqOmxpdnJldXI=';
            }
            //console.log(config)
            return config;
        }
    };
})

.factory("PlanTarifaire", function(DB, $q, $http){
  return {
    sync : sync,
    addToDB : addToDB
  };

  function sync()
  {
    var request = {
      url: "http://197.230.28.154:81/newsales/rest/planTarifaire/AllPlanTarifaire",
      method: "GET"
    };
    return $http(request);
  }

  function addToDB(plans)
  {
    var deferred = $q.defer();
    sync().then(function(success){
      var plans = success.data;
      var addons = [];
      var requests = [];
      requests.push("DELETE FROM plan_tarifaire;");
      for(var i = 0 ; i < plans.length ; i++)
      {
        var plan = plans[i];
        plan.isActive = plan.isActive ? 1 : 0;
        addons.push("("+plan.id+", '"+plan.startDate+"', '"+plan.endDate+"', "+plan.isActive+", "+plan.itemId+", "+plan.prixAricle+")");
      }
      requests.push("INSERT INTO plan_tarifaire(id, startDate, endDate, actif, itemId, prixArticle) VALUES "+addons.join(", ")+";");
      console.log(requests);
      deferred.resolve(requests);

    }, function(error){
      deferred.resolve([]);
    });
    return deferred.promise;
  }
})

.factory("Surveys", function($http, DB, $q){
  return {
    sync : sync,
    getFormattedSurveys : getFormattedSurveys,
    addSurveysToDB : addSurveysToDB,
    addSurveyClientAnswers : addSurveyClientAnswers
  };

  function addSurveyClientAnswers(surveys, client_id)
  {
    var deferred = $q.defer();
    var answersAddons = [];
    angular.forEach(surveys, function(survey, index){
      answersAddons.push("("+client_id+", "+survey.id+", '"+survey.choosen+"')");
      if(index == surveys.length - 1)
      {
        var sql_query = "INSERT INTO survey_client (client_id, survey_id, answer) VALUES "+answersAddons.join(", ")+";";
        return DB.query(sql_query).then(
          function(success){
            deferred.resolve(success);
          }, 
          function(error){
            deferred.reject(error);
          });
      }    
    });
    return deferred.promise;
  }

  function getAll()
  {
    var sql_query = "SELECT * from surveys;";
    return DB.query(sql_query).then(
      function(success){
        return DB.fetchAll(success);
      }, 
      function(error){
        return error;
      });
  }

  function getFormattedSurveys()
  {
    var deferred = $q.defer();
    getAll().then(
    function(success){
      var surveys = [];
      var clientSurveys = { done : false };
      for(var i = 0 ; i < success.length ; i++)
      {
        var object = {
          question: success[i].question.replace(/["?"]/, "")[0].toUpperCase().concat(success[i].question.replace(/["?"]/, "").slice(1)),
          type : success[i].type,
          answers: success[i].answers.split(", "),
          required: ((success[i].required == 1) ? true : false),
          id: success[i].id
        };
        surveys.push(object);
      }
      clientSurveys.surveys = surveys;
      deferred.resolve(clientSurveys);
    },
    function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  }

  function sync()
  {
    var activite = JSON.parse(window.localStorage['profile']).activite;
    var deferred = $q.defer();
    var request = {
      url: "http://197.230.28.154:81/newsales/rest/activities/"+activite+"/questionnaire/mobile",
      method: "GET"
    };
    var config = {
      timeout: 5000
    };
    $http.get("http://197.230.28.154:81/newsales/rest/activities/1/questionnaire/mobile").then(
      function(success){  
        console.log(success);
        var surveys = success.data.content || [];
        var requests = [];
        console.log(surveys);
        var addonsSurveys = [];
        for(var i = 0 ; i < surveys.length ; i++)
        {
          addonSurvey = '('+surveys[i].id+', "'+surveys[i].question+'", "'+surveys[i].answers.join(", ")+'", '+(surveys[i].required ? 1 : 0)+", "+surveys[i].responseType+")";
          addonsSurveys.push(addonSurvey)
        }
        if(addonsSurveys.length > 0)
          {
            requests.push("INSERT INTO surveys (id, question, answers, required, type) VALUES "+addonsSurveys.join(", ")+";");
          }
          deferred.resolve(requests);        
      }, 
      function(error){
        console.log(error)
        deferred.resolve([]);
      });
    return deferred.promise;
  }

  function addSurveysToDB()
  {
    var deferred = $q.defer();
    sync().then(
      function(success){
        console.log(success);
        
        
        if(success.length > 0)
        {
          var requests = [];
          requests.push("DELETE FROM surveys;");
          requests = requests.concat(success);
          angular.forEach(requests, function(request){
          DB.query(request).then(
            function(success){
              console.log(success);
              deferred.resolve(success);
            }, 
            function(error){
              console.log(error);
              deferred.resolve(error);
            });
          });
        }
        else
        {
          deferred.resolve("NONE !");
        }
        
      }, 
      function(error){
        deferred.resolve([]);
      });
    return deferred.promise;
  }

})

.factory("UpdateFactory", function(){
  return {
    deleteThem : deleteThem
  };

  function deleteThem(table, field, ids, hash, child)
  {
    console.log(ids);
    var requests = [];
    var string = "";
    if(typeof(hash) != "undefined")
    {
      for(key in hash)
      {
        string+=" AND "+key+" != "+hash[key];
      }
    }
    requests.push("DELETE FROM "+table+" WHERE "+field+" IN ("+ids.join(", ") + ")"+string+";");
    if(typeof(child) != "undefined")
    {
      console.log(child)
      for(key in child)
      {
        requests.push("DELETE FROM "+key+" WHERE "+child[key]+" IN ("+ids.join(", ")+");");
      }
    }
    return requests;
  }
})

.factory("IonicPopUpUtilities", function(){
  return {
    alert : alert
  };

  function alert(msg, description)
  {
   var object = 
        {
            title: msg,
            buttons: [
                {
                    text: "OK",
                    type: "button-assertive",
                    cssClass: "assertive-survey"
                }
            ],
            template: '<span style="font-size: 12px; font-weight: 600;">'+description+'.</span>'
        };
        return object;
  }

  
})

.factory("CartUtilities", function(Promotions, $log, $q){
  return {
    existInCart : existInCart,
    getOutOfQuota : getOutOfQuota,
    dropFromCart : dropFromCart,
    addToCart : addToCart,
    addOrModify : addOrModify,
    getCartItems : getCartItems,
    getGiftsFromObject : getGiftsFromObject,
    prepareGift : prepareGift,
    totalCart : totalCart

  };

  function totalCart(ttc, ht, promotions)
  {
    var deferred = $q.defer();

    var total = 0;
    getCartItems().then(function(items){

      angular.forEach(items, function(item, index){
        // WE ARE NOT COUNTING THE GIFTS !
        if(item.prixVente > 0)
        {
          if(ttc && promotions)
          {
            var addon = item.tva - item.remise;
            total+=addon;
            console.debug(total);
          }
          else if(ttc)
          {
            total+=item.tva;
          }
          else
          {
            total+=item.ht;
          }
          
        }
        if(index == items.length - 1)
        {
          deferred.resolve(total);
          
        }
      });
    })
    
    return deferred.promise;
    //return total;
  }

  function getCartItems()
  {
    var deferred = $q.defer();

    var cart = JSON.parse(window.localStorage['cart'] || "{}");
    var items = cart.items || [];
    var output = [];
    var input = {};
    for(var i = 0 , len = items.length ; i < len ; i++)
    {
      var item = items[i];
      if(typeof item == "object")
      {
        if(typeof(item.promotions) != "undefined" && item.promotions != null && item.promotions.length > 0)
        {
          var object = Promotions.cartTreatment(item, input);
          input = object.gifts;
          output.push(object.item);
        }
        else
        {
          item.promotions = [];
          var object = Promotions.cartTreatment(item, input);
          output.push(object.item);
        }
      }
    }
    console.debug({
      items : output,
      gifts : input
    });
    var gifts = getGiftsFromObject(input);
    var gifts = gifts.map(
      function(a)
      {
        return prepareGift(a);
      });
    output = output.concat(gifts);
    deferred.resolve(output);
    return deferred.promise;
  }

  function prepareGift(article)
  {
    if(Object.prototype.toString.call(article) == "[object Array]")
    {
      for(var i = 0 ; i < article.length ; i++)
      {
        var subs = article[i];
        for(var j = 0 ; j < subs.length ; j++)
        {
          var sub = subs[j];
          sub = prepareArticleToBeGift(sub);
        }
        if(i == article.length - 1)
        {
          return article;
        }
      }
    }
    else
    {
      return prepareArticleToBeGift(article);
    }
  }

  function prepareArticleToBeGift(article)
  {

    article.prixVente = 0;
    article.nomArticle = article.designation;
    article.unit = article.qty;
    article.packet = 0;
    return article;
  }

  function getGiftsFromObject(object)
  {
    var output = [];
    var conflicts;
    for(var key in object)
    {
      var gifts = object[key];
      if(gifts.length > 1)
      {
        conflicts = {};
        for(var i = 0 ; i < gifts.length ; i++)
        {
          var gift = gifts[i];
          conflicts[gift.group] = typeof conflicts[gift.group] != "undefined" ? conflicts[gift.group].concat([gift]) : [gift];
        }
        console.debug(conflicts);
        var conflictKeys = Object.keys(conflicts);
        if(conflictKeys.length > 1)
        {
          var conflictArray = [];
          for(var conflictKey in conflictKeys)
          {
            conflictArray.push(conflicts[conflictKey]);
          }
          output.push(conflictArray);
        }
        else
        {
          output = output.concat(gifts);
        }
      } 
      else
      {
        output = output.concat(gifts);
      }
    }
    console.debug(output);
    return output;
  }

  function existInCart(article, forChargement, prelevement, retour)
  {
    prelevement = typeof(prelevement) != "undefined" && prelevement == true;

    forChargement = typeof(forChargement) != "undefined" && forChargement == true;

    retour = typeof(retour) != "undefined" && retour == true;

    console.debug(forChargement);

    var _key;
    if(prelevement || retour)
    {
      if(prelevement)
      {
        _key = "prelevement";
      }
      else
      {
        _key = "retour";
      }
    }
    else
    {
      _key = "cart";
    }

    var cart = JSON.parse(window.localStorage[_key] || "{}");

    if(typeof cart.items != "undefined")
    {
      for(var i = 0, len = cart.items.length ; i < len ; i++)
      {
        var cartItem = cart.items[i];

        if(article.id_db == cartItem.id_db)
        {
          return cartItem;
        }
      }
      return null;
    }
    else
    {
      return null;
    }

  }


  function addOrModify(article, chargement, prelevement, retour)
  {
    prelevement = typeof(prelevement) != "undefined" && prelevement == true;

    retour = typeof(retour) != "undefined" && retour == true;

    chargement = typeof(chargement) != "undefined" && chargement == true;

    var _key;
    if(prelevement || retour)
    {
      if(prelevement)
      {
        _key = "prelevement";
      }
      else
      {
        _key = "retour";
      }
    }
    else
    {
      _key = "cart";
    }

    var cart = JSON.parse(window.localStorage[_key] || "{}");

    if(typeof cart.items == "undefined" || cart.items.length == 0)
    {
      addToCart(article, chargement, prelevement, retour);
    }
    else
    {
      console.log("NON EMPTY CART ! ");

      var found = false;

      for(var i = 0, len = cart.items.length ; i < len ; i++)
      {
        var cartItem = cart.items[i];

        if(article.id_db == cartItem.id_db)
        {
          cartItem.unit = article.unit;
          cartItem.packet = article.packet;
          found = true;
          break;
        }

      }

      if(!found)
      {
        cart.items.push(article);
      }

      window.localStorage[_key] =  JSON.stringify(cart);

      cart = null;

    }

  }

  function addToCart(article, chargement, prelevement, retour)
  {
    prelevement = typeof(prelevement) != "undefined" && prelevement == true;

    retour = typeof(retour) != "undefined" && retour == true;

    chargement = typeof(chargement) != "undefined" && chargement == true;

    var _key;

    if(prelevement || retour)
    {
      if(prelevement)
      {
        _key = "prelevement";
      }
      else
      {
        _key = "retour";
      }
    }
    else
    {
      _key = "cart";
    }

    var cart = JSON.parse(window.localStorage[_key] || "{}");
    if(typeof cart.items == "undefined")
    {
      cart.items = [];
    }
    console.log(article);
    cart.items.push(article);

    window.localStorage[_key] =  JSON.stringify(cart);

    cart = null;
  }

  function dropFromCart(article, chargement, prelevement, retour)
  {
    prelevement = typeof(prelevement) != "undefined" && prelevement == true;
    var _key;
    if(prelevement || retour)
    {
      if(prelevement)
      {
        _key = "prelevement";
      }
      else
      {
        _key = "retour";
      }
    }
    else
    {
      _key = "cart";
    }

    var cart = JSON.parse(window.localStorage[_key] || "{}");

    for(var i = cart.items.length - 1 ; i >= 0 ; i--)
    {
      var cartItem = cart.items[i];
      if(article.id_db == cartItem.id_db)
      {
        cart.items.splice(i, 1);
        break;
      }
    }

    window.localStorage[_key] =  JSON.stringify(cart);

    cart = null;

  }

  function getOutOfQuota()
  {
    var found = false;
    if(typeof(window.localStorage['cart']) != "undefined")
    {
      var cartItems = JSON.parse(window.localStorage['cart']).items;
      for(var i = 0, len = cartItems.length ; i < len ; i++)
      {
        var item = cartItems[i];
        var currentTotal =  Math.trunc( item.unit/item.unitConversion ) + item.packet;
        var total = ((item.packet * item.unitConversion) + item.unit) * item.prixVente;
        if(item.quotaVALUE != 0 || item.quotaQTY != 0)
        {
          if(item.quotaQTY != 0)
          {
            found = (item.quotaQTY < currentTotal);
            // IF ONE IS GREATHER NO NEED TO COMPLETE THE ITERATION !!
            if(found)
            {
              break;
            }
          }
          else
          {
            found = (item.quotaVALUE < total);
            // IF ONE IS GREATHER NO NEED TO COMPLETE THE ITERATION !!
            if(found)
            {
              break;
            }
          }
        }
        else
        {
          found = true;
          break;
        }
      }
      return found;
    }
    else
    {
      return found;
    }
  }

})

.factory("Chargement", function($q, $http, $log, DB, DateUtilities){
  return {

    addPrelevementClient : addPrelevementClient,

    syncInput : syncInput,

    syncOutput : syncOutput,

    add : add,

    convertLineObjectToOption : convertLineObjectToOption,

    convertLineObjectsToOptions : convertLineObjectsToOptions,

    convertApiLineObjectToOption : convertLineObjectToOption,

    convertApiLineObjectsToOptions : convertLineObjectsToOptions

  };

  function addPrelevementClient(client_id, lines)
  {
    var deferred = $q.defer();

    var options = convertLineObjectsToOptions(lines, true);
    deferred.resolve(options);

    return deferred.promise;
  }

  function syncInput(vendeurId)
  {

    var deferred = $q.defer(vendeurId);

    var request = {
      url: "http://197.230.28.154:81/newsales/rest/vendors/"+vendeurId+"/stocks",
      method: "GET"
    };

    $http(request).then(
      function(success){
        $log.debug(success);
        if(typeof(success.data.content) != "undefined" && success.data.content != null )
        {
          $log.debug(success.data.content);

          if(typeof(success.data.content.stockArticleDto) != "undefined" && success.data.content.stockArticleDto != null && success.data.content.stockArticleDto.length > 0)
          {
            var requests = [];
            var lines = success.data.content.stockArticleDto;
            lines = convertApiLineObjectsToOptions(lines);
            if(lines.length > 0)
            {
              requests.push("DELETE FROM stock;");
              requests.push("INSERT INTO stock (item, packet, unit, employee_id) VALUES "+lines.join(", ")+";");
            }
            deferred.resolve(requests);
            return deferred.promise;
          }
          else
          {
            deferred.resolve([]);
            return deferred.promise;
          }
        }
        else
        {
          deferred.resolve([]);
          return deferred.promise;
        }
      }, 
      function(error){
        deferred.resolve([]);
      });
    deferred.resolve([]);
    return deferred.promise;

  }

  function syncOutput(vendeurID)
  {

    var deferred = $q.defer();

    DB.query("SELECT item_id as itemID, packet as packet, unit as unite FROM chargement_vendeur WHERE vendeur_id = "+vendeurID+";").then(
      function(success){

        var demands = DB.fetchAll(success);

        if(!demands.length > 0)
        {
          deferred.resolve([]);
        }
        else
        {
          var request = {
            method: "POST",
            url: "http://197.230.28.154:81/newsales/rest/orders/"+vendeurID+"/add-commande",
            data: {
              lcsDto: demands
            }
          };

          $http(request).then(
            function(success){
              deferred.resolve(["DELETE FROM chargement_vendeur WHERE vendeur_id = "+vendeurID+";"]);
            }, 
            function(error){
              deferred.resolve([]);
            });
        }

      }, 
      function(error){
        $log.error(error);
        deferred.resolve([]);
      })

    return deferred.promise;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  function convertApiLineObjectToOption(line, id)
  {
    return "("+line.articleID+", "+line.stockPrincipal+", "+line.stockSecondaire+", "+id+")";
  }

  function convertApiLineObjectsToOptions(lines)
  {
    var output = [];

    var profile = JSON.parse(window.localStorage['profile'] || "{}");

    var vendeurId = profile.id_db || 0;

    for(var i = 0, len = lines.length ; i < len ; i++)
    {
      var line = lines[i];
      output.push(convertApiLineObjectToOption(line, vendeurId));
    }
    return output;
  }



  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  function convertLineObjectToOption(line, id, date)
  {
    return "("+line.id_db+", "+line.packet+", "+line.unit+", "+id+", '"+date+"')";
  }


  

  function convertLineObjectsToOptions(lines, prelevement)
  {
    prelevement = typeof(prelevement) != "undefined" && prelevement == true;

    var output = [];

    var ids = [];

    var date = DateUtilities.convertLongToYYYYMMDD(new Date());

    var profile = JSON.parse(window.localStorage['profile'] || "{}");

    var vendeurId = profile.id_db || 0;

    if(typeof(lines) != "undefined" && lines.length > 0)
    {
      for(var i = 0, len = lines.length ; i < len ; i++)
      {
        var line = lines[i];

        ids.push(line.id_db);

        output.push(convertLineObjectToOption(line, (prelevement ? 0 : vendeurId), date));
      }
      return { ids: ids, output: output };
    }
    else
    {
      return { ids: [], output: [] };
    }
  }

  function executeQueries(queries)
  {
    var deferred = $q.defer();

    for(var i = 0 ; i < queries.length ; i++)
    {
      var sql_query = queries[i];

      console.debug(sql_query);

      DB.query(sql_query).then(
      function(success){
        console.error(success);
        deferred.resolve(success);
      }, 
      function(error){
        console.error(error);
        deferred.reject(error);
      });
    }

    return deferred.promise;
  }


  function add()
  {
    var deferred = $q.defer();
    var cart = JSON.parse(window.localStorage['cart'] || "{}");
    if(typeof cart.items == "undefined" || !cart.items.length > 0)
    {
      deferred.reject({ message : "Aucune ligne à ajouter "});
      return deferred.promise;
    }
    else
    {
      var profile = JSON.parse(window.localStorage['profile'] || "{}");

      var input = convertLineObjectsToOptions(cart.items);

      var ids = input.ids;

      options = input.output;

      var requests = [];

      requests.push("DELETE FROM chargement_vendeur WHERE vendeur_id = "+profile.id_db+" AND item_id IN ("+ids.join(", ")+");");

      requests.push("INSERT INTO chargement_vendeur(item_id, packet, unit, vendeur_id, date) VALUES "+options.join(", ")+";");

      console.error(requests);

      return executeQueries(requests);
    }
  }
})

.factory("DateUtilities", function(){

  return {
    convertLongToYYYYMMDD : convertLongToYYYYMMDD
  };

  function convertLongToYYYYMMDD(date)
  {
    var yyyy = (date.getFullYear()).toString();
    var mm = (date.getMonth()+1).toString();
    var dd = (date.getDate()).toString();
    var date = yyyy+"-"+(mm[1]?mm:"0"+mm[0])+"-"+(dd[1]?dd:"0"+dd[0]);
    return date;
  }
})

.factory("Quotas", function(DB, $q, DateUtilities, $http){

  return {
    sync : sync,
    add : add
  };

  function add()
  {

  }
  function sync(vendeurId)
  {
    var deferred = $q.defer();

    var request = {
      url: "http://197.230.28.154:81/newsales/rest/itemQuotas/getItemQuotas",
      method: "GET"
    };

    $http.get("http://197.230.28.154:81/newsales/rest/itemQuotas/getItemQuotas").then(
      function(success){
        var requests = [];
        var addons = [];
        var quotas = success.data;
        if(quotas.length > 0)
        {
          for(var i = 0, len = quotas.length ; i < len ; i++)
          {
            var quota = quotas[i];
            quota.debut = DateUtilities.convertLongToYYYYMMDD(new Date(quota.debut));
            quota.fin = DateUtilities.convertLongToYYYYMMDD(new Date(quota.fin));
            addons.push(convertQuotaToAddon(quota));
          }
          requests.push("DELETE FROM quota_vendeur;");
          requests.push("INSERT INTO quota_vendeur(id, itemId, qty, value, debut, fin) VALUES "+addons.join(", ")+";");
          deferred.resolve(requests);
        }
        else
        {
          deferred.resolve([]);
        }
      }, 
      function(error){
        deferred.resolve([]);
      });

    return deferred.promise;
  }
  function convertQuotaToAddon(quota)
  {
    return "("+quota.id+ ", "+ quota.itemId +", "+quota.qty+", "+quota.valeur+", '"+quota.debut+"', '"+quota.fin+"')";
  }

})

.factory("ModePaiement", function(DB, $q, $http){
  return {
    getAll : getAll,
    sync : sync,
    addToDB : addToDB,
    escompte : escompte
  };

  function escompte(paymentMethod, date)
  {
    console.debug(paymentMethod);

    var deferred = $q.defer();

    var finalDate = date.getTime() - new Date().getTime();

    // IF THE VALUE IS NEGATIVE WE SHOULD SET IT TO 0
    var days = finalDate <= 0 ? 0 : finalDate / 24*60*60*1000;

    paymentMethod.remises = JSON.parse(paymentMethod.remises || "[]");
    if( typeof(paymentMethod.remises) != "undefined" && paymentMethod.remises != null && paymentMethod.remises.length > 0)
    {
      for(var i = 0 ; i < paymentMethod.remises.length ; i++)
      {
        var remise = paymentMethod.remises[i];
        if(days >= remise.min && days < remise.max)
        {
          deferred.resolve(remise.remise);
          return deferred.promise;
        }
      }
    }
    else
    {
      deferred.resolve(0.7);
      return deferred.promise;
    }
    deferred.resolve(0);
    return deferred.promise;
  }

  function getAll()
  {
    var sql_query = 'select MP.*, "[" || GROUP_CONCAT("{ ""id"" :" || RMP.id || ", ""name"" :""" || RMP.name || """, ""min"" : " || RMP.minPeriod ||", ""max"" : " || RMP.maxPeriod || ", ""remise"" : " || RMP.pourcentage || "}") || "]" as remises from mode_paiements as MP LEFT JOIN remise_mode_paiement as RMP ON RMP.id_mode_paiement = MP.id GROUP BY MP.id ORDER BY RMP.minPeriod';
    return DB.query(sql_query).then(
      function(success){
        return DB.fetchAll(success);
      }, 
      function(error){
        return error;
      });
  }
  function addToDB()
  {
    var deferred = $q.defer();
    sync().then(
      function(success){
        modePaiementObjectToRequestOption(success).then(
          function(requests){
            deferred.resolve(requests);
          });
      }, 
      function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  }
  function modePaiementObjectToRequestOption(modePaiements)
  {
    var deferred = $q.defer();
    var requests = [];
    var parametersModePaiement = [], parametersRemiseModePaiement = [];
    for(var i = 0 ; i < modePaiements.length ; i++)
    {
      var modePaiement = modePaiements[i];
      parametersModePaiement.push("("+modePaiement.id+", '"+modePaiement.name+"', '"+modePaiement.description+"')");
      parametersRemiseModePaiement = parametersRemiseModePaiement.concat(modePaiementRemiseObjectToRequestOption(modePaiement.id, modePaiement.echeance));
    }
    if(parametersModePaiement.length > 0);
    {
      requests.push("INSERT INTO mode_paiements (id, name, description) VALUES "+parametersModePaiement.join(", ")+";");
    }
    if(parametersRemiseModePaiement.length > 0)
    {
      requests.push("INSERT INTO remise_mode_paiement (id, id_mode_paiement, name, pourcentage, minPeriod, maxPeriod) VALUES "+parametersRemiseModePaiement.join(", ")+";");
    }
    deferred.resolve(requests);
    return deferred.promise;
  }
  function modePaiementRemiseObjectToRequestOption(id, remiseModePaiements)
  {
    var output = [];
    angular.forEach(remiseModePaiements, function(remiseModePaiement){

    });
    for(var i = 0 ; i < remiseModePaiements.length ; i++)
    {
      var remiseModePaiement = remiseModePaiements[i];
      output.push("("+remiseModePaiement.id+", "+id+", '"+remiseModePaiement.name+"', "+remiseModePaiement.percentage+", "+remiseModePaiement.minperiod+", "+remiseModePaiement.maxPeriod+")");
    }
    return output;
  }
  function sync()
  {
    var deferred = $q.defer();
    var request = {
      method: "GET",
      url: "http://197.230.28.154:81/newsales/rest/payements"
    };
    $http.get("http://197.230.28.154:81/newsales/rest/payements").then(
      function(success){
        deferred.resolve(success.data);
      },
      function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  }
})

.factory("SynchronisationV2", function(DB, $q, $http, $log, Chargement, PlanTarifaire, UpdateFactory, Quotas, Surveys, Promotions, StockLivreur, Missions, Clients, Routes, CallSteps, ModePaiement, SBD){

  return {
    // PRIVATE TO VENDEUR
    syncV2 : syncV2,
    gatherSyncData : gatherSyncData,
    gatherSyncOutputData : gatherSyncOutputData,
    // PRIVATE TO LIVREUR
    syncV2Livreur : syncV2Livreur,
    gatherSyncDataLivreur : gatherSyncDataLivreur,
    gatherSyncOutputDataLivreur : gatherSyncOutputDataLivreur,
    syncV2LivreurAll : syncV2LivreurAll,
    livreurSync : livreurSync,
    syncCommandesLivreur : syncCommandesLivreur
    
  };


  function maxOfEachLivreur()
  {
    var sql_query = "select ifnull(c.timestamp,0) as max_clients, ifnull((SELECT timestamp FROM articles ORDER BY timestamp DESC LIMIT 1), 0) as max_articles, ifnull((SELECT m.timestamp FROM missions_livreur m ORDER BY m.timestamp DESC LIMIT 1),0) AS max_missions from clients c ORDER BY c.timestamp DESC LIMIT 1";
    return DB.query(sql_query).then(
      function(success){
        return DB.fetch(success);
      }, 
      function(error){
        return error;
      });
  }

  function gatherSyncDataLivreur(idLivreur)
  {
    var deferred = $q.defer();
    maxOfEachLivreur().then(
      function(max)
      {
        var data;
        if(max == null)
        {
          data = {
            maxItem: 0,
            maxClient: 0,
            maxMission: 0
          }
        }
        else
        {
          data = {
            maxItem: max.max_articles,
            maxClient: max.max_clients,
            maxMission: max.max_missions
            }
        }
        var request = {
        data: data,
        url: "http://197.230.28.154:81/newsales/rest/livreurs/"+idLivreur+"/sync",
        method: "PUT"
        };
        $http(request).then(
            function(success){
              deferred.resolve(success.data);
            }, 
            function(error){
              deferred.reject(error);
            }); 

      }, 
      function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  }

  function gatherSyncOutputDataLivreur()
  {
    
  }

  function syncV2LivreurAll(idLivreur)
  {
    var one = syncV2Livreur(idLivreur);
    var promotions = Promotions.syncPromotions();
    var sbds = SBD.syncSBDFromAPI();
    var stock = StockLivreur.sync(idLivreur);
    var output = syncCommandesLivreur(idLivreur);
    return $q.all(new Array(one, promotions, sbds, stock, output));
  }

  function livreurSync(idLivreur)
  {
    var deferred = $q.defer();
    syncV2LivreurAll(idLivreur).then(
      function(success){
        deferred.resolve(success);
      },
      function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  }

  function syncV2Livreur(idLivreur)
  {
    var deferred = $q.defer();
    var requests = [];
    var idLivreur = idLivreur;
    gatherSyncDataLivreur(idLivreur).then(
      function(success){
        console.log(success);
        var commandes = [];
        var clients = success.clients;
        var articles = success.articles;
        var marques = success.marques;
        if(marques != null && marques.length > 0)
        {
          var addonsMarques = [];
          for(var i = 0; i < marques.length ; i++)
          {
            addonsMarques.push(convertMarqueObjectToRequestOption(marques[i]));
          }
          requests.push("INSERT INTO marque(id, marqueArticle, logo) VALUES "+addonsMarques.join(", ")+";");
        }
        var missionsIds = [];
        var commandesIds = [];
        for(var i = 0; i < success.missions.length ; i++)
        {
          var objectCommande = {};
          for(var j = 0 ; j < success.missions[i].length ; j++)
          {
            var parsed = JSON.parse(success.missions[i][j]);
            switch(j)
            {
              case(0):
                objectCommande.mission = parsed.missionId;
                if(typeof(objectCommande.mission) != "undefined")
                  missionsIds.push(objectCommande.mission);
                objectCommande.timestamp = parsed.timestamp;
                break;
              case(1):
                objectCommande.client = parsed.clientId;
                break;
              case(2):
                objectCommande.route = parsed.routeId;
                break;
              case(3):
                objectCommande.lignes = parsed;
              case(4):
                objectCommande.commande = parsed.commandeId;
                if(typeof(objectCommande.commande) != "undefined")
                  commandesIds.push(objectCommande.commande);
              default:
                break;
            }
          }

          commandes.push(objectCommande);
        }


        if(missionsIds.length > 0)
        {
          // TRYING TO DELETE MISSIONS WITH ALL THE DEPENDENCIES !!
          requests = requests.concat(UpdateFactory.deleteThem("missions_livreur", "id_db", missionsIds, { state: 1 }, { commandes_livreur: "id_mission" }));
        }
        if(commandesIds.length > 0)
        {
          requests = requests.concat(UpdateFactory.deleteThem("ligneCommandes_livreur", "id_commande", commandesIds));
        }
        console.log(requests);
        console.log(commandes);


        var addonsMissionsLivreur = [], addonsClients = [], addonsArticles = [], addonsCommandesLivreur = [], addonsLigneCommandeLivreur = [];
        if(commandes != null && commandes.length > 0)
        {
          if(commandes.length > 500)
          {
            var array_output = []; 
            var max = 500;
            for(var i = 0 ; i < commandes.length ; i+=max)
            { 
              array_output.push(commandes.slice(i, i+max));
            }
            console.log(array_output);
            for(var i = 0 ; i < array_output.length ; i++)
            {
              var missions = array_output[i];
              for(var j = 0 ; j < missions.length ; j++)
              {
                addonsMissionsLivreur.push(convertMissionObjectToRequestOptionLivreur(missions[j], idLivreur));
                addonsCommandesLivreur.push(convertCommandeObjectToRequestOptionLivreur(missions[j]));
                for(var k = 0 ; k <missions[j].lignes.length ; k++)
                {
                  addonsLigneCommandeLivreur.push(convertLgneCommandeObjectToRequestOptionLivreur(missions[j].lignes[k], commandes[i].commande));
                }
                requests.push("INSERT INTO ligneCommandes_livreur(id_ligne, id_commande, id_article, unit, packet, pu_ht, isGift, remise, idLigne) VALUES "+addonsLigneCommandeLivreur.join(", ")+";");

              }
              requests.push("INSERT INTO missions_livreur(id_db, code_mission, client_id, state, synced, livreur, finished, commande_id, timestamp) VALUES "+addonsMissionsLivreur.join(", ")+";");
              requests.push("INSERT INTO commandes_livreur(id_db, code_commande, id_mission, id_client) VALUES "+addonsCommandesLivreur.join(", "));
              addonsMissionsLivreur = [];
            }
            console.log(requests)
          }
          
          else
          {
            for(var i = 0 ; i < commandes.length ; i++)
            {
              addonsMissionsLivreur.push(convertMissionObjectToRequestOptionLivreur(commandes[i], idLivreur));
              addonsCommandesLivreur.push(convertCommandeObjectToRequestOptionLivreur(commandes[i]));
              for(var j = 0 ; j <commandes[i].lignes.length ; j++)
              {
                addonsLigneCommandeLivreur.push(convertLgneCommandeObjectToRequestOptionLivreur(commandes[i].lignes[j], commandes[i].commande));
              }
              requests.push("INSERT INTO ligneCommandes_livreur(id_commande, id_article, unit, packet, pu_ht, isGift, remise, idLigne) VALUES "+addonsLigneCommandeLivreur.join(", ")+";");
              addonsLigneCommandeLivreur =  [];

            }
            var final_request = "INSERT INTO missions_livreur(id_db, code_mission, client_id, state, synced, livreur, finished, commande_id, timestamp) VALUES "+addonsMissionsLivreur.join(", ")+";";
            requests.push(final_request);
            requests.push("INSERT INTO commandes_livreur(id_db, code_commande, id_mission, id_client) VALUES "+addonsCommandesLivreur.join(", ")+";");
            
          }
        }
        /////////////////////////////////////////////////////////////////////
        //////////////////////////ARTICLES///////////////////////////////////
        if(articles != null && articles.length > 0)
        {
          var articleIds = [];
          if(articles.length < 500)
          {
            for(var i = 0 ; i < articles.length ; i++)
            {
              articleIds.push(articles[i].id);
              addonsArticles.push(convertArticleObjectToRequestOption(articles[i]));
            }
            requests = requests.concat(UpdateFactory.deleteThem("articles", "id_db", articleIds));
            requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion, timestamp) VALUES "+addonsArticles.join(", ")+";");

          }
          else
          {
            var max = 500;
            var array_articles_output = [];
            for(var i = 0 ; i < articles.length ; i+=max)
            { 
              array_articles_output.push(articles.slice(i, i+max));
            }
            for(var i = 0 ; i < array_articles_output.length ; i++)
            {
              var articles_group = array_articles_output[i];
              for(var j = 0 ; j < articles_group.length ; j++)
              {
                articleIds.push(articles_group[j].id);
                addonsArticles.push(convertArticleObjectToRequestOption(articles_group[j]));
              }
              requests = requests.concat(UpdateFactory.deleteThem("articles", "id_db", articleIds));
              requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion, timestamp) VALUES "+addonsArticles.join(", ")+";");
              addonsArticles = [];
            }
          }
        }
        /////////////////////////////////////////////////////////////////////////
        ////////////////////////CLIENTS//////////////////////////////////////////
        console.log(clients);
        if(clients.length > 0)
        {
          var clientsIds = [];
          for(var i = 0 ; i < clients.length ; i++)
          {
            clientsIds.push(clients[i].id);
            addonsClients.push(convertClientObjectToRequestOption(clients[i]));
            console.log(convertClientObjectToRequestOption(clients[i]));
          }
          requests=requests.concat(UpdateFactory.deleteThem("clients", "id_db", clientsIds));
          requests.push("INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email, golden_store, route, timestamp) VALUES"+ addonsClients.join(", ")+";");
          console.log(requests);
        }
        if(requests != null && requests.length > 0)
        {
          for(var i = 0 ; i < requests.length ; i++)
          {
            console.log(requests[i]);
            deferred.resolve(requests[i]);
            DB.query(requests[i]).then(
              function(success){
                deferred.resolve(success);
              }, 
              function(error){
                deferred.reject(error);
              });
          }
        }
      }, 
      function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  }
  /*
function addCommandeLivreur(id_commande, code_commande, id_mission, id_client){
    var sql_query = "INSERT INTO commandes_livreur(id_db, code_commande, id_mission, id_client) values(?,?,?,?);";
    var bindings = [id_commande, code_commande, id_mission, id_client];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
        convertCommandeObjectToRequestOptionLivreur(missions[j])
      });
  }*/

  var sql_query = "INSERT INTO ligneCommandes_livreur(id_commande, id_article, unit, packet, pu_ht) values(?,?,?,?,?);"

  function convertLgneCommandeObjectToRequestOptionLivreur(ligne, commandeId)
  {
    return '('+commandeId+', '+ligne.itemId+', '+ligne.unite+', '+ligne.packet+', '+ligne.salePrice+', '+ligne.isGift+', '+ligne.remise+', '+ligne.id+')';
  }

  function convertCommandeObjectToRequestOptionLivreur(mission)
  {
    console.log(mission);
    return '('+mission.commande+', "CM748536" , '+mission.mission+', '+mission.client+')';
  }


  function convertMissionObjectToRequestOptionLivreur(mission, idLivreur)
  {
    //"INSERT INTO missions_livreur(id_db, code_mission, client_id, state, synced, livreur, finished) values(?,?,?,?,?,?,?)"
    return '(' + mission.mission + ',"CM447489" , ' +mission.client+ ', '+0 +', '+0+', '+idLivreur+', '+0+ ', '+mission.commande+', '+mission.timestamp+')';
  }


  function convertMissionObjectToRequestOption(mission)
  {
    return "("+mission.id+", '"+mission.codeMission+"', "+mission.client+", "+mission.route+", '"+mission.date+"', 0, 0, "+mission.timestamp+")";
  }

  function convertClientObjectToRequestOption(client)
  {
    return "("+client.id+", '"+client.codeClient+"', '"+client.address+"', "+client.latitude.replace(/,/g, ".")+", "+client.longitude.replace(/,/g, ".")+", '"+client.nom+"', '"+client.prenom+"', '"+client.email+"', "+client.goldenPoints+", "+client.route+", "+client.timestamp+")";
  }
  function convertRouteObjectToRequestOption(route, vendeurId)
  {
    return "("+route.id+", '"+route.codeRoute+"', '"+route.nomRoute+"', "+0+", "+vendeurId+", "+route.timestamp+")";
  }
  function convertArticleObjectToRequestOption(article)
  {
    return "("+article.id+", '"+article.code+"', '"+article.shortDescription.replace(/[']/g, "")+"', "+article.prixVente+", "+article.tva+", '"+article.conditioningUnitFirst+"', '"+article.conditioningUnitSecond+"', '"+article.marque+"', '"+article.sousMarque+"', "+article.unitConversion+", "+article.timestamp+")";
  }
  function convertMarqueObjectToRequestOption(marque)
  {
    marque.logo = marque.logo == null ? "img/logo.png" : marque.logo;
    return "("+marque.id+", '"+marque.name+"', '"+marque.logo+"')";
  }

  function sendCommandeToAPI(commandes)
  {
    var commandesToAPI = [];
    for(var i = 0 ; i < commandes.length ; i++)
    {
      commandes[i].lignes = JSON.parse(commandes[i].lignes);
      commandesToAPI.push(commandes[i]);
    }
    var request = {
        url: "http://197.230.28.154:81/newsales/rest/orders/add",
        method: "POST",
        data: commandesToAPI
      };
    return $http(request);
  }

  function syncCommandesLivreur(idLivreur)
  {
    var deferred = $q.defer();
    var sql_query = 'SELECT M.id_db as mission, M.state as state,  C.id_db as commande, "["||Group_Concat("{ ""id_article"": "||LC.id_article|| ", ""unite"": "||LC.unit||", ""remise"": "||ifnull(LC.remise, 0)||", ""gift"": "||ifnull(LC.isGift, 0)||",   ""prix"": "||LC.pu_ht||", ""caisse"": "||LC.packet||" }")||"]" as lignes FROM missions_livreur AS M JOIN commandes_livreur AS C ON C.id_db = M.commande_id JOIN ligneCommandes_livreur AS LC ON LC.id_commande = C.id_db WHERE M.synced = 0 AND M.state = 1 AND M.livreur = ? GROUP BY M.id_db;';
    var bindings = [idLivreur];
    DB.query(sql_query, bindings).then(
      function(success){
        var visits = DB.fetchAll(success);
        var finalVisits = [];
        for(var i = 0, len = visits.length ; i < len ; i++)
        {
          var visit = visits[i];
          visit.lignes = JSON.parse(visit.lignes);
          finalVisits.push(visit);
        }
        if(finalVisits.length > 0)
        {
          var request = {
          method: "POST",
          url: "http://197.230.28.154:81/newsales/rest/livreurs/"+idLivreur+"/sync/missions",
          data: finalVisits
          };
          $http(request).then(
            function(success){
              var ids = success.data;
              var query = "UPDATE missions_livreur SET synced = 1 WHERE id_db IN ("+ids.join(", ")+");";
              DB.query(query).then(function(success){
                deferred.resolve("SUCCESSFULLY SYNCED");
              });
            }, 
            function(error){
              deferred.resolve(error);
            });
        }
        else
        {
          deferred.resolve("Nothing !");
        }
      }, 
      function(error){
        deferred.resolve(error);
      }); 
    return deferred.promise;
  }

  function syncCommandes(idVendeur)
  {
    var deferred = $q.defer();
    var sql_query = 'SELECT M.id AS mobile, C.paymentId as payementModeID, C.paymentDate as payementDate, M.client_id AS client, C.sbd as sbds, C.promotions AS promotions, M.route_id AS route, M.state AS etat, ifnull(M.id_db, 0) AS api,  "["||Group_Concat("{ ""id_article"": "||LC.id_article||", ""unite"": "||LC.unit||", ""remise"": "||ifnull(LC.remise, 0)||", ""gift"": "||ifnull(LC.isGift, 0)||",  ""prix"": "||LC.pu_ht||", ""caisse"": "||LC.packet||" }")||"]" as lignes FROM missions AS M JOIN commandes AS C ON C.id = M.commande_id JOIN ligneCommandes AS LC ON LC.id_commande = C.id WHERE M.synced = 0 AND M.state = 1 AND M.route_id IN (SELECT id_db from routes WHERE vendeur = '+idVendeur+') GROUP BY C.id;';
    DB.query(sql_query).then(
      function(success){
        var commandes = DB.fetchAll(success);
        for(var i = 0 ; i < commandes.length ; i++)
            {
              commandes[i].lignes = JSON.parse(commandes[i].lignes);
              commandes[i].payementDate = new Date(commandes[i].payementDate);
              commandes[i].promotions = JSON.parse("["+commandes[i].promotions+"]" || "[]");
              for(var j = 0 ; j < commandes[i].lignes.length ; j++)
              {
                var ligne = commandes[i].lignes[j];
                ligne.gift = ligne.gift == 1 ? true : false;
              }
            }
        deferred.resolve(commandes);
      }, 
      function(error){
        deferred.reject(error);
      }); 
    return deferred.promise;
  }

  function syncV2(vendeurId)
  {
    var deferred = $q.defer();
    var vendeurId = vendeurId;
    var requests = [];
    combineOutputAndInput(vendeurId).then(
      function(success){
          console.log(success);
          var object = success[0];
          console.log(success[2]);
          object.commandes = success[1];
          requests = requests.concat(success[3]);
          requests = requests.concat(success[5]);
          requests = requests.concat(success[7]);
          requests = requests.concat(success[8]);
          requests = requests.concat(success[9]);
          requests = requests.concat(success[10]);
          //requests = requests.concat(["INSERT INTO stock(item, packet, unit, employee_id) VALUES (1, 10, 200, 1), (2, 10, 200, 1), (3, 10, 200, 1),(35, 10, 200, 1), (36, 10, 200, 1), (37, 10, 200, 1), (38, 10, 200, 1), (39, 10, 200, 1)"]);


          gatherSyncData(object, vendeurId).then(
          function(success){ 
            console.log(success);
            if(success.data.ids != null)
              {
                var object = success.data.ids;
                var id_dbs = [];
                var ids = [];
                for(key in object)
                {
                  id_dbs.push(object[key]);
                  ids.push(key);
                  requests.push('UPDATE missions SET id_db = '+object[key]+' WHERE id = '+key+';');
                }
                console.log(success.data.ids);
                if(id_dbs.length > 0)
                  {
                    requests.push('UPDATE missions SET synced = 1 WHERE id_db IN ('+id_dbs.join(",")+')');
                  }
                if(ids.length > 0)
                  {
                    requests.push('UPDATE missions SET synced = 1 WHERE id IN ('+ids.join(",")+')');
                  }

              }
            var addonsMissions = [], addonsClients = [], addonsRoutes = [], addonsArticles = [];
            
            if(success.data.missions != null && success.data.missions.length > 0)
            {
              if(success.data.missions.length < 500)
              {

                for(var i = 0 ; i < success.data.missions.length ; i++)
                {
                  addonsMissions.push(convertMissionObjectToRequestOption(success.data.missions[i]));
                }
                requests.push("INSERT INTO missions(id_db, code_mission, client_id, route_id, date_start, synced, state, timestamp) VALUES "+addonsMissions.join(", ")+";");
              }
              else
              {
                var array_output = []; 
                var max = 500;
                for(var i = 0 ; i < success.data.missions.length ; i+=max)
                { 
                  array_output.push(success.data.missions.slice(i, i+max));
                }
                console.log(array_output);
                for(var i = 0 ; i < array_output.length ; i++)
                {
                  var missions = array_output[i];
                  for(var j = 0 ; j < missions.length ; j++)
                  {
                    addonsMissions.push(convertMissionObjectToRequestOption(missions[j]));
                  }
                  requests.push("INSERT INTO missions(id_db, code_mission, client_id, route_id, date_start, timestamp) VALUES "+addonsMissions.join(", ")+";");
                  addonsMissions = [];
                }
              }
            }

            var marques = success.data.marques;
            if(marques != null && marques.length > 0)
            {
              var addonsMarques = [];
              for(var i = 0; i < marques.length ; i++)
              {
                addonsMarques.push(convertMarqueObjectToRequestOption(marques[i]));
              }
              requests.push("DELETE FROM marque;");
              requests.push("INSERT INTO marque(id, marqueArticle, logo) VALUES "+addonsMarques.join(", ")+";");
            }

            var articles = success.data.articles;
            if(articles != null && articles.length > 0)
            {
              if(articles.length < 500)
              {
                var ids = [];
                for(var i = 0 ; i < articles.length ; i++)
                {
                  ids.push(articles[i].id);
                  addonsArticles.push(convertArticleObjectToRequestOption(articles[i]));
                }
                requests = requests.concat(UpdateFactory.deleteThem("articles", "id_db", ids));
                requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion, timestamp) VALUES "+addonsArticles.join(", ")+";");
                ids = [];
                addonsArticles = [];
              }
              else
              {
                var max = 500;
                var array_articles_output = [];
                for(var i = 0 ; i < articles.length ; i+=max)
                { 
                  array_articles_output.push(articles.slice(i, i+max));
                }
                for(var i = 0 ; i < array_articles_output.length ; i++)
                {
                  var ids = [];
                  var articles_group = array_articles_output[i];
                  for(var j = 0 ; j < articles_group.length ; j++)
                  {
                    ids.push(articles_group[j].timestamp);
                    addonsArticles.push(convertArticleObjectToRequestOption(articles_group[j]));
                  }
                  requests = requests.concat(UpdateFactory.deleteThem("articles", "id_db", ids));
                  requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion, timestamp) VALUES "+addonsArticles.join(", ")+";");
                  addonsArticles = [];
                  ids = [];
                }
              }
            }
            





            
            if(success.data.routes != null && success.data.routes.length > 0)
            {
              var ids = [];
              for(var i = 0 ; i < success.data.routes.length ; i++)
              {
                ids.push(success.data.routes[i].id);
                addonsRoutes.push(convertRouteObjectToRequestOption(success.data.routes[i], vendeurId));
              }
              requests = requests.concat(UpdateFactory.deleteThem("routes", "id_db", ids, null, { clients: "route"}));
              requests.push("INSERT INTO routes(id_db, code, nom, desactive, vendeur, timestamp) VALUES "+addonsRoutes.join(", ")+" ;");
              ids = [];
              addonsRoutes = [];
            }
            if(success.data.clients != null && success.data.clients.length > 0)
            {
              var ids = [];
              for(var i = 0 ; i < success.data.clients.length ; i++)
              {
                ids.push(success.data.clients[i].id);
                addonsClients.push(convertClientObjectToRequestOption(success.data.clients[i]));
              }
              requests = requests.concat(UpdateFactory.deleteThem("clients", "id_db", ids));
              requests.push("INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email, golden_store, route, timestamp) VALUES"+ addonsClients.join(", ")+";");
              ids = [];
              addonsClients = [];
            }
            if(requests.length > 0)
            {
              console.log(requests);
              angular.forEach(requests, function(request){
                var test  = 0;
                console.log(request);
                deferred.resolve(request);
                DB.query(request).then(
                function(success){
                  console.log(success);
                  deferred.resolve(success);
                },  
                function(error){
                  console.log(error);
                  deferred.resolve("Erreur lors de la synchronisation !");
                });
              });
            }
            else
            {
              deferred.resolve("Votre Base de donnée est maintenant à jour !");
            }
          }, 
          function(error){
            deferred.reject("ERREUR LORS DE L'OBTENTION DES DONNEES !!");
          });
      }, 
      function(error){
        deferred.reject(error);
      });
    
    return deferred.promise;
  }

  function gatherSyncData(syncData, vendeurId)
  {
      var request = {
        url: "http://197.230.28.154:81/newsales/rest/vendors/"+vendeurId+"/mobile/synchronisation",
        method: "POST",
        data: syncData
      };
      $log.debug(request);
      return $http(request);
  }
  function combineOutputAndInput(vendeurId)
  {
    $log.debug("Hello")
    var inputData = gatherSyncOutputData(vendeurId);

    var outputData = syncCommandes(vendeurId);

    var surveys = Surveys.addSurveysToDB();

    var methodePaiements = ModePaiement.addToDB();

    var promotions = Promotions.syncPromotions();

    var callSteps = CallSteps.sync();

    var sbds = SBD.syncSBDFromAPI();

    var quotas = Quotas.sync(vendeurId);

    var planTarifaire = PlanTarifaire.addToDB();

    var stockVendeurInput = Chargement.syncInput(vendeurId);

    var stockVendeurOutput = Chargement.syncOutput(vendeurId);

    return $q.all(new Array(inputData, outputData, surveys, methodePaiements, promotions, callSteps, sbds, quotas, planTarifaire, stockVendeurInput, stockVendeurOutput));
  }
  function maxOfEach(idVendeur)
  {
    var sql_query = "select ifnull(r.timestamp, 0) AS max_routes, ifnull((SELECT timestamp FROM articles ORDER BY timestamp DESC LIMIT 1), 0) as max_articles, ifnull((SELECT m.timestamp FROM missions m WHERE m.route_id IN (SELECT r.id_db FROM routes r WHERE r.vendeur = ?) ORDER BY m.timestamp DESC LIMIT 1),0) AS max_missions, ifnull((SELECT c.timestamp FROM clients c WHERE c.route IN (SELECT r.id_db FROM routes r WHERE r.vendeur = ?) ORDER BY c.timestamp DESC LIMIT 1),0) AS max_clients from routes r WHERE r.vendeur = ? ORDER BY r.timestamp DESC LIMIT 1;";
    var bindings = [idVendeur, idVendeur, idVendeur];
    return DB.query(sql_query, bindings).then(
      function(success){
        return DB.fetch(success);
      }, 
      function(error){
        return error;
      });
  }

  function gatherSyncOutputData(idVendeur)
  {
      var deferred = $q.defer();
      var data = {
        maxClient: 0,
        maxItem: 0,
        maxRoute: 0,
        maxMission: 0
      };

      maxOfEach(idVendeur).then(
        function(success){
          if(success == null)
          {
            deferred.resolve(data);
          }
          else
          {
            data.maxClient = typeof success.max_clients != "undefined" ? success.max_clients : data.maxClient;
            data.maxRoute = typeof success.max_routes != "undefined" ? success.max_routes : data.maxRoute;
            data.maxMission = typeof success.max_missions != "undefined" ? success.max_missions : data.maxMission;
            data.maxItem = typeof success.max_articles != "undefined" ? success.max_articles : data.maxItem;
            deferred.resolve(data);
          }
        }, 
        function(error){
          console.log("TOOK THE DEFAULT ONE !");
          deferred.reject(data);
        });
      return deferred.promise;
  }

})

.factory("Profile", function(DB){

  return {
    getProfile : getProfile,
    addProfile : addProfile,
     getGPAccount :  getGPAccount,
     updateGPAccount : updateGPAccount,
     getProfiles :getProfiles

  };

  function addProfile(profile)
  {
    var sql_query = "INSERT INTO profiles(name, second_name, address, email_address, phone_number, id_account) values(?,?,?,?,?,?);";
    var bindings = [profile.name, profile.second_name, profile.address, profile.email_address, profile.phone_number, profile.id_account];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      },
      function(error){
        return error;
      });
  }

  function getProfile(account_id)
  {
    var sql_query = "SELECT * FROM profiles WHERE id = ?";
    var bindings = [account_id];
    return DB.query(sql_query, bindings)
    .then(
      function(profile){
        return DB.fetch(profile);
      },
      function(error){
        return error.message;
      })
  }

  function getProfiles()
  {
    console.log("inside getProfiles");
    var sql_query = "SELECT * FROM profiles";
    return DB.query(sql_query)
    .then(
      function(profiles){
        console.log("Success getProfiles();");
        console.log("674 :"+JSON.stringify(profiles));
        return DB.fetchAll(profiles);
      },
      function(error){
        console.log("Erreur getProfiles();");
        console.log(JSON.stringify(error));
        return error;
      })
  }
  function getGPAccount()
  {
    var sql_query = "SELECT golden_points FROM profiles WHERE id = 1";
    
    return DB.query(sql_query)
    .then(
      function(profile){
        return DB.fetch(profile);
      },
      function(error){
        return error.message;
      })
  }
  function updateGPAccount(value)
  {
    var sql_query = "UPDATE golden_points SET golden_points = ? WHERE id = 1";
    var bindings = [value];
    return DB.query(sql_query)
    .then(
      function(profile){
        return DB.fetch(profile);
      },
      function(error){
        return error.message;
      })
  }
})
.factory('DumpDB', function(DB){
  return {
    dump : dump
  };
  function dump(array){
    angular.forEach(array, function(request){
      DB.query(request).then(function(success){console.log(JSON.stringify(success))}, function(success){console.log(JSON.stringify(success))});
    })
  }
})
.factory("SBD", function(DB, $http, $q){
  return  {
    getNonConsumedSBDs : getNonConsumedSBDs,
    syncSBDFromAPI : syncSBDFromAPI,
    SBDTreatment : SBDTreatment,
    sbdConsumed : sbdConsumed
  };


  function getNonConsumedSBDs()
  {
    var ids = [];
    var sbds = JSON.parse(window.localStorage['sbd'] || "[]");
    for(var i = 0, len = sbds.length ; i < len ; i++)
    {
      var sbd = sbds[i];
      if(!sbd.consumed)
      {
        for(var j = 0, _len = sbd.articles.length ; j < _len ; j++)
        {
          var articleId = sbd.articles[j].id;
          ids.push(articleId);
        }
      }
    }
    sbds = null;
    return ids;
  }

  function getArticleQty(article)
  {
    return ( (article.packet*article.unitConversion) + article.unit );
  }

  function sbdConsumed(id)
  {
    var sbds = JSON.parse(window.localStorage['sbd'] || "[]");
    for(var i = 0, len = sbds.length ; i < len ; i++)
    {
      var sbd = sbds[i];
      if(id == sbd.id && sbd.consumed)
      {
        return true;
      }
      else
      {
        continue;
      }
    }
    sbds = null;
    return false;
  }

  function SBDTreatment(item)
  {
    var sbds = JSON.parse(window.localStorage['sbd'] || '[]');
    for(var i = 0, len = sbds.length ; i < len ; i++)
    {
      var sbd = sbds[i];
      if(item.groupeSBD == sbd.id)
      {
        //
        var total = 0;
        for(var j = 0 , len = sbd.articles.length ; j < len ; j++)
        {
          var sbdArticle = sbd.articles[j];
          if(sbdArticle.id == item.id_db)
          {
            //Now that the condition is true we should modiy the qty in the inner article of items's group
            //Set the qty of the item
            var qty = getArticleQty(item);
            sbdArticle.qty = qty;
          }
          total+=sbdArticle.qty;
        }
        sbd.consumed = (total >= sbd.min);
        window.localStorage['sbd'] = JSON.stringify(sbds);
        //Now that all the modifications are setted then we must exit !!
        //Because an item can be found in only one SBD group so one time tie found there is no 
        //need to continue the iteration ...
        return;
      }
      else
      {
        // I know it's unuseful but i like it ;)
        continue;
      }
    }
  }

  function syncSBDFromAPI()
  {

    var deferred = $q.defer();
    var request = {
      url: 'http://197.230.28.154:81/newsales/rest/classes/getAllClasseVerboseDTOs',
      method: 'GET'
    };
    $http(request).then(
      function(success){
        console.log(success);
        angular.forEach(success.data, function(classe){
          addSBDToDB(classe.classeTitle, classe.groupes);
          
        });
      },
      function(error){
        deferred.reject(error);
      });

    deferred.resolve("OK");
    return deferred.promise;
  }

  function addSBDToDB(classeTitle, groupes)
  {
    var sql_query = "INSERT INTO groupes_sbd(id_db, qte_min, classe) VALUES(?,?,?);";
    angular.forEach(groupes, function(groupe){
      var bindings = [groupe.id, groupe.qtyMin, classeTitle];
      DB.query(sql_query, bindings).then(
        function(success){
          console.log("THE GROUPE HAS BEEN ADDED successfully ! waiting for article bindings");
          console.log(success);
          angular.forEach(groupe.itemIds, function(itemId){
            addArticleSBD(itemId, groupe.id).then(
              function(success){
                console.log("ARTICLE_SBD ADDED successfully");
                console.log(success);
              },
              function(error){
                console.log(error);
              });
          });
        },
        function(error){
          console.log(error);
        });
    });
  }

  function addArticleSBD(idArticle, idGroupe)
  {
    var sql_query = "INSERT INTO article_sbd(id_groupe_sbd, id_article) VALUES(?,?);";
    var bindings = [idGroupe, idArticle];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      });
  }
})

.factory("LignesCommandes", function(DB){
  return {
    getAllCommandes : getAllCommandes,
    getCommandeByMission : getCommandeByMission,
    getCommandesByClient : getCommandeByClient,
    getAllLigneCommandesByCommande : getAllLigneCommandesByCommande,
    getLivreurMission : getLivreurMission
  };

  function findArticleInLastCommande(_idCommande, _idArticle)
  {
    var sql_query = "SELECT * FROM ligneCommandes WHERE id_commande = ? AND id_article = ?;";
    var bindings = [_idCommande, _idArticle];
    return DB.query(sql_query, bindings).then(
      function(ligneCommande){
        return DB.fetch(ligneCommande);
      },
      function(error){
        return error;
      });
  }

  function findMarqueInLastCommande()
  {

  }

  function getAllLigneCommandesByCommande(id_commande){

    var sql_query = "SELECT * FROM ligneCommandes WHERE id_commande = ?";
    var bindings = [id_commande];
    return DB.query(sql_query, bindings).then(
      function(lignesCommandes){
        return DB.fetchAll(lignesCommandes);
      }, 
      function(error){
        return error;
      }
      );
  }

})
.factory('EntryPoint', function($q, Promotions, Articles, Surveys, Clients, DB){

  return {
    prepare : prepare
  };
  function prepare(clientId, livreur)
  {

      if(livreur)
      {
        var objectStock = {};
        window.localStorage['stock'] = JSON.stringify(objectStock);
        Clients.getClient(clientId).then(

          function(success){

            var object =JSON.parse(window.localStorage['mission'] || '{}');
            object.nom = success.nom+" "+success.prenom;
            object.codeClient = success.code_client;
            object.region = "GRAND CASABLANCA";
            object.route_id = success.route;
            object.ville = "CASABLANCA";
            object.adresse = success.address;
            window.localStorage['mission'] = JSON.stringify(object);
          }, 
          function(error){
            window.localStorage['client'] = '{}';
          });
      }
      console.log(clientId);
      var deferred = $q.defer();

      var mission = JSON.parse(window.localStorage['mission'] || '{}');

      var firstEntry = { mission : typeof mission.id_mission == "undefined" ? null : mission.id_mission, items : [] };

      if(typeof window.localStorage["surveys"] == "undefined" || typeof window.localStorage["cart"] == "undefined" || typeof window.localStorage["promotions"] == "undefined" || typeof window.localStorage["sbd"] == "undefined")
      {


        //INITIALIZE THE CART !!
        if(typeof window.localStorage["cart"] == "undefined")
        {
          window.localStorage["cart"] = JSON.stringify(firstEntry);
        }

        //INITIALIZE THE SURVEYS !!
        if(typeof window.localStorage["surveys"] == "undefined")
        {
          Surveys.getFormattedSurveys().then(
            function(surveys){
              window.localStorage["surveys"] = JSON.stringify(surveys);
              deferred.resolve("OK");
            }, 
            function(error){
              window.localStorage["surveys"] = JSON.stringify([]);
              deferred.reject("PROBLEM");
            });
        }

        //INITIALIZE THE PROMOTIONS !!
        if(typeof window.localStorage["promotions"] == "undefined")
        {
            
           Promotions.getClientPromotions(clientId).then(
            function(result){
              console.log(result);
                var articles = [];
                var promotions = [];
                angular.forEach(result, function(promotion){
                  console.log(promotion);
                    promotion.articles = promotion.articles != null ? JSON.parse(promotion.articles ) : [];
                    promotion.inclusions = promotion.inclusions != null ? JSON.parse("["+promotion.inclusions+"]" || "[]") : [];
                    promotion.exclusions = promotion.exclusions != null ? JSON.parse("["+promotion.exclusions+"]" || "[]") : [];
                    promotion.gratuites = promotion.gratuites != null ? JSON.parse(promotion.gratuites || "[]") : [];
                    promotion.promotion_palier = JSON.parse(promotion.promotion_palier || "[]");
                    promotion.consumed = (promotion.type == "PR") ? true : false;
                    console.log(promotion);
                });
                window.localStorage["promotions"] = JSON.stringify(result);
                deferred.resolve("OK");

            }, 
            function(error){
                console.log(error.message);
                deferred.reject("PROBLEM");
            });
        }

        //INITIALIZE THE SBD !!
        if(typeof window.localStorage['sbd'] == 'undefined')
        {
            Articles.getArticleWithSBD().then(
            function(result){

                var sbds = [];
                for(var h = 0, len = result.length ; h < len ; h++)
                {
                    console.log(h)
                    var sbd = result[h];
                    var object = {};
                    object.id = sbd.id;
                    object.min = sbd.min;
                    object.consumed = false;
                    object.articles = [];

                    var array = JSON.parse("["+sbd.articles+"]" || "[]");
                    //TO AVOID THE CONFLICT BETWEEN (len && _len) IF THE BOTH HAVE THE SAME VARIABLE THE SECOND IS OVERWRITTEN BY THE SECOND !
                    for(var i = 0 , _len = array.length ; i < _len ; i++)
                    {
                      var _id = array[i];
                      var article = {
                        id: _id,
                        qty: 0
                      };
                      object.articles.push(article);
                    }

                    sbds.push(object);
                }
                window.localStorage['sbd'] = JSON.stringify(sbds);
                deferred.resolve("OK");
            }, 
            function(error){
                console.log(error.message);
                deferred.resolve("PROBLEM");
            });
        }



      }
      return deferred.promise;
  }
})
.factory("PrinterService", function($q, $filter, DateUtilities){

  var header = 
                "PW 831\r\n" +
                "TONE 0\r\n" +
                "SPEED 3\r\n" +
                "ON-FEED IGNORE\r\n" +
                "NO-PACE\r\n" +
                "BAR-SENSE\r\n";
  // All titles proper to the receips
  var constants = 
                "L 2 109 828 109 2\r\n" +
                "T 5 0 10 147 Nom client :\r\n" +
                "T 5 0 10 121 Code client :\r\n" +
                "T 5 0 500 34 Route :\r\n" +
                "T 5 0 10 199 Ville :\r\n" +
                "T 5 0 260 254 Commande No :\r\n" +
                "T 5 0 11 172 Adresse :\r\n" +
                "T 5 0 500 60 Region :\r\n" +
                "T 4 0 326 11 DISLOG\r\n" + 
                "T 5 0 10 11 Date :"+DateUtilities.convertLongToYYYYMMDD(new Date())+"\r\n" +
                // LABELS DES LIGNES DE COMMANDES !
                "T 5 0 716 340 MT TTC\r\n" +
                "T 5 0 624 340 PU\r\n" +
                "T 5 0 353 340 C/U\r\n" +
                "T 5 0 484 340 Remise\r\n";
  // TEXT FONT AND SIZE !
  var fontAndSize = "T 7 0";
  // y step
  var yStep = 30;
  // ("x", y) x coords for items's receips !
  var xDesignation = 10;
  var xCU = 353;
  var xRemise = 484;
  var xPU = 624;
  var xMTTTC = 716;
  var xFooterTitle = xRemise - 30;
  var xFooterValue = xPU + 40;
  // y to start from !! 
  
  var footer = "PRINT\r\n";


  return {
    formatedContent : formatedContent
  };

  function formatedContent(input, poste)
  {
    var deferred = $q.defer();
    var count = 1;
    var output = [];
    var lignes = input[0];
    console.log(lignes);
    var mission = input[1];

    var totalHT = $filter('number')(input[2], 2);
    var totalTTC = $filter('number')(input[3], 2);

    var discount = input[4]+"%";

    var vendeur = JSON.parse(window.localStorage['profile'] || '{}');

    var addons =  "T 5 0 500 9 "+poste+" :\r\n" +
                  "T 7 0 168 122 "+mission.codeClient+"\r\n" +
                  "T 5 0 10 340 Designation("+lignes.length+")\r\n"+
                  "T 7 0 630 60 "+mission.region+"\r\n" +
                  "T 7 0 150 148 "+mission.nom+"\r\n" +
                  "T 7 0 630 35 "+mission.route_id+"\r\n" +
                  "T 7 0 150 199 "+mission.ville+"\r\n" +
                  "T 7 0 150 173 "+mission.adresse+"\r\n" +
                  "T 7 0 437 254 "+(typeof(mission.commande) == "undefined" ? "CM"+DateUtilities.convertLongToYYYYMMDD(new Date()) : mission.commande)+"\r\n" +
                  "T 7 0 630 9 "+vendeur.name+" "+vendeur.second_name+"\r\n";

    var startLigneCommande = 370;
    for(var i = 0 ; i < lignes.length ; i++)
    {
      var test = i+1;
      if(test%10 == 0)
      {
        count = count + 1;
      }
      var loopOutput = [];
      var ligne = lignes[i];
      var cu = ligne.packet+"/"+ligne.unit;
      var mTTC = ( ( ( ligne.unitConversion * ligne.packet ) + ligne.unit ) * ligne.prixVente );

      mTTC = $filter('number')(mTTC, 2);
      ligne.prixTTC = $filter('number')(ligne.prixTTC, 2);
      ligne.remise = $filter('number')(ligne.remise, 2);
      ligne.prixVente = $filter('number')(ligne.prixVente, 2);

      loopOutput.push(fontAndSize+" "+xDesignation+" "+startLigneCommande+" "+(typeof(ligne.nomArticle) == "undefined" ? ligne.designation : ligne.nomArticle)+"\r\n");
      loopOutput.push(fontAndSize+" "+xCU+" "+startLigneCommande+" "+cu+"\r\n");
      loopOutput.push(fontAndSize+" "+xRemise+" "+startLigneCommande+" "+ligne.remise+"\r\n");
      loopOutput.push(fontAndSize+" "+xPU+" "+startLigneCommande+" "+ligne.prixVente+"\r\n");
      loopOutput.push(fontAndSize+" "+xMTTTC+" "+startLigneCommande+" "+(typeof(ligne.prixTTC) == "undefined" ? "0.00" : ligne.prixTTC)+"\r\n");
      output = output.concat(loopOutput);
      startLigneCommande += yStep;
    }
    startLigneCommande+=40;
    var preFooter = [];
    for(var i = 0 ; i < 3 ; i++)
    {
      var tempArray;
      if(i == 0)
      {
        tempArray = [
          "T 5 0 "+xFooterTitle+" "+startLigneCommande+" "+"TOTAL HT : \r\n",
          "T 7 0 "+xFooterValue+" "+startLigneCommande+" "+totalHT+" DHS\r\n"
        ]
      }
      else if(i == 1)
      {
        tempArray = [
          "T 5 0 "+xFooterTitle+" "+startLigneCommande+" "+"ESCOMPTEMT : \r\n",
          "T 7 0 "+xFooterValue+" "+startLigneCommande+" "+discount+"\r\n"
        ]
      }
      else
      {
        tempArray = [
          "T 5 0 "+xFooterTitle+" "+startLigneCommande+" "+"TOTAL TTC : \r\n",
          "T 7 0 "+xFooterValue+" "+startLigneCommande+" "+totalTTC+" DHS\r\n"
        ]
      }
      preFooter = preFooter.concat(tempArray);
      startLigneCommande += 40;
    }


    // test 400
    deferred.resolve("! 0 200 200 1500 1\r\n"+header+constants+addons+output.join("")+preFooter.join("")+footer);
    return deferred.promise;
  }

})
.factory("CallSteps", function(DB, $q, $http){

  return {
    get : get,
    checkForSteps : checkForSteps,
    checkPoint : checkPoint,
    sync : sync
  };

  function sync()
  {
    console.log("we are in ");
    var deferred = $q.defer();
    // DO IT !!!!!!!!!!!!!! "+JSON.parse(window.localStorage["profile"]).activite+"
    $http.get("http://197.230.28.154:81/newsales/rest/screens/activities/1/mobile")
    .then(
      function(success){
        console.log(success);
          var addonsSteps = [];
          var requests = [];
          var steps = success.data.content;
          for(var i = 0 ; i < steps.length ; i++)
          {
            var step = steps[i];
            addonsSteps.push('("", "'+step.urlName+'", '+step.order+')');
          }
          if(addonsSteps.length > 0)
          {
            requests.push("DELETE FROM call_steps;");
            requests.push("INSERT INTO call_steps(title, name, rank) VALUES "+addonsSteps.join(", ")+";");
          }
          deferred.resolve(requests);
      }, 
      function(error){
        console.log(error);
        deferred.reject(error);
      });
    return deferred.promise;
  }

  function checkPoint()
  {
    var deferred = $q.defer();
    var otherwise = "";
    var callSteps = JSON.parse(window.localStorage['callSteps'] || '[]');
    for(var i = 0 ; i < callSteps.length ; i++)
    {
      if(callSteps[i].active)
      {
        deferred.resolve(callSteps[i].name)
      }
      if(callSteps[i].rank == 1)
      {
        otherwise = callSteps[i].name;
      }
    }
    deferred.resolve(otherwise);
    return deferred.promise;
  }

  function checkForSteps(state_name)
  {
    console.log("HEEEERE");
    var deferred = $q.defer();
    var callSteps = JSON.parse(window.localStorage['callSteps'] || '[]');
    if(!callSteps.length > 0)
    {
      deferred.resolve({});
      return deferred.promise;
    }
    // TO GET INFORMATIONS ABOUT THE LAST STEP !
    var lastStep = { rank: callSteps[0].rank, name: callSteps[0].name, title:  callSteps[0].title };
    // TO GET INFORMATIONS ABOUT THE FIRST STEP !
    var firstStep = { rank: callSteps[0].rank, name: callSteps[0].name, title:  callSteps[0].title };
    var currentStep = 0;
    var found = false;
    var object = {};
    for(var i = 0 ; i < callSteps.length ; i++)
    {
        if(callSteps[i].name == state_name)
        {
            // SET TO FOUND 
            found = true;
            // SET CURRENT STEP TO ACTIVE FOR CHECKPOINT !!
            callSteps[i].active = true;
            // GATHER THE CURRENT STEP !!
            object.currentStep = { rank: callSteps[i].rank, name: callSteps[i].name, title:  callSteps[i].title};
            currentStep = callSteps[i].rank;
            for(var j = 0 ; j < callSteps.length ; j++)
            {
              if(callSteps[j].rank > callSteps[i].rank)
              {
                // GATHER THE NEXT STEP !!
                if((callSteps[j].rank - callSteps[i].rank) == 1)
                {
                  object.nextStep = { rank: callSteps[j].rank, name: callSteps[j].name, title: callSteps[j].title};
                }
              }
              if(callSteps[j].rank < callSteps[i].rank)
              {
                // GATHER THE PREVIOUS STEP !!
                if((callSteps[j].rank - callSteps[i].rank) == -1)
                {
                  object.previousStep = { rank: callSteps[j].rank, name: callSteps[j].name, title: callSteps[j].title};
                }
              }
            }
        }
        else
        {
          callSteps[i].active = false;
        }
        if(callSteps[i].rank > lastStep.rank)
        {
            lastStep.rank = callSteps[i].rank;
            lastStep.name = callSteps[i].name;
            lastStep.title = callSteps[i].title;
            object.lastStep = lastStep;
        }
        if(callSteps[i].rank < firstStep.rank)
        {
          firstStep.rank = callSteps[i].rank;
          firstStep.name = callSteps[i].name;
          firstStep.title = callSteps[i].title;
          object.firstStep = firstStep;
        }
    }
    // CHECK IF THIS CURRENT STEP HAS A NEXT STEP !!
    object.hasNext = ( found && currentStep < lastStep.rank) ? true : false;
    // CHECK IF THIS CURRENT STEP HAS A PREVIOUS STEP !!
    object.hasPrevious = ( found && currentStep > firstStep.rank) ? true : false;
    // SAVE CURRENT STATUS TO LOCAL STORAGE !!
    window.localStorage['callSteps'] = JSON.stringify(callSteps);
    deferred.resolve(object);
    return deferred.promise;
  }

  function get()
  {
    var sql_query = "SELECT * FROM call_steps ORDER BY id ASC";
    return DB.query(sql_query).then(
      function(success){
        return DB.fetchAll(success);
      }, 
      function(error){
        return error;
      });
  }

})
.factory("Livreur", function($http, DB, $q, Missions, Clients, Commandes, LigneCommandes){


  function cancelLivreurMission(idMission)
  {
    var sql_query = "UPDATE missions_livreur SET state = 2 WHERE id_db = ?";
    var bindings = [idMission];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success
      }, 
      function(error){
        return error;
      });
  }
  function getHighestInDB(idVendeur)
  {
    //First get the highest mission in local db !
    var sql_query = "SELECT id_db FROM missions_livreur WHERE livreur = ? ORDER BY id_db DESC LIMIT 1";
    var bindings = [idVendeur];
    return DB.query(sql_query, bindings).then(
      function(success){
        return DB.fetch(success);
    },
      function(error){
        return error;
      });
  }


  function getHighestInApi(_idLivreur)
  {
    var request = {
      url: "http://197.230.28.154:81/newsales/rest/livreurs/"+_idLivreur+"/missions/check",
      method: "GET"
    };
    return $http(request);
  }

  function getAllFromApi(_idLivreur)
  {
    var request = {
      url: "http://197.230.28.154:81/newsales/rest/livreurs/"+_idLivreur+"/missions",
      method: "GET"
    };
    return $http(request);
  }


  function getFromAPointApi(_idLivreur, point)
  {
    var request = {
      url: "http://197.230.28.154:81/newsales/rest/livreurs/"+_idLivreur+"/missions/from/"+point,
      method: "GET"
    };
    return $http(request);
  }
  
  function addMissionsSpecialLivreur(missions, _idLivreur)
  {
    angular.forEach(missions, function(mission){
        Clients.getClient(mission.client.id).then(
          function(success){
            if(success == null)
            {
              console.log(mission.client);
              Clients.addClientLivreur(mission.client).then(
                function(success){
                  console.log(success);
                }, 
                function(error){
                  console.log(error);
                });
            }
          }, 
          function(error){
            console.log(error);
          });

        var object = {
          id : mission.id,
          codeMission : mission.codeMission,
          client : mission.client.id
        };
        Missions.addMissionLivreur(object, _idLivreur).then(
          function(success){
            console.log(success);
            Commandes.addCommandeLivreur(mission.commande.id, "CE"+Date.now(), mission.id, mission.client.id).then(
              function(success){
                console.log(success);
                angular.forEach(mission.commande.lignesCommandes, function(ligne){
                  var ligneCommande = {
                    id: ligne.item.id,
                    unit: ligne.unite,
                    packet: ligne.paquet,
                    prixVente: ligne.item.salePrice
                  };
                  LigneCommandes.addLigneCommandeLivreur(ligneCommande, mission.commande.id).then(
                    function(success){
                      console.log(success);
                    }, 
                    function(error){
                      console.log(error);
                    });
                });

              }, 
              function(error){
                console.log(error);
            });
          }, 
          function(error){
            console.log(error);
          });

        
  });
  }

  function getLivreurMission(_idLivreur)
  {
    var sql_query = 'SELECT ML.id_db as missionId, ML.state AS state,  ML.code_mission, CLI.id_db as clientId, CLI.nom AS nom, CLI.address AS address, CLI.prenom AS prenom, CL.code_commande, CL.id_db AS id_commande, "["||Group_Concat("{ ""id_db"": "||LCL.id_article|| ", ""remise"": " || ifnull(LCL.remise, 0) || ", ""groupeSBD"": " || ifnull(GSBD.id_db, 0) || ", ""tva"": " || ART.tva || ", ""isGift"": " || ifnull(LCL.isGift, 0) || ", ""unitStock"": " || ifnull((SELECT unit FROM stock_livreur WHERE item = LCL.id_article AND livreur = ?), 0) || ",  ""packetStock"": " || ifnull((SELECT packet FROM stock_livreur WHERE item = LCL.id_article AND livreur = ?), 0) || ", ""designation"": """||ART.nomArticle||""", ""unit"": "||LCL.unit||", ""promotions"": [" || ifnull((SELECT Group_Concat(P.id_db) FROM articles AS A LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id WHERE A.id_db = LCL.id_article), "") ||"],  ""prixVente"": "||LCL.pu_ht||", ""unitConversion"": " || ART.unitConversion || ", ""packet"": "||LCL.packet||" }")||"]" as lignes from missions_livreur AS ML LEFT JOIN clients AS CLI ON CLI.id_db = ML.client_id JOIN commandes_livreur AS CL ON CL.id_mission = ML.id_db JOIN ligneCommandes_livreur AS LCL ON LCL.id_commande = CL.id_db JOIN articles AS ART ON ART.id_db = LCL.id_article LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = ART.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE ML.livreur = ? AND LCL.isGift = 0 GROUP BY ML.id_db;';
    var bindings = [_idLivreur, _idLivreur, _idLivreur];
    return DB.query(sql_query, bindings).then(
      function(success){
        return DB.fetchAll(success);
      }, 
      function(error){
        return error;
      });
  }

  function synchronization(_idLivreur)
  {
    //First we get the local highest id !
    var highestIDDB;
    var highestIDAPI;
    getHighestInDB(_idLivreur).then(
      function(success){
        console.log(success);
        if(success == null)
        {
          getAllFromApi(_idLivreur).then(
            function(success){
              addMissionsSpecialLivreur(success.data, _idLivreur);
            }, 
            function(error){
              return error;
            });
        }
        else
        {
          highestIDDB = success.id_db;
          getHighestInApi(_idLivreur).then(
            function(success){
              highestIDAPI = success.data;
              if(highestIDAPI > highestIDDB)
              {
                console.log("MISSIONS REMAINING FOR LIVREUR !");
                getFromAPointApi(_idLivreur, highestIDDB).then(
                  function(success){
                    addMissionsSpecialLivreur(success.data, _idLivreur);
                  }, 
                  function(error){
                    console.log(error);
                  })
              }
            }, 
            function(error){
              console.log(error);
            });
        }      
      }, 
      function(error){
        console.log(error);
      });
  }


  return {
    synchronization : synchronization,
    getLivreurMission : getLivreurMission,
    cancelLivreurMission : cancelLivreurMission
  };

})

.factory("LigneCommandes", function(DB, $q){
  return {
    getLigneCommande : getLigneCommande,
    addLigneCommande : addLigneCommande,
    addLigneCommandeLivreur :addLigneCommandeLivreur,
    pastPurchacedQuantity : pastPurchacedQuantity,
    convertLines : convertLines,
    convertLine : convertLine,
    addLinesToDB : addLinesToDB
  };

  function convertLines(commande_id, lines)
  {
    var options = [];
    for(var i = 0, len = lines.length ; i < len ; i++)
    {
      var line = lines[i];
      options.push(convertLine(commande_id, line));
    }
    return options;
  }

  function convertLine(commande_id, line)
  {
    return "("+commande_id+", "+(line.id_db || line.id)+", "+line.unit+", "+line.packet+", "+(line.prixVente == 0 ? 1 : 0)+", "+(line.remise || 0)+", "+(line.ht || 0)+")";
  }

  function addLinesToDB(commande_id, lines)
  {
    var deferred = $q.defer();

    var sql_query = "INSERT INTO ligneCommandes(id_commande, id_article, unit, packet, isGift, remise, pu_ht) VALUES "+convertLines(commande_id, lines)+";";
    return DB.query(sql_query).then(
      function(success){
        deferred.resolve(success);
      }, 
      function(error){
        deferred.reject(error);
      });

    return deferred.promise;
  }

  function addLigneCommande(ligneCommande, _idCommande)
  {
    var sql_query = "INSERT INTO ligneCommandes(id_commande, id_article, unit, packet, pu_ht, isGift, remise) values(?,?,?,?,?,?,?);"
    var bindings = [_idCommande, ligneCommande.id, ligneCommande.unit, ligneCommande.packet, ligneCommande.prixVente, ligneCommande.isGift, ligneCommande.remise];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      });
  }

  function addLigneCommandeLivreur(ligneCommande, _idCommande)
  {
    var sql_query = "INSERT INTO ligneCommandes_livreur(id_commande, id_article, unit, packet, pu_ht) values(?,?,?,?,?);"
    var bindings = [_idCommande, ligneCommande.id, ligneCommande.unit, ligneCommande.packet, ligneCommande.prixVente];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      });
  }

 function pastPurchacedQuantity(_idArticle, _idMission)
  {
    var sql_query = "SELECT (LC.unit+LC.packet*10) as qty FROM ligneCommandes AS LC JOIN commandes AS C ON C.id = LC.id_commande JOIN clients AS CC ON CC.id_db = C.id_client WHERE LC.id_article = ? AND C.id_client = (SELECT lient_id FROM missions WHERE id_db = ?)  ORDER BY LC.id DESC LIMIT 3";
    var bindings = [_idArticle, _idMission];
    return DB.query(sql_query, bindings).then(
      function(ligneCommande){
        return DB.fetchAll(ligneCommande);
      }, 
      function(error){
        return error;
      });
  }

  function getLigneCommande(_id)
  {
    var sql_query = "SELECT * from ligneCommandes WHERE id_commande = ?";
    var bindings = [_id];
    return DB.query(sql_query, bindings).then(
      function(ligneCommandes){
        return DB.fetchAll(ligneCommandes);
      }, 
      function(error){
        return error;
      });
  }
})

.factory("Commandes", function(DB, $q, $http, Missions){
  return {
    getAllCommandes : getAllCommandes,
    getCommandesByMission : getCommandesByMission,
    getCommandesByClient : getCommandesByClient,
    getCommande : getCommande,
    addCommande : addCommande,
    addCommandeLivreur : addCommandeLivreur,
    getLastCommande : getLastCommande,
    getCAClient : getCAClient,
    getCAVendeur : getCAVendeur,
    getAVGClient : getAVGClient,
    syncCommandes : syncCommandes,
    sendCommandeToAPI : sendCommandeToAPI
  };

  function sendCommandeToAPI(commandes)
  {
    var commandesToAPI = [];
    for(var i = 0 ; i < commandes.length ; i++)
    {
      commandes[i].lignes = JSON.parse(commandes[i].lignes);
      commandesToAPI.push(commandes[i]);
    }
    var request = {
        url: "http://197.230.28.154:81/newsales/newsales/rest/orders/add",
        method: "POST",
        data: commandesToAPI
      };
    return $http(request);
  }

  function syncCommandes(idVendeur)
  {
    var sql_query = 'SELECT M.id AS mobile, M.client_id AS client, C.sbd as sbds, C.promotions AS promotions, M.route_id AS route, M.state AS etat, ifnull(M.id_db, 0) AS api,  "["||Group_Concat("{ ""id_article"": "||LC.id_article||", ""unite"": "||LC.unit||", ""remise"": "||ifnull(LC.remise, 0)||", ""isGift"": "||ifnull(LC.isGift, 0)||",  ""prix"": "||LC.pu_ht||", ""caisse"": "||LC.packet||" }")||"]" as lignes FROM missions AS M JOIN commandes AS C ON C.id = M.commande_id JOIN ligneCommandes AS LC ON LC.id_commande = C.id WHERE M.synced = 0 AND M.state = 1 AND M.route_id IN (SELECT id_db from routes WHERE vendeur = '+idVendeur+') GROUP BY C.id';
    return DB.query(sql_query).then(
      function(success){
        console.log("869");
        console.log(JSON.stringify(success));
        return DB.fetchAll(success);
      }, 
      function(error){
        return error;
      }); 
  }

  function getLastCommande(id_client)
  {
    var sql_query = "SELECT LC.unit AS 'units', LC.packet AS 'packets', ((LC.packet*10+LC.unit)*A.prixVente) AS 'total', A.nomArticle AS 'designation' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article WHERE LC.id_commande = (SELECT id FROM commandes WHERE id_client = ? ORDER BY id DESC LIMIT 1);";
    var bindings = [id_client];
    return DB.query(sql_query, bindings).then(
      function(commandes){
        return DB.fetchAll(commandes);
      }, 
      function(error){
        return error;
      });
  }

  function addCommande(id_mission, lines){

    var missionObject = JSON.parse(window.localStorage['mission'] || "{}");

    var sql_query = "INSERT INTO commandes(code_commande, id_mission, id_client, sbd, promotions, paymentDate, remise, paymentId) values(?,?,?,?,?,?,?,?);";
    
    var bindings = ["", id_mission, missionObject.client_id, "", "", "", "", ""];
    
    return DB.query(sql_query, bindings).then(
      function(success){

        return success;
      }, 
      function(error){
        return error;
      });
  }

  function addCommandeLivreur(id_commande, code_commande, id_mission, id_client){
    var sql_query = "INSERT INTO commandes_livreur(id_db, code_commande, id_mission, id_client) values(?,?,?,?);";
    var bindings = [id_commande, code_commande, id_mission, id_client];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      });
  }
  

  function getCommande(_id)
  {
    var sql_query = "SELECT C.code_commande AS 'code_commande', LC.unit AS 'units', LC.packet AS 'packets', ((LC.packet*10+LC.unit)*A.prixVente) AS 'total', A.nomArticle AS 'designation' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article JOIN commandes AS C ON C.id = LC.id_commande WHERE LC.id_commande = ?";
    var bindings = [_id];
    return DB.query(sql_query, bindings).then(
      function(commandes){
        return DB.fetchAll(commandes);
      }, 
      function(error){
        return error;
      });
  }



  function getCommandesByClient(id_client){
    var sql_query = "SELECT C.code_commande AS 'code_commande', LC.unit AS 'units', LC.packet AS 'packets', ((LC.packet*10+LC.unit)*A.prixVente) AS 'total', A.nomArticle AS 'designation', A.prixVente AS 'prixVente' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article JOIN commandes AS C ON C.id = LC.id_commande WHERE LC.id_commande IN (SELECT id FROM commandes WHERE id_client = ?)";
    var bindings = [id_client];
    return DB.query(sql_query, bindings).then(
      function(commandes){
        return DB.fetchAll(commandes);
      }, 
      function(error){
        return error;
      }
      );
  }



  function getAVGClient(id_client)
  {
    var sql_query = "SELECT AVG((LC.unit+(LC.packet*10))*A.prixVente) as 'avg' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article JOIN commandes AS C ON C.id = LC.id_commande WHERE LC.id_commande IN (SELECT id FROM commandes WHERE id_client = ?)";
    var bindings = [id_client];
    return DB.query(sql_query, bindings).then(
      function(avg){
        return DB.fetch(avg);
      }, 
      function(error){
        return error;
      });
  }

  function getCAClient(id_client)
  {
    var sql_query = "SELECT SUM((LC.unit+LC.packet*10)*A.prixVente) as 'ca' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article WHERE LC.id_commande IN(SELECT id FROM commandes WHERE id_client = ?)";
    var bindings = [id_client];
    return DB.query(sql_query, bindings).then(
      function(ca){
        return DB.fetch(ca);
      }, 
      function(error){
        return error;
      });
  }
  function getCAVendeur(_idVendeur)
  {
    var sql_query = "SELECT ifnull(SUM((LC.unit+(LC.packet*A.unitConversion))*A.prixVente), 0) as 'ca' FROM missions AS M JOIN commandes as C ON M.id = C.id_mission JOIN ligneCommandes AS LC ON C.id = LC.id_commande JOIN articles AS A ON  A.id_db = LC.id_article WHERE M.state = 1 AND M.date_start BETWEEN date('now', 'start of month') AND date('now', 'start of month', '+1 month', '-1 day') AND M.route_id IN (SELECT id_db FROM routes WHERE vendeur = ?)";
    var bindings = [_idVendeur];
    return DB.query(sql_query, bindings).then(
      function(ca){
        console.log(ca);
        return DB.fetch(ca);
      }, 
      function(error){
        console.log(error);
        return error;
      });
  }
  


  function getCommandesByMission(id_mission){
    var sql_query = "SELECT * FROM commandes WHERE id_mission = ?";
    var bindings = [id_mission];
    
    var deferred = $q.defer();
    DB.query(sql_query, bindings).then(

      function(commandes){
        var finalObject = [];
        var commandes = DB.fetchAll(commandes);
        angular.forEach(commandes, function(commande){
          
          var commandeCopy = commande;
          commandeCopy.ligneCommandes = [];
          var sql_query = "SELECT * FROM ligneCommandes WHERE id_commande = ?";
          var bindings = [commande.id];
          DB.query(sql_query, bindings).then(
            function(ligneCommandes){
              var result = DB.fetchAll(ligneCommandes);
              commandeCopy.ligneCommandes = result;
              finalObject.push(commandeCopy);
              deferred.resolve(finalObject);
              console.log("STEP");
            }, 
            function(error){
            });
          
        });
        
      }, 
      function(error){
        deferred.reject(error);
      }
      );
    return deferred.promise;
  }


  function getAllCommandes(){
    var sql_query = "SELECT * FROM commandes";
    var bindings = [];
    
    var deferred = $q.defer();
    DB.query(sql_query, bindings).then(

      function(commandes){
        var finalObject = [];
        var commandes = DB.fetchAll(commandes);
        angular.forEach(commandes, function(commande){
          
          var commandeCopy = commande;
          commandeCopy.ligneCommandes = [];
          var sql_query = "SELECT * FROM ligneCommandes WHERE id_commande = ?";
          var bindings = [commande.id];
          DB.query(sql_query, bindings).then(
            function(ligneCommandes){
              var result = DB.fetchAll(ligneCommandes);
              commandeCopy.ligneCommandes = result;
              finalObject.push(commandeCopy);
              deferred.resolve(finalObject);
              console.log("STEP");
            }, 
            function(error){
            });
          
        });
        
      }, 
      function(error){
        deferred.reject(error);
      }
      );
    return deferred.promise;
  }

})

.factory("Accounts", function(DB, $http){
  return {
    getAccountByUserNameAndPassword : getAccountByUserNameAndPassword,
    getAccountById : getAccountById,
    changePassword : changePassword,
    getAccountByUserName : getAccountByUserName,
    connectFromAPI : connectFromAPI,
    addAccount : addAccount,
    addGoldenPoints : addGoldenPoints

  };

  function getAccountByUserName(username){
    var sql_query = "SELECT * FROM accounts WHERE username = ?";
    var bindings = [username];
    return DB.query(sql_query, bindings).then(
      function(account){
        return DB.fetch(account);
      },
      function(error){
        return error;

      });
  }

  function changePassword(username, password, question_secrete, reponse_secrete){
    var sql_query = "UPDATE accounts SET password = ?, first_login = ?, question_secrete = ?, reponse_secrete = ? WHERE username = ?;";
    var bindings = [password, 0, question_secrete, reponse_secrete, username];
    return DB.query(sql_query, bindings);
  }

  function getAccountByUserNameAndPassword(username, password){
    var sql_query = "SELECT * FROM accounts AS A LEFT JOIN profiles AS P ON P.id_account = A.id WHERE username = ? and password = ?;";
    var bindings = [username, password];
    return DB.query(sql_query, bindings)
      .then(function(result){
          return DB.fetch(result);
        }, function(error){
          console.log(error.message);
          return error.message;
        });
  }

  function connectFromAPI(account)
  {
    var req = {
      method : "PUT",
      url : "http://197.230.28.154:81/newsales/rest/users/login?login="+account.username+"&password="+account.password+"&mobile=1"
    };
    return $http(req);
  }

  function addAccount(account)
  {
    var sql_query = "INSERT INTO accounts(id_db, username, password, first_login, question_secrete, reponse_secrete, bloque, golden_points, golden_stores, fonction, activite, token) values(?,?,?,?,?,?,?,?,?,?,?,?);";
    var bindings = [account.id_db, account.username, account.password, 1, "", "", 0, account.golden_points, account.golden_stores, account.fonction, account.activite, account.token];
    return DB.query(sql_query, bindings).then(
      function(success){
        console.log(success);
        return success;
      }, 
      function(error){
        return error;
      });
  }


  function addGoldenPoints(_idAccount, points)
  {
    var sql_query = "UPDATE accounts SET golden_points =  golden_points + ? WHERE id_db = ?";
    var bindings = [points, _idAccount];
    return DB.query(sql_query, bindings).then(
      function(success){
          return success;
      }, 
      function(error){
        return error;
      });
  }

  function getAccountById(_id){
    var sql_query = "SELECT * FROM accounts WHERE username = ?";
    var bindings = [_id];
    return DB.query(sql_query, bindings)
      .then(
        function(result){
          var client = DB.fetch(result);
          console.log(client);
        },
        function(error){
          return "Le compte n'existe pas.";
        });
    }
})

.factory("Clients", function($http, DB, $q){
  return {
    getAllClients : getAllClients, 
    syncClients : syncClients,
    getGreatClient : getGreatClient,
    addClient : addClient,
    getClient : getClient,
    addNewClient : addNewClient,
    addGoldenStore : addGoldenStore,
    updateClientCoords : updateClientCoords,
    addClientLivreur : addClientLivreur
  };

  function addGoldenStore(_idClient, points)
  {
    var deferred = $q.defer();
    var results = [];
    var sql_query = [
      "UPDATE clients SET golden_store =  golden_store + "+points+" WHERE id_db = "+_idClient+";",
      "SELECT golden_store > 25 as atteint from clients WHERE id_db = "+_idClient];
    angular.forEach(sql_query, function(query, index){
      DB.query(query).then(
      function(success){
          if(index > 0 && success.rows.length > 0)
          {
            deferred.resolve(success.rows[0].atteint);
          }
          else
          {
            deferred.resolve(0);
          }
      }, 
      function(error){
          deferred.reject(error);
      });
    });
    
    return deferred.promise;
  }

  function getClient(_id)
  {
    var sql_query = "SELECT * FROM clients WHERE id_db = ?";
    var bindings = [_id];
    return DB.query(sql_query, bindings).then(
      function(client){
        return DB.fetch(client);
      },
      function(error){
        return error;
      });
  }

  function addClient(client)
  {
    var sql_query = "INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email, golden_store, chiffreAffaire, route) values(?,?,?,?,?,?,?,?,?,?,?)";
    var bindings = [client.id_db, "CE65"+Math.round(Math.random()*10000), client.address, client.lat, client.lng, client.nom, client.prenom, client.email, client.golden_store, client.chiffreAffaire, client.route];
    return DB.query(sql_query, bindings).then(
      function(data){
        return data;
      },
      function(error){
        return error;
      });
  }


  function addClientLivreur(client)
  {
    var sql_query = "INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email) values(?,?,?,?,?,?,?,?)";
    var bindings = [client.id, "CE65"+Math.round(Math.random()*10000), client.address, client.lat, client.lng, client.nom, client.prenom, client.email];
    return DB.query(sql_query, bindings).then(
      function(data){
        return data;
      },
      function(error){
        return error;
      });
  }



  function getGreatClient(){
    var sql_query = "SELECT * FROM clients ORDER BY id_db DESC LIMIT 1";
    return DB.query(sql_query).then(
      function(result){
        console.log(result.rows.length);
        return DB.fetch(result);
      },
      function(error){
        console.log(error.message);
      });
  }

  function syncClients(_id){
   getGreatClient().then(
    function(data){
      var innerId;
      console.log(data);
      if(data == null)
        {
          innerId = 0;
          console.log("1174 :"+innerId);
        }
        else
        {
          innerId = data.id_db;
          console.log("1179 :"+innerId);
        }
      $http.get("http://197.230.28.154:81/newsales/rest/vendors/"+_id+"/clients/check").then(
        function(data, status, headers){
          var outerId = data.data;
          if(innerId < outerId)
          {
            console.log("some updates are waiting ...");
            $http.get("http://197.230.28.154:81/newsales/rest/vendors/"+_id+"/clients/from/"+innerId).then(
              function(data, status, headers){
                angular.forEach(data.data, function(client){
                  var object = {};
                  object.id_db = client.id;
                  object.code_client = client.codeClient
                  object.address = client.address;
                  object.lat = client.latitude == null ? 0: client.lat;
                  object.lng = client.latitude == null ? 0 : client.lng;
                  object.nom = client.nom;
                  object.prenom = client.prenom;
                  object.email = client.email;
                  object.golden_store = typeof client.goldenStore === "undefined" ? 0.0 : client.goldenStore;
                  object.chiffreAffaire = typeof client.chiffreAff  === "undefined" ? 0.0 : client.chiffreAff;
                  object.route = client.route;
                  addClient(object).then(
                    function(data){

                    },
                    function(error){
                      console.log(error.message);
                    });
                });
                console.log("Your DB is now up to date");
              }, 
              function(data, status, headers){

              });
          }
          else
          {
            console.log("Your DB is already up to date;");
          }
        } , 
        function(error, status, headers){
          console.log(error);
        });
    },
    function(){

    });
  }

  function getAllClients(_idVendeur)
  {
    var sql_query = "SELECT * FROM clients WHERE route IN (SELECT id_db FROM routes WHERE vendeur = ?)";
    var bindings = [_idVendeur];
    return DB.query(sql_query, bindings).then(
      function(data){
        return DB.fetchAll(data);
      }, 
      function(error){
        return error;
      });
  }

  function updateClientCoords(_idClient, object)
  {
    var sql_query = "UPDATE clients SET lat = ? ,lng = ? WHERE id_db = ?";
    var bindings = [object.lat, object.lng, _idClient];
    return DB.query(sql_query, bindings).then(
      function(success){
        console.log(success);
        return DB.fetch(success);
      }, 
      function(error){
        return error;
      });
  }
  function addNewClient(client)
  {
    var sql_query = "INSERT INTO new_clients(nom, prenom, adresse1, adresse2, telephone, categorie, lat, lng, route) values(?,?,?,?,?,?,?,?,?);";
    var bindings = [client.nom, client.prenom, client.adresse1, client.adresse2, "0"+String(client.telephone), client.categorie, client.lat, client.lng, Number(client.route)];
    return DB.query(sql_query, bindings).then(
      function(success){
          return success;
      }, 
      function(error){
        return error;
      });
  }
})

.factory("BrandFive", function($http, DB, $q){
  return {
    getBrandFiveFromAPI : getBrandFiveFromAPI,
    getCABrandFive : getCABrandFive,
    addBrandFive : addBrandFive
    
  };

  function getCABrandFive(_idVendeur){
    var sql_query = "SELECT SUM((LC.unit+(LC.packet*10))*A.prixVente) AS 'somme', A.marqueArticle as 'marque' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article JOIN commandes AS C ON C.id = LC.id_commande JOIN missions AS M ON M.commande_id = C.id WHERE M.route_id IN (SELECT id_db FROM routes WHERE vendeur = ?) AND LC.id_article IN ( SELECT id_db FROM articles WHERE marqueArticle IN ( SELECT name FROM brand_five ) ) GROUP BY marque";
    var bindings = [_idVendeur];
    return DB.query(sql_query, bindings).then(
      function(data){
        return DB.fetchAll(data);
      }, 
      function(error){
        return error;
      });
  }

  function addBrandFive(brand)
  {
    var sql_query = 'INSERT INTO brand_five(id_db, code_marque, name, five) VALUES (?,?,?,?);';
    var bindings = [brand.id_db, brand.name, brand.name, 1];
    DB.query(sql_query, bindings).then(
      function(success){
        console.log("success BrandFive !");
        console.log(JSON.stringify(success));
      }, 
      function(error){
        console.log("Erreur lors de l'enregistrement de la BrandFive !");
        console.log(JSON.stringify(error));
      });
  }

  function getBrandFiveFromAPI(){
    var deferred = $q.defer();
    var req = {
      method :"GET",
      url : "http://197.230.28.154:81/newsales/rest/brandfive"
    };
    return $http(req).then(
      function(brandFive, status, headers){
        var bFive = brandFive.data;
        var sql_query = "INSERT INTO brandfive(codeBrandeFive, description, note, dateCreation, dateLancement, dateCloture) values (?,?,?,?,?,?);";
        var bindings = [bFive.codeBrandeFive, bFive.description, bFive.note, bFive.dateCreation, bFive.dateLancement, bFive.dateCloture];
        return DB.query(sql_query, bindings).then(
          function(){

          },
          function(){

          });
      }, 
      function(error, status, headers){

      });
  }
})

.factory("ViewController", function(Articles, SBD, Promotions, CartUtilities, Marques){
  return {
    check : check,
    prepare : prepare,
    idsRemaining : idsRemaining
  };


  function idsRemaining()
  {
    var ids = [];
    ids = ids.concat(Promotions.getNonConsumedPromotions());
    ids = ids.concat(SBD.getNonConsumedSBDs());
    return ids;
  }

  function prepare(articles, brandName, forChargement, prelevement, retour)
  {
    forChargement = typeof(forChargement) != "undefined" && forChargement == true;

    prelevement = typeof(prelevement) != "undefined" && prelevement == true;

    retour = typeof(retour) != "undefined" && retour == true;

    //ADD BRANDS TO LOCAL STORAGE
    if(!forChargement && !prelevement && !retour)
    {
      if(typeof(brandName) != "undefined")
      {
        Marques.addMarqueToLocalStorage(brandName, articles);
      }
    }
    //INITIALIZE THE LIST OF ITEMS
    var output = [];
    //IMPLEMENTATION OF THE DATA STRUCTURE
    for(var i = 0, _len = articles.length ; i < _len ; i++)
    {
        var article = articles[i];
        console.debug(prelevement);

        var cartResult = CartUtilities.existInCart(article, forChargement, prelevement, retour);

        if(cartResult == null)
        {
            article = Articles.prepareForScope(article);
        }
        else
        {
          article = cartResult;
        }

        output.push(article);
    }
    return output;
  }

  function check(article, forChargement, isVendeur, prelevement, retour)
  {

    prelevement = ( (typeof(prelevement) != "undefined") && ( prelevement == true ) ) ? true : false;

    retour = ( (typeof(retour) != "undefined") && ( retour == true ) ) ? true : false;

    forChargement = ( (typeof(forChargement) != "undefined") && ( forChargement == true ) ) ? true : false;

    isVendeur = ( (typeof(isVendeur) != "undefined") && (isVendeur == true) ) ? true : false;

    console.debug(retour);

    var condition = isVendeur ? ( Articles.outOfStock(article) || Articles.outOfQuota(article) ) : Articles.outOfQuota(article);


    if(!prelevement && !retour)
    {
      if(!condition) 
      {
          var toDrop = false;
          if(article.unit == 0 && article.packet == 0)
          {   
              toDrop = true;
              CartUtilities.dropFromCart(article, forChargement, prelevement, retour);
          }
         
          // ADD IT TO CART OR UPDATE THE QTYs !!
         
          if(!toDrop)
          {
              CartUtilities.addOrModify(article, forChargement, prelevement, retour); 
          }
      }
      else
      {
          CartUtilities.dropFromCart(article, forChargement, prelevement, retour);
      }
    }
    else
    {
      var toDrop = false;
      if(article.unit == 0 && article.packet == 0)
      {   
          toDrop = true;
          CartUtilities.dropFromCart(article, forChargement, prelevement, retour);
      }
     
      // ADD IT TO CART OR UPDATE THE QTYs !!
     
      if(!toDrop)
      {
        CartUtilities.addOrModify(article, forChargement, prelevement, retour); 
      }
    }

    if(!forChargement && !prelevement && !retour)
    {
      Promotions.promotionTreatment(article); 

      if(article.groupeSBD != null && typeof(article.groupeSBD) != "undefined")
      {
        SBD.SBDTreatment(article);
      }
    }
    

    
  }

})

.factory("Articles", function(DB, $q, $http, $log, Marques, Promotions, CartUtilities, DateUtilities, SBD){
  return {
    getArticlesInRange : getArticlesInRange,
    itemInScopeOutOfQuota : itemInScopeOutOfQuota,
    outOfQuota : outOfQuota,
    outOfStock : outOfStock,
    getHT : getHT,
    getTTC : getTTC,
    getArticleQty : getArticleQty,
    prepareForScope : prepareForScope,
    prepareGift : prepareGift,
    add : add,
    addAll : addAll,
    getArticlesByMarque : getArticlesByMarque,
    getMarques : getMarques,
    dumpMarques : dumpMarques,
    getArticle : getArticle,
    getArticleWithSBD : getArticleWithSBD,
    getNonConsumedPromotions : getNonConsumedPromotions,
    getArticleByIds : getArticleByIds,
    getRemainingByIds : getRemainingByIds,
    getArticlesByIds : getArticlesByIds,
    syncArticles : syncArticles,
    getHighest : getHighest
 };

  function getArticlesInRange(range)
  {
    var date = DateUtilities.convertLongToYYYYMMDD(new Date());
    var sql_query = "SELECT ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as 'prixVente', A.id AS 'id', A.id_db AS 'id_db', A.nomArticle AS 'nomArticle', A.unitConversion, A.uniteMesure, A.tva, Group_Concat(DISTINCT P.id_db) AS 'promotions', GSBD.id_db AS 'groupeSBD' FROM articles AS A LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND ? BETWEEN PT.startDate AND PT.endDate LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE A.id_db IN ("+range.join(", ")+") GROUP BY A.id_db";
    var bindings = [date];
    return DB.query(sql_query, bindings).then(
      function(success){
        return DB.fetchAll(success);
      }, 
      function(error){
        return error;
      });
  }



  function itemInScopeOutOfQuota(scopeDeepCopy, isVendeur, prelevement, retour)
  {
    isVendeur = typeof(isVendeur) != "undefined" && isVendeur == true;

    prelevement = typeof(prelevement) != "undefined" && prelevement == true;

    retour = typeof(retour) != "undefined" && retour == true;

    if(!prelevement && !retour)
    {
      for(var i = 0, len = scopeDeepCopy.length ; i < len ; i++)
      {
        var article = scopeDeepCopy[i];
        if(isVendeur)
        {
          if(outOfQuota(article) || outOfStock(article))
          {
            return true;
          }
        } 
        else
        {
          //ONLY QUOTA !!
          if(outOfQuota(article))
          {
            return true;
          }
        }
      }
    }
    return false;
  }

  function convertQuotaValueToCs(article)
  {
    var csIsFirstConditionningUnit = article.uniteMesure == "CS" ? true : false;
    var totalValue = csIsFirstConditionningUnit ? (article.quotaVALUE / article.prixVente) : ( (article.quotaVALUE / article.prixVente) / article.unitConversion );
    var cs = article.quotaQTY;
    return Math.trunc(cs + totalValue);
  }

  function totalCs(article)
  {
    return Math.round(article.packet + (article.unit / article.unitConversion));
  }

  function outOfStock(article)
  {
    if(article.unit > 0 || article.packet > 0)
    {
      if(article.unitStock > 0 || article.packetStock > 0)
      {
        if(article.uniteMesure == "CS")
        {
          return totalCs(article) > article.stock;
        }
        else
        {
          var totalUnit = article.unit + article.packet * article.unitConversion;
          return totalUnit > article.stock;
        }
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }

  function outOfQuota(article)
  {
    var outOfQuota = false;
    if(article.quotaQTY > 0 || article.quotaVALUE > 0)
    {
      return convertQuotaValueToCs(article) < totalCs(article);
    }
    else
    {
      return false;
    }
  }


  function getArticleQty(article)
  {
    if(article.uniteMesure == "CS")
    {
      return Math.trunc((article.unit / article.unitConversion) + article.packet);
    }
    else
    {
      return (article.packet*article.unitConversion) + article.unit ;
    }
  }

  function getHT(article)
  {
    var qty = getArticleQty(article);
    return qty.article.prixVente;
  }

  function getTTC(article)
  {
    if(typeof(article.tva) != "undefined" && article.tva != null && article.tva > 0)
    {
      return getHT(article) * (article.tva/100);
    }
    else
    {
      return null;
    }
  }
  function prepareGift(article)
  {
    article.prixVente = 0;
    article.nomArticle = article.designation;
    return article;
  }
  function prepareForScope(article)
  {
    article.packet = 0;

    article.unit = 0;

    article.done = article.groupeSBD == null ? true : false;

    console.log("preparing ..");

    if( article.unitStock > 0 || article.packetStock > 0 )
    {
      if(article.uniteMesure == "CS")
      {
        article.stock = article.packetStock + Math.trunc ( (article.unitStock / article.unitConversion) );
        console.log(article.stock);
      }
      else
      {
        article.stock = article.unitStock + ( article.packetStock*article.unitConversion );
        console.log(article.stock);
      }
    }
    else
    {
      article.stock = 0;
    }

    if(article.promotions != null)
    {
        if(article.promotions.length > 0)
        {
            article.promotions = JSON.parse("["+article.promotions+"]");
        }
    }
    return article;
  }

  function getHighest()
  {
    var sql_query = "SELECT id_db FROM articles ORDER BY id_db DESC LIMIT 1";
    return DB.query(sql_query).then(
      function(article){
        return DB.fetch(article);
      }, 
      function(error){
        return error
      });
  }
  function syncAllArticles()
  {
    var params = {
      url: "http://197.230.28.154:81/newsales/rest/items",
      method: "GET"
    };
    $http(params).then(
      function(success){
        console.log("Articles success from DB");
        addAll(success.data);
      }, 
      function(error){
        console.log(JSON.stringify(error));
      });
  }
  function syncArticles()
  {
    var highestIDDB;
    var highestIDAPI;
    getHighest().then(
      function(success)
      {
        

        if(success == null || success.id_db == 0)
        {
          console.log("BASE DE DONNEE VIDE  !!");
          syncAllArticles();
        }
        else
        {
          console.log("BASE DE DONNEE NON VIDE  !!");
          highestIDDB = success.id_db;
          var request = {
            url: "http://197.230.28.154:81/newsales/rest/items/sync",
            method: 'GET'
          };

          $http(request).then(
            function(success){
              highestIDAPI = success.data.id;
              console.log("HIGHEST IN DB : "+highestIDDB);
              console.log("HIGHEST IN API : "+highestIDAPI);
              if(highestIDAPI > highestIDDB)
              {
                console.log("SOME UPDATES REMAINING !");
                //syncArticlesFrom(highestIDDB);
              }
              else
              {
                console.log("ARTICLES UP TO DATE !");
              }
            }, 
            function(error){
              console.log(JSON.stringify(error));
            });
        }

      });

  }
  function syncArticlesFrom(_id)
  {
    var request = {
      url: "http://197.230.28.154:81/newsales/rest/items/from/"+_id,
      method: 'GET'
    };
    $http(request).then(
      function(success){
        console.log("Articles success from DB");
        addAll(success.data);
      }, 
      function(error){
        console.log(JSON.stringify(error));
      });
  }

  function getArticleWithSBD()
  {
    /*
      I removed this "WHERE classe = 'A' just for testing be sure to add it soon !!"
    */
      var sql_query = "SELECT GS.id_db as id, GS.qte_min as min, Group_Concat(A.id_db) AS articles FROM groupes_sbd AS GS LEFT JOIN article_sbd AS ASBD ON ASBD.id_groupe_sbd = GS.id_db JOIN articles AS A ON ASBD.id_article = A.id_db GROUP BY GS.id_db";
      return DB.query(sql_query).then(
        function(sbds){
          return DB.fetchAll(sbds);
        }, 
        function(error){
          return error;
        });
  }

  function dumpMarques()
  {
    return DB.query("SELECT * FROM marques;", []).then(function(results){
      var _exportSql = "";
        if (results.rows) {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var _fields = [];
                    var _values = [];
                    for (col in row) {
                        _fields.push(col);
                        _values.push('"' + row[col] + '"');
                    }
                    _exportSql += ";\nINSERT INTO " + _tbl_name + "(" + _fields.join(",") + ") VALUES (" + _values.join(",") + ")";
                }
            }
            return _exportSql;
    });
  }

  function getMarques(exclusion, isVendeur, forChargement)
  {
    forChargement = ( typeof(forChargement) != "undefined" && forChargement ) ? true : false;

    isVendeur = ( typeof(isVendeur) != "undefined" && isVendeur ) ? true : false;

    exclusion = typeof(exclusion) == "undefined" ? [] : exclusion;

    var sql_query;

    // All the current conditions are setted 0-0 1-0 1-1

    // Except 0-1

    if( (!isVendeur && !forChargement) || (isVendeur && forChargement) )
    {
      sql_query = "SELECT * FROM marque WHERE id NOT IN ("+exclusion.join(", ")+");";
    }
    if(isVendeur && !forChargement)
    {
      sql_query = "SELECT * FROM marque WHERE id NOT IN ("+exclusion.join(", ")+");";
    }
    return DB.query(sql_query).then(
      function(marques){
        return DB.fetchAll(marques);
      }, 
      function(error){
        return error;
      });
  }


  function getArticlesByIds(ids)
  {
    return DB.query('SELECT * FROM articles WHERE id_db IN ('+ids.join(', ')+')').then(
      function(articles){
        return DB.fetchAll(articles);
      }, 
      function(error){
        return error;
      });
  }

  function getArticleByIds(ids, promotion_id){
    var sql_query = "SELECT A.nomArticle, A.id_db, GA.qte FROM articles AS A LEFT JOIN gratuite_article AS GA ON GA.article_id = A.id_db LEFT JOIN promotion_gratuite AS PG ON PG.id = GA.promotion_gratuite_id LEFT JOIN promotions AS P ON P.id_db = PG.promotion_id WHERE A.id_db IN ("+ids.join(',')+") AND P.id_db = ?";
    var bindings = [promotion_id];
    return DB.query(sql_query, bindings).then(
      function(articles){
        return DB.fetchAll(articles);
      }, 
      function(error){
        return error;
      });

  }

  

  function getArticlesByMarque(marque, isVendeur, forChargement, vendeurId){

    vendeurId = typeof(vendeurId) != "undefined" ? vendeurId : 0;

    isVendeur = isVendeur ? isVendeur : false;

    forChargement = forChargement ? forChargement : false;

    var todayDate = DateUtilities.convertLongToYYYYMMDD(new Date());

    var bindings = [];

    var sql_query = "";

    
    if(!forChargement && typeof window.localStorage['marques'] != "undefined" && typeof JSON.parse(window.localStorage['marques'])[marque] != "undefined" && typeof JSON.parse(window.localStorage['marques'])[marque].length > 0)
    {
      var deferred = $q.defer();
      var marques = JSON.parse(window.localStorage['marques']);
      deferred.resolve(marques[marque]);
      return deferred.promise;
    }
    else if(isVendeur && forChargement)
    {
      console.debug("Heeeere !!");
      sql_query = 'SELECT length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(CV.unit, 0) as demandeUnit, ifnull(CV.packet, 0) as demandePacket, ifnull(ST.unit, 0) as unitStock, ifnull(ST.packet, 0) as packetStock, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN chargement_vendeur as CV ON CV.item_id = A.id_db AND CV.vendeur_id = ? LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.employee_id = ? LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND ? BETWEEN PT.startDate AND PT.endDate LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE A.marqueArticle = ? GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;';
      bindings = [vendeurId, vendeurId, todayDate, marque];
    }
    else if(isVendeur)
    {
      //"GET ALL ALSO WITH QUOTA !!"
      console.log("vendeur with quota");
      sql_query = 'SELECT length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(ST.unit, 0) as unitStock, ifnull(ST.packet, 0) as packetStock, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.employee_id = ? LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND ? BETWEEN PT.startDate AND PT.endDate LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE A.marqueArticle = ? GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;';
      bindings = [vendeurId, todayDate, marque];
    }
    else
    {
      sql_query = 'SELECT length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND ? BETWEEN PT.startDate AND PT.endDate LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE A.marqueArticle = ? GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;';
      bindings = [todayDate, marque];
    }

    return DB.query(sql_query, bindings).then(
      function(articles){
        $log.debug(articles);
        return DB.fetchAll(articles);
      }, 
      function(error){
        $log.error(error);
        return error;
      });

  }

  function getRemainingByIds(ids){
    var sql_query = "SELECT A.prixVente as 'prixVente', A.id AS 'id', A.id_db AS 'id_db', A.nomArticle AS 'nomArticle', Group_Concat(DISTINCT P.id_db) AS 'promotions', GSBD.id_db AS 'groupeSBD' FROM articles AS A LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE A.id IN ("+ ids.join(', ') +") GROUP BY A.id_db";
    return DB.query(sql_query).then(
      function(articles){
        return DB.fetchAll(articles);
      }, 
      function(error){
        return error;
      });

  }

  function getNonConsumedPromotions(array_ids){
    var sql_query = "SELECT * FROM promotions AS P JOIN articles AS A ON P.article = a.id_db WHERE P.article NOT IN (?)";
    var bindings = [array_ids];
    return DB.query(sql_query, bindings).then(
      function(promotions){
        return DB.fetchAll(promotions);
      }, 
      function(error){
        return error;
      });
  }

  function getArticle(_id){
    var sql_query = "SELECT * FROM articles WHERE id_db = ?";
    var bindings = [_id];
    return DB.query(sql_query, bindings).then(
      function(article){
        return DB.fetch(article);
      }, 
      function(error){
        return error;
      });
  }
  function add(article){
    console.log(JSON.stringify(article));
    var deferred = $q.defer();
    var sql_query = "INSERT INTO articles(id_db, prixAchat, nomArticle, prixVente, tva, uniteMesure, typeArticle, marqueArticle, unitConversion) values(?,?,?,?,?,?,?,?,?);"
    var bindings = [article.id, article.price, article.fullDescription, article.salePrice, article.tva, 'UN', 'P&G', article.sousMarque.name, article.unitConversion];
    return DB.query(sql_query, bindings).then(
      function(article){

        console.log(JSON.stringify(article));
        return article;
      }, 
      function(error){
        console.log(JSON.stringify(error));
        return error;
      });
  }

  function addAll(articles){
    angular.forEach(articles, function(article){
      add(article).then(function(success){console.log(success);}, function(error){console.log(JSON.stringify(error));});
      Marques.add(article).then(function(success){console.log(success);}, function(error){console.log(JSON.stringify(error));});
    });
  }
})

.factory("Marques", function(DB, $http){
  return {
    addMarqueToLocalStorage : addMarqueToLocalStorage,
    add : add,
    addToBrandFive : addToBrandFive,
    getBrandFiveFromDB : getBrandFiveFromDB,
    getBrandFiveFromLocalDB : getBrandFiveFromLocalDB,
    getAll : getAll
  };


  function addMarqueToLocalStorage(brandName, articles)
  {
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
  }


  function getAll(){
    var sql_query = "SELECT * FROM marque";
    return DB.query(sql_query).then(
      function(brandfives){
        return DB.fetchAll(brandfives);
      }, 
      function(error){
        return error;
      });
  }

  function getBrandFiveFromLocalDB(){
    var sql_query = "SELECT * FROM brand_five WHERE five = 1";
    return DB.query(sql_query).then(
      function(brandfives){
        return DB.fetchAll(brandfives);
      }, 
      function(error){
        return error;
      });
  }

  function getBrandFiveFromDB(){
    var req = {
      url : '',
      method : 'GET'
    };
    $http(req).then(
      function(brands){
        unSetBrandFive().then(
          function(success){
            angular.forEach(brands, function(brand){
              addToBrandFive(brand.id);
            });
          }, 
          function(error){

          })
        }, 
      function(error){

    });
  }

  function addToBrandFive(_id){
    var sql_query = "UPDATE marques SET five = true WHERE id_db = ?;";
    var bindings = [_id];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, function(error){
        return error;
      });
  }

  function unSetBrandFive(){
    var sql_query = "UPDATE marques SET five = ?;";
    var bindings = [false];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, function(error){
        return error;
      });
  }

  function add(article){
    var sql_query = "INSERT INTO marque(id, marqueArticle, logo) values(?,?,?);";
    var bindings = [article.sousMarque.marque.id, article.sousMarque.marque.name, ''];
    return DB.query(sql_query, bindings).then(
      function(success){
        console.log(JSON.stringify(marque));
        return success;
      }, 
      function(error){
        console.log(JSON.stringify(error));
        return error;
      });

  }

  function addToBrandFive(){

  }

})

.factory("Missions", function(DB, $q, $http, $log, DateUtilities, PrinterService, LigneCommandes){
  return {
    getAllMissions : getAllMissions,
    getMission : getMission,
    getFinishedMission : getFinishedMission,
    syncMissions : syncMissions,
    getHighestMission : getHighestMission,
    getUnfinishedMissions : getUnfinishedMissions,
    getFinishedMissions : getFinishedMissions,
    countMissions : countMissions,
    getMissionsWithCommande : getMissionsWithCommande,
    getMissions5WithCommande : getMissions5WithCommande,
    getMissionsWithCommandeByClient : getMissionsWithCommandeByClient,
    getMissions5WithCommandeByClient : getMissions5WithCommandeByClient,
    setMissionToSucceed : setMissionToSucceed,
    getVendeurRoutes : getVendeurRoutes,
    setEntryDate : setEntryDate,
    setExitDate : setExitDate,
    getTodaysMissions : getTodaysMissions,
    getOtherMissions : getOtherMissions,
    getMissionsBetween : getMissionsBetween,
    addLocalMission : addLocalMission,
    setMissionToSucceedLocal : setMissionToSucceedLocal,
    setToSynced : setToSynced,
    addMissionLivreur : addMissionLivreur,
    setMissionLivreurToLivred : setMissionLivreurToLivred,
    getNonSyncedLivredMissions : getNonSyncedLivredMissions,
    setMissionLivredInAPI : setMissionLivredInAPI,
    setMissionToSynced : setMissionToSynced,
    missionFinishForLivreur : missionFinishForLivreur,
    checkOut : checkOut


  };

  function addLocalMission(mission)
  {
    var todayDate = DateUtilities.convertLongToYYYYMMDD(new Date());
    var sql_query = "INSERT INTO missions(client_id, route_id, date_start, state, finished, problem, synced, local) values(?,?,?,?,?,?,?,?)";
    var bindings = [mission.client_id, mission.route_id, todayDate, 1, 0, 0, 0, 1];
    return DB.query(sql_query, bindings).then(
      function(mission){
        return mission;
      }, 
      function(error){
        return error;
      });
  }

  function updateIdCommandeForMission(idMission, idCommande, isLocal)
  {
    DB.query("UPDATE missions set commande_id = "+idCommande+",state = "+1+" WHERE id = "+idMission+";").then(
      function(success){
        $log.debug(success);
      }, 
      function(error){
        $log.error(error);
      });
  }

  function checkOut(missionId, lines, isLocal, paymentId, paymentDate)
  {
    console.log(missionId);

    console.log(lines);

    console.log(isLocal);

    var deferred = $q.defer();

    var todayDate = DateUtilities.convertLongToYYYYMMDD(new Date());

    var missionObject = JSON.parse(window.localStorage['mission'] || "{}");

    if(isLocal)
    {
      console.log("isLocal");
      var sql_query = "INSERT INTO missions(client_id, route_id, date_start, state, finished, problem, synced, local) values(?,?,?,?,?,?,?,?)";
      var bindings = [missionObject.client_id, missionObject.route_id, todayDate, 1, 0, 0, 0, 1];
      DB.query(sql_query, bindings).then(
        function(mission){
          if(mission.insertId)
          {
            var id_mission = mission.insertId;
            deferred.resolve(addCommande(id_mission, lines, true, paymentId, paymentDate));
          }
        }, 
        function(error){
          deferred.reject(error);
        });
    }
    else
    {
      console.log("isNotLocal");
      deferred.resolve(addCommande(missionId, lines, false, paymentId, paymentDate));
    }
    return deferred.promise;
  }

  function addCommande(id_mission, lines, isLocal, paymentId, paymentDate)
  {
    var deferred = $q.defer();
    var missionObject = JSON.parse(window.localStorage['mission'] || "{}");
    DB.query( 
      "INSERT INTO commandes(code_commande, id_mission, id_client, sbd, promotions, paymentDate, remise, paymentId) values(?,?,?,?,?,?,?,?);",
       [("CE"+new Date().getTime()), id_mission, missionObject.client_id, "", "", paymentDate.getTime(), "", paymentId]).then(
    function(commande){
      if(commande.insertId)
      {
        var commande_id = commande.insertId;
        // Updating the id of the commande !!
        // Get the commande from the mission !!

        updateIdCommandeForMission(id_mission, commande_id, isLocal);

        deferred.resolve(LigneCommandes.addLinesToDB(commande_id, lines));
      }
    }, 
    function(error){
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function missionFinishForLivreur(array)
  {
    var deferred = $q.defer();
    var mission = array[0];
    var ttc = array[1];
    var ht = array[2];
    var items = array[3];
    var escompte = array[4];
    var requests = [];
    var addonsLines = [];

    var stock = JSON.parse(window.localStorage['stock'] || '{}');
    var stockKeys = Object.keys(stock);
    for(var i = 0, len = stockKeys.length ; i < len ; i++)
    {
      var key = stockKeys[i];
      var remaining = stock[key];
      var packet = Math.trunc(remaining / 10);
      var unit = remaining % 10;
      requests.push('UPDATE stock_livreur SET packet = '+packet+' AND unit = '+unit+' WHERE item = '+key+';');
    }
    requests.push("UPDATE missions_livreur SET state = "+1+" WHERE id_db = "+mission+";");
    requests.push("DELETE FROM ligneCommandes_livreur WHERE id_commande = (SELECT commande_id FROM missions_livreur WHERE id_db = "+mission+");");
    for(var i = 0, len = items.length ; i < len ; i++)
    {
      var item = items[i];
      addonsLines.push("( (SELECT commande_id FROM missions_livreur WHERE id_db = "+mission+"), "+item.id_db+", "+item.packet+", "+item.unit+", "+item.prixVente+", "+item.remise+", "+(item.prixVente == 0 ? 1 : 0)+")");
    }
    requests.push("INSERT INTO ligneCommandes_livreur(id_commande, id_article, packet, unit, pu_ht, remise, isGift) VALUES "+addonsLines.join(", ")+";");
    for(var i = 0, len = requests.length ; i < len ; i++)
    {
      var sql_query = requests[i];
      console.log(sql_query);
      DB.query(sql_query).then(
        function(success){
          console.log(success);
        }, 
        function(error){
          console.log(error);
        });
    }
    requests = [];
    PrinterService.formatedContent([items, JSON.parse(window.localStorage['mission'] || '{}'), ht, ttc, escompte, 2], "Livreur").then(
      function(success){
        deferred.resolve(success);
      }, 
      function(error){
        deferred.resolve(error);
      });

    return deferred.promise;

  }

  function setMissionToSynced(id)
  {
    var sql_query = "UPDATE missions_livreur SET synced = 1 WHERE id_db = ?;";
    var bindings = [id];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      });
  }

  function setMissionLivredInAPI(id)
  {
    var request = {
      url: "http://197.230.28.154:81/newsales/rest/livreurs/sync/"+id,
      method: "GET"
    };

    return $http(request);
  }

  function getNonSyncedLivredMissions()
  {
    var sql_query = "SELECT id_db FROM missions_livreur WHERE finished = 1 AND synced = 0;";
    return DB.query(sql_query).then(
      function(success){
        return DB.fetchAll(success);
      }, 
      function(error){
        return error;
      });
  }

  function setMissionLivreurToLivred(id)
  {
    var sql_query = "UPDATE missions_livreur SET finished = 1, state = 1 WHERE id_db = ?;";
    var bindings = [id];
    return DB.query(sql_query, bindings).then(
      function(success){
        return DB.fetch(success);
      },
      function(error){
        return error;
      });
  }

  function setToSynced(_idDB, _idMission)
  {
    var sql_query = "UPDATE missions set synced = 1, id_db = ? WHERE id = ?";
    var bindings = [_idDB, _idMission];
    return DB.query(sql_query, bindings).then(
      function(success){
        console.log(success);
        return DB.fetch(success);
      }, 
      function(error){
        console.log(error);
        return error;
      }); 
  }


  function setEntryDate(mission_id, dateValue)
  {
    var sql_query = "UPDATE missions SET entryDate = ? WHERE id = ?";
    var bindings = [mission_id, dateValue];
    return DB.query(sql_query, bindings).then(function(success){
      return success;
    },
    function(error){
      return error;
    });
  }

  function setExitDate(mission_id, dateValue)
  {
    var sql_query = "UPDATE missions SET exitDate = ? WHERE id = ?";
    var bindings = [mission_id, dateValue];
    return DB.query(sql_query, bindings).then(function(success){
      return success;
    },
    function(error){
      return error;
    });
  }

  function getTodaysMissions(_idVendeur)
  { 
      var todayDate = new Date();
      var yyyy = (todayDate.getFullYear()).toString();
      var mm = (todayDate.getMonth()+1).toString();
      var dd = (todayDate.getDate()).toString();
      var todayDate = yyyy+"-"+(mm[1]?mm:"0"+mm[0])+"-"+(dd[1]?dd:"0"+dd[0]);
      var sql_query = "SELECT M.id as id_mission, M.code_mission, M.client_id, M.route_id, M.state, C.lat, C.lng, C.nom, C.prenom, C.code_client FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id WHERE (date_start >= date('now') AND  date_start < date('now', '+1 day')) AND local = 0 AND route_id IN(SELECT id_db FROM routes WHERE vendeur = ?)";
      var bindings = [_idVendeur]
      return DB.query(sql_query, bindings).then(function(missions){
        console.log(missions);
        return DB.fetchAll(missions);
      },
      function(error){
        return error;
      });
  }

  function getMissionsBetween(now, time, _idVendeur)
  { 
      var sql_query = "SELECT M.id as id_mission, M.code_mission, M.client_id, M.route_id, M.state, C.lat, C.lng, C.nom, C.prenom, C.code_client  FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id WHERE date_start >= ? AND date_start < ? AND route_id IN(SELECT id_db FROM routes WHERE vendeur = ?)";
      var bindings = [now, time, _idVendeur]
      return DB.query(sql_query, bindings).then(function(missions){
        return DB.fetchAll(missions);
      },
      function(error){
        return error;
      });
  }

  function getOtherMissions(_idVendeur)
  {
      var sql_query = "SELECT M.id as id_mission, M.code_mission, M.client_id, M.route_id, M.state, C.lat, C.lng, C.nom, C.prenom, C.code_client  FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id WHERE (date_start >= date('now') AND  date_start < date('now', '+1 day')) AND local = 1 AND state = 1 AND route_id IN(SELECT id_db FROM routes WHERE vendeur = ?)";
      var bindings = [_idVendeur];
      return DB.query(sql_query, bindings).then(function(success){
        return DB.fetchAll(success);
      },
      function(error){
        return error;
      });
  }

  function getVendeurRoutes()
  {
    var sql_query = "SELECT DISTINCT route_id FROM missions";
    return DB.query(sql_query).then(
      function(success){
        return DB.fetchAll(success);
      }, 
      function(error){
        console.log(error.message);
      });
  }

  function getMission(mission_id)
  {
    var sql_query = "SELECT client_id FROM missions WHERE id = ?";
    var bindings = [mission_id];
    return DB.query(sql_query, bindings).then(
      function(mission){
        return DB.fetch(mission);
      }, 
      function(error){
        return error;
      });
  }

  function getFinishedMission(mission_id)
  {
    var sql_query = "SELECT client_id FROM missions WHERE id = ? AND state = ?";
    var bindings = [mission_id, 1];
    return DB.query(sql_query, bindings).then(
      function(mission){
        return DB.fetch(mission);
      }, 
      function(error){
        return error;
      });
  }

  function setMissionToSucceed(_idMission, commande_id, entryDate, exitDate)
  {
    var sql_query = "UPDATE missions SET state = ?, commande_id = ?, entryDate = ?, exitDate = ? WHERE id = ?";
    var bindings = [1, commande_id, entryDate, exitDate, _idMission];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      })
  }

  function setMissionToSucceedLocal(_idMission, commande_id)
  {
    var sql_query = "UPDATE missions SET state = ?, commande_id = ? WHERE id = ?";
    var bindings = [1, commande_id, _idMission];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      })
  }
  function getMissionsWithCommandeByClient(_idClient)
  {
    var sql_query = "SELECT * FROM missions WHERE state = ?  AND client_id = ?";
    var bindings = [1, _idClient];
    return DB.query(sql_query, bindings).then(
      function(missions){
        return DB.fetchAll(missions);
      }, 
      function(error){
        return error;
      }); 
  }

  function getMissions5WithCommandeByClient(_idClient)
  {
    var sql_query = "SELECT * FROM missions WHERE state = ? AND client_id = ? ORDER BY id_db DESC LIMIT 5";
    var bindings = [1, _idClient];
    return DB.query(sql_query, bindings).then(
      function(missions){
        console.log(missions);
        return DB.fetchAll(missions);
      }, 
      function(error){
        return error;
      }); 
  }

  function countMissions(_idVendeur)
  {
    var sql_query = "SELECT COUNT(case state when 1 then 1 else null end) AS 'finished', COUNT(case state when 0 then 1 else null end) AS 'waiting', COUNT(case state when 2 then 1 else null end) as 'problem' FROM missions WHERE route_id IN (SELECT id_db FROM routes WHERE vendeur = ?)";
    var bindings = [_idVendeur];
    return DB.query(sql_query, bindings).then(
      function(result){
        return DB.fetch(result);
      }, 
      function(error){
        return error;
      });
  }

  function getUnfinishedMissions()
  {
    var sql_query = "SELECT * FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id WHERE state = 0";
    return DB.query(sql_query).then(
      function(missions){
        return DB.fetchAll(missions);
      }, 
      function(error){
        return error;
      });
  }

  function getMissionsWithCommande()
  {
    var sql_query = "SELECT * FROM missions WHERE state = 1";
    return DB.query(sql_query).then(
      function(missions){
        return DB.fetchAll(missions);
      }, 
      function(error){
        return error;
      }); 
  }

  function getMissions5WithCommande()
  {
    var sql_query = "SELECT * FROM missions WHERE state = 1 ORDER BY id DESC LIMIT 2";
    return DB.query(sql_query).then(
      function(missions){
        return DB.fetchAll(missions);
      }, 
      function(error){
        return error;
      }); 
  }

  function getFinishedMissions(_idVendeur)
  {
    var sql_query = "SELECT M.*, address FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id WHERE state = 1 AND route_id IN (SELECT id_db FROM routes WHERE vendeur = ?) ORDER BY id LIMIT 5";
    var bindings = [2];
    return DB.query(sql_query, bindings).then(
      function(missions){
        console.log(missions);
        return DB.fetchAll(missions);
      }, 
      function(error){
        return error;
      });
  }

  function getHighestMission(id_vendeur)
  {
    console.log(id_vendeur);
    var sql_query = "SELECT * FROM missions WHERE id_db > 0 AND route_id IN(SELECT id_db FROM routes WHERE vendeur = ?) ORDER BY id_db DESC LIMIT 1";
    var bindings =[id_vendeur]
    return DB.query(sql_query, bindings).then(
      function(mission){
        return DB.fetch(mission);
      }, 
      function(error){
        return error;
      });
  }

  function addMission(mission)
  {

    var time = new Date(mission.date);
    console.log(time);
    time.setHours(0,0,0,0);
    time = time.getTime();
    console.log(time);
    var sql_query = "INSERT INTO missions(id_db, code_mission, client_id, route_id, date_start, date_max, finished, commande_id, problem, problemDescription, state, synced) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    var bindings = [mission.id, mission.codeMission, mission.client, mission.route, time, mission.maxDate, mission.finished, 0, mission.problem, mission.problemDescription, 0, 0];
    return DB.query(sql_query, bindings).then(
      function(mission_id){
        return mission_id;
      }, 
      function(error){
        return error;
      });
  }
  function addMissionLivreur(mission, _idLivreur)
  {
    var sql_query = "INSERT INTO missions_livreur(id_db, code_mission, client_id, state, synced, livreur, finished) values(?,?,?,?,?,?,?)";
    var bindings = [mission.id, mission.codeMission, mission.client, 0, 0, _idLivreur, 0];
    return DB.query(sql_query, bindings).then(
      function(mission_id){
        return mission_id;
      }, 
      function(error){
        return error;
      });
  }
  



  function syncMissions(_idVendeur)
  {
    var deferred = $q.defer();
    var innerId, outerId;
    getHighestMission(_idVendeur).then(
      function(mission){
      if(mission == null)
        {
          innerId = 0;
        }
        else
        {
          innerId = mission.id_db;
        }
        $http.get("http://197.230.28.154:81/newsales/rest/vendors/"+_idVendeur+"/mobile/missions/check").then(
          function(mission, status, headers){
            console.log(mission);
            outerId = mission.data;
            console.log("HIGHEST MISSION IN DB : "+innerId);
            console.log("HIGHEST MISSION IN API : "+outerId);
            if(outerId > innerId)
            {
              console.log("Some updates remaining ...");
              var finalMissions = [];
              $http.get("http://197.230.28.154:81/newsales/rest/vendors/"+_idVendeur+"/mobile/missions/from/"+innerId).then(
                function(missions, status, headers){
                  deferred.resolve(missions.data);
                  var newMissions = [];
                  angular.forEach(missions.data, function(mission){
                    console.log(mission);
                  addMission(mission).then(
                      function(id){
                        console.log(id);
                        console.log(JSON.stringify(id));
                      }, 
                      function(error){
                        console.log(error);
                      });
                  });
                  deferred.resolve({status : "OK"});
                },
                function(error, status, headers){
                  deferred.reject(error);
                });
            }
            else
            {
              console.log("Database already up to date !!");
            }
          }, 
          function(error, status, headers){
            console.log(error.status);
          });
      }, 
      function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  }



  function getAllMissions(){
    var sql_query = "SELECT C.id_db, C.code_client, C.address, C.lat, C.lng, C.nom, C.prenom, M.code_mission, M.state FROM missions AS M LEFT JOIN clients AS C ON C.id_db = M.client_id ORDER BY M.state";
    return DB.query(sql_query)
    .then(
      function(missions){
        return DB.fetchAll(missions);
      }, function(error){
        return error;
      });
  }
})

.factory("Routes", function(DB, $http, $q, Clients){


    function addRoute(route)
    {
      var sql_query = "INSERT INTO routes (id_db, code, desactive, nom, vendeur) values (?,?,?,?,?);";
      var bindings = [route.id_db, route.code, route.desactive, route.nom, route.vendeur];
      return DB.query(sql_query, bindings).then(
        function(data){
          return DB.fetch(data);
        },
        function(error){
          return error;
        });
    }

    function addRouteProperToSync(idVendeur, success)
    {
      for(var i = 0 ; i < success.data.length ; i++)
      {
        var route = {
          id_db : success.data[i].id,
          code : success.data[i].codeRoute,
          nom : success.data[i].nomRoute, 
          desactive : false,
          vendeur : idVendeur
        };
        addRoute(route).then(function(success){
          console.log(success);
        }, function(error){
          console.log(error);
        });
        if(typeof success.data[i].clients != "undefined" && success.data[i].clients.length > 0)
        {
          angular.forEach(success.data[i].clients, function(client){
            console.log(JSON.stringify(client));
            var object = {};
            object.id_db = client.id;
            object.code_client = client.codeClient
            object.address = client.adresseFacturation;
            object.lat = client.lattitude == null ? 0.0 : client.lattitude;
            object.lng = client.longitude == null ? 0.0 : client.longitude;
            object.nom = client.contactNom;
            object.prenom = client.contactNom;
            object.email = client.email;
            object.route = success.data[i].id;
            object.golden_store = client.goldenPoint == null ? 0.0 : client.goldenStore;
            object.chiffreAffaire = 0;
            console.log(object);
            Clients.addClient(object).then(
              function(success){
                console.log(success);
              },
              function(error){
                console.log(error.message);
              });
            
          });
        }
      }
    }

    function syncRoutes(id)
    {
      var idVendeur = id;
      var maxDB;
      var maxAPI;
      var routes = {
        url : "http://197.230.28.154:81/newsales/rest/vendors/mobile/"+idVendeur+"/roads/",
        method : "GET"
      };
      var routesCheck = {
        url : "http://197.230.28.154:81/newsales/rest/vendors/mobile/"+idVendeur+"/roads/check",
        method : "GET"
      };
      function fromStartPoint(id, _id)
      {
        return {
        url : "http://197.230.28.154:81/newsales/rest/vendors/mobile/"+id+"/roads/from/"+_id,
        method : "GET"
        };
      }


      getLastRoute(id).then(
        function(success){
          if(success == null)
          {
            $http(routes).then(
              function(success){
                if(success.data.length > 0)
                {
                  addRouteProperToSync(idVendeur, success);
                }
              }, 
              function(error){
                console.log(error);
              });
          }
          else
          {
            maxDB = success.id_db;
            $http(routesCheck).then(
              function(success){
                maxAPI = success.data;
                if(maxDB == maxAPI)
                {
                  console.log("LES ROUTES SONT A JOUR");
                }
                if(maxDB < maxAPI)
                {
                  $http(fromStartPoint(idVendeur, maxDB)).then(
                    function(success){
                      console.log(success);
                      if(success.data.length > 0)
                      {
                        addRouteProperToSync(idVendeur, success);
                      }
                    }, 
                    function(error){
                      console.log(error);
                    });
                }
              },
              function(error){
                console.log(error);
              });
          }
        }, 
        function(error){
          console.log(error);
        });
    }
    
    function getAllRoutes(id){
      var sql_query = "SELECT * FROM routes WHERE vendeur = ?;";
      var bindings = [id];
      return DB.query(sql_query, bindings)
      .then(
        function(result){
          console.log(result);
          return DB.fetchAll(result);
        },
        function(error){
          return error.message;
        });
    }

    function getAllDistinctRoutes(id){
      var sql_query = "SELECT DISTINCT id_db FROM routes WHERE vendeur = ?;";
      var bindings = [id];
      return DB.query(sql_query, bindings)
      .then(
        function(result){
          return DB.fetchAll(result);
        },
        function(error){
          return error.message;
        });
    }

    function getLastRoute(id)
    {
      var sql_query = "SELECT id_db FROM routes WHERE vendeur = ? ORDER BY id_db DESC LIMIT 1";
      var bindings = [id];
      return DB.query(sql_query, bindings).then(
        function(data){
          return DB.fetch(data);
        },
        function(error){
          console.log("ERROR => BEFORE SYNC ROUTES THE ROUTE WITH HIGHEST DEADLINE : "+error.message);
        });
    }

    function getUnfinishedRoutes()
    {
      var sql_query = "SELECT * FROM routes WHERE state = 0 AND date_max < "+Date.now()+";";
      return DB.query(sql_query).then(
        function(routes){
          return DB.fetchAll(routes);
        }, 
        function(error){
          return error;
        });
    }

    function getRoute(_id){
      var sql_query = "SELECT * FROM missions WHERE id = ?;";
      var bindings = [_id];
      return DB.query(sql_query, bindings)
      .then(
        function(result){
          return DB.fetch(result);
        }, 
        function(error){
          return [];
        }
        );
    }

    function setState(_id, state_number){
      var sql_query  = "UPDATE TABLE missions WHERE id = ? SET state = ?;";
      var bindings = [_id, state_number];
      return DB.query(sql_query, bindings).then(
        function(result){
          return "La mission a été mise à jour.";
        },
        function(error){
          return "Une erreur est survenu : "+error.message;
        });
    }

    function deleteRoute(_id){
      var sql_query  = "DELETE TABLE missions WHERE id = ?;";
      var bindings = [_id];
      return DB.query(sql_query, bindings).then(
        function(result){
          return "La mission a été supprimé.";
        },
        function(error){
          return "Une erreur est survenu : "+error.message;
        });
    }
    return {
      addRoute : addRoute,
      deleteRoute : deleteRoute,
      setState : setState,
      getRoute : getRoute,
      getAllRoutes : getAllRoutes,
      getLastRoute : getLastRoute,
      syncRoutes : syncRoutes,
      getAllDistinctRoutes : getAllDistinctRoutes
    };
})



.factory("Promotions", function(DB, $http, $q, $log){


  return {

    cartTreatment : cartTreatment,
    getNonConsumedPromotions : getNonConsumedPromotions,
    addPromotion : addPromotion,
    promotionArticle : promotionArticle,
    syncPromotions : syncPromotions,
    getAllPromotions : getAllPromotions,
    getClientPromotions : getClientPromotions,
    deletePromotion : deletePromotion,
    promotionTreatment : promotionTreatment,
    getTVA : getTVA,
    getHT : getHT,
    getArticleQty : getArticleQty

  };
  function getHT(article)
  {
    var qty = getArticleQty(article);
    return qty * article.prixVente;
  }

  function getTVA(article)
  {
    if(typeof(article.tva) != "undefined" && article.tva != null && article.tva > 0)
    {
      
      return getHT(article)  + (getHT(article) * 0.20);
    }
    else
    {
      return null;
    }
  }

  function getArticleQty(article)
  {
    if(article.uniteMesure == "CS")
    {
      
      return (article.unit / article.unitConversion) + article.packet;
    }
    else
    {
      
      return (article.packet*article.unitConversion) + article.unit ;
    }
  }

  function promotionMT(promotion)
  {

  }

  function cartTreatment(article, object)
  {
    var promotions = JSON.parse(window.localStorage['promotions'] || "[]");

    var promotionsIds = article.promotions;

    var discounts = [];

    for(var i = 0, len = promotionsIds.length ; i < len ; i++)
    {
      var promotionId = promotionsIds[i];

      for(var j = 0, _len = promotions.length ; j < _len ; j++)
      {
        var promotion = promotions[j];

        if(promotion.id == promotionId && promotion.consumed)
        {
          if(promotion.gratuites.length > 0)
          {
            // TO HAVE UNIQUE GIFTS !!
            object[promotion.id] = promotion.gratuites.map(function(a){
              var gratuite = a; 
              //Adapting gifts for cumullable promotions
              if(promotion.type == "PP" || promotion.type == "PR")
              {
                gratuite.qty = (promotion.cumule != null && promotion.cumule > 0) ?  gratuite.qty * promotion.cumule : gratuite.qty;
              }
              else
              {
                if(promotion.promotion_palier.length > 0 && promotion.qte != null && promotion.qte > 0)
                {
                  gratuite.qty = promotion.qte;
                }
                else
                {
                  gratuite.qty = gratuite.qty * promotion.cumule;
                }
              }
              return gratuite;
            });
          }
          else if(typeof(promotion.remise) != "undefined" && promotion.remise != null && promotion.remise > 0)
          {
            var cumule = promotion.cumule > 0 ? promotion.cumule : 1;
            var remise = promotion.remise * cumule;
            var discount = {
              discount: remise,
              priority: promotion.priorite
            };
            discounts.push(discount);
          }
        }
      }
    }
    article = getFinalDiscount(article, discounts);
    console.log(article);

    var output = {
      item: article,
      gifts: object
    };


    return output;
  }

  function getFinalDiscount(article, discounts)
  {
    console.log(discounts);

    var sortedDiscounts = sortDiscounts(discounts);

    var ht = getHT(article);

    var tva = getTVA(article) == null ? 0 : getTVA(article);

    article.ht = ht;

    article.tva = tva;

    var end = ht;

    console.log(discounts);

    if(discounts.length > 0)
    {
      console.log("have discounts !!");
      
      for(var i = 0, len = sortedDiscounts.length ; i < len ; i++)
      {
        var discountObject = sortedDiscounts[i];
        console.log(end);
        end-=end*(discountObject.discount/100);
        console.log(end);
      }

      article.remise = article.ht - end;
    }
    else
    {
      console.log("do not have discounts !!");
      article.remise = 0;
    }

    console.log(article);

    return article;

    
  }

  function sortDiscounts(discounts)
  {
    discounts = discounts.sort(function(a, b){
      if(a.priority > b.priority)
      {
        return 1;
      }
      else if(a.priority < b.priority)
      {
        return -1;
      }
      else
      {
        return 0;
      }

    });

    return discounts;
  }

  function getNonConsumedPromotions()
  {
    var ids = [];
    var promotions = JSON.parse(window.localStorage['promotions'] || "[]");
    for(var i = 0, len = promotions.length ; i < len ; i++)
    {
      var promotion = promotions[i];
      if(!promotion.consumed)
      {
        for(var j = 0, _len = promotion.articles.length ; j < _len ; j++)
        {
          var articleId = promotion.articles[j].id;
          ids.push(articleId);
        }
      }
    }
    return ids;
  }

  function getArticleQty(article)
  {
    if(article.uniteMesure == "CS")
    {
      
      return (article.unit / article.unitConversion) + article.packet;
    }
    else
    {
      
      return (article.packet*article.unitConversion) + article.unit ;
    }
  }


  function promotionTreatment(article, livreur)
  {
    if(article.promotions != null)
      {
        console.debug(article.promotions);
          
          var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
          var cart = JSON.parse(window.localStorage['cart'] || '{}');
          for(var i = 0 ; i < article.promotions.length ; i++)
          {
              for(var j = 0 ; j < promotions.length ; j++)
              {
                  if(promotions[j].id == article.promotions[i])
                  {
                      
                      // Count the qty of all articles that are inclueded in this promotion
                      var count = 0;
                      // Count ca of the articles
                      var ca = 0;
                      // total of all items in cart
                      var total = 0;
                      // saving all items in an array for PromotionPaliter promotion && especially for the non cummulable case
                      var items = [];


                      // Looping into all the articles in this promotion
                      for(var l = 0 ; l < cart.items.length ; l++)
                      {
                          //Now looping in all articles in CART
                          
                          for(var k = 0 ; k < promotions[j].articles.length ; k++)
                          {
                              if(false)
                              {
                                var item = cart.items[l];
                                var valid = ( item.stock - ( (item.packet * item.unitConversion) + item.unit) ) >= 0;
                                if(!valid && !item.valid)
                                {
                                  continue;
                                }
                              }

                              

                              if(cart.items[l].id_db == promotions[j].articles[k].id)
                              {
                                  var qty= (cart.items[l].packet*cart.items[l].unitConversion) + cart.items[l].unit;

                                  var csQty = cart.items[l].packet + ( cart.items[l].unit / cart.items[l].unitConversion);

                                  var articleQty = getArticleQty(cart.items[l]);

                                  var amount = 0;

                                  var finalQTY;

                                  // WORK WITH PROMOTION MEASURING UNIT !
                                  if(typeof(promotions[j].articles[k].conditionning_unit) != "undefined" && promotions[j].articles[k].conditionning_unit != null && promotions[j].articles[k].conditionning_unit != "")
                                  {
                                    // WORK WITH PROMOTION MEASURING UNIT !
                                     if(promotions[j].articles[k].conditionning_unit == "Un")
                                    {
                                        //TAKE UNIT QTY !
                                        finalQTY =  qty;

                                        if(cart.items[l].uniteMesure == "CS")
                                        {

                                          amount = (finalQTY / cart.items[l].unitConversion) * cart.items[l].prixVente;
                                        }
                                        else
                                        {

                                          amount = finalQTY * cart.items[l].prixVente;
                                        }
                                    }
                                    else
                                    {
                                        //TAKE BOX QTY !
                                        finalQTY = csQty;
                                        if(cart.items[l].uniteMesure == "CS")
                                        {
                                          amount = finalQTY * cart.items[l].prixVente;
                                        }
                                        else
                                        {
                                          amount = (finalQTY * cart.items[l].unitConversion) * cart.items[l].prixVente;
                                        }
                                    }
                                  }

                                  // WORK WITH ITEMS MEASURING UNIT !
                                  else
                                  {
                                    // TAKE QTY OF PRIME MEASURING UNIT OF THE ITEM !
                                    finalQTY = articleQty;
                                    amount = finalQTY *  cart.items[l].prixVente;
                                  }

                                  count+=finalQTY;
                                  ca+=amount;
                                  var itemObject = { id: cart.items[l].id_db, qty: finalQTY };
                                  items.push(itemObject);
                                  total+=amount;
                              }
                              else
                              {
                                continue;
                              }
                              
                              // HERE WE WILL SET SOME CONDITIONS TO IMPROVE PERFORMANCES !

                              // IF THE PROMOTION IS PMT WE SHOULD TEST THE %AX POSSIBLE VALUE TO ACHIEVE !!

                              // LIKE THAT WE CAN AVOID HEAVY ITERATIONS OVER THE PROMOTION ITEMS !!


                              ////////////////////////// PMT OPTIMIZATIONS !

                              if(promotions[j].type == "PMT" && ca >= promotions[j].ca)
                              {
                                if(promotions[j].promotion_palier.length > 0)
                                {
                                  var maxPP = 0;
                                  var infinite = false;
                                  for(var t = 0 ; t < promotions[j].promotion_palier.length ; t++)
                                  {
                                    var pp = promotions[j].promotion_palier[t];

                                    if(pp.montant > promotions[j].promotion_palier[maxPP].montant)
                                    {
                                      maxPP = t;
                                    }
                                    // SEARCH FOR AN INIFINTITE CUMMULATION !!
                                    if(pp.cummulable == 1 && pp.max == 0)
                                    { 
                                      // FOUND !!
                                      // WE CAN EXIT FROM NOW !!
                                      infinite = true;
                                      break;
                                    }

                                  }
                                  if(infinite)
                                  {
                                    continue;
                                  }
                                  else
                                  {
                                    if(ca >= promotions[j].promotion_palier[maxPP].montant)
                                    {
                                      // NOW CAN STOP THE ITERATION !!
                                      
                                      var currentCumule = Math.trunc(ca / promotions[j].promotion_palier[maxPP].montant);
                                      // IS CUMMULABLE
                                      if(promotions[j].promotion_palier[maxPP].cummulable == 1)
                                      {
                                        if(promotions[j].promotion_palier[maxPP].max > 0)
                                        {
                                          promotions[j].cumule = currentCumule >= promotions[j].promotion_palier[maxPP].max ? promotions[j].promotion_palier[maxPP].max : currentCumule;
                                        }
                                        else
                                        {
                                          promotions[j].cumule = currentCumule;
                                        }
                                      }
                                      // IS NOT CUMMULABLE
                                      else
                                      {
                                        promotions[j].cumule = 1;
                                      }
                                      if(promotions[j].promotion_palier[maxPP].remise > 0)
                                      {
                                        promotions[j].remise = promotions[j].promotion_palier[maxPP].remise;
                                      }
                                      if(promotions[j].promotion_palier[maxPP].qte > 0)
                                      {
                                        promotions[j].qte = promotions[j].promotion_palier[maxPP].qte;
                                      }
                                      break;
                                    }
                                  }
                                  
                                  
                                }
                                else
                                {
                                  if(promotions[j].cummulable == 1)
                                  {

                                    if(promotions[j].max != null && promotions[j].max != 0)
                                    {


                                      var canExit = promotions[j].max * promotions[j].ca <= ca;

                                      if(canExit)
                                      {
                                        var currentCumule = Math.trunc(ca / promotions[j].ca);
                                        promotions[j].cumule = currentCumule >= promotions[j].max ? promotions[j].max : currentCumule;
                                        break;
                                      }
                                      else
                                      {
                                        continue;
                                      }
                                      
                                    }
                                  }
                                  else
                                  {
                                    break;
                                  }
                                }
                              }
                              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                          }

                      }
                      // END OF LOOOOOOOOOOOOOOOOOP !!
                      if(promotions[j].type == "PR")
                      {
                        promotions[j].consumed = true;
                      }
                      if(promotions[j].type == "PMT")
                      {
                          
                          if(ca>=promotions[j].ca)
                          {
                              promotions[j].consumed = true;
                               window.localStorage['change'] = "true";
                              promotions[j].currentTotal = ca;
                          }
                          else
                          {
                              promotions[j].consumed = false;
                               window.localStorage['change'] = "true";
                              promotions[j].currentTotal = 0;
                          }
                      }
                      if(promotions[j].type == "PP")
                      {
                          if(Boolean(promotions[j].melange))
                          {
                              
                              if(Boolean(promotions[j].cummulable))
                              {
                                  if(promotions[j].qte <= count)
                                  {
                                      promotions[j].consumed = true;
                                       window.localStorage['change'] = "true";
                                      var repetitions = Math.trunc(count / promotions[j].qte);
                                      if(promotions[j].max == null || promotions[j].max == 0 || typeof(promotions[j].max) ==  "undefined")
                                      {
                                          promotions[j].cumule = repetitions;
                                      }
                                      else
                                      {
                                          if(repetitions >= promotions[j].max)
                                          {
                                              promotions[j].cumule = promotions[j].max;
                                          }
                                          else
                                          {
                                              promotions[j].cumule = repetitions;
                                          }
                                      }
                                  }
                                  else
                                  {
                                      promotions[j].consumed = false;
                                       window.localStorage['change'] = "true";
                                  }
                              }
                              else
                              {
                                  if(promotions[j].qte <= count)
                                  {
                                      promotions[j].consumed = true;
                                       window.localStorage['change'] = "true";
                                      promotions[j].cumule = 1;
                                  }
                                  else
                                  {
                                      promotions[j].consumed = false;
                                       window.localStorage['change'] = "true";
                                      promotions[j].cumule = 0;
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
                                                  console.log(promotions[j].articles[m].qty);
                                                  items[n].qty = Math.trunc(items[n].qty/promotions[j].articles[m].qty)
                                                  ++count;
                                              }
                                          }
                                      }
                                  }
                                  if(count == promotions[j].articles.length)
                                  {
                                      var trunQty = 0;
                                      var minForCumule = items[0].qty;
                                      var consommable = false;
                                      for(var n = 0; n < items.length; n++)
                                      {
                                          trunQty+=items[n].qty;
                                          if(items[n].qty >= 2)
                                          {
                                              consommable = true;
                                              if(minForCumule>items[n].qty)
                                              {
                                                  minForCumule = items[n].qty;
                                              }
                                          }
                                      }
                                      if(Boolean(promotions[j].cummulable))
                                      {
                                          if(promotions[j].max == null || promotions[j].max == 0 || typeof(promotions[j].max) == "undefined")
                                          {
                                            promotions[j].cumule = minForCumule;
                                          }
                                          else
                                          {
                                            if(minForCumule >= promotions[j].max)
                                            {
                                              promotions[j].cumule = promotions[j].max;
                                            }
                                            else
                                            {
                                              promotions[j].cumule = minForCumule;
                                            }
                                          }
                                      }
                                      else
                                      {
                                        promotions[j].cumule = 1;
                                      }
                                      promotions[j].consumed = true;
                                      window.localStorage['change'] = "true";
                                      
                                  }
                                  else
                                  {
                                      promotions[j].consumed = false;
                                      window.localStorage['change'] = "true";
                                  }
                              }
                              else
                              {
                                  promotions[j].consumed = false;
                                  window.localStorage['change'] = "true";
                              }
                          }
                      }
                  }
              }
              window.localStorage['promotions'] = JSON.stringify(promotions);
          }
      }
  }
  
  function getAllPromotions(){
    var sql_query = "SELECT * FROM promotions;";
    return DB.query(sql_query).then(
      function(result){
        return DB.fetchAll(result);
      });
  };

  function getClientPromotions(client_id){
    var id = "id";
    var qty = "qty";
    var sql_query = 'SELECT ifnull("[" || Group_Concat(DISTINCT "{ ""montant"":" ||ifnull(PP.montant, 0)||", ""remise"": " || ifnull(PP.remise, 0)|| ", ""qte"" :" || ifnull(PP.qte, 0) || ", ""cummulable"": " || PP.cummulable ||", ""max"" : " || ifnull(PP.max, 0)  ||" }") || "]", "[]") AS promotion_palier, PG.priorite, P.id_db AS "id", P.type, P.qte, P.melange, Group_Concat(DISTINCT PC.client_id) as clients, P.conditionning_unit AS "cu", P.max_steps AS "max", P.cummulable, P.ca, P.starts_at AS "starts", P.ends_at AS "ends", P.activated as "activated", Group_Concat(DISTINCT PI.promotion_secondary) AS "inclusions", Group_Concat(DISTINCT PE.promotion_secondary) AS "exclusions", "[" || Group_Concat(DISTINCT "{""id"":" || PA.article_id ||", ""qty"":" || ifnull(PA.qty, 0) || ", ""conditionning_unit"": """ || ifnull(PA.conditionning_unit, "") ||  """}") || "]" AS "articles" , "[" || Group_Concat(DISTINCT "{""id"":" || GA.article_id ||", ""qty"":" || ifnull(GA.qte, 0) || ", ""group"": " || ifnull(GA.groupe, 0) || ", ""designation"":""" || A.nomArticle || """}") || "]" AS "gratuites", PG.remise AS "remise" FROM promotions AS P LEFT JOIN promotion_palier as PP ON PP.id_promotion = P.id_db LEFT JOIN promotion_client AS PC ON PC.promotion_id = P.id_db LEFT JOIN clients AS C ON C.id_db = PC.client_id LEFT JOIN promotion_article AS PA ON PA.promotion_id = P.id_db LEFT JOIN promotion_inclusion AS PI ON PI.promotion_primary = P.id_db LEFT JOIN promotion_exclusion AS PE ON PE.promotion_primary = P.id_db  LEFT JOIN promotion_gratuite AS PG ON PG.promotion_id = P.id_db LEFT  JOIN gratuite_article AS GA ON GA.promotion_gratuite_id = PG.id LEFT JOIN articles AS A ON A.id_db = GA.article_id WHERE (P.type == "PC" AND PC.client_id = ?) OR (P.type != "PC") GROUP BY P.id_db;';
    var bindings = [client_id];
    return DB.query(sql_query, bindings)
    .then(
      function(promotions){
        console.log(promotions);
        return DB.fetchAll(promotions);
      }, 
      function(error){
        return error;
      });
  }

  function deletePromotion(_id){
    var sql_query  = "DELETE FROM promotions WHERE id = ?";
      var bindings = [_id];
      return DB.query(sql_query, bindings).then(
        function(result){
          return "La promotion a été supprimé.";
        },
        function(error){
          return "Une erreur est survenu : "+error.message;
        });
  };
  


  function syncPromotions(){
    var JSONCONTENT = [{"id":1,"priorite":null,"qte":null,"montant":null,"max_steps":null,"cummulable":true,"type":"PP","pourcentage":null,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":null,"coupons":false,"article_gratuits":[[{"itemId":3,"quantite":1,"uconditionement":"Un"}]],"article_en_promo":[{"itemId":1,"quantite":10,"uconditionement":"Un"},{"itemId":2,"quantite":12,"uconditionement":"Un"}],"include":[],"exlude":[],"client":[],"promoPaliers":[]},{"id":2,"priorite":null,"qte":null,"montant":1000.0,"max_steps":3,"cummulable":true,"type":"PMT","pourcentage":null,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":false,"coupons":true,"article_gratuits":[[{"itemId":35,"quantite":1,"uconditionement":"Un"}],[{"itemId":36,"quantite":2,"uconditionement":"Un"}]],"article_en_promo":[{"itemId":3,"quantite":null,"uconditionement":"Un"}],"include":[],"exlude":[],"client":[],"promoPaliers":[]},{"id":4,"priorite":null,"qte":null,"montant":20000.0,"max_steps":0,"cummulable":false,"type":"PC","pourcentage":2.0,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":false,"coupons":false,"article_gratuits":[],"article_en_promo":[],"include":[],"exlude":[],"client":[32786],"promoPaliers":[]},{"id":5,"priorite":null,"qte":null,"montant":1000.0,"max_steps":null,"cummulable":false,"type":"PMT","pourcentage":2.0,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":false,"coupons":false,"article_gratuits":[],"article_en_promo":[{"itemId":746,"quantite":null,"uconditionement":"Un"}],"include":[],"exlude":[],"client":[],"promoPaliers":[]},{"id":6,"priorite":null,"qte":null,"montant":10000.0,"max_steps":0,"cummulable":false,"type":"PC","pourcentage":2.0,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":false,"coupons":false,"article_gratuits":[],"article_en_promo":[],"include":[],"exlude":[],"client":[32785,32786],"promoPaliers":[]},{"id":10,"priorite":null,"qte":null,"montant":10000.0,"max_steps":0,"cummulable":false,"type":"PC","pourcentage":3.0,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":false,"coupons":false,"article_gratuits":[],"article_en_promo":[],"include":[],"exlude":[],"client":[32787],"promoPaliers":[]},{"id":15,"priorite":null,"qte":null,"montant":null,"max_steps":0,"cummulable":false,"type":"PR","pourcentage":3.0,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":false,"coupons":false,"article_gratuits":[],"article_en_promo":[{"itemId":746,"quantite":null,"uconditionement":null}],"include":[],"exlude":[],"client":[],"promoPaliers":[]},{"id":18,"priorite":null,"qte":null,"montant":30000.0,"max_steps":0,"cummulable":false,"type":"PC","pourcentage":5.0,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":false,"coupons":false,"article_gratuits":[],"article_en_promo":[],"include":[],"exlude":[],"client":[32784,32783],"promoPaliers":[]},{"id":19,"priorite":null,"qte":null,"montant":15000.0,"max_steps":0,"cummulable":false,"type":"PC","pourcentage":2.0,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":false,"coupons":false,"article_gratuits":[],"article_en_promo":[],"include":[],"exlude":[],"client":[32783],"promoPaliers":[]},{"id":20,"priorite":null,"qte":null,"montant":null,"max_steps":0,"cummulable":false,"type":"PR","pourcentage":3.0,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":false,"coupons":false,"article_gratuits":[],"article_en_promo":[{"itemId":509,"quantite":null,"uconditionement":null}],"include":[],"exlude":[],"client":[],"promoPaliers":[]},{"id":21,"priorite":null,"qte":null,"montant":null,"max_steps":3,"cummulable":true,"type":"PP","pourcentage":null,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":null,"coupons":false,"article_gratuits":[[{"itemId":511,"quantite":2,"uconditionement":"Un"}]],"article_en_promo":[{"itemId":509,"quantite":6,"uconditionement":"Un"},{"itemId":510,"quantite":4,"uconditionement":"Un"}],"include":[],"exlude":[],"client":[],"promoPaliers":[]},{"id":25,"priorite":null,"qte":12,"montant":null,"max_steps":null,"cummulable":false,"type":"PP","pourcentage":null,"starts_at":"2016-01-01","ends_at":"2016-01-31","activated":true,"conditionning_unit":null,"melange":true,"coupons":true,"article_gratuits":[[{"itemId":2,"quantite":1,"uconditionement":"Un"}],[{"itemId":3,"quantite":2,"uconditionement":"Un"}],[{"itemId":35,"quantite":1,"uconditionement":"Un"}]],"article_en_promo":[{"itemId":746,"quantite":null,"uconditionement":"Un"},{"itemId":1,"quantite":null,"uconditionement":"Un"}],"include":[],"exlude":[],"client":[],"promoPaliers":[]}];
    var deferred = $q.defer();
    var request = {
      url: "http://192.168.100.36:8082/newsales/rest/promotions/AllPromoParMois",
      method: "GET"
    };
    var count = 0;
    $http(request).then(
      function(success){
        console.log(success.data);
        angular.forEach(success.data, function(promotion){
          console.log(promotion);
          addPromotion(promotion).then(
            function(success){
              console.log(success);
              if(typeof success.insertId != "undefined")
              {
                console.log("added");
                console.log(promotion);
              
                if(promotion.type == 'PP' || promotion.type == 'PMT' || promotion.type == 'PR')
                {
                  for(var j = 0 ; j < promotion.article_en_promo.length; j++)
                  {
                    var article = promotion.article_en_promo[j];
                    console.log(article);
                    promotionArticle(promotion.id, article)
                    .then(
                      function(success){
                        console.log(success);
                      }, 
                      function(error){
                        console.log(JSON.stringify(error));
                      });
                  }
                  if(promotion.promoPaliers != null && promotion.promoPaliers.length > 0)
                  {
                    var addons = [];
                    for(var j = 0 ; j < promotion.promoPaliers.length ; j++)
                    {
                      var pp = promotion.promoPaliers[j];
                      addons.push("("+promotion.id+", "+pp.montant+", "+pp.remise+", "+pp.quantite+", "+(pp.cummulable ? 1 : 0)+", "+pp.nbCumulable+")");
                    }
                    console.log(addons);
                    DB.query("INSERT INTO promotion_palier (id_promotion, montant, remise, qte, cummulable, max) VALUES "+addons.join(", ")+";")
                    .then(
                      function(success){
                        console.debug(success);
                      }, 
                      function(error){
                        console.debug(error);
                      });
                  }


                  promotionGratuite(promotion.id, promotion.pourcentage, promotion.priorite == null ? 0 : promotion.priorite).then(
                      function(success){
                        $log.debug(success);
                        for(var j = 0 ; j < promotion.article_gratuits.length ; j++)
                        {
                          var articles = promotion.article_gratuits[j];
                          $log.debug(articles);
                          for(var k = 0 ; k < articles.length ; k++)
                          {
                            var article = articles[k];
                            promotionGratuiteArticle(success.insertId, article.itemId, article.quantite, j).then(
                            function(success){
                              $log.debug(success);
                            },
                            function(error){
                              $log.error(error);
                            });
                          }
                        }

                      }, 
                      function(error)
                      {
                        console.log(JSON.stringify(error));
                      });
                                 
                }

                else if(promotion.type == 'PC')
                {
                  angular.forEach(promotion.client, function(client){
                    promotionClient(promotion.id, client)
                    .then(
                      function(success){
                        console.log(JSON.stringify(success));
                      }, 
                      function(error){
                        console.log(JSON.stringify(error));
                      });
                  });
                }
                
              }
              else
              {
                deferred.resolve("Vos promotions sont à jour !");
                console.log("not added");
              }
             }, 
            function(error){
              console.log(error);
              deferred.resolve(error);
            });
          
        });

      },
      function(error){
        deferred.resolve(error);
      });
    console.log(count);
    deferred.resolve(count);
    return deferred.promise;

  }

  function promotionClient(promotion_id, client_id)
  {
    var sql_query = "INSERT INTO promotion_client(promotion_id, client_id) VALUES(?,?);";
    var bindings = [promotion_id, client_id];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      }); 
  }

  function promotionGratuite(promotionId, remise, priorite)
  {
    var sql_query = "INSERT INTO promotion_gratuite(promotion_id, remise, priorite) VALUES(?,?,?);";
    var bindings = [promotionId, remise, priorite];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      }); 
  }

  function promotionGratuiteArticle(promotionGratuiteId, articleId, qty, giftGroup)
  {
    var sql_query = "INSERT INTO gratuite_article(promotion_gratuite_id, article_id, qte, groupe) VALUES(?,?,?,?);";
    var bindings = [promotionGratuiteId, articleId, qty, giftGroup];
    return DB.query(sql_query, bindings).then(
      function(success){
        console.debug(success);
        return success;
      }, 
      function(error){
        console.error(error);
        return error;
      }); 
  }
  

  function promotionArticle(id_db, article)
  {
    var sql_query = "INSERT INTO promotion_article(promotion_id, article_id, qty, conditionning_unit) VALUES (?,?,?,?);";
    var bindings = [id_db, article.itemId, article.quantite, article.uconditionement];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      })
  }

  function addPromotion(promotion)
  {
    var sql_query = "INSERT INTO promotions(id_db, qte, ca, max_steps, cummulable, type, starts_at, ends_at, activated, conditionning_unit, melange) VALUES(?,?,?,?,?,?,?,?,?,?,?);";
    var bindings = [promotion.id, promotion.qte, promotion.montant, promotion.max_steps, promotion.cummulable == true ? 1 : 0, promotion.type, promotion.starts_at, promotion.ends_at, promotion.activated == true ? 1 : 0, promotion.conditionning_unit, promotion.melange == true ? 1 : 0];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
        return error;
      });
  }


})

.factory('PromotionsBackend', function($q, $http){
  var deferred = $q.defer();
  return {
    getAllPromotions : getAllPromotions
  };

  function getAllPromotions(){
    var req = {
      method : "GET",
      url : "http://url_back_end/route"
    };
    return $http(req).then(
      function(data, status, headers){
        // On va ajouter ici quelque lignes de codes
        deferred.resolve(data);
      }, 
      function(data, status, headers){
        deferred.reject(data);
      });
    return deferred.promise;
  }
})

.factory('SynchronizationService', ['$q', '$http', 'DB', 'Routes', 'Accounts', 'Profile', function($q, $http, DB, Routes, Accounts, Profile){
  return {
    sync : sync
  };

  function sync(){
    var deferred = $q.defer();
    $http.get("http://197.230.28.154:81/newsales/rest/clients/road/1/sync")
    .then(
      
      function(data, status, headers){
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(data.data.id));
       var idAPI = data.data.id;
       console.log("HIGHEST ID IN API : "+idAPI);
       Routes.getLastRoute().then(
        function(data){
          console.log(data);
          var idDB = data.id_db;
          console.log(idDB);
          if(idAPI > idDB)
          {
            console.log("YOUR CURRENT DATABASE IS NOT UP TO DATE !");
            console.log((idAPI-idDB)+" routes are waitiing to be pushed in your local DB");
            console.log("HERE IS THE ROUTES !!");
            $http.get("http://197.230.28.154:81/newsales/rest/clients/road/1/sync/"+idDB).then(
              function(data, status, headers){
                var clients = data.data;
                angular.forEach(clients, function(client){
                  var route = {};
                  route.id_db = client.id;
                  route.code_route = (client.codeClient === null) ? "ROUTE"+(Math.round(Math.random()*10)) : client.codeClient;
                  route.client_id = client.id;
                  route.address = "8, IBN HABIB BOURGOGNE"
                  route.lat = "21.254545";
                  route.lng = "2.245445";
                  route.date_max = Date.now();
                  route.state = client.visited;

                  Routes.addRoute(route).then(
                    function(data){
                      console.log("ROUTE BELOW :");
                      console.log(JSON.stringify(data));
                    }, 
                    function(error){
                      console.log("YOUR LOCAL DB IS UP TO DATE !!");
                    });
                 });
                deferred.resolve("Mise à jour avec succès.");

              },
              function(error, status, headers){
                deferred.reject("Erreur survenue lors de la connection");

              }
              );
          }
          else
          {
            console.log("YOUR LOCAL DB IS UP TO DATE !!");
            deferred.reject("L'application est à jour.");
          }
        }, 
        function(error){
          deferred.reject("Erreur survenue lors de la connection");
        });

    },
      function(error, status, headers){
      deferred.reject("Erreur survenue lors de la connection");
    });

    return deferred.promise;
  }

  function highestIDInDB()
  {
    $http.get("http://197.230.28.154:81/newsales/rest/roads/check")
    .success(function(data, status, headers){
      console.log("THE HIGHEST ID IN DB IS : "+data.id);
    })
    .error(function(error, status, headers){
      console.log(error);
    });
  }
  

  

}]);
