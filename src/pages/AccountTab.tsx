import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const AccountTab = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Account</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>Account Tab Content</h1>
    </IonContent>
  </IonPage>
);

export default AccountTab;
