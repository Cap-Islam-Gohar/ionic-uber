import { IonBackButton, IonButtons, IonContent, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useHistory } from 'react-router';
import { IonItem, IonList, IonSearchbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { ellipse, stop } from 'ionicons/icons'
import { useSearchPlacesQuery } from '../../Redux/Api/mapboxApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setDestination } from '../../Redux/Features/directionsSlice';

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

const SelectRide = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const destination = useSelector(selectDestination);

    // const [searchText, setSearchText] = useState(destination?.full_address ?? null);
    // const [placesList, setPlacesList] = useState([]);

    // const { data: locations = [], isLoading, isSuccess, isError } = useSearchPlacesQuery(searchText, {
    //     skip: !searchText,
    // });


    // const handleInput = (ev) => {
    //     let query = '';
    //     const target = ev.target;
    //     if (target) query = target.value

    //     if (query.length > 2) {
    //         setSearchText(query)
    //     };
    // };

    // Update placesList whenever search results change
    // useEffect(() => {
    //     locations.length > 0 && setPlacesList(locations)
    // }, [locations]);

    // useEffect(() => {
    //     const focusInputTimer = setTimeout(() => {
    //         inputRef?.current?.setFocus();
    //     }, 1);

    //     return () => clearTimeout(focusInputTimer)
    // }, [])


    return (<>

        <h1>hi select</h1>

        {/* <IonList >
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading locations</p>}
            {placesList?.map((loc, index) => (
                <IonItem style={{ cursor: "pointer" }}
                    onClick={() => {
                        dispatch(setDestination(loc.properties))
                        setPlacesList([])
                        setSearchText(loc.properties.full_address)
                    }} key={index}>
                    {loc?.properties?.full_address}
                </IonItem>
            ))}
        </IonList> */}



    </>);
};

export default SelectRide;

