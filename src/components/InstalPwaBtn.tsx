import { IonAlert, IonButton, IonIcon, useIonAlert } from '@ionic/react';
import { cloudDownloadOutline, cloudDownloadSharp, download } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react'

const InstallPwaBtn = () => {
    const [presentAlert] = useIonAlert();
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    useEffect(() => {

        const handler = (e) => {
            e.preventDefault();
            setSupportsPWA(true);
            setDeferredPrompt(e);
            return false;
        }

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);

    }, [deferredPrompt])


    const iosMsg = `To install this app on your iOS device, tap the share button 
        <span role='img' aria-label='share icon'> {' '} ⎋{' '} </span> and then "Add to Home Screen" <span role='img' aria-label='plus icon'>{' '}➕{' '}</span>.</p>`;

    const install = (event) => {
        if (isIOS) {
            presentAlert({
                header: 'Istall App',
                message: iosMsg,
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                },{
                    text: 'I undrstood',
                    role: 'confirm',
                }],
            })
        } else {
            if (deferredPrompt !== undefined) {
                deferredPrompt.prompt();
            }
            // Follow what the user has done with the prompt.
            deferredPrompt.userChoice.then(function (choiceResult) {

                console.log(choiceResult.outcome);

                if (choiceResult.outcome == 'dismissed') {
                    console.log('User cancelled home screen install');
                }
                else {
                    console.log('User added to home screen');
                }

                // We no longer need the prompt.  Clear it up.
                setDeferredPrompt(null)
            });
            // presentAlert({
            //     header: 'Istall App',
            //     message: "Add to home screen",
            //     buttons: [{
            //         text: 'Cancel',
            //         role: 'cancel',
            //         handler: () => {
            //             console.log('Alert canceled');
            //         },
            //     },
            //     {
            //         text: 'Add to Home Screen',
            //         role: 'confirm',
            //         handler: () => {
            //             // The user has had a postive interaction with our app and Chrome
            //             // has tried to prompt previously, so let's show the prompt.

            //             if (deferredPrompt !== undefined) {
            //                 deferredPrompt.prompt();
            //             }
            //             // Follow what the user has done with the prompt.
            //             deferredPrompt.userChoice.then(function (choiceResult) {

            //                 console.log(choiceResult.outcome);

            //                 if (choiceResult.outcome == 'dismissed') {
            //                     console.log('User cancelled home screen install');
            //                 }
            //                 else {
            //                     console.log('User added to home screen');
            //                 }

            //                 // We no longer need the prompt.  Clear it up.
            //                 setDeferredPrompt(null)
            //             });

            //         },
            //     }]
            // })
        }


    }

    if (isStandalone) {
        return null // Don't show install button if already installed
    }

    return <IonButton slot='end'  fill="clear" onClick={install}>
        <IonIcon icon={cloudDownloadOutline} />
    </IonButton>
}

export default InstallPwaBtn
