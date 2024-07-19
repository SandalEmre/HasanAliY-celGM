import React from 'react';
import atakumLogo from '../assets/images/atakum.png'; // Logo resmi
import '../assets/css/LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="logo">
                <div className="front">
                    <img src={atakumLogo} alt="Logo" />
                </div>
                <div className="back">
                    <img src={atakumLogo} alt="Logo" />
                </div>
            </div>
        </div>
    );
}

export default LoadingSpinner;
