import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Diagram from '../componentsJs/Diagram';
import '../componentsCss/Cards.css';

function Cards({ data, title, updateCompleted, index, dataType }) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const currentItem = data[currentIndex];
    const [diagramCompleted, setDiagramCompleted] = useState(false);
    const isLastItem = currentIndex === data.length - 1;

    const isCorrectAnswer = userAnswers[currentIndex] === currentItem.correctAnswer;
    const isQuiz = currentItem.question;
    const hideNextButton = isQuiz && (userAnswers[currentIndex] === undefined || !isCorrectAnswer);


    const handleNext = () => {
        if (isLastItem) {
            if (typeof updateCompleted === 'function') {
                updateCompleted(index);
            }
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
            // window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleAnswerClick = (index) => {
        setUserAnswers(prev => ({
            ...prev,
            [currentIndex]: index,
        }));
    };

    const getExplanation = () => {
        if (userAnswers[currentIndex] !== undefined) {
            if (userAnswers[currentIndex] === currentItem.correctAnswer) {
                return currentItem.explanationRight;
            } else {
                return currentItem.explanationWrong;
            }
        }
        return null;
    };

    const handleDiagramComplete = () => {
        setDiagramCompleted(true);
    };

    return (
        <div className="Cards">
            <div className="title1">{title}</div>

            <div className="text-continer-body">
                <div className='title-div-body'></div>
                <img src={currentItem.logoSrc} className="logos" alt="logos" />
                <div className="title2">{currentItem.title}</div>

                {dataType === 'AbilitiesData' && currentItem.id === 5 ? (
                    <Diagram onComplete={() => setDiagramCompleted(true)} />
                ) : currentItem.text ? (
                    <div className='text-div-body'>{currentItem.text}</div>
                ) : isQuiz ? (
                    <div className="quiz-container">
                        <div className="question">{currentItem.question}</div>
                        <div className="answers">
                            {currentItem.answers.map((answer, index) => (
                                <div
                                    key={index}
                                    className={`answer-item ${userAnswers[currentIndex] === index
                                        ? index === currentItem.correctAnswer
                                            ? 'rightanswer'
                                            : 'wronganswer'
                                        : ''
                                        }`}
                                    onClick={() => handleAnswerClick(index)}
                                >
                                    {answer}
                                </div>
                            ))}
                        </div>
                        <div className="explanationAnswer">{getExplanation()}</div>
                    </div>
                ) : null}

                <div className='btns-div'>
                    <div
                        className={`btn-next-div ${(hideNextButton || (dataType === 'AbilitiesData' && currentItem.id === 5 && !diagramCompleted)) ? 'hidden' : ''}`}
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

                    <div className={`btn-prev-div ${currentIndex === 0 ? 'hidden' : ''}`} onClick={handlePrev}>
                        <div className='btns-text' id='btn-prev-text'>הקודם</div>
                        <img src={process.env.PUBLIC_URL + '/assests/imgs/right.png'} className="btns" id="btn-prev-img" alt="btn-prev" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;
