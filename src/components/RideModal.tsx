
import { IonBackButton, IonButtons, IonContent, IonInput, IonModal, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import RideScreen from '../pages/RideScreen';
import Pickup from '../pages/rides/Pickup';
import Dropoff from '../pages/rides/Dropoff';
import { Redirect, Route, useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectDirections, selectOrigin } from '../Redux/Features/directionsSlice';
import SelectRide from '../pages/rides/SelectRide';

const RideModal = () => {

    const modalRef = useRef(null);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination);
    const directions = useSelector(selectDirections);

    const [isSmallSheet, setIsmallSheet] = useState(false);
    const [modalbreakpoints, setModalbreakpoints] = useState({
        initialBreakpoint: 0.9,
        breakpoints: [0.2, 0.9],
        backdropBreakpoint: 0.2
    })

    const expandSheet = () => {
        modalRef.current?.setCurrentBreakpoint(0.9);
    }

    useEffect(() => {
        location.pathname == '/ride/select' && setModalbreakpoints({
            initialBreakpoint: 0.5,
            breakpoints: [0.2, 0.5],
            backdropBreakpoint: 0.2
        })
    }, [directions])

    return (
        <IonModal
            id="ride-modal"
            ref={modalRef}
            isOpen={true}
            {...modalbreakpoints}
            backdropDismiss={false}
            onDidDismiss={() => history.replace('/ride/home')}
            onIonBreakpointDidChange={(e) => {
                e.detail.breakpoint === 0.2 ? setIsmallSheet(true) : setIsmallSheet(false)
            }}
        >
            {!isSmallSheet && <IonContent scrollY={false} className="ion-padding">
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/home' />
                        <IonTitle>Plan Your Ride </IonTitle>
                    </IonButtons>
                </IonToolbar>

                <Route exact path="/ride/home" render={() => <RideScreen />} />
                <Route exact path="/ride/pickup" render={() => <Pickup />} />
                <Route exact path="/ride/dropoff" render={() => <Dropoff />} />
                <Route exact path={'/ride/select'} render={() => <SelectRide />} />
                <Route exact path="/ride" render={() => <Redirect to="/ride/home" />} />

            </IonContent>}

            {isSmallSheet && <IonContent className='ion-padding'>
                {
                    /**
                     * if 
                     */
                }
                <IonToolbar scroll-y="false">
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="/home" />
                        <IonTitle>
                            {location.pathname === '/ride/home' && (<IonTitle>
                                Set your puckup spot
                            </IonTitle>)}
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