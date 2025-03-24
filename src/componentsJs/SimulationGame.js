import React, { useState, useEffect, useRef } from 'react';
import '../componentsCss/SimulationGame.css';
import { useNavigate } from 'react-router-dom';
import TextData from '../data/TextData';

function SimulationGame({ municipality, name }) {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [messageSent, setMessageSent] = useState(false);
    const [showAnswers, setShowAnswers] = useState(true);
    const [isAnswerSelected, setIsAnswerSelected] = useState(false); // Track answer selection
    const [isSimulationCompleted, setIsSimulationCompleted] = useState(false); // Flag for simulation completion
    const chatEndRef = useRef(null);

    const currentQuestion = TextData[currentQuestionIndex];

    useEffect(() => {
        if (chatMessages.length === 0) {
            setChatMessages([{ side: '1', content: currentQuestion.content }]);
        }
    }, [currentQuestionIndex, currentQuestion.content, chatMessages]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
        setIsAnswerSelected(true); // Change button image to green arrow
    };

    const handleSubmit = () => {
        if (!selectedAnswer) return;

        setShowAnswers(false);
        setMessageSent(true);
        setIsAnswerSelected(false); // Reset button image to default
        setSelectedAnswer('');

        const isCorrect = currentQuestion.answers[currentQuestion.correctAnswer] === selectedAnswer;
        const feedback = isCorrect ? currentQuestion.feedbackCorrect : currentQuestion.feedbackInCorrect;

        const newMessages = [
            { side: '2', content: selectedAnswer },
            { side: '1', content: feedback }
        ];

        setChatMessages(prevMessages => [...prevMessages, ...newMessages]);

        setTimeout(() => {
            setMessageSent(false);

            if (currentQuestionIndex === TextData.length - 1) {
                // After the last question, show completion message
                setIsSimulationCompleted(true);
                setChatMessages(prevMessages => [
                    ...prevMessages,
                    { side: '1', content: "כל הכבוד! סיימת את הסימולציה" }
                ]);
            } else {
                // Continue to next question
                setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % TextData.length);

                setTimeout(() => {
                    setChatMessages(prevMessages => [
                        ...prevMessages,
                        { side: '1', content: TextData[(currentQuestionIndex + 1) % TextData.length].content }
                    ]);
                    setShowAnswers(true);
                }, 500);
            }
        }, 3000);
    };

    return (
        <div className="SimulationGame">
            <div className='game-header'>
                <h1 className='title-game'>בוט התנדבות {municipality}</h1>
                <div className='circle-img'>
                    <img src={process.env.PUBLIC_URL + '/assests/imgs/logos/bot.png'} className="bot" alt="bot" />
                </div>
                <img src={process.env.PUBLIC_URL + '/assests/imgs/logos/telephone.png'} className="logos" id='logo-phone' alt="logo-phone" />
                <img src={process.env.PUBLIC_URL + '/assests/imgs/logos/cam-recorder.png'} className="logos" id='logo-video' alt="logo-video" />
            </div>

            <div className='texing-div'>
                <div id='first-text' className='side1-text'>שלום {name} ! אני הבוט שלך והיום נשאל כמה שאלות....</div>
                {chatMessages.map((message, index) => (
                    <div key={index} className={`side${message.side}-text`}>
                        {message.content}
                    </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            <div className='input-div'>{selectedAnswer}</div>

            {/* Dynamically change the button image */}
            <img 
                src={process.env.PUBLIC_URL + (isAnswerSelected 
                    ? '/assests/imgs/green-arrow.png' 
                    : '/assests/imgs/right-arrow-in-a-circle.png')}
                className="btn-to-send"
                alt="btn-to-send"
                onClick={handleSubmit}
            />

            <div className='keybord-div'>
                {messageSent ? (
                    <div className="message-sent">הודעה נשלחה</div>
                ) : (
                    showAnswers && !isSimulationCompleted && (
                        <div className='answers-continer'>
                            {currentQuestion.answers.map((answer, index) => (
                                <div
                                    id={`answer${index + 1}-div`}
                                    key={index}
                                    className={`answers-divs ${selectedAnswer === answer ? "is-clicked" : ""}`}
                                    onClick={() => handleAnswerSelection(answer)}
                                >
                                    {answer}
                                </div>
                            ))}
                        </div>
                    )
                )}

                {!isSimulationCompleted && (
                    <div className='btn-to-home' onClick={() => navigate('/home')}>חזרה לדף הבית</div>
                )}
                {isSimulationCompleted && (
                    <div className='end-chat-btn' onClick={() => navigate('/home')}>חזרה ללומדה</div>
                )}
            </div>
        </div>
    );
}

export default SimulationGame;
