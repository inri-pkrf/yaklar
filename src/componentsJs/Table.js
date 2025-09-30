import React from 'react';
import Cards from '../componentsJs/Cards';
import TableData from "../data/TableData";

function Table() {
    const updateCompleted = (index) => {
        const completed = JSON.parse(sessionStorage.getItem('completed')) || [false, false, false, false];
        completed[index] = true;
        sessionStorage.setItem('completed', JSON.stringify(completed));
        
    };

    return (
        <Cards 
            data={TableData}
            title='הועדה להתנדבות ושולחן עגול ברשות המקומית'
            dataType="TableData"
            updateCompleted={updateCompleted}
            index={2}
        />
    );
}

export default Table;
