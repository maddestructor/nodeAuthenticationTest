// config/passport.js

// on charge la strategie
var LocalStrategy   = require('passport-local').Strategy;

// on charge le modele d'utilisateur
var User       		= require('../app/models/user');

// on expose la fonction du passport
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================

    //on sérialise l'utilisateur (on crée la session avec son id)
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //on le désérialise (on retourne chercher l'utilisateur à partir de sa session)
    passport.deserializeUser(function(id, done) {
        var user = new User();
        user.fetchUserInfoByID(id);
        done(null, user);
    });


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // Section défini pour faire l'authentification en local (passport nous permet
    // le OAUTH)

    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true // nous permet d'envoyer la req dans le callback
    },
    function(req, username, password, done) { // le callback

        //on instancie un utilisateur
        var user = new User(User.fetchUserInfoByName(username));

        //on rempli ses informations à l'aide de la fonction qui fait le call à l'api
        // user.fetchUserInfoByName(username);

        //on vérifie l'usager
        if (user.data.username == null || user.data.username == ''){
            // req.flash renvoie des infos sur l'erreur
            return done(null, false, req.flash('loginMessage', 'Utilisateur non trouvé'));

            // on vérifie le mot de passe
        } else if (!user.validatePassword(password)){
            //on renvoie des infos si le mot de passe n'est pas bon
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        } else {
            //on retourne un usager authentifié avec succès
            return done(null, user);
        }

    }));

};
