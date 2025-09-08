import React, { useState, useEffect } from 'react';
import '../componentsCss/Simulation.css';
import SimulationGame from './SimulationGame'; // Import the new component

function Simulation() {
    const [name, setName] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSimulationGame, setShowSimulationGame] = useState(false); // New state

    useEffect(() => {
        const savedState = JSON.parse(sessionStorage.getItem('simulationState'));
        if (savedState) {
            setShowSimulationGame(true); // דילוג על מסך הפתיחה
            setName(savedState.name);
            setMunicipality(savedState.municipality);
        }
    }, []);

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

        // שמירת מצב ב-sessionStorage כדי לזכור שהסימולציה התחילה
        sessionStorage.setItem('simulationState', JSON.stringify({ name, municipality }));

        setShowSimulationGame(true); // מעבר ל-SimulationGame
    }
};


    if (showSimulationGame) {
        return <SimulationGame name={name} municipality={municipality} />; // Pass data to next component
    }

    return (
        <div className="Simulation">
            <div className='intro-Simulation'>
                <img
                    src={process.env.PUBLIC_URL + '/assests/imgs/logos/touch (1).png'}
                    className="touch-logo"
                    alt="touch-logo"
                />
                <div className="title1-Simulation">סימולציה</div>
                <div className="text-continer-body">
                    <div className='title-div-body'></div>
                    <div className='into-text-Simulation'>
                        את/ה מש"ק התנדבות ביקל"ר ברשות המקומית. בחלק מתהליך מבצעי שנקרא מיצוי יכולות המרחב האזרחי, אנו נדרשים לחזק את הרשות המקומית במתן פתרונות על בסיס משאבי הקהילה.
                        <br /><br />
                        במהלך המלחמה התקבלו דרישות רבות בעקבות פערים ברשות המקומית.
                        בהערכת המצב הנחה ראש הרשות לגייס כוח אדם להשלמת פערי מהנדסים ברשות למכלול הנדסה.

                        <div className='form-Simulation'>
                            <div className="form-row">
                                <label className="form-label">  מה שמך?</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="הכנס את שמך כאן"
                                />
                            </div>

                            <div className="form-row">
                                <label className="form-label">מה הרשות שלך?</label>
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
