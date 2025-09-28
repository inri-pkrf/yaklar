import React, { useState, useEffect } from 'react';
import '../componentsCss/TableCards.css';
import PopUp from './PopUp';

function TableCards({ onComplete }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [readItems, setReadItems] = useState([]);

    const CardsItems = ["מטרת המופע", "משתתפים", "אחריות, הובלה ומיקום", "תוצרי המופע", "מהלך המופע"];

    const popUpTextCard = [
        <>התאמת המענים אל מול צרכי הרשות וביחס לתרחישי הייחוס השונים בתיאום עם הגופים אשר מהווים מכפיל כוח עבור הרשות בחירום.</>,
        <>
            קנ“ר ורמ“ד רשויות, מנהלי המכלולים ברשות, מנהלי מחוזות משרדי ממשלה (רווחה + חינוך)/ מפקחים מחוזיים, מנהל אגף הנוער ברשות, מנהל ההתנדבות מ‘ החינוך (אם אינו בתקן), ארגוני מגזר שלישי ברשות, נציגי מגזר שני ברשות נציג מוביל מכל ארגון, נציגי מכינות קדם צביאות (אם קיימות בגזרת הרשות), נציגי השכלה גבוהה בגזרת הרשות, מובילי דעת קהל.
            <br />
            <br />
            *בהתאם למשאבים והשותפים הקיימים בכל רשות מקומית.
        </>,
        <ul>
            <li>בראשות: ראש הרשות/ מנכ“ל</li>
            <li>מיקום : מבנה רשותי</li>
            <li>שעות : כשעתיים</li>
            <li>אחריות הכנת המופע : קב"ט ורכז ההתנדבות הרשותי בשיתוף הקנ"ר
            </li>
            <li>תדירות : עד חודש טרם אימון/ ביקורת
                רשותית, פעם בשנה
            </li>
        </ul>,
        <ul>
            <li>העמקת ההכרות בין כלל הגופים
            </li>
            <li>חיזוק שיתוף הפעולה בין המחוז, רכז ההתנדבות והארגונים הפועלים בגזרת הרשות.
            </li>
            <li>סנכרון הפעילות בחירום.
            </li>
            <li>התאמת הצורך אל מול המענה הקיים.
            </li>
        </ul>,
        <ul>
            <li>פתיחה של ראש הרשות/ מנכ“ל - 15 דקות.
            </li>
            <li>סקירת תרחישי הייחוס השונים (פקע“ר) - 30 דקות.
            </li>
            <li>הצגת יכולות הרשות (קב"ט) - 30 דקות.
            </li>
            <li>סבב יכולות ומענים של כלל הפורום - 30 עד 50 דקות.
            </li>
            <li>מיפוי הצרכים והגדרת מסמך מסדר לשיתוף פעולה אל מול התרחישים השונים - 20 דקות.
            </li>
            <li>סיכום ונקודות להמשך שיח פרטני (ראש הרשות) - 10 דקות.
            </li>
        </ul>,
    ];

    // טעינת ההתקדמות מה-sessionStorage
    useEffect(() => {
        const storedReadItems = JSON.parse(sessionStorage.getItem('readItemsTableCards')) || [];
        setReadItems(storedReadItems);

        if (storedReadItems.length === CardsItems.length) {
            // מסמן סיום שולחן עגול
            if (typeof onComplete === 'function') onComplete();
        }
    }, []);

    const handleClose = () => {
        if (selectedItem !== null && !readItems.includes(selectedItem)) {
            const updatedReadItems = [...readItems, selectedItem];
            setReadItems(updatedReadItems);
            sessionStorage.setItem('readItemsTableCards', JSON.stringify(updatedReadItems)); // ✅ עדכון ל-sessionStorage

            if (updatedReadItems.length === CardsItems.length) {
                onComplete();
            }
        }
        setSelectedItem(null);
    };

    return (
        <div className="TableCards">
            <div className='text-table'>
                יש ללחוץ על הכרטיסיות כדי ללמוד על המופע ׳שולחן עגול׳ ברשות המקומית
            </div>

            <div className='cards-container'>
                {CardsItems.map((item, index) => {
                    const isRead = readItems.includes(index);
                    const isNext = !readItems.includes(index) && (index === 0 || readItems.includes(index - 1));

                    const canClick = isRead || isNext;

                    return (
                        <div key={index} className='card-item-wrapper'>
                            <div
                                className={`card-item 
                        ${isRead ? 'readDivCard' : ''} 
                        ${!canClick ? 'disabledCard' : ''}
                    `}
                                onClick={() => canClick ? setSelectedItem(index) : null}
                            >
                                {item}
                            </div>
                        </div>
                    )
                })}
            </div>



            <img
                src={process.env.PUBLIC_URL + '/assests/imgs/table.png'}
                className="table"
                alt="table"
            />

            {selectedItem !== null && (
                <PopUp
                    title={CardsItems[selectedItem]}
                    content={popUpTextCard[selectedItem]}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}

export default TableCards;
