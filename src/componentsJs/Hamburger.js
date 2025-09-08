import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCss/Hamburger.css';

const Hamburger = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visitedPages, setVisitedPages] = useState(() => {
    const storedPages = JSON.parse(sessionStorage.getItem('visitedPages')) || [];
    return storedPages;
  });
  const [isOpen, setIsOpen] = useState(false);

  // 🔑 סטייטים חדשים
  const [completed, setCompleted] = useState([false, false, false, false]);
  const [simulationCompleted, setSimulationCompleted] = useState(false);

  // בודק אם כל הקופסאות הושלמו
  const simulationUnlocked =
    completed.every((c) => c === true) ||
    sessionStorage.getItem('simulationCompleted') === 'true';

  const subjects = [
    { name: 'עמוד הבית', path: '/home' },
    { name: 'תפקידים', path: '/roles' },
    { name: 'מיצוי יכולות', path: '/abilities' },
    { name: 'מרס"ל', path: '/marsel' },
    { name: 'שולחן עגול וועדת התנדבות', path: '/table' },
    { name: 'סימולציה', path: '/simulation' },
  ];

  useEffect(() => {
    if (!visitedPages.includes(location.pathname)) {
      const updatedVisitedPages = [...visitedPages, location.pathname];
      setVisitedPages(updatedVisitedPages);
      sessionStorage.setItem('visitedPages', JSON.stringify(updatedVisitedPages));
    }
  }, [location.pathname, visitedPages]);

  useEffect(() => {
    if (isOpen) {
      const stored = JSON.parse(sessionStorage.getItem('progressData')) || {};
      const completedArray = [
        stored[0]?.diagramCompleted || false,
        stored[1]?.diagramCompleted || false,
        stored[2]?.diagramCompleted || false,
        stored[3]?.diagramCompleted || false,
      ];
      setCompleted(completedArray);

      setSimulationCompleted(
        sessionStorage.getItem('simulationCompleted') === 'true'
      );
    }
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (path) => {
    setIsOpen(false);

    if (path === '/simulation') {
      const savedState = JSON.parse(sessionStorage.getItem('simulationState'));
      if (
        !simulationUnlocked &&
        !(savedState && savedState.name && savedState.municipality)
      ) {
        return; // 🚫 נעול – לא עושים navigate
      }
    }

    navigate(path);
  };

  // ✅ פונקציה לסימון עמוד נוכחי
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div className="hamburger-icon" onClick={handleClick}>
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
      </div>

      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <img
          src={`${process.env.PUBLIC_URL}/assests/imgs/whiteLogo.png`}
          alt="Decorative"
          className="whiteLogoHam"
        />
        <h1 className="menu-title">לומדת מש"ק התנדבות ביקל"ר</h1>
        <ul className="menu-list">
          {subjects.map((subject, index) => {
            const isSimulation = subject.path === '/simulation';
            const locked = isSimulation && !simulationUnlocked;

            return (
              <React.Fragment key={index}>
                <li
                  onClick={() => handleMenuClick(subject.path)}
                  className={`menu-item 
                    ${isActive(subject.path) ? 'active' : ''} 
                    ${locked ? 'fade' : ''}`}
                  style={{ cursor: locked ? 'not-allowed' : 'pointer' }}
                >
                  {subject.name}
                </li>
                {index < subjects.length - 1 && <div className="lineMenu"></div>}
              </React.Fragment>
            );
          })}
        </ul>
        <div className="mashov-menu">
          <div className="mashovTextMenu">
            <br /> יש הערות על הממשק? יש מחמאות? מלאו את השאלון וצרו איתנו קשר
            <br />
            <a
              id="linkMenu"
              href="https://docs.google.com/forms/d/e/1FAIpQLSeAunPlSFfKmqyZhnCQkf8jsxTPsLjr8-vKES_V3UDqqDSFoA/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              בקישור הבא
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
