import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/Home.css';

function Home() {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState([false, false, false, false]); // Default state

    // Load the completion state from sessionStorage
    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem('progressData')) || {};

        // בודק עבור כל פרק אם diagramCompleted הוא true
        const completedArray = [
            stored[0]?.diagramCompleted || false,
            stored[1]?.diagramCompleted || false,
            stored[2]?.diagramCompleted || false,
            stored[3]?.diagramCompleted || false
        ];

        setCompleted(completedArray);
    }, []);

    const boxTexts = ["יכולות", "תפקידים", "שולחן עגול", "מרס\"ל"];
    const navArray = ["/abilities", "/roles", "/table", "/marsel"];

    // בדיקה אם אפשר לפתוח את הסימולציה
    const simulationUnlocked = completed.every(c => c === true);

    return (
        <div className="Home">
            <div className="title">
                לומדת
                <br />
                מש"ק התנדבות ביקל"ר
            </div>

            <div className="home-text">
                יש ללחוץ ולעבור על התוכן בכל קופסא בכדי להעשיר את ארגז הכלים שלכם לפעולה. יש להתקדם לפי הסדר כדי לחשוף את התכנים.
                <br /><br />
                בסיום כל נושא נשאל כמה שאלות הבנה שחובה לענות עליהן כדי להתקדם. זה יעזור לנו ולכם להבין שכולנו בכיוון הנכון.
            </div>

            <div className="flexBox-boxes">
                {boxTexts.map((text, index) => (
                    <div
                        key={index}
                        className="boxContainer"
                        onClick={() => navigate(navArray[index])}
                    >
                        <img
                            src={completed[index]
                                ? process.env.PUBLIC_URL + '/assests/imgs/boxOpen.png'
                                : process.env.PUBLIC_URL + '/assests/imgs/boxClose.png'}
                            className="boxClose"
                            alt={text}
                        />
                    </div>
                ))}
            </div>

            <div className="flexBox-text">
                {boxTexts.map((text, index) => (
                    <span
                        key={index}
                        className="boxText"
                        onClick={() => navigate(navArray[index])}
                        style={text === "שולחן עגול" ? { width: "8vh", position: "relative", bottom: "2vh", left: "-3vw" } : {}}
                    >
                        {text}
                    </span>
                ))}
            </div>

            {/* קופסת סימולציה */}
            <div
                onClick={() => simulationUnlocked && navigate('/simulation')}
                style={{
                    pointerEvents: simulationUnlocked ? 'auto' : 'none', // אם לא פתוחה אי אפשר ללחוץ
                    opacity: simulationUnlocked ? 1 : 0.4, // אפקט "חשוך"
                    cursor: simulationUnlocked ? 'pointer' : 'default'
                }}
            >
                <img
                    src={process.env.PUBLIC_URL + '/assests/imgs/SboxClose.png'}
                    className="SboxClose"
                    alt="Sbox"
                />
                <span className="SboxText">
                    סימולציה
                </span>
            </div>

            <div className='marginBottom'></div>
        </div>
    );
}

export default Home;
