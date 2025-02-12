import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/Home.css';

function Home() {
    const navigate = useNavigate();

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

            <div className="flexBox">
                {boxTexts.map((text, index) => (
                    <div key={index} className="boxContainer"
                        onClick={() => navigate(navArray[index])}
                    >
                        <img
                            src={process.env.PUBLIC_URL + '/assests/imgs/boxClose.png'}
                            className="boxClose"
                            alt="boxClose"
                        />
                        <span
                            className="boxText"
                            style={text === "שולחן עגול" ? { marginTop: "8vh" } : {}}
                        >
                            {text}
                        </span>
                    </div>
                ))}
            </div>
            <img
                src={process.env.PUBLIC_URL + '/assests/imgs/SboxClose.png'}
                className="SboxClose"
                alt="SboxClose"
            />
            <span className="SboxText">
                סימולציה
            </span>

            <div className='marginBottom'></div>

        </div>
    );
}

export default Home;
