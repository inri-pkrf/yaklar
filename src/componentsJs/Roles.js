import React from 'react';
import Cards from '../componentsJs/Cards';
import RolesData from "../data/RolesData";

function Roles() {
    return <Cards data={RolesData} title='תפקידי מש"ק התנדבות ביקל"ר' />;
}

export default Roles;