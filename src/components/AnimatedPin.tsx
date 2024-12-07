import React, { useEffect, useState } from 'react';

const AnimatedPin = ({ animatePin }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleEvent = () => {
        // Trigger the animation
        setIsAnimating(true);
        // Reset the animation state after 300ms
        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    useEffect(() => {
        setIsAnimating(animatePin)
    }, [animatePin])

    return (
        <div className="pin-container" onClick={handleEvent}>
            <div className={`pin-wrapper ${isAnimating ? 'move-up' : ''}`}>
                <div className="pin-head">
                    <div className="pin-circle">
                        <div className="inner-circle"></div>
                    </div>
                </div>
                <div className="pin-stem"></div>
            </div>
            <div className={`pin-indicator ${isAnimating ? 'pin-indicator-show' : ''}`}>
                <div className="indicator-dot"></div>
            </div>
        </div>
    );
};

export default AnimatedPin;
