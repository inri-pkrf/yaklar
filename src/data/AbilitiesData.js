
const AbilitiesData = [
    {
        id: 1,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/target.png`,
        title: "מטרה:",
        text: [
            <>
                מיצוי יכולות המרחב האזרחי למען מתן מענה לצרכים ופערים ברמה המקומית במצבי חירום השונים.
                <br /><br />
                גיבוש המענה לצרכים הצפויים בעורף בשעת חירום בתיאום הרשת הרב מגזרית לאור רצונם של ארגוני החברה האזרחית והמגזר העסקי להירתם ולסייע בשעת חירום מה שיצריך מיצוי מרבי של הכוחות הפועלים במרחב.
            </>
        ],
    },
    {
        id: 2,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/steps.png`,
        title: "שלבים:",
        text: [
            <>
                1. <b>שגרה-</b> שלב המיפוי יכולות
                <br />
                2. <b>חירום-</b> שלב מיצוי היכולות
                <br />
                3. <b>חירום-</b> שלב ניהול התיעדופים
            </>
        ],
    },
    {
        id: 3,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/map.png`,
        title: "מפת הידע הלאומי:",
        text: [
            <>
                בוצע תהליך מיפוי על גבי מערכת GIS אשר ממפה כ-2,500 ארגוני התנדבות ברשויות המקומיות לפי מיקום גאוגרפי, תחום עיסוק וכמות מתנדבים.
                <br /><br />
                ניתן לגשת למיפוי זה בפורטל אג"מים אג"מים - מפת הידע לחירום - שכבת ארגוני התנדבות
                <br /><br />
                <a
                    href="https://portal.agamimp.net/application/64f5bbc434aff120421af4de?environment=%D7%A1%D7%91%D7%99%D7%91%D7%94%20%D7%9E%D7%91%D7%A6%D7%A2%D7%99%D7%AA"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1cb4e3', textDecoration: 'underline' }}
                >
                    פתח מיפוי GIS
                </a>
            </>

        ],
    },
    {
        id: 4,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/track.png`,
        title: "ציר אורכי:",
    },
    {
        id: 5,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/customer-service.png`,
        title: "שאלת וידוא הבנה:",
        question: 'מהם מקורות הרשות למיצוי יכולות המרחב האזרחי בגזרתה?',
        answers: [
            'כל התשובות נכונות',
            'ארגוני התנדבות הפועלים בגזרת הרשות',
            'מתנדבים ספונטנים',
            'מתנדבי הרשות הרשומים אשר להם משימה מוגדרת מראש',
        ],
        correctAnswer: 0,
        explanationRight: "כל הכבוד! סיימת את שלב זה",
        explanationWrong: "תשובה לא נכונה. נסו שוב עד לקבלת תשובה נכונה"
    }
]

export default AbilitiesData;