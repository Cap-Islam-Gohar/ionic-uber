import { IonBackButton, IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonSpinner, IonTitle, IonToolbar, useIonModal, useIonViewDidEnter } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ellipse, locate, locationOutline, map, navigateCircleOutline, stop } from "ionicons/icons";
import { selectDestination, selectOrigin, setOrigin } from "../../Redux/Features/directionsSlice";
import { useSearchPlacesQuery } from "../../Redux/Api/mapboxApi";
import { useHistory, useLocation } from "react-router";




const Pickup = () => {

    const history = useHistory();
    const inputRef = useRef();

    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    const [search, setSearch] = useState(origin?.full_address);
    const [list, setList] = useState(null);

    const { data: locations = [], isLoading, isSuccess, isError, error } = useSearchPlacesQuery(search, {
        skip: !search || origin?.full_address == search
    });

    const handleInput = (e) => {
        const value = e.target.value;
        value.length > 2 && setSearch(value)
    }

    const handleClear = () => {
        setSearch(null)
        setList(null)
        dispatch(setOrigin(null))
    }

    const handleSelect = (selection) => {
        // setList(null)
        setSearch(selection.properties.full_address)
        dispatch(setOrigin(selection.properties))
    }

    useEffect(() => {
        locations.length > 0 && setList(locations)
    }, [locations])


    return (<>

        <IonToolbar>
            <IonButtons>
                <IonBackButton defaultHref="/" ></IonBackButton>
            </IonButtons>
            <IonTitle>Pickup location</IonTitle>
        </IonToolbar>
        
        <IonSearchbar
            autoFocus={true}
            ref={inputRef}
            placeholder="Pickup location"
            searchIcon={ellipse}
            debounce={1000}
            value={search}
            onIonInput={handleInput}
            onIonClear={handleClear}
            className={`${isError && 'ion-invalid'}`}
        >
        </IonSearchbar>
        <IonSearchbar searchIcon={stop} value={destination?.full_address} onClick={() => history.replace('/ride/dropoff')} placeholder="Dropoff destination"></IonSearchbar>

        <IonList inset={true}>
            <IonItem className=" cursor-pointer">
                <IonIcon icon={locate} aria-hidden="true" slot="start"></IonIcon>
                <IonLabel>Your Current Location</IonLabel>
            </IonItem>
            <IonItem className=" cursor-pointer">
                <IonIcon icon={map} aria-hidden="true" slot="start"></IonIcon>
                <IonLabel>Set location on map</IonLabel>
            </IonItem>
            {isLoading && <IonItem className="cursor-wait">
                {/* <IonIcon icon={map} aria-hidden="true" slot="start"></IonIcon> */}
                <IonSpinner slot="start" />
                <IonLabel>Set location on map</IonLabel>
            </IonItem>}
            {isError && <p>Error loading locations</p>}
            {list?.map((item) => (
                <IonItem key={item.id} onClick={() => handleSelect(item)} className=" cursor-pointer">
                    <IonIcon aria-hidden="true" icon={locationOutline} slot="start"></IonIcon>
                    <IonLabel>
                        {item.properties.full_address}
                    </IonLabel>
                </IonItem>
            ))}
        </IonList>
    </>)


};

export default Pickup;

