import { IonAlert, IonButton, IonIcon, useIonAlert } from '@ionic/react';
import { cloudDownloadOutline, cloudDownloadSharp, download } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react'


let deferredPrompt;



const InstallPwaBtn = () => {

    const [isIOS, setIsIOS] = useState(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);
    const [isStandalone, setIsStandalone] = useState(window.matchMedia('(display-mode: standalone)').matches);

    const [presentAlert] = useIonAlert();
    const [installable, setInstallable] = useState(false);


    useEffect(() => {

        const handlePrompt = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI notify the user they can install the PWA
            setInstallable(true);
        }

        window.addEventListener('beforeinstallprompt', handlePrompt)
        window.addEventListener('appinstalled', (e) => {
            // Log install to analytics
            console.log('INSTALL: Success');    
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handlePrompt)
            window.removeEventListener('appinstalled', handlePrompt)
        }

    }, [])



    // const iosMsg = `To install this app on your iOS device, tap the share button <span role='img' aria-label='share icon'> {' '} ⎋{' '} </span> and then "Add to Home Screen" <span role='img' aria-label='plus icon'>{' '}➕{' '}</span>.</p>`;
    const iosMsg = `Just tab 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 50 50"><path d="M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z"/><path d="M24 7h2v21h-2z"/><path d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z"/></svg>
                then "Add to Home Screen"`


    const handleInstallClick = (e) => {
        
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                setIsStandalone(true);
            } else {
                console.log('User dismissed the install prompt');
                // Hide the app provided install promotion
                setInstallable(false); 
            }
        });
    };


    const onClick = (event) => {
        if (isIOS) {
            presentAlert({
                header: 'Istall App',
                message: iosMsg,
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'I undrstood',
                    role: 'confirm',
                }],
            })
        } else {
            handleInstallClick(event)
        }


    }

    if (isStandalone) {
        return null // Don't show install button if already installed
    }

    return <IonButton slot='end' fill='clear' style={{paddingRight: 4}} onClick={onClick}>
         Install
    </IonButton>
}

export default InstallPwaBtn
