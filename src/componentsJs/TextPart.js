import React from 'react';
import '../componentsCss/TextPart.css';
import TextData from "../data/TextData";


function TextPart({ name }) {

    return (
        <div className="TextPart">
            <div id='first-text' className='side1-text'>
                 שלום {name} ! אני הבוט שלך והיום נשאל כמה שאלות....
            </div>
            <div className='side1-text'></div>
            <div className='side2-text'></div>
        </div>
    );
}

export default TextPart;

