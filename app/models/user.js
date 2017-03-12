// app/models/user.js
//dependencies
var sha256   = require('sha256');
var model = require('nodejs-model');
var apiRequest = require('../apiCall');
var https = require('https');
var http = require('http');



var user = function (data) {
    this.data = data;
};

//notre modèle
user.prototype.data = {
    username: '',
    password: '',
    id: '',
    firstname: '',
    middlename: '',
    lastname: '',
    birthDate: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    email: '',
    title: '',
    description: '',
    passPhrase: '',
    securityPicture: '',
    creditLimit: '',
    checkingBalance: '',
    creditCard: '',
    isAdmin: '',
    creditBalance: ''
};


//marche pas
user.fetchUserInfoByName = function(username) {
    // options.url += username;
    var http = require("http");

    var options = {
        "method": "GET",
        "hostname": "gti525-h17-banque1-backend.herokuapp.com",
        "port": null,
        "path": "/api/1.0.0/accounts?userName=iamgod",
        "headers": {
            "apikey": "0o0o0o0o0o0o0o0o0o0o0o0o",
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "9e6892ca-ecb9-d34b-ff70-a79e2c159e49"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.end();


};

//marche pas
user.fetchUserInfoByID = function(id, callback) {
    console.log(id);
    //(endpoint, method, data, success)
    apiRequest.performRequestToAPI('/accounts/'+ id, 'GET', null, function (data) {
        console.log("coucou");
        this.data.username = data.result.username;
        this.data.password = data.result.password;
        this.data.id = data.result.id;
        this.data.firstname = data.result.firstname;
        this.data.middlename = data.result.middlename;
        this.data.lastname = data.result.lastname;
        this.data.birthDate = data.result.birthDate;
        this.data.address1 = data.result.address1;
        this.data.address2 = data.result.address2;
        this.data.city = data.result.city;
        this.data.province = data.result.province;
        this.data.postalCode = data.result.postalCode;
        this.data.phone = data.result.phone;
        this.data.email = data.result.email;
        this.data.title = data.result.title;
        this.data.description = data.result.description;
        this.data.passPhrase = data.result.passPhrase;
        this.data.securityPicture = data.result.securityPicture;
        this.data.creditLimit = data.result.creditLimit;
        this.data.checkingBalance = data.result.checkingBalance;
        this.data.creditCard = data.result.creditCard;
        this.data.isAdmin = data.result.isAdmin;
        this.data.creditBalance = data.result.creditBalance;
        callback(data);
    });
    console.log('Completed user fetching to api');

};

//on valide le mot de passe de l'utilisateur
user.validatePassword = function(password) {
    var hashedPassword = String(sha256(this.password()));
    if(hashedPassword.slice(-24) === password) {
        return true;
    } else {
        return false;
    }
}

//on exporte notre modèle
module.exports = user;
