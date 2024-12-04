import { IonBackButton, IonButtons, IonContent, IonInput, IonItem, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { ellipse, stop } from 'ionicons/icons'
import { useSearchPlacesQuery } from '../Redux/Api/mapboxApi';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setOrigin } from '../Redux/Features/directionsSlice';

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Pickup = () => {

    const history = useHistory();
    const location = useLocation();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination);

    const [searchText, setSearchText] = useState(origin?.full_address ?? null);
    const [placesList, setPlacesList] = useState([]);

    const { data: locations = [], isLoading, isSuccess, isError } = useSearchPlacesQuery(searchText, {
        skip: !searchText
    });

    const handleInput = (ev) => {
        let query = '';
        const target = ev.target;
        if (target) query = target.value

        if (query.length > 1) {
            setSearchText(query)
        }
    };


    useEffect(() => {
        locations.length > 0 && setPlacesList(locations)
    }, [locations]);

    const handleSelection = (item) => {
        dispatch(setOrigin(item.properties))
        setPlacesList([])
        setSearchText(item.properties.full_address)
    }


    useEffect(() => {
        const focusInputTimer = setTimeout(() => {
            inputRef.current?.setFocus();
        }, 500);

        return () => clearTimeout(focusInputTimer)
    }, [])

    return (<>
        {/* <IonPage> */}
        <IonContent scroll-y="false">
            <IonSearchbar
                placeholder="Pickup location"
                searchIcon={ellipse}
                debounce={1000}
                value={searchText}
                onIonInput={(ev) => handleInput(ev)}
                onIonClear={() => {
                    dispatch(setOrigin(null))
                    setSearchText(null)
                    setPlacesList([])
                }}
            >
            </IonSearchbar>

            <IonSearchbar onClick={() => history.replace('/ride/dropoff')} value={destination?.full_address} placeholder="Dropoff destination" searchIcon={stop}></IonSearchbar>

            <IonList >
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error loading locations</p>}
                {placesList?.map((item, index) => (
                    <IonItem style={{ cursor: "pointer" }}
                        onClick={() => handleSelection(item)} key={index}>
                        {item?.properties?.full_address}
                    </IonItem>
                ))}
            </IonList>
        </IonContent>
        {/* </IonPage> */}

    </>);
};

export default Pickup;


