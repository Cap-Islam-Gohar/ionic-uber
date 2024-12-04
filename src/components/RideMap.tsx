import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from "react";
import { Map, Marker, Source, Layer, GeolocateControl } from "react-map-gl";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrent, selectDestination, selectDirections, selectOrigin, setCurrent, setDirections, setOrigin } from '../Redux/Features/directionsSlice';
import { useGetDirectionQuery, useGetLocationNameQuery } from '../Redux/Api/mapboxApi';
import { IonIcon } from '@ionic/react';
import { ellipse, pin, stop } from 'ionicons/icons';
import mapboxgl from 'mapbox-gl';

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

const RideMap = () => {

    // Create bounds and extend it with route coordinates
    const bounds = new mapboxgl.LngLatBounds();
    const mapRef = useRef(null);
    const map = mapRef.current?.getMap();
    const dispatch = useDispatch();

    const current = useSelector(selectCurrent);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const directions = useSelector(selectDirections);

    const [currentLocation, setCurrentLocation] = useState(false);


    const isReady = origin?.coordinates && destination?.coordinates;
    const places = isReady ? [origin.coordinates, destination.coordinates] : [];

    const { data: route, error, isLoading } = useGetDirectionQuery(
        { places, profile: 'driving' },
        { skip: !isReady }
    );

    const { data: revers, errorRevers, isLoadingRevers } = useGetLocationNameQuery(currentLocation, {
        skip: !currentLocation.latitude && !currentLocation.longitude,
    });

    const [viewState, setViewState] = useState({
        latitude: 30,
        longitude: 31,
        zoom: 14,
        maxZoom: 18,
        minZoom: 5,
    })

    useEffect(() => {
        if (mapRef.current) return;
    }, [])

    const handleGeolocate = (e) => {

        const { latitude, longitude } = e.coords;
        if (latitude && longitude) {
            setCurrentLocation({
                longitude: longitude,
                latitude: latitude,
            })
            // setViewState({
            //     ...viewState,
            //     longitude,
            //     latitude
            // })
        }
    }

    const handleDragEnd = (event) => {
        const center = map.getCenter();
        setViewState({
            latitude: center.lat,
            longitude: center.lng,
            zoom: 14,
            maxZoom: 18,
            minZoom: 5,
        });
        setCurrentLocation(true);

        console.log(viewState)
    };


    useEffect(() => {
        revers && dispatch(setCurrent(revers.properties)) && setCurrentLocation(null)  //dispatch(setOrigin(revers.properties))
    }, [revers])


    useEffect(() => {
        if (route != undefined) {
            dispatch(setDirections({ ...route }));
            // map.on('load', () => {
            const coords = route?.geometry.coordinates
            // low performance
            // const coordsFit = [coords[0], coords[coords.length - 1]];
            coords.forEach((coord) => bounds.extend(coord));
            // Fit map to bounds
            map.fitBounds(bounds, { padding: 50 });
            // });
        }
    }, [route]);

    useEffect(() => {
        console.log(origin)
        //  Fly to the specified location with an animation
        mapRef.current?.flyTo({
            center: [origin.coordinates.longitude, origin.coordinates.latitude],
        });
    }, [origin]);

    useEffect(() => {
        if (map) {
            // Listen for window resize and call map.resize() to update the canvas size
            window.addEventListener('resize', () => map.resize());
        }
        // Cleanup resize listener
        return () => {
            window.removeEventListener('resize', () => map.resize());
        };
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
            }}
        >
            <Map
                id={"ride-map"}
                ref={mapRef}
                initialViewState={viewState}
                mapboxAccessToken={TOKEN}
                style={{ position: "absolute", width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                // onViewportChange={() => { setViewState(mapRef.current.center) }}
                onMove={(event) => setViewState(event.viewState)}
                onMoveEnd={handleDragEnd}
            >
                {/* Fixed Centered Marker */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "",
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                    }}
                />

                <GeolocateControl
                    position="top-right"
                    fitBoundsOptions={{ maxZoom: 10 }}
                    positionOptions={{ enableHighAccuracy: true }}
                    // trackUserLocation={true}
                    onGeolocate={(e) => handleGeolocate(e)}

                    showUserLocation={true}
                />

                <Marker latitude={viewState.latitude} longitude={viewState.longitude}>
                    <IonIcon size='large' style={{
                        // background: "red",
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)",
                    }} icon={pin} />
                </Marker>

                {origin && <Marker longitude={origin.coordinates.longitude} latitude={origin.coordinates.latitude}>
                    <IonIcon
                        icon={ellipse}
                        style={{ fontSize: '25px' }}
                    />
                </Marker>}

                {destination && <Marker longitude={destination.coordinates.longitude} latitude={destination.coordinates.latitude}>
                    <IonIcon
                        icon={stop}
                        style={{ fontSize: '25px' }}
                    />
                </Marker>}

                {places?.map((place, index) => {
                    if (index != 0 || index != places.length - 1) {
                        <Marker key={index} longitude={place.longitude} latitude={place.latitude}>
                            <IonIcon
                                icon={index === 0 ? ellipse : index === places.length - 1 ? stop : ''}
                                style={{ fontSize: '25px' }}
                            />
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
            </Map>
        </div >
    );
};

export default RideMap;
