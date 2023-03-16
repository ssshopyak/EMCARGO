import React,{useEffect} from 'react';
import { Navbar } from './Navbar';
import { PersonalInfo } from './PersonalInfo';

const Personal = ({ user }) => {

    useEffect(() => {
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         const querySnapshot = getDocs(collection(db, "SignedUpUsersData")).then((querySnapsot) => {
        //             querySnapsot.forEach((doc) => {
        //                 if(doc.data().Email === user.email) {
        //                     setName(doc.data().Name)
        //                     setEmail(doc.data().Email)
        //                 }
        //               });
        //         }) 
        //     }
        //     else {
        //         history.push('/login')
        //     }
        // })
    },[])
    
    

    return (
        <>
            <Navbar user={user} />
            <PersonalInfo title={'Personal Info'}/>
        </>
    );
}

export default Personal;