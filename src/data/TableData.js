
const TableData = [
    {
        id: 1,
        logoSrc: `${process.env.PUBLIC_URL}/assests/imgs/logos/discussion.png`,
        title: "?",
    },
    {
        id: 2,
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

export default TableData;