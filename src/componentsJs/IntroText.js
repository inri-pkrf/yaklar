import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/IntroText.css';

function IntroText() {
    const navigate = useNavigate();

    return (
        <div className="IntroText">
            <div className="intro-continer">
                <div className="title-intro">
                    ברוכים הבאים והבאות ללומדה
                    <br />
                    למש"קי ההתנדבות ביקל"ר
                </div>

                <div className='text-intro-div'>
                    <div className='title-div'></div>

                    <div className="text-intro">
                        בעזרת מוצר זה תוכלו ללמוד על מיצוי היכולות במרחב האזרחי, כדי לספק מענה מקיף ומהיר לפערים העולים מהרשות המקומית שלך.
                        <br /><br />
                        התוכן מיועד לאנשי פיקוד העורף ביקל"ר ונגיש לכל מי שרוצה ללמוד לעומק על משימות היקל"ר בשעת חירום.
                        <br /><br />
                        בסיום לומדה זו תבינו לעומק את תפקידי מש"ק ההתנדבות ביקל"ר ולתאם ציפיות לתפקוד מיטבי בחירום ובשגרה
                        <br /><br />
                        בסיום לומדה זו תבינו לעומק את תפקידי מש"ק ההתנדבות ביקל"ר ולתאם ציפיות לתפקוד מיטבי בחירום ובשגרה
                    </div>

                    <div className='about-div'>
                        <img src={process.env.PUBLIC_URL + '/assests/imgs/twoLogos.png'} className="homePageLogos" alt="homePageLogos"></img>
                        <div className="subtitle">
                        עזר זה מוגש בזכות שיתוף פעולה בין  ענף התנהגות במחלקת אוכלוסייה ובין המכללה הלאומית לאיתנות ישראלית. 
                        </div>
                        <div className='date'> מרץ 2025 </div>
                        <div className='mashov-home'>
                            <div className='mashovText'>
                                <br /> יש הערות על הממשק? יש מחמאות? מלאו את השאלון וצרו איתנו קשר
                                <br /> <a id='linkHome' href="https://docs.google.com/forms/d/e/1FAIpQLSeAunPlSFfKmqyZhnCQkf8jsxTPsLjr8-vKES_V3UDqqDSFoA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                                    בקישור הבא
                                </a>
                            </div>
                        </div>
                    </div>

                </div>


                <div className='btn-start' onClick={() => navigate('/Home')}>קדימה, מתחילים!</div>


            </div>

            <div className='marginBottom'></div>


        </div>
    );
}

export default IntroText;