import React, { useState, useEffect } from 'react';
import '../componentsCss/SimulationGame.css';
import { useNavigate } from 'react-router-dom';
import TextData from '../data/TextData';

function SimulationGame({ municipality, name }) {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [chatMessages, setChatMessages] = useState([]); // Store chat messages

    const currentQuestion = TextData[currentQuestionIndex];

    // Show the first question when the component is mounted or currentQuestionIndex changes
    useEffect(() => {
        if (chatMessages.length === 0) {
            setChatMessages([{ side: '1', content: currentQuestion.content }]);  // Add the first question to chat
        }
    }, [currentQuestionIndex, currentQuestion.content, chatMessages]);

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        const isCorrect = currentQuestion.answers[currentQuestion.correctAnswer] === selectedAnswer;
        const feedback = isCorrect ? currentQuestion.feedbackCorrect : currentQuestion.feedbackInCorrect;

        // Add the user's answer and feedback to the chat
        const newMessages = [
            { side: '2', content: selectedAnswer },  // User's answer
            { side: '1', content: feedback }  // Feedback
        ];

        // Append new messages to the existing chat history
        setChatMessages(prevMessages => [
            ...prevMessages,
            ...newMessages
        ]);

        // Move to the next question after 3 seconds
        setTimeout(() => {
            setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % TextData.length);
            setSelectedAnswer('');
        }, 3000);
    };

    // Add the next question only once after feedback is shown
    useEffect(() => {
        if (chatMessages.length > 0 && chatMessages[chatMessages.length - 1].side === '1' && currentQuestionIndex > 0) {
            // Only add the next question if it's not already in chat
            const lastMessage = chatMessages[chatMessages.length - 1];
            if (lastMessage.content !== currentQuestion.content) {
                setChatMessages(prevMessages => [
                    ...prevMessages,
                    { side: '1', content: currentQuestion.content }  // Add next question to chat after feedback
                ]);
            }
        }
    }, [currentQuestionIndex, chatMessages, currentQuestion.content]);

    return (
        <div className="SimulationGame">
            <div className='game-header'>
                <h1 className='title-game'>
                    בוט התנדבות {municipality}
                </h1>
                <div className='circle-img'>
                    <img
                        src={process.env.PUBLIC_URL + '/assests/imgs/logos/bot.png'}
                        className="bot"
                        alt="bot"
                    />
                </div>
                <img
                    src={process.env.PUBLIC_URL + '/assests/imgs/logos/telephone.png'}
                    className="logos"
                    id='logo-phone'
                    alt="logo-phone"
                />
                <img
                    src={process.env.PUBLIC_URL + '/assests/imgs/logos/cam-recorder.png'}
                    className="logos"
                    id='logo-video'
                    alt="logo-video"
                />
            </div>

            <div className='texing-div'>
                <div id='first-text' className='side1-text'>
                    שלום {name} ! אני הבוט שלך והיום נשאל כמה שאלות....
                </div>
                {chatMessages.map((message, index) => (
                    <div key={index} className={`side${message.side}-text`}>
                        {message.content}
                    </div>
                ))}
            </div>

            <div className='input-div'>
                {selectedAnswer}
            </div>
            <img
                src={process.env.PUBLIC_URL + '/assests/imgs/right-arrow-in-a-circle.png'}
                className="btn-to-send"
                alt="btn-to-sendv"
                onClick={handleSubmit}
            />

            <div className='keybord-div'>
                <div className='answers-continer'>
                    {currentQuestion.answers.map((answer, index) => (
                        <div
                            id={`answer${index + 1}-div`}
                            key={index}
                            className={`answers-divs ${selectedAnswer === answer ? "selected" : ""}`}
                            onClick={() => handleAnswerSelection(answer)}
                        >
                            {answer}
                        </div>
                    ))}
                </div>
                <div className='btn-to-home' onClick={() => navigate('/home')}>חזרה לדף הבית</div>
            </div>
        </div>
    );
}

export default SimulationGame;
