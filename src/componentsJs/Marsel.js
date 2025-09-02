import React, { useEffect } from 'react';
import Cards from '../componentsJs/Cards';
import MarselData from "../data/MarselData";

function Marsel() {
    const updateCompleted = (index) => {
        const completed = JSON.parse(sessionStorage.getItem('completed')) || [false, false, false, false];
        completed[index] = true;
        sessionStorage.setItem('completed', JSON.stringify(completed));
    };

    useEffect(() => {
        if (!sessionStorage.getItem('completed')) {
            sessionStorage.setItem('completed', JSON.stringify([false, false, false, false]));
        }
    }, []);

    return (
        <Cards
            data={MarselData}
            title='מערכת המרס"ל'
            updateCompleted={updateCompleted}
            index={3}
            dataType="MarselData"
        />
    );
}

export default Marsel;

