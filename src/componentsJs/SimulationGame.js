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
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [isSimulationCompleted, setIsSimulationCompleted] = useState(false);
    const chatEndRef = useRef(null);

    const currentQuestion = TextData[currentQuestionIndex];

    // הוסיפי ליד שאר ה-refs:
    const didInitRef = useRef(false);

    // החליפי את ה-useEffect של הטעינה הראשונית בזה:
    useEffect(() => {
        if (didInitRef.current) return; // מגן מפני StrictMode כפול
        didInitRef.current = true;

        const savedChat = sessionStorage.getItem("simChatMessages");
        const savedIndexStr = sessionStorage.getItem("simChatIndex");
        const savedCompleted = sessionStorage.getItem("simCompleted");

        if (savedChat && savedIndexStr) {
            // יש מצב שמור – משחזרים *שניהם* יחד כדי לשמור על סנכרון
            const idx = Number(savedIndexStr);
            setCurrentQuestionIndex(idx);
            setChatMessages(JSON.parse(savedChat));
            setIsSimulationCompleted(savedCompleted === "true");
        } else {
            // אין מצב שמור – מתחילים מסודר מהשאלה הראשונה
            setCurrentQuestionIndex(0);
            setChatMessages([{ side: '1', content: TextData[0].content }]);
            setIsSimulationCompleted(false);
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem("simChatMessages", JSON.stringify(chatMessages));
    }, [chatMessages]);

    useEffect(() => {
        sessionStorage.setItem("simChatIndex", String(currentQuestionIndex));
    }, [currentQuestionIndex]);

    useEffect(() => {
        sessionStorage.setItem("simCompleted", String(isSimulationCompleted));
    }, [isSimulationCompleted]);


    // useEffect(() => {
    //     if (chatMessages.length === 0) {
    //         setChatMessages([{ side: '1', content: currentQuestion.content }]);
    //     }
    // }, [currentQuestionIndex, currentQuestion.content, chatMessages]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
        setIsAnswerSelected(true);
    };
    const handleSubmit = () => {
        if (!selectedAnswer) return;

        setShowAnswers(false);
        setMessageSent(true);
        setIsAnswerSelected(false);
        const answerToSend = selectedAnswer; // לשמור לוגית מה נשלח
        setSelectedAnswer('');

        const isCorrect =
            currentQuestion.answers[currentQuestion.correctAnswer] === answerToSend;
        const feedback = isCorrect ? currentQuestion.feedbackCorrect : currentQuestion.feedbackInCorrect;

        setChatMessages(prev => [
            ...prev,
            { side: '2', content: answerToSend },
            { side: '1', content: feedback }
        ]);

        setTimeout(() => {
            setMessageSent(false);

            const isLast = currentQuestionIndex === TextData.length - 1;

            if (isLast) {
                setIsSimulationCompleted(true);
                setChatMessages(prev => [
                    ...prev,
                    { side: '1', content: "כל הכבוד! סיימת את הסימולציה" }
                ]);

                // שמירת מצב סיום הסימולציה
                sessionStorage.setItem('simulationCompleted', 'true');
            } else {
                const nextIndex = (currentQuestionIndex + 1) % TextData.length;
                setCurrentQuestionIndex(nextIndex);

                setTimeout(() => {
                    setChatMessages(prev => [
                        ...prev,
                        { side: '1', content: TextData[nextIndex].content }
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
                <img src={process.env.PUBLIC_URL + '/assests/imgs/logos/telephone.png'} className="logos-SimulationGame" id='logo-phone' alt="logo-phone" />
                <img src={process.env.PUBLIC_URL + '/assests/imgs/logos/cam-recorder.png'} className="logos-SimulationGame" id='logo-video' alt="logo-video" />
            </div>

            <div className='texing-div'>
                <div id='first-text' className='side1-text'>שלום {name} ! אני הבוט שלך והיום נשאל כמה שאלות....</div>
                {chatMessages.length === 0 && (
                    <div className="side1-text">{TextData[0].content}</div>
                )}
                {chatMessages.map((message, index) => (
                    <div key={index} className={`side${message.side}-text`}>
                        {message.content}
                    </div>
                ))}

                <div ref={chatEndRef}></div>
            </div>

            <div className='input-div'>{selectedAnswer}</div>

            <img
                src={process.env.PUBLIC_URL + (isAnswerSelected
                    ? '/assests/imgs/green-arrow.png'
                    : '/assests/imgs/right-arrow-in-a-circle.png')}
                className="btn-to-send"
                alt="btn-to-send"
                onClick={handleSubmit}
                style={{ cursor: isAnswerSelected ? 'pointer' : 'default' }}
            />

            <div className='keybord-div'>
                {messageSent ? (
                    <div className="message-sent">
                        קיבלתם הודעה חדשה,
                        <br />
                        קראו אותה
                    </div>
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

                {!isSimulationCompleted && !messageSent && (
                    <div className='btn-to-home' onClick={() => navigate('/home')}>
                        חזרה לדף הבית
                    </div>
                )}
                {isSimulationCompleted && (
                    <div className="end-buttons">
                        <div
                            className='end-chat-btn'
                            onClick={() => {
                                sessionStorage.setItem('simulationCompleted', 'true');
                                navigate('/home');
                            }}
                        >
                            חזרה ללומדה
                        </div>

                        <div
                            className='restart-btn'
                            onClick={() => {
                                // איפוס מצב הסימולציה
                                sessionStorage.removeItem("simulationState");
                                sessionStorage.removeItem("simChatMessages");
                                sessionStorage.removeItem("simChatIndex");
                                sessionStorage.removeItem("simCompleted");
                                sessionStorage.removeItem("simulationCompleted");

                                navigate(0); // טוען מחדש את הדף → יחזור למסך ההתחלה של Simulation.jsx
                            }}
                        >
                            התחלה מחדש
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default SimulationGame;
