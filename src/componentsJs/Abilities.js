import React, { useEffect } from 'react';
import Cards from '../componentsJs/Cards';
import AbilitiesData from "../data/AbilitiesData";

function Abilities() {
    const updateCompleted = (index) => {
        const completed = JSON.parse(localStorage.getItem('completed')) || [false, false, false, false];
        completed[index] = true; 
        localStorage.setItem('completed', JSON.stringify(completed)); 
    };

    useEffect(() => {
        if (!localStorage.getItem('completed')) {
            localStorage.setItem('completed', JSON.stringify([false, false, false, false]));
        }
    }, []);

    return (
        <Cards 
            data={AbilitiesData} 
            title='תהליך מבצעי מיצוי יכולות במרחב האזרחי' 
            dataType="AbilitiesData" 
            updateCompleted={updateCompleted} 
            index={0} 
        />
    );
}

export default Abilities;
