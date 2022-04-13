import React, { useEffect, useState } from 'react'
import { FaSketch } from 'react-icons/fa'

const useGeoLocation = () => {
    {/*Create a const to store whether geolocation has been loaded and coordinates (latitudate, longitude) */}
    const [location, setLocation] = useState({ 
        loaded: false,
        coordinates: {lat: "", lng: ""} 
    });

    const onSuccess = location => {
        console.log("Geolocation Success");
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            },
        });
    };

    const onError = error => {
        console.log("Geolocation Error");
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        if(!("geolocation" in navigator)){
            onError({
                code: 0,
                message: "Geolocation not supported",
            })
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
}

export default useGeoLocation