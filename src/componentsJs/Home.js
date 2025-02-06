import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/Home.css';


function Home() {
    const navigate = useNavigate();
    return (

        <div className="Home">

            <div className="title">
                לומדת
                <br />
                מש"ק התנדבות ביקל"ר
            </div >

            <div className="home-text">
                יש ללחוץ ולעבור על התוכן בכל קופסא בכדי להעשיר את ארגז הכלים שלכם לפעולה. יש להתקדם לפי הסדר כדי לחשוף את התכנים.
                <br /><br />
                בסיום כל נושא נשאל כמה שאלות הבנה שחובה לענות עליהן כדי להתקדם. זה יעזור לנו ולכם להבין שכולנו בכיוון הנכון.
            </div>

            <div className="flexBox">

                {[...Array(4)].map((_, index) => (
                    <img
                        key={index}
                        src={process.env.PUBLIC_URL + '/assests/imgs/boxClose.png'}
                        className="boxClose"
                        alt="boxClose"
                    />
                ))}
            </div>

            {/* <div className="flexBox">
                <img src={process.env.PUBLIC_URL + '/assests/imgs/boxClose.png'} className="boxClose" alt="boxClose" />
            </div> */}


        </div>
    )
}


export default Home;