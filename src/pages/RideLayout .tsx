import React, { useRef, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterOutlet, IonButtons, IonBackButton, IonModal, IonButton, useIonModal } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RideScreen from './RideScreen';
import RideModal from '../components/RideModal';
import RideMap from '../components/RideMap';
import { MapProvider } from 'react-map-gl';
import Pickup from './Pickup';
import Dropoff from './Dropoff';

const RideLayout = () => {

    return (<>
        <IonPage>
            <IonContent>
                {/* Map Component */}
                <RideMap />
                {/* Modal Components with Pages and Routes */}
                <RideModal />
            </IonContent>
        </IonPage>


    </>);
};

export default RideLayout;
