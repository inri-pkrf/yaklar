import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/Home.css';

function Home() {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState([false, false, false, false]); // Default state

    // Load the completion state from localStorage
    useEffect(() => {
        const storedCompleted = JSON.parse(localStorage.getItem('completed'));
        if (storedCompleted) {
            setCompleted(storedCompleted); // Set the completed subjects from localStorage
        }
    }, []); // Only run once on component mount

    const boxTexts = ["יכולות", "תפקידים", "שולחן עגול", "מרס\"ל"];
    const navArray = ["/abilities", "/roles", "/table", "/marsel"];

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
                {boxTexts.map((index) => (
                    <div
                        key={index}
                        className="boxContainer"
                        onClick={() => navigate(navArray[index])}
                    >
                        <img
                            src={completed[index] ? process.env.PUBLIC_URL + '/assests/imgs/boxOpen.png' : process.env.PUBLIC_URL + '/assests/imgs/boxClose.png'}
                            className="boxClose"
                            alt="boxClose"
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
                        style={text === "שולחן עגול" ? { width: "8vh" , position: "relative", bottom: "2vh", left: "-3vw" } : {}}
                    >
                        {text}
                    </span>
                ))}
            </div>


            <div onClick={() => navigate('/simulation')}>
                <img
                    src={process.env.PUBLIC_URL + '/assests/imgs/SboxClose.png'}
                    className="SboxClose"
                    alt="SboxClose"
                />
                <span className="SboxText">
                    סימולציה
                </span></div>


            <div className='marginBottom'></div>
        </div>
    );
}

export default Home;
