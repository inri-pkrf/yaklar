import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/Home.css';


function Home() {
    const navigate = useNavigate();
    return (

        <div className="Home">

            <div className="title">
                לומדת
                <br/>
                מש"ק התנדבות ביקל"ר
            </div>


        </div>
    )
}


export default Home;