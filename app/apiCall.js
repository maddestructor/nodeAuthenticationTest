/**
 * Created by mathieu on 3/11/17.
 */
var querystring = require('querystring');
var https = require('https');

//le lien vers notre api
var host = 'gti525-h17-banque1-backend.herokuapp.com/api/1.0.0/';

//Noter la success représente la function à exécuter en cas de succès
exports.performRequestToAPI = function(endpoint, method, data, success) {
    //si des données sont présentes, on les ajoute à l'url
    var dataString = JSON.stringify(data);

    //Plutôt explicite
    var headers = {
        'Content-Type': 'application/json',
        'apikey': '0o0o0o0o0o0o0o0o0o0o0o0o'
    };

    //Les options qui seront utilisées pour la requete
    var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
    };

    //La requete https envoyée à l'api
    var req = https.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log(responseString);
            var responseObject = JSON.parse(responseString);
            success(responseObject);
        });
    });

    req.write(dataString);
    req.end();
};
