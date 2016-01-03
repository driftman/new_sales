
var DB_CONFIG = { 
    name : "new_sales",
    tables : 
    [
      {
        name : "clients",
        check_url : "http://localhost:8082/rest/vendor/roads/check",
        synchronize_url : "http://localhost:8082/rest/roads/sync/",
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
          { name : "route", value : "integer"}
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
        name: "surveys",
        columns : [
          { name : "id", value : "integer primary key autoincrement"},
          { name : "question", value : "text not null"},
          { name : "answers", value : "text not null"},
          { name : "required", value : "boolean"},
          { name : "activity", value : "text"}
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
          { name : "logo", value : "text"}
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
          { name : "vendeur", value : "integer not null"}
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
          { name : "FOREIGN KEY(id_mission)", value : "REFERENCES missions(id)"},
          { name : "FOREIGN KEY(id_client)", value : "REFERENCES clients(id_db)"},
                  ]
      },

      {
        name : "commandes_livreur",
        columns : [
          { name : "id_db" , value : "integer primary key" },
          { name : "code_commande", value : "text unique not null" },
          { name : "id_mission", value : "integer unique not null"},
          { name : "id_client", value : "integer not null"},
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
          { name : "groupe", value : "text"},
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
          { name : "username" , value : "text unique not null " },
          { name : "password" , value : "text not null " },
          { name : "first_login" , value : "boolean not null "},
          { name : "question_secrete" , value : "text not null"},
          { name : "reponse_secrete" , value : "text not null"},
          { name : "bloque", value : "boolean not null"},
          { name : "golden_points", value : "long"},
          { name : "golden_stores", value : "long"},
          { name : "fonction", value : "text"}
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

.filter('backgroundSBD', function(){
  return function(input){

    if(input.groupeSBD != null && input.done == false)
    {
      return '#42A5F5';
    }
    else
    {
      return 'transparent';
    }

  };
})

.filter('day', function(){
  return function(input){
    switch(input)
    {
      case 1:
        return "lundi";
        break;
      case 2:
        return "mardi";
        break;
      case 3:
        return "mercredi";
        break;
      case 4:
        return "jeudi";
        break;
      case 5:
        return "vendredi";
        break;
      case 6:
        return "samedi";
        break;
      default:
        break;
    }
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

.filter('totalBrandFive', function(){
  return function(brands){
    var total = 0;
    angular.forEach(brands, function(brand){
      total+=brand.somme;
    });
    return total;
  };
})


.filter('clientNotNull', function(){
  return function(input){
    for(var i = 0; i < input.length ; i++)
    {
      if(input[i].client === null)
      {
        input.pop(i);
      }
    }
    return input;
  };
})

.filter('promotionFilter', function(){
  return function(input){
    if(input === "PMTF")
    {
      return "Promotion Montant Total Fix";
    }
    else if(input === "PMTP")
    {
      return "Promotion Montant Total Pourcentage";
    }
    else if(input === "PPF")
    {
      return "Promotion Palier Fix";
    }
    else if(input === "PPV")
    {
      return "Promotion Palier Variable";
    }
    else if(input === "PC")
    {
      return "Promotion Client";
    }
    else
    {
      return "Promotion";
    }
  };
})

.filter('total', function(){
  return function(items){
    var total = 0;
    angular.forEach(items, function(item){
      total+=((item.packet*10+item.unit)*item.prixVente);
    });
    return total;
  };
})

.filter('promotion', function()
{
  return function(total){
    var promotions = JSON.parse(window.localStorage['promotions'] || 'null');
    if(promotions == null || ((promotions != null) && (!promotions.length > 0)))
    {
      return total;
    }
    else
    {
      var remises = [];
      angular.forEach(promotions, function(promotion){
        if(promotion.consumed && promotion.remise != null && promotion.remise > 0)
        {
          remises.push(promotion.remise);
        }
      });

      if(remises.length > 0)
      {
        var max = remises[0];
        for(var i = 1; i < remises.length ; i++)
        {
          if(remises[i]>max)
          {
            max = remises[i];
          }
        }
      }
      else
      {
        return total;
      }
      return (total - (total * (max/100)));
    }
  };

})

.filter('remaining', function(){
  return function(value, param){
    var finalArticles = [];
    if(param == "sbd")
    {
      finalArticles = [];
      for(var i = 0 ; i < value.length ; i++)
      {
        if(value[i].groupeSBD != null)
        {
          finalArticles.push(value[i]);
        }
      }
      return finalArticles;
    }
    else if(param == "promotion")
    {
      finalArticles = [];
      for(var i = 0 ; i < value.length ; i++)
      {
        if(value[i].promotions != null && value[i].promotions.length > 0)
        {
          finalArticles.push(value[i]);
        }
      }
      return finalArticles;
    }
    else
    {
      return value;
    }
  };
})


.filter('image', function(){
  return function(input){
    if(input == null)
    {
      return;
    }
    else
    {
      return input;
    }
  }
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
.filter('ht', function(){
  return function(lignesCommande){
    var ht = 0;
    angular.forEach(lignesCommande, function(ligne){
      ht+=(ligne.pu_ht * ligne.qte);
    });
    return ht;
  };
})
.filter('ttc', function(){
  return function(lignesCommande){
    var ttc = 0;
    angular.forEach(lignesCommande, function(ligne){
      ttc+=(ligne.pu_ttc * ligne.qte);
    });
    return ttc;
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
        db = window.sqlitePlugin.openDatabase({name: "my.db", androidDatabaseImplementation: 2, androidLockWorkaround: 1}
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
    var deferred = $q.defer();
    var request = {
      url: "http://192.168.100.181:8082/newsales/rest/activities/1/questions",
      method: "GET"
    };
    $http(request).then(
      function(success){  
        var surveys = success.data.content;
        var addonsSurveys = [];
        for(var i = 0 ; i < surveys.length ; i++)
        {
          addonSurvey = "("+surveys[i].id+", '"+surveys[i].question+"', '"+surveys[i].answers.join(", ")+"', "+(surveys[i].required ? 1 : 0)+")";
          addonsSurveys.push(addonSurvey)
        }
        var request = "INSERT INTO surveys (id, question, answers, required) VALUES "+addonsSurveys.join(", ")+";";
        deferred.resolve(request);
      }, 
      function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  }

  function addSurveysToDB()
  {
    var deferred = $q.defer();
    sync().then(
      function(success){
        var requests = [];
        requests.push("DELETE FROM surveys;");
        requests.push(success);
        angular.forEach(requests, function(request){
          DB.query(request).then(
          function(success){
            deferred.resolve(success);
          }, 
          function(error){
            deferred.reject(error);
          });
        });
      }, 
      function(error){
        console.log(error);
        deferred.reject(error);
      });
    return deferred.promise;
  }

})

.factory("ModePaiement", function(DB){
  return {
    getAll : getAll
  };

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
})

.factory("SynchronisationV2", function(DB, $q, $http, Surveys, Missions, Clients, Routes){

  return {
    syncV2 : syncV2,
    gatherSyncData : gatherSyncData,
    gatherSyncOutputData : gatherSyncOutputData
  };

  function convertMissionObjectToRequestOption(mission)
  {
    return "("+mission.id+", '"+mission.codeMission+"', "+mission.client+", "+mission.route+", '"+mission.date+"')";
  }

  function convertClientObjectToRequestOption(client)
  {
    return "("+client.id+", '"+client.codeClient+"', '"+client.address+"', "+client.latitude.replace(/,/g, ".")+", "+client.longitude.replace(/,/g, ".")+", '"+client.nom+"', '"+client.prenom+"', '"+client.email+"', "+client.goldenPoints+", "+client.route+")";
  }
  function convertRouteObjectToRequestOption(route, vendeurId)
  {
    return "("+route.id+", '"+route.codeRoute+"', '"+route.nomRoute+"', "+0+", "+vendeurId+")";
  }
  function convertArticleObjectToRequestOption(article)
  {
    return "("+article.id+", '"+article.code+"', '"+article.shortDescription.replace(/[']/g, "")+"', "+article.prixVente+", "+article.tva+", '"+article.conditioningUnitFirst+"', '"+article.conditioningUnitSecond+"', '"+article.marque+"', '"+article.sousMarque+"', "+article.unitConversion+")";
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
        url: "http://localhost:8080/rest/orders/add",
        method: "POST",
        data: commandesToAPI
      };
    return $http(request);
  }

  function syncCommandes(idVendeur)
  {
    var deferred = $q.defer();
    var sql_query = 'SELECT M.id AS mobile, M.client_id AS client, M.route_id AS route, M.state AS etat, M.id_db AS api,  "["||Group_Concat("{ ""id_article"": "||LC.id_article||", ""unite"": "||LC.unit||",  ""prix"": "||LC.pu_ht||", ""caisse"": "||LC.packet||" }")||"]" as lignes FROM missions AS M JOIN commandes AS C ON C.id = M.commande_id JOIN ligneCommandes AS LC ON LC.id_commande = C.id WHERE M.synced = 0 AND M.state = 1 AND M.route_id IN (SELECT id_db from routes WHERE vendeur = '+idVendeur+') GROUP BY C.id';
    DB.query(sql_query).then(
      function(success){
        var commandes = DB.fetchAll(success);
        for(var i = 0 ; i < commandes.length ; i++)
            {
              commandes[i].lignes = JSON.parse(commandes[i].lignes);
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
    combineOutputAndInput(vendeurId).then(
      function(success){
          console.log(success);
          var object = success[0];
          //console.log(success[2]);
          object.commandes = success[1];
          console.log(object);
          gatherSyncData(object, vendeurId).then(
          function(success){
            console.log(success);
            if(success.data.ids != null && success.data.ids.length > 0)
              {
                requests.push('UPDATE missions SET synced = 1 WHERE id IN ('+success.data.ids.join(",")+')');
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
                requests.push("INSERT INTO missions(id_db, code_mission, client_id, route_id, date_start) VALUES "+addonsMissions.join(", ")+";");
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
                  requests.push("INSERT INTO missions(id_db, code_mission, client_id, route_id, date_start) VALUES "+addonsMissions.join(", ")+";");
                  addonsMissions = [];
                }
              }
            }

            var articles = success.data.articles;
            if(articles != null && articles.length > 0)
            {
              if(articles.length < 500)
              {
                for(var i = 0 ; i < articles.length ; i++)
                {
                  addonsArticles.push(convertArticleObjectToRequestOption(articles[i]));
                }
                requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion) VALUES "+addonsArticles.join(", ")+";");
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
                    addonsArticles.push(convertArticleObjectToRequestOption(articles_group[j]));
                  }
                  requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion) VALUES "+addonsArticles.join(", ")+";");
                  addonsArticles = [];
                }
              }
            }
            





            if(success.data.clients != null && success.data.clients.length > 0)
            {
              console.log(success.data.clients);
              for(var i = 0 ; i < success.data.clients.length ; i++)
              {
                addonsClients.push(convertClientObjectToRequestOption(success.data.clients[i]));
              }
              requests.push("INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email, golden_store, route) VALUES"+ addonsClients.join(", ")+";");
            }
            if(success.data.routes != null && success.data.routes.length > 0)
            {
              for(var i = 0 ; i < success.data.routes.length ; i++)
              {
                addonsRoutes.push(convertRouteObjectToRequestOption(success.data.routes[i], vendeurId));
              }
              requests.push("INSERT INTO routes(id_db, code, nom, desactive, vendeur) VALUES "+addonsRoutes.join(", ")+" ;");
            }
            if(requests.length > 0)
            {
              angular.forEach(requests, function(request){
                var test  = 0;
                console.log(request);
                DB.query(request).then(
                function(success){
                  deferred.resolve(success);
                },  
                function(error){
                  deferred.reject("Erreur lors de l'ajout des missions !");
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

      })
    var requests = [];
    
    /*syncCommandes(2).then(
      function(success){
        var ids = success.data;
        requests.push('UPDATE missions SET synced = 1 WHERE id IN ('+ids.join(",")+')');
      }, 
      function(error){
        console.log(error);
      });*/
    
    return deferred.promise;
  }

  function gatherSyncData(syncData, vendeurId)
  {
      var request = {
        url: "http://localhost:8080/rest/vendors/"+vendeurId+"/mobile/synchronisation",
        method: "POST",
        data: syncData
      };
      return $http(request);
  }
  function combineOutputAndInput(vendeurId)
  {
    var inputData = gatherSyncOutputData(vendeurId);
    var outputData = syncCommandes(vendeurId);
    var surveys = Surveys.addSurveysToDB();
    return $q.all(new Array(inputData, outputData));
  }
  function maxOfEach(idVendeur)
  {
    var sql_query = "select ifnull(r.id_db, 0) AS max_routes, ifnull((SELECT id_db FROM articles ORDER BY id_db DESC LIMIT 1), 0) as max_articles, ifnull((SELECT m.id_db FROM missions m WHERE m.route_id IN (SELECT r.id_db FROM routes r WHERE r.vendeur = ?) ORDER BY m.id_db DESC LIMIT 1),0) AS max_missions, ifnull((SELECT c.id_db FROM clients c WHERE c.route IN (SELECT r.id_db FROM routes r WHERE r.vendeur =?) ORDER BY c.id_db DESC LIMIT 1),0) AS max_clients from routes r WHERE r.vendeur = ? ORDER BY r.id_db DESC LIMIT 1;";
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
.factory("SBD", function(DB,$http){
  return  {
    syncSBDFromAPI : syncSBDFromAPI
  };

  function syncSBDFromAPI()
  {
    var request = {
      url: 'http://localhost:8082/rest/classes/getAllClasseVerboseDTOs',
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
        console.log(JSON.stringify(error));
      });
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
.factory('EntryPoint', function($q, Promotions, Articles, Surveys){

  return {
    prepare : prepare
  };
  function prepare()
  {

      var mission = JSON.parse(window.localStorage['missions'] || '{}');

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
            }, 
            function(error){
              window.localStorage["surveys"] = JSON.stringify([]);
            });
        }

        //INITIALIZE THE PROMOTIONS !!
        if(typeof window.localStorage["promotions"] == "undefined")
        {
            
           Promotions.getClientPromotions(1).then(
            function(result){
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
                window.localStorage["promotions"] = JSON.stringify(result);
            }, 
            function(error){
                console.log(error.message);
            });
        }

        //INITIALIZE THE SBD !!
        if(typeof window.localStorage['sbd'] == 'undefined')
        {
            Articles.getArticleWithSBD().then(
            function(result){
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



      }
  }
})
.factory("CallSteps", function(DB, $q){

  return {
    get : get,
    checkForSteps : checkForSteps,
    checkPoint : checkPoint
  };

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
    var deferred = $q.defer();
    var callSteps = JSON.parse(window.localStorage['callSteps']);
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
      url: "http://localhost:8082/rest/livreurs/"+_idLivreur+"/missions/check",
      method: "GET"
    };
    return $http(request);
  }

  function getAllFromApi(_idLivreur)
  {
    var request = {
      url: "http://localhost:8080/rest/livreurs/"+_idLivreur+"/missions",
      method: "GET"
    };
    return $http(request);
  }


  function getFromAPointApi(_idLivreur, point)
  {
    var request = {
      url: "http://localhost:8082/rest/livreurs/"+_idLivreur+"/missions/from/"+point,
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
                    function(errir){
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
    var sql_query = 'SELECT ML.id_db, ML.state AS state,  ML.code_mission, CLI.nom AS nom, CLI.address AS address, CLI.prenom AS prenom, CL.code_commande, CL.id_db AS id_commande, "["||Group_Concat("{ ""id_article"": "||LCL.id_article||", ""designation"": """||ART.nomArticle||""", ""unite"": "||LCL.unit||",  ""prix"": "||LCL.pu_ht||", ""caisse"": "||LCL.packet||" }")||"]" as lignes from missions_livreur AS ML LEFT JOIN clients AS CLI ON CLI.id_db = ML.client_id LEFT JOIN commandes_livreur AS CL ON CL.id_mission = ML.id_db LEFT JOIN ligneCommandes_livreur AS LCL ON LCL.id_commande = CL.id_db LEFT JOIN articles AS ART ON ART.id_db = LCL.id_article where livreur = ? GROUP BY ML.id_db';
    var bindings = [_idLivreur];
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
    getLivreurMission : getLivreurMission
  };

})

.factory("LigneCommandes", function(DB){
  return {
    getLigneCommande : getLigneCommande,
    addLigneCommande : addLigneCommande,
    addLigneCommandeLivreur :addLigneCommandeLivreur,
    pastPurchacedQuantity : pastPurchacedQuantity
  };

  function addLigneCommande(ligneCommande, _idCommande)
  {
    var sql_query = "INSERT INTO ligneCommandes(id_commande, id_article, unit, packet, pu_ht) values(?,?,?,?,?);"
    var bindings = [_idCommande, ligneCommande.id, ligneCommande.unit, ligneCommande.packet, ligneCommande.prixVente];
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
        url: "http://192.168.100.36:8082/newsales/rest/orders/add",
        method: "POST",
        data: commandesToAPI
      };
    return $http(request);
  }

  function syncCommandes()
  {
    var sql_query = 'SELECT M.id AS mobile, M.client_id AS client, M.route_id AS route, M.state AS etat, M.id_db AS api,  "["||Group_Concat("{ ""id_article"": "||LC.id_article||", ""unite"": "||LC.unit||",  ""prix"": "||LC.pu_ht||", ""caisse"": "||LC.packet||" }")||"]" as lignes FROM missions AS M JOIN commandes AS C ON C.id = M.commande_id JOIN ligneCommandes AS LC ON LC.id_commande = C.id WHERE M.synced = 0 AND M.state = 1 GROUP BY C.id';
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

  function addCommande(code_commande, id_mission, id_client){
    var sql_query = "INSERT INTO commandes(code_commande, id_mission, id_client) values(?,?,?);";
    var bindings = [code_commande, id_mission, id_client];
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
      url : "http://localhost:8080/rest/users/login?login="+account.username+"&password="+account.password+"&mobile=1"
    };
    return $http(req);
  }

  function addAccount(account)
  {
    var sql_query = "INSERT INTO accounts(id_db, username, password, first_login, question_secrete, reponse_secrete, bloque, golden_points, golden_stores, fonction) values(?,?,?,?,?,?,?,?,?,?);";
    var bindings = [account.id_db, account.username, account.password, 1, "", "", 0, account.golden_points, account.golden_stores, account.fonction];
    return DB.query(sql_query, bindings).then(
      function(success){
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

.factory("Clients", function($http, DB){
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
    var sql_query = "UPDATE clients SET golden_store =  golden_store + ? WHERE id_db = ?";
    var bindings = [points, _idClient];
    return DB.query(sql_query, bindings).then(
      function(success){
          return success;
      }, 
      function(error){
        return error;
      });
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
      $http.get("http://localhost:8082/rest/vendors/"+_id+"/clients/check").then(
        function(data, status, headers){
          var outerId = data.data;
          if(innerId < outerId)
          {
            console.log("some updates are waiting ...");
            $http.get("http://localhost:8082/rest/vendors/"+_id+"/clients/from/"+innerId).then(
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
      url : "http://localhost:8082/rest/brandfive"
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

.factory("Articles", function(DB, $q, $http, Marques){
  return {
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
      url: "http://localhost:8082/rest/items",
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
            url: "http://localhost:8082/rest/items/sync",
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
      url: "http://localhost:8082/rest/items/from/"+_id,
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
      var sql_query = "SELECT GS.id_db as id, GS.qte_min as min, Group_Concat(A.id_db) AS articles FROM groupes_sbd AS GS LEFT JOIN article_sbd AS ASBD ON ASBD.id_groupe_sbd = GS.id_db LEFT JOIN articles AS A ON ASBD.id_article = A.id_db GROUP BY GS.id_db";
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

  function getMarques()
  {
    return DB.query("SELECT * FROM marque").then(
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

  function getArticlesByMarque(marque){
    var deferred = $q.defer();
    if(typeof window.localStorage['marques'] != "undefined" && typeof JSON.parse(window.localStorage['marques'])[marque] != "undefined" && typeof JSON.parse(window.localStorage['marques'])[marque].length > 0)
    {
      var marques = JSON.parse(window.localStorage['marques']);
      console.log("FROM CACHE");
      deferred.resolve(marques[marque]);
    }
    else
    {
      var sql_query = "SELECT A.prixVente as 'prixVente', A.id AS 'id', A.id_db AS 'id_db', A.nomArticle AS 'nomArticle', A.unitConversion, A.uniteMesure, A.tva, Group_Concat(DISTINCT P.id_db) AS 'promotions', GSBD.id_db AS 'groupeSBD' FROM articles AS A LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE A.marqueArticle = ? GROUP BY A.id_db";
      var bindings = [marque];
      return DB.query(sql_query, bindings).then(
        function(articles){
          return DB.fetchAll(articles);
        }, 
        function(error){
          return error;
        });
    }
    return deferred.promise;

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
    add : add,
    addToBrandFive : addToBrandFive,
    getBrandFiveFromDB : getBrandFiveFromDB,
    getBrandFiveFromLocalDB : getBrandFiveFromLocalDB,
    getAll : getAll
  };


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

.factory("Missions", function(DB, $q, $http){
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
    setMissionToSynced : setMissionToSynced


  };

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
      url: "http://localhost:8082/rest/livreurs/sync/"+id,
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
  

  function addLocalMission(mission)
  {
    var todayDate = new Date();
    var yyyy = (todayDate.getFullYear()).toString();
    var mm = (todayDate.getMonth()+1).toString();
    var dd = (todayDate.getDate()).toString();
    var todayDate = yyyy+"-"+(mm[1]?mm:"0"+mm[0])+"-"+(dd[1]?dd:"0"+dd[0]);
    var sql_query = "INSERT INTO missions(client_id, route_id, date_start, state, finished, problem, synced, local) values(?,?,?,?,?,?,?,?)";
    var bindings = [mission.client_id, mission.route_id, todayDate, 1, 1, 0, 0, 1];
    return DB.query(sql_query, bindings).then(
      function(mission){
        return mission.insertId;
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
        $http.get("http://localhost:8082/rest/vendors/"+_idVendeur+"/mobile/missions/check").then(
          function(mission, status, headers){
            console.log(mission);
            outerId = mission.data;
            console.log("HIGHEST MISSION IN DB : "+innerId);
            console.log("HIGHEST MISSION IN API : "+outerId);
            if(outerId > innerId)
            {
              console.log("Some updates remaining ...");
              var finalMissions = [];
              $http.get("http://localhost:8082/rest/vendors/"+_idVendeur+"/mobile/missions/from/"+innerId).then(
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
        url : "http://localhost:8082/rest/vendors/mobile/"+idVendeur+"/roads/",
        method : "GET"
      };
      var routesCheck = {
        url : "http://localhost:8082/rest/vendors/mobile/"+idVendeur+"/roads/check",
        method : "GET"
      };
      function fromStartPoint(id, _id)
      {
        return {
        url : "http://localhost:8082/rest/vendors/mobile/"+id+"/roads/from/"+_id,
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

.factory("Promotions", function(DB, $http){
  
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
    var sql_query = 'SELECT P.id_db AS "id", P.type, P.qte, P.melange, Group_Concat(DISTINCT PC.client_id) as clients, P.conditionning_unit AS "cu", P.max_steps AS "max", P.cummulable, P.ca, P.starts_at AS "starts", P.ends_at AS "ends", P.activated as "activated", Group_Concat(DISTINCT PI.promotion_secondary) AS "inclusions", Group_Concat(DISTINCT PE.promotion_secondary) AS "exclusions", "[" || Group_Concat(DISTINCT "{""id"":" || PA.article_id ||", ""qty"":" || ifnull(PA.qty, 0) || "}") || "]" AS "articles" , "[" || Group_Concat(DISTINCT "{""id"":" || GA.article_id ||", ""qty"":" || ifnull(GA.qte, 0) || ", ""designation"":""" || A.nomArticle || """}") || "]" AS "gratuites", PG.remise AS "remise" FROM promotions AS P LEFT JOIN promotion_client AS PC ON PC.promotion_id = P.id_db LEFT JOIN clients AS C ON C.id_db = PC.client_id LEFT JOIN promotion_article AS PA ON PA.promotion_id = P.id_db LEFT JOIN promotion_inclusion AS PI ON PI.promotion_primary = P.id_db LEFT JOIN promotion_exclusion AS PE ON PE.promotion_primary = P.id_db  LEFT JOIN promotion_gratuite AS PG ON PG.promotion_id = P.id_db LEFT  JOIN gratuite_article AS GA ON GA.promotion_gratuite_id = PG.id LEFT JOIN articles AS A ON A.id_db = GA.article_id WHERE (P.type == "PC" AND PC.client_id = ?) OR (P.type != "PC") GROUP BY P.id_db;';
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
  /*
      


      
      
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

      

  */


  function syncPromotions(){
    var request = {
      url: "http://192.168.100.36:8082/newsales/rest/promotions/AllPromoParMois",
      method: "GET"
    };
    $http(request).then(
      function(success){
        console.log("SUCCESSFULLY GOT ALL THE PROMOTIONS OF THE CURRENT MONTH");
        if(typeof window.localStorage['promoAPI'] == "undefined")
        {
          window.localStorage['promoAPI'] = JSON.stringify(success.data);
        }
        angular.forEach(success.data, function(promotion){
          addPromotion(promotion).then(
            function(success){
              console.log("THE PROMOTION successfully ADDED NOW SUB TABLES !!");
              if(typeof success.insertId != "undefined");
              {
                if(promotion.type == 'PP' || promotion.type == 'PMT')
                {
                  angular.forEach(promotion.article_en_promo, function(article){
                    promotionArticle(promotion.id, article)
                    .then(
                      function(success){
                        console.log(JSON.stringify(success));
                      }, 
                      function(error){
                        console.log(JSON.stringify(error));
                      });
                  });


                  promotionGratuite(promotion.id, promotion.pourcentage).then(
                      function(success){
                        console.log(JSON.stringify(success));

                        angular.forEach(promotion.article_gratuits, function(article){
                          console.log(article);
                          promotionGratuiteArticle(success.insertId, article[0].itemId, article[0].quantite).then(
                            function(success){
                              console.log(success);
                            },
                            function(error){
                              console.log(error);
                            });
                        });

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

            }, 
            function(error){
              console.log(JSON.stringify(error));
              return;
            });
        });

      },
      function(error){
        console.log(JSON.stringify(error));
      });



  }


  /*

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

  */

  function promotionClient(promotion_id, client_id)
  {
    var sql_query = "INSERT INTO promotion_client(promotion_id, client_id) VALUES(?,?);";
    var bindings = [promotion_id, client_id];
    return DB.query(sql_query, bindings).then(
      function(success){
        console.log(JSON.stringify(success));
        return success;
      }, 
      function(error){
        console.log(JSON.stringify(error));
        return error;
      }); 
  }

  function promotionGratuite(promotionId, remise)
  {
    var sql_query = "INSERT INTO promotion_gratuite(promotion_id, remise) VALUES(?,?);";
    var bindings = [promotionId, remise];
    return DB.query(sql_query, bindings).then(
      function(success){
        console.log(JSON.stringify(success));
        return success;
      }, 
      function(error){
        console.log(JSON.stringify(error));
        return error;
      }); 
  }

  function promotionGratuiteArticle(promotionGratuiteId, articleId, qty)
  {
    var sql_query = "INSERT INTO gratuite_article(promotion_gratuite_id, article_id, qte) VALUES(?,?,?);";
    var bindings = [promotionGratuiteId, articleId, qty];
    return DB.query(sql_query, bindings).then(
      function(success){
        console.log(JSON.stringify(success));
        return success;
      }, 
      function(error){
        console.log(JSON.stringify(error));
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
        console.log(JSON.stringify(success));
        return success;
      }, 
      function(error){
        console.log(error);
        return error;
      });
  }

  return {
    addPromotion :addPromotion,
    promotionArticle :promotionArticle,
    syncPromotions : syncPromotions,
    getAllPromotions : getAllPromotions,
    getClientPromotions :getClientPromotions,
    deletePromotion :deletePromotion
  };



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
    $http.get("http://localhost:8082/rest/clients/road/1/sync")
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
            $http.get("http://localhost:8082/rest/clients/road/1/sync/"+idDB).then(
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
    $http.get("http://localhost:8082/rest/roads/check")
    .success(function(data, status, headers){
      console.log("THE HIGHEST ID IN DB IS : "+data.id);
    })
    .error(function(error, status, headers){
      console.log(error);
    });
  }
  

  

}]);

SHORT DESCRIPTION 
CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT("{ ""id""\\: ",lc.id), ", ""unite""\\: "), lc.unite), ", ""packet""\\: "), lc.paquet), ", ""shortDescription""\\: ")
SALE PRICE 
CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT("{ ""id""\\: ",lc.id), ", ""unite""\\: "), lc.unite), ", ""packet""\\: "), lc.paquet), ", ""shortDescription""\\: "), i.shortDescription),", ""salePrice""\\: "), i.salePrice)

SELECT CONCAT(CONCAT('[', GROUP_CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT(CONCAT("{ ""id"": ",lc.id), ", ""unite"": "), lc.unite), ", ""packet"": "), lc.paquet), ", ""shortDescription"": "), i.shortDescription),", ""salePrice"": "), i.salePrice), ", ""tva"": "), i.tva), ", ""item_id"": "), lc.item_id), "}"))), "]") FROM mission AS m LEFT JOIN client as cl ON cl.id = m.client_id LEFT JOIN commande AS c ON c.id = m.commande_id LEFT JOIN ligneCommande AS lc ON lc.commande_id = c.id lEFT JOIN item AS i ON i.id = lc.item_id LEFT JOIN route AS r ON r.id = m.route_id WHERE r.id IN(SELECT id FROM route AS r WHERE r.vendeur_id IN (SELECT id FROM employee as v WHERE v.type = 'VEN' AND v.livreur_id = 3)) ORDER BY m.id DESC


SELECT m.id AS id_mission, r.id AS id_route, CONCAT(CONCAT("[", CONCAT(CONCAT("{",Group_Concat(lc.id), "}"), "]") as lignes FROM mission AS m LEFT JOIN client AS cl ON cl.id = m.client_id LEFT JOIN route AS r ON r.id = m.route_id LEFT JOIN commande AS c ON c.id = m.commande_id LEFT JOIN ligneCommande AS lc ON lc.commande_id = c.id lEFT JOIN item AS i ON i.id = lc.item_id WHERE m.succeed = true AND r.id IN (SELECT r.id FROM route AS r LEFT JOIN employee as v ON v.id = r.id WHERE v.type = 'VEN' AND v.livreur_id = 3 ) AND m.id > 130 GROUP BY m.id ORDER BY m.id DESC