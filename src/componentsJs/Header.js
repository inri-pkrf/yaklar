import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCss/Header.css';
import Hamburger from './Hamburger';
import Navbar from './Navbar';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className="header">
            <img
                src={process.env.PUBLIC_URL + '/assests/imgs/collegeLogoText.png'}
                className="collegeLogoText"
                alt="collegeLogoText"
                onClick={() => navigate('/home')}
            />

            {/* המשולש */}
          {(!isMobile && location.pathname !== '/IntroText') || isMobile ? (
    <img
        src={process.env.PUBLIC_URL + '/assests/imgs/orangeTriangle.png'}
        alt="orangeTriangle"
        className="orangeTriangle"
    />
) : null}

            {/* Navbar / Hamburger */}
            {location.pathname !== '/IntroText' && (
                isMobile ? (
                    <Hamburger />
                ) : (
                    <div className="div-navbar">
                        <Navbar />
                    </div>
                )
            )}
        </header>
    );
}

export default Header;
