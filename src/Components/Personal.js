import React,{useEffect} from 'react';
import { Navbar } from './Navbar';
import { PersonalInfo } from './PersonalInfo';

const Personal = ({ user }) => {
    return (
        <>
            <Navbar user={user} />
            <PersonalInfo title={'Personal Info'}/>
        </>
    );
}

export default Personal;