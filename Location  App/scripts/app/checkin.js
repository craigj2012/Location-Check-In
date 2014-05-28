(function (global) {
    var app = global.app = global.app || {};

    app.checkin = function (e) {
        if (isLoggedIn=false) {
            navigator.notification.alert("Please Log into Application on Login Tab", alertDismissed
                                         , "Login", 'OK');
            return false;
        }
        //Gather Location and send to Server
        console.log("Running Geo Location");
        var that = this,
            position;

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
