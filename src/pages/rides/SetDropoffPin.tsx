import { IonBackButton, IonButtons, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setDestination, setOrigin } from "../../Redux/Features/directionsSlice";
import { Marker, useMap } from "react-map-gl";
import { useEffect, useState } from "react";
import { useGetLocationNameQuery } from "../../Redux/Api/mapboxApi";
import AnimatedPin from "../../components/AnimatedPin";


const SetDropoffPin = ({mapRef, viewState}) => {

    const dispatch = useDispatch();
    const destination = useSelector(selectDestination);

    const [location, setLocation] = useState(null);
    const [animatePin, setAnimatePin] = useState(false);


    const { data: locName, isError, isLoading } = useGetLocationNameQuery(location, {
        skip: !location,
    });

    useEffect(() => {
        locName && dispatch(setDestination(locName.properties))
    }, [locName])

    useEffect(() => {
        mapRef?.current?.on("dragstart", (e) => {
            setAnimatePin(true)
        })

        mapRef?.current?.on("dragend", (e) => {
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
                <IonBackButton defaultHref="/ride/dropoff"></IonBackButton>
            </IonButtons>
            <IonTitle>Drag map To Dropoff</IonTitle>
        </IonToolbar>
        <IonSearchbar placeholder={destination?.full_address ?? "Dropoff location on map"}></IonSearchbar>
    </>)
}

export default SetDropoffPin;