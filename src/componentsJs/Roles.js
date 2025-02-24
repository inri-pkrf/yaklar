import React from 'react';
import Cards from '../componentsJs/Cards';
import RolesData from "../data/RolesData";

function Roles() {
    const updateCompleted = (index) => {
        const completed = JSON.parse(localStorage.getItem('completed')) || [false, false, false, false];
        completed[index] = true; // Mark the subject as completed
        localStorage.setItem('completed', JSON.stringify(completed)); // Save to localStorage
    };
    

    return (
        <Cards 
            data={RolesData} 
            title='תפקידי מש"ק התנדבות ביקל"ר' 
            updateCompleted={updateCompleted} 
            index={1} 
            dataType="RolesData" 
        />
    );
}

export default Roles;
