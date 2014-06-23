/**
 * Login view model
 */

var app = app || {};

app.Login = (function () {
    'use strict';

    var loginViewModel = (function () {

        var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);

        var $loginUsername;
        var $loginPassword;

        

        var init = function () {

            if (!app.isKeySet(appSettings.everlive.apiKey)) {
                app.mobileApp.navigate('views/noApiKey.html', 'fade');
            }

            $loginUsername = $('#loginUsername');
            $loginPassword = $('#loginPassword');

           
        };

        var show = function () {
            $loginUsername.val('');
            $loginPassword.val('');
        };

        // Authenticate to use Backend Services as a particular user
        var login = function () {

            var username = $loginUsername.val();
            var password = $loginPassword.val();

            // Authenticate using the username and password
                        app.everlive.Users.login(username, password)
            .then(function () {
                // EQATEC analytics monitor - track login type
                

                return app.Users.load();
            })
            .then(function () {

                app.mobileApp.navigate('views/home.html');
                
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );
        };

        
     
        return {
            init: init,
            show: show,
            getYear: app.getYear,
            login: login,
           
        };

    }());

    return loginViewModel;

}());
