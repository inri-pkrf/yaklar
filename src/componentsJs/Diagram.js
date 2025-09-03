import React, { useState, useEffect } from 'react';
import '../componentsCss/Diagram.css';
import PopUp from './PopUp';

function Diagram({ onComplete, chapterIndex = 0 }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [readItems, setReadItems] = useState([]);

    const diagramItems = ["פיקוד", "מחוז", "נפה", "רשות"];
    const popUpText = [
        <ul>
            <li>קבלת הדרישות מהמרס“ל המחוזי ע“ג מערכת המרס“ל.</li>
            <li>ביצוע פורום מיצוי יכולות אל מול המחוזות.</li>
            <li>גיבוש המענה מול משרדי הממשלה ברמה הלאומית.</li>
            <li>גיבוש המענה מול ארגוני התנדבות ברמה הלאומית.</li>
            <li>גיבוש הצורך מול מגזר שני עסקי ומתן מענה ע“י תורמים.</li>
        </ul>,
        <ul>
            <li>קבלת הדרישות מתא רשויות בנפה ע“ג מערכת המרס“ל.</li>
            <li>ביצוע פורום מיצוי יכולות מחוזי אל מול כלל הבקשות.</li>
            <li>גיבוש מענה ודרכי פיתרון למול משרדי הממשלה.</li>
            <li>העלאת הצורך מול ארגוני התנדבות מחוזיים.</li>
            <li>שיח תיאום וסנכרון מול מפקחת מחוזית של משרד הרווחה לקבלת תמ“צ עדכני טרם העברת הבקשה לפיקוד.</li>
        </ul>,
        <ul>
            <li>קבלת הדרישות ממפקד היקל“ר ע“ג מערכת המרס“ל</li>
            <li>גיבוש התיעדוף אל מול כלל הבקשות טרם פורום מיצוי יכולות.</li>
            <li>ביצוע פורום מיצוי יכולות והצגת המגמות והפתרונות.</li>
            <li>תבחן ותגבש מענה נפתי תוך סיוע מרשויות שכנות.</li>
        </ul>,
        <ul>
            <li>מיצוי מערך מתנדבים רשותי בהובלת רכז התנדבות/מחזיק תיק מתנדבים ברשות כחלק מתא משאבי קהילה.</li>
            <li>הפעלת חפ“ק התנדבות רשותי.</li>
            <li>הפעלת ועדי יישובים, ועדי שכונות, ועדי הורים / צח“י במוא“ז.</li>
            <li>הפעלת בני נוער תנועות נוער מתנ“סים ש“ש מכינות קדם צבאיות שירות לאומי.</li>
            <li>הפעלת פעילים קהילתיים, מובילי דעת קהל, מרכזים קהילתיים.</li>
            <li>הפעלת הגיל השלישי, מוסדות השכלה גבוהה.</li>
            <li>הפעלת חוזים נצורים וקשר מול מגזר עסקי ברשות.</li>
        </ul>,
    ];

    // טוען את הסטטוס מה־sessionStorage
  useEffect(() => {
    // טוען סטטוס מה-sessionStorage
    const stored = JSON.parse(sessionStorage.getItem("progressData")) || {};
    const chapterProgress = stored[chapterIndex] || {};
    const alreadyRead = chapterProgress.readItems || [];

    setReadItems(alreadyRead);

    // אם כל הפופ-אפים כבר נקראו, מסמן סיום דיאגרם
    if (alreadyRead.length === diagramItems.length) {
        if (typeof onComplete === 'function') onComplete();
    }
}, [chapterIndex]);

    const saveProgress = (items) => {
        const stored = JSON.parse(sessionStorage.getItem("progressData")) || {};
        stored[chapterIndex] = {
            ...(stored[chapterIndex] || {}),
            readItems: items
        };
        sessionStorage.setItem("progressData", JSON.stringify(stored));

        // אפשר עדיין לקרוא ל-onComplete אם נצפו כל הפופ-אפים
        if (items.length === diagramItems.length && typeof onComplete === 'function') {
            onComplete();
        }
    };

const handleOpen = (index) => {
    setSelectedItem(index);

    const stored = JSON.parse(sessionStorage.getItem("progressData")) || {};
    const chapterProgress = stored[chapterIndex] || {};
    const alreadyRead = chapterProgress.readItems || [];

    if (!alreadyRead.includes(index)) {
        const updated = [...alreadyRead, index];
        stored[chapterIndex] = { ...chapterProgress, readItems: updated };
        sessionStorage.setItem("progressData", JSON.stringify(stored));
        setReadItems(updated);

        console.log("Opened pop-up:", index, "Updated readItems:", updated);
        console.log("sessionStorage now:", JSON.parse(sessionStorage.getItem("progressData")));

        if (updated.length === diagramItems.length && typeof onComplete === 'function') {
            onComplete();
        }
    }
};

    const handleClose = () => {
        setSelectedItem(null);
    };

    return (
        <div className="Diagram">
            <div className='text-diagram'>
                * יש ללחוץ על כל מלבן כדי ללמוד על התהליכים לאורך הציר האורכי. התחל מלמטה למעלה
            </div>

            <div className='diagram-container'>
                <img
                    src={process.env.PUBLIC_URL + '/assests/imgs/marselLogo.png'}
                    className="marselLogo"
                    alt="marselLogo"
                />
                {diagramItems.map((item, index) => (
                    <div key={index} className='diagram-item-wrapper'>
                        <div
                            className={`diagram-item ${readItems.includes(index) ? 'readDiv' : ''}`}
                            onClick={() => handleOpen(index)}
                        >
                            {item}
                        </div>
                        {index !== diagramItems.length - 1 && (
                            <img
                                src={process.env.PUBLIC_URL + '/assests/imgs/up-arrow.png'}
                                className="up-arrow"
                                alt="up-arrow"
                            />
                        )}
                    </div>
                ))}
            </div>

            {selectedItem !== null && (
                <PopUp
                    title={diagramItems[selectedItem]}
                    content={popUpText[selectedItem]}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}

export default Diagram;