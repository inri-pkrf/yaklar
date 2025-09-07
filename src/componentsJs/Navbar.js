import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCss/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [completed, setCompleted] = useState([false, false, false, false]);
    const [simulationCompleted, setSimulationCompleted] = useState(false);

    // טוען סטטוס מה־sessionStorage
    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem('progressData')) || {};
        const completedArray = [
            stored[0]?.diagramCompleted || false,
            stored[1]?.diagramCompleted || false,
            stored[2]?.diagramCompleted || false,
            stored[3]?.diagramCompleted || false,
        ];
        setCompleted(completedArray);

        setSimulationCompleted(sessionStorage.getItem('simulationCompleted') === 'true');
    }, [location.pathname]); // ✅ מתעדכן בכל שינוי עמוד

    const simulationUnlocked = completed.every(c => c === true) || simulationCompleted;

    const subjects = [
        { name: 'עמוד הבית', path: '/home' },
        { name: 'מיצוי יכולות', path: '/abilities' },
        { name: 'תפקידים', path: '/roles' },
        { name: 'שולחן עגול וועדת התנדבות', path: '/table' },
        { name: 'מרס"ל', path: '/marsel' },
        { name: 'סימולציה', path: '/simulation' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleNavigate = (path) => {
        if (path === '/simulation' && !simulationUnlocked) return; // 🚫 נעול
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(path);
    };

    return (
        <nav className="navbar-container">
            <ul className="navbar-list">
                {subjects.map((subject, index) => {
                    const isSimulation = subject.path === '/simulation';
                    const locked = isSimulation && !simulationUnlocked;

                    return (
                        <li
                            key={index}
                            onClick={() => handleNavigate(subject.path)}
                            className={`${isActive(subject.path) ? 'active' : ''} ${locked ? 'fade' : ''}`}
                            style={{ cursor: locked ? 'not-allowed' : 'pointer' }}
                        >
                            {subject.name}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navbar;
