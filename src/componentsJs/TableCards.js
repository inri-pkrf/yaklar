import React, { useState, useEffect } from 'react';
import '../componentsCss/TableCards.css';
import PopUp from './PopUp';

function TableCards({ onComplete }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [readItems, setReadItems] = useState([]);

    const CardsItems = ["מטרת המופע", "משתתפים", "אחריות, הובלה ומיקום", "תוצרי המופע", "מהלך המופע"];

    const popUpTextCard = [
        <>התאמת הצרכים והמענים של הרשות אל מול תרחישי הייחוס השונים בתיאום עם הגופים אשר מהווים מכפיל כוח עבור הרשות בחירום.</>,
        <>קנ“ר ורמ“ד רשויות מחוז, מנהלי המכלולים ברשות, מנהלי מחוזות משרדי ממשלה רווחה + חינוך / מפקחים מחוזיים, מנהל אגף הנוער ברשות, מנהל ההתנדבות מ‘ החינוך אם אינו בתקן, ארגוני מגזר שלישי ברות נציג מוביל מכל ארגון, נציגי מגזר שני ברשות נציג מוביל מכל ארגון, נציגי מכינות קדם צביאות (אם קיימות בגזרת הרשות), נציגי השכלה גבוהה בגזרת הרשות, מובילי דעת קהל.</>,
        <ul>
            <li>העמקת ההכרות בין כלל הגופים</li>
            <li>שיח ישיר בין המחוז, הארגונים ועמותות מרכזיות ברשות.</li>
            <li>ביסוס יחסי הגומלין ושיתופי פעולה בין מגזריים והרחבת מעגל השותפויות.</li>
            <li>סנכרון הפעילות בחירום</li>
            <li>התאמת הצורך אל מול המענה הקיים</li>
        </ul>,
        <ul>
            <li>פתיחה של ראש הרשות/ מנכ“ל 10-15 דק‘.</li>
            <li>סקירת תרחישי הייחוס השונים (פקע“ר) 20-30 דק‘.</li>
            <li>הצגת יכולות הרשות קב“ט 30 דק‘</li>
            <li>סבב יכולות ומענים של כלל הפורום 30-50 דק‘.</li>
            <li>מיפוי הצרכים והגדרת מסמך מסדר לשיתוף פעולה אל מול התרחישים השונים 20 דק‘.</li>
            <li>סיכום ונקודות להמשך שיח פרטני ראש הרשות 10 דק‘</li>
        </ul>,
        <ul>
            <li>בראשות ראש הרשות/ מנכ“ל</li>
            <li>מיקום : מבנה רשות</li>
            <li>שעות : עד שעתיים מופע</li>
            <li>אחריות הכנת המופע : קב“ט ורכז ההתנדבות בשת“פ קנ“ר</li>
            <li>תדירות : עד חודש טרם אימון / ביקור רשותית פעם בשנה</li>
        </ul>,
    ];

    useEffect(() => {
        const storedReadItems = JSON.parse(localStorage.getItem('readItemsTableCards')) || [];
        setReadItems(storedReadItems);
    }, []);
    
    const handleClose = () => {
        if (selectedItem !== null && !readItems.includes(selectedItem)) {
            const updatedReadItems = [...readItems, selectedItem];
            setReadItems(updatedReadItems);
            localStorage.setItem('readItemsTableCards', JSON.stringify(updatedReadItems)); // ✅ Separate storage key
    
            if (updatedReadItems.length === CardsItems.length) {
                onComplete();
            }
        }
        setSelectedItem(null);
    };

    return (
        <div className="TableCards">
            <div className='text-table'>
                יש ללחוץ על הכרטיסיות כדי לתאם ציפיות וללמוד על מטרות ׳שולחן עגול׳ ברשות המקומית
            </div>

            <div className='cards-container'>
                {CardsItems.map((item, index) => (
                    <div key={index} className='card-item-wrapper'>
                        <div
                            className={`card-item ${readItems.includes(index) ? 'readDivCard' : ''}`}
                            onClick={() => setSelectedItem(index)}
                        >
                            {item}
                        </div>
                    </div>
                ))}
            </div>

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
