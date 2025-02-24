
import React from 'react';
import Cards from '../componentsJs/Cards';
import MarselData from "../data/MarselData";

function Marsel() {
    const updateCompleted = (index) => {
        const completed = JSON.parse(localStorage.getItem('completed')) || [false, false, false, false];
        completed[index] = true;
        localStorage.setItem('completed', JSON.stringify(completed));
    };


    return (
        <Cards
            data={MarselData}
            title='מערכת המרס"ל'
            updateCompleted={updateCompleted}
            index={2}
            dataType="MarselData"
        />
    );
}

export default Marsel;
