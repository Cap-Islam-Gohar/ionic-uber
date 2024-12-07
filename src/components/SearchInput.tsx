import { IonIcon, IonItem, IonLabel, IonList, IonSearchbar, IonSpinner } from "@ionic/react";
import { useSearchPlacesQuery } from "../Redux/Api/mapboxApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setOrigin } from "../Redux/Features/directionsSlice";
import { ellipse, locationOutline } from "ionicons/icons";


const SearchInput = () => {

    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);

    const [search, setSearch] = useState(null);
    const [list, setList] = useState(null);

    const { data: locations = [], isLoading, isSuccess, isError, error } = useSearchPlacesQuery(search, {
        skip: !search || origin?.full_address == search
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
        dispatch(setOrigin(null))
    }

    const handleSelect = (selection) => {
        // setList(null)
        setSearch(selection.properties.full_address)
        dispatch(setOrigin(selection.properties))
    }

    useEffect(() => {
        console.log(error)
        locations.length > 0 && setList(locations)
    }, [locations])

    return (<>
        <IonSearchbar 
            placeholder="Pickup location"
            searchIcon={ellipse}
            debounce={1000} 
            value={search} 
            onIonInput={handleInput}
            onIonClear={handleClear}
            className={`${isError && 'ion-invalid'}`}
        >
            <IonIcon slot="start" icon={ellipse} /> 
        </IonSearchbar>
        

        <IonList inset={true}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading locations</p>}
            {list?.map((item) => (
                <IonItem key={item.id} onClick={() => handleSelect(item)}>
                    <IonIcon aria-hidden="true" icon={locationOutline} slot="start"></IonIcon>
                    <IonLabel>
                        {item.properties.full_address}
                    </IonLabel>
                </IonItem>
            ))}
        </IonList>


    </>)
};

export default SearchInput;

