import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Diagram from '../componentsJs/Diagram';
import TableCards from '../componentsJs//TableCards';
import '../componentsCss/Cards.css';

function Cards({ data, title, updateCompleted, index, dataType }) {
    const navigate = useNavigate();

    // נטען התקדמות מהסשן
    const loadProgress = () => {
        const stored = JSON.parse(sessionStorage.getItem("progressData")) || {};
        return stored[index] || { currentIndex: 0, answers: {}, diagramCompleted: false };
    };

    const [currentIndex, setCurrentIndex] = useState(loadProgress().currentIndex);
    const [userAnswers, setUserAnswers] = useState(loadProgress().answers);
    const [diagramCompleted, setDiagramCompleted] = useState(false);
    const [tableCompleted, setTableCompleted] = useState(false);

    const currentItem = data[currentIndex];
    const isLastItem = currentIndex === data.length - 1;
    const isCorrectAnswer = userAnswers[currentIndex] === currentItem.correctAnswer;
    const isQuiz = currentItem.question;
    const hideNextButton = (
        (isQuiz && (userAnswers[currentIndex] === undefined || !isCorrectAnswer))
        || ((dataType === 'AbilitiesData' && currentItem.id === 4 && !diagramCompleted))
        || ((dataType === 'TableData' && currentItem.id === 1 && !tableCompleted))
    );
    // פונקציה לעדכון sessionStorage בכל שינוי
    const saveProgress = (newData = {}) => {
        const stored = JSON.parse(sessionStorage.getItem("progressData")) || {};
        const chapterProgress = stored[index] || {};

        stored[index] = {
            ...chapterProgress,       // שומר את כל המידע הקיים כולל readItems
            currentIndex,
            answers: userAnswers,
            diagramCompleted,
            ...newData
        };

        sessionStorage.setItem("progressData", JSON.stringify(stored));
    };


    // נעדכן כל פעם שיש שינוי
    useEffect(() => {
        saveProgress({});
    }, [currentIndex, userAnswers, diagramCompleted]);

    const handleNext = () => {
        if (isLastItem) {
            // סמן את הפרק ב-home
            if (typeof updateCompleted === 'function') {
                updateCompleted(index);
            }

            // סמן את הפרק ב-progressData
            const stored = JSON.parse(sessionStorage.getItem("progressData")) || {};
            stored[index] = {
                ...stored[index],
                diagramCompleted: true,
            };
            sessionStorage.setItem("progressData", JSON.stringify(stored));

            // עכשיו נווט ל-home
            navigate('/home');
        } else {
            setCurrentIndex(currentIndex + 1);
            window.scrollTo(0, 0);
        }
    };


    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleAnswerClick = (ansIndex) => {
        // אם כבר בחרו תשובה נכונה, אל תאפשר שינוי
        if (userAnswers[currentIndex] === currentItem.correctAnswer) return;

        setUserAnswers(prev => {
            const newAnswers = { ...prev, [currentIndex]: ansIndex };
            saveProgress({ answers: newAnswers });
            return newAnswers;
        });
    };


    const getExplanation = () => {
        if (userAnswers[currentIndex] !== undefined) {
            return userAnswers[currentIndex] === currentItem.correctAnswer
                ? currentItem.explanationRight
                : currentItem.explanationWrong;
        }
        return null;
    };

    const handleDiagramComplete = () => {
        setDiagramCompleted(true);
        saveProgress({ diagramCompleted: true });
    };

    const handleTableComplete = () => {
        setTableCompleted(true);
        saveProgress({ tableCompleted: true });
    };

    return (
        <div className="Cards">
            <div className="title1">{title}</div>

            <div className="text-continer-body">
                <div className='title-div-body'></div>
                <img src={currentItem.logoSrc} className="logos" alt="logos" />
                <div className="title2">{currentItem.title}</div>

                {dataType === 'AbilitiesData' && currentItem.id === 4 ? (
                    <Diagram onComplete={handleDiagramComplete} />
                ) : dataType === 'TableData' && currentItem.id === 1 ? (
                    <TableCards onComplete={handleTableComplete} />
                ) : (
                    <>
                        {currentItem.text && <div className='text-div-body'>{currentItem.text}</div>}

                        {currentItem.videoSrc && (
                            <div className="video-container">
                                <video
                                    key={currentItem.videoSrc}
                                    controls
                                    className="video-player"
                                >
                                    <source src={currentItem.videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}

                        {isQuiz && (
                            <div className="quiz-container">
                                <div className="question">{currentItem.question}</div>
                                <div className="answers">
                                    {currentItem.answers.map((answer, i) => (
                                        <div
                                            key={i}
                                            className={`answer-item ${userAnswers[currentIndex] === i
                                                ? i === currentItem.correctAnswer
                                                    ? 'rightanswer'
                                                    : 'wronganswer'
                                                : ''
                                                }`}
                                            onClick={() => handleAnswerClick(i)}
                                        >
                                            {answer}
                                        </div>
                                    ))}
                                </div>
                                <div className="explanationAnswer">{getExplanation()}</div>
                            </div>
                        )}
                    </>
                )}

                <div className='btns-div'>
                    <div
                        className={`btn-next-div ${(hideNextButton || (dataType === 'AbilitiesData' && currentItem.id === 5 && !diagramCompleted)) ? 'hidden' : ''
                            }`}
                        onClick={handleNext}
                    >
                        <div
                            className='btns-text'
                            id='btn-next-text'
                            style={{
                                color: isCorrectAnswer && isQuiz ? '#1cb4e3' : '',
                            }}
                        >
                            {isQuiz && isCorrectAnswer ? 'לעמוד הבית' : 'הבא'}
                        </div>
                        <img
                            src={isQuiz && isCorrectAnswer
                                ? `${process.env.PUBLIC_URL}/assests/imgs/right (1).png`
                                : `${process.env.PUBLIC_URL}/assests/imgs/right.png`}
                            className="btns"
                            id="btn-next-img"
                            alt="btn-next"
                        />
                    </div>

                    <div
                        className={`btn-prev-div ${currentIndex === 0 ? 'hidden' : ''}`}
                        onClick={handlePrev}
                    >
                        <div className='btns-text' id='btn-prev-text'>הקודם</div>
                        <img src={process.env.PUBLIC_URL + '/assests/imgs/right.png'} className="btns" id="btn-prev-img" alt="btn-prev" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;
