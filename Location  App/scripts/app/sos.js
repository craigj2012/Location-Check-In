(function (global) {
    var app = global.app = global.app || {};
    _watchID = null

    app.sos = function (e) {
        if (isLoggedIn=false) {
            navigator.notification.alert("Please Log into Application on Login Tab", alertDismissed
                                         , "Login", 'OK');
            return false;
        }
        
        //Gather Location and send to Server
        console.log("Running SOS Geo Location");
        var that = this,
            position, 
            button = document.getElementById("sos");
        
        // If watch is running, clear it now. Otherwise, start it.
        button = document.getElementById("sos");
                     
        if (that._watchID != null) {
            navigator.geolocation.clearWatch(that._watchID);
            that._watchID = null;
                         
            button.innerHTML = "Send SOS";
        } else {
            //setResults("Waiting for geolocation information...");
            // Update the watch every second.
            var options = {
                frequency: 1000,
                enableHighAccuracy: true
            }
            that._watchID = navigator.geolocation.watchPosition(
            function(position) {
               var location = new Everlive.GeoPoint(position.coords.longitude , position.coords.latitude);
                console.log("Callback");
                var data = app.everlive.data('SOS');
                data.create({'Altitude':position.coords.altitude,
                    		 'Accuracy':position.coords.accuracy, 
                    		 'Location':location, 
                    		 'Altitude_Accuracy':position.coords.altitudeAccuracy,
                    		 'Heading':position.coords.heading,
                    		 'Speed':position.coords.speed
                			},
                            function(data) {
                                alert(JSON.stringify(data));
                            },
                            function(error) {
                                alert(JSON.stringify(error));
                            });
                //position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
            }, function(error) {
                navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                                             function () {
                                             }, "Location failed", 'OK');
            }, options);
            button.innerHTML = "SOS Activated";
        }

        navigator.geolocation.getCurrentPosition(
            function (position) {
                var location = new Everlive.GeoPoint(position.coords.longitude , position.coords.latitude);
                //var el = new Everlive('WRqlNRftKg0AiOlj');
                var data = app.everlive.data('Check_In');
                data.create({'Phone_Type':device.platform,'Phone_UUID':device.uuid, 'Location':location,  },
                            function(data) {
                                alert(JSON.stringify(data));
                            },
                            function(error) {
                                alert(JSON.stringify(error));
                            });
                //position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
            },
            function (error) {
                //default map coordinates
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
