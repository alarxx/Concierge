import React from "react";

export default function FlightTrackerMap({ id, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                <p>Id: {id}</p>
                <iframe scrolling="no" src={`https://flighttrack.tavtechnologies.aero/flight_track?flight=${id}`}></iframe>

            </div>
        </div>
    );
}