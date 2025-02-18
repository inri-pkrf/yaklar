import React from 'react';
import '../componentsCss/PopUp.css';

function PopUp({ title, content, onClose }) {
    return (
        <div className="PopUp">
            <div className="popup-overlay">
                <div className="popup-content">
                    <button className="popup-close-button" onClick={onClose}>
                        <img 
                            src={process.env.PUBLIC_URL + '/assests/imgs/remove.png'} 
                            alt="Close" 
                            className="XBtn" 
                        />
                    </button>
                    <h2 className="popup-title">{title}</h2>
                    <div className="popup-body">
                        <div className="popup-body-text">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUp;
