// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { useWeb3 } from '@/contexts/useWeb3';

interface Position {
    lat: number | null;
    lng: number | null;
}

export function FootPrintButton() {
    const { address, getUserAddress, getUserInfo, submitRecordingToContract } = useWeb3();

    const [position, setPosition] = useState<Position>({ lat: null, lng: null });
    const [now, setNow] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [locations, setLocations] = useState<Position[]>([]);
    const [distance, setDistance] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [duration, setDuration] = useState(0);
    const [transportType, setTransportType] = useState<number | null>(null);
    const [showTransportPopup, setShowTransportPopup] = useState(false);
    const [showResultPopup, setShowResultPopup] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [points, setPoints] = useState<number | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    useEffect(() => {
        getUserAddress();
    }, [getUserAddress]);

    useEffect(() => {
        const fetchData = async () => {
            if (address) {
                try {
                    const info = await getUserInfo(address);
                    setPoints(Number(info.points));
                    setUserInfo(info);
                    setIsRegistered(true);
                } catch (error) {
                    console.log("User is not registered");
                    setIsRegistered(false);
                }
            }
        };

        fetchData();
    }, [address, getUserInfo]);

    const getLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setPosition(newPosition);
                    setNow(new Date());

                    if (isRecording) {
                        setLocations((prev) => {
                            const updatedLocations = [...prev, newPosition];
                            if (updatedLocations.length > 1) {
                                const lastLocation = updatedLocations[updatedLocations.length - 2];
                                const newDistance = calculateDistance(lastLocation, newPosition);
                                setDistance((prev) => prev + newDistance);
                            }
                            return updatedLocations;
                        });
                    }
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, [isRecording]);

    const calculateDistance = (loc1: Position, loc2: Position) => {
        const R = 6371e3;
        const lat1 = (loc1.lat! * Math.PI) / 180;
        const lat2 = (loc2.lat! * Math.PI) / 180;
        const deltaLat = ((loc2.lat! - loc1.lat!) * Math.PI) / 180;
        const deltaLon = ((loc2.lng! - loc1.lng!) * Math.PI) / 180;

        const a =
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    const submitRecording = async () => {
        if (transportType === null) {
            alert('Please select a transport type.');
            return;
        }

        try {
            setShowResultPopup(true);
            await submitRecordingToContract(distance, duration, transportType, points);
        } catch (error) {
            console.error('Error submitting recording:', error);
        }
    };

    const toggleRecording = () => {
        setIsRecording((prev) => !prev);
        if (!isRecording) {
            setStartTime(Date.now());
            setLocations([]);
            setDistance(0);
            setDuration(0);
            setTransportType(null);
        } else {
            setDuration(Math.floor((Date.now() - startTime!) / 1000));
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            getLocation();
            interval = setInterval(getLocation, 5000);
        }
        return () => clearInterval(interval);
    }, [isRecording, getLocation]);

    const handleStopRecording = () => {
        setIsRecording(false);
        setShowTransportPopup(true);
        setDuration(Math.floor((Date.now() - startTime!) / 1000));
    };

    return (
        <div>
            <Button
                variant={isRecording ? 'contained' : 'contained'}
                color={isRecording ? 'error' : 'success'}
                onClick={isRecording ? handleStopRecording : toggleRecording}
                style={{ width: 'fill', height: '40px' }}
                className='bg-[#A5D6BF] text-white items-center w-[411px]'
            >
                {isRecording ? 'Stop Recording' : 'Record your footprint'}
            </Button>
            {position.lat !== null && position.lng !== null ? (
                <p>
                    Latitude: {position.lat}, Longitude: {position.lng}, at: {now.toISOString()}
                </p>
            ) : (
                <p>No position available</p>
            )}
            {error && <p>Error: {error}</p>}
            <h3>Distance: {distance.toFixed(2)} meters</h3>
            <h3>Duration: {duration} seconds</h3>
            <Dialog open={showTransportPopup} onClose={() => setShowTransportPopup(false)}>
                <DialogTitle>Select Transport Type</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Transport Type</InputLabel>
                        <Select
                            value={transportType || ''}
                            onChange={(e) => setTransportType(Number(e.target.value))}
                        >
                            <MenuItem value={1}>Walking</MenuItem>
                            <MenuItem value={2}>Car transport</MenuItem>
                            <MenuItem value={3}>Subway</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setShowTransportPopup(false);
                            submitRecording();
                        }}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setShowTransportPopup(false)}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showResultPopup} onClose={() => setShowResultPopup(false)}>
                <DialogTitle>Your Journey</DialogTitle>
                <DialogContent>
                    <p>Congratulations! You traveled {distance.toFixed(2)} meters in {duration} seconds.</p>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowResultPopup(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
