import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useRef, useState } from "react";
import { Map, Marker, Source, Layer, GeolocateControl, useMap } from "react-map-gl";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrent, selectDestination, selectDirections, selectOrigin, setCurrent, setDirections, setOrigin } from '../Redux/Features/directionsSlice';
import { useGetDirectionQuery } from '../Redux/Api/mapboxApi';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { ellipse, locateSharp, pin, stop } from 'ionicons/icons';
import mapboxgl from 'mapbox-gl';

const DirectionsLayer = () => {

    const map = useMap();
    // Create bounds and extend it with route coordinates
    const bounds = new mapboxgl.LngLatBounds();

    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const directions = useSelector(selectDirections);

    const isReady = origin?.coordinates && destination?.coordinates;
    const places = isReady ? [origin.coordinates, destination.coordinates] : [];

    const { data: route, error, isLoading } = useGetDirectionQuery({ places, profile: 'driving' }, {
        skip: !isReady
    });

    useEffect(() => {
        if (route) {
            // console.log(route)
            dispatch(setDirections({ ...route }));
            map.current?.on('load', () => {
                const coords = route?.geometry.coordinates
                // low performance
                // const coordsFit = [coords[0], coords[coords.length - 1]];
                coords.forEach((coord) => bounds.extend(coord));
                // Fit map to bounds
                map.current?.fitBounds(bounds, { padding: 50 });

                // map.current?.fitBounds(coords, {
                //     padding: 50, // Add padding around the bounds
                //     duration: 1000, // Animation duration in milliseconds
                //     offset: [0, -100], // x (horizontal) and y (vertical) offset in pixels
                //     essential: true // Ensures animation even when user interaction is happening
                // });

                // Listen for window resize and call map.resize() to update the canvas size
                map.current && window.addEventListener('resize', () => map.current?.resize());
            });
        }

        // Cleanup resize listener
        return () => window.removeEventListener('resize', () => map.current?.resize())
    }, [route]);


    return (<>
        {(origin && directions) && <Marker longitude={origin.coordinates.longitude} latitude={origin.coordinates.latitude}>
            <IonIcon
                icon={ellipse}
                style={{ fontSize: '25px' }}
            />
        </Marker>}

        {(destination && directions) && <Marker longitude={destination.coordinates.longitude} latitude={destination.coordinates.latitude}>
            <IonIcon
                icon={stop}
                style={{ fontSize: '25px' }}
            />
        </Marker>}

        {places?.map((place, index) => {
            if (index != 0 || index != places.length - 1) {
                <Marker key={index} longitude={place.longitude} latitude={place.latitude}>
                    {/* <IonIcon
                        icon={index === 0 ? ellipse : index === places.length - 1 ? stop : ''}
                        style={{ fontSize: '25px' }}
                    /> */}
                </Marker>
            }
        })}

        {directions && origin && destination && (
            <Source
                id="route"
                type="geojson"
                data={{
                    type: 'Feature',
                    geometry: directions?.geometry,
                }}
            >
                <Layer
                    id="route-layer"
                    type="line"
                    paint={{
                        'line-color': '#000',
                        'line-width': 4,
                    }}
                />
            </Source>
        )}
    </>)

}

export default DirectionsLayer;