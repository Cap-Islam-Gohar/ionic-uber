import { useEffect, useRef, useState } from "react";
import { GeolocateControl, Marker } from "react-map-gl";
import { Geolocation } from '@capacitor/geolocation';
import { useGetLocationNameQuery } from "../Redux/Api/mapboxApi";
import { IonIcon } from "@ionic/react";
import { locateSharp } from "ionicons/icons";
import { setCurrent, setOrigin } from "../Redux/Features/directionsSlice";
import { useDispatch } from "react-redux";

const CurrentLocationBtn = () => {

    const dispatch = useDispatch()

    const [currentLocation, setCurrentLocation] = useState(null);
    // const [error, setError] = useState(null);

    const { data: locName, isError, isLoading } = useGetLocationNameQuery(currentLocation, {
        skip: !currentLocation,
    });

    useEffect(() => {
        if(locName ) {
            dispatch(setCurrent(locName.properties))
            dispatch(setOrigin(locName.properties))
        }
    }, [locName])

    {/* // Update viewState and map when currentLocation changes
    useEffect(() => {
        if (currentLocation) {
            // setViewState((prevState) => ({
            //     ...prevState,
            //     latitude: currentLocation.latitude,
            //     longitude: currentLocation.longitude,
            // }));
            // console.log(mapRef.current);

            map.current?.flyTo({
                center: [currentLocation.longitude, currentLocation.latitude],
                zoom: 15,
            });
        }
    }, [currentLocation]);

    // Function to get the user's current location
    const getUserLocation = async () => {
        if (currentLocation) {
            mapRef.current?.flyTo({
                center: [currentLocation.longitude, currentLocation.latitude],
                zoom: 15,
            });
        } else {
            try {
                const coordinates = await Geolocation.getCurrentPosition();
                setCurrentLocation({
                    latitude: coordinates.coords.latitude,
                    longitude: coordinates.coords.longitude,
                });
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Error getting location:', err);
                setError('Failed to get location. Please check location permissions.');
            }
        }
    }; */}

    const handleCurentLocation = (e) => {
        //set location in redux
        // console.log('currnent location: ', e);
        setCurrentLocation({
            latitude: e.coords.latitude,
            longitude: e.coords.longitude
        })
    }

    return (<>

        <GeolocateControl onGeolocate={handleCurentLocation} />
        
        {/* Current location marker */}
        {/* {currentLocation && (
            <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude}>
                <div className='pulsing-dot'></div>
            </Marker>
        )} */}

        {/* Button to get user location */}
        {/* <div
            onClick={getUserLocation}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                backgroundColor: "white",
                position: "absolute",
                padding: 4,
                margin: 10,
                cursor: "pointer",
            }}
        >
            <IonIcon size={"large"} icon={locateSharp} />
        </div> */}
    </>);
};

export default CurrentLocationBtn;
