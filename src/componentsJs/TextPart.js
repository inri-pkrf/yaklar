import React from 'react';
import '../componentsCss/TextPart.css';
import TextData from "../data/TextData";


function TextPart({ name }) {

    return (
        <div className="TextPart">
            <div className='answer-side1'>
                 שלום {name} ! אני הבוט שלך והיום נשאל כמה שאלות....
            </div>
        </div>
    );
}

export default TextPart;

