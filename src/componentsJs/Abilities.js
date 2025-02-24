import React, { useEffect } from 'react';
import Cards from '../componentsJs/Cards';
import AbilitiesData from "../data/AbilitiesData";

function Abilities() {
    const updateCompleted = (index) => {
        // Retrieve the current state of completed subjects from localStorage
        const completed = JSON.parse(localStorage.getItem('completed')) || [false, false, false, false];
        completed[index] = true; // Mark the subject as completed
        localStorage.setItem('completed', JSON.stringify(completed)); // Save the updated state back to localStorage
    };

    // Ensure the initial state is set when the component loads
    useEffect(() => {
        if (!localStorage.getItem('completed')) {
            // If no progress is stored yet, initialize it
            localStorage.setItem('completed', JSON.stringify([false, false, false, false]));
        }
    }, []);

    return (
        <Cards 
            data={AbilitiesData} 
            title='תהליך מבצעי מיצוי יכולות במרחב האזרחי' 
            dataType="AbilitiesData" 
            updateCompleted={updateCompleted} 
            index={0} // Assuming this is the first subject, adjust if needed
        />
    );
}

export default Abilities;
