import React, { useState } from 'react'
import { auth, db } from '../Config/Config'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { toShowError, toShowSuccess } from './FlashMessages'
import { Button } from './Button';

export const Signup = (props) => {

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // signup
    const signup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            try {
                const docRef = addDoc(collection(db, "SignedUpUsersData"), {
                    Name: name,
                    Email: email,
                    FirstName: '',
                    LastName: '',
                    CompanyName: '',
                    Country: '',
                    StreetAddress: '',
                    ApartamentNumber: '',
                    City:'',
                    State:'',
                    PostCode:'',
                    Phone:'',
                }).then((docRef) => {
                    setName('');
                    setEmail('');
                    setPassword('');
                    console.log("Document written with ID: ", docRef.id);
                    sendEmailVerification(userCredential.user).then(()=>{
                        toShowSuccess('Please verify your email. We have just sent you an email for verification')
                        props.history.push('/login');
                    })
                })
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }).catch(err => toShowError(err.message));
    }

    return (
        <div className='loginContainer'>
            <div style={{backgroundColor:'#fff', padding:'25px',borderRadius:'25px', display:'flex', flexDirection:'column'}}>
                <h2 style={{alignSelf:'center'}}>Sign up</h2>
                <form autoComplete="off" className='form-group' style={{display:'flex',flexDirection:'column'}}onSubmit={signup}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setName(e.target.value)} value={name} />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label htmlFor="passowrd">Password</label>
                    <input type="password" className='form-control' required
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                    <div style={{marginTop:'25px'}}>
                        <Button type='submit' title='Submit' color={'#fff'} backgroundColor={'#f16a28'} padding={'5px 20px 5px 20px'} />
                    </div>
                </form>
                <span style={{marginTop:'10px'}}>Already have an account? Login
                    <Link to="login" style={{color:'#F16A28', fontWeight: "bold"}}> Here</Link>
                </span>
            </div>
        </div>
    )
}
