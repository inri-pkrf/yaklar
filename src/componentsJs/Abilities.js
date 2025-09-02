import React from 'react';
import Cards from '../componentsJs/Cards';
import AbilitiesData from "../data/AbilitiesData";

function Abilities() {
    const updateCompleted = (index) => {
        const stored = JSON.parse(sessionStorage.getItem('progressData')) || {};
        if (!stored.completed) {
            stored.completed = [false, false, false, false];
        }
        stored.completed[index] = true;
        sessionStorage.setItem('progressData', JSON.stringify(stored));
    };

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
