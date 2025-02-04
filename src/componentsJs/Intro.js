import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/Intro.css';

const Intro = () => {
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const videoEndTimeout = setTimeout(() => {
            setIsVideoEnded(true);
        }, 13000);

        const introTextTimeout = setTimeout(() => {
            setShowIntro(true);
        }, 13050);

        const skipButtonTimeout = setTimeout(() => {
            setShowSkipButton(true);
        }, 3500);

        return () => {
            clearTimeout(videoEndTimeout);
            clearTimeout(introTextTimeout);
            clearTimeout(skipButtonTimeout);
        };
    }, []);

    const skipVideo = () => {
        setIsVideoEnded(true);
        setShowIntro(true);
    };

    const goToIntroText = () => {
        navigate('/IntroText');
    };

    return (
        <div id="intro">
            {!isVideoEnded && (
                <>
                    {showSkipButton && (
                        <button className="skip" onClick={skipVideo}>
                            &lt;&lt; דלג/י
                        </button>
                    )}
                    <video className="video-intro" autoPlay muted playsInline>
                        <source src={`${process.env.PUBLIC_URL}/assests/videos/introVid.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </>
            )}
            {showIntro && (
                <div className="intro-text-slide-in">
                    <img
                        src={`${process.env.PUBLIC_URL}/assests/imgs/whiteLogo.png`}
                        alt="White Logo"
                        id="logo-white"
                        className="move-to-center"
                    />
                    <h1 id="welcome-text-intro">
                        לומדה
                        <br />
                        מש"ק התנדבות
                        <br />
                        ביקל"ר
                    </h1>
                    <img
                        src={`${process.env.PUBLIC_URL}/assests/imgs/whiteArrow.png`}
                        className="hpArrow-intro"
                        alt="Arrow"
                        onClick={goToIntroText}
                    />
                </div>
            )}
        </div>
    );
};

export default Intro;