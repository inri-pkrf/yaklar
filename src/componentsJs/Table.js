

import React, { useEffect } from 'react';
import Cards from '../componentsJs/Cards';
import TableData from "../data/TableData";

function Table() {
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
            data={TableData} 
            title='שולחן עגול ברשות המקומית' 
            dataType="TableData" 
            updateCompleted={updateCompleted} 
            index={3} 
        />
    );
}

export default Table;
