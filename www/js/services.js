
var DB_CONFIG = { 
    name : "new_sales",
    tables : 
    [
      {
        name : "clients",
        check_url : "http://localhost:8082/newsales/rest/vendor/roads/check",
        synchronize_url : "http://localhost:8085/newsales/rest/roads/sync/",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique not null" },
          { name : "code_client", value : "text unique not null" },
          { name : "address" , value : "text" },
          { name : "lat" , value : "long" },
          { name : "lng" , value : "long" },
          { name : "nom", value : "text not null" },
          { name : "prenom", value : "text" },
          { name : "email", value : "text"},
          { name : "golden_store", value : "long"},
          { name : "chiffreAffaire", value : "long"},
          { name : "classe", value : "text"}
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
        name: "articles",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_db" , value : "integer unique not null" },
          { name : "prixAchat", value : "text not null" },
          { name : "nomArticle", value : "text not null" },
          { name : "prixVente", value : "long not null" },
          { name : "tva", value : "long not null" },
          { name : "uniteMesure", value : "text not null"},
          { name : "typeArticle", value : "text not null"},
          { name : "marqueArticle", value : "long not null"},
          { name : "logo", value : "text"}
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
          { name : "id_db" , value : "integer unique not null" },
          { name : "code_mission", value : "text not null" },
          { name : "client_id" , value : "integer not null" },
          { name : "route_id", value : "integer not null"},
          { name : "date_start" , value : "long not null" },
          { name : "date_max" , value : "long not null" },
          { name : "finished", value : "boolean not null"},
          { name : "commande_id", value : "integer not null"},
          { name : "problem", value : "boolean not null"},
          { name : "problemDescription", value : "text not null"},
          { name : "state", value : "boolean not null" }
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
          { name : "golden_points", value : "integer not null"}
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
      return '#00FFFF';
    }
    else if(input.groupeSBD != null && input.done == true)
    {
      return '#9FB4B4';
    }
    else
    {
      return 'transparent';
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
        db = window.sqlitePlugin.openDatabase(DB_CONFIG.name, '1.0', DB_CONFIG.name , 655367);
      }
      else
      {
        db = window.openDatabase(DB_CONFIG.name, '1.0', DB_CONFIG.name , 655367);
      }
      /*window.plugins.sqlDB.copy(
        DB_CONFIG.name, 
        'articles.sql', 
        function(){
          console.log("SUCCESS");
        },
        function(){
          console.log("ERROR");
        });*/
      angular.forEach(DB_CONFIG.tables, function(table){
        var columns = [];
        angular.forEach(table.columns, function(column){
          columns.push(column.name + ' ' + column.value);
        });
        var sql_query = "CREATE TABLE IF NOT EXISTS " + table.name + " (" + columns.join(",") + "); ";
        query(sql_query).then(function(success){console.log(success);}, function(error){console.log(error.message);});
      });

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

.factory("Profile", function(DB){

  return {
    getProfile : getProfile,
    addProfile : addProfile,
     getGPAccount :  getGPAccount,
     updateGPAccount : updateGPAccount

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

.factory("LignesCommandes", function(DB){
  return {
    getAllCommandes : getAllCommandes,
    getCommandeByMission : getCommandeByMission,
    getCommandesByClient : getCommandeByClient,
    getAllLigneCommandesByCommande : getAllLigneCommandesByCommande
  };
        /*name : "ligneCommandes",
        columns : [
          { name : "id" , value : "integer primary key autoincrement" },
          { name : "id_commande" , value : "integer not null" },
          { name : "id_article", value : "text unique not null" },
          { name : "packet", value : "integer not null"},
          { name : "unit", value : "integer not null"},
          { name : "pu_ht", value : "long not null"},
          { name : "pu_ttc", value : "long not null"}*/
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

.factory("LigneCommandes", function(DB){
  return {
    getLigneCommande : getLigneCommande,
    addLigneCommande : addLigneCommande,
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

.factory("Commandes", function(DB, $q){
  return {
    getAllCommandes : getAllCommandes,
    getCommandesByMission : getCommandesByMission,
    getCommandesByClient : getCommandesByClient,
    getCommande : getCommande,
    addCommande : addCommande,
    getLastCommande : getLastCommande,
    getCAClient : getCAClient,
    getCAVendeur : getCAVendeur,
    getAVGClient : getAVGClient
  };

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
  function getCAVendeur()
  {
    var sql_query = "SELECT SUM((LC.unit+(LC.packet*10))*A.prixVente) as 'ca' FROM commandes as C JOIN ligneCommandes AS LC ON C.id = LC.id_commande JOIN missions AS M ON M.id_db = C.id_mission JOIN articles AS A ON  A.id_db = LC.id_article WHERE M.state = 1";
    return DB.query(sql_query).then(
      function(ca){
        return DB.fetch(ca);
      }, 
      function(error){
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
    addAccount : addAccount

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
    console.log("USERNAME : "+username+" PASSWORD : "+password);
    getAccountByUserName(username).then(
      function(account){console.log("EXISTANT ..."+JSON.stringify(account));},
      function(error){console.log("RIEN....."+error.message);});
    var sql_query = "SELECT * FROM accounts WHERE username = ? and password = ?;";
    var bindings = [username, password];
    return DB.query(sql_query, bindings)
      .then(function(result){
        //console.log("RESULT : "+JSON.stringify(result));
          return DB.fetch(result);
        }, function(error){
          console.log(error.message);
          return error.message;
        });
  }

  function connectFromAPI(account)
  {
    var req = {
      method : "GET",
      url : "http://localhost:8082/newsales/rest/vendors/login?username="+account.username+"&password="+account.password
    };
    return $http(req);
  }

  function addAccount(account)
  {
    var sql_query = "INSERT INTO accounts(id_db, username, password, first_login, question_secrete, reponse_secrete, bloque, golden_points) values(?,?,?,?,?,?,?,?);";
    var bindings = [account.id_db, account.username, account.password, 1, "", "", 0, account.golden_points];
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
    addNewClient : addNewClient
  };

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

  function checkNewClient()
  {

  }

  function addClient(client)
  {
    var sql_query = "INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email, golden_store, chiffreAffaire) values(?,?,?,?,?,?,?,?,?,?)";
    var bindings = [client.id_db, "CE65"+Math.round(Math.random()*10000), client.address, client.lat, client.lng, client.nom, client.prenom, client.email, client.golden_store, client.chiffreAffaire];
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
        }
        else
        {
          innerId = data.id_db;
        }
      $http.get("http://localhost:8082/newsales/rest/vendors/"+_id+"/clients/check").then(
        function(data, status, headers){
           console.log(data.data);
          var outerId = data.data.id;
          if(innerId < outerId)
          {
            console.log("some updates are waiting ...");
            $http.get("http://localhost:8082/newsales/rest/vendors/"+_id+"/clients/from/"+innerId).then(
              function(data, status, headers){
                angular.forEach(data.data, function(client){
                  var object = {};
                  object.id_db = client.id;
                  object.code_client = client.codeClient
                  object.address = client.address;
                  object.lat = typeof client.lat === "undefined" ? 0.0 : client.lat;
                  object.lng = typeof client.lng === "undefined" ? 0.0 : client.lng;
                  object.nom = client.nomClient;
                  object.prenom = client.prenomClient;
                  object.email = client.email;
                  object.golden_store = typeof client.goldenStore === "undefined" ? 0.0 : client.goldenStore;
                  object.chiffreAffaire = typeof client.chiffreAff  === "undefined" ? 0.0 : client.chiffreAff;
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

  function getAllClients()
  {
    var sql_query = "SELECT * FROM clients";
    return DB.query(sql_query).then(
      function(data){
        return DB.fetchAll(data);
      }, 
      function(error){
        return error;
      });
  }
})

.factory("BrandFive", function($http, DB, $q){
  return {
    getBrandFiveFromAPI : getBrandFiveFromAPI,
    getCABrandFive : getCABrandFive
    
  };

  function getCABrandFive(){
    var sql_query = "SELECT SUM((LC.unit+(LC.packet*10))*A.prixVente) AS 'somme', A.marqueArticle as 'marque' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article WHERE LC.id_article IN ( SELECT id_db FROM articles WHERE marqueArticle IN ( SELECT name FROM brand_five ) ) GROUP BY marque";
    return DB.query(sql_query).then(
      function(data){
        return DB.fetchAll(data);
      }, 
      function(error){
        return error;
      });
  }

  function getBrandFiveFromAPI(){
    var deferred = $q.defer();
    var req = {
      method :"GET",
      url : "http://localhost:8082/newsales/rest/brandfive"
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

.factory("Articles", function(DB, $q){
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
    getArticlesByIds : getArticlesByIds
 };


  function getArticleWithSBD()
  {
      var sql_query = "SELECT GS.id_db as id, GS.qte_min as min, Group_Concat(A.id_db) AS articles FROM groupes_sbd AS GS LEFT JOIN article_sbd AS ASBD ON ASBD.id_groupe_sbd = GS.id_db LEFT JOIN articles AS A ON ASBD.id_article = A.id_db WHERE classe = 'A' GROUP BY GS.id_db";
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
    if(typeof window.localStorage['marques'] != "undefined" && typeof JSON.parse(window.localStorage['marques'])[marque] != "undefined")
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
    console.log(article);
    var deferred = $q.defer();
    var sql_query = "INSERT INTO articles(id_db, prixAchat, nomArticle, prixVente, tva, uniteMesure, typeArticle, marqueArticle) values(?,?,?,?,?,?,?,?);"
    var bindings = [article.id, article.prixAchat, article.nomArticle, article.prixVente, article.tva, article.uniteMesure, article.typearticle, article.marquearticle];
    return DB.query(sql_query, bindings).then(
      function(article){
        return article;
      }, 
      function(error){
        return error;
      });
  }

  function addAll(articles){
    angular.forEach(articles, function(article){
      add(article).then(function(success){console.log(success);}, function(error){console.log(error);})
    });
  }
})

.factory("Marques", function(DB, $http){
  return {
    add : add,
    addToBrandFive : addToBrandFive,
    getBrandFiveFromDB : getBrandFiveFromDB,
    getBrandFiveFromLocalDB : getBrandFiveFromLocalDB
  };

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

  function add(marque){
    var sql_query = "INSERT INTO marques(id_db, nom, five) values(?,?,?);";
    var binding = [marque.id, marque.nom, marque.five];
    return DB.query(sql_query, bindings).then(
      function(success){
        return success;
      }, 
      function(error){
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
    setExitDate : setExitDate

  };


  function setEntryDate(mission_id, dateValue)
  {
    var sql_query = "UPDATE missions SET started_at = ? WHERE id_db = ?";
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
    var sql_query = "UPDATE missions SET ended_at = ? WHERE id_db = ?";
    var bindings = [mission_id, dateValue];
    return DB.query(sql_query, bindings).then(function(success){
      return success;
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

  function setMissionToSucceed(_idMission, commande_id)
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

  function countMissions()
  {
    var sql_query = "SELECT COUNT(case state when 1 then 1 else null end) AS 'finished', COUNT(case state when 0 then 1 else null end) AS 'waiting', COUNT(case state when 2 then 1 else null end) as 'problem' FROM missions";
    return DB.query(sql_query).then(
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
    var sql_query = "SELECT * FROM missions WHERE state = 1 ORDER BY id_db DESC LIMIT 5";
    return DB.query(sql_query).then(
      function(missions){
        return DB.fetchAll(missions);
      }, 
      function(error){
        return error;
      }); 
  }

  function getFinishedMissions()
  {
    var sql_query = "SELECT * FROM missions WHERE state = 1 OR state = 2 LIMIT 5";
    return DB.query(sql_query).then(
      function(missions){
        return DB.fetchAll(missions);
      }, 
      function(error){
        return error;
      });
  }

  function getHighestMission()
  {
    var sql_query = "SELECT * FROM missions ORDER BY id_db DESC LIMIT 1";
    return DB.query(sql_query).then(
      function(mission){
        return DB.fetch(mission);
      }, 
      function(error){
        return error;
      });
  }

  function addMission(mission)
  {
    var sql_query = "INSERT INTO missions(id_db, code_mission, client_id, route_id, date_start, date_max, finished, commande_id, problem, problemDescription, state) values(?,?,?,?,?,?,?,?,?,?,?)";
    var bindings = [mission.id, mission.codeMission, mission.client.id, mission.route.id, mission.missionDate, mission.maxDate, mission.finished, 0, mission.problem, mission.problemDescription, 0];
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
    getHighestMission().then(
      function(mission){
        console.log(mission);
      if(mission == null)
        {
          innerId = 0;
        }
        else
        {
          innerId = mission.id_db;
        }
        $http.get("http://localhost:8082/newsales/rest/vendors/"+_idVendeur+"/missions/check").then(
          function(mission, status, headers){
            console.log(mission);
            outerId = mission.data.id;
            if(outerId > innerId)
            {
              console.log("Some updates remaining ...");
              var finalMissions = [];
              $http.get("http://localhost:8082/newsales/rest/vendors/"+_idVendeur+"/missions/from/"+innerId).then(
                function(missions, status, headers){
                  deferred.resolve(missions.data);
                  var newMissions = [];
                  angular.forEach(missions.data, function(mission){
                    console.log(mission);
                  addMission(mission).then(
                      function(id){
                        console.log(id);
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
            console.log(error);
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

.factory("Routes", function(DB){

    function addRoute(route)
    {
      var sql_query = "INSERT INTO routes (id_db, code_route, client_id, address, lat, lng, date_max, state) values (?,?,?,?,?,?,?,?);";
      var bindings = [route.id_db, route.code_route, route.client_id, route.address, route.lat, route.lng, route.date_max, route.state];
      return DB.query(sql_query, bindings).then(
        function(data){
          return "Route ajouté avec succes";
        },
        function(error){
          return error;
        });
    }
    
    function getAllRoutes(){
      var sql_query = "SELECT * FROM routes ;";
      return DB.query(sql_query)
      .then(
        function(result){
          console.log(result);
          return DB.fetchAll(result);
        },
        function(error){
          return error.message;
        });
    }

    function getLastRoute()
    {
      var sql_query = "SELECT * FROM routes ORDER BY id_db DESC LIMIT 1";
      return DB.query(sql_query).then(
        function(data){
          //console.log("SUCCESS => BEFORE SYNC ROUTES THE ROUTE WITH HIGHEST ID : "+data);
          return DB.fetch(data);
        },
        function(error){
          console.log("ERROR => BEFORE SYNC ROUTES THE ROUTE WITH HIGHEST DEADLINE : "+error.message);
        });
    }


    function getLastUnfinishedRoute()
    {
      var sql_query = "SELECT * FROM routes ORDER BY date_max DESC LIMIT 1 WHERE state = ?";
      var bindings = [1];
      return DB.query(sql_query).then(
        function(data){
          console.log("SUCCESS => BEFORE SYNC ROUTES THE ROUTE WITH HIGHEST DEADLINE : "+data);
          return DB.fetch(data);
        },
        function(error){
          console.log("ERROR => BEFORE SYNC ROUTES THE ROUTE WITH HIGHEST DEADLINE : "+error.message);
        });
    }

    function getUnfinishedRoutes()
    {
      var sql_query = "SELECT * FROM routes WHERE state = 0 AND date_max < "+Date.now()+";"
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
      getUnfinishedRoutes : getUnfinishedRoutes,
      getLastRoute : getLastRoute,
      getLastUnfinishedRoute : getLastUnfinishedRoute
    };
})

.factory("Promotions", function(DB){
  var self = this;
  self.getAllPromotions = function(){
    var sql_query = "SELECT * FROM promotions;";
    return DB.query(sql_query).then(
      function(result){
        return DB.fetchAll(result);
      });
  };

  self.getClientPromotions = function(client_id){
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

  self.deletePromotion = function(_id){
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

  return self;



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
    $http.get("http://localhost:8082/newsales/rest/clients/road/1/sync")
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
            $http.get("http://localhost:8082/newsales/rest/clients/road/1/sync/"+idDB).then(
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
    $http.get("http://localhost:8082/newsales/rest/roads/check")
    .success(function(data, status, headers){
      console.log("THE HIGHEST ID IN DB IS : "+data.id);
    })
    .error(function(error, status, headers){
      console.log(error);
    });
  }
  

  

}]);
