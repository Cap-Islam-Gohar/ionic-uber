import { Route } from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
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

// import '@ionic/react/css/palettes/dark.always.css';
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css';
import NotFound from './pages/NotFound';
import HomeScreen from './pages/HomeScreen';
import RideScreen from './pages/RideScreen';
import { MapProvider } from 'react-map-gl';

setupIonicReact({
    mode: "ios"
});


const App = () => (

    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                {/* Routes with tabs */}
                <Route path={['/', '/home', '/activity', '/account']} render={() => <HomeScreen />} exact />

                {/* Routes without tabs */}
                <Route
                    exact 
                    path={[
                        '/ride', 
                        '/ride/home', 
                        '/ride/pickup', 
                        '/ride/dropoff', 
                        '/ride/pickup/set-pin', 
                        '/ride/dropoff/set-pin', 
                        '/ride/select'
                    ]} 
                    render={() => <MapProvider>
                        <RideScreen />
                    </MapProvider>} />

                {/* Not Found Route */}
                <Route component={NotFound} />
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>



);

export default App;
