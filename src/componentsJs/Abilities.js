
import React from 'react';
import Cards from '../componentsJs/Cards';
import AbilitiesData from "../data/AbilitiesData";

function Abilities() {
    return <Cards data={AbilitiesData} title='תהליך מבצעי מיצוי יכולות במרחב האזרחי' dataType="AbilitiesData"/>;
}

export default Abilities;