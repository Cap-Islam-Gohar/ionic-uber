import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeTab from './taps/HomeTab';
import ActivityTab from './taps/ActivityTab';
import AccountTab from './taps/AccountTab';
import { homeOutline, calendarOutline, personOutline } from 'ionicons/icons';

const HomeScreen = () => (
    <IonTabs>
        <IonRouterOutlet>
            <Route exact path="/home" component={HomeTab} />
            <Route exact path="/activity" component={ActivityTab} />
            <Route exact path="/account" component={AccountTab} />
            {/* Redirect root to /home */}
            <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="activity" href="/activity">
                <IonIcon icon={calendarOutline} />
                <IonLabel>Activity</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
                <IonIcon icon={personOutline} />
                <IonLabel>Account</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
);

export default HomeScreen;
