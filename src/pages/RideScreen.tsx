import { IonContent, IonModal, IonPage, IonRouterOutlet } from "@ionic/react"
import { Redirect, Route, useHistory, useLocation } from "react-router";
import Pickup from "./rides/Pickup";
import Dropoff from "./rides/Dropoff";
import { Map, Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import Home from "./rides/Home";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectDestination, selectDirections, selectOrigin } from "../Redux/Features/directionsSlice";
import CurrentLocationBtn from "../components/CurrentLocationBtn";
import DirectionsLayer from "../components/DirectionsLayer";

import SetPickupPin from "./rides/SetPickupPin";
import SetDropoffPin from "./rides/SetDropoffPin";


const RideScreen = () => {

    const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const location = useLocation();
    const history = useHistory();
    const mapRef = useRef();
    const modalRef = useRef();

    const pages = {
        home: location.pathname == '/ride/home',
        pickup: location.pathname == '/ride/pickup',
        setPickupPin: location.pathname == '/ride/pickup/set-pin',
        dropoff: location.pathname == '/ride/dropoff',
        setDropoffPin: location.pathname == '/ride/dropoff/set-pin',
    }

    const [modalbreakpoints, setModalbreakpoints] = useState({
        initialBreakpoint: 0.9,
        breakpoints: [0.2, 0.9],
        backdropBreakpoint: 0.2
    })

    useEffect(() => {
        (pages.home || pages.pickup || pages.dropoff) && setModalbreakpoints({
            initialBreakpoint: 0.9,
            breakpoints: [0.2, 0.9],
            backdropBreakpoint: 0.2
        })
        pages.setPickupPin || pages.setDropoffPin && setModalbreakpoints({
            initialBreakpoint: 0.2,
            breakpoints: [0.2, 0.9],
            backdropBreakpoint: 0.2
        })
    }, [])


    const [viewState, setViewState] = useState({
        longitude: 31,
        latitude: 30,
        zoom: 8,
    });

    const directions = useSelector(selectDirections);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    return (<>
        <IonPage>
            {/* <IonContent> */}
                {/* <div className=" absolute top-0 left-0 right-0 bottom-0"> */}
                    {/* <div className="h-screen w-full"> */}
                        <Map
                            mapboxAccessToken={TOKEN}
                            ref={mapRef}
                            mapStyle="mapbox://styles/mapbox/dark-v11"
                            style={{ width: "100%", height: "100%" }}
                            onMove={(evt) => setViewState(evt.viewState)}
                            {...viewState}
                            maxZoom={18}
                            minZoom={5}
                        >
                            <IonModal
                                ref={modalRef}
                                isOpen={true}
                                {...modalbreakpoints}
                                animated={false}
                                canDismiss={false}
                                onDidDismiss={() => history.replace('/ride/home')}
                                onIonBreakpointDidChange={(e) => {
                                    const isSmall = e.detail.breakpoint === 0.2 ? true : false

                                    !isSmall && pages.setPickupPin && history.replace('/ride/pickup')
                                    !isSmall && pages.setDropoffPin && history.replace('/ride/dropoff')

                                    isSmall && (pages.pickup || pages.home) && history.replace('/ride/pickup/set-pin')
                                    isSmall && pages.dropoff && history.replace('/ride/dropoff/set-pin')

                                }}
                            >
                                <IonContent scrollY={false} fullscreen color="light" className="ion-padding">

                                    <CurrentLocationBtn />

                                    <DirectionsLayer />


                                    <Route exact path="/ride/home" render={() => <Home />} />
                                    <Route exact path="/ride/pickup" render={() => <Pickup />} />
                                    <Route exact path="/ride/dropoff" render={() => <Dropoff />} />
                                    <Route exact path="/ride/pickup/set-pin" render={() => <SetPickupPin mapRef={mapRef} viewState={viewState} />} />
                                    <Route exact path="/ride/dropoff/set-pin" render={() => <SetDropoffPin mapRef={mapRef} viewState={viewState} />} />
                                    <Route exact path="/ride" render={() => <Redirect to="/ride/home" />} />
                                </IonContent>

                            </IonModal>


                        </Map>
                    {/* </div> */}
                {/* </div> */}

            {/* </IonContent> */}
        </IonPage >
    </>)
}

export default RideScreen;
