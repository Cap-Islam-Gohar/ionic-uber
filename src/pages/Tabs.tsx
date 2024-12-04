import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeTab from './HomeTab';
import ActivityTab from './ActivityTab';
import AccountTab from './AccountTab';
import { homeOutline, calendarOutline, personOutline } from 'ionicons/icons';

const Tabs = () => (
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

export default Tabs;
