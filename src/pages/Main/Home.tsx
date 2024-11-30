import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { Link } from 'react-router-dom';


const Home = () => {

    const router = useIonRouter();

    return (
        <IonPage>
            
            <IonContent fullscreen>

                <IonTitle>Uber</IonTitle>


                <Link to={"/go"}>Where to ?</Link>



            </IonContent>
        </IonPage>
    );
};

export default Home;
