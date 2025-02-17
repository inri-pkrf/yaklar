import React, { useState } from 'react';
import '../componentsCss/Cards.css';

function Cards({ data, title }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // Store user selections

    const currentItem = data[currentIndex];

    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleAnswerClick = (index) => {
        setUserAnswers(prev => ({
            ...prev,
            [currentIndex]: index, // Save selected answer for this question
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

    return (
        <div className="Cards">
            <div className="title1">{title}</div>
            
            <div className="text-continer-body">
                <div className='title-div-body'></div>
                <img src={currentItem.logoSrc} className="logos" alt="logos" />
                <div className="title2">{currentItem.title}</div>

                {currentItem.text ? (
                    <div className='text-div-body'>{currentItem.text}</div>
                ) : currentItem.question ? (
                    <div className="quiz-container">
                        <div className="question">{currentItem.question}</div>
                        <div className="answers">
                            {currentItem.answers.map((answer, index) => (
                                <div 
                                    key={index} 
                                    className={`answer-item ${
                                        userAnswers[currentIndex] === index
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
                    <div className={`btn-next-div ${currentIndex === data.length - 1 ? 'hidden' : ''}`} onClick={handleNext}>
                        <div className='btns-text' id='btn-next-text'>הבא</div>
                        <img src={process.env.PUBLIC_URL + '/assests/imgs/right.png'} className="btns" id="btn-next-img" alt="btn-next" />
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
