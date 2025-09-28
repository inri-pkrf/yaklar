import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/IntroText.css';

function IntroText() {
    const navigate = useNavigate();
    const [showIntroDiv, setShowIntroDiv] = useState();


    // const handleResizeIntroText = () => {
    //     if (window.innerWidth >= 769) {
    //         setShowIntroDiv(true);
    //     } else {
    //         setShowIntroDiv(false);
    //     }
    // }

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
בעזרת מוצר זה תוכלו ללמוד על תפקיד מש"ק ההתנדבות, התהליך המבצעי מיצוי היכולות במרחב האזרחי, השימוש במערכת המרס"ל וכלים נוספים בהם ניתן לקדם את תחום ההתנדבות ברשות המקומית. 
                        <br /><br />
התוכן מיועד לבעלי התפקידים ביקל"ר ונגיש לכל מי שרוצה ללמוד לעומק על משימות מש"ק ההתנדבות בשעת חירום.
                        <br /><br />
בסיום לומדה זו תבינו לעומק את תפקידי מש"ק ההתנדבות ביקל"ר ונוכל לתאם ציפיות לתפקוד מיטבי בחירום. ובשגרה 
                    </div>

                    <div className='about-div'>
                        {/* <img src={process.env.PUBLIC_URL + '/assests/imgs/twoLogos.png'} className="homePageLogos" alt="homePageLogos"></img>
                        <div className="subtitle">
                        עזר זה מוגש בזכות שיתוף פעולה בין  ענף התנהגות במחלקת אוכלוסייה ובין המכללה הלאומית לאיתנות ישראלית. 
                        </div>
                        <div className='date'> מרץ 2025 </div> */}
                        <div className='mashov-home'>
                            <div className='mashovText'>
                                <br /> יש הערות על הממשק? יש מחמאות? מלאו את השאלון וצרו איתנו קשר
                                <br /> <a id='linkHome' href="https://forms.gle/EZPKDWebUQoBL93M9" target="_blank" rel="noopener noreferrer">
                                    בקישור הבא
                                </a>
                            </div>
                        </div>
                    </div>

                </div>


                <div className='btn-start' onClick={() => navigate('/home')}>קדימה, מתחילים!</div>


            </div>

            <div className='marginBottom'></div>


        </div>
    );
}

export default IntroText;