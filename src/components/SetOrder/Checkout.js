import React from 'react';
import {useParams} from "react-router-dom";

const Checkout = () => {
    const {vehicleID, startTime, endTime} = useParams();
    return (
        <div>
            <h1>Checkout</h1>
            <p>vehicleID: {vehicleID}</p>
            <p>startTime: {startTime}</p>
            <p>endTime: {endTime}</p>
        </div>
    )
};

export default Checkout;
