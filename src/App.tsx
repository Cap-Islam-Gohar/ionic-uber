import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Main/Home';
import Services from './pages/Main/Services';
import Activity from './pages/Main/Activity';
import Account from './pages/Main/Account';
import Go from './pages/Go/Go';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect path="/" to={"/home"} exact />
                    <Route path="/home" render={() => <Home />} exact />
                    <Route path="/services" render={() => <Services />} exact />
                    <Route path="/activity" render={() => <Activity />} exact />
                    <Route path="/account" render={() => <Account />} exact />
                    <Route path="/go" render={() => <Go />}/>
                    <Route component={() => (<>
                        <div className='flex justify-center items-center text-center h-full w-full'>
                            <h1 className='text-red-500'>404, Not Found</h1>
                        </div>
                    </>)} />


                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="home" href="/home">
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="services" href="/services">
                        <IonLabel>Services</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="activity" href="/activity">
                        <IonLabel>Activity</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="account" href="/account">
                        <IonLabel>Account</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
  </IonApp>
);

export default App;
