(function (global) {
    var app = global.app = global.app || {};
    app.checkin = function (e) {
        if(isLoggedIn=false){
            navigator.notification.alert("Please Log into Application on Login Tab",alertDismissed
                   , "Login", 'OK');
            return false;

        }
	    //Gather Location and send to Server
	    console.log("Running Geo Location");
        var that = this,
                position;

	    navigator.geolocation.getCurrentPosition(
                function (position) {
                    //position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    app.setResults('Phone Type: '+ device.platform +'<br />'+
                    	 'Phone UUID: '+ device.uuid +'<br />'+
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
                    position = new google.maps.LatLng(43.459336, -80.462494);
                    map.panTo(position);

                    that._isLoading = false;
                    that.toggleLoading();

                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                        function () { }, "Location failed", 'OK');
                },
                {
                    timeout: 30000,
                    enableHighAccuracy: true
                }
            );

	}
	app.setResults = function (value) {
	    if (!value) {
	        document.getElementById("results").innerHTML = "";
	    }
	    else {
	        document.getElementById("results").innerHTML = value;
            
	    }
	}

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        app.changeSkin = function (e) {
            var mobileSkin = "";

            if (e.sender.element.text() === "Flat") {
                e.sender.element.text("Native");
                mobileSkin = "flat";
            } else {
                e.sender.element.text("Flat");
                mobileSkin = "";
            }

            app.application.skin(mobileSkin);
        };

        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
    }, false);
})(window);