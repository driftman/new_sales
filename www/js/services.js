
    /*private String factureHeader;
    private Date preferedDateToDeliver;
    private String livraisonAdresse;*/

var DB_CONFIG = {
    name: "new_salesBETAVXXIIIII11668999999999999909---99-989--dfdf7889066119s9909236",
    tables: [
        {
            name: "clients",
            check_url: "http://197.230.28.154:81/newsales/rest/vendor/roads/check",
            synchronize_url: "http://197.230.28.154:81/newsales/rest/roads/sync/",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null"},
                {name: "code_client", value: "text"},
                {name: "address", value: "text"},
                {name: "lat", value: "long"},
                {name: "lng", value: "long"},
                {name: "nom", value: "text not null"},
                {name: "prenom", value: "text"},
                {name: "email", value: "text"},
                {name: "golden_store", value: "long"},
                {name: "chiffreAffaire", value: "long"},
                {name: "patente", value: "text"},
                {name: "type", value: "long"},
                {name: "channel", value: "long"},
                {name: "depot", value: "long"},
                {name: "classe", value: "integer not null default 0"},
                {name: "route", value: "integer"},
                {name: "return_id", value: "integer"},
                {name: "timestamp", value: "long not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "retour_debut", value: "date not null default '' "},
                {name: "retour_fin", value: "date not null default '' "},
                {name: "FOREIGN KEY(return_id)", value: "REFERENCES returns(id)"}


            ]
        },

        {
            name: "timbre",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "percentage", value: "double not null default 0"},
                {name: "value", value: "integer not null default 0"},
                {name: "type", value: "text not null default '' "},
                {name: "societe", value: "integer not null default 0"},
                {name: "activite", value: "integer not null default 0"}
            ]
        },

        {
            name: "parametres",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "server_name", value: "text not null"},
                {name: "server_address", value: "text not null"},
                {name: "bluetooth_name", value: "text not null"},
                {name: "bluetooth_address", value: "text not null"},
                {name: "society_name", value: "text not null"},
                {name: "society_tenant", value: "integer not null"},
                {name: "sbd_title", value: "text default '' "},
                {name: "sbd_url", value: "text default '' "},
                {name: "sbd_id", value: "integer default 0"},
                {name: "sbd_new", value: "integer default 0"}
            ]
        },


        {
            name: "mode_paiements",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null default 0"},
                {name: "name", value: "text not null"},
                {name: "description", value: "text not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"}
            ]
        },


        {
            name: "client_osb",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "client_id", value: "integer not null"},
                {name: "osb", value: "boolean not null"},
                {name: "commande", value: "boolean not null"},
                {name: "message", value: "text not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"}
            ]
        },

        {
            name: "client_mode_paiements",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "mode_id", value: "text not null"},
                {name: "client_id", value: "text not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(mode_id)", value: "REFERENCES mode_paiements(id)"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"}
            ]
        },


        {
            name: "groupes_sbd",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer unique not null"},
                {name: "qte_min", value: "integer not null"},
                {name: "classe", value: "text"},
                {name: "classe_id", value: "integer not null default 0"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"}
            ]
        },

        {
            name: "motifs",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "motifStr", value: "text not null default '' "},
                {name: "authorized", value: "integer not null"},
                {name: "return_id", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(return_id)", value: "REFERENCES returns(id)"}
            ]
        },

        {
            //FOR NORMAL EXCLUSIONS !
            name: "articles_exclusions_bis",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "article_id", value: "integer not null"},
                {name: "vendeur", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(article_id)", value: "REFERENCES articles(id_db)"},
                {name: "FOREIGN KEY(vendeur)", value: "REFERENCES accounts(id_db)"}

            ]
        },


        {
            name: "depot_vendeur",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "depot_id", value: "integer not null"},
                {name: "depot_name", value: "text not null"},
                {name: "vendeur", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(vendeur)", value: "REFERENCES accounts(id_db)"}
            ]
        },

        {
            name: "depot_client",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "depot_id", value: "integer not null"},
                {name: "client_id", value: "text not null"},
                {name: "checked", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"},
                {name: "FOREIGN KEY(depot_id)", value: "REFERENCES depot_vendeur(depot_id)"}
            ]
        },


        {
            name: "returns",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null default 0"},
                {name: "timestamp", value: "long not null"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"}

            ]
        },

        {
            name: "return_item",
            columns: [
                {name: "id", value: "integer primary key"},
                {name: "item_id", value: "integer not null"},
                {name: "return_id", value: "integer not null"},
                {name: "total", value: "long not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(return_id)", value: "REFERENCES returns(id)"},
                {name: "FOREIGN KEY(item_id)", value: "REFERENCES articles(id_db)"}
            ]
        },

        {
            name: "plan_tarifaire",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_plan", value: "integer not null default 0"},
                {name: "code", value: "text not null"},
                {name: "startDate", value: "date not null"},
                {name: "endDate", value: "date not null"},
                {name: "actif", value: "long not null"},
                {name: "itemId", value: "integer not null"},
                {name: "prixArticle", value: "double not null"},
                {name: "client", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(itemId)", value: "REFERENCES articles(id_db)"},
                {name: "FOREIGN KEY(client)", value: "REFERENCES clients(id_db)"}

            ]
        },

        {
            name: "stock_update_history",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "chargement_id", value: "integer not null"},
                {name: "chargement_ligne_id", value: "integer unique not null"},
                {name: "total", value: "integer not null"},
                {name: "income", value: "integer not null"},
                {name: "FOREIGN KEY(chargement_id)", value: "REFERENCES chargement_vendeur(id)"},
                {name: "FOREIGN KEY(chargement_ligne_id)", value: "REFERENCES chargement_vendeur_lignes(id)"}
            ]
        },

        {
            name: "chargement_vendeur",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "vendeur_id", value: "integer not null"},
                {name: "date", value: "date not null"},
                {name: "state", value: "integer not null"},
                {name: "reponse", value: "integer not null"},
                {name: "chargement", value: "integer not null"},
                {name: "dechargement", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
            ]
        },

        {
            name: "chargement_vendeur_lignes",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "chargement_id", value: "integer not null"},
                {name: "item_id", value: "integer not null"},
                {name: "packet", value: "integer not null"},
                {name: "unit", value: "integer not null"},
                {name: "chargement", value: "integer not null"},
                {name: "dechargement", value: "integer not null"},
                {name: "timestamp", value: "long not null"},
                {name: "FOREIGN KEY(item_id)", value: "REFERENCES articles(id_db)"},
                {name: "FOREIGN KEY(chargement_id)", value: "REFERENCES chargement_vendeur(id)"}
            ]
        },

        {
            name: "quota_vendeur",
            columns: [
                {name: "id", value: "integer"},
                {name: "itemId", value: "integer not null"},
                {name: "qty", value: "long"},
                {name: "value", value: "double"},
                {name: "debut", value: "date not null default '2999-12-31' "},
                {name: "fin", value: "date not null default '2999-12-31' "},
                {name: "vendeur", value: "integer not null default 0"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(itemId)", value: "REFERENCES articles(id_db)"},
                {name: "FOREIGN KEY(vendeur)", value: "REFERENCES accounts(id_db)"}
            ]
        },


        {
            name: "quota_client",
            columns: [
                {name: "id", value: "integer"},
                {name: "itemId", value: "integer not null"},
                {name: "qty", value: "long"},
                {name: "value", value: "double"},
                {name: "debut", value: "date not null default '2999-12-31' "},
                {name: "fin", value: "date not null default '2999-12-31' "},
                {name: "client", value: "integer not null default 0"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(itemId)", value: "REFERENCES articles(id_db)"},
                {name: "FOREIGN KEY(client)", value: "REFERENCES clients(id_db)"}
            ]
        },


        {
            name: "stock",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "packet", value: "long not null"},
                {name: "unit", value: "long not null"},
                {name: "total", value: "long"},
                {name: "item", value: "long not null"},
                {name: "isConcurrent", value: "integer not null default 0"},
                {name: "employee_id", value: "long not null"},
                {name: "client_id", value: "long not null"},
                {name: "retour", value: "integer not null default 0"},
                {name: "prelevement", value: "integer not null default 0"},
                {name: "cause", value: "text not null"},
                {name: "date", value: "date not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(item)", value: "REFERENCES articles(id_db)"},
                {name: "FOREIGN KEY(employee_id)", value: "REFERENCES accounts(id_db)"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"}
            ]
        },

        {
            name: "surveys",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "question", value: "text not null"},
                {name: "answers", value: "text not null"},
                {name: "required", value: "boolean"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "type", value: "integer not null default 0"},
                {name: "clientType", value: "integer not null default 0"},
                {name: "startDate", value: "date not null"},
                {name: "endDate", value: "date not null"}
            ]
        },

        {
            name: "survey_client",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "client_id", value: "integer not null"},
                {name: "survey_id", value: "integer not null"},
                {name: "answer", value: "text not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"},
                {name: "FOREIGN KEY(survey_id)", value: "REFERENCES surveys(id)"}
                
            ]
        },


        {
            name: "remise_mode_paiement",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null default 0"},
                {name: "id_mode_paiement", value: "integer not null"},
                {name: "name", value: "text not null"},
                {name: "pourcentage", value: "long not null"},
                {name: "minPeriod", value: "integer not null"},
                {name: "maxPeriod", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"}
            ]
        },

        {
            name: "articles",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null default 0"},
                {name: "code", value: "text unique not null"},
                {name: "nomArticle", value: "text not null"},
                {name: "prixVente", value: "long not null"},
                {name: "tva", value: "long not null"},
                {name: "uniteMesure", value: "text not null"},
                {name: "uniteMesure2", value: "text not null"},
                {name: "marqueArticle", value: "long not null"},
                {name: "sousMarqueArticle", value: "long not null"},
                {name: "unitConversion", value: "long not null"},
                {name: "remise", value: "boolean"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "timestamp", value: "long not null"}
            ]
        },


        {
            name: "articles_concurrent",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null"},
                {name: "nomArticle", value: "text not null"},
                {name: "timestamp", value: "long not null"},
                {name: "startDate", value: "date not null default '2999-12-31'"},
                {name: "endDate", value: "date not null default '2999-12-31'"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "typeClient", value: "integer not null"}
            ]
        },

        {
            //FOR SBD ARTICLES EXCLUSIONS
            name: "articles_exclusions",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "article_id", value: "integer not null"},
                {name: "employee_id", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(article_id)", value: "REFERENCES articles(id_db)"}
            ]
        },


        {
            name: "call_steps",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "title", value: "string not null"},
                {name: "name", value: "string not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "rank", value: "integer not null"}
            ]
        },


        {
            name: "routes",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null"},
                {name: "code", value: "text not null"},
                {name: "nom", value: "text not null"},
                {name: "desactive", value: "long not null"},
                {name: "vendeur", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "timestamp", value: "long not null"},
                {name: "FOREIGN KEY(vendeur)", value: "REFERENCES accounts(id_db)"}
            ]
        },

        {
            name: "marque",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null default 0"},
                {name: "marqueArticle", value: "text"},
                {name: "logo", value: "text"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "timestamp", value: "long not null default 0"},
                {name: "activated", value: "integer not null default 0"},
            ]
        },

        {
            name: "vendeur_echange",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "marque", value: "integer not null default 0"},
                {name: "vendeur", value: "integer not null default 0"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "FOREIGN KEY(vendeur)", value: "REFERENCES accounts(id_db)"}
            ]
        },

        {
            name: "echange",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "vendeur", value: "integer not null default 0"},
                {name: "client", value: "integer not null default 0"},
                {name: "total_ttc", value: "double not null default 0"},
                {name: "total_ht", value: "double not null default 0"},
                {name: "payment_mode", value: "integer not null default 0"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "escompte_value", value: "integer not null default 0"},
                {name: "date_start", value: "date not null"},
                {name: "print_content", value: "text not null default '' "},
                {name: "synced", value: "text not null default 0 "},
                {name: "timbre", value: "double not null default 0 "},
                {name: "FOREIGN KEY(client)", value: "REFERENCES clients(id_db)"},
                {name: "FOREIGN KEY(vendeur)", value: "REFERENCES accounts(id_db)"}
            ]
        },

        {
            name: "articles_echange",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "article", value: "integer not null default 0"},
                {name: "vendeur", value: "integer not null default 0"},
                {name: "entrant", value: "integer not null default 0"},
                {name: "sortant", value: "integer not null default 0"},
                {name: "societe", value: "integer not null default 0"},
                {name: "activite", value: "integer not null default 0"},
                {name: "FOREIGN KEY(article)", value: "REFERENCES articles(id_db)"}
            ]
        },

        {
            name: "marques_echange",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "marque", value: "integer not null default 0"},
                {name: "vendeur", value: "integer not null default 0"},
                {name: "entrant", value: "integer not null default 0"},
                {name: "sortant", value: "integer not null default 0"},
                {name: "societe", value: "integer not null default 0"},
                {name: "activite", value: "integer not null default 0"},
                {name: "FOREIGN KEY(vendeur)", value: "REFERENCES accounts(id_db)"}
            ]
        },

        {
            name: "echange_ligne",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "echange", value: "integer not null default 0"},
                {name: "packet", value: "integer not null default 0"},
                {name: "unit", value: "integer not null default 0"},
                {name: "pu", value: "double not null default 0.0"},
                {name: "article", value: "integer not null default 0"},
                {name: "entrant", value: "integer not null default 0"},
                {name: "sortant", value: "integer not null default 0"},
                {name: "FOREIGN KEY(article)", value: "REFERENCES articles(id_db)"},
                {name: "FOREIGN KEY(echange)", value: "REFERENCES echange(id)"}
            ]
        },

        {
            name: "client_echange",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "marque", value: "integer not null default 0"},
                {name: "client", value: "integer not null default 0"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "FOREIGN KEY(client)", value: "REFERENCES clients(id_db)"}
            ]
        },

        {
            name: "marque_echange",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "marque", value: "integer not null default 0"},
                {name: "client", value: "integer not null default 0"},
                {name: "entrant", value: "integer not null default 0"},
                {name: "sortant", value: "integer not null default 0"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "FOREIGN KEY(marque)", value: "REFERENCES marque(id_db)"},
                {name: "FOREIGN KEY(client)", value: "REFERENCES clients(id_db)"}
            ]
        },

        {
            name: "article_echange",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "article", value: "integer not null default 0"},
                {name: "client", value: "integer not null default 0"},
                {name: "entrant", value: "integer not null default 0"},
                {name: "sortant", value: "integer not null default 0"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "FOREIGN KEY(article)", value: "REFERENCES articles(id_db)"},
                {name: "FOREIGN KEY(client)", value: "REFERENCES clients(id_db)"}
            ]
        },

        {
            name: "article_sbd",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_groupe_sbd", value: "integer not null"},
                {name: "id_article", value: "long not null"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "FOREIGN KEY(id_article)", value: "REFERENCES articles(id_db)"},
                {name: "FOREIGN KEY(id_groupe_sbd)", value: "REFERENCES groupes_sbd(id_db)"}
            ]
        },

        {
            name: "sbd_exclusion",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "groupe_sbd", value: "integer not null"},
                {name: "client_id", value: "long not null"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"},
                {name: "FOREIGN KEY(groupe_sbd)", value: "REFERENCES groupes_sbd(id_db)"}
            ]
        },

        /*{
         name: "brand_five",
         columns : [
         { name : "id" , value : "integer primary key autoincrement" },
         { name : "id_db" , value : "integer unique not null" },
         { name : "code_marque", value : "text not null" },
         { name : "name", value : "text not null" },
         { name : "five", value : "boolean" }
         ]
         },*/

        {
            name: "brand_five",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null"},
                {name: "date_debut", value: "date not null"},
                {name: "date_fin", value: "date not null"},
                {name: "ca", value: "long not null"},
                {name: "ca_courant", value: "long not null"},
                {name: "brand_id", value: "integer unique not null"},
                {name: "name", value: "text not null"}
            ]
        },

        {
            name: "sousmarques",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer unique not null"},
                {name: "code_sousmission", value: "text not null"},
                {name: "description", value: "text not null"}
            ]
        },

        {
            name: "new_clients",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "nom", value: "text not null"},
                {name: "prenom", value: "text not null"},
                {name: "adresse1", value: "text not null"},
                {name: "adresse2", value: "text not null"},
                {name: "telephone", value: "text not null"},
                {name: "categorie", value: "text not null"},
                {name: "lat", value: "long not null"},
                {name: "lng", value: "long not null"},
                {name: "route", value: "long not null"},
                {name: "timestamp", value: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"}
            ]
        },

        {
            name: "missions",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer not null default 0"},
                {name: "code_mission", value: "text"},
                {name: "client_id", value: "integer"},
                {name: "route_id", value: "integer"},
                {name: "date_start", value: "date not null"},
                {name: "date_max", value: "long"},
                {name: "finished", value: "boolean default 0"},
                {name: "commande_id", value: "integer"},
                {name: "problem", value: "boolean default 0"},
                {name: "problemDescription", value: "text"},
                {name: "state", value: "boolean default 0"},
                {name: "local", value: "integer default 0"},
                {name: "cause", value: "text default '' "},
                {name: "synced", value: "boolean default 0"},
                {name: "livreur", value: "long"},
                {name: "entryDate", value: "long not null default 0"},
                {name: "exitDate", value: "long not null default 0"},
                {name: "latitude", value: "long not null default 0"},
                {name: "longitude", value: "long not null default 0"},
                {name: "timestamp", value: "long not null default 0"},
                {name: "print_content", value: "text"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"},
                {name: "FOREIGN KEY(route_id)", value: "REFERENCES routes(id_db)"},
                {name: "FOREIGN KEY(commande_id)", value: "REFERENCES commandes(id) ON DELETE CASCADE"}
            ]
        },


        {
            name: "commandes",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_db", value: "integer"},
                {name: "code_commande", value: "text not null"},
                {name: "id_mission", value: "integer unique not null"},
                {name: "id_client", value: "integer not null"},
                {name: "totalTTC", value: "double not null default 0"},
                {name: "totalHT", value: "double not null default 0"},
                {name: "increment", value: "long not null default 0"},
                {name: "totalEscompteDiscount", value: "double not null default 0"},
                {name: "depot", value: "integer default 0"},
                {name: "date_livraison", value: "long default 0"},
                {name: "adresse_livraison", value: "text default '' "},
                {name: "promotions", value: "text"},
                {name: "paymentId", value: "integer"},
                {name: "paymentDate", value: "double"},
                {name: "remise", value: "long default 0"},
                {name: "sbd", value: "integer"},
                {name: "charaka", value: "text"},
                {name: "timbre", value: "double default 0"},
                {name: "FOREIGN KEY(id_mission)", value: "REFERENCES missions(id)"},
                {name: "FOREIGN KEY(id_client)", value: "REFERENCES clients(id_db)"}
            ]
        },

        {
            name: "missions_livreur",
            columns: [
                {name: "id_db", value: "integer unique primary key not null"},
                {name: "code_mission", value: "text"},
                {name: "client_id", value: "integer"},
                {name: "finished", value: "boolean"},
                {name: "commande_id", value: "integer"},
                {name: "problem", value: "boolean"},

                {name: "latitude", value: "double default 0"},
                {name: "longitude", value: "double default 0"},
                {name: "entryDate", value: "long default 0"},
                {name: "exitDate", value: "long default 0"},

                {name: "problemDescription", value: "text"},
                {name: "state", value: "boolean"},
                {name: "synced", value: "boolean"},
                {name: "livreur", value: "long"},
                {name: "timestamp", value: "long not null"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"},
                {name: "FOREIGN KEY(commande_id)", value: "REFERENCES commandes_livreur(id_db)"}
            ]
        },

        {
            name: "commandes_livreur",
            columns: [
                {name: "id_db", value: "integer primary key"},
                {name: "code_commande", value: "text not null"},
                {name: "id_mission", value: "integer unique not null"},
                {name: "id_client", value: "integer not null"},
                {name: "totalTTC", value: "double not null default 0"},
                {name: "totalHT", value: "double not null default 0"},
                {name: "increment", value: "long"},
                {name: "totalEscompteDiscount", value: "double not null default 0"},
                {name: "paymentId", value: "integer"},
                {name: "paymentDate", value: "double"},
                {name: "remise", value: "long default 0"},
                {name: "promotions", value: "text"},
                {name: "sbd", value: "integer"},
                {name: "FOREIGN KEY(id_mission)", value: "REFERENCES missions_livreur(id_db)"},
                {name: "FOREIGN KEY(id_client)", value: "REFERENCES clients(id_db)"},
            ]
        },

        {
            name: "ligneCommandes",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_commande", value: "integer not null"},
                {name: "id_article", value: "integer not null"},
                {name: "packet", value: "integer not null"},
                {name: "unit", value: "integer not null"},
                {name: "pu_ht", value: "long not null default 0"},
                {name: "remise", value: "double default 0"},
                {name: "isGift", value: "boolean default 0"},
                {name: "FOREIGN KEY(id_commande)", value: "REFERENCES commandes(id) ON DELETE CASCADE"},
                {name: "FOREIGN KEY(id_article)", value: "REFERENCES articles(id)"}
            ]
        },


        {
            name: "discounts_history",
            columns: [

                {name: "id", value: "integer primary key autoincrement"},
                {name: "line_id", value: "integer not null"},
                {name: "commande_id", value: "integer not null"},
                {name: "cumule", value: "integer not null"},
                {name: "rank", value: "double not null"},
                {name: "value", value: "double not null"},
                {name: "remiseP", value: "double not null"},
                {name: "remiseV", value: "double not null"},
                {name: "promotion_id", value: "integer not null"},
                {name: "priorite", value: "integer not null"},
                {name: "FOREIGN KEY(line_id)", value: "REFERENCES ligneCommandes(id) ON DELETE CASCADE"},

            ]
        },


        {
            name: "ligneCommandes_livreur",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_commande", value: "integer not null"},
                {name: "id_article", value: "integer not null"},
                {name: "packet", value: "integer not null"},
                {name: "unit", value: "integer not null"},
                {name: "pu_ht", value: "long not null"},
                {name: "remise", value: "double"},
                {name: "isGift", value: "boolean"},
                {name: "idLigne", value: "long"},
                {name: "FOREIGN KEY(id_commande)", value: "REFERENCES commandes(id)"},
                {name: "FOREIGN KEY(id_article)", value: "REFERENCES articles(id)"}
            ]
        },


        {
            name: "promotions",
            columns: [
                {name: "id", value: "integer"},
                {name: "id_db", value: "integer not null default 0"},
                {name: "qte", value: "integer"},
                {name: "libelle", value: "text"},
                {name: "ca", value: "long"},
                {name: "max_steps", value: "integer"},
                {name: "cummulable", value: "boolean"},
                {name: "type", value: "text not null"},
                {name: "starts_at", value: "long not null"},
                {name: "ends_at", value: "long not null"},
                {name: "activated", value: "boolean not null"},
                {name: "conditionning_unit", value: "text"},
                {name: "melange", value: "boolean"},
                {name: "valable_once", value: "boolean default 0"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "PRIMARY KEY ", value: "(id_db, societe, activite)"}
            ]
        },


        {
            name: "promotion_palier",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_promotion", value: "integer not null"},
                {name: "montant", value: "double"},
                {name: "remise", value: "double"},
                {name: "qte", value: "integer"},
                {name: "cummulable", value: "integer"},
                {name: "max", value: "integer"}
            ]
        },


        {
            name: "promotion_charaka",
            columns: [
                {name: "id", value: "integer primary key unique not null"},
                {name: "client_id", value: "integer not null"},
                {name: "created_at", value: "date"},
                {name: "prime", value: "double"},
                {name: "reste", value: "integer"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"}
            ]
        },


        {
            name: "promotion_client",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "promotion_id", value: "integer"},
                {name: "client_id", value: "integer"},
                {name: "FOREIGN KEY(promotion_id)", value: "REFERENCES promotions(id_db)"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"},
            ]
        },

        {
            name: "promotion_consumption",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "promotion_id", value: "integer not null"},
                {name: "client_id", value: "integer not null"},
                {name: "consumed", value: "integer not null"},
                {name: "at", value: "long not null"},
                {name: "societe", value: "integer not null"},
                {name: "activite", value: "integer not null"},
                {name: "FOREIGN KEY(promotion_id)", value: "REFERENCES promotions(id_db)"},
                {name: "FOREIGN KEY(client_id)", value: "REFERENCES clients(id_db)"},
            ]
        },


        {
            name: "promotion_article",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "promotion_id", value: "integer not null"},
                {name: "article_id", value: "integer not null"},
                {name: "qty", value: "integer"},
                {name: "conditionning_unit", value: "text"},
                {name: "FOREIGN KEY(promotion_id)", value: "REFERENCES promotions(id_db)"},
                {name: "FOREIGN KEY(article_id)", value: "REFERENCES articles(id_db)"},
            ]
        },


        {
            name: "promotion_gratuite",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "promotion_id", value: "integer"},
                {name: "remise", value: "integer"},
                {name: "priorite", value: "integer"},
                {name: "FOREIGN KEY(promotion_id)", value: "REFERENCES promotions(id_db)"}
            ]
        },

        {
            name: "gratuite_article",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "promotion_gratuite_id", value: "integer"},
                {name: "article_id", value: "integer"},
                {name: "qte", value: "integer"},
                {name: "groupe", value: "integer"},
                {name: "FOREIGN KEY(promotion_gratuite_id)", value: "REFERENCES promotion_gratuite(id)"},
                {name: "FOREIGN KEY(article_id)", value: "REFERENCES articles(id_db)"}
            ]
        },

        {
            name: "promotion_inclusion",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "promotion_primary", value: "integer"},
                {name: "promotion_secondary", value: "integer"},
                {name: "FOREIGN KEY(promotion_primary)", value: "REFERENCES promotions(id_db)"},
                {name: "FOREIGN KEY(promotion_secondary)", value: "REFERENCES promotions(id_db)"},
            ]
        },

        {
            name: "promotion_exclusion",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "promotion_primary", value: "integer"},
                {name: "promotion_secondary", value: "integer"},
                {name: "FOREIGN KEY(promotion_primary)", value: "REFERENCES promotions(id_db)"},
                {name: "FOREIGN KEY(promotion_secondary)", value: "REFERENCES promotions(id_db)"},
            ]
        },

        {
            name: "spec_article",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "promotion_id", value: "integer not null"},
                {name: "qte", value: "integer not null"},
                {name: "article_id", value: "integer not null"},
                {name: "FOREIGN KEY(article_id)", value: "REFERENCES promotions(id_db)"}
            ]
        },

        {
            name: "accounts",
            columns: [
                {name: "id", value: "integer primary key autoincrement "},
                {name: "id_db", value: "integer not null default 0"},
                {name: "token", value: "string not null"},
                {name: "username", value: "text unique not null "},
                {name: "password", value: "text not null "},
                {name: "first_login", value: "boolean not null "},
                {name: "question_secrete", value: "text not null"},
                {name: "reponse_secrete", value: "text not null"},
                {name: "bloque", value: "boolean not null"},
                {name: "golden_points", value: "long default 0"},
                {name: "golden_stores", value: "long default 0"},
                {name: "objectif_golden_points", value: "long default 'NA' "},
                {name: "objectif_golden_stores", value: "long default 'NA' "},
                {name: "ca", value: "double default 0"},
                {name: "objectif_ca", value: "double default 'NA'"},
                {name: "fonction", value: "text"},
                {name: "activite", value: "long not null"},
                {name: "societe", value: "long not null"},
                {name: "factureIncrement", value: "long not null default 0"},
                {name: "type", value: "integer not null default 1"}
            ]
        },

        {
            name: "profiles",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "id_account", value: "integer not null"},
                {name: "name", value: "string not null"},
                {name: "second_name", value: "string not null"},
                {name: "address", value: "string"},
                {name: "email_address", value: "string"},
                {name: "phone_number", value: "string"},
                {name: "FOREIGN KEY(id_account)", value: "REFERENCES accounts(id)"}
            ]
        }

    ]

};

angular.module('starter.services', ['ngCordova'])


    .filter("chargement", function () {

        return function (input) {
            if (input.packetIn == 0 && input.unitIn == 0) {
                return "#FFE0E3;";
            }
            else {
                return "transparent;"
            }
        };

    })

    .filter('backgroundSBD', function (Articles, SBD) {
        return function (input, isVendeur, prelevement, retour, forChargement) {

            prelevement = (typeof(prelevement) != "undefined") && (prelevement == true);

            forChargement = (typeof(forChargement) != "undefined") && (forChargement == true);

            isVendeur = (typeof(isVendeur) != "undefined") && (isVendeur == true);

            retour = (typeof(retour) != "undefined") && (retour == true);

            var error = isVendeur ? Articles.outOfStock(input) : Articles.outOfQuota(input);


            if(prelevement) {
                return "transparent;";
            } else if (!forChargement && !retour && input.groupeSBD != null && input.groupeSBD != "" && !SBD.sbdConsumed(input.groupeSBD)) {
                return "#A8CCEA;";
            } else {
                return "transparent;";
            }

            /*if (retour || forChargement) {
             error = Articles.outOfQuota(input);
             }

             if (!prelevement) {
             if (error) {
             return "#FFE0E3;"
             }
             else {
             if (!forChargement && !retour && input.groupeSBD != null && input.groupeSBD != "" && !SBD.sbdConsumed(input.groupeSBD)) {
             return "#90CAF9;";
             }
             else {
             return "transparent;";
             }
             }
             }
             else {
             return "transparent;";
             }*/


        };
    })


    .filter('fontColorQuotaStock', function (Articles, SBD) {
        return function (input, isVendeur, prelevement, retour, forChargement, echange, sortant, entrant) {

            //console.log(input, isVendeur, prelevement, retour, forChargement, echange, sortant, entrant);

            echange = (typeof(echange) != "undefined") && (echange == true);

            sortant = (typeof(sortant) != "undefined") && (sortant == true);

            entrant = (typeof(entrant) != "undefined") && (entrant == true);

            prelevement = (typeof(prelevement) != "undefined") && (prelevement == true);

            forChargement = (typeof(forChargement) != "undefined") && (forChargement == true);

            isVendeur = (typeof(isVendeur) != "undefined") && (isVendeur == true);

            retour = (typeof(retour) != "undefined") && (retour == true);

            var error = isVendeur ? Articles.outOfStock(input) : Articles.outOfQuota(input);

            if (retour || forChargement) {
                error = Articles.outOfQuota(input);
            }



            if(echange && entrant) {
                //console.log("ignore");
                return "black;"
            } else if (!prelevement) {
                if (error) {
                    return "#B98787;"
                }
                else {
                    return "black;"
                }
            }
            else {
                return "black;";
            }


        };
    })


    .filter('surveyFilter', function () {
        return function (surveys, type) {
            var finalSurveys = [];
            for (var i = 0; i < surveys.length; i++) {
                if (surveys[i].type == type) {
                    finalSurveys.push(surveys[i]);
                }
            }
            return finalSurveys;
        };
    })


    .filter('fontWeightSBD', function () {
        return function (input) {

            if (input.groupeSBD != null && input.done == false) {
                return 900;
            }
            else if (input.groupeSBD != null && input.done == true) {
                return 900;
            }
            else {
                return 600;
            }

        };
    })

    .filter('promotionConsumed', function () {
        return function (promotions) {

            if (typeof(promotions) != "undefined" && promotions != null && promotions.length > 0) {

                var promotionsMemory = JSON.parse(window.localStorage['promotions'] || '[]');

                var found = false;

                for (var i = 0, _len = promotions.length; i < _len; i++) {
                    var _loopExit = false;

                    var promotionId = promotions[i];

                    for (var j = 0, len = promotionsMemory.length; j < len; j++) {
                        var promotionMemoryId = promotionsMemory[j].id;

                        if (promotionId == promotionMemoryId && promotionsMemory[j].consumed) {
                            _loopExit = true;
                            found = true;
                            break;
                        }
                    }

                    if (_loopExit) {
                        break;
                    }
                    else {
                        continue;
                    }

                }
                if (found) {
                    return "green;"
                }
                else {
                    return "red";
                }

            }
            else {
                return "red";
            }

        };
    })
    .filter('month', function () {
        return function (value) {
            switch (value) {
                case 1:
                    return "JAN";
                case 2:
                    return "FEV";
                case 3:
                    return "MAR";
                case 4:
                    return "AVR";
                case 5:
                    return "MAI";
                case 6:
                    return "JUN";
                case 7:
                    return "JUL";
                case 8:
                    return "AOU";
                case 9:
                    return "SEP";
                case 10:
                    return "OCT";
                case 11:
                    return "NOV";
                case 12:
                    return "DEC";
                default:
                    break;
            }
            return "--";
        };
    })

    .filter('quota', function () {
        return function (article) {
            if (article.quotaQTY != 0 || article.quotaVALUE != 0) {
                if (article.quotaQTY != 0) {
                    return article.quotaQTY;
                }
                else {
                    if (article.uniteMesure == "CS") {
                        return Math.trunc(article.quotaVALUE / article.prixVente);
                    }
                    else {
                        return Math.trunc((article.quotaVALUE / article.prixVente ) / article.unitConversion);
                    }

                }
            }
            else {
                return "-";
            }
        };
    })

    .filter('redFilter', function (Articles) {
        return function (article) {
            if (Articles.outOfStock(article)) {
                return "#FFE0E3;";
            }
            else {
                return "transparent;";
            }
        };
    })


    .filter('flag', function () {
        return function (state) {
            switch (state) {
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

    .factory('DB', function ($q) {
        var db = null;


        function query(sql_query, bindings) {
            var deferred = $q.defer();
            var bindings = (typeof bindings === "undefined") ? [] : bindings;
            db.transaction(function (transaction) {
                transaction.executeSql(
                    sql_query, bindings,
                    function (transaction, result) {
                        deferred.resolve(result);
                    },
                    function (transaction, error) {
                        deferred.reject(error);
                    }
                );
            });
            return deferred.promise;
        }

        function init() {
            if (window.sqlitePlugin) {
                console.log("SQLITE PLUGIN ADDED !!");
                db = window.sqlitePlugin.openDatabase({
                        name: "my2.db",
                        androidDatabaseImplementation: 2,
                        androidLockWorkaround: 1
                    }
                    , function (success) {
                        console.log(JSON.stringify(success));
                    }, function (error) {
                        console.log(JSON.stringify(error));
                    });
                angular.forEach(DB_CONFIG.tables, function (table) {
                    var columns = [];
                    angular.forEach(table.columns, function (column) {
                        columns.push(column.name + ' ' + column.value);
                    });
                    var sql_query = "CREATE TABLE IF NOT EXISTS " + table.name + " (" + columns.join(",") + "); ";
                    query(sql_query).then(function (success) {
                        console.log(JSON.stringify(success));
                    }, function (error) {
                        console.log(JSON.stringify(error.message));
                    });
                });
            }
            else {
                console.log("SHOULD ADD SQLITE PLUGIN !!");
                db = window.openDatabase(DB_CONFIG.name, '1.0', DB_CONFIG.name, 655367);
                angular.forEach(DB_CONFIG.tables, function (table) {
                    var columns = [];
                    angular.forEach(table.columns, function (column) {
                        columns.push(column.name + ' ' + column.value);
                    });
                    var sql_query = "CREATE TABLE IF NOT EXISTS " + table.name + " (" + columns.join(",") + "); ";
                    query(sql_query).then(function (success) {
                        console.log(JSON.stringify(success));
                    }, function (error) {
                        console.error(sql_query, JSON.stringify(error.message));
                    });
                });
            }
        }


        function fetch(result) {
            if (result.rows.length > 0) {
                return result.rows.item(0);
            }
            else {
                return null;
            }
        }

        function fetchAll(result) {
            var output = [];
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
        }

        function clean(vendeurId)
        {
            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var activite = profile.activite || 0;

            var requests = [];


            requests.push("DELETE FROM articles_concurrent WHERE societe = " + tenant_id+ " AND activite = " + activite +" ;");
            requests.push("DELETE FROM groupes_sbd WHERE activite = " + activite + " AND societe = " + tenant_id + ";");
            requests.push("DELETE FROM article_sbd WHERE activite = " + activite + " AND societe = " + tenant_id + ";");
            requests.push("DELETE FROM depot_vendeur WHERE vendeur = " + vendeurId + " AND activite = " + activite + " AND societe = " + tenant_id + ";");
            requests.push("DELETE FROM motifs WHERE activite = " + activite + " AND societe = " + tenant_id + ";");
            requests.push("DELETE FROM depot_client WHERE client_id IN (SELECT id_db FROM clients WHERE route IN (SELECT id_db FROM routes WHERE vendeur = " + vendeurId + ")) AND societe = " + tenant_id + " AND activite = " + activite + ";");
            requests.push("DELETE FROM articles_exclusions_bis WHERE vendeur = " + vendeurId + " AND societe = " + tenant_id + " AND activite = " + activite + ";");
            requests.push("DELETE FROM promotion_consumption WHERE client_id IN (SELECT C.id_db FROM clients AS C JOIN routes AS R ON R.id_db = C.route AND R.vendeur = "+vendeurId+" AND C.activite = " + activite + " AND C.societe = " + tenant_id + ")");
            requests.push("DELETE FROM return_item WHERE activite = " + activite + " AND societe = " + tenant_id + ";");
            requests.push("DELETE FROM returns WHERE activite = "+activite+" AND societe = " + tenant_id + ";");
            //requests.push("DELETE FROM survey_client WHERE client_id IN (SELECT id_db FROM clients WHERE route IN ( SELECT id_db FROM routes WHERE vendeur = " + vendeurId + ") )")
            requests.push("DELETE FROM client_osb WHERE activite = " + activite + " AND societe = " + tenant_id + ";");
            requests.push("DELETE FROM promotion_article WHERE promotion_id IN ( SELECT id_db FROM promotions WHERE date('now') NOT BETWEEN starts_at AND ends_at AND activite = " + activite + " AND societe = " + tenant_id + ")");
            requests.push("DELETE FROM promotion_client WHERE promotion_id IN ( SELECT id_db FROM promotions WHERE date('now') NOT BETWEEN starts_at AND ends_at AND activite = " + activite + " AND societe = " + tenant_id + ")");
            requests.push("DELETE FROM promotion_consumption WHERE promotion_id IN ( SELECT id_db FROM promotions WHERE date('now') NOT BETWEEN starts_at AND ends_at AND activite = " + activite + " AND societe = " + tenant_id + ")");
            requests.push("DELETE FROM promotion_gratuite WHERE promotion_id IN ( SELECT id_db FROM promotions WHERE date('now') NOT BETWEEN starts_at AND ends_at AND activite = " + activite + " AND societe = " + tenant_id + ")");
            requests.push("DELETE FROM gratuite_article WHERE promotion_gratuite_id IN ( SELECT id FROM promotion_gratuite WHERE promotion_id IN ( SELECT id_db FROM promotions WHERE date('now') NOT BETWEEN starts_at AND ends_at AND activite = " + activite + " AND societe = " + tenant_id + ") )");
            requests.push("DELETE FROM promotion_palier WHERE id_promotion IN ( SELECT id_db FROM promotions WHERE date('now') NOT BETWEEN starts_at AND ends_at AND activite = " + activite + " AND societe = " + tenant_id + ")");
            requests.push("DELETE FROM promotions WHERE date('now') NOT BETWEEN starts_at AND ends_at AND activite = " + activite + " AND societe = " + tenant_id + ";");


            angular.forEach(requests, function(sql_query){
                query(sql_query).then(
                    function(success){
                        console.log(success);
                        // WE'LL SAY THAT ALL THE DELETION QUERIES SUCCEED
                        deferred.resolve(success);
                    },
                    function(error){
                        console.error(sql_query, error);
                        deferred.resolve(error);
                    });
            });

            console.log("CLEAN DONE!");

            // USE ONLY THE SUCCESS PROMISE
            // THIS SERVICE SHOULD NOT INTERRUPT THE SYNC PROCESS

            return deferred.promise;
        }

        return {
            fetch: fetch,
            fetchAll: fetchAll,
            init: init,
            query: query,
            clean: clean
        };
    })

    .factory("StockLivreur", function (DB, $q, $http) {
        return {
            sync: sync
        };

        function sync(id, ip) {
            var deferred = $q.defer();
            var requests = [];
            deferred.resolve([]);
            /*$http.get("http://197.230.28.154:81/newsales/rest/livreurs/" + id + "/stocks").then(
             function (success) {
             console.log(success);
             if (typeof(success.data.content) != "undefined") {
             var stockLines = success.data.content;
             console.log(stockLines)
             var addons = []
             for (var i = 0, len = stockLines.length; i < len; i++) {
             var stockLine = stockLines[i];
             addons.push(convertStockLineObjectIntoParam(stockLine));
             }
             requests.push("DELETE FROM stock_livreur WHERE livreur_id = " + JSON.parse(window.localStorage["profile"]).id_db + ";");
             requests.push("INSERT INTO stock_livreur(item, packet, unit, livreur_id) VALUES " + addons.join(", ") + ";");
             console.log(requests);
             for (var i = 0, len = requests.length; i < len; i++) {
             console.log("THIS IS IT !!")
             console.log(requests[i])
             DB.query(requests[i]).then(
             function (success) {
             console.log(success);
             deferred.resolve(success);
             },
             function (error) {
             console.log(error);
             deferred.resolve(error);
             });
             }
             }
             },
             function (error) {
             deferred.resolve([]);
             });*/
            return deferred.promise;
        }

        function convertStockLineObjectIntoParam(stockLine) {
            return "(" + stockLine.itemID + ", " + stockLine.stockSecondaire + ", " + stockLine.stockPrincipale + ", " + JSON.parse(window.localStorage["profile"]).id_db + ")";
        }
    })

    .factory('httpRequestInterceptor', function ($q, $window) {
        return {
            request: function (config) {
                var profile = JSON.parse(window.localStorage['profile'] || '{}');

                //console.log(profile);

                var parametrage = profile.parametrage || {};

                var company = parametrage.company || {};

                var tenantId = company.id || 0;

                config.headers['tenentID'] = tenantId;

                if (typeof(profile.token) != "undefined") {
                    config.headers['Authorization'] = 'Basic ' + profile.token;
                }
                //console.log(config)
                return config;
            }
        };
    })

    .factory("PlanTarifaire", function (DB, $q, $http) {
        return {
            sync: sync,
            addToDB: addToDB
        };

        function sync(vendeurId, ip) {
            var request = {
                url: "http://"+ip+"/newsales/rest/planTarifaire/planTarifairebyVendeur/"+vendeurId,
                //url: "http://192.168.100.36:8082/newsales/rest/planTarifaire/planTarifairebyVendeur/42",
                method: "GET"
            };
            return $http(request);
        }

        function addToDB(vendeurId, ip) {
            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id;
            var activite = profile.activite || 0;

            sync(vendeurId, ip).then(function (success) {

                


                var plans = success.data;
                if (typeof(success.data) != "undefined" && success.data != null && Object.prototype.toString.call(success.data) == "[object Array]" && plans.length > 0) {
                    var addons = [];
                    var requests = [];
                    requests.push("DELETE FROM plan_tarifaire WHERE societe = " + tenant_id + " AND activite = " + activite + " ;");
                    angular.forEach(plans, function(plan){
                        plan.isActive = plan.isActive ? 1 : 0;
                        angular.forEach(plan.articles, function(article){
                            angular.forEach(plan.client, function(client){
                                addons.push("(" + plan.id + ", '" + plan.startDate + "', '" + plan.endDate + "', " + plan.isActive + ", " + (article.id || 0) + ", " + (article.prixPlan || 0) + ", '" + (plan.code) + "', "+client+", " +tenant_id + ", " + activite + ")");
                            });
                        });
                    });
                    requests.push("INSERT INTO plan_tarifaire(id_plan, startDate, endDate, actif, itemId, prixArticle, code, client, societe, activite) VALUES " + addons.join(", ") + ";");
                    deferred.resolve(requests);
                }
                else {
                    deferred.resolve([]);
                }


            }, function (error) {
                deferred.resolve([]);
            });
            return deferred.promise;
        }
    })

    .factory("Surveys", function ($http, DB, $q) {
        return {
            sync: sync,
            getFormattedSurveys: getFormattedSurveys,
            addSurveysToDB: addSurveysToDB,
            addSurveyClientAnswers: addSurveyClientAnswers,
            getClientsResponses: getClientsResponses
        };


        function getClientsResponses(vendeurId){
        
              var deferred = $q.defer();

              var sql_query="select survey_id as questionID, client_id as clientID ,answer as response from survey_client  "+
              "where client_id in (select id_db from clients where route in (select id_db from routes where vendeur=?))";

              var bindings=[vendeurId];
              DB.query(sql_query,bindings).then(
                    function (success) {

                        var result=DB.fetchAll(success);

                        angular.forEach(result, function(item){
                            item.reponse = ( item.reponse === "true" || item.reponse === "false" ) ? ( item.reponse === "true"?"oui":"non"):item.reponse;
                        });

                        deferred.resolve(result);
                    },
                    function (error) {
                        deferred.resolve([]);
                    });
              return deferred.promise;

        }

        function addSurveyClientAnswers(surveys, client_id) {
            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;


            var answersAddons = [];
            angular.forEach(surveys, function (survey, index) {
                answersAddons.push("(" + client_id + ", " + survey.id + ", '" + survey.choosen + "', " + tenant_id + ", " + activite + ")");
                if (index == surveys.length - 1) {
                    var sql_query = "INSERT INTO survey_client (client_id, survey_id, answer, societe, activite) VALUES " + answersAddons.join(", ") + ";";
                    return DB.query(sql_query).then(
                        function (success) {
                            deferred.resolve(success);
                        },
                        function (error) {
                            deferred.reject(error);
                        });
                }
            });
            return deferred.promise;
        }

        function getAll() {
            var mission = window.localStorage.getItem("mission");
            var profile = window.localStorage.getItem("profile");
            var clientType = 0;
            var activite = 0;
            if(mission != null)
            {
                mission = JSON.parse(mission || "{}");
                clientType = mission.typeClient || clientType;
            }
            if(profile != null)
            {
                profile = JSON.parse(profile || "{}");
                activite = profile.activite || activite;
            }
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query = 'SELECT * FROM surveys WHERE date("now") BETWEEN startDate AND endDate AND clientType = ' + clientType +' AND activite = ' + activite + ' AND societe = ' + tenant_id + ';';
            console.log(sql_query);
            return DB.query(sql_query).then(
                function (success) {
                    console.log(success);
                    return DB.fetchAll(success);
                },
                function (error) {
                    console.log(error);
                    return error;

                });
        }

        function getFormattedSurveys() {
            var deferred = $q.defer();
            getAll().then(
                function (success) {
                    console.log(success);
                    var surveys = [];
                    var clientSurveys = {done: false};

                    angular.forEach(success, function(survey){

                        survey.question = survey.question || "";

                        survey.answers = survey.answers || "";

                        survey.required = survey.required || false;

                        survey.id = survey.id || 0;

                        var object = {
                            question: survey.question.replace(/["?"]/, "")[0].toUpperCase().concat(survey.question.replace(/["?"]/, "").slice(1)),
                            type: survey.type || 0,
                            answers: survey.answers.split(", "),
                            required: ((survey.required == 1) ? true : false),
                            id: survey.id
                        };

                        surveys.push(object);

                    });

                    clientSurveys.surveys = surveys;
                    deferred.resolve(clientSurveys);

                },
                function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function sync(ip) {
            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var deferred = $q.defer();
            var request = {
                url: "http://" + ip + "/newsales/rest/activities/" + activite + "/questionnaire/mobile",
                method: "GET"
            };
            $http(request).then(
                function (success) {

                    var surveys = success.data.content || [];
                    
                    var requests = [];

                    var addonsSurveys = [];

                    angular.forEach(surveys, function(survey){

                        var type = survey.typeClient.id || 0;

                        var startDate = survey.startDate || "2999-12-01";

                        var endDate = survey.endDate || "2999-12-30";

                        angular.forEach(survey.questions, function(question){

                            addonSurvey = '(' + question.id + ', "' + question.question + '", "' + question.answers.join(", ") + '", ' + (question.required ? 1 : 0) + ", " + question.responseType + ", " + type + ", '" + startDate +"', '" + endDate +"', " + activite + ", " + tenant_id + " )";
                            addonsSurveys.push(addonSurvey);

                        });

                    });


                    if (addonsSurveys.length > 0) {
                        requests.push("DELETE FROM surveys;");
                        requests.push("INSERT INTO surveys (id, question, answers, required, type, clientType, startDate, endDate, activite, societe) VALUES " + addonsSurveys.join(", ") + ";");
                    }
                    console.log(requests);
                    deferred.resolve(requests);
                },
                function (error) {
                    console.log(error)
                    deferred.resolve([]);
                });
            return deferred.promise;
        }

        function addSurveysToDB(vendeurId, ip) {
            var deferred = $q.defer();
            sync(ip).then(
                function (success) {
                    console.log(success);


                    if (success.length > 0) {
                        var requests = [];
                        requests.push("DELETE FROM surveys;");
                        requests = requests.concat(success);
                        angular.forEach(requests, function (request) {
                            DB.query(request).then(
                                function (success) {
                                    console.log(success);
                                    deferred.resolve(success);
                                },
                                function (error) {
                                    console.log(error);
                                    deferred.resolve(error);
                                });
                        });
                    }
                    else {
                        deferred.resolve("NONE !");
                    }

                },
                function (error) {
                    deferred.resolve([]);
                });
            return deferred.promise;
        }

    })

    .factory("UpdateFactory", function () {
        return {
            deleteThem: deleteThem
        };

        function deleteThem(table, field, ids, hash, child) {
            console.log(ids);
            var requests = [];
            var string = "";
            if (typeof(hash) != "undefined") {
                for (key in hash) {
                    string += " AND " + key + " != " + hash[key];
                }
            }
            requests.push("DELETE FROM " + table + " WHERE " + field + " IN (" + ids.join(", ") + ")" + string + ";");
            if (typeof(child) != "undefined") {
                console.log(child)
                for (key in child) {
                    requests.push("DELETE FROM " + key + " WHERE " + child[key] + " IN (" + ids.join(", ") + ");");
                }
            }
            return requests;
        }
    })

    .factory("IonicPopUpUtilities", function () {
        return {
            alert: alert
        };

        function alert(msg, description) {
            var object =
            {
                title: "<h4>" + msg + "</h4>",
                buttons: [
                    {
                        text: "OK",
                        type: "button-assertive",
                        cssClass: "assertive-survey"
                    }
                ],
                template: '<span style="font-size: 13px; font-weight: 400;">' + description + '.</span>'
            };
            return object;
        }


    })

    .factory("EchangeService", function(DB, $q, LigneCommandes, DateUtilities){
        return {
            add: add,
            get: get,
            getAll: getAll,
            addLigne: addLigne,
            preAddLignes: preAddLignes,
            sync: sync
        };

        function sync(vendeurId) {
            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query = 'SELECT E.id as mobileID, E.client, E.payment_mode AS payementModeID, E.total_ttc as factured, E.total_ht AS facturedHT, E.date_start AS echangeDate, "[" || Group_Concat("{ ""packet"": " || EL.packet || ", ""unit"": " || EL.unit || ", ""prix"": " || EL.pu || ", ""entrant"": " || EL.entrant || ", ""sortant"": " || EL.sortant || ", ""article"": " || EL.article || "}") || "]" as lignes FROM echange AS E JOIN echange_ligne AS EL ON EL.echange = E.id WHERE synced = 0 AND vendeur = ' + vendeurId + ' AND activite = ' + activite + ' AND societe = ' + tenant_id + ';';
            DB.query(sql_query).then(
                function(success){
                    
                    var echanges = DB.fetchAll(success);
                    var output = [];

                    angular.forEach(echanges, function(echange){

                        console.log(echange);

                        var articlesRecuperee = [];
                        var articleLivree = [];
                        var object = {};

                        echange.lignes = JSON.parse(echange.lignes || "[]");

                        angular.forEach(echange.lignes, function(ligne){

                            var echangeLigne = {};

                            echangeLigne.caisse = ligne.packet;
                            echangeLigne.unite = ligne.unit;
                            echangeLigne.id_article = ligne.article;
                            echangeLigne.prix = ligne.prix;

                            if(ligne.entrant == 1) {
                                articlesRecuperee.push(echangeLigne);
                            } else {
                                articleLivree.push(echangeLigne);
                            }
                        });

                        object.clientID = echange.client || 0;
                        object.payementModeID = echange.payementModeID;
                        object.factured = echange.factured;
                        object.facturedHT = echange.facturedHT;
                        object.mobileID = echange.mobileID;
                        object.echangeDate = echange.echangeDate;
                        object.articlesRecuperee = articlesRecuperee;
                        object.articleLivree = articleLivree;
                        output.push(object);
                    });
                    
                    deferred.resolve(output);

                }, 
                function(error){
                    deferred.resolve([]);
                });
            return deferred.promise;
        }

        function add(input) {
            var deferred = $q.defer();
            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var timbre = input.timbre || 0;
            var paymentMode = input.paymentMode || 0;
            var totalTTC = input.totalTTC || 0;
            var totalHT = input.totalHT || 0;
            var client = input.client || 0;
            var vendeur = profile.id_db || 0;
            var lignes = input.lignes || [];
            var print_content = input.print_content || "";
            var currentDiscount = input.currentDiscount || 0;
            var currentDiscountValue = input.currentDiscountValue || 0;
            var date_start = DateUtilities.convertLongToYYYYMMDD(new Date());

            var query = "INSERT INTO echange (client, vendeur, total_ht, total_ttc, payment_mode, escompte_value, date_start, print_content, societe, activite, timbre) VALUES ";
            var bindings = "( " + client + ", " + vendeur + ", " + totalHT + ", " + totalTTC + ", " + paymentMode + ", " + currentDiscountValue + ", '" + date_start + "', '" + print_content + "', " + tenant_id + ", " + activite + ", " + timbre + " );";
            var sql_query = query + "" +bindings;

            DB.query(sql_query).then(
                function(success) {
                    if( typeof(success.insertId) != "undefined" ) {
                        deferred.resolve(preAddLignes(lignes, success.insertId));
                    } else {
                        deferred.reject("INSERTION PROBLEM !");
                    }
            },  function(error) {
                    deferred.reject(error);
            });

            return deferred.promise;
        }

        function preAddLignes(input, echangeId) {
            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            angular.forEach(input, function(ligne){
                if(ligne.prixVente <= 0) {

                    // YES THIS ONE !
                    LigneCommandes.addReturnsToStock(ligne).then(
                        function(success) {
                            addLigne(ligne, echangeId).then(function(success){
                                deferred.resolve("YOU ARE DONE !")
                            }, function(error) {
                                deferred.reject("AH FUCK YOU WERE SO CLOSE YOU NEED A ROLLBACK !");
                            });
                        }, 
                        function(error) {
                            deferred.reject("AH FUCK YOU WERE SO CLOSE A ROLLBACK IS A MUST !");
                        });

                } else {
                    // WE HAVE THE SAME FUNCTION IN THE SECOND LEVEL
                    // OF THE addReturnsToStock() function !
                    var reduction = ( ligne.packet * ligne.unitConversion ) + ligne.unit;
                    DB.query("UPDATE stock SET total = total - " + reduction + " WHERE item = " + ligne.id_db + " AND employee_id = " + ( profile.id_db || 0 ) + " AND activite = " + activite + " AND societe = " + tenant_id + ";").then(
                        function(success) {
                            addLigne(ligne, echangeId).then(function(success){
                                deferred.resolve("YOU ARE DONE !")
                            }, function(error) {
                                deferred.reject("AH FUCK YOU WERE SO CLOSE YOU NEED A ROLLBACK !");
                            });
                    },  function(error) {
                        deferred.reject("AH FUCK YOU WERE SO CLOSE YOU NEED A ROLLBACK !");
                    });
                }
            });

            return deferred.promise;
        }/*

        {
            name: "echange",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "vendeur", value: "integer not null default 0"},
                {name: "client", value: "integer not null default 0"},
                {name: "total_ttc", value: "double not null default 0"},
                {name: "total_ht", value: "double not null default 0"},
                {name: "payment_mode", value: "integer not null default 0"},
                {name: "activite", value: "integer not null"},
                {name: "societe", value: "integer not null"},
                {name: "print_content", value: "text not null default '' "},
                {name: "FOREIGN KEY(client)", value: "REFERENCES clients(id_db)"},
                {name: "FOREIGN KEY(vendeur)", value: "REFERENCES accounts(id_db)"}
            ]
        },

        {
            name: "echange_ligne",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "article", value: "integer not null default 0"},
                {name: "entrant", value: "integer not null default 0"},
                {name: "sortant", value: "integer not null default 0"},
                {name: "FOREIGN KEY(article)", value: "REFERENCES articles(id_db)"}
            ]
        },*/



        function addLigne(ligne, echangeId) {
            var deferred = $q.defer();
            var query = "INSERT INTO echange_ligne (article, packet, unit, entrant, sortant, echange, pu) VALUES ";

            var article = ligne.id_db || 0;
            var packet = ligne.packet || 0;
            var unit = ligne.unit || 0;
            var prix = ligne.prixVente || 0;
            var echange = echangeId || 0;
            var pu = ligne.prixVente || 0;

            var entrant = ( prix <= 0 ) ? 1 : 0;
            var sortant = ( prix > 0 ) ? 1 : 0;

            var bindings = "( " + article + ", " + packet + ", " + unit + ", " + entrant + ", " + sortant + ", " + echange + ", " + pu + " );";
            var sql_query = query + "" + bindings;

            DB.query(sql_query).then(function(success){
                console.log(success);
                deferred.resolve("LIGNE ADDED");
            }, function(error){
                console.log(error);
                deferred.reject("LIGNE NOT ADDDED");
            });

            return deferred.promise;
        }


        function get() {

        }

        function getAll() {
            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            var vendeur_id = profile.id_db || 0;

            var sql_query = "SELECT C.address, C.nom, C.prenom, C.code_client as codeClient, E.* FROM echange AS E LEFT JOIN clients AS C ON C.id_db = E.client AND C.activite = " + activite + " AND C.societe = " + tenant_id + " WHERE E.societe = " + tenant_id + " AND E.activite = " + activite + " AND E.vendeur = " + vendeur_id + ";";
            return DB.query(sql_query).then(
                function(success){
                    return DB.fetchAll(success);
                },
                function(error){
                    return error;
                });
        }

        
    })
    .factory("CartUtilities", function (Promotions, $log, $q) {
        return {
            existInCart: existInCart,
            getOutOfQuota: getOutOfQuota,
            dropFromCart: dropFromCart,
            addToCart: addToCart,
            addOrModify: addOrModify,
            getCartItems: getCartItems,
            getGiftsFromObject: getGiftsFromObject,
            prepareGift: prepareGift,
            totalCart: totalCart,
            totalEchange: totalEchange,
            clearVisit: clearVisit,
            prepareEchangeItems: prepareEchangeItems,
            totalToAddOrRemove: totalToAddOrRemove
        };

        function prepareEchangeItems() {
            var deferred = $q.defer();
            var total = 0;
            var echange = JSON.parse(window.localStorage["echange"] || "{}");
            var sortant = echange.sortant || {};
            var entrant = echange.entrant || {};
            var sortantItems = sortant.items || [];
            var entrantItems = entrant.items || [];
            for(var i = 0 ; i < entrantItems.length ; i++) {
                entrantItems[i].prixVente *= -1;
            }
            sortantItems = sortantItems.concat(entrantItems);
            deferred.resolve(sortantItems);
            return deferred.promise;
        }

        function totalEchange() {
            var deferred = $q.defer();
            var total = 0;
            var echange = JSON.parse(window.localStorage["echange"] || "{}");
            var sortant = echange.sortant || {};
            var entrant = echange.entrant || {};
            var sortantItems = sortant.items || [];
            var entrantItems = entrant.items || [];
            for(var i = 0 ; i < sortantItems.length ; i++) {
                total += totalToAddOrRemove(sortantItems[i]);
                if(i == sortantItems.length - 1) {
                    for(var j = 0 ; j < entrantItems.length ; j++) {
                        total -= totalToAddOrRemove(entrantItems[j]);
                    }
                }
            }
            //return total;
            deferred.resolve(total);
            return deferred.promise;
        }

        function totalToAddOrRemove(item) {
            var addon = 0;
            if(item.uniteMesure == "CS") {
                addon = item.packet + ( item.unit / item.unitConversion );
            } else {
                addon = item.unit + ( item.packet * item.unitConversion );
            }   
            return addon*item.prixVente;
        }

        function clearVisit() {
            var deferred = $q.defer();
            var keys = Object.keys(window.localStorage);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] != "profile") {
                    window.localStorage.removeItem(keys[i]);
                }
            }
            deferred.resolve("OK!");
            return deferred.promise;
        }

        function totalCart(ttc, ht, promotions) {
            var promotions = JSON.parse(window.localStorage['promotions'] || '[]');

            var deferred = $q.defer();
            var total = 0;
            var promotionPC = 0;
            getCartItems().then(function (input) {

                var items = input.items;
                if (items.length > 0) {
                    angular.forEach(items, function (item, index) {
                        // WE ARE NOT COUNTING THE GIFTS !


                        if (item.prixVente > 0) {
                            promotionPC += item.ht;

                            if (ttc && promotions) {
                                item.ht = item.ht - item.remise;
                                var tva = (typeof(item.tva) != "undefined" && item.tva != null) ? (item.ht * (item.tva / 100)) : 0;
                                item.ttc = item.ht + tva;
                                total = total + item.ttc;
                            }
                            else if (ttc) {
                                var tva = (typeof(item.tva) != "undefined" && item.tva != null) ? (item.ht * (item.tva / 100)) : 0;
                                item.ttc = item.ht + tva;
                                total = total + item.ttc;
                            }
                            else {
                                total += item.ht;
                            }

                        }
                    });
                    deferred.resolve(total);
                }
                else {
                    deferred.resolve(0);
                }

            });

            return deferred.promise;
        }

        function getCartItems() {
            var deferred = $q.defer();
            var cart = JSON.parse(window.localStorage['cart'] || "{}");
            var items = cart.items || [];
            var output = [];
            var input = {};
            if (/*!items.length > 0*/false) {
                deferred.resolve({items: [], discounts: []});
                return deferred.promise;
            }
            else {
                for (var i = 0, len = items.length; i < len; i++) {
                    var item = items[i];
                    if (Object.prototype.toString.call(item) == "[object Object]") {
                        if (typeof(item.promotions) != "undefined" && item.promotions != null && item.promotions.length > 0 && item.prixVente > 0) {
                            console.debug(item);
                            var object = Promotions.cartTreatment(item, input);
                            input = object.gifts;
                            output.push(object.item);
                        }
                        else {
                            item.promotions = [];
                            var object = Promotions.cartTreatment(item, input);
                            output.push(object.item);
                        }
                    }
                }
                var gifts = getGiftsFromObject(input);
                // HERE I AM INJECTING THE GIFTS FROM THE PROMOTIONS THAT ARE GIVEN ONCE UPON A TIME AND THAT ARE NOT LINKED
                // WITH ANY ITEM !!

                gifts = gifts.concat(Promotions.getConsumedOnce());
                var gifts = gifts.map(
                    function (a) {
                        return prepareGift(a);
                    });
                output = output.concat(gifts);

                var cartDiscounts = [];

                var promotions = JSON.parse(window.localStorage["promotions"] || "[]");

                angular.forEach(promotions, function (promotion) {
                    if (promotion.type == "PC" && promotion.consumed == true) {
                        var cartDiscount = {
                            promotion_id: promotion.id,
                            remise: promotion.remise,
                            priorite: promotion.priorite
                        };
                        cartDiscounts.push(cartDiscount);
                    }
                });
                deferred.resolve({items: output, discounts: cartDiscounts});
                return deferred.promise;
            }
        }

        function prepareGift(article) {
            if (Object.prototype.toString.call(article) == "[object Array]") {
                for (var i = 0; i < article.length; i++) {
                    var subs = article[i];
                    for (var j = 0; j < subs.length; j++) {
                        var sub = subs[j];
                        sub = prepareArticleToBeGift(sub);
                    }
                    if (i == article.length - 1) {
                        return article;
                    }
                }
            }
            else {
                return prepareArticleToBeGift(article);
            }
        }

        function prepareArticleToBeGift(article) {

            article.prixVente = 0;
            article.nomArticle = article.designation;
            article.unit = article.qty;
            article.packet = 0;
            return article;
        }

        function getGiftsFromObject(object) {
            var output = [];
            var conflicts;
            for (var key in object) {
                var gifts = object[key];
                if (gifts.length > 1) {
                    conflicts = {};
                    for (var i = 0; i < gifts.length; i++) {
                        var gift = gifts[i];
                        conflicts[gift.group] = typeof conflicts[gift.group] != "undefined" ? conflicts[gift.group].concat([gift]) : [gift];
                    }
                    console.debug(conflicts);
                    var conflictKeys = Object.keys(conflicts);
                    if (conflictKeys.length > 1) {
                        var conflictArray = [];
                        for (var conflictKey in conflictKeys) {
                            conflictArray.push(conflicts[conflictKey]);
                        }
                        output.push(conflictArray);
                    }
                    else {
                        output = output.concat(gifts);
                    }
                }
                else {
                    output = output.concat(gifts);
                }
            }
            console.debug(output);
            return output;
        }

        function existInCart(article, forChargement, prelevement, retour, dechargement, echange, sortant, entrant) {
            prelevement = typeof(prelevement) != "undefined" && prelevement == true;

            forChargement = typeof(forChargement) != "undefined" && forChargement == true;

            dechargement = typeof(dechargement) != "undefined" && dechargement == true;

            retour = typeof(retour) != "undefined" && retour == true;

            echange = typeof(echange) != "undefined" && echange == true;

            sortant = typeof(sortant) != "undefined" && sortant == true;

            entrant = typeof(entrant) != "undefined" && entrant == true;

            var logs = [ ["article", "function", "prelevement", "forChargement", "retour", "echange", "sortant", "entrant"], [ article, "existInCart()", prelevement, forChargement, retour, echange, sortant, entrant] ];


            var _key;
            var _subKey;
            if(echange && sortant) {
                _key = "echange";
                _subKey = "sortant";
            } else if(echange && entrant) {
                _key = "echange";
                _subKey = "entrant";
            } else if (prelevement == true || retour == true || dechargement == true) {
                if (prelevement == true) {
                    _key = "prelevement";
                }
                else if (dechargement == true) {
                    _key = "dechargement";
                }
                else {
                    _key = "retour";
                }
            }
            else {
                _key = "cart";
            }

            var logs = [ ["_key", "_subKey"], [_key, _subKey || "Ce n'est pas un échange ==> NO SUB KEY ( ENTRANT || SORTANT )"] ];
            //console.table(logs);

            //console.log(_key)

            //console.log(_key);

            var cart = JSON.parse(window.localStorage[_key] || "{}");

            if(echange) {
                if(typeof(cart[_subKey]) == "undefined") {
                    return null;
                } else {
                    var directionObject = cart[_subKey];
                    if(typeof(directionObject.items) == "undefined") {
                        return null;
                    } else {
                        var items = directionObject.items;
                        for(var i = 0 ; i < items.length ; i++) {
                            var item = items[i];
                            if(article.id_db == item.id_db && item.prixVente > 0) {
                                return item;
                            }
                        }
                        return null;
                    }
                }

            } else {
                if (typeof cart.items != "undefined") {
                    for (var i = 0, len = cart.items.length; i < len; i++) {
                        var cartItem = cart.items[i];

                        if (article.id_db == cartItem.id_db && cartItem.prixVente > 0) {
                            return cartItem;
                        }
                    }
                    return null;
                }
                else {
                    return null;
                }
            }

        }


        function addOrModify(article, chargement, prelevement, retour, dechargement,echange, sortant, entrant) {
            prelevement = typeof(prelevement) != "undefined" && prelevement == true;

            retour = typeof(retour) != "undefined" && retour == true;

            echange = typeof(echange) != "undefined" && echange == true;

            sortant = typeof(sortant) != "undefined" && sortant == true;

            entrant = typeof(entrant) != "undefined" && entrant == true;

            chargement = typeof(chargement) != "undefined" && chargement == true;

            dechargement = typeof(dechargement) != "undefined" && dechargement == true;

            var _key;
            var _subKey;

            if(echange) {
                _key = "echange";
                if(entrant){
                    _subKey = "entrant";
                } else if(sortant) {
                    _subKey = "sortant";
                } else {
                    console.error("");
                }

            } else if (prelevement == true || retour == true || dechargement == true) {
                if (prelevement == true) {
                    _key = "prelevement";
                }
                else if (dechargement == true) {
                    _key = "dechargement"
                }
                else {
                    _key = "retour";
                }
            } else {
                _key = "cart";
            }

            var logs = [ ["function", "echange", "sortant", "entrant", "_key", "_subKey"], ["CartUtilities.dropFromCart()", echange, sortant, entrant, _key, (_subKey || "NOT ECHANGE")] ];
            console.table(logs);

            var cart = JSON.parse(window.localStorage[_key] || "{}");

            if(echange) {
                if(typeof(cart[_subKey]) == "undefined") {
                    cart[_subKey] = {};
                }
                var subObject = cart[_subKey];
                if(typeof(subObject["items"]) == "undefined") {
                    subObject["items"] = [];
                }
                var items = subObject["items"];
                if(items.length > 0) {
                    //items = add(article, items);
                    var found = false;
                    for(var i = 0 ; i < items.length ; i++) {
                        found = false;
                        var item = items[i];
                        if(item.id_db == article.id_db) {
                            items[i] = article;
                            found = true;
                            break;
                        }
                    }
                    if(!found) {
                        items.push(article);
                    }
                } else {
                    items.push(article);
                }
                window.localStorage[_key] = JSON.stringify(cart);

            } else {
                if (typeof cart.items == "undefined" || cart.items.length == 0) {
                addToCart(article, chargement, prelevement, retour, dechargement);
                } else {
                    console.log("NON EMPTY CART ! ");

                    var found = false;

                    for (var i = 0, len = cart.items.length; i < len; i++) {
                        var cartItem = cart.items[i];

                        if (article.id_db == cartItem.id_db && cartItem.prixVente > 0) {
                            cartItem.unit = article.unit;
                            cartItem.packet = article.packet;
                            found = true;
                            break;
                        }

                    }

                    if (!found) {
                        cart.items.push(article);
                    }

                    window.localStorage[_key] = JSON.stringify(cart);

                    cart = null;

                }
            }

        }

        function addToCart(article, chargement, prelevement, retour, dechargement) {
            prelevement = typeof(prelevement) != "undefined" && prelevement == true;

            retour = typeof(retour) != "undefined" && retour == true;

            chargement = typeof(chargement) != "undefined" && chargement == true;

            dechargement = typeof(dechargement) != "undefined" && dechargement == true;

            var _key;

            if (prelevement == true || retour == true || dechargement == true) {
                if (prelevement == true) {
                    _key = "prelevement";
                }
                else if (dechargement == true) {
                    _key = "dechargement"
                }
                else {
                    _key = "retour";
                }
            }
            else {
                _key = "cart";
            }

            var cart = JSON.parse(window.localStorage[_key] || "{}");
            if (typeof cart.items == "undefined") {
                cart.items = [];
            }
            console.log(article);
            cart.items.push(article);

            window.localStorage[_key] = JSON.stringify(cart);

            cart = null;
        }

        function dropFromCart(article, chargement, prelevement, retour, dechargement, echange, sortant, entrant) {
            prelevement = typeof(prelevement) != "undefined" && prelevement == true;

            retour = typeof(retour) != "undefined" && retour == true;

            echange = typeof(echange) != "undefined" && echange == true;

            sortant = typeof(sortant) != "undefined" && sortant == true;

            entrant = typeof(entrant) != "undefined" && entrant == true;

            chargement = typeof(chargement) != "undefined" && chargement == true;

            dechargement = typeof(dechargement) != "undefined" && dechargement == true;

            var logs = [ ["function", "echange", "sortant", "entrant"], ["CartUtilities.dropFromCart()", echange, sortant, entrant] ];
            console.table(logs);

            var _key;
            var _subKey;

            if(echange) {
                _key = "echange";
                if(entrant){
                    _subKey = "entrant";
                } else if(sortant) {
                    _subKey = "sortant";
                } else {
                    console.error("");
                }

            } else if (prelevement == true || retour == true || dechargement == true) {
                if (prelevement == true) {
                    _key = "prelevement";
                }
                else if (dechargement == true) {
                    _key = "dechargement"
                }
                else {
                    _key = "retour";
                }
            } else {
                _key = "cart";
            }

            var logs = [ ["function", "echange", "sortant", "entrant", "_key", "_subKey"], ["CartUtilities.dropFromCart()", echange, sortant, entrant, _key, (_subKey || "NOT ECHANGE")] ];
            console.table(logs);

            var cart = JSON.parse(window.localStorage[_key] || "{}");

            var items = [];
            

            if(echange) {
                if(typeof(cart[_subKey]) == "undefined") {
                    return;
                } else {
                    var subObject = cart[_subKey];
                    if(typeof(subObject.items) == "undefined") {
                        return;
                    } else {

                        if(subObject.items.length <= 0) {
                            return;
                        } else if(subObject.items.length == 1) {
                            if(article.id_db == subObject.items[0].id_db) {
                                subObject.items = [];
                                window.localStorage[_key] = JSON.stringify(cart);
                                return;
                            } else {
                                return;
                            }
                        } else {
                            for(var i = subObject.items.length - 1 ; i >= 0 ; i--) {
                                if(subObject.items[i].id_db == article.id_db) {
                                    subObject.items.splice(i, 1);
                                }
                            }
                            window.localStorage[_key] = JSON.stringify(cart);
                            return;
                        }
                    }
                }
            } else {
                items = typeof(cart.items) != "undefined" ? cart.items : [];
                if (items.length > 1) {
                    for (var i = items.length - 1; i >= 0; i--) {
                        var cartItem = items[i];
                        if (article.id_db == cartItem.id_db && cartItem.prixVente > 0) {
                            items.splice(i, 1);
                            break;
                        }
                    }
                    cart.items = items;
                    window.localStorage[_key] = JSON.stringify(cart);
                    return;
                } else if (items.length == 1) {
                    if (items[0].id_db == article.id_db && items[0].prixVente > 0) {
                        cart.items = [];
                        window.localStorage[_key] = JSON.stringify(cart);
                        return;
                    }
                    else {
                        return;
                    }
                } else {
                    return null;
                }
            }

        }

        function getOutOfQuota() {
            var found = false;
            if (typeof(window.localStorage['cart']) != "undefined") {
                var cartItems = JSON.parse(window.localStorage['cart']).items;
                for (var i = 0, len = cartItems.length; i < len; i++) {
                    var item = cartItems[i];
                    var currentTotal = Math.trunc(item.unit / item.unitConversion) + item.packet;
                    var total = ((item.packet * item.unitConversion) + item.unit) * item.prixVente;
                    if (item.quotaVALUE != 0 || item.quotaQTY != 0) {
                        if (item.quotaQTY != 0) {
                            found = (item.quotaQTY < currentTotal);
                            // IF ONE IS GREATHER NO NEED TO COMPLETE THE ITERATION !!
                            if (found) {
                                break;
                            }
                        }
                        else {
                            found = (item.quotaVALUE < total);
                            // IF ONE IS GREATHER NO NEED TO COMPLETE THE ITERATION !!
                            if (found) {
                                break;
                            }
                        }
                    }
                    else {
                        found = true;
                        break;
                    }
                }
                return found;
            }
            else {
                return found;
            }
        }

    })


    .factory("StockUtils", function ($q, DB, $http, DateUtilities) {
        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        var activite = profile.activite || 0;
        var parametrage = profile.parametrage || {};
        var company = parametrage.company || {};
        var tenant_id = company.id || 0;
        return {
            convertLineObjectToOption: convertLineObjectToOption
        };

        function convertLineObjectToOption(lines, prelevement, retour, clientId) {
            var output = [];
            var date = DateUtilities.convertLongToYYYYMMDD(new Date());
            if (typeof(lines) == "undefined") {
                return [];
            }
            else {
                if (prelevement) {
                    angular.forEach(lines, function(line){
                        var cause = "NONE";
                        line.isConcurrent = line.isConcurrent || 0;
                        var isConcurrent = Boolean(line.isConcurrent) ? 1 : 0;
                        var _id = Boolean(line.isConcurrent) ? line.concurrentId : line.id_db;
                        output.push("(" + line.packet + ", " + line.unit + ", " + _id + ", 0, " + clientId + ", 0, 1, '" + cause + "', '" + date + "', "+isConcurrent+", " + tenant_id + ", " + activite + ")");
                    });
                    
                }
                else {
                    angular.forEach(lines, function(line){
                        var cause = "NONE";
                        output.push("(" + line.packet + ", " + line.unit + ", " + line.id_db + ", 0, " + clientId + ", 1, 0, '" + cause + "', '" + date + "', 0, " + tenant_id + ", " + activite + ")");
                    })
                }
            }
            return output;
        }

    })

    .factory("Retours", function ($q, DB, $http, StockUtils, DateUtilities) {

        return {
            sync: sync,
            add: add,
            get: get,
            addMotifs: addMotifs,
            addToStock: addToStock,
            prepareRetourForCart: prepareRetourForCart,
            clearCartFromRetours: clearCartFromRetours,
            insertBrandFiveLines: insertBrandFiveLines

        };


        function deleteAllBrandFiveLines() {
            console.log("dddddddd");

            DB.query("DELETE FROM brand_five")
                .then(
                    function (success) {
                        console.debug(success);

                    },
                    function (error) {
                        console.debug(error);

                    });
        }

        function insertBrandFiveLines(brandFiveObjectif) {
            console.log("testssssssssss", brandFiveObjectif);
            var brandLines = brandFiveObjectif.brandFiveObjectifLines;
            console.log("brandLines", brandLines);
            var deferred = $q.defer();
            deleteAllBrandFiveLinesyncs();
            angular.forEach(brandLines, function (brandLine) {

                console.debug(brandLine);


                var values = "(" + brandLine.id + ", " + brandLine.id + ", " + brandLine.ca + ", " + brandLine.caCourant + ", " + brandLine.brandId + ", '" + brandLine.brandName + "'," + DateUtilities.convertLongToYYYYMMDD(new Date(brandFiveObjectif.dateDebut)) + ", " + DateUtilities.convertLongToYYYYMMDD(new Date(brandFiveObjectif.dateFin)) + ")";
                console.log("valuesssss", values);
                var sql_query = "INSERT INTO brand_five(id_db,id, ca, ca_courant,brand_id,name,date_Debut,date_Fin) VALUES " + values + ";";


                DB.query(sql_query).then(
                    function (success) {
                        console.debug(success);
                        deferred.resolve(success);

                    },
                    function (error) {
                        console.debug(error);
                        deferred.resolve(error);
                    });
            });

            return deferred.promise;

        }

        function prepareRetourForCart(lines) {
            var deferred = $q.defer();
            var cart = JSON.parse(window.localStorage["cart"] || "{}");
            if (typeof(cart.items) == "undefined") {
                cart.items = [];
            }
            angular.forEach(lines, function (line) {
                line.prixVente *= -1;
                line.remise = 0;
                cart.items.push(line);
            });
            window.localStorage["cart"] = JSON.stringify(cart);
            deferred.resolve("OK");
            return deferred.promise;
        }

        function clearCartFromRetours(lines) {
            var deferred = $q.defer()
            var cart = JSON.parse(window.localStorage["cart"] || "{}");
            if (typeof(cart.items) != "undefined") {
                for (var i = cart.items.length - 1; i >= 0; i--) {
                    if (cart.items[i].prixVente < 0) {
                        cart.items.splice(i, 1);
                    }
                }
            }
            window.localStorage["cart"] = JSON.stringify(cart);
            deferred.resolve(prepareRetourForCart(lines));
            return deferred.promise;
        }

        function get(activite) {
            var sql_query = 'SELECT "[" || Group_Concat("{ ""motif"": """ || M.motifStr || """, ""authorized"": " || M.authorized || "} ") || "]" as motifs FROM motifs AS M ';
            return DB.query(sql_query)
                .then(
                    function (success) {
                        success = DB.fetch(success);
                        success.motifs = JSON.parse(success.motifs);
                        return success;
                    },
                    function (error) {
                        return error;
                    });

        }

        function sync() {
            var deferred = $q.defer();

            var request = {
                method: "GET",
                url: "http://197.230.28.154:81/newsales/rest/retours/retourByVendeur/1"
            };

            $http(request).then(
                function (success) {
                    var retours = success.data;
                    deferred.resolve(add(retours));
                },
                function (error) {
                    deferred.resolve(error);
                });

            return deferred.promise;
        }


        function add(retours) {
            var deferred = $q.defer();
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id;
            var activite = profile.activite || 0;

            angular.forEach(retours, function (retour) {

                console.debug(retour);

                /*
                 var date_debut = DateUtilities.convertLongToYYYYMMDD(new Date(retour.dateDebut));
                 var date_fin = DateUtilities.convertLongToYYYYMMDD(new Date(retour.dateFin));
                 */
                var id = retour.id;
                var timestamp = retour.timeStamp;


                var values = "(" + id + ", " + timestamp + ", " + activite + ", " + tenant_id + ")";
                var sql_query = "INSERT INTO returns(id, timestamp, activite, societe) VALUES " + values + ";";


                DB.query(sql_query).then(
                    function (success) {
                        console.debug(success);
                        deferred.resolve(addItemReturn(retour, tenant_id, activite));

                    },
                    function (error) {
                        console.error(error);
                        deferred.resolve(error);
                    });
            });

            return deferred.promise;
        }


        function addItemReturn(retour, societe, activite) {
            var options = [];
            var sql_query = "INSERT INTO return_item(item_id, return_id, total, societe, activite) VALUES ";
            angular.forEach(retour.items, function (line) {
                options.push("(" + line.itemId + ", " + retour.id + ", " + line.unite + ", " + societe + ", " + activite + ")");
            });
            sql_query += (options.join(", ") + ";");
            return DB.query(sql_query).then(
                function (success) {
                    console.debug(success);
                    return success;
                },
                function (error) {
                    console.debug(error);
                    return error;
                });

        }

        function addMotifs(motifs, societe, activite) {
            var deferred = $q.defer();

            angular.forEach(motifs, function (motif) {

                var motifStr = motif.motifStr;
                var authorized = motif.authorized ? 1 : 0;
                var return_id = 1;


                var values = "('" + motifStr + "', " + authorized + ", " + return_id + ", " + societe + ", " + activite + ")";
                var sql_query = "INSERT INTO motifs(motifStr, authorized, return_id, societe, activite) VALUES " + values + ";";

                DB.query(sql_query).then(
                    function (success) {
                        deferred.resolve(success);
                    },
                    function (error) {
                        console.error(error);
                        deferred.resolve(error);
                    });

            });

            return deferred.promise;
        }

        function addToStock(lines, clientId) {
            var deferred = $q.defer();
            var options = StockUtils.convertLineObjectToOption(lines, false, true, clientId);
            if (options.length > 0) {
               var sql_query = "INSERT INTO stock(packet, unit, item, employee_id, client_id, retour, prelevement, cause, date, isConcurrent, societe, activite) VALUES " + options.join(", ") + ";";
                console.debug(sql_query);
                return DB.query(sql_query).then(
                    function (success) {
                        return success;
                    },
                    function (error) {
                        return error;
                    });
            }
            else {
                deferred.resolve([]);
                return deferred.promise;
            }
        }

    })

    .factory("Prelevements", function ($q, DB, $http, StockUtils, DateUtilities) {

        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        var activite = profile.activite || 0;
        var parametrage = profile.parametrage || {};
        var company = parametrage.company || {};
        var tenant_id = company.id || 0;

        return {
            add: add
        };


        function add(lines, clientId) {
            var deferred = $q.defer();
            var today = DateUtilities.convertLongToYYYYMMDD(new Date());
            var requests = ["DELETE FROM stock WHERE prelevement = 1 AND client_id = "+clientId+" AND date = '"+today+"' AND societe = " + tenant_id + " AND activite = " + activite + ";"];
            if (typeof(lines) == "undefined") {
                deferred.resolve("ERROR");
            }
            else if (!lines.length > 0) {
                    deferred.resolve("ERROR");
            }
            else {

                var options = StockUtils.convertLineObjectToOption(lines, true, false, clientId);
                if (options.length > 0) {
                    var sql_query = "INSERT INTO stock(packet, unit, item, employee_id, client_id, retour, prelevement, cause, date, isConcurrent, societe, activite) VALUES " + options.join(", ") + ";";
                    requests.push(sql_query);

                    angular.forEach(requests, function(request){
                        console.log(request);
                        DB.query(request).then(
                        function (success) {
                            deferred.resolve(success);
                        },
                        function (error) {
                            deferred.resolve(error);
                        });
                    });
                    
                }
                else {
                    deferred.resolve("ERROR");
                }
            }

            return deferred.promise;

        }
    })
    .factory("StockConcurrent", function(DB, $http, $q){
        return {
            add: add,
            sync: sync,
            out: out
        };

        function out(vendeur, ip)
        {
            var deferred = $q.defer();
            var data = {};
            var request = { url: "URL", data: data, method: "PUT" };

            var sql_query = 'SELECT client_id as clientID, "[" || Group_Concat("{ ""item"" : " || ST.item || ", ""concurrent"": " || CASE ST.isConcurrent WHEN 1 THEN "true" ELSE "false" END || ", ""packet"": " || ST.packet || ", ""unite"": " || ST.unit || "}") || "]" as lignes FROM stock AS ST LEFT JOIN clients AS C ON C.id_db = ST.client_id WHERE ST.prelevement = 1 AND C.route IN (SELECT id_db FROM routes AS R WHERE R.vendeur = ? ) AND ST.item NOT NULL GROUP BY client_id;';
            var bindings = [vendeur];

            DB.query(sql_query, bindings)
            .then(
                function(success){
                    var data = DB.fetchAll(success);
                    angular.forEach(data, function(line){
                        line.lignes = JSON.parse(line.lignes || "[]");
                    });
                    console.error(data);
                    deferred.resolve(data);
                }, 
                function(error){
                    deferred.resolve([]);
                });

            return deferred.promise;

        }

        function add(id){
            var deferred = $q.defer();
            var requests = [];
            sync(id).then(
                function(success){
                    var data = success.data;
                    var options = [];
                    angular.forEach(data, function(line){
                        options.push("(" + line.id + ", " + line.nomArticle + line.timestamp + line.whatever +")");
                    });
                    requests.push("INSERT INTO articles_concurrent (id_db, nomArticle, timestamp, whatever) VALUES "+options.join(", ")+";");
                }, 
                function(error){
                    //
                });
            deferred.resolve(requests)
        }

        function sync(id){
            var request = { method: "GET", url: "URL/{id}" };
            return $http(request);
        }
    })

    .factory("Parametrage", function($q, DB){
        return {
            set: set,
            get: get,
            server: server,
            updateSBD: updateSBD
        };

        

        function updateSBD(object) {
            var sql_query = "UPDATE parametres SET sbd_title = ?, sbd_url = ?, sbd_id = ?, sbd_new = ? ;";
            var bindings = [ object.sbd_title, object.sbd_url, object.sbd_id, object.sbd_new];
            return DB.query(sql_query, bindings).then(function(success){
                return success;
            }, function(error){
                return error;
            })
        }

        function server()
        {
            // the configuration object is saved under the profile
            // object inside profile !
            var profile = window.localStorage.getItem("profile");

            // setting a default one ( the one we use locally )
            var ip = "192.168.100.148:8082";
            var name = "COMUNIVERS";

            if(profile != null)
            {
                profile = JSON.parse(profile || "{}");
                // trying to avoid "undefined" exceptions
                // not a big fan of try - catch
                var parametrage = profile.parametrage || {};
                var server = parametrage.server || {};
                // the one setted or the default one
                ip = server.ip || ip;
                name = server.name || name;
                return { ip: ip, name: name };
            }
            else
            {
                // return the default one
                return { ip: ip, name: name };
            }
        }

        

        


        function get()
        {
            var sql_query = "SELECT * FROM parametres;";
            var deferred = $q.defer();
            DB.query(sql_query).
            then(
                function(success){
                    console.log(JSON.stringify(success));
                    var data = DB.fetch(success);
                    if( data == null )
                    {
                        deferred.resolve(
                            { server: { name : "", ip: ""}, 
                              printer: { name: "", mac: "" }, 
                              company: { name: "", id: 0 }, 
                              sbd: { sbd_title: "", sbd_url: "", sbd_id: 0, sbd_new: 0} 
                            });
                    }
                    else
                    {
                        deferred.resolve(
                            { 
                                server: { name : data.server_name, ip: data.server_address}, 
                                printer: { name: data.bluetooth_name, mac: data.bluetooth_address }, 
                                company: { name: data.society_name, id: data.society_tenant }, 
                                sbd: { sbd_title: data.sbd_title, sbd_url: data.sbd_url, sbd_id: data.sbd_id, sbd_new: data.sbd_new} 
                            });
                    }
                }, 
                function(error){
                    console.log(JSON.stringify(errors));
                    deferred.resolve(
                            { server: { name : "", ip: ""}, 
                              printer: { name: "", mac: "" }, 
                              company: { name: "", id: 0 }, 
                              sbd: { sbd_title: "", sbd_url: "", sbd_id: 0, sbd_new: 0} 
                            });               
                     });
            return deferred.promise;
        }

        /*{
            name: "parametres",
            columns: [
                {name: "id", value: "integer primary key autoincrement"},
                {name: "server_name", value: "text not null"},
                {name: "server_address", value: "text not null"},
                {name: "bluetooth_name", value: "text not null"},
                {name: "bluetooth_address", value: "text not null"},
                {name: "society_name", value: "text not null"},
                {name: "society_tenant", value: "integer not null"},
            ]
        },*/

        function set(object)
        {
            var deferred = $q.defer();

            var requests = ["DELETE FROM parametres;"];

            var request = "INSERT INTO parametres (server_name, server_address, bluetooth_name, bluetooth_address, society_name, society_tenant) VALUES ('" + object.server.name + "', '" + object.server.ip + "', '" + object.printer.name + "', '" + object.printer.mac + "', '" + object.company.name + "', " + object.company.id + ");";

            console.log(request);

            requests.push(request);

            angular.forEach(requests, function(sql_query){
                DB.query(sql_query)
                .then(
                    function(success){
                        console.log(success);
                        deferred.resolve("Paramètres ajoutés avec succès");
                    },
                    function(error){
                        console.log(error);
                        deferred.reject("Erreur lors du parametrage");
                    });
            });
            return deferred.promise;
        }
    })

    .factory("Chargement", function ($q, $http, $log, DB, DateUtilities) {

        return {

            getLastDetailedChargements: getLastDetailedChargements,

            searchForWaiting: searchForWaiting,

            add: add,

            employeeStock: employeeStock,

            syncInput: syncInput,

            syncOutput: syncOutput,

            dechargement: dechargement,

            addChargement: addChargement,

            deleteChargements: deleteChargements,

            addLignesChargements: addLignesChargements,

            convertLineObjectToOption: convertLineObjectToOption,

            convertLineObjectsToOptions: convertLineObjectsToOptions,

            clearNonSyncedDechargements: clearNonSyncedDechargements,

            convertApiLineObjectToOption: convertApiLineObjectToOption,

            convertApiLineObjectsToOptions: convertApiLineObjectsToOptions

        };


        function clearNonSyncedDechargements() {
            var deferred = $q.defer();
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            var vendeur_id = profile.id_db || 0;

            var queries = [];

            queries.push("DELETE FROM chargement_vendeur_lignes WHERE chargement_id IN (SELECT id FROM chargement_vendeur WHERE vendeur_id = " + vendeur_id + " AND state = 0 AND chargement = 0 AND dechargement = 1 AND societe = " + tenant_id + " AND activite = " + activite + ");");
            queries.push("DELETE FROM stock_update_history WHERE chargement_id IN (SELECT id FROM chargement_vendeur WHERE vendeur_id = " + vendeur_id + " AND state = 0 AND chargement = 0 AND dechargement = 1 AND societe = " + tenant_id + " AND activite = " + activite + ");");
            queries.push("DELETE FROM chargement_vendeur WHERE vendeur_id = " + vendeur_id + " AND state = 0 AND chargement = 0 AND dechargement = 1 AND societe = " + tenant_id + " AND activite = " + activite + ";");

            angular.forEach(queries, function (sql_query) {
                DB.query(sql_query).then(
                    function (success) {
                        deferred.resolve(success);
                    },
                    function (error) {
                        deferred.reject(error);
                    });
            });

            return deferred.promise;
        }

        function getLastDetailedChargements(vendeurId) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query = 'SELECT "[" || Group_Concat("{ ""id"" : " || A.id_db || ", ""code"": """ || A.code || """, ""designation"": """ || A.nomArticle || """, ""packet"": " || CVL.packet || ", ""unit"":  " || CVL.unit || ", ""input"": " || CVL.chargement || ", ""output"": " || CVL.dechargement || "}") || "]" as lignes, CV.id as chargement_id, CV.vendeur_id, CV.date from chargement_vendeur AS CV LEFT JOIN chargement_vendeur_lignes AS CVL ON CVL.chargement_id = CV.id LEFT JOIN articles AS A ON A.id_db = CVL.item_id AND A.societe = ' + tenant_id + ' AND A.activite = ' + activite + ' where vendeur_id = ? AND CV.state = 1 AND CV.reponse = 1 AND CV.chargement = 1 AND CV.dechargement = 0 AND CV.societe = ? AND CV.activite = ? ORDER BY CV.id DESC LIMIT 1;';
            var bindings = [vendeurId, tenant_id, activite];

            return DB.query(sql_query, bindings).then(
                function (success) {

                    if (success.rows.length > 0) {
                        console.debug(success);

                        var chargement = DB.fetch(success);

                        var object = {};

                        var output = [];

                        chargement.lignes = JSON.parse(chargement.lignes);

                        angular.forEach(chargement.lignes, function (ligne) {

                            var key = ligne.id;
                            var mockup = {
                                id: key,
                                packetIn: 0,
                                packetOut: 0,
                                unitIn: 0,
                                unitOut: 0,
                                designation: ligne.designation,
                                code: ligne.code
                            };

                            //VALIDES !
                            if (ligne.input = 1 && ligne.output == 0) {

                                if (typeof(object[key]) == "undefined") {
                                    object[key] = mockup;
                                }
                                //console.debug(object[key]);
                                object[key].packetIn = ligne.packet;
                                object[key].unitIn = ligne.unit;

                            }

                            //DEMANDES !
                            if (ligne.output == 1 && ligne.input == 0) {

                                if (typeof(object[key]) == "undefined") {
                                    object[key] = mockup;
                                }
                                //console.debug(object[key]);
                                object[key].packetOut = ligne.packet;
                                object[key].unitOut = ligne.unit;

                            }

                        });

                        //Transforming object to an array !
                        for (var key in object) {
                            output.push(object[key]);
                        }
                        console.debug(output)

                        return {output: output, chargement_id: chargement.chargement_id, date: chargement.date};
                    }
                    else {
                        return {output: [], chargement_id: 0, date: "--"};
                    }


                },
                function (error) {
                    return error;
                });
        }

        function searchForWaiting(vendeurId) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            return DB.query("SELECT * FROM chargement_vendeur WHERE vendeur_id = ? AND state = 1 AND reponse = 0 AND chargement = 1 AND dechargement = 0 AND societe = ? AND activite = ?;", [vendeurId, tenant_id, activite])
                .then(
                    function (success) {
                        console.debug(success);
                        return success
                    },
                    function (error) {
                        console.debug(error);
                        return error;
                    });
        }


        function deleteChargements(vendeurId, lignes) {
            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            return DB.query("DELETE FROM chargement_vendeur WHERE vendeur_id = " + profile.id_db + " AND state = 0 AND chargement = 1 AND dechargement = 0 AND societe = " + tenant_id+ " AND activite = " + activite + ";")
                .then(
                    function (success) {
                        deferred.resolve(addChargement(vendeurId, lignes, false));
                        return deferred.promise;
                    },
                    function (error) {
                        return error;
                    });
        }


        function addChargement(vendeurId, lignes, bo, dechargement) {
            var deferred = $q.defer();

            dechargement = typeof(dechargement) != "undefined" && dechargement == true;

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            bo = typeof(bo) != "undefined" && bo == true;

            if (typeof(lignes) != "undefined" && lignes.length > 0) {

                var date = DateUtilities.convertLongToYYYYMMDD(new Date());
                var sql_query;
                if (bo == true) {
                    sql_query = "INSERT INTO chargement_vendeur(vendeur_id, date, state, reponse, chargement, dechargement, societe, activite) VALUES (" + vendeurId + ", '" + date + "', 1, 1, 1, 0, " + tenant_id + ", " + activite + ");";
                }
                else {
                    if (dechargement) {
                        sql_query = "INSERT INTO chargement_vendeur(vendeur_id, date, state, reponse, chargement, dechargement, societe, activite) VALUES (" + vendeurId + ", '" + date + "', 0, 0, 0, 1, " + tenant_id + ",  " + activite + ");";
                    }
                    else {
                        sql_query = "INSERT INTO chargement_vendeur(vendeur_id, date, state, reponse, chargement, dechargement, societe, activite) VALUES (" + vendeurId + ", '" + date + "', 0, 0, 1, 0, " + tenant_id + ",  " + activite + ");";
                    }
                }
                DB.query(sql_query).then(
                    function (success) {
                        console.debug("OK");
                        console.debug(success);
                        deferred.resolve(addLignesChargements(success.insertId, lignes, bo, dechargement));
                    },
                    function (error) {
                        deferred.reject(error);
                    });
            }
            else {
                deferred.reject("EMPTY !");
            }
            return deferred.promise;
        }

        function stockUpdateHistory(chargement_id, total, chargement_vendeur_ligne_id, income) {
            var deferred = $q.defer();
            income = income == true ? 1 : 0;
            var sql_query = "INSERT INTO stock_update_history(chargement_id, chargement_ligne_id, total, income) VALUES(" + chargement_id + ", " + chargement_vendeur_ligne_id + ", " + total + ", " + income + ");";
            console.debug(sql_query);
            DB.query(sql_query).then(
                function (success) {
                    console.debug(success);
                    deferred.resolve(success);
                },
                function (error) {
                    console.debug(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function deleteChargements(vendeurId, lignes, dechargement) {
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0; 

            var dechargement = typeof(dechargement) != "undefined" && dechargement == true;

            var deferred = $q.defer();

            var sql_query;

            //OUT
            if (dechargement == true) {
                sql_query = "DELETE FROM chargement_vendeur WHERE vendeur_id = " + profile.id_db + " AND state = 0 AND dechargement = 1 AND chargement = 0 AND societe = " + tenant_id + " AND activite = " + activite + ";"
            }
            //IN
            else {
                sql_query = "DELETE FROM chargement_vendeur WHERE vendeur_id = " + profile.id_db + " AND state = 0 AND dechargement = 0 AND chargement = 1 AND societe = " + tenant_id + " AND activite = " + activite + ";"
            }

            DB.query(sql_query)
                .then(
                    function (success) {
                        console.debug("OK");
                        console.debug(success);
                        deferred.resolve(addChargement(vendeurId, lignes, false, dechargement));
                    },
                    function (error) {
                        deferred.reject(error);
                    });

            return deferred.promise;
        }

        function deleteStockUpdates(vendeurId, lignes, dechargement) {
            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var sql_query = "DELETE FROM stock_update_history WHERE chargement_id IN (SELECT id FROM chargement_vendeur WHERE vendeur_id = " + profile.id_db + " AND state = 0 AND dechargement = 1 AND chargement = 0)";

            DB.query(sql_query).then(
                function (success) {
                    console.debug(success);
                    deferred.resolve(deleteChargements(vendeurId, lignes, dechargement));
                },
                function (error) {
                    deferred.reject(error);
                })
            return deferred.promise;
        }

        function deleteLignesChargement(vendeurId, lignes, dechargement) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            dechargement = typeof(dechargement) != "undefined" && dechargement == true ? true : false;

            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var sql_query;

            if (dechargement == true) {
                sql_query = "DELETE FROM chargement_vendeur_lignes WHERE chargement_id IN (SELECT id FROM chargement_vendeur WHERE vendeur_id = " + profile.id_db + " AND state = 0 AND dechargement = 1 AND chargement = 0 AND societe = " + tenant_id + " AND activite = " + activite +" );";
            }
            else {
                sql_query = "DELETE FROM chargement_vendeur_lignes WHERE chargement_id IN (SELECT id FROM chargement_vendeur WHERE vendeur_id = " + profile.id_db + " AND state = 0 AND dechargement = 0 AND chargement = 1 AND societe = " + tenant_id + " AND activite = " + activite + ");";
            }

            DB.query(sql_query)
                .then(
                    function (success) {
                        console.debug("OK");
                        console.debug(success);
                        if (dechargement) {
                            console.debug(dechargement)
                            deferred.resolve(deleteStockUpdates(vendeurId, lignes, dechargement));
                        }
                        else {
                            console.debug(dechargement)
                            deferred.resolve(deleteChargements(vendeurId, lignes, dechargement));
                        }

                    },
                    function (error) {
                        return error;
                    });

            return deferred.promise;
        }

        function dechargement(vendeurId, lignes) {
            var deferred = $q.defer();
            deferred.resolve(deleteLignesChargement(vendeurId, lignes, true));
            return deferred.promise;
        }


        function updateStock(ligne, chargement_id, chargement_vendeur_ligne_id) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var total = (ligne.packet * ligne.unitConversion) + ligne.unit;

            var recovery = ligne.recovery - total;

            var sql_query = "UPDATE stock SET total = total + (" + recovery + ") WHERE item = " + ligne.id_db + " AND prelevement = 0 AND employee_id = " + profile.id_db + " AND societe = " + tenant_id + " AND activite = " + activite + ";";

            DB.query(sql_query)
                .then(
                    function (success) {
                        deferred.resolve(stockUpdateHistory(chargement_id, total, chargement_vendeur_ligne_id, true));
                    },
                    function (error) {
                        deferred.reject(error);
                    });

            return deferred.promise;
        }

        function addLignesChargements(chargement_id, lignes, bo, dechargement) {

            var deferred = $q.defer();
            var cart = JSON.parse(window.localStorage['cart'] || "{}");

            if (typeof lignes == "undefined" || !lignes.length > 0) {
                deferred.reject({message: "Aucune ligne à ajouter "});
                return deferred.promise;
            }

            var date = DateUtilities.convertLongToYYYYMMDD(new Date());

            angular.forEach(lignes, function (ligne) {

                var option = convertLineObjectToOption(ligne, chargement_id);

                DB.query("INSERT INTO chargement_vendeur_lignes(chargement_id, item_id, packet, unit, chargement, dechargement, timestamp) VALUES " + option + ";")
                    .then(
                        function (success) {
                            console.debug("LIGNES");
                            console.debug(success);
                            if (dechargement) {
                                if (typeof(success.insertId) != "undefined") {
                                    deferred.resolve(updateStock(ligne, chargement_id, success.insertId));
                                }
                                else {
                                    deferred.reject("Erreur");
                                }
                            }
                            else {
                                deferred.resolve(success)
                            }
                        },
                        function (error) {
                            console.debug(error);
                            deferred.reject("Erreur");
                        });

            });

            return deferred.promise;
        }

        function add(vendeurId, lignes) {
            var deferred = $q.defer();
            console.debug("ONE");
            deferred.resolve(deleteLignesChargement(vendeurId, lignes));
            return deferred.promise;
        }

        function syncInput(vendeurId, ip) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var deferred = $q.defer(vendeurId);
            var request = {
                url: "http://" + ip + "/newsales/rest/vendors/" + vendeurId + "/stocks",
                method: "GET"
            };

            return $http(request).then(
                function (success) {

                    if (typeof(success.data.content) != "undefined" && success.data.content != null) {
                        $log.debug(success.data.content);

                        if (typeof(success.data.content.stockArticleDto) != "undefined" && success.data.content.stockArticleDto != null && success.data.content.stockArticleDto.length > 0) {
                            var requests = [];
                            var lines = success.data.content.stockArticleDto;

                            if (lines.length > 0) {
                                lines = convertApiLineObjectsToOptions(lines, tenant_id, activite);
                                requests.push("DELETE FROM stock WHERE employee_id = " + vendeurId + " AND societe = " + tenant_id + " AND activite = " + activite + ";");
                                requests.push("INSERT INTO stock (item, packet, unit, employee_id, client_id, retour, prelevement, cause, date, total, societe, activite) VALUES " + lines.join(", ") + ";");
                                deferred.resolve(requests);
                                return deferred.promise;
                            }
                            else {
                                deferred.resolve([]);
                                return deferred.promise;
                            }

                        }
                        else {
                            deferred.resolve([]);
                            return deferred.promise;
                        }
                    }
                    else {
                        deferred.resolve([]);
                        return deferred.promise;
                    }
                },
                function (error) {
                    deferred.resolve([]);
                    return deferred.promise;
                });


        }

        function employeeStock(vendeurID, ip) {
            // "("+line.articleID+", "+line.stockPrincipal+", "+line.stockSecondaire+", "+id+", 0, 0, 0, '', '"+date+"', "+((line.stockPrincipal*line.unitConversion)+line.stockSecondaire)+")";
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            return DB.query("SELECT S.item as articleID, SUM(S.total/A.unitConversion) as stockPrincipal, SUM(S.total%A.unitConversion) as stockSecondaire FROM stock AS S JOIN articles AS A ON A.id_db = S.item AND A.societe = " + tenant_id + " AND A.activite = " + activite +" WHERE employee_id = " + vendeurID + " AND S.societe = " + tenant_id + " AND S.activite = " + activite + " AND S.retour = 0 AND S.prelevement = 0 AND (client_id = null OR client_id = 0) GROUP BY S.item;")
                .then(
                    function (success) {
                        //console.debug(success);
                        return DB.fetchAll(success);
                    },
                    function (error) {
                        console.debug(error);
                        return [];
                    });
        }

        function syncOutput(vendeurID, dechargement, ip) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            console.debug("HELLO !");

            var deferred = $q.defer();

            var dechargement = typeof(dechargement) != "undefined" && dechargement == true;

            var sql_query;
            if (!dechargement) {
                sql_query = "SELECT CVL.item_id as itemID, CVL.packet, CVL.unit as unite, CV.id as mobileFieldID FROM chargement_vendeur AS CV JOIN chargement_vendeur_lignes AS CVL ON CVL.chargement_id = CV.id WHERE CV.vendeur_id = " + vendeurID + " AND CV.state = 0 AND CV.chargement = 1 AND CV.dechargement = 0 AND CV.activite = " + activite + " AND CV.societe = " + tenant_id + ";";
            }
            else {
                sql_query = "SELECT CVL.item_id as itemID, CVL.packet, CVL.unit as unite, CV.id as mobileFieldID FROM chargement_vendeur AS CV JOIN chargement_vendeur_lignes AS CVL ON CVL.chargement_id = CV.id WHERE CV.vendeur_id = " + vendeurID + " AND CV.state = 0 AND CV.chargement = 0 AND CV.dechargement = 1 AND CV.activite = " + activite + " AND CV.societe = " + tenant_id + ";";
            }
            DB.query(sql_query).then(
                function (success) {

                    console.debug(success);

                    var demands = DB.fetchAll(success);


                    if (!demands.length > 0) {
                        deferred.resolve([]);
                        return deferred.promise;
                    }
                    else {
                        var mobileFieldID = demands[0].mobileFieldID;

                        var request = {
                            method: "POST",
                            data: {
                                mobileFieldID: mobileFieldID,
                                lcsDto: demands
                            }
                        };

                        if (!dechargement) {
                            request.url = "http://" + ip + "/newsales/rest/orders/" + vendeurID + "/add-commande";
                        }
                        else {
                            request.url = "http://" + ip + "/newsales/rest/orders/" + vendeurID + "/sendDechargementRequest";
                        }
                        console.debug(request);
                        //deferred.resolve([]);
                        $http(request).then(
                            function (success) {
                                deferred.resolve(["UPDATE chargement_vendeur SET state = 1 WHERE vendeur_id = " + vendeurID + " AND id = " + mobileFieldID + " AND activite = " + activite + " AND societe = " + tenant_id + ";"]);
                            },
                            function (error) {
                                deferred.resolve([]);
                            });
                    }
                },
                function (error) {
                    console.debug(error);
                    deferred.resolve([]);
                });
            return deferred.promise;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        function convertApiLineObjectToOption(line, id, date, tenant_id, activite) {
            return "(" + line.articleID + ", " + line.stockPrincipal + ", " + line.stockSecondaire + ", " + id + ", 0, 0, 0, '', '" + date + "', " + ((line.stockPrincipal * line.unitConversion) + line.stockSecondaire) + ", " + tenant_id+ ",  " + activite + ")";
        }

        function convertApiLineObjectsToOptions(lines, societe, activite) {
            var output = [];

            var profile = JSON.parse(window.localStorage['profile'] || "{}");

            var vendeurId = profile.id_db || 0;

            var date = DateUtilities.convertLongToYYYYMMDD(new Date());

            for (var i = 0, len = lines.length; i < len; i++) {
                var line = lines[i];
                output.push(convertApiLineObjectToOption(line, vendeurId, date, societe, activite));
            }
            return output;
        }


        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        function convertLineObjectToOption(line, chargement_id) {
            var profile = JSON.parse(window.localStorage['profile'] || "{}");
            var vendeurId = profile.id_db || 0;
            var timestamp = new Date().getTime();
            var date = DateUtilities.convertLongToYYYYMMDD(new Date());

            console.debug(line);

            return "(" + chargement_id + ", " + line.id_db + ", " + line.packet + ", " + line.unit + ", " + ( (line.flag == 1) ? 1 : 0 ) + ", " + ( (line.flag == 0) ? 1 : 0 ) + ", " + timestamp + ")";
        }


        function convertLineObjectsToOptions(lines, chargement_id) {
            prelevement = typeof(prelevement) != "undefined" && prelevement == true;

            retour = typeof(retour) != "undefined" && retour == true;

            var output = [];

            var ids = [];

            var date = DateUtilities.convertLongToYYYYMMDD(new Date());

            var profile = JSON.parse(window.localStorage['profile'] || "{}");

            var vendeurId = profile.id_db || 0;

            if (typeof(lines) != "undefined" && lines.length > 0) {
                for (var i = 0, len = lines.length; i < len; i++) {
                    var line = lines[i];

                    output.push(convertLineObjectToOption(line, chargement_id));
                }
                return output;
            }
            else {
                return [];
            }
        }

        function executeQueries(queries) {
            var deferred = $q.defer();

            for (var i = 0; i < queries.length; i++) {
                var sql_query = queries[i];

                DB.query(sql_query).then(
                    function (success) {
                        deferred.resolve(success);
                    },
                    function (error) {
                        deferred.reject(error);
                    });
            }

            return deferred.promise;
        }


    })

    .factory("DateUtilities", function () {

        return {
            convertLongToYYYYMMDD: convertLongToYYYYMMDD,
            convertLongToYYYYMMDDHHmmss: convertLongToYYYYMMDDHHmmss
        };

        function convertLongToYYYYMMDD(date) {
            var yyyy = (date.getFullYear()).toString();
            var mm = (date.getMonth() + 1).toString();
            var dd = (date.getDate()).toString();
            var date = yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
            return date;
        }

        function convertLongToYYYYMMDDHHmmss(longFormat) {
            if(longFormat <= 0) {
                return "Jamais visité";
            }

            var date = new Date(longFormat);

            var yyyy = (date.getFullYear()).toString();
            var mm = (date.getMonth() + 1).toString();
            var dd = (date.getDate()).toString();

            var MM = date.getMinutes().toString();
            var hh = date.getHours().toString();

            var date = "Le " + (dd[1] ? dd : "0" + dd[0]) + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + yyyy + " à " + (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]);
            
            return date;
        }
    })

    .factory("Quotas", function (DB, $q, DateUtilities, $http) {

        return {
            sync: sync,
            syncClients: syncClients
        };

        function syncClients(vendeurId, ip) {
            var deferred = $q.defer();

            var request = {
                url: "http://"+ip+"/newsales/rest/itemQuotas/getItemQuotasByClients/"+vendeurId,
                //url: "http://192.168.100.180:8082/newsales/rest/itemQuotas/getItemQuotasByClients/42",
                method: "GET"
            };


            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            $http(request).then(
                function (success) {
                    var requests = [];
                    var addons = [];
                    var subAddons = [];
                    var data = success.data;
                    
                    if(data.length > 0) {
                        for(var j = 0 ; j < data.length ; j++) {

                            var clientQuotasObject = data[j];
                            var clientId = clientQuotasObject.clientId || 0;
                            var quotas = clientQuotasObject.itemQuotasDTOList || [];

                            if (quotas.length > 0) {
                                for (var i = 0, len = quotas.length; i < len; i++) {
                                    var quota = quotas[i];
                                    quota.debut = DateUtilities.convertLongToYYYYMMDD(new Date(quota.debut));
                                    quota.fin = DateUtilities.convertLongToYYYYMMDD(new Date(quota.fin));
                                    addons.push(convertQuotaClientToAddon(quota, clientId, activite, tenant_id));
                                }
                                requests.push("DELETE FROM quota_client WHERE activite = " + activite + " AND societe = " + tenant_id + ";");

                                for( var i = 0 ; i < addons.length ; i+= 500 ) {
                                    subAddons.push( addons.slice( i, i+500 ) )
                                }

                                for( var i = 0 ; i < subAddons.length ; i++ ) {
                                    var subAddon = subAddons[i];
                                    requests.push("INSERT INTO quota_client(id, itemId, qty, value, debut, fin, client, activite, societe) VALUES " + subAddon.join(", ") + ";");
                                }
                                
                                deferred.resolve(requests);
                            } else {
                                deferred.resolve(["DELETE FROM quota_client WHERE activite = " + activite + " AND societe = " + tenant_id + ";"]);
                            }

                        }
                    } else {
                        deferred.resolve(["DELETE FROM quota_client WHERE activite = " + activite + " AND societe = " + tenant_id + ";"]);
                    }
                    
                },
                function (error) {
                    console.error(error);
                    deferred.resolve(["DELETE FROM quota_client WHERE activite = " + activite + " AND societe = " + tenant_id + ";"]);
                });

            return deferred.promise;

        }

        function convertQuotaClientToAddon(quota, clientId, activite, tenant_id) {
            return "(" + quota.id + ", " + ( quota.itemId || 0 ) + ", " + ( quota.total || 0) + ", " + ( quota.valeur || 0 ) + ", '" + quota.debut + "', '" + quota.fin + "', " + ( clientId || 0 )+ ", " + ( activite || 0 ) + ",  " + ( tenant_id || 0 ) + ")";
        }

        
        function sync(vendeurId, ip) {
            var deferred = $q.defer();

            var request = {
                url: "http://"+ip+"/newsales/rest/itemQuotas/getItemQuotasByEmp/"+vendeurId,
                method: "GET",
            };


            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            $http(request).then(
                function (success) {
                    var requests = [];
                    var addons = [];
                    var subAddons = [];
                    var quotas = success.data;
                    if (quotas.length > 0) {
                        for (var i = 0, len = quotas.length; i < len; i++) {
                            var quota = quotas[i];
                            quota.debut = DateUtilities.convertLongToYYYYMMDD(new Date(quota.debut));
                            quota.fin = DateUtilities.convertLongToYYYYMMDD(new Date(quota.fin));
                            addons.push(convertQuotaToAddon(quota, vendeurId, activite, tenant_id));
                        }
                        requests.push("DELETE FROM quota_vendeur WHERE vendeur = " + vendeurId + " AND activite = " + activite + " AND societe = " + tenant_id + ";");

                        for( var i = 0 ; i < addons.length ; i+= 500) {
                            subAddons.push( addons.slice( i, i+500 ) )
                        }

                        for( var i = 0 ; i < subAddons.length ; i++ ) {
                            var subAddon = subAddons[i];
                            requests.push("INSERT INTO quota_vendeur(id, itemId, qty, value, debut, fin, vendeur, activite, societe) VALUES " + subAddon.join(", ") + ";");
                        }

                        deferred.resolve(requests);
                    }
                    else {
                        deferred.resolve(["DELETE FROM quota_vendeur WHERE vendeur = " + vendeurId + " AND activite = " + activite + " AND societe = " + tenant_id + ";"]);
                    }
                },
                function (error) {
                    console.error(error);
                    deferred.resolve(["DELETE FROM quota_vendeur WHERE vendeur = " + vendeurId + " AND activite = " + activite + " AND societe = " + tenant_id + ";"]);
                });

            return deferred.promise;
        }

        function convertQuotaToAddon(quota, vendeurId, activite, tenant_id) {
            return "(" + quota.id + ", " + quota.itemId + ", " + quota.total + ", " + quota.valeur + ", '" + quota.debut + "', '" + quota.fin + "', " + vendeurId + ", " + ( activite || 0 ) + ",  " + ( tenant_id || 0 ) + ")";
        }

    })

    .factory("ModePaiement", function (DB, $q, $http) {
        return {
            getAll: getAll,
            sync: sync,
            addToDB: addToDB,
            escompte: escompte
        };

        function escompte(paymentMethod, date) {
            console.log(JSON.stringify(paymentMethod));

            var deferred = $q.defer();

            var finalDate = date.getTime() - new Date().getTime();

            // IF THE VALUE IS NEGATIVE WE SHOULD SET IT TO 0
            var days = finalDate <= 0 ? 0 : finalDate / (24 * 60 * 60 * 1000);


            if (paymentMethod.remises == null) {
                paymentMethod.remises = [];
            }
            else {
                paymentMethod.remises = JSON.parse(paymentMethod.remises || "[]");
            }

            if (typeof(paymentMethod.remises) != "undefined" && paymentMethod.remises != null && paymentMethod.remises.length > 0) {
                for (var i = 0; i < paymentMethod.remises.length; i++) {
                    var remise = paymentMethod.remises[i];
                    if (days >= remise.min && days < remise.max) {
                        deferred.resolve(remise.remise);
                        return deferred.promise;
                    }
                }
            }
            else {
                deferred.resolve(0.7);
                return deferred.promise;
            }
            deferred.resolve(0);
            return deferred.promise;
        }

        function getAll(client_id, tenant_id, activite) {
            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query = 'select MP.*, "[" || GROUP_CONCAT("{ ""id"" :" || RMP.id_db || ", ""name"" :""" || RMP.name || """, ""min"" : " || RMP.minPeriod ||", ""max"" : " || RMP.maxPeriod || ", ""remise"" : " || RMP.pourcentage || "}") || "]" as remises from mode_paiements as MP LEFT JOIN remise_mode_paiement as RMP ON RMP.id_mode_paiement = MP.id_db WHERE MP.activite = ' + activite + ' AND MP.societe = ' + tenant_id + ' AND MP.id_db IN (SELECT mode_id FROM client_mode_paiements WHERE client_id = ' + client_id + ' AND societe = ' + tenant_id + ' AND activite = ' + activite + ') GROUP BY MP.id;';
            
            DB.query(sql_query).then(
                function (success) {
                    console.log(success);
                    deferred.resolve(DB.fetchAll(success));
                },
                function (error) {
                    deferred.resolve([]);
                });
            return deferred.promise;
        }

        function addToDB(vendeurId, ip) {
            var deferred = $q.defer();
            sync(ip).then(
                function (success) {
                    modePaiementObjectToRequestOption(success).then(
                        function (requests) {
                            deferred.resolve(requests);
                        });
                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function modePaiementObjectToRequestOption(modePaiements) {
            var deferred = $q.defer();
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            var requests = [];
            requests.push("DELETE FROM mode_paiements WHERE activite = " + activite + " AND societe = " + tenant_id + ";");
            requests.push("DELETE FROM remise_mode_paiement WHERE activite = " + activite + " AND societe = " + tenant_id + ";");
            var parametersModePaiement = [], parametersRemiseModePaiement = [];
            for (var i = 0; i < modePaiements.length; i++) {
                var modePaiement = modePaiements[i];
                parametersModePaiement.push("(" + modePaiement.id + ", '" + modePaiement.name + "', '" + modePaiement.description + "', " + tenant_id + ", " + activite + ")");
                parametersRemiseModePaiement = parametersRemiseModePaiement.concat(modePaiementRemiseObjectToRequestOption(modePaiement.id, modePaiement.echeance, tenant_id, activite));
            }
            if (parametersModePaiement.length > 0);
            {
                requests.push("INSERT INTO mode_paiements (id_db, name, description, societe, activite) VALUES " + parametersModePaiement.join(", ") + ";");
            }
            if (parametersRemiseModePaiement.length > 0) {
                requests.push("INSERT INTO remise_mode_paiement (id_db, id_mode_paiement, name, pourcentage, minPeriod, maxPeriod, societe, activite) VALUES " + parametersRemiseModePaiement.join(", ") + ";");
            }
            deferred.resolve(requests);
            return deferred.promise;
        }

        function modePaiementRemiseObjectToRequestOption(id, remiseModePaiements, tenant_id, activite) {
            var output = [];
            angular.forEach(remiseModePaiements, function (remiseModePaiement) {

            });
            for (var i = 0; i < remiseModePaiements.length; i++) {
                var remiseModePaiement = remiseModePaiements[i];
                output.push("(" + remiseModePaiement.id + ", " + id + ", '" + remiseModePaiement.name + "', " + remiseModePaiement.percentage + ", " + remiseModePaiement.minperiod + ", " + remiseModePaiement.maxPeriod + ", " + tenant_id + ", " + activite+ ")");
            }
            return output;
        }

        function sync(ip) {
            var deferred = $q.defer();
            var request = {
                method: "GET",
                url: "http://197.230.28.154:81/newsales/rest/payements",
                timeout: 1000
            };
            $http.get("http://"+ip+"/newsales/rest/payements").then(
                function (success) {
                    deferred.resolve(success.data);
                },
                function (error) {
                    deferred.resolve([]);
                });
            return deferred.promise;
        }
    })

    .factory("SynchronisationV2", function (DB, $q, $http, $log, EchangeService, Charaka, Parametrage, StockConcurrent, Retours, DateUtilities, Retours, Chargement, PlanTarifaire, UpdateFactory, Quotas, Surveys, Promotions, StockLivreur, Missions, Clients, Routes, CallSteps, ModePaiement, SBD, BrandFive,Timbre) {

        return {
            // PRIVATE TO VENDEUR
            syncV2: syncV2,
            gatherSyncData: gatherSyncData,
            gatherSyncOutputData: gatherSyncOutputData,
            syncCommandes: syncCommandes,
            // PRIVATE TO LIVREUR
            syncV2Livreur: syncV2Livreur,
            gatherSyncDataLivreur: gatherSyncDataLivreur,
            gatherSyncOutputDataLivreur: gatherSyncOutputDataLivreur,
            syncV2LivreurAll: syncV2LivreurAll,
            livreurSync: livreurSync,
            syncCommandesLivreur: syncCommandesLivreur,
            processData: processData,
            countDB:countDB

        };
         function buildQuery(list){
            var query= list.reduce(function(result,item){
                result+="(select count(*) from "+item.tableName+" ) as "+item.tableName+"Count ,"
                return result;
            },"");
            return "select "+query.substr(0,query.length-1);
        }
        function countDB(list){

              var deferred = $q.defer();

              var sql_query=buildQuery(list);;
              DB.query(sql_query).then(
                    function (success) {
                        var result=DB.fetchAll(success);
                        console.log(result);
                        deferred.resolve(result);
                    },
                    function (error) {
                        deferred.resolve([]);
                    });
              return deferred.promise;

        }


        function maxOfEachLivreur() {
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var id = profile.id_db || 0;
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query = "SELECT ifnull((SELECT timestamp FROM marque WHERE activite = " + activite + " AND societe = " + tenant_id + " ORDER BY timestamp DESC LIMIT 1), 0) as max_marque, ifnull((SELECT timestamp FROM articles WHERE activite = " + activite + " AND societe = " + tenant_id + " ORDER BY timestamp DESC LIMIT 1), 0) as max_articles, ifnull((SELECT m.timestamp FROM missions AS m WHERE activite = " + activite + " AND societe = " + tenant_id + " AND livreur = " + id + " ORDER BY m.timestamp DESC LIMIT 1),0) AS max_missions, ifnull((SELECT c.timestamp FROM clients c WHERE activite = " + activite + " AND societe = " + tenant_id + " ORDER BY c.timestamp DESC LIMIT 1),0) AS max_clients;";
            return DB.query(sql_query).then(
                function (success) {
                    return DB.fetch(success);
                },
                function (error) {
                    return error;
                });
        }

        function addCommandeToSynchDetails(synchDetails, promise) {
            return promise.then(function(commandes){
                    synchDetails.commandes = commandes;
                    return synchDetails;
            });
        }

        function gatherSyncDataLivreur(idLivreur, ip) {

            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var infos = JSON.parse(window.localStorage["profile"] || "{}");
            DB.query("DELETE FROM clients WHERE activite = " + activite + " AND societe = " + tenant_id + ";").then(
                function (success) {
                    maxOfEachLivreur().then(
                        function (max) {
                            
                            var data;
                            if (max == null) {
                                data = {
                                    maxItem: 0,
                                    maxClient: 0,
                                    maxMission: 0,
                                    maxMarque: 0
                                }
                            }
                            else {
                                data = {
                                    maxItem: max.max_articles || 0,
                                    maxClient: max.max_clients || 0,
                                    maxMission: max.max_missions || 0,
                                    maxMarque: max.max_marque || 0
                                }
                            }

                            var synchDetails = {};

                            synchDetails.factureIncrement = infos.factureIncrement || 0;

                            syncCommandes(idLivreur, true).then(
                                function(commandes){
                                    synchDetails.commandes = commandes;
                                    Chargement.employeeStock(idLivreur)
                                    .then(function (input) {
                                        if (input.length > 0) {

                                            synchDetails.stocks = input;
                                            
                                        }
                                        else {
                                            synchDetails.stocks = [];
                                        }

                                        data.synchDetails = synchDetails;

                                        var request = {
                                            data: data,
                                            url: "http://" + ip + "/newsales/rest/livreurs/" + idLivreur + "/sync/missions",
                                            method: "POST"
                                        };

                                        $http(request).then(
                                            function (success) {
                                                deferred.resolve(success.data);
                                            },
                                            function (error) {
                                                deferred.reject(error);
                                            });


                                    });
                                });
                            

                            

                        },
                        function (error) {
                            deferred.reject(error);
                        });
                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function gatherSyncOutputDataLivreur() {

        }

        function syncV2LivreurAll(idLivreur, ip) {
            var one = syncV2Livreur(idLivreur, ip);
            var promotions = Promotions.syncPromotions(idLivreur, ip);
            var sbds = SBD.syncSBDFromAPI(idLivreur, ip);
            var stock = StockLivreur.sync(idLivreur, ip);
            var output = syncCommandes(idLivreur, true);
            var dechargementOutput = Chargement.syncOutput(idLivreur, true, ip);
            var methodePaiements = ModePaiement.addToDB(idLivreur, ip);
            return $q.all(new Array(one, promotions, sbds, stock, output, dechargementOutput, methodePaiements));
        }

        function livreurSync(idLivreur, ip) {
            var deferred = $q.defer();
            var requests = [];
            syncV2LivreurAll(idLivreur, ip).then(
                function (success) {

                    console.log(JSON.stringify(success));

                    requests = requests.concat(success[5]);
                    requests = requests.concat(success[6]);

                    if (requests.length > 0) {
                        angular.forEach(requests, function (request) {
                            DB.query(request)
                                .then(
                                    function (success) {
                                        console.log(success);
                                    },
                                    function (error) {
                                        console.log(error);
                                    });
                        });

                        deferred.resolve(success);

                    }
                    else {
                        deferred.resolve(success);
                    }

                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function syncV2Livreur(idLivreur, ip) {
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            var deferred = $q.defer();
            var requests = [];
            var idLivreur = idLivreur;
            gatherSyncDataLivreur(idLivreur, ip).then(
                function (success) {
                    console.log(success);

                    if(typeof(success.ids) != "undefined" && success.ids != null) {
                        var ids = success.ids;
                        requests.push("UPDATE missions SET synced = 1 WHERE id_db IN (" + ids.join(", ") + " ) AND livreur = " + idLivreur + " AND societe = " + tenant_id + " AND activite = " + activite + ";");
                    }

                    if (typeof(success.synchDetails) != "undefined" && success.synchDetails != null) {
                        var syncDetails = success.synchDetails;

                        if (typeof(syncDetails.stocks) != "undefined" && syncDetails.stocks != null && syncDetails.stocks.length > 0) {
                            var lines = syncDetails.stocks;
                            lines = Chargement.convertApiLineObjectsToOptions(lines, tenant_id, activite);
                            requests.push("DELETE FROM stock WHERE employee_id = " + idLivreur + " AND societe = " + tenant_id + " AND activite = " + activite + ";");
                            requests.push("INSERT INTO stock (item, packet, unit, employee_id, client_id, retour, prelevement, cause, date, total, societe, activite) VALUES " + lines.join(", ") + ";");
                        }


                        if (typeof(syncDetails.factureIncrement) != "undefined" && syncDetails.factureIncrement != null) {
                            requests.push("UPDATE accounts SET factureIncrement = " + syncDetails.factureIncrement + " WHERE id_db = " + idLivreur + " AND societe = " + tenant_id + " AND activite = " + activite + ";");
                            profile.factureIncrement = syncDetails.factureIncrement || 1;
                            window.localStorage["profile"] = JSON.stringify(profile);
                        }


                        if (typeof(syncDetails.chargements) != "undefined" && syncDetails.chargements != null && syncDetails.chargements.length > 0) {
                            angular.forEach(syncDetails.chargements, function (chargement) {

                                // THIS IS B.O CHARGEMENT !
                                if (chargement.mobileFieldID == 0) {
                                    var lignes = [];

                                    angular.forEach(chargement.ligneDetails, function (ligne) {
                                        var object = {
                                            id_db: ligne.articleID,
                                            packet: ligne.packet,
                                            unit: ligne.unite,
                                            flag: ligne.flag
                                        };
                                        lignes.push(object);
                                    });

                                    deferred.resolve(Chargement.addChargement(idLivreur , lignes, true, false));
                                }
                                // SEND FROM THE MOBILE !
                                else {
                                    requests.push("DELETE FROM chargement_vendeur WHERE id != " + chargement.mobileFieldID + " AND chargement = 1 AND dechargement = 0 AND activite = " + activite + " AND societe = " + tenant_id + ";");

                                    requests.push("UPDATE chargement_vendeur SET reponse = 1 WHERE id = " + chargement.mobileFieldID + " AND vendeur_id = " + idLivreur + " AND activite = " + activite + " AND societe = " + tenant_id + ";");

                                    requests.push("DELETE FROM chargement_vendeur_lignes WHERE chargement_id = " + chargement.mobileFieldID + ";");

                                    angular.forEach(chargement.ligneDetails, function (ligne) {
                                        // DECHARGEMENT - CHARGEMENT
                                        // VEULENT DIRE input - output
                                        // INPUT : saisie de la part du vendeur !
                                        // OUTPUT : validé de la part du magasinier !
                                        requests.push("INSERT INTO chargement_vendeur_lignes(chargement_id, item_id, packet, unit, chargement, dechargement, timestamp) VALUES (" + chargement.mobileFieldID + ", " + ligne.articleID + ", " + ligne.packet + ", " + ligne.unite + ", " + ( (ligne.flag == 1) ? 1 : 0) + ", " + ( (ligne.flag == 0) ? 1 : 0) + ", " + chargement.chargementDate + ");");
                                    });

                                }

                            });
                        }


                        if (typeof(syncDetails.dechargements) != "undefined" && syncDetails.dechargements != null && syncDetails.dechargements.length > 0) {
                            angular.forEach(syncDetails.dechargements, function (dechargement) {



                                // THIS IS B.O CHARGEMENT !
                                //if()
                                if (dechargement.mobileFieldID == 0) {
                                    var lignes = [];

                                    angular.forEach(dechargement.ligneDetails, function (ligne) {
                                        var object = {
                                            id_db: ligne.articleID,
                                            packet: ligne.packet,
                                            unit: ligne.unite,
                                            flag: ligne.flag
                                        };
                                        lignes.push(object);
                                    });

                                    deferred.resolve(Chargement.addChargement(vendeurId, lignes, false, true));
                                }
                                // SEND FROM THE MOBILE !
                                else {
                                    requests.push("DELETE FROM chargement_vendeur WHERE id != " + dechargement.mobileFieldID + " AND chargement = 0 AND dechargement = 1 AND activite = " + activite + " AND societe = " + tenant_id + ";");

                                    requests.push("UPDATE chargement_vendeur SET reponse = 1 WHERE id = " + dechargement.mobileFieldID + " AND vendeur_id = " + idLivreur + " AND chargement = 0 AND dechargement = 1 AND societe = " + tenant_id + " AND activite = " + activite + ";");

                                    requests.push("DELETE FROM chargement_vendeur_lignes WHERE chargement_id = " + dechargement.mobileFieldID + ";");

                                    angular.forEach(dechargement.ligneDetails, function (ligne) {
                                        // DECHARGEMENT - CHARGEMENT
                                        // VEULENT DIRE input - output
                                        // INPUT : saisie de la part du vendeur !
                                        // OUTPUT : validé de la part du magasinier !
                                        requests.push("INSERT INTO chargement_vendeur_lignes(chargement_id, item_id, packet, unit, chargement, dechargement, timestamp) VALUES (" + dechargement.mobileFieldID + ", " + ligne.articleID + ", " + ligne.packet + ", " + ligne.unite + ", " + ( (ligne.flag == 1) ? 1 : 0) + ", " + ( (ligne.flag == 0) ? 1 : 0) + ", " + dechargement.chargementDate + ");");
                                    });

                                }

                            });
                        }
                    }
                    else
                    {
                        requests.push("UPDATE accounts SET factureIncrement = 1 WHERE id_db = " + idLivreur + " AND activite = " + activite + " AND societe = " + tenant_id + ";");
                        profile.factureIncrement = 1;
                        window.localStorage["profile"] = JSON.stringify(profile || {});
                    }
                    var commandes = [];

                    var missions = success.missions;
                    var clients = success.clients;
                    var articles = success.articles;
                    var marques = success.marques;

                    if (typeof(marques) != "undefined" && marques != null && marques.length > 0) {
                        var marqueIds = [];
                        //var marques = success.data.marques;
                        var addonsMarques = [];
                        for (var i = 0; i < marques.length; i++) {
                            var marque = marques[i];
                            var id = marque.id || 0;
                            marqueIds.push(id);
                            marque.timestamp = marque.timesStamp || 0;
                            addonsMarques.push(convertMarqueObjectToRequestOption(marque));
                        }
                        requests.push("DELETE FROM marque WHERE id_db IN ( " + marqueIds.join(", ") + ") AND activite = " + activite + " AND societe = " + tenant_id + ";");
                        requests.push("INSERT INTO marque(id_db, marqueArticle, logo, activite, societe, timestamp, activated) VALUES " + addonsMarques.join(", ") + ";");
                    }
                    var missionsIds = [];
                    var commandesIds = [];
                    if (typeof(missions) != "undefined" && missions != null && missions.length > 0) {
                        for (var i = 0; i < missions.length; i++) {
                            var mission = missions[i];

                            missionsIds.push(mission.id);

                            var commande = mission.commande;

                            commandesIds.push(commande.numero);

                            var lignes = commande.lignes || [];

                            var objectCommande = {
                                mission: mission.id,
                                timeStamp: mission.timestamp,
                                client: mission.client,
                                route: mission.route,
                                commande: commande.numero,
                                lignes: lignes
                            };

                            commandes.push(objectCommande);
                        }
                    }


                    if (missionsIds.length > 0) {
                        // TRYING TO DELETE MISSIONS WITH ALL THE DEPENDENCIES !!
                        requests.push("DELETE FROM missions WHERE id_db IN ( " + missionsIds.join(", ") + " ) AND activite = " + activite + " AND societe = " + tenant_id + " AND livreur = " + idLivreur + ";");
                        
                        //requests = requests.concat(UpdateFactory.deleteThem("missions", "id_db", missionsIds, {state: 1}, {commandes: "id_mission"}));
                    }
                    if (commandesIds.length > 0) {

                        requests.push("DELETE FROM commandes WHERE id_db IN ( " + commandesIds.join(", ") + " ); " )
                        requests.push("DELETE FROM lignesCommandes WHERE id_commande IN ( " + commandesIds.join(", ") + " ); ");
                        //requests = requests.concat(UpdateFactory.deleteThem("ligneCommandes", "id_commande", commandesIds));
                    }
                    //console.log(requests);
                    //console.log(commandes);


                    var addonsMissionsLivreur = [], addonsClients = [], addonsArticles = [], addonsCommandesLivreur = [], addonsLigneCommandeLivreur = [];
                    if (typeof(commandes) != "undefined" && commandes != null && commandes.length > 0) {
                        if (commandes.length > 500) {
                            var array_output = [];
                            var max = 500;
                            for (var i = 0; i < commandes.length; i += max) {
                                array_output.push(commandes.slice(i, i + max));
                            }
                            console.log(array_output);
                            for (var i = 0; i < array_output.length; i++) {
                                var missions = array_output[i];
                                for (var j = 0; j < missions.length; j++) {
                                    addonsMissionsLivreur.push(convertMissionObjectToRequestOptionLivreur(missions[j], idLivreur, tenant_id, activite));
                                    addonsCommandesLivreur.push(convertCommandeObjectToRequestOptionLivreur(missions[j]));
                                    for (var k = 0; k < missions[j].lignes.length; k++) {
                                        addonsLigneCommandeLivreur.push(convertLgneCommandeObjectToRequestOptionLivreur(missions[j].lignes[k], commandes[i].commande));
                                    }
                                    requests.push("INSERT INTO ligneCommandes(id_ligne, id_commande, id_article, unit, packet, pu_ht, isGift, remise) VALUES " + addonsLigneCommandeLivreur.join(", ") + ";");

                                }
                                

                                requests.push("INSERT INTO missions(id_db, code_mission, client_id, state, synced, livreur, finished, commande_id, timestamp, date_start, societe, activite) VALUES " + addonsMissionsLivreur.join(", ") + ";");
                                

                                
                                requests.push("INSERT INTO commandes(id_db, code_commande, id_mission, id_client) VALUES " + addonsCommandesLivreur.join(", "));
                                addonsMissionsLivreur = [];
                            }
                            //console.log(requests)
                        }

                        else {
                            for (var i = 0; i < commandes.length; i++) {
                                addonsMissionsLivreur.push(convertMissionObjectToRequestOptionLivreur(commandes[i], idLivreur, tenant_id, activite));
                                addonsCommandesLivreur.push(convertCommandeObjectToRequestOptionLivreur(commandes[i]));
                                for (var j = 0; j < commandes[i].lignes.length; j++) {
                                    addonsLigneCommandeLivreur.push(convertLgneCommandeObjectToRequestOptionLivreur(commandes[i].lignes[j], commandes[i].commande));
                                }
                                requests.push("INSERT INTO ligneCommandes(id_commande, id_article, unit, packet, pu_ht, isGift, remise) VALUES " + addonsLigneCommandeLivreur.join(", ") + ";");
                                addonsLigneCommandeLivreur = [];

                            }
                            var final_request = "INSERT INTO missions(id_db, code_mission, client_id, state, synced, livreur, finished, commande_id, timestamp, date_start, societe, activite) VALUES " + addonsMissionsLivreur.join(", ") + ";";
                            requests.push(final_request);
                            requests.push("INSERT INTO commandes(id_db, code_commande, id_mission, id_client) VALUES " + addonsCommandesLivreur.join(", ") + ";");

                        }
                    }
                    /////////////////////////////////////////////////////////////////////
                    //////////////////////////ARTICLES///////////////////////////////////
                    if (typeof(articles) != "undefined" && articles != null && articles.length > 0) {
                        var articleIds = [];
                        if (articles.length < 500) {
                            for (var i = 0; i < articles.length; i++) {
                                articleIds.push(articles[i].id);
                                addonsArticles.push(convertArticleObjectToRequestOption(articles[i]));
                            }
                            requests .push("DELETE FROM articles WHERE id_db IN (" + articleIds.join(", ") + ") AND societe = " + tenant_id + " AND activite = " + activite + ";");
                            requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion, timestamp, activite, societe) VALUES " + addonsArticles.join(", ") + ";");

                        }
                        else {
                            var max = 500;
                            var array_articles_output = [];
                            for (var i = 0; i < articles.length; i += max) {
                                array_articles_output.push(articles.slice(i, i + max));
                            }
                            for (var i = 0; i < array_articles_output.length; i++) {
                                var articles_group = array_articles_output[i];
                                for (var j = 0; j < articles_group.length; j++) {
                                    articleIds.push(articles_group[j].id);
                                    addonsArticles.push(convertArticleObjectToRequestOption(articles_group[j]));
                                }
                                requests .push("DELETE FROM articles WHERE id_db IN (" + articleIds.join(", ") + ") AND societe = " + tenant_id + " AND activite = " + activite + ";");
                                requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion, timestamp, activite, societe) VALUES " + addonsArticles.join(", ") + ";");
                                articleIds = [];
                                addonsArticles = [];
                            }
                        }
                    }
                    /////////////////////////////////////////////////////////////////////////
                    ////////////////////////CLIENTS//////////////////////////////////////////
                    //console.log(clients);
                    if (typeof(clients) != "undefined" && clients != null && clients.length > 0) {
                        var subRequests = [];
                        var clientsIds = [];
                        var addonsModePaiement = [];

                        for (var i = 0; i < clients.length; i++) {

                            var clientId = clients[i].id;

                            clientsIds.push(clientId);

                            addonsClients.push(convertClientObjectToRequestOption(clients[i], tenant_id, activite));

                            var paymentModes = clients[i].payementModeIDs || [];

                            var optionsModes = [];

                            angular.forEach(paymentModes, function(paymentMode){
                                optionsModes.push("(" +clientId+", "+paymentMode+", " + tenant_id + ", " + activite +")");
                            });

                            addonsModePaiement = addonsModePaiement.concat(optionsModes);
                        }

                        


                        requests.push("DELETE FROM client_mode_paiements WHERE client_id IN ( SELECT id_db FROM clients WHERE id_db IN (" + clientsIds.join(", ") + ") AND societe = " + tenant_id + " AND activite = " + activite + ");");

                        requests.push("DELETE FROM clients WHERE id_db IN (" + clientsIds.join(", ") + ") AND activite = " + activite + " AND societe = " + tenant_id + ";")

                        var finalModePaiementsGroups = [];

                        var max = 500;

                        for (var i = 0 ; i < addonsModePaiement.length ; i+=max) {
                            finalModePaiementsGroups.push(addonsModePaiement.slice(i, max));
                        }

                        for(var i = 0 ; i < finalModePaiementsGroups.length ; i++) {
                            var addonsGroup = finalModePaiementsGroups[i];
                            requests.push("INSERT INTO client_mode_paiements (client_id, mode_id, societe, activite ) VALUES " + addonsGroup.join(", ")  + ";");
                        }

                        requests = requests.concat(subRequests);
                        var listeOfItems=getListOfFiveHundredOrLessLists(addonsClients,[],500);
                        listeOfItems.forEach(function(item){

                            requests.push("INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email, golden_store, route, timestamp, return_id, retour_debut, retour_fin, type, channel, depot, societe , activite, classe) VALUES" + item.join(", ") + ";");

                        });
                        console.log(requests);
                    }
                    if (requests != null && requests.length > 0) {
                        for (var i = 0; i < requests.length; i++) {
                            console.log(requests[i]);
                            deferred.resolve(requests[i]);
                            DB.query(requests[i]).then(
                                function (success) {
                                    console.log(success);
                                    deferred.resolve(success);
                                },
                                function (error) {
                                    console.log(error);
                                    deferred.reject(error);
                                });
                        }
                    }
                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
        function getListOfFiveHundredOrLessLists(items,listOfItems,chunck){
            if(chunck  < 500){
                listOfItems.push(getListFromItems(items,listOfItems.length,chunck));
                return listOfItems;
            }
            listOfItems.push(getListFromItems(items,listOfItems.length,500));
            var newChunck=items.length-lengthsSum(listOfItems);
            return getListOfFiveHundredOrLessLists(items,listOfItems,newChunck);
        }
        function getListFromItems(items,currentSize,size){
            var list=[];
            list = items.slice(currentSize, size);
            return list;
        }
        function lengthsSum(listOfItems){
            var lenghts= listOfItems.reduce(function(result,item){
                result+=item.length;
                return result;
            },0);
            return lenghts;
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

        function convertLgneCommandeObjectToRequestOptionLivreur(ligne, commandeId) {
            return '(' + commandeId + ', ' + ligne.item + ', ' + ligne.unit + ', ' + ligne.packet + ', ' + 0 + ', ' + (ligne.gift == true ? 1 : 0) + ', ' + 0 + ')';
        }

        function convertCommandeObjectToRequestOptionLivreur(mission) {
            console.log(mission);
            return '(' + mission.commande + ', "CM748536" , ' + mission.mission + ', ' + mission.client + ')';
        }


        function convertMissionObjectToRequestOptionLivreur(mission, idLivreur, tenant_id, activite) {
            //"INSERT INTO missions_livreur(id_db, code_mission, client_id, state, synced, livreur, finished) values(?,?,?,?,?,?,?)"
            return '(' + mission.mission + ',"CM447489" , ' + mission.client + ', ' + 0 + ', ' + 0 + ', ' + idLivreur + ', ' + 0 + ', ' + mission.commande + ', ' + mission.timeStamp + ', "' + mission.date + '", ' + tenant_id + ', ' + activite + ')';
        }


        function convertMissionObjectToRequestOption(mission, tenant_id, activite) {
            return "(" + mission.id + ", '" + mission.codeMission + "', " + mission.client + ", " + mission.route + ", '" + mission.date + "', 0, 0, " + mission.timestamp + ", " + tenant_id + ", " + activite +")";
        }

        function convertClientObjectToRequestOption(client, societe, activite) {
            console.debug(client)
            var date_debut = (client.retourDebut == null || client.retourDebut == 0) ? "2999-12-01" : DateUtilities.convertLongToYYYYMMDD(new Date(client.retourDebut));
            var date_fin = (client.retourDebut == null || client.retourDebut == 0) ? "2999-12-31" : DateUtilities.convertLongToYYYYMMDD(new Date(client.retourFin));
            client.nom = client.nom || "";
            client.prenom = client.prenom || "";

            client.nom = client.nom.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            client.prenom = client.nom.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');


            return "(" + client.id + ", '" + client.codeClient + "', '" + client.address + "', " + ( (client.latitude == null) ? null : client.latitude.replace(/,/g, ".")) + ", " + ((client.longitude == null) ? null : client.longitude.replace(/,/g, ".")) + ", '" + client.nom + "', '" + client.prenom + "', '" + client.email + "', " + client.goldenPoints + ", " + client.route + ", " + client.timestamp + ", " + (client.retourId != null ? client.retourId : 0) + ", '" + date_debut + "', '" + date_fin + "', "+( client.clientType || 0 )+", "+( client.channel || 0 )+", "+( client.depotID || 0)+", " + societe + ", " + activite + ", " + ( client.clientClasseID || 0 ) + ")";
        }

        function convertRouteObjectToRequestOption(route, vendeurId, tenant_id, activite) {
            return "(" + route.id + ", '" + route.codeRoute + "', '" + route.nomRoute + "', " + 0 + ", " + vendeurId + ", " + route.timestamp + ", " + tenant_id + ", " + activite + ")";
        }

        function convertArticleObjectToRequestOption(article) {
            var profile = window.localStorage.getItem("profile");
            profile = JSON.parse(profile || "{}");
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            var activite = 0;
            if(profile != null)
            {
                activite = profile.activite || activite;
            }
            return "(" + article.id + ", '" + article.code + "', '" + article.shortDescription.replace(/[']/g, "") + "', " + article.prixVente + ", " + article.tva + ", '" + article.conditioningUnitFirst + "', '" + article.conditioningUnitSecond + "', " + article.marque + ", " + article.marque + ", " + article.unitConversion + ", " + article.timestamp + ", " + activite + ", " + tenant_id + ")";
        }

        function convertMarqueObjectToRequestOption(marque) {
            var activite = 0;
            var profile = window.localStorage.getItem("profile");
            profile = JSON.parse(profile || "{}");
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            if(profile != null)
            {
                activite = profile.activite || activite;
            }
            var activated = marque.active ? 1 : 0;
            return "(" + marque.id + ", '" + marque.name + "', '" + marque.logo + "', " + activite + ", " + tenant_id + ", " +  marque.timestamp + ", " + activated + ")";
        }

        function sendCommandeToAPI(commandes) {
            var commandesToAPI = [];
            for (var i = 0; i < commandes.length; i++) {
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

        function syncCommandesLivreur(idLivreur, ip) {
            var deferred = $q.defer();
            var sql_query = 'SELECT C.increment as factureIncrement, C.totalTTC as totalFactured, C.totalHT as totalFacturedHT, 0 as timbreFactured, C.totalEscompteDiscount as escompteValue, ifnull(M.entryDate, 0) as entryDate, ifnull(M.exitDate, 0) as exitDate, ifnull(M.latitude, 0) as lattitude, ifnull(M.longitude, 0) as longitude, 0 as totalRemiseFactured, M.id_db as mission, M.state as state, ifnull(C.paymentId, 1) as paymentMode, ifnull(C.paymentDate, "2016-03-11") as paymentDate, "[]" as sbds, "[]" as promotions, C.id_db as commande, "["||Group_Concat("{ ""id_article"": "||LC.id_article|| ", ""unite"": "||LC.unit||", ""remise"": "||ifnull(LC.remise, 0)||", ""gift"": "||ifnull(LC.isGift, 0)||",   ""prixBase"": "||LC.pu_ht ||",   ""prix"": "||LC.pu_ht ||", ""totalRemise"": "||LC.remise||", ""tauxTva"": "||0.20||", ""tauxTva"": "||0.20||", ""caisse"": "||LC.packet||" }")||"]" as lignes FROM missions_livreur AS M JOIN commandes_livreur AS C ON C.id_db = M.commande_id JOIN ligneCommandes_livreur AS LC ON LC.id_commande = C.id_db WHERE M.synced = 0 AND M.state = 1 AND M.livreur = ? GROUP BY M.id_db;';
            var bindings = [idLivreur];
            DB.query(sql_query, bindings).then(
                function (success) {
                    console.log(success);

                    var visits = DB.fetchAll(success);
                    var finalVisits = [];
                    for (var i = 0, len = visits.length; i < len; i++) {
                        var visit = visits[i];
                        visit.lignes = JSON.parse(visit.lignes);
                        visit.promotions = JSON.parse(visit.promotions || "[]");
                        visit.sbds = JSON.parse(visit.sbds || "[]");
                        finalVisits.push(visit);
                    }
                    console.log(finalVisits);
                    deferred.resolve("Nothing !");
                    if (finalVisits.length > 0) {
                        var request = {
                            method: "POST",
                            url: "http://" + ip + "/newsales/rest/livreurs/" + idLivreur + "/sync/missions",
                            data: finalVisits
                        };

                        console.debug(request);

                        $http(request).then(
                            function (success) {
                                var ids = success.data;
                                var query = "UPDATE missions_livreur SET synced = 1 WHERE id_db IN (" + ids.join(", ") + ");";
                                DB.query(query).then(function (success) {
                                    deferred.resolve("SUCCESSFULLY SYNCED");
                                });
                            },
                            function (error) {
                                deferred.resolve(error);
                            });
                    }
                    else {
                        
                    }
                },
                function (error) {
                    console.error(error);
                    deferred.resolve(error);
                });
            return deferred.promise;
        }

        function syncCommandes(idVendeur, isLivreur) {
            var deferred = $q.defer();

            isLivreur = typeof(isLivreur) != "undefined" && isLivreur == true;

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query;

            /*private String factureHeader;
    private Date preferedDateToDeliver;
    private String livraisonAdresse;
    {name: "depot", value: "integer default 0"},
                {name: "date_livraison", value: "long default 0"},
                {name: "adresse_livraison", value: "text default '' "},*/

            if(!isLivreur) {
                sql_query = 'SELECT C.date_livraison as preferedDateToDeliver, ifnull(C.adresse_livraison, "") as livraisonAdresse, ifnull(M.cause, "") as cause, C.depot as depotID, M.latitude as lattitude, M.longitude, M.entryDate, M.exitDate, ifnull(C.totalEscompteDiscount, 0) as escompteFactured, ifnull(C.remise, 0) as totalRemiseFactured, ifnull(C.timbre, 0) as timbreFactured, ifnull(C.totalTTC, 0) as totalFactured, ifnull(C.totalHT, 0) as totalFacturedHT, M.id AS mobile, ifnull(C.paymentId, 0) as payementModeID, ifnull(C.id, 0) as commande,  ifnull(C.paymentDate, 0) as payementDate, M.client_id AS client, ifnull(C.sbd, "") as sbds, ifnull(C.promotions, 0) AS promotions, M.route_id AS route, M.state AS etat, ifnull(M.id_db, 0) AS api, ifnull("["||Group_Concat("{ ""id_article"": "||LC.id_article||", ""unite"": "||LC.unit||", ""ligne"": " || LC.id || ", ""remise"": "||ifnull(LC.remise, 0)||", ""gift"": "||ifnull(LC.isGift, 0)||",  ""prix"": "||LC.pu_ht||", ""caisse"": "||LC.packet||" }")||"]", "[]") as lignes FROM missions AS M JOIN commandes AS C ON C.id = M.commande_id JOIN ligneCommandes AS LC ON LC.id_commande = C.id WHERE M.synced = 0 AND (M.state = 1 OR M.state = 2) AND M.route_id IN (SELECT id_db from routes AS R WHERE R.vendeur = ' + idVendeur + ' AND R.activite = ' + activite + ' AND R.societe = ' + tenant_id + ' ) AND M.societe = ' + tenant_id + ' AND M.activite = ' + activite + ' AND M.livreur IS NULL GROUP BY C.id;';
            } else {
                sql_query = 'SELECT ifnull(M.cause, "") as cause, C.depot as depotID, M.latitude as lattitude, M.longitude, M.entryDate, M.exitDate, ifnull(C.totalEscompteDiscount, 0) as escompteFactured, ifnull(C.remise, 0) as totalRemiseFactured, ifnull(C.timbre, 0) as timbreFactured, ifnull(C.totalTTC, 0) as totalFactured, ifnull(C.totalHT, 0) as totalFacturedHT, M.id AS mobile, ifnull(C.paymentId, 0) as payementModeID, ifnull(C.id, 0) as commande,  ifnull(C.paymentDate, 0) as payementDate, M.client_id AS client, ifnull(C.sbd, "") as sbds, ifnull(C.promotions, 0) AS promotions, M.route_id AS route, M.state AS etat, ifnull(M.id_db, 0) AS api, ifnull("["||Group_Concat("{ ""id_article"": "||LC.id_article||", ""unite"": "||LC.unit||", ""ligne"": " || LC.id || ", ""remise"": "||ifnull(LC.remise, 0)||", ""gift"": "||ifnull(LC.isGift, 0)||",  ""prix"": "||LC.pu_ht||", ""caisse"": "||LC.packet||" }")||"]", "[]") as lignes FROM missions AS M JOIN commandes AS C ON C.id_db = M.commande_id JOIN ligneCommandes AS LC ON LC.id_commande = C.id_db WHERE M.synced = 0 AND (M.state = 1 OR M.state = 2) AND M.livreur = ' + idVendeur + ' AND M.societe = ' + tenant_id + ' AND M.activite = ' + activite + ' GROUP BY C.id;';
            }

            console.log(sql_query);

            DB.query(sql_query).then(
                function (success) {

                    console.log(success);
                    
                    var commandes = DB.fetchAll(success);

                    console.log(commandes);

                    angular.forEach(commandes, function (commande) {
                        console.log(commande);

                        if(!isLivreur) {
                            if( typeof(commande.preferedDateToDeliver) != "undefined" &&  commande.preferedDateToDeliver != null &&  commande.preferedDateToDeliver > 0) {
                                commande.preferedDateToDeliver = DateUtilities.convertLongToYYYYMMDD(new Date(commande.preferedDateToDeliver));
                            } else {
                                commande.preferedDateToDeliver = DateUtilities.convertLongToYYYYMMDD(new Date());
                            }
                        }
                        commande.lignes = JSON.parse(commande.lignes);
                        commande.payementDate = new Date(commande.payementDate);
                        commande.promotions = JSON.parse("[" + commande.promotions + "]" || "[]");
                        commande.sbds = JSON.parse("[" + commande.sbds + "]" || "[]");
                        //commande.charaka = JSON.parse(commande.charaka || "[]");

                        commande.lcDetailsDto = [];
                        DB.query("SELECT cumule, value, priorite as promoOrder, rank as priorite, remiseP as remisePerc, remiseV as remise, promotion_id as promotionID FROM discounts_history WHERE commande_id = " + commande.commande + ";")
                            .then(
                                function (histories) {
                                    commande.lcDetailsDto = DB.fetchAll(histories);
                                },
                                function (empty) {
                                    commande.lcDetailsDto = [];
                                });

                        angular.forEach(commande.lignes, function (ligne) {

                            ligne.gift = ligne.gift == 1 ? true : false;

                            DB.query("SELECT cumule, value, priorite as promoOrder, rank as priorite, remiseP as remisePerc, remiseV as remise, promotion_id as promotionID FROM discounts_history WHERE line_id = " + ligne.ligne + ";").then(
                                function (details) {
                                    console.debug(details);
                                    ligne.lcDetailsDto = DB.fetchAll(details);
                                },
                                function (error) {
                                    console.debug(error);
                                    ligne.discounts = [];
                                });

                        });
                        console.debug(commande);
                    });
                    console.log(commandes);
                    deferred.resolve(commandes);
                },
                function (error) {
                    console.error(error);
                    deferred.resolve([]);
                });
            return deferred.promise;
        }


        function syncV2(vendeurId, ip) {
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var deferred = $q.defer();
            var vendeurId = vendeurId;
            var requests = [];
            combineOutputAndInput(vendeurId, ip).then(
                function (success) {


                    console.error(success);
                    //console.debug(JSON.stringify(success[5]));

                    var object = success[0];

                    object.commandes = success[1];

                    object.clientResponses= success[14];

                    object.echanges = success[16];

                    var synchDetails = {};

                    if(!success[13].length > 0) {
                        object.stockClient = null;
                    }
                    else {
                        object.stockClient = success[13];
                    }

                    synchDetails.factureIncrement = profile.factureIncrement || 0;

                    if (!success[9].length > 0) {
                        synchDetails.stocks = null;
                    }
                    else {
                        synchDetails.stocks = success[9];

                    }

                    object.synchDetails = synchDetails;


                    requests = requests.concat(success[3]);
                    requests = requests.concat(success[5]);
                    requests = requests.concat(success[7]);
                    requests = requests.concat(success[8]);
                    requests = requests.concat(success[10]);
                    requests = requests.concat(success[11]);
                    requests = requests.concat(success[12]);
                    //Quotas clients !!
                    requests = requests.concat(success[15]);

                    //console.log(requests);

                    console.log(object);
                    gatherSyncData(object, vendeurId, ip).then(
                        function (success) {
                            //console.log("success");
                            //console.log(success);

                            //requests.push("DELETE FROM stock WHERE prelevement = 1 AND client_id IN (SELECT C.id_db FROM clients AS C JOIN routes AS R ON R.id_db = C.route AND R.vendeur = "+vendeurId+")");
                            //requests.push("DELETE FROM survey_client WHERE client_id IN (SELECT id_db FROM clients WHERE route IN ( SELECT id_db FROM routes WHERE vendeur = " + vendeurId + ") )")
                            deferred.resolve(processData(success, vendeurId, requests));

                        },
                        function (error) {
                            //deferred.resolve("ERREUR LORS DE L'OBTENTION DES DONNEES !!");
                            console.log("error");
                            console.log(JSON.stringify(error));
                            deferred.resolve(processData({data: ""}, vendeurId, requests));
                        });


                },
                function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function removeResponsesQuery(insertedValues){

            var query = "Delete from survey_client where "+insertedValues.reduce(function(result,item){
                result+=" (client_id="+item.clientID+" and survey_id="+ item.questionID+") or";
                return result;
              },"");
            return query.substr(0,query.length-2);
        }


        function processData(success, vendeurId, requests) {
            var deferred = $q.defer();
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            var sbdObject = { sbdId: 0, sbdUrl: "" };

            //requests.push("DELETE FROM client_osb WHERE client_id IN (SELECT id_db FROM clients WHERE route IN (SELECT id_db FROM routes WHERE vendeur = "+vendeurId+"))");
            //requests.push('INSERT INTO client_osb(client_id, osb, commande, message) VALUES (64486, 1, 1, "CLIENT EN REGLE"), (64485, 1, 0, "PROBLEME DE RECOUVREMENT");');

            //console.debug(JSON.stringify(success));

            if (typeof(success.data) != "undefined" && success.data != "") {

                //requests.push("DELETE FROM depot_vendeur WHERE vendeur = "+(profile.id_db || 0)+" ;");
                //requests.push('INSERT INTO depot_vendeur (depot_id, depot_name, vendeur) VALUES (1, "GRAND CASABLANCA", 42), (2, "MEKNES", 42), (3, "TANGER-TETOUAN", 42), (4, "OUJDA", 42)');


                if(typeof(success.data.timbreDetails)!="undefined" &&  success.data.timbreDetails!=null && success.data.timbreDetails){
                    Timbre.sync(success.data.timbreDetails);
                }

                if(typeof(success.data.insertedClientResponses)!="undefined" &&  success.data.insertedClientResponses!=null && success.data.insertedClientResponses.length >0){
                    requests.push(removeResponsesQuery(success.data.insertedClientResponses));
                }

                if(typeof(success.data.syncEchangesIds) != "undefined" && success.data.syncEchangesIds != null && success.data.syncEchangesIds.length > 0) {
                    var echangesIds = success.data.syncEchangesIds;
                    requests.push("UPDATE echange SET synced = 1 WHERE id IN " + echangesIds.join(", ") + ";");
                }

                if(typeof(success.data.objectifMobileDto) != "undefined" && success.data.objectifMobileDto != null) {
                    var aimAndCurrent = success.data.objectifMobileDto;
                    var objectifGP = typeof(aimAndCurrent.objectifGP) != "undefined" && aimAndCurrent.objectifGP > 0 ? aimAndCurrent.objectifGP : "NA";
                    var objectifGS = typeof(aimAndCurrent.objectifGS) != "undefined" && aimAndCurrent.objectifGS > 0 ? aimAndCurrent.objectifGS : "NA";
                    var objectifCA = typeof(aimAndCurrent.objectifChiffreAffaire) != "undefined" && aimAndCurrent.objectifChiffreAffaire > 0 ? aimAndCurrent.objectifChiffreAffaire : "NA";
                    var ca = ( profile.fonction == "vendeur" ) ? ( aimAndCurrent.chiffreAffaire || 0 ) : ( aimAndCurrent.livreurChiffreAffaire || 0 );
                    var objectifQuery = "UPDATE accounts SET ca = " + ca + ", objectif_ca = '" + objectifCA+ "', golden_points = " + ( aimAndCurrent.goldenPoint || 0 ) + ", golden_stores = " +( aimAndCurrent.goldenStore || 0 ) + ", objectif_golden_points = '" + objectifGP + "', objectif_golden_stores = '" + objectifGS + "' WHERE id_db = " + vendeurId + " AND activite = " + activite + " AND societe = " + tenant_id + ";";

                    requests.push(objectifQuery);
                    
                    profile.golden_points = aimAndCurrent.goldenPoint || 0;
                    profile.golden_stores = aimAndCurrent.goldenStore || 0;
                    profile.ca = ca;

                    profile.objectif_ca = objectifCA;
                    profile.objectif_golden_points = objectifGP;
                    profile.objectif_golden_stores = objectifGS;

                    window.localStorage["profile"] = JSON.stringify(profile);

                }

                if(typeof(success.data.echangeConfigs[0]) != "undefined" && success.data.echangeConfigs[0] != null) {
                    var echangeConfigs = success.data.echangeConfigs[0];

                    var articlesEntrant = echangeConfigs.articleEntrant || [1,2,3,4,5,6,7,8,9];
                    var articlesSortant = echangeConfigs.articleSortrant || [11,12,13,14,15,16,17,18,19];
                    var marquesEntrant = echangeConfigs.marqueEntrant || [1,2,3,4,5,6,7,8,9];
                    var marquesSortant = echangeConfigs.marqueSortant || [11,12,13,14,15,16,17,18,19];

                    var articlesEchangeAddons = [];
                    var marquesEchangeAddons = [];

                    angular.forEach(articlesEntrant, function(article){
                        articlesEchangeAddons.push("(" + article + ",  1, 0, " + vendeurId + ", " + tenant_id + ", " + activite + ")");
                    });

                    angular.forEach(articlesSortant, function(article){
                        articlesEchangeAddons.push("(" + article + ",  0, 1, " + vendeurId + ", " + tenant_id + ", " + activite + ")");
                    });


                    angular.forEach(marquesEntrant, function(marque){
                        marquesEchangeAddons.push("(" + marque+ ",  1, 0, " + vendeurId + ", " + tenant_id + ", " + activite + ")");
                    });

                    angular.forEach(marquesSortant, function(marque){
                        marquesEchangeAddons.push("(" + marque + ",  0, 1, " + vendeurId + ", "+ tenant_id + ", " + activite + ")");
                    });

                    if( (articlesEchangeAddons.length > 0) && (marquesEchangeAddons.length > 0) ) {
                        requests.push("INSERT INTO articles_echange (article, entrant, sortant, vendeur, societe, activite) VALUES " + articlesEchangeAddons.join(", ") + ";");
                        requests.push("INSERT INTO marques_echange (marque, entrant, sortant, vendeur, societe, activite) VALUES " + marquesEchangeAddons.join(", ") + ";");
                    }
                }


                if(typeof(success.data.processusOsb) != "undefined" && success.data.processusOsb != null && success.data.processusOsb.length > 0)
                {
                    var osbOptions = [];
                    var osbs = success.data.processusOsb;
                    angular.forEach(osbs, function(osb){
                        osbOptions.push("(" + (osb.client_id || 0) + ", 1, " + (osb.commandeBloque ? 0 : 1) + ", '" + (osb.message || "") +"', " + tenant_id+ ", " + activite + ")");
                    });

                    requests.push("DELETE FROM client_osb WHERE client_id IN (SELECT id_db FROM clients AS C WHERE C.route IN (SELECT id_db FROM routes AS R WHERE R.vendeur = "+vendeurId+" AND R.activite = " + activite + " AND R.societe = " + tenant_id + ") AND C.societe = " + tenant_id + " AND C.activite = " + activite + ") AND societe = " + tenant_id + " AND activite = " + activite +";");
                    requests.push("INSERT INTO client_osb(client_id, osb, commande, message, societe, activite) VALUES "+osbOptions.join(", ")+";");
                }



                if(typeof(success.data.depots) != "undefined" && success.data.depots != null) {

                    

                    var addonsDepots = [];

                    angular.forEach(success.data.depots, function(depot){
                        addonsDepots.push("(" + depot.id + ", '" + depot.libelle + "', "+profile.id_db+", "+tenant_id +","+activite +")");
                    });

                    requests.push("INSERT INTO depot_vendeur (depot_id, depot_name, vendeur, societe, activite) VALUES "+ addonsDepots.join(", ") +";");

                }

                
                if(typeof(success.data.clientDepots) != "undefined" && success.data.clientDepots != null && success.data.clientDepots.length > 0) {

                    var globalClientDepotAddons = [];

                    angular.forEach(success.data.clientDepots, function(clientDepot){

                        var clientId = clientDepot.client || 0;

                        var clientDepots = clientDepot.depots || [];

                        var addonClientDepots = [];

                        angular.forEach(clientDepots, function(depot){
                            var checked = typeof(depot.bit) != "undefined" && depot.bit != null && depot.bit != false ? 1 : 0;
                            var depotId = typeof(depot.id) != "undefined" && depot.id != null ? depot.id : 0;
                            addonClientDepots.push("(" + depotId + ", " + clientId + ", " + checked + ", " + tenant_id + ", " + activite + ")");
                        });

                        globalClientDepotAddons = globalClientDepotAddons.concat(addonClientDepots);

                    });

                    requests.push("INSERT INTO depot_client (depot_id, client_id, checked, societe, activite) VALUES " + globalClientDepotAddons.join(", ") + ";");

                }


                if(typeof(success.data.promotionConsumption) != "undefined" && success.data.promotionConsumption != null) {

                    
                    var addonsConsumption = [];

                    angular.forEach(success.data.promotionConsumption, function(consumption){
                        addonsConsumption.push("(" + ( consumption.promotion_id || 0 ) + ", '" + ( consumption.client_id || 0 ) + "', 1, date('now'), " + tenant_id+ ", " + activite+ " )");
                    });

                    requests.push("INSERT INTO promotion_consumption (promotion_id, client_id, consumed, at, societe, activite) VALUES "+ addonsConsumption.join(", ") +";");

                }


                //success.data.concurrents = [{ startDate: "2016-03-16", endDate: "2016-03-17", typeClientID: 1, items: [{ id: 1, name: "MARLBORO CARTOUCHE"}, { id: 2, name: "WINSTON LIGHT"}, { id: 3, name: "TRIA COUSCOUS CALIBRE FINE 1KG"}, { id: 4, name: "LAIT JAOUDA 1L"}] }];

                //console.log(success.data.concurrents);








                if (typeof(success.data.brandFiveObjectif) != "undefined" && success.data.brandFiveObjectif != null) {

                    BrandFive.insertBrandFiveLines(success.data.brandFiveObjectif);

                }
                if (typeof(success.data.exclusions) != "undefined" && success.data.exclusions != null) {


                    if (success.data.exclusions.length > 0) {

                        var fiveHundredGroupments = [];

                        for(var i = 0 ; i < success.data.exclusions.length ; i += 500)
                        {
                            fiveHundredGroupments.push(success.data.exclusions.slice(i, i+500));
                        }

                        console.log(fiveHundredGroupments);

                        var options = [];

                        angular.forEach(fiveHundredGroupments, function(fiveHundredGroupment) {

                            console.log(fiveHundredGroupment);

                            angular.forEach(fiveHundredGroupment, function (itemInGroupment) {

                                console.log(itemInGroupment);

                                options.push("(" + itemInGroupment + ", " + (profile.id_db || 0) + ", " + tenant_id+ ", " + activite + ")");

                            });

                            requests.push("INSERT INTO articles_exclusions_bis (article_id, vendeur, societe, activite) VALUES " + options.join(", ") + ";");

                            options = [];

                        });
                        
                    }
                }

                if (typeof(success.data.motifs) != "undefined" && success.data.motifs != null) {
                    Retours.addMotifs(success.data.motifs, tenant_id, activite);
                }

                if (typeof(success.data.retours) != "undefined" && success.data.retours != null) {
                    Retours.add(success.data.retours, tenant_id, activite);
                }

                if (typeof(success.data.synchDetails) != "undefined" && success.data.synchDetails != null) {

                    var syncDetails = success.data.synchDetails;

                    console.log(syncDetails.concurrentItems);


                    if(typeof(syncDetails.concurrentItems) != "undefined" && syncDetails.concurrentItems != null) {

                        

                        var addonsConcurrent = [];

                        angular.forEach(syncDetails.concurrentItems, function(concurrent){
                            
                            var startDate = concurrent.startDate || "2999-12-31";
                            var endDate = concurrent.endDate || "2999-12-31";
                            var item = concurrent.name || "";
                            var id = concurrent.id || 0;
                            var types = concurrent.typeClientID.split(",");
                            console.log(types);

                            angular.forEach(types, function(type){
                                if(type !== "")
                                {
                                    addonsConcurrent.push("("+id+", '"+item+"', '"+startDate+"', '"+endDate+"', "+(Number(type) || 0)+", 0, " + activite + ", " + tenant_id + ")");
                                }
                            });
                        });

                        if(addonsConcurrent.length > 0) {
                            requests.push("INSERT INTO articles_concurrent (id_db, nomArticle, startDate, endDate, typeClient, timestamp, activite, societe) VALUES "+ addonsConcurrent.join(", ") +";");

                        }

                    }

                    if (typeof(syncDetails.chargements) != "undefined" && syncDetails.chargements != null && syncDetails.chargements.length > 0) {
                        angular.forEach(syncDetails.chargements, function (chargement) {

                            // THIS IS B.O CHARGEMENT !
                            if (chargement.mobileFieldID == 0) {
                                var lignes = [];

                                angular.forEach(chargement.ligneDetails, function (ligne) {
                                    var object = {
                                        id_db: ligne.articleID,
                                        packet: ligne.packet,
                                        unit: ligne.unite,
                                        flag: ligne.flag
                                    };
                                    lignes.push(object);
                                });

                                deferred.resolve(Chargement.addChargement(vendeurId, lignes, true, false));
                            }
                            // SEND FROM THE MOBILE !
                            else {
                                requests.push("DELETE FROM chargement_vendeur WHERE id != " + chargement.mobileFieldID + " AND chargement = 1 AND dechargement = 0 AND activite = " + activite + " AND societe = " + tenant_id + ";");

                                requests.push("UPDATE chargement_vendeur SET reponse = 1 WHERE id = " + chargement.mobileFieldID + " AND vendeur_id = " + vendeurId + " AND activite = " + activite + " AND societe = " + tenant_id + ";");

                                requests.push("DELETE FROM chargement_vendeur_lignes WHERE chargement_id = " + chargement.mobileFieldID + ";");

                                angular.forEach(chargement.ligneDetails, function (ligne) {
                                    // DECHARGEMENT - CHARGEMENT
                                    // VEULENT DIRE input - output
                                    // INPUT : saisie de la part du vendeur !
                                    // OUTPUT : validé de la part du magasinier !
                                    requests.push("INSERT INTO chargement_vendeur_lignes(chargement_id, item_id, packet, unit, chargement, dechargement, timestamp) VALUES (" + chargement.mobileFieldID + ", " + ligne.articleID + ", " + ligne.packet + ", " + ligne.unite + ", " + ( (ligne.flag == 1) ? 1 : 0) + ", " + ( (ligne.flag == 0) ? 1 : 0) + ", " + chargement.chargementDate + ");");
                                });

                            }

                        });
                    }

                    if (typeof(syncDetails.dechargements) != "undefined" && syncDetails.dechargements != null && syncDetails.dechargements.length > 0) {
                        angular.forEach(syncDetails.dechargements, function (dechargement) {



                            // THIS IS B.O CHARGEMENT !
                            //if()
                            if (dechargement.mobileFieldID == 0) {
                                var lignes = [];

                                angular.forEach(dechargement.ligneDetails, function (ligne) {
                                    var object = {
                                        id_db: ligne.articleID,
                                        packet: ligne.packet,
                                        unit: ligne.unite,
                                        flag: ligne.flag
                                    };
                                    lignes.push(object);
                                });

                                Chargement.addChargement(vendeurId, lignes, false, true);
                            }
                            // SEND FROM THE MOBILE !
                            else {
                                requests.push("DELETE FROM chargement_vendeur WHERE id != " + dechargement.mobileFieldID + " AND chargement = 0 AND dechargement = 1 AND activite = " + activite + " AND societe = " + tenant_id + ";");

                                requests.push("UPDATE chargement_vendeur SET reponse = 1 WHERE id = " + dechargement.mobileFieldID + " AND vendeur_id = " + vendeurId + " AND chargement = 0 AND dechargement = 1 AND activite = " + activite + " AND societe = " + tenant_id + ";");

                                requests.push("DELETE FROM chargement_vendeur_lignes WHERE chargement_id = " + dechargement.mobileFieldID + ";");

                                angular.forEach(dechargement.ligneDetails, function (ligne) {
                                    // DECHARGEMENT - CHARGEMENT
                                    // VEULENT DIRE input - output
                                    // INPUT : saisie de la part du vendeur !
                                    // OUTPUT : validé de la part du magasinier !
                                    requests.push("INSERT INTO chargement_vendeur_lignes(chargement_id, item_id, packet, unit, chargement, dechargement, timestamp) VALUES (" + dechargement.mobileFieldID + ", " + ligne.articleID + ", " + ligne.packet + ", " + ligne.unite + ", " + ( (ligne.flag == 1) ? 1 : 0) + ", " + ( (ligne.flag == 0) ? 1 : 0) + ", " + dechargement.chargementDate + ");");
                                });

                            }

                        });
                    }


                    if (typeof(syncDetails.factureIncrement) != "undefined" && syncDetails.factureIncrement != null) {
                        requests.push("UPDATE accounts SET factureIncrement = " + syncDetails.factureIncrement + " WHERE id_db = " + vendeurId + " AND societe = " + tenant_id + " AND activite = " + activite + ";");
                        profile.factureIncrement = syncDetails.factureIncrement || 1;
                        window.localStorage["profile"] = JSON.stringify(profile);
                    }

                    if (typeof(syncDetails.stocks) != "undefined" && syncDetails.stocks != null && syncDetails.stocks.length > 0) {
                        var lines = syncDetails.stocks;
                        lines = Chargement.convertApiLineObjectsToOptions(lines, tenant_id, activite);
                        requests.push("DELETE FROM stock WHERE employee_id = " + vendeurId + " AND societe = " + tenant_id + " AND activite = " + activite + ";");
                        requests.push("INSERT INTO stock (item, packet, unit, employee_id, client_id, retour, prelevement, cause, date, total, societe, activite) VALUES " + lines.join(", ") + ";");
                        //requests.push("INSERT INTO stock (item, packet, unit, employee_id, client_id, retour, prelevement, cause, date, total) VALUES (1, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000), (2, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000), (3, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000), (42, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000), (57, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000), (58, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000), (59, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000), (77, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000), (80, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000), (651, 0, 0, 42, 0, 0, 0, '', '2016-03-15', 30000);")
                        //requests.push("INSERT INTO stock(item, packet, unit, total, client_id, retour, prelevement, cause, date, employee_id) VALUES (3, 10, 200, 3000, 0, 0, 0, '', '', 42)")
                    }

                }
                else
                {
                    requests.push("UPDATE accounts SET factureIncrement = 1 WHERE id_db = " + vendeurId + ";");
                    profile.factureIncrement = 1;
                    window.localStorage["profile"] = JSON.stringify(profile);
                }

                //syncIds
                if (typeof(success.data.ids) != "undefined" && success.data.ids != null) {
                    var object = success.data.ids;
                    var id_dbs = [];
                    var ids = [];
                    for (key in object) {
                        id_dbs.push(object[key]);
                        ids.push(key);
                        requests.push('UPDATE missions SET id_db = ' + object[key] + ' WHERE id = ' + key + ' AND societe = ' + tenant_id + ' AND activite = ' + activite +' ;');
                    }
                    console.log(success.data.ids);
                    if (id_dbs.length > 0) {
                        requests.push('UPDATE missions SET synced = 1 WHERE id_db IN (' + id_dbs.join(",") + ') AND societe = ' + tenant_id + ' AND activite = ' + activite +' ;');
                    }
                    if (ids.length > 0) {
                        requests.push('UPDATE missions SET synced = 1 WHERE id IN (' + ids.join(",") + ') AND societe = ' + tenant_id + ' AND activite = ' + activite +' ;');
                    }

                }


                var addonsMissions = [], addonsClients = [], addonsRoutes = [], addonsArticles = [];


                //syncMissions
                if (typeof(success.data.missions) != "undefined" && success.data.missions != null && success.data.missions.length > 0) {


                    if (success.data.missions.length < 500) {

                        for (var i = 0; i < success.data.missions.length; i++) {
                            addonsMissions.push(convertMissionObjectToRequestOption(success.data.missions[i], tenant_id, activite));
                        }
                        requests.push("INSERT INTO missions(id_db, code_mission, client_id, route_id, date_start, synced, state, timestamp, societe, activite) VALUES " + addonsMissions.join(", ") + ";");
                    }
                    else {
                        var array_output = [];
                        var max = 500;
                        for (var i = 0; i < success.data.missions.length; i += max) {
                            array_output.push(success.data.missions.slice(i, i + max));
                        }
                        console.log(array_output);
                        for (var i = 0; i < array_output.length; i++) {
                            var missions = array_output[i];
                            for (var j = 0; j < missions.length; j++) {
                                addonsMissions.push(convertMissionObjectToRequestOption(missions[j], tenant_id, activite));
                            }
                            requests.push("INSERT INTO missions(id_db, code_mission, client_id, route_id, date_start, synced, state, timestamp, societe, activite) VALUES " + addonsMissions.join(", ") + ";");
                            addonsMissions = [];
                        }
                    }
                }


                //syncMarques
                
                if (typeof(success.data.marques) != "undefined" && success.data.marques != null && success.data.marques.length > 0) {
                    var marqueIds = [];
                    var marques = success.data.marques;
                    var addonsMarques = [];
                    for (var i = 0; i < marques.length; i++) {
                        var marque = marques[i];
                        var id = marque.id || 0;
                        marqueIds.push(id);
                        marque.timestamp = marque.timesStamp || 0;
                        addonsMarques.push(convertMarqueObjectToRequestOption(marque));
                    }
                    requests.push("DELETE FROM marque WHERE id_db IN ( " + marqueIds.join(", ") + ") AND activite = " + activite + " AND societe = " + tenant_id + ";");
                    requests.push("INSERT INTO marque(id_db, marqueArticle, logo, activite, societe, timestamp, activated) VALUES " + addonsMarques.join(", ") + ";");


                }

                //syncArticles
                
                if (typeof(success.data.articles) != "undefined" && success.data.articles != null && success.data.articles.length > 0) {
                    var articles = success.data.articles;
                    if (articles.length < 500) {
                        var ids = [];
                        for (var i = 0; i < articles.length; i++) {
                            ids.push(articles[i].id);
                            addonsArticles.push(convertArticleObjectToRequestOption(articles[i]));
                        }
                        requests.push("DELETE FROM articles WHERE id_db IN (" + ids.join(", ") + ") AND societe = " + tenant_id + " AND activite = " + activite + ";");
                        requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion, timestamp, activite, societe) VALUES " + addonsArticles.join(", ") + ";");
                        ids = [];
                        addonsArticles = [];
                    }
                    else {
                        var max = 500;
                        var array_articles_output = [];
                        for (var i = 0; i < articles.length; i += max) {
                            array_articles_output.push(articles.slice(i, i + max));
                        }
                        for (var i = 0; i < array_articles_output.length; i++) {
                            var ids = [];
                            var articles_group = array_articles_output[i];
                            for (var j = 0; j < articles_group.length; j++) {
                                ids.push(articles_group[j].timestamp);
                                addonsArticles.push(convertArticleObjectToRequestOption(articles_group[j]));
                            }
                            requests.push("DELETE FROM articles WHERE id_db IN (" + ids.join(", ") + ") AND societe = " + tenant_id + " AND activite = " + activite + ";");
                            requests.push("INSERT INTO articles(id_db, code, nomArticle, prixVente, tva, uniteMesure, uniteMesure2, marqueArticle, sousMarqueArticle, unitConversion, timestamp, activite, societe) VALUES " + addonsArticles.join(", ") + ";");
                            addonsArticles = [];
                            ids = [];
                        }
                    }
                }


                //syncRoutes
                if (typeof(success.data.routes) != "undefined" && success.data.routes != null && success.data.routes.length > 0) {
                    var ids = [];
                    for (var i = 0; i < success.data.routes.length; i++) {
                        ids.push(success.data.routes[i].id);
                        addonsRoutes.push(convertRouteObjectToRequestOption(success.data.routes[i], vendeurId, tenant_id, activite));
                    }
                    requests.push("DELETE FROM clients WHERE route IN (" + ids.join(", ") + ") AND activite = " + activite + " AND societe = " + tenant_id + ";");
                    requests.push("DELETE FROM routes WHERE id_db IN (" + ids.join(", ") + ") AND activite = " + activite + " AND societe = " + tenant_id + ";");
                    requests.push("INSERT INTO routes(id_db, code, nom, desactive, vendeur, timestamp, societe, activite) VALUES " + addonsRoutes.join(", ") + " ;");
                    ids = [];
                    addonsRoutes = [];
                }
                //syncClients
                if (typeof(success.data.clients) != "undefined" && success.data.clients != null && success.data.clients.length > 0) {
                    var ids = [];
                    var subRequests = [];
                    var addonsModePaiement = [];
                    for (var i = 0; i < success.data.clients.length; i++) {

                        var clientId = success.data.clients[i].id || 0;

                        ids.push(clientId);

                        addonsClients.push(convertClientObjectToRequestOption(success.data.clients[i], tenant_id, activite));

                        var paymentModes = success.data.clients[i].payementModeIDs || [];

                        var optionsModes = [];

                        angular.forEach(paymentModes, function(paymentMode){
                            optionsModes.push("("+clientId+", "+paymentMode+", " + tenant_id + ", " + activite + ")");
                        });

                        addonsModePaiement = addonsModePaiement.concat(optionsModes);
                    }

                    

                    requests.push("DELETE FROM client_mode_paiements WHERE client_id IN ( SELECT id_db FROM clients WHERE id_db IN (" + ids.join(", ") + ") AND societe = " + tenant_id + " AND activite = " + activite + ");");

                    requests.push("DELETE FROM clients WHERE id_db IN (" + ids.join(", ") + ") AND activite = " + activite + " AND societe = " + tenant_id + ";")
                    
                    var finalModePaiementsGroups = [];

                    var max = 500;

                    for (var i = 0 ; i < addonsModePaiement.length ; i+=max) {
                        finalModePaiementsGroups.push(addonsModePaiement.slice(i, max));
                    }

                    for(var i = 0 ; i < finalModePaiementsGroups.length ; i++) {
                        var addonsGroup = finalModePaiementsGroups[i];
                        requests.push("INSERT INTO client_mode_paiements (client_id, mode_id, societe, activite ) VALUES " + addonsGroup.join(", ")  + ";");
                    }

                    requests = requests.concat(subRequests);

                    requests.push("INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email, golden_store, route, timestamp, return_id, retour_debut, retour_fin, type, channel, depot, societe, activite, classe) VALUES" + addonsClients.join(", ") + ";");
                    
                    ids = [];
                    addonsClients = [];
                }

                

                if( typeof(success.data.sbd) != "undefined" && typeof(success.data.url) != "undefined" )
                {
                    console.log("SBD", success.data.sbd);
                    console.log("URL", success.data.url);
                    sbdObject = { sbdId: success.data.sbd, sbdUrl: success.data.url };
                    var parametrage = profile.parametrage || {};
                    var sbd = parametrage.sbd || {};
                    var localSBDId = sbd.sbd_id || 0;
                    var serverSBDId = sbdObject.sbdId;



                    if(serverSBDId > localSBDId) {

                        var objectSBD = { sbd_title: "", sbd_url: sbdObject.sbdUrl, sbd_id: sbdObject.sbdId, sbd_new: 1};

                        profile.parametrage.sbd = objectSBD;

                        window.localStorage["profile"] = JSON.stringify(profile || {});

                        Parametrage.updateSBD(objectSBD);
                        
                    }
                }

            }
            requests.push("DELETE FROM stock WHERE prelevement = 1 AND societe = " + tenant_id + " AND activite = " + activite + " AND client_id IN (SELECT C.id_db FROM clients AS C JOIN routes AS R ON R.activite = " + activite + " AND R.societe = " + tenant_id + " AND R.id_db = C.route AND R.vendeur = "+vendeurId+")");
            if (requests.length > 0) {

                console.log("YES !!");

                angular.forEach(requests, function (request, index) {
                    //console.log(request);
                    DB.query(request).then(
                        function (success) {
                            console.log(success);
                            //deferred.resolve(success);

                        },
                        function (error) {
                            console.error(request, error);
                            //deferred.resolve("Erreur lors de la synchronisation !");

                        });

                    if(index == requests.length - 1)
                    {
                        deferred.resolve("FINI AVEC SUCCES");
                        return deferred.promise;
                    }
                });

                
            }
            else
            {
                deferred.resolve("AUCUNE MISE A JOUR");
                return deferred.promise;
            }

            

            
        }

        function gatherSyncData(syncData, vendeurId, ip) {

            var request = {
                url: "http://"+ip+"/newsales/rest/vendors/" + vendeurId + "/mobile/synchronisation",
                method: "POST",
                data: syncData
            };
            console.debug("THIS IS DATA !! ");
            console.log(JSON.stringify(request));
            return $http(request);
        }

        function combineOutputAndInput(vendeurId, ip) {
            var inputData = gatherSyncOutputData(vendeurId);

            var outputData = syncCommandes(vendeurId);

            var surveys = Surveys.addSurveysToDB(vendeurId, ip);

            var methodePaiements = ModePaiement.addToDB(vendeurId, ip);

            var promotions = Promotions.syncPromotions(vendeurId, ip);

            var callSteps = CallSteps.sync(vendeurId, ip);

            var sbds = SBD.syncSBDFromAPI(vendeurId, ip);

            var quotas = Quotas.sync(vendeurId, ip);

            var planTarifaire = PlanTarifaire.addToDB(vendeurId, ip);

            var stockVendeur = Chargement.employeeStock(vendeurId, ip);

            //var chargementInput = Chargement.syncInput(vendeurId);

            var chargementOutput = Chargement.syncOutput(vendeurId, false, ip);

            //var returns = Retours.sync();

            var dechargementOutput = Chargement.syncOutput(vendeurId, true, ip);
            
            var charakas = Charaka.syncFromAPI(vendeurId, ip);
            
            var stockClient = StockConcurrent.out(vendeurId, ip);

            var clientsResponses=Surveys.getClientsResponses(vendeurId);

            var quotasClients = Quotas.syncClients(vendeurId, ip);

            var echanges = EchangeService.sync(vendeurId);

            //Position = 0-16

            return $q.all(new Array(inputData, outputData, surveys, methodePaiements, promotions, callSteps, sbds, quotas, planTarifaire, stockVendeur, /*chargementInput,*/ chargementOutput, /* returns,*/dechargementOutput, charakas, stockClient, clientsResponses, quotasClients, echanges));
        }

        function maxOfEach(idVendeur) {
            var activite;
            var profile = window.localStorage.getItem("profile");
            profile = JSON.parse(profile || "{}");
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            if(profile != null)
            {
                activite = profile.activite || 0;
            }
            var sql_query = "SELECT ifnull((SELECT timestamp FROM marque WHERE activite = ? AND societe = ? ORDER BY timestamp DESC LIMIT 1), 0) as max_marque, ifnull((SELECT timestamp FROM articles WHERE activite = ? AND societe = ? ORDER BY timestamp DESC LIMIT 1), 0) as max_articles, ifnull((SELECT m.timestamp FROM missions m WHERE m.route_id IN (SELECT r.id_db FROM routes r WHERE r.vendeur = ? AND societe = ? AND activite = ?) ORDER BY m.timestamp DESC LIMIT 1),0) AS max_missions, ifnull((SELECT c.timestamp FROM clients c WHERE c.route IN (SELECT r.id_db FROM routes r WHERE r.vendeur = ? AND societe = ? AND activite = ?) ORDER BY c.timestamp DESC LIMIT 1),0) AS max_clients, ifnull((SELECT timestamp from routes r WHERE r.vendeur = ? AND societe = ? AND activite = ? ORDER BY r.timestamp DESC LIMIT 1), 0) as max_routes;";
            console.log(sql_query);
            var bindings = [activite, tenant_id, activite, tenant_id, idVendeur, tenant_id, activite, idVendeur, tenant_id, activite, idVendeur, tenant_id, activite];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return DB.fetch(success);
                },
                function (error) {
                    return error;
                });
        }

        function wireSyncOutput() {
            var deferred = $q.defer();

            return deferred.promise;
        }

        function gatherSyncOutputData(idVendeur, wire) {
            var infos = JSON.parse(window.localStorage["profile"] || "{}");

            var deferred = $q.defer();
            var data = {
                maxClient: 0,
                maxItem: 0,
                maxMarque: 0,
                maxRoute: 0,
                maxMission: 0
            };

            maxOfEach(idVendeur).then(
                function (success) {

                    console.log(success);

                    if (success == null) {
                        deferred.resolve(data);
                    }
                    else {
                        data.maxClient = typeof success.max_clients != "undefined" ? success.max_clients : data.maxClient;
                        data.maxRoute = typeof success.max_routes != "undefined" ? success.max_routes : data.maxRoute;
                        data.maxMission = typeof success.max_missions != "undefined" ? success.max_missions : data.maxMission;
                        data.maxItem = typeof success.max_articles != "undefined" ? success.max_articles : data.maxItem;
                        data.maxMarque = typeof success.max_marque != "undefined" ? success.max_marque : data.maxMarque;

                        if (wire) {
                            syncCommandes(idVendeur)
                                .then(
                                    function (commandes) {

                                        data.commandes = commandes;

                                        var synchDetails = {};

                                        synchDetails.factureIncrement = infos.factureIncrement || 0;

                                        Chargement.employeeStock(idVendeur)
                                            .then(
                                                function (stock) {

                                                    if (!stock.length > 0) {
                                                        synchDetails.stocks = [];
                                                    }
                                                    else {
                                                        synchDetails.stocks = stock;
                                                    }
                                                    data.synchDetails = synchDetails;
                                                    deferred.resolve(data);

                                                },
                                                function (emptyArray) {

                                                    synchDetails.stocks = emptyArray;
                                                    data.synchDetails = synchDetails;
                                                    deferred.resolve(data);

                                                });


                                    }, function (error) {
                                        data.commandes = [];
                                        deferred.resolve(data);
                                    });
                        }
                        else {
                            deferred.resolve(data);
                        }
                    }
                },
                function (error) {
                    console.log("TOOK THE DEFAULT ONE !");
                    deferred.resolve(data);
                });
            return deferred.promise;
        }

    })

    .factory("Profile", function (DB) {

        return {
            getProfile: getProfile,
            addProfile: addProfile,
            getGPAccount: getGPAccount,
            updateGPAccount: updateGPAccount,
            getProfiles: getProfiles

        };

        function addProfile(profile) {
            var sql_query = "INSERT INTO profiles(name, second_name, address, email_address, phone_number, id_account) values(?,?,?,?,?,?);";
            var bindings = [profile.name, profile.second_name, profile.address, profile.email_address, profile.phone_number, profile.id_account];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                },
                function (error) {
                    return error;
                });
        }

        function getProfile(account_id) {
            var sql_query = "SELECT * FROM profiles WHERE id = ?";
            var bindings = [account_id];
            return DB.query(sql_query, bindings)
                .then(
                    function (profile) {
                        return DB.fetch(profile);
                    },
                    function (error) {
                        return error.message;
                    })
        }

        function getProfiles() {
            console.log("inside getProfiles");
            var sql_query = "SELECT * FROM profiles";
            return DB.query(sql_query)
                .then(
                    function (profiles) {
                        console.log("Success getProfiles();");
                        console.log("674 :" + JSON.stringify(profiles));
                        return DB.fetchAll(profiles);
                    },
                    function (error) {
                        console.log("Erreur getProfiles();");
                        console.log(JSON.stringify(error));
                        return error;
                    })
        }

        function getGPAccount() {
            var sql_query = "SELECT golden_points FROM profiles WHERE id = 1";

            return DB.query(sql_query)
                .then(
                    function (profile) {
                        return DB.fetch(profile);
                    },
                    function (error) {
                        return error.message;
                    })
        }

        function updateGPAccount(value) {
            var sql_query = "UPDATE golden_points SET golden_points = ? WHERE id = 1";
            var bindings = [value];
            return DB.query(sql_query)
                .then(
                    function (profile) {
                        return DB.fetch(profile);
                    },
                    function (error) {
                        return error.message;
                    })
        }
    })
    .factory('DumpDB', function (DB) {
        return {
            dump: dump
        };
        function dump(array) {
            angular.forEach(array, function (request) {
                DB.query(request).then(function (success) {
                    console.log(JSON.stringify(success))
                }, function (success) {
                    console.log(JSON.stringify(success))
                });
            })
        }
    })
    .factory("SBD", function (DB, $http, $q) {
        return {
            getNonConsumedSBDs: getNonConsumedSBDs,
            syncSBDFromAPI: syncSBDFromAPI,
            SBDTreatment: SBDTreatment,
            sbdConsumed: sbdConsumed
        };


        function getNonConsumedSBDs() {
            var ids = [];
            var sbds = JSON.parse(window.localStorage['sbd'] || "[]");
            for (var i = 0, len = sbds.length; i < len; i++) {
                var sbd = sbds[i];
                if (!sbd.consumed) {
                    for (var j = 0, _len = sbd.articles.length; j < _len; j++) {
                        var articleId = sbd.articles[j].id;
                        ids.push(articleId);
                    }
                }
            }
            sbds = null;
            return ids;
        }

        function getArticleQty(article) {
            /*f(article.uniteMesure == "CS")
             {

             return (article.unit / article.unitConversion) + article.packet;
             }
             else
             {

             return (article.packet * article.unitConversion) + article.unit ;
             }*/
            return (article.packet * article.unitConversion) + article.unit;
        }

        function sbdConsumed(id) {
            var sbds = JSON.parse(window.localStorage['sbd'] || "[]");
            for (var i = 0, len = sbds.length; i < len; i++) {
                var sbd = sbds[i];
                if (id == sbd.id && sbd.consumed) {
                    return true;
                }
                else {
                    continue;
                }
            }
            sbds = null;
            return false;
        }

        function SBDTreatment(item) {
            var sbds = JSON.parse(window.localStorage['sbd'] || '[]');
            for (var i = 0, len = sbds.length; i < len; i++) {
                var sbd = sbds[i];
                if (item.groupeSBD == sbd.id) {
                    var total = 0;
                    for (var j = 0, len = sbd.articles.length; j < len; j++) {

                        var sbdArticle = sbd.articles[j];
                        if (sbdArticle.id == item.id_db) {
                            //Now that the condition is true we should modiy the qty in the inner article of items's group
                            //Set the qty of the item
                            var qty = getArticleQty(item);
                            sbdArticle.qty = qty;
                        }
                        total += sbdArticle.qty;
                    }
                    sbd.consumed = (total >= sbd.min);
                    window.localStorage['sbd'] = JSON.stringify(sbds);
                    //Now that all the modifications are setted then we must exit !!
                    //Because an item can be found in only one SBD group so one time tie found there is no
                    //need to continue the iteration ...
                    return;
                }
                else {
                    // I know it's unuseful but i like it ;)
                    continue;
                }
            }
        }

        function syncSBDFromAPI(vendeurId, ip) {

            var deferred = $q.defer();
            var request = {
                url: 'http://'+ip+'/newsales/rest/classes/getAllClasseVerboseDTOs',
                //url: 'http://192.168.100.180:8082/newsales/rest/classes/getAllClasseVerboseDTOs',
                method: 'GET'
            };
            $http(request).then(
                function (success) {
                    console.log(success);
                    angular.forEach(success.data, function (classe) {
                        var id = classe.classeId || 0;
                        addSBDToDB(classe.classeTitle, classe.groupes, id);
                    });
                },
                function (error) {
                    deferred.reject(error);
                });

            deferred.resolve("OK");
            return deferred.promise;
        }

        function addSBDToDB(classeTitle, groupes, classeId) {
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            var sql_query = "INSERT INTO groupes_sbd(id_db, qte_min, classe, classe_id, societe, activite) VALUES(?,?,?,?,?,?);";
            angular.forEach(groupes, function (groupe) {
                var bindings = [groupe.id, groupe.qtyMin, classeTitle, classeId, tenant_id, activite];
                DB.query(sql_query, bindings).then(
                    function (success) {
                        console.log("THE GROUPE HAS BEEN ADDED successfully ! waiting for article bindings");
                        console.log(success);
                        angular.forEach(groupe.itemIds, function (itemId) {
                            addArticleSBD(itemId, groupe.id, tenant_id, activite).then(
                                function (success) {
                                    console.log("ARTICLE_SBD ADDED successfully");
                                    console.log(success);
                                },
                                function (error) {
                                    console.log(error);
                                });
                        });
                    },
                    function (error) {
                        console.log(error);
                    });
            });
        }

        function addArticleSBD(idArticle, idGroupe, societe, activite) {
            var sql_query = "INSERT INTO article_sbd(id_groupe_sbd, id_article, societe, activite) VALUES(?, ?, ?, ?);";
            var bindings = [idGroupe, idArticle, societe, activite];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                },
                function (error) {
                    return error;
                });
        }
    })

    .factory("Timbre", function (DB, $q, DateUtilities, $http) {

        return {
            sync: sync,
            getTimbre: getTimbre
        };
        function getTimbre(){
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var deferred = $q.defer();

            var sql_query="select * from timbre where societe=? and activite= ?";

            var bindings=[tenant_id,activite];

                DB.query(sql_query,bindings).then(
                function (success) {
                    deferred.resolve(DB.fetch(success));
                },
                function (error) {
                    deferred.resolve({});
                });

            return deferred.promise;

        }



        function deleteTimbre(societe,activite) {
            var sql_query = "DELETE from timbre WHERE societe=? and activite=?;";
            var bindings = [societe,activite];
            var deferred = $q.defer();
            return DB.query(sql_query, bindings).then(
                function (result) {
                    console.log("deleteTimbre done");
                    deferred.resolve(result);
                },
                function (error) {
                   console.log("Une erreur est survenu : " + error.message);
                    deferred.resolve([]);
                });
            return deferred.promise;
        }

        function sync(timbreDetails){
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            console.log("timbre 44",timbreDetails);
            var percentage=timbreDetails.percentage || 0.25;
            var type=timbreDetails.type || 2;
            var value=timbreDetails.value || 20000;
        /*    var deleted=deleteTimbre(societe,activite);*/

            var deferred = $q.defer();

            var sql_query="insert into timbre('percentage','type','value','societe','activite') values (?,?,?,?,?)";

            var bindings=[percentage,type,value,tenant_id,activite];
            deleteTimbre(tenant_id,activite).then(
            DB.query(sql_query,bindings)).then(
                function (success) {
                    console.log("done");
                    deferred.resolve(success);
                },
                function (error) {
                    deferred.resolve([]);
                });

            return deferred.promise;

        }

    })

    .factory("GPS", function () {

        return {

            near: near,
            rad: rad,
            distance: distance

        };

        function near(currentPosition, perimeter, input) {
            var output = [];
            for (var i = 0, len = input.length; i < len; i++) {
                var client = input[i];
                var clientPosition = {
                    lat: client.latitude || 0,
                    lng: client.longitude || 0
                };

                if (distance(currentPosition, clientPosition, perimeter)) {
                    output.push(client);
                }
            }
            return output;
        }

        function rad(x) {
            return x * Math.PI / 180;
        }

        function distance(p1, p2, limit) {
            // FROM STACKOVERFLOW
            // HAVERSINE FORMULA
            // http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3

            var R = 6378137; // Earth’s mean radius in meter

            var dLat = rad(p2.lat - p1.lat);
            var dLong = rad(p2.lng - p1.lng);

            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);

            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;

            return d <= limit; // returns the distance in meter
        }

    })

    .factory("LignesCommandes", function (DB) {
        return {
            getAllCommandes: getAllCommandes,
            getCommandeByMission: getCommandeByMission,
            getCommandesByClient: getCommandeByClient,
            getAllLigneCommandesByCommande: getAllLigneCommandesByCommande,
            getLivreurMission: getLivreurMission
        };

        function findArticleInLastCommande(_idCommande, _idArticle) {
            var sql_query = "SELECT * FROM ligneCommandes WHERE id_commande = ? AND id_article = ?;";
            var bindings = [_idCommande, _idArticle];
            return DB.query(sql_query, bindings).then(
                function (ligneCommande) {
                    return DB.fetch(ligneCommande);
                },
                function (error) {
                    return error;
                });
        }

        function findMarqueInLastCommande() {

        }

        function getAllLigneCommandesByCommande(id_commande) {

            var sql_query = "SELECT * FROM ligneCommandes WHERE id_commande = ?";
            var bindings = [id_commande];
            return DB.query(sql_query, bindings).then(
                function (lignesCommandes) {
                    return DB.fetchAll(lignesCommandes);
                },
                function (error) {
                    return error;
                }
            );
        }

    })
    .service('EntryPoint', function ($q, Timbre, Promotions, Articles, Surveys, Clients, DB, Charaka, ModePaiement) {



        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        var activite = profile.activite || 0;
        var parametrage = profile.parametrage || {};
        var company = parametrage.company || {};
        var tenant_id = company.id || 0;

        return {

            prepare: prepare,
            prepareEchange: prepareEchange,
            combineThemAll: combineThemAll,
            promise1: promise1,
            promise2: promise2,
            promise3: promise3,
            promise4: promise4,
            promise5: promise5,
            promise6: promise6,
            promise7: promise7,
            promise8: promise8

        };

        function prepareEchange(clientId) {
            var methodePaiements = promise7(clientId);
            return $q.all(new Array(methodePaiements));
        }

        function promise1(clientId) {
            var deferred = $q.defer();
            Clients.getClient(clientId, tenant_id, activite).then(
                function (success) {

                    var object = JSON.parse(window.localStorage['mission'] || '{}');
                    object.nom = success.nom + " " + success.prenom;
                    object.codeClient = success.code_client;
                    object.region = "GRAND CASABLANCA";
                    object.route_id = success.route;
                    object.ville = "CASABLANCA";
                    object.adresse = success.address;
                    window.localStorage['mission'] = JSON.stringify(object);
                    console.log("Promise1 OK !");
                    deferred.resolve("Promise1 OK !");
                },
                function (error) {
                    console.log("Promise1 OK !");
                    console.error("Getting user infos : promise 1 ", error);
                    window.localStorage['client'] = '{}';
                    deferred.resolve("Promise1 OK !")
                });
            return deferred.promise;
        }

        function promise2(clientId) {
            var deferred = $q.defer();
            var mission = JSON.parse(window.localStorage["mission"] || "{}");
            var firstEntry = {mission: typeof mission.id_mission == "undefined" ? null : mission.id_mission, items: []};
            //INITIALIZE THE CART !!
            if (typeof window.localStorage["cart"] == "undefined") {
                window.localStorage["cart"] = JSON.stringify(firstEntry);
                console.log("Promise2 OK !");
                deferred.resolve("Promise2 OK!");
            }
            else {
                console.log("Promise1 OK !");
                deferred.resolve("Promise2 OK!");
            }
            return deferred.promise;
        }

        function promise3(clientId) {
            //INITIALIZE THE SURVEYS !!
            var deferred = $q.defer();
            if (typeof window.localStorage["surveys"] == "undefined") {
                Surveys.getFormattedSurveys().then(
                    function (surveys) {
                        window.localStorage["surveys"] = JSON.stringify(surveys);
                        console.log("Promise3 OK !");
                        deferred.resolve("Pomise3 OK!");
                    },
                    function (error) {
                        console.error("Getting user surveys : promise 3 ", error);
                        window.localStorage["surveys"] = JSON.stringify([]);
                        console.log("Promise3 OK !");
                        deferred.resolve("Pomise3 OK!");
                    });
            }
            else {
                deferred.resolve("Pomise3 OK!");
            }
            return deferred.promise;
        }

        function promise4(clientId) {
            var deferred = $q.defer();
            //INITIALIZE THE PROMOTIONS !!
            console.log("BEGIN OF TROUBLE");
            if (typeof window.localStorage["promotions"] == "undefined") {

                Promotions.getClientPromotions(clientId).then(
                    function (result) {
                        var articles = [];
                        var promotions = [];
                        angular.forEach(result, function (promotion, index) {

                            promotion.articles = promotion.articles != null ? JSON.parse(promotion.articles) : [];
                            promotion.inclusions = promotion.inclusions != null ? JSON.parse("[" + promotion.inclusions + "]" || "[]") : [];
                            promotion.exclusions = promotion.exclusions != null ? JSON.parse("[" + promotion.exclusions + "]" || "[]") : [];
                            promotion.gratuites = promotion.gratuites != null ? JSON.parse(promotion.gratuites || "[]") : [];
                            promotion.promotion_palier = JSON.parse(promotion.promotion_palier || "[]");
                            promotion.once = JSON.parse(promotion.once || "false");

                            if ((promotion.type == "PR") || (promotion.type == "PP" && promotion.articles.length == 0 && promotion.once )) {
                                promotion.consumed = true;
                                promotion.cumule = 1;
                            }

                        });
                        window.localStorage["promotions"] = JSON.stringify(result);
                        console.log("Promise4 OK !");
                        deferred.resolve("Pomise4 OK!");
                    },
                    function (error) {
                        window.localStorage["promotions"] = "[]";
                        console.log("Promise4 OK !");
                        deferred.resolve("Pomise4 OK!");
                    });
            }
            else {
                console.log("Promise4 OK !");
                deferred.resolve("Pomise4 OK!");
            }
            return deferred.promise;
        }

        function promise5(clientId) {
            var deferred = $q.defer();

            if (typeof(window.localStorage['sbd']) == 'undefined') {
                Articles.getArticleWithSBD(clientId).then(
                    function (result) {

                        var sbds = [];
                        angular.forEach(result, function (sbd) {

                            var object = {};
                            object.id = sbd.id;
                            object.min = sbd.min;
                            object.consumed = false;
                            sbd.articles = JSON.parse("[" + sbd.articles + "]");
                            object.articles = [];

                            angular.forEach(sbd.articles, function (_id) {

                                var article = {
                                    id: _id,
                                    qty: 0
                                };

                                object.articles.push(article);

                            });

                            sbds.push(object);

                        });

                        window.localStorage['sbd'] = JSON.stringify(sbds);
                        console.log("Promise5 OK !");
                        deferred.resolve("Promise5 OK!");
                    },
                    function (error) {
                        console.error("Getting user sbd : promise 5 ", error);
                        console.log("Promise5 OK !");
                        deferred.resolve("Promise5 OK!");
                    });
            }
            else {
                deferred.resolve("Promise5 OK!");
            }

            return deferred.promise;
        }

        function promise6(clientId) {
            var deferred = $q.defer();
            var charakas = [];
            Charaka.get(clientId).then(
                function (success) {
                    window.localStorage["charakas"] = JSON.stringify(success);
                    console.log("Promise6 OK !");
                    deferred.resolve("Promise6 OK!");
                },
                function (error) {
                    console.error("Getting user charakas : promise 6 ", error);
                    window.localStorage["charakas"] = JSON.stringify(charakas);
                    console.log("Promise6 OK !");
                    deferred.resolve("Promise6 OK!");
                });
            return deferred.promise;
        }

        function promise7(clientId) {
            var deferred = $q.defer();
            ModePaiement.getAll(clientId, tenant_id, activite).then(function(success) {
                console.log(success);
                window.localStorage["methode_paiement"] = JSON.stringify(success);
                console.log("Promise7 OK !");
                deferred.resolve("Promise7 OK!");
            }, function(error){
                console.log("Promise7 OK !");
                window.localStorage["methode_paiement"] = "[]";
                deferred.resolve("Promise7 OK !");
                console.error("Getting user payments : promise 7 ", error);
            });
            return deferred.promise;
        }

        function promise8() {
            var deferred = $q.defer();
            Timbre.getTimbre().then(function(success) {
                window.localStorage["timbre"] = JSON.stringify(success || {});
                deferred.resolve("Promise8 OK!");
            }, function(error){
                window.localStorage["timbre"] = "{}";
                deferred.resolve("Promise 8", error);
            });
            return deferred.promise;
        }

        function combineThemAll(clientId) {
            return $q.all(new Array( promise1(clientId), promise2(clientId), promise3(clientId), promise4(clientId), promise5(clientId), promise6(clientId), promise7(clientId), promise8() ));
        }

        function prepare(clientId, livreur) {
            return combineThemAll(clientId);
        }

    })
    .factory("PrinterService", function ($q, $filter, DateUtilities) {

        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        var parametrage = profile.parametrage || {};
        var society = parametrage.societe || {};
        var societyName = society.name || "DISLOG GROUP";

        // All titles proper to the receips 200
        var constants =
            "L 2 109 828 109 2\r\n" +
            "T 5 0 10 347 Nom client :\r\n" +
            "T 5 0 10 321 Code client :\r\n" +

            "T 5 0 10 234 Route :\r\n" +
            "T 5 0 10 260 Region :\r\n" +

            "T 5 0 10 399 Ville :\r\n" +

            "T 5 0 260 454 Commande No :\r\n" +
            "T 5 0 10 372 Adresse :\r\n" +

            'T 4 1 248 28 ' + societyName + '\r\n' +
            "T 5 0 10 11 Date :" + DateUtilities.convertLongToYYYYMMDD(new Date()) + "\r\n" +
                // LABELS DES LIGNES DE COMMANDES !
            "T 5 0 716 540 MT TTC\r\n" +
            "T 5 0 624 540 PU\r\n" +
            "T 5 0 353 540 C/U\r\n" +
            "T 5 0 484 540 Remise\r\n";
        var constantsStock =
            'L 4 486 818 486 2\r\n' +
            'T 4 1 248 28 ' + societyName + '\r\n' +
            'T 5 0 26 200 Region :\r\n' +
            'T 5 0 26 168 Route :\r\n' +
            'T 5 0 26 139 Vendeur :\r\n' +
            'T 4 0 300 322 Etat du stock\r\n' +
            'T 5 0 721 450 P.U\r\n' +
            'T 5 0 461 450 Caisse\r\n' +
            'T 5 0 574 450 Unite\r\n';
        var constantsChargement =
            'T 5 0 241 338 Chargement No :\r\n' +
            'T 5 0 25 139 Vendeur :\r\n' +
            'T 5 0 25 200 Region :\r\n' +
            'T 5 0 25 275 Magasinier :\r\n' +
            'T 5 0 25 168 Route :\r\n' +
            'T 5 0 623 450 C/U - chargement\r\n' +
            'T 5 0 396 450 C/U - demande\r\n' +
            'T 5 0 6 450 Designation\r\n' +
            'T 4 1 248 28 ' + societyName + '\r\n' +
            'L 4 486 818 486 2\r\n';
        var constantsVentes =
            'L 4 486 818 486 2\r\n' +
            'T 4 1 248 28 ' + societyName + '\r\n' +
            'T 5 0 25 200 Region :\r\n' +
            'T 5 0 26 168 Route :\r\n' +
            'T 5 0 26 139 Vendeur :\r\n' +
            'T 4 0 170 322 Rapport des commandes\r\n' +

            'T 5 0 666 450 Date\r\n' +
            'T 5 0 144 450 Client\r\n' +
            'T 5 0 586 450 Fin\r\n' +
            'T 5 0 492 450 Debut\r\n' +
            'T 5 0 287 450 TTC\r\n' +
            'T 5 0 14 450 Commande\r\n';


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

        var header =
            "PW 831\r\n" +
            "TONE 0\r\n" +
            "SPEED 3\r\n" +
            "ON-FEED IGNORE\r\n" +
            "NO-PACE\r\n" +
            "BAR-SENSE\r\n";


        return {
            formatedContent: formatedContent,
            formatedContentStock: formatedContentStock,
            formattedContentChargement: formattedContentChargement,
            formattedContentVentes: formattedContentVentes, 
            formattedContentEchange: formattedContentEchange
        };

        function formattedContentEchange(input) {

            var deferred = $q.defer();

            var items = input.lignes || [];
            var client = 0;
            var route = "ROUTE001";
            var ville = "MEKNES";
            var pays = "MAROC";
            var nomClient = "JOHN DOE";
            var adresseClient = "4, rue Ahmed Dighoussi ZITOUNE";
            var patenteClient = "PAT0123012";
            var date = "2016-04-09";
            var modalitePaiement = "CHEQUE";
            var codeClient = "CODE007";
            var totalHT = "100, 00";
            var totalTTC = "120, 00";

            var echange_global_print = 
            
            "T 7 0 465 326 CHEQUE \r\n"+
            
            "T 7 0 464 255 " + ville + "\r\n"+
            "T 7 0 568 213 " + patenteClient + "\r\n"+
        
            "T 7 0 464 182 " + adresseClient + "\r\n"+
            
            /*"T 7 0 581 584 " + totalTTC + "\r\n"+
            "T 7 0 581 552 " + totalHT + "\r\n"+*/
            // id vendeur || nom
            "T 7 0 618 122 " + 1 + "\r\n"+
            "T 7 0 463 151 " + nomClient + "\r\n"+
            "T 7 0 167 173 " + date +"\r\n"+
            // num echange
            "T 7 0 423 74 " + 157 + "\r\n"+
            // vendeur id
            "T 7 0 167 122 " + 1 + "\r\n"+
            "T 7 0 168 148 " + route + "\r\n";
            
            
        

        var constants = 
            "! 0 200 200 1800 1\r\n"+
            "PW 831\r\n"+
            "TONE 0\r\n"+
            "SPEED 3\r\n"+
            "ON-FEED IGNORE\r\n"+
            "NO-PACE\r\n"+
            "BAR-SENSE\r\n"+
            "T 5 0 464 292 Modalite de paiement : \r\n"+
            "L 3 109 828 109 1\r\n"+
            "L 3 433 826 433 1\r\n"+
            "T 5 0 560 408 PU\r\n"+
            "T 5 0 680 408 Total TTC\r\n"+
            "T 5 0 460 408 C/U\r\n"+
            "T 5 0 463 216 Patente : \r\n"+
            "T 5 0 11 172 Date :\r\n"+
            
            "T 5 0 464 120 Code client :\r\n"+
            "T 5 0 295 74 Avoir No : \r\n"+
            "T 5 0 10 147 Route :\r\n"+
            "T 5 0 10 121 Vendeur :\r\n"+
            "T 5 0 10 408 Code\r\n"+
            "T 5 0 110 408 Designation\r\n"+
            "T 4 0 326 11 DISLOG\r\n";

        var footer = "PRINT\r\n";

        var variables = "";
        /*    "T 5 0 9 440 varCode\r\n"+
            "T 5 0 520 440 varPrixVente\r\n"+
            "T 5 0 415 440 varCsUn\r\n"+
            "T 5 0 680 440 varTTC\r\n"+
            "T 5 0 175 440 varArticleDesignation\r\n";*/

        var fontSize = "T 7 0 ";
        var startLigne = 450;
        var xCode = 9;
        var xPrixVente = 560;
        var xCsUn = 460;
        var xTTC = 680;
        var xDesignation = 110;

        for(var i = 0 ; i < items.length ; i++) {
            var item = items[i];
            var preQTY = item.prixVente > 0 ? "" : "-";
            item.prixVente = item.prixVente > 0 ? item.prixVente : -1*item.prixVente;
            variables += ( fontSize+""+xCode+" "+startLigne+" "+item.code+"\r\n");
            variables += ( fontSize+""+xDesignation+" "+startLigne+" "+item.nomArticle+"\r\n");
            variables += ( fontSize+""+xPrixVente+" "+startLigne+" "+$filter('number')(item.prixVente, 2)+"\r\n");
            variables += ( fontSize+""+xCsUn+" "+startLigne+" "+preQTY+""+item.packet+", "+item.unit+"\r\n");
            variables += ( fontSize+""+xTTC+" "+startLigne+" "+$filter('number')(item.ttc, 2)+"\r\n");

            startLigne += 30;
        }
        startLigne += 20;
        variables += "T 5 0 520 " + startLigne + " TOTAL H.T : \r\n";
        startLigne += 30;
        variables += "T 7 0 520 " + startLigne + " " + $filter('number')(input.totalHT, 2) + " DHS\r\n";
        startLigne += 50;
        variables += "T 5 0 520 " + startLigne + " TOTAL T.T.C : \r\n";
        startLigne += 30;
        variables += "T 7 0 520 " + startLigne + " " + $filter('number')(input.totalTTC, 2) + " DHS\r\n";

        var finalContent = constants + "" + "" + variables + "" + echange_global_print + "" +footer;

        deferred.resolve(finalContent);
        return deferred.promise;

        
    }

        function formattedContentVentes(commandes) {
            var deferred = $q.defer();

            var xNComm = "14";
            var xClient = "144";
            var xDate = "666";
            var xEntry = "492";
            var xExit = "586";
            var xTOTALTTC = xExit;
            var xVALUETOTALTTC = xExit;
            var xTTC = "287";

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            console.log(JSON.stringify(profile));

            var linesContent =
                'T 5 0 158 201 Grand Casablanca \r\n' +
                'T 5 0 158 170 ' + (profile.route || 1) + ' \r\n' +
                'T 5 0 158 139 ' + profile.name + ' \r\n';

            var startLigne = 500;

            var lengthOfPage = commandes.length > 7 ? Math.ceil(commandes.length / 7) * 1000 : 1000;

            var totalFooter = 0;

            for (var i = 0, len = commandes.length; i < len; i++) {
                var commande = commandes[i];

                //var codeCommande = commande.;

                var nomClient = commande.nom;
                var valueTTC = commande.totalTTC;
                var entry = new Date(commande.entryDate);
                var code = commande.code;
                console.debug(entry);
                var exit = new Date(commande.exitDate);
                var date = commande.date;

                entry = entry.getHours() + ":" + entry.getMinutes();
                exit = exit.getHours() + ":" + exit.getMinutes();
                //date = DateUtilities.convertLongToYYYYMMDD(date);
                totalFooter += valueTTC;

                valueTTC = $filter('number')(valueTTC, 2);

                linesContent += (fontAndSize + ' ' + xNComm + ' ' + startLigne + ' ' + code + ' \r\n');
                linesContent += (fontAndSize + ' ' + xClient + ' ' + startLigne + ' ' + nomClient + ' \r\n');
                linesContent += (fontAndSize + ' ' + xDate + ' ' + startLigne + ' ' + date + ' \r\n');
                linesContent += (fontAndSize + ' ' + xEntry + ' ' + startLigne + ' ' + entry + ' \r\n');
                linesContent += (fontAndSize + ' ' + xExit + ' ' + startLigne + ' ' + exit + ' \r\n');
                linesContent += (fontAndSize + ' ' + xTTC + ' ' + startLigne + ' ' + valueTTC + ' \r\n');

                startLigne += 30;
            }

            totalFooter = $filter('number')(totalFooter, 2);

            startLigne += 30;
            linesContent += ('L 4 ' + startLigne + ' 818 ' + startLigne + ' 2\r\n');
            startLigne += 30;
            linesContent += ('T 5 0 ' + xTOTALTTC + ' ' + startLigne + ' TOTAL TTC \r\n');
            startLigne += 40;
            linesContent += (fontAndSize + ' ' + xVALUETOTALTTC + ' ' + startLigne + ' ' + totalFooter + ' DHS \r\n');


            console.log(constantsVentes);
            deferred.resolve("! 0 200 200 " + lengthOfPage + " 1\r\n" + header + "" + constantsVentes + "" + linesContent + "" + footer);
            return deferred.promise;
        }


        function formattedContentChargement(demande) {
            var deferred = $q.defer();

            var xDesignation = "6";
            var xcSD = "396";
            var xcsC = "623";
            var step = 30;
            var startLigne = 500;

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var linesContent =
                'T 5 0 183 277 NMAG\r\n' +
                'T 5 0 426 338 NCHAR\r\n' +
                'T 5 0 158 201 Grand Casablanca \r\n' +
                'T 5 0 158 170 ' + (profile.route || 1) + ' \r\n' +
                'T 5 0 158 139 ' + profile.name + ' \r\n';


            for (var i = 0, len = demande.lignes.length; i < len; i++) {
                var ligne = demande.lignes[i];
                linesContent += ('T 5 0 ' + xDesignation + ' ' + startLigne + ' ' + ligne.designation + ' \r\n');

                var cuOut = ligne.packetOut + ", " + ligne.unitOut;
                var cuIn = ligne.packetIn + ", " + ligne.unitIn;

                linesContent += (fontAndSize + ' ' + xcSD + ' ' + startLigne + ' ' + cuOut + ' \r\n');
                linesContent += (fontAndSize + ' ' + xcsC + ' ' + startLigne + ' ' + cuIn + ' \r\n');

                startLigne += 30;
            }

            deferred.resolve("! 0 200 200 1000 1\r\n" + header + "" + constantsChargement + "" + linesContent + "" + footer);
            return deferred.promise;
        }


        function formatedContentStock(input) {
            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var route = profile.route || "route";
            var nom = profile.name + " " + profile.second_name;
            var region = profile.region || "Grand Casablanca";

            var lignes = input[0];

            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var stockVars =
                'T 5 0 18 450 Designation(' + lignes.length + ')' + ' \r\n' +
                'T 5 0 158 201 Grand Casablanca \r\n' +
                'T 5 0 158 170 ' + (profile.route || 1) + ' \r\n' +
                'T 5 0 158 139 ' + profile.name + ' \r\n';


            var lengthOfPage = lignes.length > 7 ? Math.ceil(lignes.length / 7) * 800 : 800;

            var xPu = "721";
            var xCs = "461";
            var xUn = "574";
            var xDes = "18";

            var font = "T 5 0";

            //THE WAY TO START !
            var firstStep = 500;

            var formattedLines = "";

            for (var i = 0, len = lignes.length; i < len; i++) {
                var ligne = lignes[i];

                var designation = ligne.designation;
                var caisse = ligne.caisse;
                var unite = ligne.unite;
                var pu = ligne.prixVente;

                formattedLines += (fontAndSize + " " + xDes + " " + firstStep + " " + designation + "\r\n");
                formattedLines += (fontAndSize + " " + xUn + " " + firstStep + " " + unite + "\r\n");
                formattedLines += (fontAndSize + " " + xCs + " " + firstStep + " " + caisse + "\r\n");
                formattedLines += (fontAndSize + " " + xPu + " " + firstStep + " " + pu + "\r\n");

                console.debug(formattedLines);

                firstStep += 30;
            }

            deferred.resolve("! 0 200 200 " + lengthOfPage + " 1\r\n" + header + "" + stockVars + "" + constantsStock + "" + formattedLines + "" + footer);
            return deferred.promise;
        }


        function formatedContent(input, poste) {
            var deferred = $q.defer();
            var count = 1;
            var output = [];
            var lignes = input[0];
            console.log(lignes);
            var mission = input[1];

            var totalHT = $filter('number')(input[2], 2);

            var totalTTC =  input[3] - ( input[3] * ( input[4] / 100 ) );

            totalTTC = $filter('number')(totalTTC, 2);

            var discount = ( input[4] || 0 ) + "%";

            var vendeur = JSON.parse(window.localStorage['profile'] || '{}');

            var addons = "T 5 0 10 209 " + poste + " :\r\n" +
                "T 7 0 150 322 " + mission.codeClient + "\r\n" +
                "T 5 0 10 540 Designation(" + lignes.length + ")\r\n" +
                "T 7 0 150 260 " + mission.region + "\r\n" +
                "T 7 0 150 348 " + mission.nom + "\r\n" +
                "T 7 0 150 235 " + mission.route_id + "\r\n" +
                "T 7 0 150 399 " + mission.ville + "\r\n" +
                "T 7 0 150 373 " + mission.adresse + "\r\n" +
                "T 7 0 437 454 " + (typeof(mission.commande) == "undefined" ? "CM" + DateUtilities.convertLongToYYYYMMDD(new Date()) : mission.commande) + "\r\n" +
                "T 7 0 180 209 " + vendeur.name + " " + vendeur.second_name + "\r\n";

            var startLigneCommande = 570;
            for (var i = 0; i < lignes.length; i++) {
                var test = i + 1;
                if (test % 10 == 0) {
                    count = count + 1;
                }
                var loopOutput = [];
                var ligne = lignes[i];

                console.debug(ligne.ttc);
                var cu = ligne.packet + "/" + ligne.unit;
                var mTTC = ( ( ( ligne.unitConversion * ligne.packet ) + ligne.unit ) * ligne.prixVente );

                mTTC = $filter('number')(mTTC, 2);
                ligne.prixTTC = $filter('number')( (ligne.ttc || 0), 2);
                ligne.remise = $filter('number')( (ligne.remise || 0), 2);
                ligne.prixVente = $filter('number')( (ligne.prixVente || 0), 2);

                loopOutput.push(fontAndSize + " " + xDesignation + " " + startLigneCommande + " " + (typeof(ligne.nomArticle) == "undefined" ? ligne.designation : ligne.nomArticle) + "\r\n");
                loopOutput.push(fontAndSize + " " + xCU + " " + startLigneCommande + " " + cu + "\r\n");
                loopOutput.push(fontAndSize + " " + xRemise + " " + startLigneCommande + " " + ligne.remise + "\r\n");
                loopOutput.push(fontAndSize + " " + xPU + " " + startLigneCommande + " " + ligne.prixVente + "\r\n");
                loopOutput.push(fontAndSize + " " + xMTTTC + " " + startLigneCommande + " " + (typeof(ligne.prixTTC) == "undefined" ? "0.00" : ligne.prixTTC) + "\r\n");
                output = output.concat(loopOutput);
                startLigneCommande += yStep;
            }
            startLigneCommande += 40;
            var preFooter = [];
            for (var i = 0; i < 3; i++) {
                var tempArray;
                if (i == 0) {
                    tempArray = [
                        "T 5 0 " + xFooterTitle + " " + startLigneCommande + " " + "TOTAL HT : \r\n",
                        "T 7 0 " + xFooterValue + " " + startLigneCommande + " " + totalHT + " DHS\r\n"
                    ]
                }
                else if (i == 1) {
                    tempArray = [
                        "T 5 0 " + xFooterTitle + " " + startLigneCommande + " " + "ESCOMPTEMT : \r\n",
                        "T 7 0 " + xFooterValue + " " + startLigneCommande + " " + discount + "\r\n"
                    ]
                }
                else {
                    tempArray = [
                        "T 5 0 " + xFooterTitle + " " + startLigneCommande + " " + "TOTAL TTC : \r\n",
                        "T 7 0 " + xFooterValue + " " + startLigneCommande + " " + totalTTC + " DHS\r\n"
                    ]
                }
                preFooter = preFooter.concat(tempArray);
                startLigneCommande += 40;
            } 

            preFooter.push("T 3 0 10 " + startLigneCommande + "latitude: 7,7845745745\r\n");
            startLigneCommande += 40;
            preFooter.push("T 3 0 10 " + startLigneCommande + "longitude: 33,89957745757\r\n");
            


            // test 400
            deferred.resolve("! 0 200 200 1500 1\r\n" + header + constants + addons + output.join("") + preFooter.join("") + footer);
            return deferred.promise;
        }

    })
    .factory("CallSteps", function (DB, $q, $http) {



        

        return {
            get: get,
            checkForSteps: checkForSteps,
            checkPoint: checkPoint,
            sync: sync,
            hasPreviousButNotCart: hasPreviousButNotCart
        };


        function hasPreviousButNotCart (position){
            var step=position.previousStep;
            return step  && step.name==="app.cart"?false:position.hasPrevious;
        }

        function sync(vendeurId, ip) {
            
            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var activiteId = profile.activite || 0;

            var deferred = $q.defer();
            // DO IT !!!!!!!!!!!!!! "+JSON.parse(window.localStorage["profile"]).activite+"
            $http({
                url: "http://"+ip+"/newsales/rest/screens/activities/" + activiteId + "/mobile",
                method: "GET"
            })
                .then(
                    function (success) {
                        console.log(success);
                        var addonsSteps = [];
                        var requests = [];
                        var steps = success.data.content;
                        for (var i = 0; i < steps.length; i++) {
                            var step = steps[i];
                            addonsSteps.push('("", "' + step.urlName + '", ' + step.order + ', ' + tenant_id + ', ' + activite + ')');
                        }
                        if (addonsSteps.length > 0) {
                            requests.push("DELETE FROM call_steps WHERE activite = " + activite + " AND societe = " + tenant_id + ";");
                            requests.push("INSERT INTO call_steps(title, name, rank, societe, activite) VALUES " + addonsSteps.join(", ") + ";");
                            //requests.push('INSERT INTO call_steps(title, name, rank) VALUES ("", "app.prelevement", 1), ("", "app.retour", 2), ("", "app.brands", 3), ("", "app.brandfive", 4), ("", "app.cart", 5);');

                        }
                        deferred.resolve(requests);
                    },
                    function (error) {
                        deferred.resolve([]);
                    });
            return deferred.promise;
        }

        function checkPoint() {
            var deferred = $q.defer();
            var otherwise = "";
            var callSteps = JSON.parse(window.localStorage['callSteps'] || '[]');
            for (var i = 0; i < callSteps.length; i++) {
                if (callSteps[i].active) {
                    deferred.resolve(callSteps[i].name)
                }
                if (callSteps[i].rank == 1) {
                    otherwise = callSteps[i].name;
                }
            }
            deferred.resolve(otherwise);
            return deferred.promise;
        }

        function checkForSteps(state_name) {
            console.log("HEEEERE");
            var deferred = $q.defer();
            var callSteps = JSON.parse(window.localStorage['callSteps'] || '[]');
            if (!callSteps.length > 0) {
                deferred.resolve({});
                return deferred.promise;
            }
            // TO GET INFORMATIONS ABOUT THE LAST STEP !
            var lastStep = {rank: callSteps[0].rank, name: callSteps[0].name, title: callSteps[0].title};
            // TO GET INFORMATIONS ABOUT THE FIRST STEP !
            var firstStep = {rank: callSteps[0].rank, name: callSteps[0].name, title: callSteps[0].title};
            var currentStep = 0;
            var found = false;
            var object = {};
            for (var i = 0; i < callSteps.length; i++) {
                if (callSteps[i].name == state_name) {
                    // SET TO FOUND
                    found = true;
                    // SET CURRENT STEP TO ACTIVE FOR CHECKPOINT !!
                    callSteps[i].active = true;
                    // GATHER THE CURRENT STEP !!
                    object.currentStep = {rank: callSteps[i].rank, name: callSteps[i].name, title: callSteps[i].title};
                    currentStep = callSteps[i].rank;
                    for (var j = 0; j < callSteps.length; j++) {
                        if (callSteps[j].rank > callSteps[i].rank) {
                            // GATHER THE NEXT STEP !!
                            if ((callSteps[j].rank - callSteps[i].rank) == 1) {
                                object.nextStep = {
                                    rank: callSteps[j].rank,
                                    name: callSteps[j].name,
                                    title: callSteps[j].title
                                };
                            }
                        }
                        if (callSteps[j].rank < callSteps[i].rank) {
                            // GATHER THE PREVIOUS STEP !!
                            if ((callSteps[j].rank - callSteps[i].rank) == -1) {
                                object.previousStep = {
                                    rank: callSteps[j].rank,
                                    name: callSteps[j].name,
                                    title: callSteps[j].title
                                };
                            }
                        }
                    }
                }
                else {
                    callSteps[i].active = false;
                }
                if (callSteps[i].rank > lastStep.rank) {
                    lastStep.rank = callSteps[i].rank;
                    lastStep.name = callSteps[i].name;
                    lastStep.title = callSteps[i].title;
                    object.lastStep = lastStep;
                }
                if (callSteps[i].rank < firstStep.rank) {
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

        function get() {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            console.log(JSON.stringify(profile));
            var sql_query = "SELECT * FROM call_steps WHERE societe = " + tenant_id + " AND activite = " + activite + " ORDER BY id ASC;";
            console.log(sql_query);
            return DB.query(sql_query).then(
                function (success) {
                    return DB.fetchAll(success);
                },
                function (error) {
                    return error;
                });
        }

    })

    .factory("Stock", function (DB, $q) {

        return {
            get: get,
            recoverItemsWithNoValues: recoverItemsWithNoValues
        };

        function recoverItemsWithNoValues(items) {

            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var found = false;

            angular.forEach(items, function (item) {

                found = false;
                if ( ( ( (!item.packet > 0) && (!item.unit > 0) ) || item.needRecovery == true ) && item.recovery > 0) {
                    console.debug("ONLY : ")
                    console.debug(item);
                    found = true;
                    var sql_query = "UPDATE STOCK SET total = total + " + item.recovery + " WHERE item = " + item.id_db + " AND employee_id = " + profile.id_db + " AND prelevement = 0 AND activite = " + activite + " AND societe = " + tenant_id + ";";
                    DB.query(sql_query).then(
                        function (success) {
                            console.debug(success);
                            deferred.resolve(success);
                        },
                        function (error) {
                            console.debug(error);
                            deferred.reject(error);
                        });
                }

            });
            if (found == false) {
                deferred.resolve("CLEAN !");
            }
            return deferred.promise;

        }

        function get(vendeurId) {
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query = "SELECT A.prixVente as prixVente, ifnull(SUH.total / A.unitConversion, 0) as packet, ifnull(SUH.total % A.unitConversion, 0) as unit, ifnull(SUH.total, 0) as recovery, 0 as flag, A.id_db, A.code, SUM(ST.total+(ifnull(SUH.total, 0))) as totalStock, A.nomArticle as designation, A.unitConversion FROM stock AS ST LEFT JOIN articles AS A ON A.id_db = ST.item AND A.societe = " + tenant_id + " AND A.activite = " + activite + " LEFT JOIN chargement_vendeur_lignes AS CVL ON CVL.item_id = ST.item AND CVL.chargement = 0 AND CVL.dechargement = 1 LEFT JOIN chargement_vendeur AS CV ON CV.vendeur_id = ? AND CV.societe = " + tenant_id + " AND CV.activite = " + activite + " AND CV.id = CVL.chargement_id AND CV.state = 0 AND CV.dechargement = 1 AND CV.chargement = 0 LEFT JOIN stock_update_history AS SUH ON SUH.chargement_id = CV.id AND SUH.chargement_ligne_id = CVL.id WHERE ST.employee_id = ? AND ST.societe = " + tenant_id + " AND ST.activite = " + activite + " GROUP BY ST.item;";
            var bindings = [vendeurId, vendeurId];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return DB.fetchAll(success);
                },
                function (error) {
                    return error;
                });
        }

    })

    .factory("Livreur", function ($http, DB, $q, Missions, Clients, Commandes, LigneCommandes) {


        function cancelLivreurMission(idMission) {
            var sql_query = "UPDATE missions_livreur SET state = 2 WHERE id_db = ?;";
            var bindings = [idMission];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success
                },
                function (error) {
                    return error;
                });
        }

        function getHighestInDB(idVendeur) {
            //First get the highest mission in local db !
            var sql_query = "SELECT id_db FROM missions_livreur WHERE livreur = ? ORDER BY id_db DESC LIMIT 1;";
            var bindings = [idVendeur];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return DB.fetch(success);
                },
                function (error) {
                    return error;
                });
        }


        function getHighestInApi(_idLivreur) {
            var request = {
                url: "http://197.230.28.154:81/newsales/rest/livreurs/" + _idLivreur + "/missions/check",
                method: "GET"
            };
            return $http(request);
        }

        function getAllFromApi(_idLivreur) {
            var request = {
                url: "http://197.230.28.154:81/newsales/rest/livreurs/" + _idLivreur + "/missions",
                method: "GET"
            };
            return $http(request);
        }


        function getFromAPointApi(_idLivreur, point) {
            var request = {
                url: "http://197.230.28.154:81/newsales/rest/livreurs/" + _idLivreur + "/missions/from/" + point,
                method: "GET"
            };
            return $http(request);
        }

        function addMissionsSpecialLivreur(missions, _idLivreur) {
            angular.forEach(missions, function (mission) {
                Clients.getClient(mission.client.id).then(
                    function (success) {
                        if (success == null) {
                            console.log(mission.client);
                            Clients.addClientLivreur(mission.client).then(
                                function (success) {
                                    console.log(success);
                                },
                                function (error) {
                                    console.log(error);
                                });
                        }
                    },
                    function (error) {
                        console.log(error);
                    });

                var object = {
                    id: mission.id,
                    codeMission: mission.codeMission,
                    client: mission.client.id
                };
                Missions.addMissionLivreur(object, _idLivreur).then(
                    function (success) {
                        console.log(success);
                        Commandes.addCommandeLivreur(mission.commande.id, "CE" + Date.now(), mission.id, mission.client.id).then(
                            function (success) {
                                console.log(success);
                                angular.forEach(mission.commande.lignesCommandes, function (ligne) {
                                    var ligneCommande = {
                                        id: ligne.item.id,
                                        unit: ligne.unite,
                                        packet: ligne.paquet,
                                        prixVente: ligne.item.salePrice
                                    };
                                    LigneCommandes.addLigneCommandeLivreur(ligneCommande, mission.commande.id).then(
                                        function (success) {
                                            console.log(success);
                                        },
                                        function (error) {
                                            console.log(error);
                                        });
                                });

                            },
                            function (error) {
                                console.log(error);
                            });
                    },
                    function (error) {
                        console.log(error);
                    });


            });
        }

        function getLivreurMission(_idLivreur) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query = 'SELECT ML.print_content, ML.id_db as missionId, ML.id as id_mission, ML.state AS state,  ML.code_mission, CLI.id_db as clientId, CLI.id_db as client_id, CLI.nom AS nom, CLI.address AS address, CLI.prenom AS prenom, CL.code_commande, CL.id_db AS id_commande, "["||Group_Concat("{ ""id_db"": "||LCL.id_article|| ", ""remise"": " || ifnull(LCL.remise, 0) || ", ""groupeSBD"": " || ifnull(GSBD.id_db, 0) || ", ""tva"": " || ART.tva || ", ""isGift"": " || ifnull(LCL.isGift, 0) || ", ""totalStock"": " || ifnull((SELECT total FROM stock WHERE item = LCL.id_article AND employee_id = ? AND societe = ' + tenant_id + ' AND activite = ' + activite + '), 0) || ", ""nomArticle"": """||ART.nomArticle || """, ""uniteMesure"": """||ART.uniteMesure||""", ""unit"": "||LCL.unit||", ""promotions"": [" || ifnull((SELECT Group_Concat(P.id_db) FROM articles AS A LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id AND p.activite = ' + activite + ' AND P.societe = ' + tenant_id + ' WHERE A.id_db = LCL.id_article), "") ||"],  ""prixVente"": "||ART.prixVente||", ""unitConversion"": " || ART.unitConversion || ", ""packet"": "||LCL.packet||" }")||"]" as lignes from missions AS ML JOIN clients AS CLI ON CLI.id_db = ML.client_id AND CLI.societe = ' + tenant_id + ' AND CLI.activite = ' + activite + ' JOIN commandes AS CL ON CL.id_mission = ML.id_db JOIN ligneCommandes AS LCL ON LCL.id_commande = CL.id_db JOIN articles AS ART ON ART.id_db = LCL.id_article AND ART.activite = ' + activite + ' AND ART.societe = ' + tenant_id + ' LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = ART.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd AND GSBD.activite = ' + activite + ' AND GSBD.societe = ' + tenant_id + ' WHERE ML.livreur = ? AND LCL.isGift = 0 GROUP BY ML.id_db;';
            var bindings = [_idLivreur, _idLivreur];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    console.log(success);
                    return DB.fetchAll(success);
                },
                function (error) {
                    console.error(error);
                    return error;
                });
        }

        function synchronization(_idLivreur) {
            //First we get the local highest id !
            var highestIDDB;
            var highestIDAPI;
            getHighestInDB(_idLivreur).then(
                function (success) {
                    console.log(success);
                    if (success == null) {
                        getAllFromApi(_idLivreur).then(
                            function (success) {
                                addMissionsSpecialLivreur(success.data, _idLivreur);
                            },
                            function (error) {
                                return error;
                            });
                    }
                    else {
                        highestIDDB = success.id_db;
                        getHighestInApi(_idLivreur).then(
                            function (success) {
                                highestIDAPI = success.data;
                                if (highestIDAPI > highestIDDB) {
                                    console.log("MISSIONS REMAINING FOR LIVREUR !");
                                    getFromAPointApi(_idLivreur, highestIDDB).then(
                                        function (success) {
                                            addMissionsSpecialLivreur(success.data, _idLivreur);
                                        },
                                        function (error) {
                                            console.log(error);
                                        })
                                }
                            },
                            function (error) {
                                console.log(error);
                            });
                    }
                },
                function (error) {
                    console.log(error);
                });
        }


        return {
            synchronization: synchronization,
            getLivreurMission: getLivreurMission,
            cancelLivreurMission: cancelLivreurMission
        };

    })

    .factory("RollBack", function (DB, $q) {

        return {
            mission: mission
        };

        function updates(queries) {
            var deferred = $q.defer();

            angular.forEach(queries, function (sql_query) {
                DB.query(sql_query).then(
                    function (success) {
                        deferred.resolve(success);
                    },
                    function (error) {
                        deferred.reject(error);
                    });
            });

            return deferred.promise;
        }

        function mission(error) {
            var deferred = $q.defer();

            var requests = [];

            if (error.level <= 3) {
                requests.push("DELETE FROM missions WHERE id = " + error.mission_id + " AND id_db IS NULL;");
                requests.push("UPDATE missions SET state = 0 WHERE id = " + error.mission_id + " AND id_db IS NOT NULL;");

                if (error.level == 1) {
                    requests.push("DELETE FROM commandes WHERE id = " + error.commande_id + ";");
                }
                if (error.level == 2) {
                    requests.push("DELETE FROM ligneCommandes WHERE id_commande = " + error.commande_id + ";");
                }
                deferred.resolve(updates(requests));
            }
            else {
                requests.push("DELETE FROM missions WHERE id = " + error.mission_id + " AND id_db IS NULL;");
                requests.push("UPDATE missions SET state = 0 WHERE id = " + error.mission_id + " AND id_db IS NOT NULL;");
                requests.push("DELETE FROM commandes WHERE id = " + error.commande_id + ";");
                requests.push("DELETE FROM ligneCommandes WHERE id_commande = " + error.commande_id + ";");

                var request = 'SELECT M.id as mission, C.id as commandes, ifnull("["||Group_Concat("{ ""id"": " || LC.id || ", ""article_id"": " || LC.id_article || ", ""packet"": " || LC.packet || ", ""unit"": " || LC.unit || ", ""unitConversion"": " || A.unitConversion || "}") ||"]", "[]") as lignes FROM missions AS M LEFT JOIN commandes as C ON C.id = M.commande_id LEFT JOIN ligneCommandes AS LC ON LC.id_commande = C.id AND LC.id >= ' + error.update_id + ' LEFT JOIN articles AS A ON LC.id_article = A.id_db WHERE M.id = ' + error.mission_id + ';';

                DB.query(request).then(
                    function (success) {

                        var details = DB.fetch(success);

                        details.lignes = JSON.parse(details.lignes);

                        if (details.lignes.length > 0) {
                            deferred.resolve(restoreStock(requests, details.lignes));
                        }
                        else {
                            deferred.resolve(updates(requests));
                        }
                    },
                    function (error) {
                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        }

        function restoreStock(queries, lines) {
            var deferred = $q.defer();
            var requests = [];
            angular.forEach(lines, function (line) {

                var toRestore = (line.packet * line.unitConversion) + line.unit;
                requests.push("UPDATE STOCK SET total = total + " + toRestore + " WHERE item = " + line.article_id + ";");
                requests.push("DELETE FROM discounts_history WHERE line_id = " + line.id + ";");

            });
            requests = requests.concat(queries);
            deferred.resolve(updates(requests));
            return deferred.promise;
        }

    })

    .factory("Ventes", function (DB, $q) {
        var profile = JSON.parse(window.localStorage["profile"] || "{}");
        var activite = profile.activite || 0;
        var parametrage = profile.parametrage || {};
        var company = parametrage.company || {};
        var tenant_id = company.id || 0;

        return {
            get: get
        };

        function get(vendeurId) {
            return DB.query('SELECT M.print_content as printContent, M.entryDate, M.exitDate, M.synced, M.state, ifnull(C.promotions, "") as promotions, ifnull(C.sbd, "") as sbds, CL.*, M.date_start as date, C.increment as code, ifnull(C.totalTTC, 0) as totalTTC, M.client_id FROM missions AS M JOIN commandes AS C ON C.id_mission = M.id JOIN clients AS CL ON CL.id_db = M.client_id AND CL.societe = ' + tenant_id + ' AND CL.activite = ' + activite + ' WHERE (M.state = 1 OR M.state = 2) AND M.societe = ' + tenant_id + ' AND M.livreur IS NULL AND M.activite = ' + activite + ' AND CL.route IN (SELECT id_db FROM routes AS R WHERE R.vendeur = ' + vendeurId + ' AND R.societe = ' + tenant_id + ' AND R.activite = ' + activite + ' ) ORDER BY M.date_start DESC;')
                .then(
                    function (success) {
                        console.log(success);
                        return DB.fetchAll(success);
                    },
                    function (error) {
                        console.error(error)
                        return error;
                    });
        }
    })

    .factory("LigneCommandes", function (DB, $q) {
        return {
            getLigneCommande: getLigneCommande,
            addLigneCommande: addLigneCommande,
            addLigneCommandeLivreur: addLigneCommandeLivreur,
            pastPurchacedQuantity: pastPurchacedQuantity,
            convertLines: convertLines,
            convertLine: convertLine,
            addLinesToDB: addLinesToDB,
            discountsHistory: discountsHistory,
            checkIfExist: checkIfExist,
            addOrModify: addOrModify,
            updateStock: updateStock,
            addReturnsToStock: addReturnsToStock
        };

        function convertLines(commande_id, lines) {
            var options = [];
            for (var i = 0, len = lines.length; i < len; i++) {
                var line = lines[i];
                options.push(convertLine(commande_id, line));
            }
            return options;
        }

        function convertLine(commande_id, line) {
            return "(" + commande_id + ", " + (line.id_db || line.id) + ", " + line.unit + ", " + line.packet + ", " + (line.prixVente == 0 ? 1 : 0) + ", " + (line.remise || 0) + ", " + (line.prixVente || 0) + ")";
        }

        function discountsHistory(mission_id, commande_id, rowId, histories, article_id, total) {

            histories = typeof(histories) != "undefined" ? histories : [];
            var deferred = $q.defer();

            if (!(histories.length > 0)) {
                deferred.resolve({});
                return deferred.promise;
            }
            else {
                angular.forEach(histories, function (history) {

                    var option = "(" + rowId + ", 0, " + history.cumule + ", " + history.value + ", " + history.remiseP + ", " + history.remiseV + ", " + history.promotion_id + ", " + history.priorite + ", " + history.rank + ")";
                    DB.query("INSERT INTO discounts_history(line_id, commande_id, cumule, value, remiseP, remiseV, promotion_id, priorite, rank) VALUES " + option + ";")
                        .then(function (success) {

                            deferred.resolve(success);

                        }, function (error) {

                            deferred.reject({
                                level: 4,
                                mission_id: mission_id,
                                commande_id: commande_id,
                                update_id: rowId,
                                article_id: article_id,
                                total: total,
                                error: error.message
                            });

                        });

                });
            }
            return deferred.promise;
        }

        function updateStock(mission_id, commande_id, rowId, histories) {
            var deferred = $q.defer();
            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            DB.query("SELECT LC.id_article, LC.unit, LC.packet, A.unitConversion FROM ligneCommandes AS LC LEFT JOIN articles AS A ON A.id_db = LC.id_article AND A.societe = " + tenant_id + " AND activite = " + activite + " WHERE LC.id = ?;", [rowId])
                .then(
                    function (success) {
                        console.log(success);
                        var success = DB.fetch(success);
                        var updateQuery = "UPDATE stock SET total = total - ? WHERE item = ? AND employee_id = " + profile.id_db + " AND prelevement = 0 AND societe = " + tenant_id + " AND activite = " + activite + ";";
                        var toSubstract = ( (success.packet * success.unitConversion) + success.unit );
                        var updateBindings = [toSubstract, success.id_article];
                        DB.query(updateQuery, updateBindings).then(
                            function (success2) {
                                console.log(success2)
                                deferred.resolve(discountsHistory(mission_id, commande_id, rowId, histories, success.id_article, toSubstract));
                            },
                            function (error2) {
                                deferred.reject({
                                    level: 3,
                                    state: "post",
                                    mission_id: mission_id,
                                    commande_id: commande_id,
                                    update_id: rowId
                                });
                            });
                    },
                    function (error) {
                        deferred.reject({
                            level: 3,
                            state: "pre",
                            mission_id: mission_id,
                            commande_id: commande_id,
                            update_id: rowId
                        });
                    });
            return deferred.promise;
        }
        function clean(commandeId){
            return DB.query("Delete from ligneCommandes where id_commande="+commandeId).then(
                function(success) {
                console.log(success);
            }, function(error) { 
                console.error(error);
            });
        }

        function addLinesToDB(mission_id, commande_id, lines, livreur) {
            var deferred = $q.defer();
             var isLivreur=typeof(livreur) != "undefined" && livreur == true;
             if(isLivreur){
                clean(commande_id);
             }

            angular.forEach(lines, function (line, index) {

                console.log(line);

                if (line.prixVente < 0) {
                    deferred.resolve(addReturnsToStock(line));
                    //console.debug("HELLO !");
                }
                var lineObject = convertLine(commande_id, line);

                var sql_query = "INSERT INTO ligneCommandes(id_commande, id_article, unit, packet, isGift, remise, pu_ht) VALUES " + lineObject + ";";
                DB.query(sql_query).then(
                    function (success) {
                        console.log(success);

                        if ( line.prixVente > 0 || ( typeof(line.isGift) != "undefined" && line.isGift == 1 )) {
                            console.log("Stock update! ");
                            deferred.resolve(updateStock(mission_id, commande_id, success.insertId, line.discountHistory));
                        }
                        else {
                            console.log("no update! ");
                            deferred.resolve("THE END !!");
                        }
                    },
                    function (error) {
                        deferred.reject({level: 2, mission_id: mission_id, commande_id: commande_id});
                    });
            });
            return deferred.promise;
        }

        function checkIfExist(line) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;
            var id = profile.id_db || 0;

            var sql_query = "SELECT id FROM stock WHERE item = ? AND employee_id = " + id + " AND activite = " + activite + " AND societe = " + tenant_id + ";";
            var bindings = [line.id_db];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    console.log(success);
                    return success;
                },
                function (error) {
                    console.error(error);
                    return error;
                });
        }

        function addReturnsToStock(line) {
            var deferred = $q.defer();
            //FIRST CHECK !
            checkIfExist(line).then(
                function (success) {
                    console.debug(success);
                    var update = (success.rows.length > 0) ? true : false;
                    deferred.resolve(addOrModify(line, update));
                },
                function (error) {
                    console.debug(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function addOrModify(line, input) {
            var deferred = $q.defer();

            var total = (line.packet * line.unitConversion) + line.unit;

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var update = "UPDATE stock SET total = total + " + total + " WHERE item = " + line.id_db + " AND employee_id  = " + profile.id_db + " AND activite = " + activite + " AND societe = " + tenant_id + ";";

            var insert = "INSERT INTO stock (item, packet, unit, employee_id, client_id, retour, prelevement, cause, date, total, activite, societe) VALUES (" + line.id_db + ", 0, 0, " + profile.id_db + ", 0, 0, 0, 0, 0, " + total + ", " + activite + ", " + tenant_id + ");";

            var sql_query;

            if (input == true) {
                sql_query = update;
            }
            else {
                sql_query = insert;
            }
            console.debug(sql_query);

            DB.query(sql_query)
                .then(
                    function (success) {
                        deferred.resolve(success);
                    },
                    function (error) {
                        deferred.reject(error);
                    });

            return deferred.promise;
        }

        function addLigneCommande(ligneCommande, _idCommande) {
            var sql_query = "INSERT INTO ligneCommandes(id_commande, id_article, unit, packet, pu_ht, isGift, remise) values(?,?,?,?,?,?,?);"
            var bindings = [_idCommande, ligneCommande.id, ligneCommande.unit, ligneCommande.packet, ligneCommande.prixVente, ligneCommande.isGift, ligneCommande.remise];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    console.debug(success);
                    return success;
                },
                function (error) {
                    console.debug(error);
                    return error;
                });
        }

        function addLigneCommandeLivreur(ligneCommande, _idCommande) {
            var sql_query = "INSERT INTO ligneCommandes_livreur(id_commande, id_article, unit, packet, pu_ht) values(?,?,?,?,?);"
            var bindings = [_idCommande, ligneCommande.id, ligneCommande.unit, ligneCommande.packet, ligneCommande.prixVente];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                },
                function (error) {
                    return error;
                });
        }

        function pastPurchacedQuantity(_idArticle, _idMission) {
            var sql_query = "SELECT (LC.unit+LC.packet*10) as qty FROM ligneCommandes AS LC JOIN commandes AS C ON C.id = LC.id_commande JOIN clients AS CC ON CC.id_db = C.id_client WHERE LC.id_article = ? AND C.id_client = (SELECT lient_id FROM missions WHERE id_db = ?)  ORDER BY LC.id DESC LIMIT 3";
            var bindings = [_idArticle, _idMission];
            return DB.query(sql_query, bindings).then(
                function (ligneCommande) {
                    return DB.fetchAll(ligneCommande);
                },
                function (error) {
                    return error;
                });
        }

        function getLigneCommande(_id) {
            var sql_query = "SELECT * from ligneCommandes WHERE id_commande = ?";
            var bindings = [_id];
            return DB.query(sql_query, bindings).then(
                function (ligneCommandes) {
                    return DB.fetchAll(ligneCommandes);
                },
                function (error) {
                    return error;
                });
        }
    })


    .factory("Commandes", function (DB, $q, $http, Missions) {
        return {
            getAllCommandes: getAllCommandes,
            getCommandesByMission: getCommandesByMission,
            getCommandesByClient: getCommandesByClient,
            getCommande: getCommande,
            addCommande: addCommande,
            addCommandeLivreur: addCommandeLivreur,
            getLastCommande: getLastCommande,
            getCAClient: getCAClient,
            getCAVendeur: getCAVendeur,
            getAVGClient: getAVGClient,
            syncCommandes: syncCommandes,
            sendCommandeToAPI: sendCommandeToAPI
        };

        function sendCommandeToAPI(commandes) {
            var commandesToAPI = [];
            for (var i = 0; i < commandes.length; i++) {
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

        function syncCommandes(idVendeur) {
            var sql_query = 'SELECT M.id AS mobile, M.client_id AS client, C.sbd as sbds, C.promotions AS promotions, M.route_id AS route, M.state AS etat, ifnull(M.id_db, 0) AS api,  "["||Group_Concat("{ ""id_article"": "||LC.id_article||", ""unite"": "||LC.unit||", ""remise"": "||ifnull(LC.remise, 0)||", ""isGift"": "||ifnull(LC.isGift, 0)||",  ""prix"": "||LC.pu_ht||", ""caisse"": "||LC.packet||" }")||"]" as lignes FROM missions AS M JOIN commandes AS C ON C.id = M.commande_id JOIN ligneCommandes AS LC ON LC.id_commande = C.id WHERE M.synced = 0 AND M.state = 1 AND M.route_id IN (SELECT id_db from routes WHERE vendeur = ' + idVendeur + ') GROUP BY C.id';
            return DB.query(sql_query).then(
                function (success) {
                    return DB.fetchAll(success);
                },
                function (error) {
                    return error;
                });
        }

        function getLastCommande(id_client) {
            var sql_query = "SELECT LC.unit AS 'units', LC.packet AS 'packets', ((LC.packet*10+LC.unit)*A.prixVente) AS 'total', A.nomArticle AS 'designation' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article WHERE LC.id_commande = (SELECT id FROM commandes WHERE id_client = ? ORDER BY id DESC LIMIT 1);";
            var bindings = [id_client];
            return DB.query(sql_query, bindings).then(
                function (commandes) {
                    return DB.fetchAll(commandes);
                },
                function (error) {
                    return error;
                });
        }

        function addCommande(id_mission, lines) {

            var missionObject = JSON.parse(window.localStorage['mission'] || "{}");

            var sql_query = "INSERT INTO commandes(code_commande, id_mission, id_client, sbd, promotions, paymentDate, remise, paymentId) values(?,?,?,?,?,?,?,?);";

            var bindings = ["", id_mission, missionObject.client_id, "", "", "", "", ""];

            return DB.query(sql_query, bindings).then(
                function (success) {

                    return success;
                },
                function (error) {
                    return error;
                });
        }

        function addCommandeLivreur(id_commande, code_commande, id_mission, id_client) {
            var sql_query = "INSERT INTO commandes_livreur(id_db, code_commande, id_mission, id_client) values(?,?,?,?);";
            var bindings = [id_commande, code_commande, id_mission, id_client];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                },
                function (error) {
                    return error;
                });
        }


        function getCommande(_id) {
            var sql_query = "SELECT C.code_commande AS 'code_commande', LC.unit AS 'units', LC.packet AS 'packets', ((LC.packet*10+LC.unit)*A.prixVente) AS 'total', A.nomArticle AS 'designation' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article JOIN commandes AS C ON C.id = LC.id_commande WHERE LC.id_commande = ?";
            var bindings = [_id];
            return DB.query(sql_query, bindings).then(
                function (commandes) {
                    return DB.fetchAll(commandes);
                },
                function (error) {
                    return error;
                });
        }


        function getCommandesByClient(id_client) {
            var sql_query = "SELECT C.code_commande AS 'code_commande', LC.unit AS 'units', LC.packet AS 'packets', ((LC.packet*10+LC.unit)*A.prixVente) AS 'total', A.nomArticle AS 'designation', A.prixVente AS 'prixVente' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article JOIN commandes AS C ON C.id = LC.id_commande WHERE LC.id_commande IN (SELECT id FROM commandes WHERE id_client = ?)";
            var bindings = [id_client];
            return DB.query(sql_query, bindings).then(
                function (commandes) {
                    return DB.fetchAll(commandes);
                },
                function (error) {
                    return error;
                }
            );
        }


        function getAVGClient(id_client) {
            var sql_query = "SELECT AVG(C.totalTTC) as avg FROM commandes as C WHERE id_client = ?;";
            var bindings = [id_client];
            return DB.query(sql_query, bindings).then(
                function (avg) {
                    return DB.fetch(avg);
                },
                function (error) {
                    return error;
                });
        }

        function getCAClient(id_client) {
            var sql_query = "SELECT SUM(C.totalTTC) as ca FROM commandes as C WHERE id_client = ?;";
            var bindings = [id_client];
            return DB.query(sql_query, bindings).then(
                function (ca) {
                    return DB.fetch(ca);
                },
                function (error) {
                    return error;
                });
        }

        function getCAVendeur(_idVendeur) {
            var sql_query = "SELECT ifnull(SUM(C.totalTTC), 0) as 'ca' FROM missions AS M JOIN commandes as C ON M.id = C.id_mission WHERE M.state = 1 AND M.date_start BETWEEN date('now', 'start of month') AND date('now', 'start of month', '+1 month', '-1 day') AND M.route_id IN (SELECT id_db FROM routes WHERE vendeur = ?);";
            var bindings = [_idVendeur];
            return DB.query(sql_query, bindings).then(
                function (ca) {
                    console.log(ca);
                    return DB.fetch(ca);
                },
                function (error) {
                    console.log(error);
                    return error;
                });
        }


        function getCommandesByMission(id_mission) {
            var sql_query = "SELECT * FROM commandes WHERE id_mission = ?";
            var bindings = [id_mission];

            var deferred = $q.defer();
            DB.query(sql_query, bindings).then(
                function (commandes) {
                    var finalObject = [];
                    var commandes = DB.fetchAll(commandes);
                    angular.forEach(commandes, function (commande) {

                        var commandeCopy = commande;
                        commandeCopy.ligneCommandes = [];
                        var sql_query = "SELECT * FROM ligneCommandes WHERE id_commande = ?";
                        var bindings = [commande.id];
                        DB.query(sql_query, bindings).then(
                            function (ligneCommandes) {
                                var result = DB.fetchAll(ligneCommandes);
                                commandeCopy.ligneCommandes = result;
                                finalObject.push(commandeCopy);
                                deferred.resolve(finalObject);
                                console.log("STEP");
                            },
                            function (error) {
                            });

                    });

                },
                function (error) {
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        }


        function getAllCommandes() {
            var sql_query = "SELECT * FROM commandes";
            var bindings = [];

            var deferred = $q.defer();
            DB.query(sql_query, bindings).then(
                function (commandes) {
                    var finalObject = [];
                    var commandes = DB.fetchAll(commandes);
                    angular.forEach(commandes, function (commande) {

                        var commandeCopy = commande;
                        commandeCopy.ligneCommandes = [];
                        var sql_query = "SELECT * FROM ligneCommandes WHERE id_commande = ?";
                        var bindings = [commande.id];
                        DB.query(sql_query, bindings).then(
                            function (ligneCommandes) {
                                var result = DB.fetchAll(ligneCommandes);
                                commandeCopy.ligneCommandes = result;
                                finalObject.push(commandeCopy);
                                deferred.resolve(finalObject);
                                console.log("STEP");
                            },
                            function (error) {
                            });

                    });

                },
                function (error) {
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        }

    })

    .factory("Depot", function (DB) {

        return {
            get: get
        };

        function get(client_id) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            return DB.query("SELECT * FROM depot_client AS DC JOIN depot_vendeur AS DV ON DV.depot_id = DC.depot_id AND DV.societe = " + tenant_id + " AND DV.activite = " + activite + " WHERE DC.societe = " + tenant_id + " AND DC.activite = " + activite + " AND DC.client_id = " + ( client_id || 0 ) + ";")
                .then(
                    function (success) {
                        return DB.fetchAll(success);
                    },
                    function (error) {
                        console.error(error);
                        return error;
                    });
        }

    })

    .factory("Accounts", function (DB, $http, Parametrage) {
        return {
            getAccountByUserNameAndPassword: getAccountByUserNameAndPassword,
            getAccountById: getAccountById,
            changePassword: changePassword,
            getAccountByUserName: getAccountByUserName,
            connectFromAPI: connectFromAPI,
            addAccount: addAccount,
            addGoldenPoints: addGoldenPoints,
            testConnection:testConnection

        };
        function testConnection(ip){
            console.log("testConnection ",ip);
            var req = {
                method: "GET",
                url: "http://" + ip + "/newsales/rest/users/sayHello?username=azer",
                timeout: 5000
            };
            return $http(req);

        }

        function getAccountByUserName(username) {
            var sql_query = "SELECT * FROM accounts WHERE username = ?";
            var bindings = [username];
            return DB.query(sql_query, bindings).then(
                function (account) {
                    return DB.fetch(account);
                },
                function (error) {
                    return error;

                });
        }

        function changePassword(username, password, question_secrete, reponse_secrete) {
            var sql_query = "UPDATE accounts SET password = ?, first_login = ?, question_secrete = ?, reponse_secrete = ? WHERE username = ?;";
            var bindings = [password, 0, question_secrete, reponse_secrete, username];
            return DB.query(sql_query, bindings);
        }

        function getAccountByUserNameAndPassword(username, password) {
            var sql_query = "SELECT * FROM accounts AS A LEFT JOIN profiles AS P ON P.id_account = A.id WHERE username = ? and password = ?;";
            var bindings = [username, password];
            return DB.query(sql_query, bindings)
                .then(function (result) {
                    return DB.fetch(result);
                }, function (error) {
                    console.log(error.message);
                    return error.message;
                });
        }

        function connectFromAPI(account, ip) {

            
            var req = {
                method: "PUT",
                url: "http://" + ip + "/newsales/rest/users/login?login=" + account.username + "&password=" + account.password + "&mobile=1"
            };
            return $http(req);
        }

        function addAccount(account) {
            var sql_query = "INSERT INTO accounts(id_db, username, password, first_login, question_secrete, reponse_secrete, bloque, golden_points, golden_stores, fonction, activite, token, type, societe) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
            var bindings = [account.id_db, account.username, account.password, 1, "", "", 0, account.golden_points, account.golden_stores, account.fonction, account.activite, account.token, account.type, account.societe];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    console.log("HERE !!")
                    console.log(JSON.stringify(success));
                    return success;
                },
                function (error) {
                    return error;
                });
        }


        function addGoldenPoints(_idAccount, points) {
            var sql_query = "UPDATE accounts SET golden_points =  golden_points + ? WHERE id_db = ?";
            var bindings = [points, _idAccount];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                },
                function (error) {
                    return error;
                });
        }

        function getAccountById(_id) {
            var sql_query = "SELECT * FROM accounts WHERE username = ?";
            var bindings = [_id];
            return DB.query(sql_query, bindings)
                .then(
                    function (result) {
                        var client = DB.fetch(result);
                        console.log(client);
                    },
                    function (error) {
                        return "Le compte n'existe pas.";
                    });
        }
    })

    .factory("Clients", function ($http, DB, $q) {
        return {
            getAllClients: getAllClients,
            syncClients: syncClients,
            getGreatClient: getGreatClient,
            addClient: addClient,
            getClient: getClient,
            addNewClient: addNewClient,
            addGoldenStore: addGoldenStore,
            updateClientCoords: updateClientCoords,
            addClientLivreur: addClientLivreur,
            getAllVendeurRoutes: getAllVendeurRoutes
        };

        function addGoldenStore(_idClient, points) {
            var deferred = $q.defer();
            var results = [];
            var sql_query = [
                "UPDATE clients SET golden_store =  golden_store + " + points + " WHERE id_db = " + _idClient + ";",
                "SELECT golden_store > 25 as atteint from clients WHERE id_db = " + _idClient];
            angular.forEach(sql_query, function (query, index) {
                DB.query(query).then(
                    function (success) {
                        if (index > 0 && success.rows.length > 0) {
                            deferred.resolve(success.rows[0].atteint);
                        }
                        else {
                            deferred.resolve(0);
                        }
                    },
                    function (error) {
                        deferred.reject(error);
                    });
            });

            return deferred.promise;
        }

        function getClient(_id, tenant_id, activite) {
            var sql_query = "SELECT ifnull((SELECT MI.entryDate FROM missions AS MI WHERE MI.client_id = 124559 AND MI.state == 1 ORDER BY MI.date_start DESC LIMIT 1), 0) as last,C.*, ifnull(COSB.message, '') as message, ifnull(COSB.osb, null) as osb, ifnull(COSB.commande, 1) as authorized, CASE WHEN M.id_db IS NULL THEN 0 ELSE 1 END as pass FROM clients AS C LEFT JOIN missions AS M ON M.activite = " + activite + " AND M.societe = " + tenant_id + " AND M.client_id = C.id_db AND M.date_start = date('now') LEFT JOIN client_osb AS COSB ON COSB.client_id = C.id_db AND COSB.activite = " + activite + " AND COSB.societe = " + tenant_id + " WHERE C.id_db = ? AND C.societe = ? AND C.activite = ?";
            var bindings = [_id, tenant_id, activite];
            return DB.query(sql_query, bindings).then(
                function (client) {
                    return DB.fetch(client);
                },
                function (error) {
                    return error;
                });
        }

        function addClient(client) {
            var sql_query = "INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email, golden_store, chiffreAffaire, route) values(?,?,?,?,?,?,?,?,?,?,?)";
            var bindings = [client.id_db, "CE65" + Math.round(Math.random() * 10000), client.address, client.lat, client.lng, client.nom, client.prenom, client.email, client.golden_store, client.chiffreAffaire, client.route];
            return DB.query(sql_query, bindings).then(
                function (data) {
                    return data;
                },
                function (error) {
                    return error;
                });
        }


        function addClientLivreur(client) {
            var sql_query = "INSERT INTO clients(id_db, code_client, address, lat, lng, nom, prenom, email) values(?,?,?,?,?,?,?,?)";
            var bindings = [client.id, "CE65" + Math.round(Math.random() * 10000), client.address, client.lat, client.lng, client.nom, client.prenom, client.email];
            return DB.query(sql_query, bindings).then(
                function (data) {
                    return data;
                },
                function (error) {
                    return error;
                });
        }


        function getGreatClient() {
            var sql_query = "SELECT * FROM clients ORDER BY id_db DESC LIMIT 1";
            return DB.query(sql_query).then(
                function (result) {
                    console.log(result.rows.length);
                    return DB.fetch(result);
                },
                function (error) {
                    console.log(error.message);
                });
        }

        function syncClients(_id) {
            getGreatClient().then(
                function (data) {
                    var innerId;
                    console.log(data);
                    if (data == null) {
                        innerId = 0;
                        console.log("1174 :" + innerId);
                    }
                    else {
                        innerId = data.id_db;
                        console.log("1179 :" + innerId);
                    }
                    $http.get("http://197.230.28.154:81/newsales/rest/vendors/" + _id + "/clients/check").then(
                        function (data, status, headers) {
                            var outerId = data.data;
                            if (innerId < outerId) {
                                console.log("some updates are waiting ...");
                                $http.get("http://197.230.28.154:81/newsales/rest/vendors/" + _id + "/clients/from/" + innerId).then(
                                    function (data, status, headers) {
                                        angular.forEach(data.data, function (client) {
                                            var object = {};
                                            object.id_db = client.id;
                                            object.code_client = client.codeClient
                                            object.address = client.address;
                                            object.lat = client.latitude == null ? 0 : client.lat;
                                            object.lng = client.latitude == null ? 0 : client.lng;
                                            object.nom = client.nom;
                                            object.prenom = client.prenom;
                                            object.email = client.email;
                                            object.golden_store = typeof client.goldenStore === "undefined" ? 0.0 : client.goldenStore;
                                            object.chiffreAffaire = typeof client.chiffreAff === "undefined" ? 0.0 : client.chiffreAff;
                                            object.route = client.route;
                                            addClient(object).then(
                                                function (data) {

                                                },
                                                function (error) {
                                                    console.log(error.message);
                                                });
                                        });
                                        console.log("Your DB is now up to date");
                                    },
                                    function (data, status, headers) {

                                    });
                            }
                            else {
                                console.log("Your DB is already up to date;");
                            }
                        },
                        function (error, status, headers) {
                            console.log(error);
                        });
                },
                function () {

                });
        }


        function getAllVendeurRoutes(_idVendeur, tenant_id, activite) {
            var sql_query = "SELECT code FROM routes WHERE vendeur = " + _idVendeur + " AND societe = " + tenant_id + " AND activite = " + activite + ";";
            return DB.query(sql_query)
                .then(
                    function (success) {
                        return DB.fetchAll(success);
                    },
                    function (error) {
                        return error;
                    });
        }


        function getAllClients(_idVendeur, tenant_id, activite) {
            var sql_query = "SELECT C.*, CASE WHEN M.id_db IS NULL THEN 0 ELSE 1 END as authorized, R.code as code_route FROM clients AS C LEFT JOIN missions AS M ON M.activite = " + activite + " AND M.societe = " + tenant_id + " AND M.client_id = C.id_db AND M.date_start = date('now') JOIN routes as R ON R.id_db = C.route  WHERE route IN (SELECT id_db FROM routes WHERE vendeur = ? AND societe = ? AND activite = ?) AND C.activite = " + activite + " AND C.societe = " + tenant_id + ";";
            var bindings = [_idVendeur, tenant_id, activite];
            return DB.query(sql_query, bindings).then(
                function (data) {
                    console.log(data);
                    return DB.fetchAll(data);
                },
                function (error) {
                    return error;
                });
        }

        function updateClientCoords(_idClient, object) {
            var sql_query = "UPDATE clients SET lat = ? ,lng = ? WHERE id_db = ?";
            var bindings = [object.lat, object.lng, _idClient];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    console.log(success);
                    return DB.fetch(success);
                },
                function (error) {
                    return error;
                });
        }

        function addNewClient(client) {
            var sql_query = "INSERT INTO new_clients(nom, prenom, adresse1, adresse2, telephone, categorie, lat, lng, route) values(?,?,?,?,?,?,?,?,?);";
            var bindings = [client.nom, client.prenom, client.adresse1, client.adresse2, "0" + String(client.telephone), client.categorie, client.lat, client.lng, Number(client.route)];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                },
                function (error) {
                    return error;
                });
        }
    })

    .factory("BrandFive", function ($http, DB, $q, DateUtilities) {
        return {

            getBrandFiveFromAPI: getBrandFiveFromAPI,
            getCABrandFive: getCABrandFive,
            addBrandFive: addBrandFive,
            sync: sync,
            fromAPI: fromAPI,
            groupAdd: groupAdd,
            finalQuery: finalQuery,
            insertBrandLines: insertBrandLines,
            getBrandLinesWhereGoalWasReached: getBrandLinesWhereGoalWasReached,
            insertBrandFiveLines: insertBrandFiveLines
        };

        function deleteAllBrandFiveLines() {
            console.log("dddddddd");

            DB.query("DELETE FROM brand_five")
                .then(
                    function (success) {
                        console.debug(success);

                    },
                    function (error) {
                        console.debug(error);

                    });
        }

        function insertBrandFiveLines(brandFiveObjectif) {
            console.log("testssssssssss", brandFiveObjectif);
            var brandLines = brandFiveObjectif.brandFiveObjectifLines;
            console.log("brandLines", brandLines);
            var deferred = $q.defer();
            deleteAllBrandFiveLines();
            angular.forEach(brandLines, function (brandLine) {

                console.debug(brandLine);


                var values = "(" + brandLine.id + ", " + brandLine.id + ", " + brandLine.ca + ", " + brandLine.caCourant + ", " + brandLine.brandId + ", '" + brandLine.brandName + "'," + DateUtilities.convertLongToYYYYMMDD(new Date(brandFiveObjectif.dateDebut)) + ", " + DateUtilities.convertLongToYYYYMMDD(new Date(brandFiveObjectif.dateFin)) + ")";
                console.log("valuesssss", values);
                var sql_query = "INSERT INTO brand_five(id_db,id, ca, ca_courant,brand_id,name,date_Debut,date_Fin) VALUES " + values + ";";


                DB.query(sql_query).then(
                    function (success) {
                        console.debug(success);
                        deferred.resolve(success);

                    },
                    function (error) {
                        console.debug(error);
                        deferred.resolve(error);
                    });
            });

            return deferred.promise;

        }

        function getBrandLinesWhereGoalWasReached() {
            console.log("ddddddfsqdfq");
            var query = "SELECT * FROM brand_five where ca_courant>= ca";
            return DB.query(query).then(
                function (success) {
                    console.log(success);
                    return DB.fetchAll(success);
                }, function (error) {
                    return error;
                });
        }

        function insertBrandLines(brandLines) {
            console.log("insertBrandLines");
        }

        /*{ name : "id" , value : "integer primary key autoincrement" },
         { name : "id_db" , value : "integer unique not null" },
         { name : "code", value : "text not null" },
         { name : "date_debut", value : "date not null" },
         { name : "date_fin", value : "date not null" },
         { name : "ca", value : "long not null" },
         { name : "ca_courant", value : "long not null" },
         { name : "brand_id", value : "integer unique not null" },
         { name : "name", value : "text not null" }*/

        function finalQuery(input) {
            var deferred = $.defer();
            var sql_query = "INSERT INTO brand_five (id_db, date_debut, date_fin, ca, ca_courant, name, brand_id) VALUES " + input.join(", ") + ";";
            var output = ["DELETE FROM brand_five;"];
            output.push(sql_query);
            deferred.resolve(output);
        }

        function groupAdd(data) {
            console.log(data);
            var deferred = $q.defer();
            if (typeof(data.brandFiveObjectifLines) != "undefined") {
                var output = [];
                for (var i = 0; i < data.brandFiveObjectifLines.length; i++) {
                    var line = data.brandFiveObjectifLines[i];
                    output.push("(" + line.id + ", '" + DateUtilities.convertLongToYYYYMMDD(new Date(data.dateDebut)) + "', '" + DateUtilities.convertLongToYYYYMMDD(new Date(data.dateFin)) + "', " + ( (line.ca == null) ? 0 : line.ca) + ", " + ( (line.caCourant == null) ? 0 : line.caCourant) + ", '" + line.brandName + "', " + line.brandId + ")");
                }
                console.log(output);
                deferred.resolve(finalQuery(output));
            }
            else {
                deferred.resolve([]);
            }
            return deferred.promise;
        }

        function fromAPI() {
            //var JSONContent = '{"id":1,"code":"zere","dateDebut":1456790400000,"dateFin":1458259200000,"brandFiveObjectifLines":[{"id":1,"ca":12365,"brandName":"Pentene","brandLineId":16,"brandLineOrder":1,"caCourant":568,"brandId":2},{"id":2,"ca":4568,"brandName":"CADEAU","brandLineId":17,"brandLineOrder":2,"caCourant":6568,"brandId":5},{"id":3,"ca":8965,"brandName":"GRATUITÉ","brandLineId":18,"brandLineOrder":3,"caCourant":3265,"brandId":7},{"id":4,"ca":889856,"brandName":"ORALB","brandLineId":19,"brandLineOrder":4,"caCourant":2336,"brandId":8},{"id":5,"ca":789565,"brandName":"ACE","brandLineId":20,"brandLineOrder":5,"caCourant":98,"brandId":10}],"timeStamp":456}';
            var deferred = $q.defer();
            sync().then(
                function (success) {
                    console.debug(success);
                    deferred.resolve(groupAdd(success.data));
                },
                function (error) {
                    console.debug(error);
                    deferred.resolve([]);
                });

            return deferred.promise;
        }

        function sync() {
            var request = {
                url: "http://197.230.28.154:81/newsales/newsales/rest/brandFiveObjectif",
                method: "GET"
            };

            return $http(request);
        }

        function getCABrandFive(_idVendeur) {
            var sql_query = "SELECT SUM((LC.unit+(LC.packet*10))*A.prixVente) AS 'somme', A.marqueArticle as 'marque' FROM ligneCommandes AS LC JOIN articles AS A ON A.id_db = LC.id_article JOIN commandes AS C ON C.id = LC.id_commande JOIN missions AS M ON M.commande_id = C.id WHERE M.route_id IN (SELECT id_db FROM routes WHERE vendeur = ?) AND LC.id_article IN ( SELECT id_db FROM articles WHERE marqueArticle IN ( SELECT name FROM brand_five ) ) GROUP BY marque";
            var bindings = [_idVendeur];
            return DB.query(sql_query, bindings).then(
                function (data) {
                    return DB.fetchAll(data);
                },
                function (error) {
                    return error;
                });
        }

        function addBrandFive(brand) {
            var sql_query = 'INSERT INTO brand_five(id_db, code_marque, name, five) VALUES (?,?,?,?);';
            var bindings = [brand.id_db, brand.name, brand.name, 1];
            DB.query(sql_query, bindings).then(
                function (success) {
                    console.log("success BrandFive !");
                    console.log(JSON.stringify(success));
                },
                function (error) {
                    console.log("Erreur lors de l'enregistrement de la BrandFive !");
                    console.log(JSON.stringify(error));
                });
        }

        function getBrandFiveFromAPI() {
            var deferred = $q.defer();
            var req = {
                method: "GET",
                url: "http://197.230.28.154:81/newsales/rest/brandfive"
            };
            return $http(req).then(
                function (brandFive, status, headers) {
                    var bFive = brandFive.data;
                    var sql_query = "INSERT INTO brandfive(codeBrandeFive, description, note, dateCreation, dateLancement, dateCloture) values (?,?,?,?,?,?);";
                    var bindings = [bFive.codeBrandeFive, bFive.description, bFive.note, bFive.dateCreation, bFive.dateLancement, bFive.dateCloture];
                    return DB.query(sql_query, bindings).then(
                        function () {

                        },
                        function () {

                        });
                },
                function (error, status, headers) {

                });
        }
    })

    .factory("ViewController", function (Articles, SBD, Promotions, CartUtilities, Marques) {
        return {
            check: check,
            prepare: prepare,
            idsRemaining: idsRemaining
        };


        function idsRemaining() {
            var ids = [];
            ids = ids.concat(Promotions.getNonConsumedPromotions());
            ids = ids.concat(SBD.getNonConsumedSBDs());
            return ids;
        }

        function prepare(articles, brandName, forChargement, prelevement, retour, dechargement, echange, sortant, entrant) {
            console.log(articles, brandName, forChargement, prelevement, retour, dechargement, echange, sortant, entrant);

            forChargement = typeof(forChargement) != "undefined" && forChargement == true;

            dechargement = typeof(dechargement) != "undefined" && dechargement == true;

            prelevement = typeof(prelevement) != "undefined" && prelevement == true;

            retour = typeof(retour) != "undefined" && retour == true;

            echange = typeof(echange) != "undefined" && echange == true;

            entrant = typeof(entrant) != "undefined" && entrant == true;

            sortant = typeof(sortant) != "undefined" && sortant == true;


            var logs = [ ["forChargement", "dechargement", "prelevement", "retour", "echange", "sortant", "entrant"], [forChargement, dechargement, prelevement, retour, echange, sortant, entrant] ];
            console.table(logs);

            // ADD BRANDS TO LOCAL STORAGE
            // IGNORE THE BRAND CHECKMARK UTILITY !
            if ((typeof(brandName) != "undefined" && brandName != null) && !forChargement && !prelevement && !retour && !dechargement && !echange) {
                Marques.addMarqueToLocalStorage(brandName, articles);
            }
            //INITIALIZE THE LIST OF ITEMS
            var output = [];
            //IMPLEMENTATION OF THE DATA STRUCTURE
            for (var i = 0, _len = articles.length; i < _len; i++) {
                var article = articles[i];

                var cartResult = CartUtilities.existInCart(article, forChargement, prelevement, retour, dechargement, echange, sortant, entrant);
                //console.log(cartResult);

                if (cartResult == null) {
                    //console.log(article, forChargement, prelevement, retour, dechargement);
                    article = Articles.prepareForScope(article, forChargement, prelevement, retour, dechargement, echange, sortant, entrant);
                }
                else {
                    article = cartResult;
                }

                output.push(article);
            }
            return output;
        }

        function check(article, forChargement, isVendeur, prelevement, retour, dechargement, isLivreur, echange, sortant, entrant) {


            isLivreur = ( (typeof(isLivreur) != "undefined") && ( isLivreur == true ) ) ? true : false;

            prelevement = ( (typeof(prelevement) != "undefined") && ( prelevement == true ) ) ? true : false;

            retour = ( (typeof(retour) != "undefined") && ( retour == true ) ) ? true : false;

            forChargement = ( (typeof(forChargement) != "undefined") && ( forChargement == true ) ) ? true : false;

            dechargement = ( (typeof(dechargement) != "undefined") && ( dechargement == true ) ) ? true : false;

            echange = ( (typeof(echange) != "undefined") && ( echange == true ) ) ? true : false;

            sortant = ( (typeof(sortant) != "undefined") && ( sortant == true ) ) ? true : false;

            entrant = ( (typeof(entrant) != "undefined") && ( entrant == true ) ) ? true : false;

            isVendeur = ( (typeof(isVendeur) != "undefined") && (isVendeur == true) ) ? true : false;

            var condition = isVendeur ? Articles.outOfStock(article) : Articles.outOfQuota(article);


            var logs = [ ["function", "echange", "sortant", "entrant"], ["ViewController.check()", echange, sortant, entrant] ];
            console.table(logs);

            //TO MAKE SURE ALL NULL VALUES ARE ELIMINATED !!

            article.unit = article.unit / 1;
            article.packet = article.packet / 1;
            if(article.unit == null || article.unit < 0) {
                article.unit = 0;
            }
            if(article.packet == null || article.packet < 0) {
                article.packet == 0;
            }

            // IF IT THE CASE OF A RETOUR THERE IS NO NEED TO CHECK THE STOCK !!
            // WE SHOULD EXAMINE ONLY AND ONLY THE QUOTA !!
            if (forChargement || retour) {
                condition = Articles.outOfQuota(article);
                console.debug("WE ARE GIVING THE HIGH AND THE ONLY PRIORITY TO THE QUOTA !");
            }
            else {
                console.debug("WE ARE GIVING THE HIGH AND THE ONLY PRIORITY TO THE STOCK !");
            }


            if ( !prelevement && ( (echange && sortant && !entrant) || !echange ) ) {
                if (!condition) {
                    article.needRecovery = false;
                    console.log(article);
                    var toDrop = false;
                    if (article.unit == 0 && article.packet == 0) {

                        if (!isLivreur) {
                            toDrop = true;
                            CartUtilities.dropFromCart(article, forChargement, prelevement, retour, dechargement, echange, sortant, entrant);
                        }
                        else {
                            toDrop = false;
                        }
                    }

                    // ADD IT TO CART OR UPDATE THE QTYs !!

                    if (!toDrop) {
                        CartUtilities.addOrModify(article, forChargement, prelevement, retour, dechargement, echange, sortant, entrant);
                    }
                }
                else {
                    console.log("SHOULD BE DROPPED FROM CART");
                    article.needRecovery = true;
                    console.log(article);
                    if (!isLivreur) {
                        CartUtilities.dropFromCart(article, forChargement, prelevement, retour, dechargement, echange, sortant, entrant);
                    }
                    // ARTICLE INVALID BECAUSE IT IS NOT RESPECTING QUOTA OR STOCK !
                    // NO NEED TO MORE COMPUTATIONS !
                    return;
                }
            }

            else {
                var toDrop = false;
                if (article.unit == 0 && article.packet == 0) {
                    toDrop = true;
                    CartUtilities.dropFromCart(article, forChargement, prelevement, retour, dechargement, echange, sortant, entrant);
                }

                // ADD IT TO CART OR UPDATE THE QTYs !!

                if (!toDrop) {
                    CartUtilities.addOrModify(article, forChargement, prelevement, retour, dechargement, echange, sortant, entrant);
                }
            }

            if (!forChargement && !prelevement && !retour && !dechargement && !echange) {

                // CHECK IF THE ITEM BELONG TO ANY PROMOTION 
                // BEFORE STARTING THE JOB

                if (typeof(article.promotions) != "undefined" && article.promotions != null && article.promotions.length > 0) {
                    Promotions.promotionTreatment(article);
                }

                // SAME THING BUT WITH THE SBDs

                if (article.groupeSBD != null && typeof(article.groupeSBD) != "undefined") {
                    SBD.SBDTreatment(article);
                }

                // IF THE ITEM DO NOT OR DO BELONG TO THE TWO
                // WE NEED TO CHECK ALL PROMOTIONS THAT ARE LINKED
                // WITH THE CLIENT

                Promotions.checkPromotionClient();
            }
            else {
                console.debug("NO ADDITIONAL COMPUTING !");
            }

            return article;

        }

    })

    .factory("Articles", function (DB, $q, $http, $log, $filter, Marques, Promotions, CartUtilities, DateUtilities, SBD) {
        return {
            getArticlesConcurrent: getArticlesConcurrent,
            getPromotionArticles: getPromotionArticles,
            getSBDArticles: getSBDArticles,
            getArticlesInRange: getArticlesInRange,
            itemInScopeOutOfQuota: itemInScopeOutOfQuota,
            outOfQuota: outOfQuota,
            outOfStock: outOfStock,
            getHT: getHT,
            getTTC: getTTC,
            getArticleQty: getArticleQty,
            prepareForScope: prepareForScope,
            prepareGift: prepareGift,
            add: add,
            addAll: addAll,
            getArticlesByMarque: getArticlesByMarque,
            getMarques: getMarques,
            dumpMarques: dumpMarques,
            getArticle: getArticle,
            getArticleWithSBD: getArticleWithSBD,
            getNonConsumedPromotions: getNonConsumedPromotions,
            getArticleByIds: getArticleByIds,
            getRemainingByIds: getRemainingByIds,
            getArticlesByIds: getArticlesByIds,
            syncArticles: syncArticles,
            getHighest: getHighest
        };

        function getArticlesConcurrent()
        {
            var timestamp = new Date().getTime();
            var mission = window.localStorage.getItem("mission");
            var typeClient = 0;
            if(mission != null)
            {
                mission = JSON.parse(mission || "{}");
                typeClient = mission.typeClient || typeClient;
            }
            return DB.query("SELECT 1 as prixVente, nomArticle, id_db as concurrentId, id_db*999999 as id_db, 1 as isConcurrent FROM articles_concurrent AS AC WHERE AC.typeClient = " + typeClient + ";").then(
                function(success){
                    return DB.fetchAll(success);
                }, 
                function(error){
                    return error;
                });
        }

        function getArticlesInRange(range, vendeurId, clientId) {
            var date = DateUtilities.convertLongToYYYYMMDD(new Date());
            var sql_query = 'SELECT ifnull(PVC.unit, "--") AS shopUnit, ifnull(PVC.packet, "--") AS shopPacket, length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(ST.unit, 0) as unitStock, ifnull(ST.packet, 0) as packetStock, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN stock AS PVC ON PVC.item = A.id_db AND PVC.client_id = ? AND PVC.date = ? LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.employee_id = ? LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND ? BETWEEN PT.startDate AND PT.endDate LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE A.id_db IN (' + range.join(", ") + ') GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;'
            var bindings = [clientId, date, vendeurId, date];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    console.log(success);
                    return DB.fetchAll(success);
                },
                function (error) {
                    return error;
                });
        }


        function itemInScopeOutOfQuota(scopeDeepCopy, isVendeur, prelevement, retour, forChargement) {
            isVendeur = typeof(isVendeur) != "undefined" && isVendeur == true;

            prelevement = typeof(prelevement) != "undefined" && prelevement == true;

            retour = typeof(retour) != "undefined" && retour == true;

            forChargement = typeof(forChargement) != "undefined" && forChargement == true;

            if (!prelevement && !retour && !forChargement) {
                for (var i = 0, len = scopeDeepCopy.length; i < len; i++) {
                    var article = scopeDeepCopy[i];

                    if (article.unit > 0 || article.packet > 0) {
                        if (isVendeur && outOfStock(article)) {
                            return true;
                        }
                        else if (!isVendeur && outOfQuota(article)) {
                            return true;
                        }
                    }
                }
            }
            if (isVendeur && retour) {
                for (var i = 0, len = scopeDeepCopy.length; i < len; i++) {
                    var article = scopeDeepCopy[i];
                    console.debug(article);

                    if (article.unit > 0 || article.packet > 0) {
                        var currentTotal = (article.packet * article.unitConversion) + article.unit;
                        if (currentTotal > article.max) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
            return false;
        }

        function convertQuotaValueToCs(article) {
            var csIsFirstConditionningUnit = article.uniteMesure == "CS" ? true : false;
            var totalValue = csIsFirstConditionningUnit ? (article.quotaVALUE / article.prixVente) : ( (article.quotaVALUE / article.prixVente) / article.unitConversion );
            var units = article.quotaQTY * article.unitConversion;

            //TO NOT BREAK UNITS INTO PIECES
            //SHOULD BE A ROUND NUMBER
            //FROM 2,12 units to 2 !!
            return Math.trunc(units + (totalValue * article.unitConversion));
        }

        function totalCs(article) {
            return article.packet + (article.unit / article.unitConversion);
        }

        function outOfStock(article) {

            if (typeof(article.totalStock) != "undefined" && article.totalStock > 0) {
                if (article.unit > 0 || article.packet > 0) {
                    var toCheck = article.unit + (article.packet * article.unitConversion);
                    //console.log(toCheck);
                    var verdict = article.totalStock < toCheck;
                    return verdict;
                }
                else {
                    // IF STOCK IS 0 SHOULD RETURN TRUE (OUTOFSTOCK !)
                    return false;
                }
            }
            else {
                return true;
            }
        }

        function outOfQuota(article) {

            if ((typeof(article.quotaQTY) != "undefined" || typeof(article.quotaVALUE) != "undefined") && (article.quotaVALUE > 0 || article.quotaQTY > 0)) {
                if (article.unit > 0 || article.packet > 0) {
                    //var toCheck = convertQuotaValueToCs(article);
                    var current = article.unit + (article.packet * article.unitConversion);
                    return current > article.quotaComparator;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }

        }


        function getArticleQty(article) {
            if (article.uniteMesure == "CS") {
                return (article.unit / article.unitConversion) + article.packet;
            }
            else {
                return (article.packet * article.unitConversion) + article.unit;
            }
        }

        function getHT(article) {
            var qty = getArticleQty(article);
            return qty * article.prixVente;
        }

        function getTTC(article) {
            if (typeof(article.tva) != "undefined" && article.tva != null && article.tva > 0) {
                return getHT(article) * (article.tva / 100);
            }
            else {
                return null;
            }
        }

        function prepareGift(article) {
            article.prixVente = 0;
            article.nomArticle = article.designation;
            return article;
        }

        function convertQuotaValueToCs(article) {

            var csIsFirstConditionningUnit = article.uniteMesure == "CS" ? true : false;
            var totalValue = csIsFirstConditionningUnit ? (article.quotaVALUE / article.prixVente) : ( (article.quotaVALUE / article.prixVente) / article.unitConversion );
            var units = article.quotaQTY * article.unitConversion;

            //TO NOT BREAK UNITS INTO PIECES
            //SHOULD BE A ROUND NUMBER
            //FROM 2,12 units to 2 !!
            return Math.trunc(units + (totalValue * article.unitConversion));
        }


        function prepareForScope(article, forChargement, prelevement, retour, dechargement, echange, sortant, entrant) {


            dechargement = typeof(dechargement) != "undefined" && dechargement == true;

            forChargement = typeof(forChargement) != "undefined" && forChargement == true;

            prelevement = typeof(prelevement) != "undefined" && prelevement == true;

            retour = typeof(retour) != "undefined" && retour == true;

            echange = typeof(echange) != "undefined" && echange == true;

            sortant = typeof(sortant) != "undefined" && sortant == true;

            entrant = typeof(entrant) != "undefined" && entrant == true;

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var isVendeur = profile.fonction == "vendeur";

            if (article.quotaVALUE > 0 || article.quotaQTY > 0) {
                //console.debug(article);

                var totalUnits = convertQuotaValueToCs(article);

                article.quotaComparator = totalUnits;

                var packets = Math.trunc(totalUnits / article.unitConversion);
                var units = totalUnits % article.unitConversion;

                article.quota = packets + ", " + units;
            }
            else {
                article.quota = "--";
            }

            if (isVendeur && typeof(article.totalStock) != "undefined" && article.totalStock != null && article.totalStock > 0) {
                //console.log(article);
                var stockPackets = Math.trunc(article.totalStock / article.unitConversion) || 0;
                var stockUnits = article.totalStock % article.unitConversion || 0;
                article.stock = stockPackets + ", " + stockUnits;
            }
            else
            {
                article.stock = "0, 0";
            }

            if (retour || prelevement || echange) {
                article.cause = "none";
                article.packet = 0;
                article.unit = 0;
            }

            if (forChargement) {
                article.packet = article.demandePacket || 0;
                article.unit = article.demandeUnit || 0;
            }

            if (!dechargement && !forChargement && !retour && !prelevement && !echange) {

                article.done = article.groupeSBD == null ? true : false;

                article.stc = article.shopPacket + ", " + article.shopUnit;

                article.packet = 0;

                article.unit = 0;

                article.promotions = JSON.parse("[" + article.promotions + "]");

            }

            return article;
        }

        function getHighest() {
            var sql_query = "SELECT id_db FROM articles ORDER BY id_db DESC LIMIT 1";
            return DB.query(sql_query).then(
                function (article) {
                    return DB.fetch(article);
                },
                function (error) {
                    return error
                });
        }

        function syncAllArticles() {
            var params = {
                url: "http://197.230.28.154:81/newsales/rest/items",
                method: "GET"
            };
            $http(params).then(
                function (success) {
                    console.log("Articles success from DB");
                    addAll(success.data);
                },
                function (error) {
                    console.log(JSON.stringify(error));
                });
        }

        function syncArticles() {
            var highestIDDB;
            var highestIDAPI;
            getHighest().then(
                function (success) {


                    if (success == null || success.id_db == 0) {
                        console.log("BASE DE DONNEE VIDE  !!");
                        syncAllArticles();
                    }
                    else {
                        console.log("BASE DE DONNEE NON VIDE  !!");
                        highestIDDB = success.id_db;
                        var request = {
                            url: "http://197.230.28.154:81/newsales/rest/items/sync",
                            method: 'GET'
                        };

                        $http(request).then(
                            function (success) {
                                highestIDAPI = success.data.id;
                                console.log("HIGHEST IN DB : " + highestIDDB);
                                console.log("HIGHEST IN API : " + highestIDAPI);
                                if (highestIDAPI > highestIDDB) {
                                    console.log("SOME UPDATES REMAINING !");
                                    //syncArticlesFrom(highestIDDB);
                                }
                                else {
                                    console.log("ARTICLES UP TO DATE !");
                                }
                            },
                            function (error) {
                                console.log(JSON.stringify(error));
                            });
                    }

                });

        }

        function syncArticlesFrom(_id) {
            var request = {
                url: "http://197.230.28.154:81/newsales/rest/items/from/" + _id,
                method: 'GET'
            };
            $http(request).then(
                function (success) {
                    console.log("Articles success from DB");
                    addAll(success.data);
                },
                function (error) {
                    console.log(JSON.stringify(error));
                });
        }

        function getArticleWithSBD(clientId) {
            /*
             I removed this "WHERE classe = 'A' just for testing be sure to add it soon !!"
             */
            var sql_query = "SELECT GS.id_db as id, GS.qte_min as min, Group_Concat(A.id_db) AS articles FROM groupes_sbd AS GS LEFT JOIN article_sbd AS ASBD ON ASBD.id_groupe_sbd = GS.id_db JOIN articles AS A ON ASBD.id_article = A.id_db WHERE GS.id_db NOT IN (SELECT groupe_sbd FROM sbd_exclusion WHERE client_id = ?) GROUP BY GS.id_db";
            return DB.query(sql_query, [clientId]).then(
                function (sbds) {
                    return DB.fetchAll(sbds);
                },
                function (error) {
                    return error;
                });
        }

        function dumpMarques() {
            return DB.query("SELECT * FROM marques;", []).then(function (results) {
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

        function getMarques(exclusion, isVendeur, forChargement, retour, echange, sortant, entrant) {
            //"SELECT M.* FROM articles AS A JOIN return_item AS RI ON RI.item_id = A.id_db JOIN returns AS R ON R.id = RI.return_id JOIN marque AS M ON M.marqueArticle = A.marqueArticle GROUP BY R.id"


            var mission = JSON.parse(window.localStorage["mission"] || "{}");

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var vendeurId = profile.id_db || 0;

            var activite = profile.activite || 0;

            var parametrage = profile.parametrage || {};

            var company = parametrage.company || {};

            var tenant_id = company.id || 0;

            forChargement = ( typeof(forChargement) != "undefined" && forChargement == true ) ? true : false;

            retour = ( typeof(retour) != "undefined" && retour == true) ? true : false;

            isVendeur = ( typeof(isVendeur) != "undefined" && isVendeur == true ) ? true : false;

            exclusion = typeof(exclusion) == "undefined" ? [] : exclusion;

            echange = typeof(echange) != "undefined" && echange == true;

            entrant = typeof(entrant) != "undefined" && entrant == true;

            sortant = typeof(sortant) != "undefined" && sortant == true;

            var sql_query;

            // All the current conditions are setted 0-0 1-0 1-1

            // Except 0-1
            if(echange && sortant && !entrant) {
                sql_query = "SELECT * FROM marque AS M WHERE M.id_db NOT IN (SELECT marque FROM marques_echange AS ME WHERE ME.entrant = 0 AND ME.sortant = 1 AND ME.activite = " + activite + " AND ME.societe = " + tenant_id +" AND ME.vendeur = " + vendeurId+ ") AND M.activite = " + activite + " AND M.societe = " + tenant_id + " AND M.activated = 1;";
            } else if(echange && !sortant && entrant) {
                sql_query = "SELECT * FROM marque AS M WHERE M.id_db NOT IN (SELECT marque FROM marques_echange AS ME WHERE ME.entrant = 1 AND ME.sortant = 0 AND ME.activite = " + activite + " AND ME.societe = " + tenant_id +" AND ME.vendeur = " + vendeurId+ ") AND M.activite = " + activite + " AND M.societe = " + tenant_id + " AND M.activated = 1;";
            } else if (retour) {
                sql_query = "SELECT M.* FROM articles AS A JOIN return_item AS RI ON RI.item_id = A.id_db JOIN returns AS R ON R.id = RI.return_id JOIN marque AS M ON M.id_db = A.marqueArticle AND A.societe = " + tenant_id + " AND A.activite = " + activite +" WHERE R.id = " + ( mission.return_id || 0) + " AND M.activated = 1 GROUP BY R.id;";
            } else {
                sql_query = "SELECT * FROM marque WHERE id_db NOT IN (" + exclusion.join(", ") + ") AND societe = " + tenant_id + " AND activite = " + activite + " AND activated = 1;";
            }
            return DB.query(sql_query).then(
                function (marques) {
                    console.debug(marques);
                    return DB.fetchAll(marques);
                },
                function (error) {
                    return error;
                });
        }


        function getArticlesByIds(ids) {
            return DB.query('SELECT * FROM articles WHERE id_db IN (' + ids.join(', ') + ')').then(
                function (articles) {
                    return DB.fetchAll(articles);
                },
                function (error) {
                    return error;
                });
        }

        function getArticleByIds(ids, promotion_id) {
            var sql_query = "SELECT A.nomArticle, A.id_db, GA.qte FROM articles AS A LEFT JOIN gratuite_article AS GA ON GA.article_id = A.id_db LEFT JOIN promotion_gratuite AS PG ON PG.id = GA.promotion_gratuite_id LEFT JOIN promotions AS P ON P.id_db = PG.promotion_id WHERE A.id_db IN (" + ids.join(',') + ") AND P.id_db = ?";
            var bindings = [promotion_id];
            return DB.query(sql_query, bindings).then(
                function (articles) {
                    return DB.fetchAll(articles);
                },
                function (error) {
                    return error;
                });

        }


        function getSBDArticles(client, today, employee, sbd)
        {
            var sql_query = 'SELECT ifnull(ST.total, 0) as totalStock, ifnull(PVC.unit, "--") AS shopUnit, ifnull(PVC.packet, "--") AS shopPacket, length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(ST.total, 0) as totalStock, ifnull(ST.total%A.unitConversion, 0) as unitStock, ifnull(ST.total/A.unitConversion, 0) as packetStock, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN stock AS PVC ON PVC.item = A.id_db AND PVC.client_id = ? AND PVC.date = ? LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.employee_id = ? LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND ? BETWEEN PT.startDate AND PT.endDate LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE GSBD.id_db = ? AND A.id_db NOT IN (SELECT article_id FROM articles_exclusions_bis WHERE vendeur = ?) GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;';
            var bindings = [client, today, employee, today, sbd, employee];

            return DB.query(sql_query, bindings).then(
                function(success){
                    console.log(success);
                    return DB.fetchAll(success);
                },
                function(error){
                    console.error(error);
                    return error;
                });
        }


        function getPromotionArticles(client, today, employee, promotion)
        {
            var sql_query = 'SELECT ifnull(ST.total, 0) as totalStock, ifnull(PVC.unit, "--") AS shopUnit, ifnull(PVC.packet, "--") AS shopPacket, length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(ST.total, 0) as totalStock, ifnull(ST.total%A.unitConversion, 0) as unitStock, ifnull(ST.total/A.unitConversion, 0) as packetStock, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN stock AS PVC ON PVC.item = A.id_db AND PVC.client_id = ? AND PVC.date = ? LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.employee_id = ? LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND ? BETWEEN PT.startDate AND PT.endDate JOIN promotion_article AS PA ON PA.article_id = A.id_db JOIN promotions AS P ON P.id_db = PA.promotion_id LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE A.id_db IN (SELECT article_id FROM promotion_article WHERE promotion_id = ?) AND A.id_db NOT IN (SELECT article_id FROM articles_exclusions_bis WHERE vendeur = ?) GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;';
            var bindings = [client, today, employee, today, promotion, employee];

            return DB.query(sql_query, bindings).then(
                function(success){
                    return DB.fetchAll(success);
                },
                function(error){
                    return error;
                });
        }

        function getArticlesByMarque(marque, isVendeur, forChargement, vendeurId, retour, echange, sortant, entrant) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var mission = JSON.parse(window.localStorage["mission"] || "{}");
            var activite = profile.activite || 0;

            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;



            var classeId = mission.classeClient || 0;

            vendeurId = typeof(vendeurId) != "undefined" ? vendeurId : 0;

            isVendeur = typeof(isVendeur) != "undefined" && isVendeur == true ? true : false;

            retour = typeof(retour) != "undefined" && retour == true ? true : false;

            echange = typeof(echange) != "undefined" && echange == true ? true : false;

            sortant = typeof(sortant) != "undefined" && sortant == true ? true : false;

            entrant = typeof(entrant) != "undefined" && entrant == true ? true : false;

            forChargement = typeof(forChargement) != "undefined" && forChargement == true ? true : false;

            var logs = [ ["marque", "isVendeur", "vendeurId", "forChargement", "retour", "echange", "echangeOUT", "echangeIN"], [Number(marque), isVendeur, vendeurId, forChargement, retour, echange, sortant, entrant] ];
            console.table(logs);


            var todayDate = DateUtilities.convertLongToYYYYMMDD(new Date());

            var bindings = [];

            var sql_query = "";

            


            //if(!forChargement && typeof window.localStorage['marques'] != "undefined" && typeof JSON.parse(window.localStorage['marques'])[marque] != "undefined" && typeof JSON.parse(window.localStorage['marques'])[marque].length > 0)

            if(isVendeur && echange && sortant) {
                sql_query = "SELECT A.*, 3000 as totalStock FROM articles AS A LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.activite = " + activite + " AND ST.societe = " + tenant_id + " AND employee_id = " + vendeurId + "  WHERE A.marqueArticle = ? AND A.id_db NOT IN (SELECT article FROM articles_echange AS AE WHERE AE.sortant = 1 AND AE.entrant = 0 AND AE.activite = " + activite + " AND AE.societe = " + tenant_id + " AND AE.vendeur = " + vendeurId + ") AND A.activite = " + activite + " AND A.societe = " + tenant_id + ";";
                bindings = [marque];
            } else if(isVendeur && echange && entrant) {
                sql_query = "SELECT * FROM articles AS A WHERE A.marqueArticle = ? AND A.id_db NOT IN (SELECT article FROM articles_echange AS AE WHERE AE.sortant = 0 AND AE.entrant = 1 AND AE.activite = " + activite + " AND AE.societe = " + tenant_id + " AND AE.vendeur = " + vendeurId + ") AND A.activite = " + activite + " AND A.societe = " + tenant_id + ";";
                bindings = [marque];
            } else if (isVendeur && forChargement) {
                sql_query = 'SELECT 0 as flag, length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull((SELECT SUM(CVL.unit) FROM chargement_vendeur AS CV JOIN chargement_vendeur_lignes AS CVL ON CVL.chargement_id = CV.id WHERE CV.vendeur_id = ? AND CV.activite = ' + activite + ' AND CV.societe = ' + tenant_id + ' AND CV.chargement = 1 AND CV.dechargement = 0 AND CV.state = 0 AND CVL.item_id = A.id_db ORDER BY CV.id DESC LIMIT 1), 0) as demandeUnit, ifnull((SELECT SUM(CVL.packet) FROM chargement_vendeur AS CV JOIN chargement_vendeur_lignes AS CVL ON CVL.chargement_id = CV.id WHERE CV.vendeur_id = ? AND CV.chargement = 1 AND CV.societe = ' + tenant_id + ' AND CV.activite = ' + activite + ' AND CV.dechargement = 0 AND CV.state = 0 AND CVL.item_id = A.id_db ORDER BY CV.id DESC LIMIT 1), 0) as demandePacket, ifnull(ST.total, 0) as totalStock, ifnull(ST.unit%A.unitConversion, 0) as unitStock, ifnull(ST.total/A.unitConversion, 0) as packetStock, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN chargement_vendeur as CV ON CV.vendeur_id = ? LEFT JOIN chargement_vendeur_lignes AS CVL ON CVL.chargement_id = CV.id LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.employee_id = ? AND ST.societe = ' + tenant_id + ' AND ST.activite = ' + activite + ' LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db AND QV.vendeur = ? AND QV.societe = ' + tenant_id + ' AND QV.activite = ' + activite + ' AND ( ? BETWEEN QV.debut AND QV.fin ) LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND PT.societe = ' + tenant_id + ' AND PT.activite = ' + activite + ' AND ? BETWEEN PT.startDate AND PT.endDate LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id AND P.activite = ' + activite + ' AND P.societe = ' + tenant_id + ' LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd AND GSBD.activite = ' + activite + ' AND GSBD.societe = ' + tenant_id + ' WHERE A.marqueArticle = ? AND A.societe = ? AND A.activite = ? AND A.id_db NOT IN (SELECT article_id FROM articles_exclusions_bis AS AEB WHERE AEB.vendeur = ? AND AEB.societe = ' + tenant_id + ' AND AEB.activite = ' + activite + ') GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;';
                console.log(sql_query);
                bindings = [vendeurId, vendeurId, vendeurId, vendeurId, vendeurId, todayDate, todayDate, marque, tenant_id, activite, vendeurId];
                console.log("chargement");
            } else if (isVendeur && retour) {
                console.log(mission.return_id, marque, vendeurId);
                sql_query = "SELECT RI.total as totalStock, A.prixVente, A.nomArticle, A.uniteMesure, A.nomArticle, A.unitConversion, A.id, A.id_db FROM articles AS A JOIN return_item AS RI ON RI.item_id = A.id_db JOIN returns AS R ON R.id = RI.return_id WHERE R.id = ? AND R.activite = " + activite + " AND R.societe = " + tenant_id + " AND A.marqueArticle = ? AND A.societe = " + tenant_id + " AND A.activite = " + activite + " AND A.id_db NOT IN (SELECT article_id FROM articles_exclusions_bis AS AEB WHERE AEB.vendeur = ? AND AEB.activite = " + activite + " AND AEB.societe = " + tenant_id + ") ;";
                bindings = [mission.return_id, marque, vendeurId];
                console.debug(sql_query);
                console.log("retour");
            }


            // PROMOTION QUERY
            // SELECT ifnull(ST.total, 0) as totalStock, ifnull(PVC.unit, "--") AS shopUnit, ifnull(PVC.packet, "--") AS shopPacket, length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(ST.total, 0) as totalStock, ifnull(ST.total%A.unitConversion, 0) as unitStock, ifnull(ST.total/A.unitConversion, 0) as packetStock, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN stock AS PVC ON PVC.item = A.id_db AND PVC.client_id = ? AND PVC.date = ? LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.employee_id = ? LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND ? BETWEEN PT.startDate AND PT.endDate JOIN promotion_article AS PA ON PA.article_id = A.id_db JOIN promotions AS P ON P.id_db = PA.promotion_id AND P.id_db = ? LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd AND A.id_db NOT IN (SELECT article_id FROM articles_exclusions_bis WHERE vendeur = ?) GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;


            // SBD QUERY
            // SELECT ifnull(ST.total, 0) as totalStock, ifnull(PVC.unit, "--") AS shopUnit, ifnull(PVC.packet, "--") AS shopPacket, length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(ST.total, 0) as totalStock, ifnull(ST.total%A.unitConversion, 0) as unitStock, ifnull(ST.total/A.unitConversion, 0) as packetStock, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN stock AS PVC ON PVC.item = A.id_db AND PVC.client_id = ? AND PVC.date = ? LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.employee_id = ? LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND ? BETWEEN PT.startDate AND PT.endDate LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd AND GSBD.id = ? AND A.id_db NOT IN (SELECT article_id FROM articles_exclusions_bis WHERE vendeur = ?) GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;
            else if (isVendeur) {
                sql_query = 'SELECT ifnull(PT.code, "--") as plan, ifnull(ST.total, 0) as totalStock, ifnull(PVC.unit, "--") AS shopUnit, ifnull(PVC.packet, "--") AS shopPacket, length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(ST.total, 0) as totalStock, ifnull(ST.total%A.unitConversion, 0) as unitStock, ifnull(ST.total/A.unitConversion, 0) as packetStock, ifnull(QV.qty, 0) as quotaQTY, ifnull(QV.value, 0) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN stock AS PVC ON PVC.item = A.id_db AND PVC.client_id = ? AND PVC.date = ? AND PVC.societe = ' + tenant_id + ' AND PVC.activite = ' + activite + ' LEFT JOIN stock AS ST ON ST.item = A.id_db AND ST.employee_id = ? AND ST.societe = ' + tenant_id + ' AND ST.activite = ' + activite + ' LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db AND QV.societe = ' + tenant_id + ' AND QV.activite = ' + activite + ' LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND PT.activite = ' + activite + ' AND PT.societe = ' + tenant_id + ' AND ( ? BETWEEN PT.startDate AND PT.endDate ) AND PT.client = ' + mission.client_id + ' LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id AND P.activite = ' + activite + ' AND P.societe = ' + tenant_id + ' AND P.id_db IN ( SELECT promotion_id FROM promotion_client WHERE client_id = ' + mission.client_id + ' ) AND P.activated = 1 AND P.id_db NOT IN ( SELECT promotion_id FROM promotion_consumption WHERE client_id = ' + mission.client_id + ' AND societe = ' + tenant_id + ' AND activite = ' + activite + ' ) LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd AND GSBD.classe_id = ' + classeId + ' AND GSBD.id_db NOT IN (SELECT groupe_sbd FROM sbd_exclusion WHERE client_id = ' + ( mission.client_id || 0 ) + ') AND GSBD.societe = ' + tenant_id + ' AND GSBD.activite = ' + activite + ' AND GSBD.classe_id = ' + classeId + ' WHERE A.marqueArticle = ? AND A.societe = ? AND A.id_db NOT IN (SELECT article_id FROM articles_exclusions_bis AS AEB WHERE AEB.activite = ' + activite + ' AND AEB.societe = ' + tenant_id + ' AND AEB.vendeur = ? ) GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;';
                console.log(sql_query);
                bindings = [mission.client_id, todayDate, vendeurId, todayDate, marque, tenant_id, vendeurId];
            } else {
                sql_query = 'SELECT ifnull(PT.code, "--") as plan, ifnull(PVC.unit, "--") AS shopUnit, ifnull(PVC.packet, "--") AS shopPacket, length(Group_Concat(ifnull(GSBD.id_db, "")) ||","||Group_Concat(ifnull(P.id_db, ""))) as length, ifnull(QC.qty, ifnull(QV.qty, 0)) as quotaQTY, ifnull(QC.value, ifnull(QV.value, 0)) as quotaVALUE , ifnull(PT.prixArticle, A.prixVente) as "prixVente", A.id AS "id", A.id_db AS "id_db", A.nomArticle AS "nomArticle", A.unitConversion, A.uniteMesure, A.tva, ifnull(Group_Concat(DISTINCT P.id_db), "") AS "promotions", ifnull(GSBD.id_db, "") AS "groupeSBD" FROM articles AS A LEFT JOIN stock AS PVC ON PVC.item = A.id_db AND PVC.client_id = ? AND PVC.date = ? AND PVC.societe = ' + tenant_id + ' AND PVC.activite = ' + activite + ' LEFT JOIN quota_vendeur AS QV ON QV.itemId = A.id_db AND QV.societe = ' + tenant_id + ' AND QV.activite = ' + activite + ' AND QV.vendeur = ? AND ( ? BETWEEN QV.debut AND QV.fin ) LEFT JOIN quota_client AS QC ON QC.itemId = A.id_db AND QC.client = ' + mission.client_id + ' AND QC.activite = ' + activite + '  AND QC.societe = ' + tenant_id + ' AND ( ? BETWEEN QC.debut AND QC.fin ) LEFT JOIN plan_tarifaire AS PT ON PT.itemId = A.id_db AND PT.client = ? AND PT.actif = 1 AND ( ? BETWEEN PT.startDate AND PT.endDate) AND PT.societe = ' + tenant_id + ' AND PT.activite = ' + activite + ' LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id AND P.activite = ' + activite + ' AND P.societe = ' + tenant_id + ' AND P.id_db IN ( SELECT promotion_id FROM promotion_client WHERE client_id = ' + mission.client_id + ' ) AND P.activated = 1 AND P.id_db NOT IN ( SELECT promotion_id FROM promotion_consumption WHERE client_id = ' + mission.client_id + ' AND societe = ' + tenant_id + ' AND activite = ' + activite + ' ) LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd AND GSBD.classe_id = ' + classeId + ' AND GSBD.activite = ' + activite + ' AND GSBD.societe = ' + tenant_id + ' AND GSBD.id_db NOT IN (SELECT groupe_sbd FROM sbd_exclusion WHERE client_id = ' + mission.client_id + ') AND GSBD.classe_id = ' + classeId + ' WHERE A.marqueArticle = ? AND A.societe = ? AND A.id_db NOT IN (SELECT article_id FROM articles_exclusions_bis AS AEB WHERE AEB.activite = ' + activite + ' AND AEB.societe = ' + tenant_id + ' AND AEB.vendeur = ?) GROUP BY A.id_db ORDER BY length(groupeSBD) DESC;';
                bindings = [mission.client_id, todayDate, vendeurId, todayDate, todayDate,  mission.client_id, todayDate, marque, tenant_id, vendeurId];
            }

            return DB.query(sql_query, bindings).then(
                function (articles) {
                    console.error(articles);
                    return DB.fetchAll(articles);
                },
                function (error) {
                    console.error(error);
                    return error;
                });

        }

        function getRemainingByIds(ids) {
            var sql_query = "SELECT A.prixVente as 'prixVente', A.id AS 'id', A.id_db AS 'id_db', A.nomArticle AS 'nomArticle', Group_Concat(DISTINCT P.id_db) AS 'promotions', GSBD.id_db AS 'groupeSBD' FROM articles AS A LEFT JOIN promotion_article AS PA ON PA.article_id = A.id_db LEFT JOIN promotions AS P ON P.id_db = PA.promotion_id LEFT JOIN article_sbd AS ASBD ON ASBD.id_article = A.id_db LEFT JOIN groupes_sbd AS GSBD ON GSBD.id_db = ASBD.id_groupe_sbd WHERE A.id IN (" + ids.join(', ') + ") GROUP BY A.id_db";
            return DB.query(sql_query).then(
                function (articles) {
                    return DB.fetchAll(articles);
                },
                function (error) {
                    return error;
                });

        }

        function getNonConsumedPromotions(array_ids) {
            var sql_query = "SELECT * FROM promotions AS P JOIN articles AS A ON P.article = a.id_db WHERE P.article NOT IN (?)";
            var bindings = [array_ids];
            return DB.query(sql_query, bindings).then(
                function (promotions) {
                    return DB.fetchAll(promotions);
                },
                function (error) {
                    return error;
                });
        }

        function getArticle(_id) {
            var sql_query = "SELECT * FROM articles WHERE id_db = ?";
            var bindings = [_id];
            return DB.query(sql_query, bindings).then(
                function (article) {
                    return DB.fetch(article);
                },
                function (error) {
                    return error;
                });
        }

        function add(article) {
            console.log(JSON.stringify(article));
            var deferred = $q.defer();
            var sql_query = "INSERT INTO articles(id_db, prixAchat, nomArticle, prixVente, tva, uniteMesure, typeArticle, marqueArticle, unitConversion) values(?,?,?,?,?,?,?,?,?);"
            var bindings = [article.id, article.price, article.fullDescription, article.salePrice, article.tva, 'UN', 'P&G', article.sousMarque.name, article.unitConversion];
            return DB.query(sql_query, bindings).then(
                function (article) {

                    console.log(JSON.stringify(article));
                    return article;
                },
                function (error) {
                    console.log(JSON.stringify(error));
                    return error;
                });
        }

        function addAll(articles) {
            angular.forEach(articles, function (article) {
                add(article).then(function (success) {
                    console.log(success);
                }, function (error) {
                    console.log(JSON.stringify(error));
                });
                Marques.add(article).then(function (success) {
                    console.log(success);
                }, function (error) {
                    console.log(JSON.stringify(error));
                });
            });
        }
    })

    .factory("Marques", function (DB, $http) {
        return {
            addMarqueToLocalStorage: addMarqueToLocalStorage,
            add: add,
            addToBrandFive: addToBrandFive,
            getBrandFiveFromDB: getBrandFiveFromDB,
            getBrandFiveFromLocalDB: getBrandFiveFromLocalDB,
            getAll: getAll
        };


        function addMarqueToLocalStorage(brandName, articles) {
            if (typeof window.localStorage['marques'] == "undefined") {
                window.localStorage['marques'] == '{}';
            }

            var marques = JSON.parse(window.localStorage['marques'] || '{}');

            if (typeof marques[brandName] == 'undefined') {
                marques[brandName] = articles;
                window.localStorage['marques'] = JSON.stringify(marques);
            }
        }


        function getAll() {
            var sql_query = "SELECT * FROM marque;";
            return DB.query(sql_query).then(
                function (brandfives) {
                    return DB.fetchAll(brandfives);
                },
                function (error) {
                    return error;
                });
        }

        function getBrandFiveFromLocalDB() {
            var sql_query = "SELECT * FROM brand_five;";
            return DB.query(sql_query).then(
                function (brandfives) {
                    return DB.fetchAll(brandfives);
                },
                function (error) {
                    return error;
                });
        }

        function getBrandFiveFromDB() {
            var req = {
                url: '',
                method: 'GET'
            };
            $http(req).then(
                function (brands) {
                    unSetBrandFive().then(
                        function (success) {
                            angular.forEach(brands, function (brand) {
                                addToBrandFive(brand.id);
                            });
                        },
                        function (error) {

                        })
                },
                function (error) {

                });
        }

        function addToBrandFive(_id) {
            var sql_query = "UPDATE marques SET five = true WHERE id_db = ?;";
            var bindings = [_id];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                }, function (error) {
                    return error;
                });
        }

        function unSetBrandFive() {
            var sql_query = "UPDATE marques SET five = ?;";
            var bindings = [false];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                }, function (error) {
                    return error;
                });
        }

        function add(article) {
            var sql_query = "INSERT INTO marque(id, marqueArticle, logo) values(?,?,?);";
            var bindings = [article.sousMarque.marque.id, article.sousMarque.marque.name, ''];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    console.log(JSON.stringify(marque));
                    return success;
                },
                function (error) {
                    console.log(JSON.stringify(error));
                    return error;
                });

        }

        function addToBrandFive() {

        }

    })

    .factory("Missions", function (DB, $q, $http, $log, DateUtilities, Promotions, PrinterService, LigneCommandes) {
        return {
            getAllMissions: getAllMissions,
            getMission: getMission,
            getFinishedMission: getFinishedMission,
            syncMissions: syncMissions,
            getHighestMission: getHighestMission,
            getUnfinishedMissions: getUnfinishedMissions,
            getFinishedMissions: getFinishedMissions,
            countMissions: countMissions,
            getMissionsWithCommande: getMissionsWithCommande,
            getMissions5WithCommande: getMissions5WithCommande,
            getMissionsWithCommandeByClient: getMissionsWithCommandeByClient,
            getMissions5WithCommandeByClient: getMissions5WithCommandeByClient,
            setMissionToSucceed: setMissionToSucceed,
            getVendeurRoutes: getVendeurRoutes,
            setEntryDate: setEntryDate,
            setExitDate: setExitDate,
            getTodaysMissions: getTodaysMissions,
            getYesterdayMissions: getYesterdayMissions,
            getOtherMissions: getOtherMissions,
            getMissionsBetween: getMissionsBetween,
            addLocalMission: addLocalMission,
            setMissionToSucceedLocal: setMissionToSucceedLocal,
            setToSynced: setToSynced,
            addMissionLivreur: addMissionLivreur,
            setMissionLivreurToLivred: setMissionLivreurToLivred,
            getNonSyncedLivredMissions: getNonSyncedLivredMissions,
            setMissionLivredInAPI: setMissionLivredInAPI,
            setMissionToSynced: setMissionToSynced,
            missionFinishForLivreur: missionFinishForLivreur,
            checkOut: checkOut,
            cancel: cancel
        };

        function cancel(id) {
            var sql_query = "UPDATE missions SET state = 2 WHERE id = ?;";
            var bindings = [id];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success
                },
                function (error) {
                    return error;
                });
        }

        function addLocalMission(mission) {
            var todayDate = DateUtilities.convertLongToYYYYMMDD(new Date());
            var sql_query = "INSERT INTO missions(client_id, route_id, date_start, state, finished, problem, synced, local) values(?,?,?,?,?,?,?,?)";
            var bindings = [mission.client_id, mission.route_id, todayDate, 1, 0, 0, 0, 1];
            return DB.query(sql_query, bindings).then(
                function (mission) {
                    return mission;
                },
                function (error) {
                    return error;
                });
        }

        function updateIdCommandeForMission(idMission, idCommande, isLocal, printContent) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            isLocal = typeof(isLocal) != "undefined" && isLocal == true;

            printContent = printContent || null

            console.log(printContent);

            var query = "";
            var bindings = [];

            if(isLocal)
            {
                query = "UPDATE missions set commande_id = ?, state = 1 WHERE id = ? AND activite = " + activite + " AND societe = " + tenant_id + ";";
                bindings = [ idCommande, idMission];
            }
            else
            {
                query = "UPDATE missions set commande_id = ?, state = 1, print_content = ? WHERE id = ? AND activite = " + activite + " AND societe = " + tenant_id + ";";
                bindings = [ idCommande, printContent, idMission];
            }

            console.log(query, bindings);
            DB.query(query, bindings).then(
                function (success) {
                    $log.error(success);
                },
                function (error) {
                    $log.error(error);
                });
        }

        function commandeDiscountsHistory(mission_id, commande_id, commandeDiscounts, lines, livreur) {
            var isLivreur = typeof(livreur) != "undefined" && livreur == true;
            var options = [];
            var deferred = $q.defer();

            if (commandeDiscounts.length > 0) {
                angular.forEach(commandeDiscounts, function (discount, index) {
                    options.push("(0, 1, " + commande_id + ", " + discount.rank + ", " + discount.value + ", " + discount.remiseP + ", " + discount.remiseV + ", " + discount.promotion_id + ", " + discount.priorite + ")");
                    if (index == commandeDiscounts.length - 1) {
                        console.log(options);
                        return DB.query("INSERT INTO discounts_history(line_id, cumule, commande_id, rank, value, remiseP, remiseV, promotion_id, priorite) VALUES " + options.join(", ") + ";")
                            .then(
                                function (success) {
                                    deferred.resolve(LigneCommandes.addLinesToDB(mission_id, commande_id, lines));
                                },
                                function (error) {
                                    deferred.reject({level: 1, mission_id: mission_id, error: error.message});
                                })
                    }
                });
            }
            else {
                console.log("here !");
                console.log(lines);
                if (lines.length > 0) {
                    deferred.resolve(LigneCommandes.addLinesToDB(mission_id, commande_id, lines,isLivreur));
                }
                else {
                    deferred.resolve("DONE");
                }
            }


            return deferred.promise;
        }

        function checkOut(missionId, lines, isLocal, paymentId, paymentDate, ttc, ht, commandeDiscounts, discount, totalFactureDiscounts, charakas, charakasUpdate, livreur) {

            var deferred = $q.defer();

            var isLivreur = typeof(livreur) != "undefined" && livreur == true;

            var mission = JSON.parse(window.localStorage["mission"] || "{}");

            console.log(mission.contentToPrint);

            var cause = mission.cause || "";

            var todayDate = DateUtilities.convertLongToYYYYMMDD(new Date());

            var missionObject = JSON.parse(window.localStorage['mission'] || "{}");

            console.log(missionObject);

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;



            if (isLocal) {

                console.log("isLocal");

                var sql_query = "INSERT INTO missions(client_id, route_id, date_start, state, finished, problem, synced, local, entryDate, exitDate, latitude, longitude, cause, print_content, activite, societe) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                var entryDate = missionObject.entryDate || 0;
                var exitdate = missionObject.exitDate || 0;
                var latitude = missionObject.lat || 0;
                var longitude = missionObject.lng || 0;
                var printContent = missionObject.contentToPrint || null;

                var bindings = [missionObject.client_id, missionObject.route_id, todayDate, 1, 0, 0, 0, 1, entryDate, exitdate, latitude, longitude, cause, printContent,activite, tenant_id];
                DB.query(sql_query, bindings).then(
                    function (mission) {
                        if (mission.insertId) {
                            var id_mission = mission.insertId;
                            console.debug('1');
                            deferred.resolve(addCommande(id_mission, lines, true, paymentId, paymentDate, ttc, ht, commandeDiscounts, discount, totalFactureDiscounts, charakas, charakasUpdate, isLivreur, printContent));
                        }
                    },
                    function (error) {
                        console.debug('1');
                        deferred.reject({level: 0, error: error});
                    });
            }
            else {
                console.debug("IS NOT LOCAL !");
                console.debug(missionId);

                deferred.resolve(addCommande(missionId, lines, false, paymentId, paymentDate, ttc, ht, commandeDiscounts, discount, totalFactureDiscounts, charakas, charakasUpdate, isLivreur, printContent));
            }
            return deferred.promise;
        }


        function addCommande(mission_id, lines, isLocal, paymentId, paymentDate, ttc, ht, commandeDiscounts, discount, totalFactureDiscounts, charakas, charakasUpdate, livreur, printContent) {

            var isLivreur = typeof(livreur) != "undefined" && livreur == true;

            var missionObject = JSON.parse(window.localStorage['mission'] || "{}");

            var modernProcess = missionObject.modernProcess || {};

            var depot = modernProcess.choosen || 0;

            depot = depot > 0 ? depot : null;

            var date_livraison = modernProcess.date_livraison || 0;

            var adresse_livraison = modernProcess.adresse_livraison || "";

            var input = Promotions.getConsumedPromotionsAndSBDs(missionObject.client_id);

            var sbds = input.sbds.join(", ");

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var promotions = input.promotions.join(", ");

            var timbre = missionObject.timbre || 0;

            var deferred = $q.defer();
            var updateOrInsertQuery=(isLivreur)?
                                "UPDATE commandes SET code_commande=?, id_mission=?, id_client=?, sbd=?, promotions=?, paymentDate=?, remise=?, paymentId=?, totalTTC=?, totalHT=?, totalEscompteDiscount=?,charaka=?, increment=?, depot=?, date_livraison = ?, adresse_livraison = ?, timbre = ? WHERE id_mission = " + ( missionObject.missionId || 0 ) + ";":
                                "INSERT INTO commandes(code_commande, id_mission, id_client, sbd, promotions, paymentDate, remise, paymentId, totalTTC, totalHT, totalEscompteDiscount, charaka, increment, depot, date_livraison, adresse_livraison, timbre) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"


            var totalEscompteDiscount = ttc * (discount / 100);
            console.log(updateOrInsertQuery);
             DB.query(updateOrInsertQuery,
                    [
                        ("CE" + new Date().getTime()),
                        mission_id,
                        missionObject.client_id,
                        sbds,
                        promotions,
                        DateUtilities.convertLongToYYYYMMDD(paymentDate),
                        totalFactureDiscounts,
                        paymentId,
                        ttc,
                        ht,
                        totalEscompteDiscount,
                        JSON.stringify(charakasUpdate),
                        profile.factureIncrement || 0,
                        depot,
                        date_livraison,
                        adresse_livraison,
                        timbre])
                    .then(
                        function (commande) {

                            console.log(commande);
                            console.debug('2');
                                console.debug('3');
                                profile.factureIncrement += 1;

                                window.localStorage["profile"] = JSON.stringify(profile || "{}");

                                var commande_id = isLivreur ? ( missionObject.id_commande || 0 ) : ( commande.insertId || 0 );
                                console.log(commande_id);
                                if(commande_id == 0)
                                {
                                    deferred.reject({level: 1, mission_id: mission_id, error: "no id commande"});
                                    return deferred.promise;
                                }
                                // Updating the id of the commande !!
                                // Get the commande from the mission !!

                                if(!isLivreur){
                                    console.log("SHOULD UPDATE !!!");
                                    console.log("SHOULD BE SETTED TO STATE 1 ");
                                    console.log(mission_id, commande_id, isLocal, printContent);
                                    updateIdCommandeForMission(mission_id, commande_id, isLocal, ( missionObject.contentToPrint || null ) );
                                }
                                else
                                {
                                    console.log(missionObject);
                                    var latitude = missionObject.lat || 0;
                                    var longitude = missionObject.lng || 0;
                                    var entryDate =  missionObject.entryDate || 0;
                                    var exitDate = missionObject.exitDate || 0;
                                    var printContent = missionObject.contentToPrint || null;

                                    updateMissionState(mission_id, latitude, longitude, entryDate, exitDate,  printContent).then(function(success){ console.log(success); }, function(error){ console.log(error); });
                                }
                                DB.query("UPDATE accounts SET factureIncrement = factureIncrement + 1 WHERE id_db = " + ( profile.id_db || 0) + " AND activite = " + activite + " AND societe = " + tenant_id + ";");

                                angular.forEach(input.sbds, function (sbd) {
                                    console.log(sbd);
                                    DB.query("INSERT INTO sbd_exclusion (client_id, groupe_sbd) VALUES (" + missionObject.client_id + ", " + sbd + ");").then(
                                        function (success) {

                                            DB.query("UPDATE accounts SET golden_points = golden_points + " + 1 + " WHERE id_db = " + (profile.id_db || 0) + " AND societe = " + tenant_id + " AND activite = " + activite + ";")
                                                .then(
                                                    function (success) {
                                                        profile.golden_points += 1;
                                                        window.localStorage["profile"] = JSON.stringify(profile);
                                                    },
                                                    function (error) {
                                                        console.log(error);
                                                    });
                                        },
                                        function (error) {
                                            console.log(error);
                                        });
                                });

                                angular.forEach(charakasUpdate, function (charaka) {
                                    var sql_query = "UPDATE promotion_charaka SET reste = " + charaka.reste + " WHERE id = " + charaka.id + ";"
                                    console.log(sql_query);
                                    DB.query(sql_query).then(
                                        function (success) {
                                            console.debug(success);
                                        },
                                        function (error) {
                                            console.debug(error);
                                        });
                                });

                                //console.log(commandeDiscounts);

                                deferred.resolve(commandeDiscountsHistory(mission_id, commande_id, commandeDiscounts, lines, isLivreur));
                            
                        },
                        function (error) {
                            deferred.reject({level: 1, mission_id: mission_id, error: error.message});
                            return deferred.promise;
                        });
           /* DB.query("DELETE FROM commandes WHERE id_mission = " + ( missionObject.missionId || 0 ) + ";").then(
                function(){
                    DB.query(
                    "INSERT INTO commandes(code_commande, id_mission, id_client, sbd, promotions, paymentDate, remise, paymentId, totalTTC, totalHT, totalEscompteDiscount, charaka, increment, depot) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
                    [
                        ("CE" + new Date().getTime()),
                        mission_id,
                        missionObject.client_id,
                        sbds,
                        promotions,
                        DateUtilities.convertLongToYYYYMMDD(paymentDate),
                        totalFactureDiscounts,
                        paymentId,
                        ttc,
                        ht,
                        totalEscompteDiscount,
                        JSON.stringify(charakasUpdate),
                        profile.factureIncrement || 0,
                        missionObject.depot || 0])
                    .then(
                        function (commande) {
                            console.debug('2');
                            if (commande.insertId) {
                                console.debug('3');
                                profile.factureIncrement += 1;

                                window.localStorage["profile"] = JSON.stringify(profile || "{}");

                                var commande_id = commande.insertId;
                                // Updating the id of the commande !!
                                // Get the commande from the mission !!

                                updateIdCommandeForMission(mission_id, commande_id, isLocal);

                                DB.query("UPDATE accounts SET factureIncrement = factureIncrement + 1 WHERE id_db = " + ( profile.id_db || 0) + ";");

                                angular.forEach(input.sbds, function (sbd) {
                                    console.log(sbd);
                                    DB.query("INSERT INTO sbd_exclusion (client_id, groupe_sbd) VALUES (" + missionObject.client_id + ", " + sbd + ");").then(
                                        function (success) {

                                            DB.query("UPDATE accounts SET golden_points = golden_points + " + 1 + " WHERE id_db = " + (profile.id_db || 0) + ";")
                                                .then(
                                                    function (success) {
                                                        profile.golden_points += 1;
                                                        window.localStorage["profile"] = JSON.stringify(profile);
                                                    },
                                                    function (error) {
                                                        console.log(error);
                                                    });
                                        },
                                        function (error) {
                                            console.log(error);
                                        });
                                });

                                angular.forEach(charakasUpdate, function (charaka) {
                                    var sql_query = "UPDATE promotion_charaka SET reste = " + charaka.reste + " WHERE id = " + charaka.id + ";"
                                    console.log(sql_query);
                                    DB.query(sql_query).then(
                                        function (success) {
                                            console.debug(success);
                                        },
                                        function (error) {
                                            console.debug(error);
                                        });
                                });

                                //console.log(commandeDiscounts);

                                deferred.resolve(commandeDiscountsHistory(mission_id, commande_id, commandeDiscounts, lines));
                            }
                            else {
                                deferred.reject({level: 1, mission_id: mission_id, error: commande});
                                return deferred.promise;
                            }
                        },
                        function (error) {
                            deferred.reject({level: 1, mission_id: mission_id, error: error.message});
                            return deferred.promise;
                        });
                }, 
                function(){

                })
*/
            return deferred.promise;
        }


        function updateMissionState(mission_id, latitude, longitude, entryDate, exitDate, printContent) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query = "UPDATE missions SET state = 1, latitude = ?, longitude = ?, entryDate = ?, exitDate = ?, print_content = ? WHERE id_db = ? AND activite = " + activite + " AND societe = " + tenant_id + ";";
            var bindings = [latitude, longitude, entryDate, exitDate, printContent, mission_id];
            return DB.query(sql_query, bindings).then(
                function(success){
                    return success;
                }, 
                function(error){
                    return error;
                });
        }

        function missionFinishForLivreur(array) {
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
            for (var i = 0, len = stockKeys.length; i < len; i++) {
                var key = stockKeys[i];
                var remaining = stock[key];
                var packet = Math.trunc(remaining / 10);
                var unit = remaining % 10;
                requests.push('UPDATE stock_livreur SET packet = ' + packet + ' AND unit = ' + unit + ' WHERE item = ' + key + ';');
            }
            requests.push("UPDATE missions_livreur SET state = " + 1 + " WHERE id_db = " + mission + ";");
            requests.push("DELETE FROM ligneCommandes_livreur WHERE id_commande = (SELECT commande_id FROM missions_livreur WHERE id_db = " + mission + ");");
            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                addonsLines.push("( (SELECT commande_id FROM missions_livreur WHERE id_db = " + mission + "), " + item.id_db + ", " + item.packet + ", " + item.unit + ", " + item.prixVente + ", " + item.remise + ", " + (item.prixVente == 0 ? 1 : 0) + ")");
            }
            requests.push("INSERT INTO ligneCommandes_livreur(id_commande, id_article, packet, unit, pu_ht, remise, isGift) VALUES " + addonsLines.join(", ") + ";");
            for (var i = 0, len = requests.length; i < len; i++) {
                var sql_query = requests[i];
                console.log(sql_query);
                DB.query(sql_query).then(
                    function (success) {
                        console.log(success);
                    },
                    function (error) {
                        console.log(error);
                    });
            }
            requests = [];
            PrinterService.formatedContent([items, JSON.parse(window.localStorage['mission'] || '{}'), ht, ttc, escompte, 2], "Livreur").then(
                function (success) {
                    deferred.resolve(success);
                },
                function (error) {
                    deferred.resolve(error);
                });

            return deferred.promise;

        }

        function setMissionToSynced(id) {
            var sql_query = "UPDATE missions_livreur SET synced = 1 WHERE id_db = ?;";
            var bindings = [id];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                },
                function (error) {
                    return error;
                });
        }

        function setMissionLivredInAPI(id) {
            var request = {
                url: "http://197.230.28.154:81/newsales/rest/livreurs/sync/" + id,
                method: "GET"
            };

            return $http(request);
        }

        function getNonSyncedLivredMissions() {
            var sql_query = "SELECT id_db FROM missions_livreur WHERE finished = 1 AND synced = 0;";
            return DB.query(sql_query).then(
                function (success) {
                    return DB.fetchAll(success);
                },
                function (error) {
                    return error;
                });
        }

        function setMissionLivreurToLivred(id) {
            var sql_query = "UPDATE missions_livreur SET finished = 1, state = 1 WHERE id_db = ?;";
            var bindings = [id];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return DB.fetch(success);
                },
                function (error) {
                    return error;
                });
        }

        function setToSynced(_idDB, _idMission) {
            var sql_query = "UPDATE missions set synced = 1, id_db = ? WHERE id = ?";
            var bindings = [_idDB, _idMission];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    console.log(success);
                    return DB.fetch(success);
                },
                function (error) {
                    console.log(error);
                    return error;
                });
        }


        function setEntryDate(mission_id, dateValue) {
            var sql_query = "UPDATE missions SET entryDate = ? WHERE id = ?";
            var bindings = [mission_id, dateValue];
            return DB.query(sql_query, bindings).then(function (success) {
                    return success;
                },
                function (error) {
                    return error;
                });
        }

        function setExitDate(mission_id, dateValue) {
            var sql_query = "UPDATE missions SET exitDate = ? WHERE id = ?";
            var bindings = [mission_id, dateValue];
            return DB.query(sql_query, bindings).then(function (success) {
                    return success;
                },
                function (error) {
                    return error;
                });
        }

        function getTodaysMissions(_idVendeur, tenant_id, activite) {
            //var sql_query = "SELECT C.*, ifnull(COSB.message, '') as message, ifnull(COSB.osb, 0) as osb, ifnull(COSB.commande, 1) as authorized FROM clients AS C LEFT JOIN client_osb AS COSB ON COSB.client_id = C.id_db WHERE C.id_db = ?";

            var sql_query = "SELECT ifnull(COSB.message, '') as message, ifnull(COSB.osb, 0) as osb, ifnull(COSB.commande, 1) as authorized, R.code as codeRoute, M.id as id_mission, M.local, M.code_mission, M.client_id, M.route_id, M.state, ifnull(C.type, 0) as typeClient, ifnull(C.channel, 0) as channelClient, C.classe as classeClient, C.lat, C.lng, C.nom, C.prenom, C.code_client FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id LEFT JOIN client_osb AS COSB ON COSB.client_id = M.client_id JOIN routes AS R ON R.id_db = M.route_id WHERE M.date_start == date('now') AND M.local = 0 AND M.id_db IS NOT NULL AND M.route_id IN(SELECT id_db FROM routes WHERE vendeur = ? AND societe = ? AND activite = ?)";
            var bindings = [_idVendeur, tenant_id, activite];
            return DB.query(sql_query, bindings).then(function (missions) {
                    console.log(missions);
                    return DB.fetchAll(missions);
                },
                function (error) {
                    console.log(error);
                    return error;
                });
        }

        function getYesterdayMissions(_idVendeur, tenant_id, activite) {

            var sql_query = "SELECT ifnull(COSB.message, '') as message, ifnull(COSB.osb, 0) as osb, ifnull(COSB.commande, 1) as authorized, R.code codeRoute, M.id as id_mission, M.local, M.code_mission, M.client_id, M.route_id, M.state, ifnull(C.type, 0) as typeClient, ifnull(C.channel, 0) as channelClient, C.classe as classeClient, C.lat, C.lng, C.nom, C.prenom, C.code_client FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id LEFT JOIN client_osb AS COSB ON COSB.client_id = M.client_id JOIN routes AS R ON R.id_db = M.route_id WHERE date_start == date('now', '-1 day') AND local = 0 AND M.id_db IS NOT NULL AND M.route_id IN(SELECT id_db FROM routes WHERE vendeur = ? AND societe = ? AND activite = ?)";
            var bindings = [_idVendeur, tenant_id, activite];
            return DB.query(sql_query, bindings).then(function (missions) {
                    console.log(missions);
                    return DB.fetchAll(missions);
                },
                function (error) {
                    return error;
                });
        }

        function getMissionsBetween(now, time, _idVendeur) {
            var sql_query = "SELECT M.id as id_mission, M.code_mission, M.client_id, M.route_id, M.state, C.lat, C.lng, C.nom, C.prenom, C.code_client  FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id WHERE date_start >= ? AND date_start < ? AND route_id IN(SELECT id_db FROM routes WHERE vendeur = ?)";
            var bindings = [now, time, _idVendeur]
            return DB.query(sql_query, bindings).then(function (missions) {
                    return DB.fetchAll(missions);
                },
                function (error) {
                    return error;
                });
        }

        function getOtherMissions(_idVendeur, tenant_id, activite) {
            var sql_query = "SELECT M.id as id_mission, M.code_mission, M.client_id, M.route_id, M.state, C.lat, C.lng, ifnull(C.type, 0) as typeClient, ifnull(C.channel, 0) as channelClient, C.classe as classeClient, C.nom, C.prenom, C.code_client  FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id WHERE date_start = date('now') AND M.local = 1 AND M.state = 1 AND M.route_id IN(SELECT id_db FROM routes WHERE vendeur = ? AND societe = ? AND activite = ?)";
            var bindings = [_idVendeur, tenant_id, activite];
            return DB.query(sql_query, bindings).then(function (success) {
                    return DB.fetchAll(success);
                },
                function (error) {
                    return error;
                });
        }

        function getVendeurRoutes(id_db) {
            var sql_query = "SELECT code FROM routes WHERE vendeur = " + id_db + ";";
            return DB.query(sql_query).then(
                function (success) {
                    return DB.fetchAll(success);
                },
                function (error) {
                    console.log(error.message);
                });
        }

        function getMission(mission_id) {
            var sql_query = "SELECT client_id FROM missions WHERE id = ?";
            var bindings = [mission_id];
            return DB.query(sql_query, bindings).then(
                function (mission) {
                    return DB.fetch(mission);
                },
                function (error) {
                    return error;
                });
        }

        function getFinishedMission(mission_id) {
            var sql_query = "SELECT client_id FROM missions WHERE id = ? AND state = ?";
            var bindings = [mission_id, 1];
            return DB.query(sql_query, bindings).then(
                function (mission) {
                    return DB.fetch(mission);
                },
                function (error) {
                    return error;
                });
        }

        function setMissionToSucceed(_idMission, commande_id, entryDate, exitDate) {
            var sql_query = "UPDATE missions SET state = ?, commande_id = ?, entryDate = ?, exitDate = ? WHERE id = ?";
            var bindings = [1, commande_id, entryDate, exitDate, _idMission];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                },
                function (error) {
                    return error;
                })
        }

        function setMissionToSucceedLocal(_idMission, commande_id) {
            var sql_query = "UPDATE missions SET state = ?, commande_id = ? WHERE id = ?";
            var bindings = [1, commande_id, _idMission];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    return success;
                },
                function (error) {
                    return error;
                })
        }

        function getMissionsWithCommandeByClient(_idClient) {
            var sql_query = "SELECT * FROM missions WHERE state = ?  AND client_id = ?";
            var bindings = [1, _idClient];
            return DB.query(sql_query, bindings).then(
                function (missions) {
                    return DB.fetchAll(missions);
                },
                function (error) {
                    return error;
                });
        }

        function getMissions5WithCommandeByClient(_idClient) {
            var sql_query = "SELECT * FROM missions WHERE state = ? AND client_id = ? ORDER BY id_db DESC LIMIT 5";
            var bindings = [1, _idClient];
            return DB.query(sql_query, bindings).then(
                function (missions) {
                    console.log(missions);
                    return DB.fetchAll(missions);
                },
                function (error) {
                    return error;
                });
        }

        function countMissions(_idVendeur) {
            //BETWEEN date("now", "start of month") AND date("now", "start of month", "+1 month", "-1 day")
            var sql_query = 'SELECT COUNT(case state when 1 then 1 else null end) AS "finished", COUNT(case state when 0 then 1 else null end) AS "waiting", COUNT(case state when 2 then 1 else null end) as "problem" FROM missions WHERE route_id IN (SELECT id_db FROM routes WHERE vendeur = ?) AND date_start = date("now");';
            var bindings = [_idVendeur];
            return DB.query(sql_query, bindings).then(
                function (result) {
                    return DB.fetch(result);
                },
                function (error) {
                    return error;
                });
        }

        function getUnfinishedMissions() {
            var sql_query = "SELECT * FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id WHERE state = 0";
            return DB.query(sql_query).then(
                function (missions) {
                    return DB.fetchAll(missions);
                },
                function (error) {
                    return error;
                });
        }

        function getMissionsWithCommande() {
            var sql_query = "SELECT * FROM missions WHERE state = 1";
            return DB.query(sql_query).then(
                function (missions) {
                    return DB.fetchAll(missions);
                },
                function (error) {
                    return error;
                });
        }

        function getMissions5WithCommande() {
            var sql_query = "SELECT * FROM missions WHERE state = 1 ORDER BY id DESC LIMIT 2";
            return DB.query(sql_query).then(
                function (missions) {
                    return DB.fetchAll(missions);
                },
                function (error) {
                    return error;
                });
        }

        function getFinishedMissions(_idVendeur) {
            var sql_query = "SELECT M.*, address FROM missions AS M JOIN clients AS C ON C.id_db = M.client_id WHERE state = 1 AND route_id IN (SELECT id_db FROM routes WHERE vendeur = ?) ORDER BY id LIMIT 5";
            var bindings = [2];
            return DB.query(sql_query, bindings).then(
                function (missions) {
                    console.log(missions);
                    return DB.fetchAll(missions);
                },
                function (error) {
                    return error;
                });
        }

        function getHighestMission(id_vendeur) {
            console.log(id_vendeur);
            var sql_query = "SELECT * FROM missions WHERE id_db > 0 AND route_id IN(SELECT id_db FROM routes WHERE vendeur = ?) ORDER BY id_db DESC LIMIT 1";
            var bindings = [id_vendeur]
            return DB.query(sql_query, bindings).then(
                function (mission) {
                    return DB.fetch(mission);
                },
                function (error) {
                    return error;
                });
        }

        function addMission(mission) {

            var time = new Date(mission.date);
            console.log(time);
            time.setHours(0, 0, 0, 0);
            time = time.getTime();
            console.log(time);
            var sql_query = "INSERT INTO missions(id_db, code_mission, client_id, route_id, date_start, date_max, finished, commande_id, problem, problemDescription, state, synced) values(?,?,?,?,?,?,?,?,?,?,?,?)";
            var bindings = [mission.id, mission.codeMission, mission.client, mission.route, time, mission.maxDate, mission.finished, 0, mission.problem, mission.problemDescription, 0, 0];
            return DB.query(sql_query, bindings).then(
                function (mission_id) {
                    return mission_id;
                },
                function (error) {
                    return error;
                });
        }

        function addMissionLivreur(mission, _idLivreur) {
            var sql_query = "INSERT INTO missions_livreur(id_db, code_mission, client_id, state, synced, livreur, finished) values(?,?,?,?,?,?,?)";
            var bindings = [mission.id, mission.codeMission, mission.client, 0, 0, _idLivreur, 0];
            return DB.query(sql_query, bindings).then(
                function (mission_id) {
                    return mission_id;
                },
                function (error) {
                    return error;
                });
        }


        function syncMissions(_idVendeur) {
            var deferred = $q.defer();
            var innerId, outerId;
            getHighestMission(_idVendeur).then(
                function (mission) {
                    if (mission == null) {
                        innerId = 0;
                    }
                    else {
                        innerId = mission.id_db;
                    }
                    $http.get("http://197.230.28.154:81/newsales/rest/vendors/" + _idVendeur + "/mobile/missions/check").then(
                        function (mission, status, headers) {
                            console.log(mission);
                            outerId = mission.data;
                            console.log("HIGHEST MISSION IN DB : " + innerId);
                            console.log("HIGHEST MISSION IN API : " + outerId);
                            if (outerId > innerId) {
                                console.log("Some updates remaining ...");
                                var finalMissions = [];
                                $http.get("http://197.230.28.154:81/newsales/rest/vendors/" + _idVendeur + "/mobile/missions/from/" + innerId).then(
                                    function (missions, status, headers) {
                                        deferred.resolve(missions.data);
                                        var newMissions = [];
                                        angular.forEach(missions.data, function (mission) {
                                            console.log(mission);
                                            addMission(mission).then(
                                                function (id) {
                                                    console.log(id);
                                                    console.log(JSON.stringify(id));
                                                },
                                                function (error) {
                                                    console.log(error);
                                                });
                                        });
                                        deferred.resolve({status: "OK"});
                                    },
                                    function (error, status, headers) {
                                        deferred.reject(error);
                                    });
                            }
                            else {
                                console.log("Database already up to date !!");
                            }
                        },
                        function (error, status, headers) {
                            console.log(error.status);
                        });
                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }


        function getAllMissions() {
            var sql_query = "SELECT C.id_db, C.code_client, C.address, C.lat, C.lng, C.nom, C.prenom, M.code_mission, M.state FROM missions AS M LEFT JOIN clients AS C ON C.id_db = M.client_id ORDER BY M.state";
            return DB.query(sql_query)
                .then(
                    function (missions) {
                        return DB.fetchAll(missions);
                    }, function (error) {
                        return error;
                    });
        }
    })

    .factory("Routes", function (DB, $http, $q, Clients) {


        function addRoute(route) {
            var sql_query = "INSERT INTO routes (id_db, code, desactive, nom, vendeur) values (?,?,?,?,?);";
            var bindings = [route.id_db, route.code, route.desactive, route.nom, route.vendeur];
            return DB.query(sql_query, bindings).then(
                function (data) {
                    return DB.fetch(data);
                },
                function (error) {
                    return error;
                });
        }

        function addRouteProperToSync(idVendeur, success) {
            for (var i = 0; i < success.data.length; i++) {
                var route = {
                    id_db: success.data[i].id,
                    code: success.data[i].codeRoute,
                    nom: success.data[i].nomRoute,
                    desactive: false,
                    vendeur: idVendeur
                };
                addRoute(route).then(function (success) {
                    console.log(success);
                }, function (error) {
                    console.log(error);
                });
                if (typeof success.data[i].clients != "undefined" && success.data[i].clients.length > 0) {
                    angular.forEach(success.data[i].clients, function (client) {
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
                            function (success) {
                                console.log(success);
                            },
                            function (error) {
                                console.log(error.message);
                            });

                    });
                }
            }
        }

        function syncRoutes(id) {
            var idVendeur = id;
            var maxDB;
            var maxAPI;
            var routes = {
                url: "http://197.230.28.154:81/newsales/rest/vendors/mobile/" + idVendeur + "/roads/",
                method: "GET"
            };
            var routesCheck = {
                url: "http://197.230.28.154:81/newsales/rest/vendors/mobile/" + idVendeur + "/roads/check",
                method: "GET"
            };

            function fromStartPoint(id, _id) {
                return {
                    url: "http://197.230.28.154:81/newsales/rest/vendors/mobile/" + id + "/roads/from/" + _id,
                    method: "GET"
                };
            }


            getLastRoute(id).then(
                function (success) {
                    if (success == null) {
                        $http(routes).then(
                            function (success) {
                                if (success.data.length > 0) {
                                    addRouteProperToSync(idVendeur, success);
                                }
                            },
                            function (error) {
                                console.log(error);
                            });
                    }
                    else {
                        maxDB = success.id_db;
                        $http(routesCheck).then(
                            function (success) {
                                maxAPI = success.data;
                                if (maxDB == maxAPI) {
                                    console.log("LES ROUTES SONT A JOUR");
                                }
                                if (maxDB < maxAPI) {
                                    $http(fromStartPoint(idVendeur, maxDB)).then(
                                        function (success) {
                                            console.log(success);
                                            if (success.data.length > 0) {
                                                addRouteProperToSync(idVendeur, success);
                                            }
                                        },
                                        function (error) {
                                            console.log(error);
                                        });
                                }
                            },
                            function (error) {
                                console.log(error);
                            });
                    }
                },
                function (error) {
                    console.log(error);
                });
        }

        function getAllRoutes(id) {
            var sql_query = "SELECT * FROM routes WHERE vendeur = ?;";
            var bindings = [id];
            return DB.query(sql_query, bindings)
                .then(
                    function (result) {
                        console.log(result);
                        return DB.fetchAll(result);
                    },
                    function (error) {
                        return error.message;
                    });
        }

        function getAllDistinctRoutes(id) {
            var sql_query = "SELECT DISTINCT id_db FROM routes WHERE vendeur = ?;";
            var bindings = [id];
            return DB.query(sql_query, bindings)
                .then(
                    function (result) {
                        return DB.fetchAll(result);
                    },
                    function (error) {
                        return error.message;
                    });
        }

        function getLastRoute(id) {
            var sql_query = "SELECT id_db FROM routes WHERE vendeur = ? ORDER BY id_db DESC LIMIT 1";
            var bindings = [id];
            return DB.query(sql_query, bindings).then(
                function (data) {
                    return DB.fetch(data);
                },
                function (error) {
                    console.log("ERROR => BEFORE SYNC ROUTES THE ROUTE WITH HIGHEST DEADLINE : " + error.message);
                });
        }

        function getUnfinishedRoutes() {
            var sql_query = "SELECT * FROM routes WHERE state = 0 AND date_max < " + Date.now() + ";";
            return DB.query(sql_query).then(
                function (routes) {
                    return DB.fetchAll(routes);
                },
                function (error) {
                    return error;
                });
        }

        function getRoute(_id) {
            var sql_query = "SELECT * FROM missions WHERE id = ?;";
            var bindings = [_id];
            return DB.query(sql_query, bindings)
                .then(
                    function (result) {
                        return DB.fetch(result);
                    },
                    function (error) {
                        return [];
                    }
                );
        }

        function setState(_id, state_number) {
            var sql_query = "UPDATE TABLE missions WHERE id = ? SET state = ?;";
            var bindings = [_id, state_number];
            return DB.query(sql_query, bindings).then(
                function (result) {
                    return "La mission a été mise à jour.";
                },
                function (error) {
                    return "Une erreur est survenu : " + error.message;
                });
        }

        function deleteRoute(_id) {
            var sql_query = "DELETE TABLE missions WHERE id = ?;";
            var bindings = [_id];
            return DB.query(sql_query, bindings).then(
                function (result) {
                    return "La mission a été supprimé.";
                },
                function (error) {
                    return "Une erreur est survenu : " + error.message;
                });
        }

        return {
            addRoute: addRoute,
            deleteRoute: deleteRoute,
            setState: setState,
            getRoute: getRoute,
            getAllRoutes: getAllRoutes,
            getLastRoute: getLastRoute,
            syncRoutes: syncRoutes,
            getAllDistinctRoutes: getAllDistinctRoutes

        };
    })

    .factory("Charaka", function (DB, $http, $q) {
        return {
            sync: sync,
            add: add,
            addToDB: addToDB,
            get: get,
            visiteCharaka: visiteCharaka,
            syncFromAPI: syncFromAPI
        };

        function visiteCharaka() {
            return JSON.parse(window.localStorage["charakas"] || "[]");
        }

        function get(client_id) {
            // JUST TO BE SURE TO GET ALL VALID PROMOTIONS !!
            var sql_query = "SELECT * FROM promotion_charaka WHERE client_id = " + client_id + " AND prime > 0 AND reste > 0;";
            console.log(sql_query);
            return DB.query(sql_query).then(
                function (success) {
                    console.log(success);
                    return DB.fetchAll(success);
                },
                function (error) {
                    console.log(error);
                    return error;
                });
        }

        function sync(vendeurId, ip) {
            var request = {
                url: "http://"+ip+"/newsales/rest/sharaka/getSharaka",
                method: "GET"
            };
            return $http(request);
        }

        function addToDB(options) {
            var deferred = $q.defer();
            var sql_query = "INSERT INTO promotion_charaka (id, client_id, created_at, prime, reste) VALUES " + options.join(", ") + ";";

            deferred.resolve(["DELETE FROM promotion_charaka;", sql_query]);
            return deferred.promise;
        }

        function processCharakas(charakas) {
            var deferred = $q.defer();
            var options = [];
            if (charakas.length > 0) {
                for (var i = 0, len = charakas.length; i < len; i++) {
                    var charaka = charakas[i];
                    options.push("(" + charaka.idShraka + ", " + charaka.idClient + ", '" + charaka.dateSaisi + "', " + charaka.prime + ", " + charaka.primeRestant + ")");
                }
                deferred.resolve(addToDB(options));
            }
            else {
                deferred.resolve("NO CHARAKA TO ADD !!");
            }
            return deferred.promise;
        }

        function add(vendeurId, ip) {
            var deferred = $q.defer();
            sync(vendeurId, ip).then(
                function (success) {
                    deferred.resolve(processCharakas(success.data));
                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }


        function syncFromAPI(vendeurId, ip) {
            var deferred = $q.defer();
            deferred.resolve([]);
            /*add(vendeurId, ip).then(
             function(success){
             deferred.resolve(success);
             },
             function(error){
             deferred.resolve([]);
             });*/
            return deferred.promise;
        }

    })

    .factory("Promotions", function (DB, $http, $q, $log) {


        return {
            checkPromotionClient: checkPromotionClient,
            addCause: addCause,
            getSBDFromLocalStorage: getSBDFromLocalStorage,
            getPromotionFromLocalStorage: getPromotionFromLocalStorage,
            getConsumedPromotionsAndSBDs: getConsumedPromotionsAndSBDs,
            getNonConsumedPromotionsAndSBDs: getNonConsumedPromotionsAndSBDs,
            cartTreatment: cartTreatment,
            getNonConsumedPromotions: getNonConsumedPromotions,
            addPromotion: addPromotion,
            promotionArticle: promotionArticle,
            syncPromotions: syncPromotions,
            getAllPromotions: getAllPromotions,
            getClientPromotions: getClientPromotions,
            deletePromotion: deletePromotion,
            promotionTreatment: promotionTreatment,
            getTVA: getTVA,
            getHT: getHT,
            getArticleQty: getArticleQty,
            setToConsumed: setToConsumed,
            getConsumedOnce: getConsumedOnce,
            addCauseSBD: addCauseSBD,
            itemRemainingInScope: itemRemainingInScope

        };

        function itemRemainingInScope(list)
        {
            for(var i = 0, len = list.initiatives.length; i < len ; i++)
            {
                var initiative = list.initiatives[i];

                if(!initiative.consumed && initiative.cause == "")
                {
                    return true;
                }
            }

            for(var i = 0, len = list.sbds.length ; i < len ; i++)
            {
                var sbd = list.sbds[i];

                if(!sbd.consumed && sbd.cause == "")
                {
                    console.log(sbd);
                    return true;
                }
            }

            return false;
        }

        function addCause(id, cause)
        {
            var promotions = JSON.parse(window.localStorage["promotions"] || "[]");
            for(var i = 0, len = promotions.length ; i < len ; i++)
            {
                var promotion = promotions[i];
                if(promotion.id == id)
                {
                    console.log(promotion);
                    promotion.cause = cause;
                    break;
                }
            }
            window.localStorage["promotions"] = JSON.stringify(promotions);
        }


        function addCauseSBD(id, cause)
        {
            var sbds = JSON.parse(window.localStorage["sbd"] || "[]");
            for(var i = 0, len = sbds.length ; i < len ; i++)
            {
                var sbd = sbds[i];
                if(sbd.id == id)
                {
                    console.log(sbd);
                    sbd.cause = cause;
                    break;
                }
            }
            window.localStorage["sbd"] = JSON.stringify(sbds);
        }

        function getPromotionFromLocalStorage(_id)
        {
            var promotions = JSON.parse(window.localStorage["promotions"] || "[]");
            for(var i = 0, len = promotions.length ; i < len ; i++)
            {
                var promotion = promotions[i];
                if(promotion.id == _id)
                {
                    console.log(promotion);
                    return promotion;
                }
            }
            return null;
        }

        function getSBDFromLocalStorage(_id)
        {
            var sbds = JSON.parse(window.localStorage["sbd"] || "[]");
            for(var i = 0, len = sbds.length ; i < len ; i++)
            {
                var sbd = sbds[i];
                if(sbd.id == _id)
                {
                    return sbd;
                }
            }
            return null;
        }

        function setToConsumed(promotion, client) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");
            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;

            var sql_query = "INSERT INTO promotion_consumption (promotion_id, client_id, consumed, at, societe, activite) VALUES (" + promotion + ", " + client + ", " + 1 + ", " + new Date().getTime() + ", " + tenant_id + ", " + activite + ");";
            //console.log(sql_query)
            return DB.query(sql_query)
                .then(
                    function (success) {
                        return success;
                    },
                    function (error) {
                        return error;
                    })
        }

        function getConsumedPromotionsAndSBDs(client) {
            var deferred = $q.defer();
            var output = {sbds: [], promotions: []};

            var promotions = JSON.parse(window.localStorage["promotions"] || "[]");
            var sbds = JSON.parse(window.localStorage["sbd"] || "[]");


            angular.forEach(promotions, function (promotion) {

                if (promotion.consumed) {
                    console.log("Promotion consumed !!");

                    output.promotions.push(promotion.id);
                    if (promotion.once) {
                        console.log("Promotion applicable once upon a time !");
                        setToConsumed(promotion.id, client || 0)
                            .then(
                                function (success) {
                                    console.log(success.message + ", for promotion : " + promotion.id);
                                },
                                function (error) {
                                    console.log(error.message + ", for promotion : " + promotion.id);
                                });
                    }
                }

            });

            angular.forEach(sbds, function (sbd) {
                if (sbd.consumed) {
                    output.sbds.push(sbd.id);
                }
            });


            return output;

        }



        function getNonConsumedPromotionsAndSBDs() {
            var deferred = $q.defer();
            var output = {sbds: [], promotions: []};

            var promotions = JSON.parse(window.localStorage["promotions"] || "[]");
            var sbds = JSON.parse(window.localStorage["sbd"] || "[]");


            angular.forEach(promotions, function (promotion) {

                if (promotion.type != "PC") {
                    output.promotions.push({ id: promotion.id, title: promotion.libelle, type: promotion.type, consumed: (promotion.consumed || false), cause: (promotion.cause || "") });
                }

            });

            angular.forEach(sbds, function (sbd) {
                if (true) {
                    output.sbds.push({ id: sbd.id, title: "SBD min : "+sbd.min+".", consumed: ( sbd.consumed || false ), cause: ( sbd.cause || "" ) });
                }
            });


            return output;

        }


        function getHT(article) {
            var qty = getArticleQty(article);
            return qty * article.prixVente;
        }

        function getTVA(article) {
            if (typeof(article.tva) != "undefined" && article.tva != null && article.tva > 0) {

                return getHT(article) + (getHT(article) * 0.20);
            }
            else {
                return null;
            }
        }

        function getArticleQty(article) {
            if (article.uniteMesure == "CS") {
                return (article.unit / article.unitConversion) + article.packet;
            }
            else {
                return (article.packet * article.unitConversion) + article.unit;
            }
        }

        function promotionMT(promotion) {

        }

        function getConsumedOnce() {
            var promotions = JSON.parse(window.localStorage['promotions'] || "[]");
            var output = [];
            angular.forEach(promotions, function (promotion) {
                // THE CONDITION
                // SHOULD BE TYPE : PROMOTION_PALIER AND ONCE ( one consumption ) AND ( finally consumed )
                if (promotion.type == "PP" && promotion.once && promotion.consumed) {
                    output = output.concat(promotion.gratuites);
                }
            });
            return output;
        }

        function cartTreatment(article, object) {

            var promotions = JSON.parse(window.localStorage['promotions'] || "[]");

            var promotionsIds = article.promotions;

            var discounts = [];

            for (var i = 0, len = promotionsIds.length; i < len; i++) {
                var promotionId = promotionsIds[i];

                for (var j = 0, _len = promotions.length; j < _len; j++) {
                    var promotion = promotions[j];

                    if (promotion.id == promotionId && promotion.consumed) {

                        if (promotion.gratuites.length > 0) {

                            // TO HAVE UNIQUE GIFTS !!
                            object[promotion.id] = promotion.gratuites.map(function (a) {
                                var gratuite = a;
                                //Adapting gifts for cumullable promotions
                                if (promotion.type == "PP" || promotion.type == "PR") {
                                    gratuite.qty = (promotion.cumule != null && promotion.cumule > 0) ? gratuite.qty * promotion.cumule : gratuite.qty;
                                }
                                else {
                                    if (promotion.promotion_palier.length > 0 && promotion.qte != null && promotion.qte > 0) {
                                        gratuite.qty = promotion.qte;
                                    }
                                    else {
                                        gratuite.qty = gratuite.qty * promotion.cumule;
                                    }
                                }
                                return gratuite;
                            });
                        }
                        else if (typeof(promotion.remise) != "undefined" && promotion.remise != null && promotion.remise > 0) {
                            var cumule;

                            if (Boolean(promotion.cummulable)) {
                                cumule = typeof(promotion.cumule) != "undefined" && promotion.cumule > 0 ? promotion.cumule : 1;
                            }
                            else {
                                cumule = 1;
                            }
                            var remise = promotion.remise * cumule;
                            var discount = {
                                discount: remise,
                                priority: promotion.priorite,
                                promotionId: promotion.id,
                                cumule: cumule
                            };
                            discounts.push(discount);
                        }
                    }
                }
            }
            article = getFinalDiscount(article, discounts);
            var output = {
                item: article,
                gifts: object
            };
            return output;
        }

        function getFinalDiscount(article, discounts) {
            var sortedDiscounts = sortDiscounts(discounts);

            var ht = getHT(article);

            article.discountHistory = [];

            article.ht = ht;

            var htCopy = ht;

            if (discounts.length > 0) {

                for (var i = 0, len = sortedDiscounts.length; i < len; i++) {
                    var sortedDiscount = sortedDiscounts[i];

                    var detailObject = {
                        rank: i + 1,
                        cumule: sortedDiscount.cumule,
                        promotion_id: sortedDiscount.promotionId,
                        remiseP: sortedDiscount.discount,
                        priorite: sortedDiscount.priority,
                        value: htCopy
                    };

                    var reduction = sortedDiscount.discount / 100;

                    var toReduce = htCopy * reduction;

                    detailObject.remiseV = toReduce;

                    article.discountHistory.push(detailObject);

                    htCopy = htCopy - toReduce;
                }

                article.remise = article.ht - htCopy;
            }
            else {
                article.remise = 0;
            }
            return article;


        }

        function sortDiscounts(discounts) {
            discounts = discounts.sort(function (a, b) {
                if (a.priority > b.priority) {
                    return 1;
                }
                else if (a.priority < b.priority) {
                    return -1;
                }
                else {
                    return 0;
                }

            });

            return discounts;
        }

        function getNonConsumedPromotions() {
            var ids = [];
            var promotions = JSON.parse(window.localStorage['promotions'] || "[]");
            for (var i = 0, len = promotions.length; i < len; i++) {
                var promotion = promotions[i];
                if (!promotion.consumed) {
                    for (var j = 0, _len = promotion.articles.length; j < _len; j++) {
                        var articleId = promotion.articles[j].id;
                        ids.push(articleId);
                    }
                }
            }
            return ids;
        }

        function getArticleQty(article) {
            if (article.uniteMesure == "CS") {

                return (article.unit / article.unitConversion) + article.packet;
            }
            else {

                return (article.packet * article.unitConversion) + article.unit;
            }
        }


        function promotionTreatment(article, livreur) {

            if ( typeof(article.promotions) != "undefined" && article.promotions != null && article.promotions.length > 0 ) {
                console.debug(article.promotions);

                var promotions = JSON.parse(window.localStorage['promotions'] || '[]');
                var cart = JSON.parse(window.localStorage['cart'] || '{}');
                for (var i = 0; i < article.promotions.length; i++) {
                    for (var j = 0; j < promotions.length; j++) {
                        if (promotions[j].id == article.promotions[i]) {

                            // Count the qty of all articles that are inclueded in this promotion
                            var count = 0;
                            // Count ca of the articles
                            var ca = 0;
                            // total of all items in cart
                            var total = 0;
                            // saving all items in an array for PromotionPaliter promotion && especially for the non cummulable case
                            var items = [];


                            // Looping into all the articles in this promotion
                            for (var l = 0; l < cart.items.length; l++) {
                                //Now looping in all articles in CART

                                for (var k = 0; k < promotions[j].articles.length; k++) {
                                    if (cart.items[l].id_db == promotions[j].articles[k].id) {
                                        var qty = (cart.items[l].packet * cart.items[l].unitConversion) + cart.items[l].unit;

                                        var csQty = cart.items[l].packet + ( cart.items[l].unit / cart.items[l].unitConversion);

                                        var articleQty = getArticleQty(cart.items[l]);

                                        var amount = 0;

                                        var finalQTY;

                                        // WORK WITH PROMOTION MEASURING UNIT !
                                        if (typeof(promotions[j].articles[k].conditionning_unit) != "undefined" && promotions[j].articles[k].conditionning_unit != null && promotions[j].articles[k].conditionning_unit != "") {
                                            // WORK WITH PROMOTION MEASURING UNIT !
                                            if (promotions[j].articles[k].conditionning_unit == "Un") {
                                                //TAKE UNIT QTY !
                                                finalQTY = qty;

                                                if (cart.items[l].uniteMesure == "CS") {
                                                    amount = (finalQTY / cart.items[l].unitConversion) * cart.items[l].prixVente;
                                                }
                                                else {

                                                    amount = finalQTY * cart.items[l].prixVente;
                                                }
                                            }
                                            else {
                                                //TAKE BOX QTY !
                                                finalQTY = csQty;
                                                if (cart.items[l].uniteMesure == "CS") {
                                                    amount = finalQTY * cart.items[l].prixVente;
                                                }
                                                else {
                                                    amount = (finalQTY / cart.items[l].unitConversion) * cart.items[l].prixVente;
                                                }
                                            }
                                        }

                                        // WORK WITH ITEMS MEASURING UNIT !
                                        else {
                                            // TAKE QTY OF PRIME MEASURING UNIT OF THE ITEM !
                                            finalQTY = articleQty;
                                            amount = finalQTY * cart.items[l].prixVente;
                                        }

                                        count += finalQTY;
                                        ca += amount;
                                        var itemObject = {id: cart.items[l].id_db, qty: finalQTY};
                                        items.push(itemObject);
                                        total += amount;
                                    }
                                    else {
                                        continue;
                                    }

                                    // HERE WE WILL SET SOME CONDITIONS TO IMPROVE PERFORMANCES !

                                    // IF THE PROMOTION IS PMT WE SHOULD TEST THE %AX POSSIBLE VALUE TO ACHIEVE !!

                                    // LIKE THAT WE CAN AVOID HEAVY ITERATIONS OVER THE PROMOTION ITEMS !!


                                    ////////////////////////// PMT OPTIMIZATIONS !

                                    if (promotions[j].type == "PMT" && ca >= promotions[j].ca) {

                                        promotions[j].consumed = true;
                                        window.localStorage['change'] = "true";
                                        promotions[j].currentTotal = ca;

                                        if (promotions[j].promotion_palier.length > 0) {

                                            for (var t = 0; t < promotions[j].promotion_palier.length; t++) {
                                                var pp = promotions[j].promotion_palier[t];

                                                // WE SUPPOSE THAT WE HAVE AN ARRAY OF PROMOTION PALIER MONTANT
                                                // I HAD TO TEST MIN VALUE OF THE PMT PROMOTION SO I'VE
                                                // TESTED THE VALUE OF PP[i] WITH PP[i+1] TO SEE IF THE CURRENT
                                                // CA EXIST BETWEEN THE TWO
                                                // THE ITERATION IN THIS ARRAY SHOULD BE STOPPED IN THE n-2 VALUE BECAUSE THE n VALUE FOR
                                                // FOR THE SECOND INTERVALE DO NOT EXISTS
                                                // THE n-1 VALUE MUST BE TESTED alone
                                                // if promotions[j].promotion_palier[promotions[j].promotion_palier.length - 1].montant <= ca !

                                                if (

                                                    ( (t < promotions[j].promotion_palier.length - 1) && (pp.montant <= promotions[j].currentTotal) && (promotions[j].promotion_palier[t + 1].montant > promotions[j].currentTotal) )
                                                    ||
                                                    ( (t == promotions[j].promotion_palier.length - 1) && (promotions[j].currentTotal >= pp.montant) )
                                                ) {
                                                    // I HAD THE POSSIBILITY TO USE THE IF ELSE STATEMENT BUT
                                                    // THEY CAN PARAMETER A PROMOTION WITH BOTH DISCOUNT AND
                                                    // GIFTS !


                                                    if (pp.cummulable == 1) {
                                                        var currentCumule = Math.trunc(promotions[j].currentTotal / pp.montant);
                                                        if (pp.max == 0) {
                                                            promotions[j].cumule = currentCumule;
                                                        }
                                                        else {
                                                            promotions[j].cumule = currentCumule > pp.max ? pp.max : currentCumule;
                                                        }
                                                    }
                                                    else {

                                                        promotions[j].cumule = 1;
                                                    }

                                                    //REMISE
                                                    if (pp.remise != null && pp.remise > 0) {
                                                        promotions[j].remise = pp.remise;
                                                    }
                                                    //GRATUITES
                                                    if (pp.qte != null && pp.qte > 0) {
                                                        promotions[j].qte = pp.qte;
                                                    }
                                                }

                                            }


                                        }
                                        else {
                                            if (promotions[j].cummulable == 1) {

                                                if (promotions[j].max != null && promotions[j].max != 0) {

                                                    var currentCumule = Math.trunc(ca / promotions[j].ca);
                                                    promotions[j].cumule = currentCumule >= promotions[j].max ? promotions[j].max : currentCumule;

                                                }
                                                else {
                                                    promotions[j].cumule = Math.trunc(ca / promotions[j].ca);
                                                }
                                            }
                                            else {
                                                promotions[j].cumule = 1;
                                                break;
                                            }
                                        }
                                    }
                                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                }

                            }
                            // END OF LOOOOOOOOOOOOOOOOOP !!
                            if (promotions[j].type == "PR") {
                                promotions[j].consumed = true;
                            }
                            if (promotions[j].type == "PMT") {

                                if (ca >= promotions[j].ca) {
                                    promotions[j].consumed = true;
                                    window.localStorage['change'] = "true";
                                    promotions[j].currentTotal = ca;
                                }
                                else {
                                    promotions[j].consumed = false;
                                    window.localStorage['change'] = "true";
                                    promotions[j].currentTotal = ca;
                                    promotions[j].cumule = 0;

                                }
                            }
                            if (promotions[j].type == "PP") {
                                console.log(promotions[j].id);
                                if (Boolean(promotions[j].melange)) {

                                    if (Boolean(promotions[j].cummulable)) {
                                        if (promotions[j].qte <= count) {
                                            promotions[j].consumed = true;
                                            window.localStorage['change'] = "true";
                                            var repetitions = Math.trunc(count / promotions[j].qte);
                                            if (promotions[j].max == null || promotions[j].max == 0 || typeof(promotions[j].max) == "undefined") {
                                                promotions[j].cumule = repetitions;
                                            }
                                            else {
                                                if (repetitions >= promotions[j].max) {
                                                    promotions[j].cumule = promotions[j].max;
                                                }
                                                else {
                                                    promotions[j].cumule = repetitions;
                                                }
                                            }
                                        }
                                        else {
                                            promotions[j].consumed = false;
                                            promotions[j].cumule = 0;
                                            window.localStorage['change'] = "true";
                                        }
                                    }
                                    else {
                                        if (promotions[j].qte <= count) {
                                            promotions[j].consumed = true;
                                            window.localStorage['change'] = "true";
                                            promotions[j].cumule = 1;
                                        }
                                        else {
                                            promotions[j].consumed = false;
                                            window.localStorage['change'] = "true";
                                            promotions[j].cumule = 0;
                                        }
                                    }
                                }
                                else {
                                    var finalRepetitions = 0;
                                    var consumed = false;
                                    if (promotions[j].articles.length == items.length) {
                                        var count = 0;
                                        for (var m = 0; m < promotions[j].articles.length; m++) {
                                            for (var n = 0; n < items.length; n++) {
                                                if (promotions[j].articles[m].id == items[n].id) {
                                                    if (promotions[j].articles[m].qty <= items[n].qty) {
                                                        console.log(promotions[j].articles[m].qty);
                                                        items[n].qty = Math.trunc(items[n].qty / promotions[j].articles[m].qty)
                                                        ++count;
                                                    }
                                                }
                                            }
                                        }
                                        if (count == promotions[j].articles.length) {
                                            var trunQty = 0;
                                            var minForCumule = items[0].qty;
                                            var consommable = false;
                                            for (var n = 0; n < items.length; n++) {
                                                trunQty += items[n].qty;
                                                if (items[n].qty >= 2) {
                                                    consommable = true;
                                                    if (minForCumule > items[n].qty) {
                                                        minForCumule = items[n].qty;
                                                    }
                                                }
                                            }
                                            if (Boolean(promotions[j].cummulable)) {
                                                if (promotions[j].max == null || promotions[j].max == 0 || typeof(promotions[j].max) == "undefined") {
                                                    promotions[j].cumule = minForCumule;
                                                }
                                                else {
                                                    if (minForCumule >= promotions[j].max) {
                                                        promotions[j].cumule = promotions[j].max;
                                                    }
                                                    else {
                                                        promotions[j].cumule = minForCumule;
                                                    }
                                                }
                                            }
                                            else {
                                                promotions[j].cumule = 1;
                                            }
                                            promotions[j].consumed = true;
                                            window.localStorage['change'] = "true";

                                        }
                                        else {
                                            promotions[j].consumed = false;
                                            promotions[j].cumule = 0;
                                            window.localStorage['change'] = "true";
                                        }
                                    }
                                    else {
                                        promotions[j].consumed = false;
                                        promotions[j].cumule = 0;
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

        function checkPromotionClient() {

            var promotions = JSON.parse(window.localStorage["promotions"] || "[]");

            var cart = JSON.parse(window.localStorage["cart"] || "{}");

            var promotionPCTotal = 0

            cart.items = typeof(cart.items) == "undefined" ? [] : cart.items;


            // CHECK WHETHER THE CART ITEMS ARE SUP TO 0
            // AND CALL ITEMS
            // THOSE WITH SALE PRICE -gt 0
            // SET ALL PROMOTIONS TO 0
            if( !(cart.items.length > 0) || noCallItems( new Object(cart.items) ) )
            {
                setPromotionsToNonConsumed( new Object(promotions) );
                return;
            }


            // ITERATING INSIDE ALL CART ITEMS !!
            angular.forEach(cart.items, function (item, itemIndex) {

                //  TO NOT COUNT GIFTS AND STOCK RETURNS
                //  == 0 FOR GIFTS
                //  == -1 FOR STOCK RETUTNS ( "LES RETOURS" )

                if (item.prixVente > 0) {
                    promotionPCTotal += (getArticleQty(item) * item.prixVente);
                }

                // THE END OF THE CART ITEMS LOOP !!

                if (itemIndex == cart.items.length - 1) {
                    // ITERATING INSIDE ALL PC PROMOTIONS !!
                    angular.forEach(promotions, function (promotion, promotionIndex) {

                        if (promotion.type == "PC") {
                            if (promotionPCTotal >= promotion.ca) {
                                promotion.consumed = true;
                                promotion.cumule = 1;
                            }
                            else {
                                promotion.consumed = false;
                                promotion.cumule = 1;
                            }
                        }

                        // THE END OF THE PROMOTIONS LOOP !!

                        if (promotionIndex == promotions.length - 1) {
                            console.debug("DONE");
                            window.localStorage['promotions'] = JSON.stringify(promotions);
                        }

                    });

                }

            });

        }

        function setPromotionsToNonConsumed(promotions) {

            for(var i = 0 ; i < promotions.length ; i++) {
                var promotion = promotions[i];
                promotion.consumed = false;
                promotion.cumule = 0;
            }

            window.localStorage["promotions"] = JSON.stringify(promotions || "[]");
            return;
        }

        function noCallItems(items) {

            for(var i = 0 ; i < items.length ; i++) {
                var item = items[i];
                if( item.prixVente > 0 )
                {
                    return false;
                }
            }
            return true;
        }

        function getAllPromotions() {
            var sql_query = "SELECT * FROM promotions;";
            return DB.query(sql_query).then(
                function (result) {
                    return DB.fetchAll(result);
                });
        };

        function getClientPromotions(client_id) {

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var activite = profile.activite || 0;
            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id || 0;


            var sql_query = 'SELECT P.libelle, case P.valable_once when 1 then "true" else "false" end as once, ifnull("[" || Group_Concat(DISTINCT "{ ""montant"":" ||ifnull(PP.montant, 0)||", ""remise"": " || ifnull(PP.remise, 0)|| ", ""qte"" :" || ifnull(PP.qte, 0) || ", ""cummulable"": " || PP.cummulable ||", ""max"" : " || ifnull(PP.max, 0)  ||" }") || "]", "[]") AS promotion_palier, PG.priorite, P.id_db AS "id", P.type, P.qte, P.melange, Group_Concat(DISTINCT PC.client_id) as clients, P.conditionning_unit AS "cu", P.max_steps AS "max", P.cummulable, P.ca, P.starts_at AS "starts", P.ends_at AS "ends", P.activated as "activated", Group_Concat(DISTINCT PI.promotion_secondary) AS "inclusions", Group_Concat(DISTINCT PE.promotion_secondary) AS "exclusions", "[" || Group_Concat(DISTINCT "{""id"":" || PA.article_id ||", ""qty"":" || ifnull(PA.qty, 0) || ", ""conditionning_unit"": """ || ifnull(PA.conditionning_unit, "") ||  """}") || "]" AS "articles" , "[" || Group_Concat(DISTINCT "{""id"":" || GA.article_id ||", ""qty"":" || ifnull(GA.qte, 0) || ", ""group"": " || ifnull(GA.groupe, 0) || ", ""designation"":""" || A.nomArticle || """}") || "]" AS "gratuites", PG.remise AS "remise" FROM promotions AS P LEFT JOIN promotion_palier as PP ON PP.id_promotion = P.id_db JOIN promotion_client AS PC ON PC.promotion_id = P.id_db AND PC.client_id = ? LEFT JOIN clients AS C ON C.id_db = PC.client_id LEFT JOIN promotion_article AS PA ON PA.promotion_id = P.id_db LEFT JOIN promotion_inclusion AS PI ON PI.promotion_primary = P.id_db LEFT JOIN promotion_exclusion AS PE ON PE.promotion_primary = P.id_db  LEFT JOIN promotion_gratuite AS PG ON PG.promotion_id = P.id_db LEFT  JOIN gratuite_article AS GA ON GA.promotion_gratuite_id = PG.id LEFT JOIN articles AS A ON A.id_db = GA.article_id WHERE P.id_db NOT IN (SELECT promotion_id FROM promotion_consumption where client_id = ? AND consumed = 1 AND societe = ' + tenant_id + ' AND activite = ' + activite + ') AND P.societe = ' + tenant_id + ' AND P.activite = ' + activite + ' AND P.activated = 1 GROUP BY P.id_db;';
            var bindings = [client_id, client_id];
            return DB.query(sql_query, bindings)
                .then(
                    function (promotions) {
                        console.log(promotions);
                        return DB.fetchAll(promotions);
                    },
                    function (error) {
                        console.error(error);
                        return [];
                    });
        }

        function deletePromotion(_id) {
            var sql_query = "DELETE FROM promotions WHERE id = ?";
            var bindings = [_id];
            return DB.query(sql_query, bindings).then(
                function (result) {
                    return "La promotion a été supprimé.";
                },
                function (error) {
                    return "Une erreur est survenu : " + error.message;
                });
        };


        function syncPromotions(vendeurId, ip) {
            var JSONCONTENT = [{
                "id": 1,
                "priorite": null,
                "qte": null,
                "montant": null,
                "max_steps": null,
                "cummulable": true,
                "type": "PP",
                "pourcentage": null,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": null,
                "coupons": false,
                "article_gratuits": [[{"itemId": 3, "quantite": 1, "uconditionement": "Un"}]],
                "article_en_promo": [{"itemId": 1, "quantite": 10, "uconditionement": "Un"}, {
                    "itemId": 2,
                    "quantite": 12,
                    "uconditionement": "Un"
                }],
                "include": [],
                "exlude": [],
                "client": [],
                "promoPaliers": []
            }, {
                "id": 2,
                "priorite": null,
                "qte": null,
                "montant": 1000.0,
                "max_steps": 3,
                "cummulable": true,
                "type": "PMT",
                "pourcentage": null,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": false,
                "coupons": true,
                "article_gratuits": [[{"itemId": 35, "quantite": 1, "uconditionement": "Un"}], [{
                    "itemId": 36,
                    "quantite": 2,
                    "uconditionement": "Un"
                }]],
                "article_en_promo": [{"itemId": 3, "quantite": null, "uconditionement": "Un"}],
                "include": [],
                "exlude": [],
                "client": [],
                "promoPaliers": []
            }, {
                "id": 4,
                "priorite": null,
                "qte": null,
                "montant": 20000.0,
                "max_steps": 0,
                "cummulable": false,
                "type": "PC",
                "pourcentage": 2.0,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": false,
                "coupons": false,
                "article_gratuits": [],
                "article_en_promo": [],
                "include": [],
                "exlude": [],
                "client": [32786],
                "promoPaliers": []
            }, {
                "id": 5,
                "priorite": null,
                "qte": null,
                "montant": 1000.0,
                "max_steps": null,
                "cummulable": false,
                "type": "PMT",
                "pourcentage": 2.0,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": false,
                "coupons": false,
                "article_gratuits": [],
                "article_en_promo": [{"itemId": 746, "quantite": null, "uconditionement": "Un"}],
                "include": [],
                "exlude": [],
                "client": [],
                "promoPaliers": []
            }, {
                "id": 6,
                "priorite": null,
                "qte": null,
                "montant": 10000.0,
                "max_steps": 0,
                "cummulable": false,
                "type": "PC",
                "pourcentage": 2.0,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": false,
                "coupons": false,
                "article_gratuits": [],
                "article_en_promo": [],
                "include": [],
                "exlude": [],
                "client": [32785, 32786],
                "promoPaliers": []
            }, {
                "id": 10,
                "priorite": null,
                "qte": null,
                "montant": 10000.0,
                "max_steps": 0,
                "cummulable": false,
                "type": "PC",
                "pourcentage": 3.0,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": false,
                "coupons": false,
                "article_gratuits": [],
                "article_en_promo": [],
                "include": [],
                "exlude": [],
                "client": [32787],
                "promoPaliers": []
            }, {
                "id": 15,
                "priorite": null,
                "qte": null,
                "montant": null,
                "max_steps": 0,
                "cummulable": false,
                "type": "PR",
                "pourcentage": 3.0,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": false,
                "coupons": false,
                "article_gratuits": [],
                "article_en_promo": [{"itemId": 746, "quantite": null, "uconditionement": null}],
                "include": [],
                "exlude": [],
                "client": [],
                "promoPaliers": []
            }, {
                "id": 18,
                "priorite": null,
                "qte": null,
                "montant": 30000.0,
                "max_steps": 0,
                "cummulable": false,
                "type": "PC",
                "pourcentage": 5.0,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": false,
                "coupons": false,
                "article_gratuits": [],
                "article_en_promo": [],
                "include": [],
                "exlude": [],
                "client": [32784, 32783],
                "promoPaliers": []
            }, {
                "id": 19,
                "priorite": null,
                "qte": null,
                "montant": 15000.0,
                "max_steps": 0,
                "cummulable": false,
                "type": "PC",
                "pourcentage": 2.0,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": false,
                "coupons": false,
                "article_gratuits": [],
                "article_en_promo": [],
                "include": [],
                "exlude": [],
                "client": [32783],
                "promoPaliers": []
            }, {
                "id": 20,
                "priorite": null,
                "qte": null,
                "montant": null,
                "max_steps": 0,
                "cummulable": false,
                "type": "PR",
                "pourcentage": 3.0,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": false,
                "coupons": false,
                "article_gratuits": [],
                "article_en_promo": [{"itemId": 509, "quantite": null, "uconditionement": null}],
                "include": [],
                "exlude": [],
                "client": [],
                "promoPaliers": []
            }, {
                "id": 21,
                "priorite": null,
                "qte": null,
                "montant": null,
                "max_steps": 3,
                "cummulable": true,
                "type": "PP",
                "pourcentage": null,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": null,
                "coupons": false,
                "article_gratuits": [[{"itemId": 511, "quantite": 2, "uconditionement": "Un"}]],
                "article_en_promo": [{"itemId": 509, "quantite": 6, "uconditionement": "Un"}, {
                    "itemId": 510,
                    "quantite": 4,
                    "uconditionement": "Un"
                }],
                "include": [],
                "exlude": [],
                "client": [],
                "promoPaliers": []
            }, {
                "id": 25,
                "priorite": null,
                "qte": 12,
                "montant": null,
                "max_steps": null,
                "cummulable": false,
                "type": "PP",
                "pourcentage": null,
                "starts_at": "2016-01-01",
                "ends_at": "2016-01-31",
                "activated": true,
                "conditionning_unit": null,
                "melange": true,
                "coupons": true,
                "article_gratuits": [[{"itemId": 2, "quantite": 1, "uconditionement": "Un"}], [{
                    "itemId": 3,
                    "quantite": 2,
                    "uconditionement": "Un"
                }], [{"itemId": 35, "quantite": 1, "uconditionement": "Un"}]],
                "article_en_promo": [{"itemId": 746, "quantite": null, "uconditionement": "Un"}, {
                    "itemId": 1,
                    "quantite": null,
                    "uconditionement": "Un"
                }],
                "include": [],
                "exlude": [],
                "client": [],
                "promoPaliers": []
            }];

            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id;
            var activite = profile.activite || 0;

            /*deferred.resolve("YES");
            return deferred.promise;*/

            var request = {
                url: "http://"+ip+"/newsales/rest/promotions/AllPromoParMois",
                method: "GET"
            };

            $http(request).then(
                function (success) {
                    if (!success.data.length > 0) {
                        console.debug("EMPTY PROMOTIONS");
                        deferred.resolve([]);
                        console.log(success);

                    }
                    else {
                        console.debug("THERE IS SOME PROMOTIONS");
                        angular.forEach(success.data, function (promotion, index) {
                            var pass = checkPromotion(promotion);
                            if(pass) {
                                console.log(promotion);
                                deferred.resolve(addPromotion(promotion));
                            } else {
                                console.log(promotion);
                                deferred.resolve(updatePromotion(promotion, tenant_id, activite));
                            }
                        });
                    }

                },
                function (error) {
                    console.error(error);
                    deferred.resolve(error);
                });
            return deferred.promise;

        }

        function checkPromotion(promotion) {
            if(typeof(promotion.type) == "undefined" || promotion.type == null || !globalCheck(promotion)) {
                return false;
            } else if (promotion.type == "PC") {
                return checkPromotionClientBeforeSync(promotion);
            } else if (promotion.type == "PP") {
                return checkPromotionPalier(promotion);
            } else if (promotion.type == "PMT") {
                return checkPromotionMontant(promotion);
            } else if (promotion.type == "PR") {
                return checkPromotionRemise(promotion);
            } else {
                return false;
            }
        }

        function globalCheck(promotion) {

            var isClientsValid = typeof(promotion.client) != "undefined" && promotion.client != null && promotion.client.length > 0;
            var isActiveValid = typeof(promotion.activated) != "undefined";
            var isStartDateValid = typeof(promotion.starts_at) != "undefined";
            var isEndDateValid = typeof(promotion.ends_at) != "undefined";

            if(!isClientsValid) {

                return false;

            } else if(isStartDateValid && isEndDateValid) {

                var todayDate = new Date().getTime();
                var startDate = new Date(promotion.starts_at).getTime() || 0;
                var endDate = new Date(promotion.ends_at).getTime() || 0;
                var active = isActiveValid ? promotion.activated : false;

                if(!active) {
                    return false;
                } else {
                    var diff = endDate - startDate;
                    if(diff < 0) {
                        return false;
                    } else {
                        if( todayDate >= startDate && todayDate < endDate ) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }

            } else {
                return false;
            }
            

        }   

        function checkPromotionClientBeforeSync(promotion) {
            // MAYBE WE CAN ATTACH A PROMOTION TO A CLIENT WITHOUT ANY FIXED OBJECTIF 
            // AFTER MANY MANY CALL HE HAD A SPECIAL PROMOTION EVEN IF THE 
            // ITEMS IN THE CART == 0, 00 DHS
            var isMontantValid = typeof(promotion.montant) != "undefined" && promotion.montant != null && promotion.montant > -1;
            var isPourcentageValid = typeof(promotion.pourcentage) != "undefined" && promotion.pourcentage != null && promotion.pourcentage > 0;

            return isMontantValid && isPourcentageValid;
        }


        function checkPromotionPalier(promotion) {

            //var isArticlesGratuits = typeof(promotion.article_gratuits) != "undefined" && promotion.article_gratuits != null && promotion.article_gratuits.length > 0;
            var isArticlesPromos = typeof(promotion.article_en_promo) != "undefined" && promotion.article_en_promo != null && promotion.article_en_promo.length > 0;
            var isQtyValid = typeof(promotion.qte) != "undefined" && promotion.qte != null && promotion.qte > 0;
            var isMelangeValid = typeof(promotion.melange) != "undefined" && promotion.qte != null;

            var melange = isMelangeValid ? promotion.melange : false;

            var verdict = ( ( ( isQtyValid && melange ) && isArticlesPromos ) || ( !melange && isArticlesPromos ) );

            return verdict;
        }

        function checkPromotionMontant(promotion) {

            var isMontantPaliers = typeof(promotion.promoPaliers) != "undefined" && promotion.promoPaliers != null && promotion.promoPaliers.length > 0;
            var isMontantValid = ( ( typeof(promotion.montant) != "undefined" && promotion.montant != null && promotion.montant > 0 ) || ( isMontantPaliers ) );
            var isArticlesPromos = typeof(promotion.article_en_promo) != "undefined" && promotion.article_en_promo != null && promotion.article_en_promo.length > 0;

            return isMontantValid && isArticlesPromos;
        }

        function checkPromotionRemise(promotion) {

            var isArticlesPromos = typeof(promotion.article_en_promo) != "undefined" && promotion.article_en_promo != null && promotion.article_en_promo.length > 0;
            var isPourcentageValid = typeof(promotion.pourcentage) != "undefined" && promotion.pourcentage != null && promotion.pourcentage > 0;

            return isArticlesPromos && isPourcentageValid;
        }

        function promotionClient(promotion_id, client_id, pourcentage, priorite) {
            var deferred = $q.defer();

            var sql_query = "INSERT INTO promotion_client(promotion_id, client_id) VALUES(?,?);";
            var bindings = [promotion_id, client_id];
            DB.query(sql_query, bindings).then(
                function (success) {
                    console.log(success);
                    //deferred.resolve(promotionGratuite(promotion_id, pourcentage, priorite, []));
                    deferred.resolve(success);
                },
                function (error) {
                    console.error(error);
                    deferred.resolve(error);
                });
            return deferred.promise;
        }

        function promotionGratuite(id, remise, priorite, promoArticles) {
            var deferred = $q.defer();

            var sql_query = "INSERT INTO promotion_gratuite(promotion_id, remise, priorite) VALUES(?,?,?);";
            var bindings = [id, remise, priorite];
            DB.query(sql_query, bindings).then(
                function (success) {

                    angular.forEach(promoArticles, function (articles, group) {

                        angular.forEach(articles, function (article) {

                            deferred.resolve(promotionGratuiteArticle(success.insertId, article.itemId, article.quantite, group));

                        });

                    });
                },
                function (error) {
                    deferred.resolve(error);
                });
            return deferred.promise;
        }

        function promotionGratuiteArticle(promotionGratuiteId, articleId, qty, giftGroup) {
            var deferred = $q.defer();

            var sql_query = "INSERT INTO gratuite_article(promotion_gratuite_id, article_id, qte, groupe) VALUES(?,?,?,?);";
            var bindings = [promotionGratuiteId, articleId, qty, giftGroup];
            return DB.query(sql_query, bindings).then(
                function (success) {
                    deferred.resolve(success);
                },
                function (error) {
                    deferred.resolve(error);
                });
            return deferred.promise;
        }


        function promotionArticle(id_db, article) {
            var deferred = $q.defer();

            var sql_query = "INSERT INTO promotion_article(promotion_id, article_id, qty, conditionning_unit) VALUES (?,?,?,?);";
            var bindings = [id_db, article.itemId, article.quantite, article.uconditionement];
            DB.query(sql_query, bindings).then(
                function (success) {
                    deferred.resolve(success);
                },
                function (error) {
                    deferred.resolve(error);
                });

            return deferred.promise;
        }

        function addPromotion(promotion) {
            console.error(promotion);
            var deferred = $q.defer();

            var profile = JSON.parse(window.localStorage["profile"] || "{}");

            var parametrage = profile.parametrage || {};
            var company = parametrage.company || {};
            var tenant_id = company.id;
            var activite = profile.activite || 0;


            var priorite = promotion.priorite == null ? 0 : promotion.priorite;
            var pourcentage = promotion.pourcentage == null ? 0 : promotion.pourcentage;
            var id = promotion.id;

            var sql_query = "INSERT INTO promotions(id_db, qte, ca, max_steps, cummulable, type, starts_at, ends_at, activated, conditionning_unit, melange, valable_once, libelle, societe, activite) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
            var bindings = [promotion.id, promotion.qte, promotion.montant, promotion.max_steps, promotion.cummulable == true ? 1 : 0, promotion.type, promotion.starts_at, promotion.ends_at, promotion.activated == true ? 1 : 0, promotion.conditionning_unit, promotion.melange == true ? 1 : 0, promotion.oneTime == true ? 1 : 0, (promotion.libelle || ""), tenant_id, activite];
            DB.query(sql_query, bindings).then(
                function (success) {
                    console.log(success);
                    if (typeof success.insertId != "undefined") {




                        angular.forEach(promotion.article_en_promo, function (article) {

                            deferred.resolve(promotionArticle(promotion.id, article));

                        });

                        if (promotion.promoPaliers != null && promotion.promoPaliers.length > 0) {
                            var addons = [];

                            console.debug(promotion.promoPaliers);

                            angular.forEach(promotion.promoPaliers, function (pp, index) {

                                var cummulable = pp.cumulable ? 1 : 0;
                                var max = pp.nbCumulable == null ? 0 : pp.nbCumulable;
                                var remise = pp.remise == null ? 0 : pp.remise;
                                var qte = pp.quantite == null ? 0 : pp.quantite;


                                addons.push("(" + promotion.id + ", " + pp.montant + ", " + remise + ", " + qte + ", " + cummulable + ", " + max + ")");

                                if (index == promotion.promoPaliers.length - 1) {
                                    DB.query("INSERT INTO promotion_palier (id_promotion, montant, remise, qte, cummulable, max) VALUES " + addons.join(", ") + ";")
                                        .then(
                                            function (success) {
                                                deferred.resolve(success);
                                            },
                                            function (error) {
                                                deferred.resolve(error);
                                            });

                                }

                            });
                        }

                        

                        if( typeof(promotion.client.length) != "undefined" && promotion.client != null && promotion.client.length > 0 )
                        {
                            angular.forEach(promotion.client, function (client) {

                                //deferred.resolve(promotionGratuite(id, pourcentage, priorite, []));
                                deferred.resolve(promotionClient(id, client, pourcentage, priorite));

                            });
                        }
                        else
                        {
                            deferred.resolve("AUCUN CLIENT ALORS QUE C'EST UNE PROMOTION CLIENT !");
                        }


                        deferred.resolve(promotionGratuite(id, pourcentage, priorite, promotion.article_gratuits));


                    }
                    else {
                        deferred.resolve("Erreur lors de l'insertion de la promotion !");
                    }
                },
                function (error) {
                    console.log(error, tenant_id, activite);
                    deferred.resolve(updatePromotion(promotion, tenant_id, activite));
                    //deferred.resolve("PROMOTION ALREADY EXIST !");
                });
            return deferred.promise;
        }


        function updatePromotion(promotion, societe, activite) {

            var deferred = $q.defer();

            var activated = promotion.activated ? 1 : 0;
            var id = promotion.id || 0;
            var sql_query = "UPDATE promotions SET activated = " + activated + " WHERE id_db = " + id + " AND societe = " + societe + " AND activite = " + activite + ";";
            
            var array = [sql_query];

            angular.forEach(array, function(item){
                DB.query(sql_query).then(
                function(success){
                    console.log(success);
                    deferred.resolve(success);
                }, 
                function(error){
                    console.error(error);
                    deferred.resolve(error);
                });
            });

            return deferred.promise;

        }


    })

    .factory('PromotionsBackend', function ($q, $http) {
        var deferred = $q.defer();
        return {
            getAllPromotions: getAllPromotions
        };

        function getAllPromotions() {
            var req = {
                method: "GET",
                url: "http://url_back_end/route"
            };
            return $http(req).then(
                function (data, status, headers) {
                    // On va ajouter ici quelque lignes de codes
                    deferred.resolve(data);
                },
                function (data, status, headers) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
    })

    .factory('SynchronizationService', ['$q', '$http', 'DB', 'Routes', 'Accounts', 'Profile', function ($q, $http, DB, Routes, Accounts, Profile) {
        return {
            sync: sync
        };

        function sync() {
            var deferred = $q.defer();
            $http.get("http://197.230.28.154:81/newsales/rest/clients/road/1/sync")
                .then(
                    function (data, status, headers) {
                        console.log(JSON.stringify(data));
                        console.log(JSON.stringify(data.data.id));
                        var idAPI = data.data.id;
                        console.log("HIGHEST ID IN API : " + idAPI);
                        Routes.getLastRoute().then(
                            function (data) {
                                console.log(data);
                                var idDB = data.id_db;
                                console.log(idDB);
                                if (idAPI > idDB) {
                                    console.log("YOUR CURRENT DATABASE IS NOT UP TO DATE !");
                                    console.log((idAPI - idDB) + " routes are waitiing to be pushed in your local DB");
                                    console.log("HERE IS THE ROUTES !!");
                                    $http.get("http://197.230.28.154:81/newsales/rest/clients/road/1/sync/" + idDB).then(
                                        function (data, status, headers) {
                                            var clients = data.data;
                                            angular.forEach(clients, function (client) {
                                                var route = {};
                                                route.id_db = client.id;
                                                route.code_route = (client.codeClient === null) ? "ROUTE" + (Math.round(Math.random() * 10)) : client.codeClient;
                                                route.client_id = client.id;
                                                route.address = "8, IBN HABIB BOURGOGNE"
                                                route.lat = "21.254545";
                                                route.lng = "2.245445";
                                                route.date_max = Date.now();
                                                route.state = client.visited;

                                                Routes.addRoute(route).then(
                                                    function (data) {
                                                        console.log("ROUTE BELOW :");
                                                        console.log(JSON.stringify(data));
                                                    },
                                                    function (error) {
                                                        console.log("YOUR LOCAL DB IS UP TO DATE !!");
                                                    });
                                            });
                                            deferred.resolve("Mise à jour avec succès.");

                                        },
                                        function (error, status, headers) {
                                            deferred.reject("Erreur survenue lors de la connection");

                                        }
                                    );
                                }
                                else {
                                    console.log("YOUR LOCAL DB IS UP TO DATE !!");
                                    deferred.reject("L'application est à jour.");
                                }
                            },
                            function (error) {
                                deferred.reject("Erreur survenue lors de la connection");
                            });

                    },
                    function (error, status, headers) {
                        deferred.reject("Erreur survenue lors de la connection");
                    });

            return deferred.promise;
        }

        function highestIDInDB() {
            $http.get("http://197.230.28.154:81/newsales/rest/roads/check")
                .success(function (data, status, headers) {
                    console.log("THE HIGHEST ID IN DB IS : " + data.id);
                })
                .error(function (error, status, headers) {
                    console.log(error);
                });
        }


    }]);
