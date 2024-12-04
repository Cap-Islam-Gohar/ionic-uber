import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

const HomeTab = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Home</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <h1>Welcome to Home Tab</h1>
            <IonButton routerLink="/ride">Go to ride page</IonButton>
        </IonContent>
    </IonPage>
);

export default HomeTab;
