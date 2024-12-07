import { IonBackButton, IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonSpinner, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ellipse, locationOutline, map, stop } from "ionicons/icons";
import { useSearchPlacesQuery } from "../../Redux/Api/mapboxApi";
import { selectDestination, selectOrigin, setDestination, setOrigin } from "../../Redux/Features/directionsSlice";
import { useHistory } from "react-router";


const Dropoff = () => {

    const history = useHistory();
    const inputRef = useRef();

    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    const [search, setSearch] = useState(destination?.full_address);
    const [list, setList] = useState(null);

    const { data: locations = [], isLoading, isSuccess, isError, error } = useSearchPlacesQuery(search, {
        skip: !search || destination?.full_address == search
    });

    const handleInput = (e) => {
        const value = e.target.value;
        if (value.length > 2) {
            setSearch(value)
        }
    }

    const handleClear = () => {
        setSearch(null)
        setList(null)
        dispatch(setDestination(null))
    }

    const handleSelect = (selection) => {
        // setList(null)
        setSearch(selection.properties.full_address)
        dispatch(setDestination(selection.properties))
    }

    useEffect(() => {
        locations.length > 0 && setList(locations)
    }, [locations])

    useIonViewDidEnter(() => {
        inputRef.current?.setFocus()
    }, [])

    return (<>

        <IonToolbar>
            <IonButtons>
                <IonBackButton defaultHref="/" ></IonBackButton>
            </IonButtons>
            <IonTitle>Dropoff destination</IonTitle>
        </IonToolbar>

        <IonSearchbar value={origin?.full_address} searchIcon={ellipse} onClick={() => history.replace('/ride/pickup')} placeholder="Pickup location"></IonSearchbar>


        <IonSearchbar
            ref={inputRef}
            placeholder="Dropoff destination"
            searchIcon={stop}
            debounce={1000}
            value={search}
            onIonInput={handleInput}
            onIonClear={handleClear}
            className={`${isError && 'ion-invalid'}`}
        >
        </IonSearchbar>


        <IonList inset={true}>
            <IonItem className="cursor-pointer">
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
                <IonItem key={item.id} onClick={() => handleSelect(item)} className="cursor-pointer">
                    <IonIcon aria-hidden="true" icon={locationOutline} slot="start"></IonIcon>
                    <IonLabel>
                        {item.properties.full_address}
                    </IonLabel>
                </IonItem>
            ))}
        </IonList>

    </>)
};

export default Dropoff;

