import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useRef, useState } from "react";
import { Map, Marker, Source, Layer, GeolocateControl } from "react-map-gl";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrent, selectDestination, selectDirections, selectOrigin, setCurrent, setDirections, setOrigin } from '../Redux/Features/directionsSlice';
import { useGetDirectionQuery, useGetLocationNameQuery } from '../Redux/Api/mapboxApi';
import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react';
import { ellipse, locateSharp, pin, stop } from 'ionicons/icons';
import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';
import AnimatedPin from './AnimatedPin';
import CurrentLocationBtn from './CurrentLocationBtn';
import DirectionsLayer from './DirectionsLayer';
import Pickup from '../pages/rides/Pickup';
import PickupPin from './PickupPin';
import DropoffPin from './DropoffPin';

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

const RideMap = ({ children }) => {

    const router = useIonRouter();

    const mapRef = useRef();
    const markerRef = useRef();
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const directions = useSelector(selectDirections);
    const [viewState, setViewState] = useState({
        longitude: 31,
        latitude: 30,
        zoom: 8,
    });

    useEffect(() => {

        const map = mapRef.current
        // Listen for window resize and call map.resize() to update the canvas size
        map && window.addEventListener('resize', () => map?.resize());

        // Cleanup resize listener
        return () => window.removeEventListener('resize', () => map?.resize())
    }, []);

    useEffect(() => {
        const map = mapRef.current

        if (origin && !destination) {
            //fly to origin
            map?.flyTo({
                center: [origin.coordinates.longitude, origin.coordinates.latitude],
                zoom: 8,
            });
        }

        //fly to destination
        // if (!origin && destination) {
        //     map?.flyTo({
        //         center: [destination.coordinates.longitude, destination.coordinates.latitude],
        //         zoom: 8,
        //     });
        // }

        // if (!origin && !destination) {
        //     //fly to location
        //     map?.flyTo({
        //         center: [viewState.longitude, viewState.latitude],
        //         zoom: 8,
        //     });
        // }
    }, [origin, destination])

    useEffect(() => {
        // directions && router.push('/ride/select')
    }, [directions])

    return (
        <div>
            <Map
                {...viewState}
                mapboxAccessToken={TOKEN}
                style={{ position: "absolute", width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                ref={mapRef}
                maxZoom={18}
                minZoom={5}
                onMove={(evt) => setViewState(evt.viewState)}
            >
                {/* Centered marker */}
                {/* {!directions && <Marker ref={markerRef} latitude={viewState.latitude} longitude={viewState.longitude} style={{ zIndex: 9999 }}>
                    <AnimatedPin animatePin={animatePin} />
                </Marker>} */}

                {!directions && !origin && <PickupPin viewState={viewState} />}
                {!directions && !destination && <DropoffPin viewState={viewState} />}

                {!directions && <CurrentLocationBtn />}

                <DirectionsLayer />

            </Map>

            {children}
        </div>
    );
};

export default RideMap;
