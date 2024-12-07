import { IonBackButton, IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react"
import { ellipse, stop } from "ionicons/icons"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectDestination, selectOrigin } from "../../Redux/Features/directionsSlice";


const Home = () => {

    const history = useHistory();

    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)

    return (<>

        <IonToolbar>
            <IonButtons>
                <IonBackButton defaultHref="/" ></IonBackButton>
            </IonButtons>
            <IonTitle>Pickup location</IonTitle>
        </IonToolbar>


        <IonSearchbar value={origin?.full_address} searchIcon={ellipse} onClick={() => history.replace('/ride/pickup')} placeholder="Pickup location"></IonSearchbar>
        <IonSearchbar value={destination?.full_address} searchIcon={stop} onClick={() => history.replace('/ride/dropoff')} placeholder="Dropoff destination"></IonSearchbar>


        {/* <IonList inset={true}>
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
                </IonList> */}

    </>)
}

export default Home;