import React from 'react';
import '../componentsCss/SimulationGame.css';
import { useNavigate } from 'react-router-dom';


function SimulationGame({ name, municipality }) {
    const navigate = useNavigate();

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

            <div className='keybord-div'>
                <div className='answers-continer'>
                    <div className='answers-divs' id='answer1-div'></div>
                    <div className='answers-divs' id='answer2-div'></div>
                </div>
                <div className='btn-to-home' onClick={() => navigate('/home')}>חזרה לדף הבית</div>
            </div>

        </div>
    );
}

export default SimulationGame;

