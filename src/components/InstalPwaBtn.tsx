import React, { useEffect, useRef, useState } from 'react'

const InstallPwaBtn = () => {
    const [isStandalone, setIsStandalone] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        )

        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

        const handler = (e) => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setPromptInstall(e);
        }

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);

    }, [])

    const install = (event) => {
        event.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    }

    if (isStandalone) {
        return null // Don't show install button if already installed
    }

    return (<>
        <div>
            <h3>Install App</h3>
            <button onClick={install}>Add to Home Screen</button>
            {/* {isIOS && ( */}
            <p>
                To install this app on your iOS device, tap the share button
                <span role='img' aria-label='share icon'>
                    {' '}
                    ⎋{' '}
                </span>
                and then "Add to Home Screen"
                <span role='img' aria-label='plus icon'>
                    {' '}
                    ➕{' '}
                </span>
                .
            </p>
            {/* )} */}
        </div>
    </>)
}

export default InstallPwaBtn
