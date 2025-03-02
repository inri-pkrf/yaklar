
const MarselData = [
    {
        id: 1,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/video.png`,
        title: "היכרות המרסל:",
        text: [
            <>
                צפו בסרטון הבא להיכרות עם עם המרס״ל - מרכז הסיוע לאזרח.
            </>
        ],
        videoSrc: `${process.env.PUBLIC_URL}/assests/videos/היכרות המרסל.mp4`
    },
    {
        id: 2,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/video.png`,
        title: "תהליך הרישום:",
        text: [
            <>
                צפו בסרטון הבא להיכרות כיצד נרשמים למערכת.
            </>
        ],
        videoSrc: `${process.env.PUBLIC_URL}/assests/videos/תהליך הרישום.mp4`
    },
    {
        id: 3,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/video.png`,
        title: "פתיחת בקשה:",
        text: [
            <>
                צפו בסרטון הבא להיכרות איך מעלים בקשה חדשה.
            </>
        ],
        videoSrc: `${process.env.PUBLIC_URL}/assests/videos/פתיחת בקשה.mp4`
    },
    {
        id: 4,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/customer-service.png`,
        title: "שאלת וידוא הבנה:",
        question: "שאלה שאלה שאלה שאלה שאלה שאלה שאלה שאלה שאלה?",
        answers: [
            "תשובה תשובה תשובה תשובה תשובה תשובה",
            "תשובה תשובה תשובה תשובה תשובה תשובה",
            "תשובה תשובה תשובה תשובה תשובה תשובה",
            "תשובה תשובה תשובה תשובה תשובה תשובה"
        ],
        correctAnswer: 1,
        explanationRight: "כל הכבוד! סיימת את שלב זה",
        explanationWrong: "תשובה לא נכונה. נסו שוב עד לקבלת תשובה נכונה"
    }
]

export default MarselData;