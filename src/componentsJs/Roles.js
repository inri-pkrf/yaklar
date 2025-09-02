import React from 'react';
import Cards from '../componentsJs/Cards';
import RolesData from "../data/RolesData";

function Roles() {
    const updateCompleted = (index) => {
        const completed = JSON.parse(sessionStorage.getItem('completed')) || [false, false, false, false];
        completed[index] = true; 
        sessionStorage.setItem('completed', JSON.stringify(completed)); 
    };
    
    return (
        <Cards 
            data={RolesData} 
            title='תפקידי מש"ק התנדבות ביקל"ר' 
            updateCompleted={updateCompleted} 
            index={1}   // פרק 1 (תפקידים)
            dataType="RolesData" 
        />
    );
}

export default Roles;
