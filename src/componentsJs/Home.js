import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/Home.css';

function Home() {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState([false, false, false, false]);
    const isDesktop = window.innerWidth >= 1025;

    // בודק אם הסימולציה פתוחה לפי ה-progress או sessionStorage
    const simulationUnlocked = completed.every(c => c === true) || sessionStorage.getItem('simulationCompleted') === 'true';

    const [simulationCompleted, setSimulationCompleted] = useState(false);

    useEffect(() => {
        setSimulationCompleted(sessionStorage.getItem('simulationCompleted') === 'true');
    }, []);

    // Load the completion state from sessionStorage
    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem('progressData')) || {};
        const completedArray = [
            stored[0]?.diagramCompleted || false,
            stored[1]?.diagramCompleted || false,
            stored[2]?.diagramCompleted || false,
            stored[3]?.diagramCompleted || false
        ];
        setCompleted(completedArray);
    }, []);

    const navArray = ["/abilities", "/roles", "/table", "/marsel"];

    // מגדירים מערך של קופסאות עם תמונות נפרדות לכל קופסא
    const boxes = [
        {
            text: "מיצוי יכולות",
            openImg: '/assests/imgs/boxes/open/Oabilities.png',
            closeImg: '/assests/imgs/boxes/close/Cabilities.png',
            nav: "/abilities"
        },
        {
            text: "תפקידים",
            openImg: '/assests/imgs/boxes/open/Oroles.png',
            closeImg: '/assests/imgs/boxes/close/Croles.png',
            nav: "/roles"
        },
        {
            text: "שולחן עגול וועדת התנדבות",
            openImg: '/assests/imgs/boxes/open/Otable.png',
            closeImg: '/assests/imgs/boxes/close/Ctable.png',
            nav: "/table"
        },
        {
            text: "מרס\"ל",
            openImg: '/assests/imgs/boxes/open/Omarsel.png',
            closeImg: '/assests/imgs/boxes/close/Cmarsel.png',
            nav: "/marsel"
        }
    ];

    return (
        <div className="Home">
            <div className="title">
                לומדת
                מש"ק התנדבות ביקל"ר
            </div>


            <div className="home-text">
                יש ללחוץ ולעבור על התוכן בכל קופסא בכדי להעשיר את ארגז הכלים שלכם לפעולה. יש להתקדם לפי הסדר כדי לחשוף את התכנים.
                <br /><br />
                בסיום כל נושא תישאל שאלת הבנה שחובה לענות עליה כדי להתקדם - זה יעזור לנו ולכם להבין שכולנו בכיוון הנכון.
            </div>

            <div className="flexBox-boxes">
                {boxes.map((box, index) => (
                    <div
                        key={index}
                        className="boxContainer"
                        onClick={() => navigate(box.nav)}
                    >
                        <img
                            src={completed[index] ? process.env.PUBLIC_URL + box.openImg : process.env.PUBLIC_URL + box.closeImg}
                            className={completed[index] ? "boxOpen" : "boxClose"}
                            alt={box.text}
                        />
                    </div>
                ))}
            </div>


            {/* קופסת סימולציה */}
            <div
                onClick={() => {
                    const savedState = JSON.parse(sessionStorage.getItem('simulationState'));
                    if (savedState && savedState.name && savedState.municipality) {
                        navigate('/simulation');
                    } else if (simulationUnlocked) {
                        navigate('/simulation');
                    }
                }}
                style={{
                    pointerEvents: simulationUnlocked ? 'auto' : 'none',
                    opacity: simulationUnlocked ? 1 : 0.4,
                    cursor: simulationUnlocked ? 'pointer' : 'default'
                }}
            >
                <img
                    src={process.env.PUBLIC_URL + (simulationCompleted
                        ? '/assests/imgs/SboxOpen.png'
                        : '/assests/imgs/SboxClose.png')}
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
