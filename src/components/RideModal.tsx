
import { IonBackButton, IonButtons, IonContent, IonInput, IonModal, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import RideScreen from '../pages/RideScreen';
import Pickup from '../pages/Pickup';
import Dropoff from '../pages/Dropoff';
import { Redirect, Route, useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../Redux/Features/directionsSlice';

const RideModal = () => {

    const modalRef = useRef(null);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination);

    const [isSmallSheet, setIsmallSheet] = useState(false);

    const expandSheet = () => {
        modalRef.current?.setCurrentBreakpoint(0.9);
    }

    return (
        <IonModal
            id="ride-modal"
            ref={modalRef}
            isOpen={true}
            initialBreakpoint={0.9}
            breakpoints={[0.2, 0.9]}
            backdropDismiss={false}
            backdropBreakpoint={0.2}
            onDidDismiss={() => history.replace('/ride/home')}
            onIonBreakpointDidChange={(e) => {
                e.detail.breakpoint === 0.2 ? setIsmallSheet(true) : setIsmallSheet(false)
            }}
        >
            {!isSmallSheet && <IonContent scroll-y="false">
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/home' />
                        <IonTitle>Plan Your Ride </IonTitle>
                    </IonButtons>
                </IonToolbar>

                <Route exact path="/ride/home" render={() => <RideScreen />} />
                <Route exact path="/ride/pickup" render={() => <Pickup />} />
                <Route exact path="/ride/dropoff" render={() => <Dropoff />} />
                <Route exact path="/ride" render={() => <Redirect to="/ride/home" />} />

            </IonContent>}

            {isSmallSheet && <IonContent className='ion-padding'>
                <IonToolbar scroll-y="false">
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="/home" />
                        <IonTitle>
                            {location.pathname === '/ride/home' && 'Plan Your ride'}
                            {location.pathname === '/ride/pickup' && 'Pickup you ride'}
                            {location.pathname === '/ride/dropoff' && 'Dropof you ride'}
                        </IonTitle>
                    </IonButtons>
                </IonToolbar>
                {origin && <IonInput fill={"outline"} onClick={expandSheet} value={origin?.properties?.full_address} disabled placeholder="Where are you ?"></IonInput>}
                {destination && <IonInput fill={"outline"} onClick={expandSheet} value={destination?.properties?.full_address} disabled placeholder="Where you go ?"></IonInput>}
                {!origin && !destination && <IonInput onClick={expandSheet} fill={"outline"} disabled placeholder="Where you  ?"></IonInput>}
            </IonContent>}

        </IonModal>
    )
}

export default RideModal;