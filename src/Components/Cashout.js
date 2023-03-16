import React, {} from 'react'
import { Navbar } from './Navbar';
import { PersonalInfo } from './PersonalInfo';

export const Cashout = (props) => {

    return (
        <>
            <Navbar user={props.user} />
            <PersonalInfo title={'Cashout Details'} />
        </>
    )
}
