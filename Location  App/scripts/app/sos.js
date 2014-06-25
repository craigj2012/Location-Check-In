(function (global) {
    var app = global.app = global.app || {};
    _watchID = null;
   
    var recipients1 = {
        "Recipients": [
            "craig.johnson@nov.com"
        ]
    };
    var recipients2 = {
        "Recipients": [
            "craig.johnson@nov.com"
        ],
        "Context":{
            "SOS":"SOS has been cancelled"
        }
    };

    app.showConfirm = function() {
        if (_watchID == null) {
            navigator.notification.confirm('Are you sure you want to send an SOS?', app.sos, 'Confirm SOS', ['Send','Cancel']); 
            $.ajax({
                       type: "POST",
                       url: 'http://api.everlive.com/v1/Metadata/Applications/C7WPO3Ga2DGaJ3IfqZVxZNUNiNh8wPo8/EmailTemplates/WelcomeEmail/send',
                       contentType: "application/json",
                       headers: { "Authorization" : "Masterkey {{Masterkey}}" },
                       data: JSON.stringify(recipients1),
                       success: function(data) {
                           alert("Email successfully sent.");
                       },
                       error: function(error) {
                           alert(JSON.stringify(error));
                       }
                   })
        } else {
            navigator.notification.confirm('Are you sure you want to cancel an SOS?', app.sos, 'Cancel SOS', ['Yes','No']);
            $.ajax({
                       type: "POST",
                       url: 'http://api.everlive.com/v1/Metadata/Applications/C7WPO3Ga2DGaJ3IfqZVxZNUNiNh8wPo8/EmailTemplates/ca79c291-e282-11e3-8f8f-0f52ab436939/send',
                       contentType: "application/json",
                       headers: { "Authorization" : "Masterkey {{C7WPO3Ga2DGaJ3IfqZVxZNUNiNh8wPo8}}" },
                       data: JSON.stringify(recipients2),
                       success: function(data) {
                           alert("Email successfully sent.");
                       },
                       error: function(error) {
                           alert(JSON.stringify(error));
                       }
                   })
        }
    };
    
    app.sos = function (e) {
        if (e == 2) {
            return;
        }
        var currentUser, currentUserData, user;
        if (isLoggedIn=false) {
            navigator.notification.alert("Please Log into Application on Login Tab", alertDismissed
                                         , "Login", 'OK');
            return false;
        }
        app.everlive.Users.currentUser()
            .then(function (data) {
                currentUser = kendo.observable({ data: null });
                currentUserData = data.result;
                currentUser.set('data', currentUserData);
                user = currentUser.get("data.DisplayName");
            });
        
        //Gather Location and send to Server
        console.log("Running SOS Geo Location");
        var that = this,
            position, 
            button = document.getElementById("sos");
        
        // If watch is running, clear it now. Otherwise, start it.
        button = document.getElementById("sos");
                     
        if (that._watchID != null) {
            console.log("SOS has been disabled");
            navigator.geolocation.clearWatch(that._watchID);
            that._watchID = null;
                         
            button.innerHTML = "Send SOS";
        } else {
            // Update the watch 5 second.
            var options = {
                frequency: 5000,
                enableHighAccuracy: true
            }
            navigator.notification.alert("SOS Has been sent. Contact GSOC");
        
            that._watchID = navigator.geolocation.watchPosition(
                function(position) {
                    var location = new Everlive.GeoPoint(position.coords.longitude , position.coords.latitude);
                    
                    var data = app.everlive.data('SOS');
                    //Create Record on Server
                    data.create({
                                    'Altitude':position.coords.altitude,
                                    'Accuracy':position.coords.accuracy, 
                                    'GeoLocation':location, 
                                    'Altitude_Accuracy':position.coords.altitudeAccuracy,
                                    'Heading':position.coords.heading,
                                    'Speed':position.coords.speed,
                                    'Name':user
                                },
                                function(data) {
                                    // alert(JSON.stringify(data));
                                },
                                function(error) {
                                    alert(JSON.stringify(error));
                                });
                    //position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    /** app.setResults('Phone Type: ' + device.platform + '<br />' +
                    'Phone UUID: ' + device.uuid + '<br />' +
                    'Latitude: ' + position.coords.latitude + '<br />' +
                    'Longitude: ' + position.coords.longitude + '<br />' +
                    'Altitude: ' + position.coords.altitude + '<br />' +
                    'Accuracy: ' + position.coords.accuracy + '<br />' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                    'Heading: ' + position.coords.heading + '<br />' +
                    'Speed: ' + position.coords.speed + '<br />' +
                    'Timestamp: ' + new Date(position.timestamp).toLocaleTimeString().split(" ")[0] + '<br />');
                    **/
                }, function(error) {
                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                                                 function () {
                                                 }, "Location failed", 'OK');
                }, options);
            button.innerHTML = "Click to Disable SOS";
        }
    }
    app.setResults = function (value) {
        if (!value) {
            document.getElementById("results").innerHTML = "";
        } else {
            document.getElementById("results").innerHTML = value;
        }
    }
})(window);
