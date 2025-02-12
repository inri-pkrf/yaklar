import React, { useState } from 'react';
import '../componentsCss/Roles.css';
import RolesData from "../data/RolesData";

function Roles() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentRole = RolesData[currentIndex];

    // Handle Next Click
    const handleNext = () => {
        if (currentIndex < RolesData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Handle Previous Click
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="Roles">
            <div className="title1">תפקידי מש"ק התנדבות ביקל"ר</div>
            
            <div className="text-continer-body">
                <div className='title-div-body'></div>
                <img src={currentRole.logoSrc} className="logos" alt="logos" />
                <div className="title2">{currentRole.title}</div>
                <div className='text-div-body'>{currentRole.text}</div>

                <div className='btns-div'>
                    <div className='btn-next-div' onClick={handleNext}>
                        <div className='btns-text' id='btn-next-text'>הבא</div>
                        <img src={process.env.PUBLIC_URL + '/assests/imgs/right.png'} className="btns" id="btn-next-img" alt="btn-next" />
                    </div>

                    <div className='btn-prev-div' onClick={handlePrev}>
                        <div className='btns-text' id='btn-prev-text'>הקודם</div>
                        <img src={process.env.PUBLIC_URL + '/assests/imgs/right.png'} className="btns" id="btn-prev-img" alt="btn-prev" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roles;
