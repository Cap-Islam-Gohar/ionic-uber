import { useEffect, useState } from "react";
import { Marker, useMap } from "react-map-gl";
import { useGetLocationNameQuery } from "../Redux/Api/mapboxApi";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setOrigin } from "../Redux/Features/directionsSlice";
import AnimatedPin from "./AnimatedPin";


const PickupPin = ({ viewState }) => {

    const dispatch = useDispatch();
    const map = useMap();

    const [location, setLocation] = useState(null);
    const [animatePin, setAnimatePin] = useState(false);


    const { data: locName, isError, isLoading } = useGetLocationNameQuery(location, {
        skip: !location,
    });

    useEffect(() => {
        locName && dispatch(setOrigin(locName.properties))
    }, [locName])

    useEffect(() => {
        map.current?.on("dragstart", (e) => {
            setAnimatePin(true)
        })

        map.current?.on("dragend", (e) => {
            console.log();
            setAnimatePin(false)
            setLocation({
                latitude: e.viewState.latitude,
                longitude: e.viewState.longitude
            })
        })
    
    }, [])

    return (
        <Marker latitude={viewState.latitude} longitude={viewState.longitude} style={{ zIndex: 9999 }}>
            <AnimatedPin animatePin={animatePin} />
        </Marker>
    )
}

export default PickupPin;