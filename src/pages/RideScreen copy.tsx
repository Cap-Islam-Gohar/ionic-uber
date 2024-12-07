import { IonSearchbar } from '@ionic/react';
import { ellipse, stop } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { selectDestination, selectOrigin } from '../Redux/Features/directionsSlice';
import { useSelector } from 'react-redux';

const RideScreen = () => {

    const history = useHistory();

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);


    return (<>
        <IonSearchbar onClick={() => history.replace('/ride/pickup')} value={origin?.full_address} placeholder="Pickup location" searchIcon={ellipse}></IonSearchbar>
        <IonSearchbar value={destination?.full_address} onClick={() => history.replace('/ride/dropoff')} placeholder="Dropoff destination" searchIcon={stop}></IonSearchbar>
    </>)

}

export default RideScreen;
