

//Call this function when you want to get the current position
function getPosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	var unixtime = new Date(position.timestamp);
    var time = unixtime.toDateString();
    var longitude = position.coords.longitude;
	var latitude = position.coords.latitude;

	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + time);
	$('#longtext').val(longitude);
    $('#lattext').val(latitude);
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}

function success(Position) {
    //lets get some stuff out of the position object
	var unixdate = new Date(Position.timestamp);
    var date = unixdate.toDateString();
    var unixtime = new Date(Position.timestamp);
    var time = unixtime.toTimeString();
    
    var longitude = Position.coords.longitude;
	var latitude = Position.coords.latitude;

	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved: " + date + " " + time);
	$('#longtext').val(longitude);
    $('#lattext').val(latitude);
    console.log(Position);
    // set current position
    //setCurrentPosition(Position);
    //setMarkerPosition(currentPositionMarker, Position);
}
function error(error) {
    console.log(error.message);
}

function turnOffWatch() {
    
}

// Google Maps Initialization

            var map,
                currentPositionMarker,
                mapCenter = new google.maps.LatLng(40.700683, -73.925972),
                map;

            function initializeMap()
            {
                map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 13,
                   center: mapCenter,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });
            }

            function locError(error) {
                // the current position could not be located
                alert("The current position could not be found!");
            }

            function setCurrentPosition(pos) {
                currentPositionMarker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ),
                    title: "Current Position"
                });
                map.panTo(new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ));
            }

            function displayAndWatch(position) {
                // set current position
                setCurrentPosition(position);
                // watch position
                watchCurrentPosition();
            }

            function watchCurrentPosition() {
                var positionTimer = navigator.geolocation.watchPosition(
                    function (position) {
                        setMarkerPosition(
                            currentPositionMarker,
                            position
                        );
                    });
            }

            function setMarkerPosition(marker, position) {
                marker.setPosition(
                    new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude)
                );
            }

            function initLocationProcedure() {
                initializeMap();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
                } else {
                    alert("Your browser does not support the Geolocation API");
                }
            }
            
        $(document).ready(function() {
            //initializeMap();
            initLocationProcedure();
        });
