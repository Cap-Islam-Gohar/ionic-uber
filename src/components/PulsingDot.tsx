import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMap } from 'react-map-gl';

const PulsingDot = ({ mapRef, id = 'pulsing-dot', size = 200 }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = useMap();

    // Define the pulsing dot object
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
        canvasRef.current = canvas; // Keep a reference to the canvas
      },

      render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        context.clearRect(0, 0, this.width, this.height);

        // Outer circle
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
        context.fill();

        // Inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update image data
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        map.triggerRepaint();

        return true;
      },
    };

    // Add the pulsing dot image to the map
    map.addImage(id, pulsingDot, { pixelRatio: 2 });

    // Cleanup
    return () => {
      if (map.hasImage(id)) {
        map.removeImage(id);
      }
    };
  }, [mapRef, id, size]);

  return null; // This component only adds the pulsing dot to the map, no visual UI needed
};

export default PulsingDot;
