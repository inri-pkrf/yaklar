import React, { useState } from 'react';
import '../componentsCss/Simulation.css';

function Simulation() {
    const [name, setName] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [introFinished, setIntroFinished] = useState(false); 

    const municipalities = [
        "תל אביב",
        "ירושלים",
        "חיפה",
        "באר שבע",
        "אשדוד",
        "פתח תקווה"
    ];

    const handleStart = () => {
        if (!name && !municipality) {
            setErrorMessage("עליך למלא את שני השדות על מנת להמשיך");
        } else if (!name) {
            setErrorMessage("עליך למלא את שמך על מנת להמשיך");
        } else if (!municipality) {
            setErrorMessage("עליך לבחור את הרשות עליה את/ה משתייכ/ת על מנת להמשיך");
        } else {
            setErrorMessage(""); 
            setIntroFinished(true); // מסמן שה-intro הסתיים
        }
    };

    if (introFinished) {
        return <div>🎉 התחלת את הסימולציה! (פה תמשיך הסימולציה)</div>;
    }

    return (
        <div className="Simulation">
            <div className='intro-Simulation'>
                <img
                    src={process.env.PUBLIC_URL + '/assests/imgs/logos/touch (1).png'}
                    className="touch-logo"
                    alt="touch-logo"
                />
                <div className="title1">סימולציה</div>
                <div className="text-continer-body">
                    <div className='title-div-body'></div>
                    <div className='into-text-Simulation'>
                        את/ה מש"ק התנדבות ביקל"ר ברשות המקומית. בחלק מתהליך מבצעי שנקרא מיצוי יכולות המרחב האזרחי, אנו נדרשים לחזק את הרשות המקומית במתן פתרונות על בסיס משאבי הקהילה.
                        <br /><br />
                        במהלך המלחמה התקבלו דרישות רבות בעקבות פערים ברשות המקומית.
                        בהערכת המצב הנחה ראש הרשות לגייס כוח אדם להשלמת פערי מהנדסים ברשות למכלול הנדסה.

                        <div className='form-Simulation'>
                            <div className="form-row">
                                <label className="form-label">כתוב את שמך:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="הכנס את שמך כאן"
                                />
                            </div>

                            <div className="form-row">
                                <label className="form-label">הכנס/י את שם הרשות עליה את/ה משוייכ/ת:</label>
                                <select
                                    className="form-select"
                                    value={municipality}
                                    onChange={(e) => setMunicipality(e.target.value)}
                                >
                                    <option value="">בחר רשות</option>
                                    {municipalities.map((city, index) => (
                                        <option key={index} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>

                            {errorMessage && <div className="error-message">{errorMessage}</div>}

                            <div className='btn-start-Simulation' onClick={handleStart}>
                                קדימה, מתחילים!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Simulation;
