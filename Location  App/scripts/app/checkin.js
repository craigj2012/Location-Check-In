(function (global) {
    var app = global.app = global.app || {};

    app.checkin = function (e) {
        var currentUser,currentUserData, user;
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
                            user=currentUser.get("data.DisplayName");
                        });
        
        console.log("Running Geo Location");
        var that = this,
            position;
        
        
		//Gather Location and send to Server
        navigator.geolocation.getCurrentPosition(
            function (position) {
                
                var location = new Everlive.GeoPoint(position.coords.longitude , position.coords.latitude);
                var data = app.everlive.data('CHECK_IN');
                data.create({
                    			'Phone_Type':device.platform,
                    			'Phone_UUID':device.uuid, 
                    			'Name':user ,
                    			'GeoLocation':location
                    			
                			},
                            function(data) {
                                alert("Check In Sent",function(){},'Check In Sent','OK');
                            },
                            function(error) {
                                alert(JSON.stringify(error));
                            });
                
                /** View Results in app for Testing
                app.setResults('Phone Type: ' + device.platform + '<br />' +
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
            },
            function (error) {
                //default Message when GPS not available
                navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                                             function () {
                                             }, "Location failed", 'OK');
            }, {
                timeout: 30000,
                enableHighAccuracy: true
            }
            );
    }
    app.setResults = function (value) {
        if (!value) {
            document.getElementById("results").innerHTML = "";
        } else {
            document.getElementById("results").innerHTML = value;
        }
    }
})(window);
