import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404 - Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for does not exist.</p>
        <IonButton onClick={() => history.push('/home')}>Go Home</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;