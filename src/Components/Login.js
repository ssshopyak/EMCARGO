import React, { useState } from 'react'
import { auth } from '../Config/Config'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom'
import { Button } from './Button';
import { toShowError } from './FlashMessages';

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setEmail('');
            setPassword('');
            if (userCredential.user.emailVerified) {
                props.history.push('/');
                setTimeout(() => {
                    props.history.go(0)
                },500) 
            } else {
                toShowError(`${userCredential.user.email} needs to be verified before access is granted`)
                return;
            }
        }).catch(err => toShowError(err.message));
    }

    return (
        <div className='loginContainer'>
            <div style={{backgroundColor:'#fff', padding:'25px',borderRadius:'25px', display:'flex', flexDirection:'column'}}>
                <h2 style={{alignSelf:'center'}}>Login</h2>
                <form autoComplete="off" style={{display:'flex',flexDirection:'column'}} onSubmit={login}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' required
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                    <div style={{marginTop:'25px'}}>
                        <Button type='submit' title='Login' color={'#fff'} backgroundColor={'#f16a28'} padding={'5px 20px 5px 20px'} />
                    </div>
                </form>
                <span style={{marginTop:'10px'}}>Don't have an account? Register
                    <Link to="signup" style={{color:'#F16A28', fontWeight: "bold"}}> Here</Link>
                </span>
            </div>
        </div>
    )
}
