// src/GeolocationComponent.tsx
import React, { useState } from 'react';

interface Position {
    lat: number | null;
    lng: number | null;
}

const GeolocationComponent: React.FC = () => {
    const [position, setPosition] = useState<Position>({ lat: null, lng: null });
    const [now, setNow] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            console.log('getting new location');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setNow(new Date());
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div>
            <button onClick={getLocation}>Click For Location</button>
            {position.lat !== null && position.lng !== null ? (
                <p>
                    Latitude: {position.lat}, Longitude: {position.lng} , at: {now.toISOString()}
                </p>
            ) : (
                <p>No position available</p>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default GeolocationComponent;