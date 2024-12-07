import { IonBackButton, IonButtons, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setOrigin } from "../../Redux/Features/directionsSlice";
import { Marker, useMap } from "react-map-gl";
import { useEffect, useState } from "react";
import PickupPin from "../../components/PickupPin";
import { useGetLocationNameQuery } from "../../Redux/Api/mapboxApi";
import AnimatedPin from "../../components/AnimatedPin";
import { useLocation } from "react-router";


const SetPickupPin = ({mapRef, viewState}) => {

    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);

    const [location, setLocation] = useState(null);
    const [animatePin, setAnimatePin] = useState(false);


    const { data: locName, isError, isLoading } = useGetLocationNameQuery(location, {
        skip: !location,
    });

    useEffect(() => {
        locName && dispatch(setOrigin(locName.properties))
    }, [locName])

    useEffect(() => {
        mapRef.current?.on("dragstart", (e) => {
            setAnimatePin(true)
        })

        mapRef.current?.on("dragend", (e) => {
            console.log();
            setAnimatePin(false)
            setLocation({
                latitude: e.viewState.latitude,
                longitude: e.viewState.longitude
            })
        })
    
    }, [])

    return (<>
        <Marker latitude={viewState.latitude} longitude={viewState.longitude} style={{ zIndex: 9999 }}>
            <AnimatedPin animatePin={animatePin} />
        </Marker>
        <IonToolbar>
            <IonButtons>
                <IonBackButton defaultHref="/"></IonBackButton>
            </IonButtons>
            <IonTitle>Drag map To pickup</IonTitle>
        </IonToolbar>
        <IonSearchbar placeholder={origin?.full_address ?? "pickup location on map"}></IonSearchbar>
    </>)
}

export default SetPickupPin;