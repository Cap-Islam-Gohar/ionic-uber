import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Map } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Route, useHistory } from 'react-router-dom';
import Pickup from './Pickup';
import Dropoff from './Dropoff';
import { useRef } from 'react';
import { addCircle, close, ellipse, eye, lockClosed, square, stop, stopCircle, stopCircleSharp, stopSharp } from 'ionicons/icons';




const token = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Go = () => {

    const modal = useRef(null);

    const history = useHistory();

    return (<>
        <IonPage>
            <IonContent fullscreen className='h-full w-full overflow-hidden'>
                <Map
                    mapboxAccessToken={token}
                    initialViewState={{
                        longitude: -100,
                        latitude: 40,
                        zoom: 3.5
                    }}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >

                    <IonModal
                        id="ride-modal"
                        ref={modal}
                        isOpen={true}
                        initialBreakpoint={0.9}
                        breakpoints={[0.25, 0.9]}
                        backdropDismiss={false}
                        backdropBreakpoint={0.25}
                        onDidDismiss={() => history.replace('/home')}
                    >

                        <IonContent className='ion-padding'>

                            <IonToolbar>
                                <IonButtons slot='start'>
                                    <IonBackButton defaultHref="/home"></IonBackButton>
                                </IonButtons>
                                <IonTitle className=''>Plan you ride</IonTitle>
                            </IonToolbar>

                            <div className='flex justify-between items-center space-x-2'>
                                <div className='flex w-full rounded-xl border-2 px-2'>
                                    <div className='flex justify-center items-center py-3'>
                                        <div className='h-full py-4 bg-black w-1'></div>
                                    </div>
                                    <div className='flex ps-2'>
                                        <IonInput
                                            onClick={() => history.replace('/go/pickup')}
                                            labelPlacement="stacked"
                                            className='border-b'
                                            placeholder='Pickup your location'>
                                            <IonIcon slot="start" icon={ellipse} aria-hidden="true"></IonIcon>
                                            <IonButton fill="clear" slot="end" aria-label="Show/hide">
                                                <IonIcon slot="icon-only" icon={close} aria-hidden="true"></IonIcon>
                                            </IonButton>
                                        </IonInput>
                                        <IonInput
                                            onClick={() => history.replace('/go/dropoff')}
                                            labelPlacement="stacked"
                                            className='border-b'
                                            placeholder='Dropoff your location'>
                                            <IonIcon slot="start" icon={stopSharp} aria-hidden="true"></IonIcon>
                                            <IonButton fill="clear" slot="end" aria-label="Show/hide">
                                                <IonIcon slot="icon-only" icon={close} aria-hidden="true"></IonIcon>
                                            </IonButton>
                                        </IonInput>
                                    </div>
                                </div>
                                <div>
                                    <div className='w-8 h-8 m-1 rounded-full bg-black text-white flex justify-center items-center'>
                                        <IonButton fill='clear'>
                                            <IonIcon icon={addCircle}></IonIcon>
                                        </IonButton>
                                    </div>
                                </div>
                            </div>

                            <Route path="/go/pickup" component={Pickup} />
                            <Route path="/go/dropoff" component={Dropoff} />

                            <IonList>
                                <IonItem>
                                    <IonAvatar slot="start">
                                        <IonImg src="https://i.pravatar.cc/300?u=b" />
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>Connor Smith</h2>
                                        <p>Sales Rep</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonAvatar slot="start">
                                        <IonImg src="https://i.pravatar.cc/300?u=a" />
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>Daniel Smith</h2>
                                        <p>Product Designer</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonAvatar slot="start">
                                        <IonImg src="https://i.pravatar.cc/300?u=d" />
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>Greg Smith</h2>
                                        <p>Director of Operations</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonAvatar slot="start">
                                        <IonImg src="https://i.pravatar.cc/300?u=e" />
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>Zoey Smith</h2>
                                        <p>CEO</p>
                                    </IonLabel>
                                </IonItem>
                            </IonList>

                        </IonContent>

                    </IonModal>
                </Map>


            </IonContent>
        </IonPage >
    </>)
};

export default Go;

