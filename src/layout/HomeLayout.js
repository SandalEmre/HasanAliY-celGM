import React from 'react';
import BoostNavbar from '../components/BoostNavbar';
import Footer from "../components/Footer";
import LoadingSpinner from '../components/LoadingSpinner';
import '../index.css';

const HomeLayout = ({ children, isRegisterPage, isLoading, hideNavbarAndFooter }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {!hideNavbarAndFooter && <BoostNavbar />}
            <div className="flex-grow">
                {isLoading ? <LoadingSpinner /> : children}
            </div>
            {!hideNavbarAndFooter && <Footer />}
        </div>
    );
}

export default HomeLayout;