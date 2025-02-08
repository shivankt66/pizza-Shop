function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Reverse Geocoding to get address
            const geocoder = new google.maps.Geocoder();
            const latlng = { lat, lng };
            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        document.getElementById("location-text").innerText = results[0].formatted_address;
                    } else {
                        document.getElementById("location-text").innerText = "Location not found!";
                    }
                } else {
                    document.getElementById("location-text").innerText = "Error fetching address!";
                }
            });

        }, () => {
            document.getElementById("location-text").innerText = "Location access denied!";
        });
    } else {
        document.getElementById("location-text").innerText = "Geolocation not supported!";
    }
}

// Get location on page load
getLocation();