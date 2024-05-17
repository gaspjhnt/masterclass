Projet MasterClass UnitTest - Groupe 3 - Gaspard, Noah, Fabrice, Ahmad, Liyam



Pour accéder à la partie admin : [url]/admin



-- Réservation --

METHOD          URL                         DESCRIPTION
GET            api/reservation/                récupère toutes les reservations.
GET             api/reservation/{1}            récupère une reservation.
POST            api/reservation/create            créer une reservation.
POST            api/reservation/update/{1}        edit une reservation (nbPersons & event_id).
DELETE          api/reservation/delete/{1}        delete une reservation.


-- Events --

METHOD        URL            DESCRIPTION
GET           api/events        recupere tous les events
GET           api/events/{id}     recupere l'event id
POST          api/events        creer un evenement
PUT           api/events/{id}     modifier l'evenement id
DELETE        api/events/{id}     supprimer l'event id

-- Type (type d'evenement(concert, etc))--

METHOD        URL            DESCRIPTION
GET           api/type        recupere tous les types
POST          api/type        creation d'un type
PUT           api/type/{id}        modifier le type id
DELETE        api/type/{id}        supprimer le type id
