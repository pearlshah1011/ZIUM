import React, { useState } from 'react';
import "./signup.css";
import { NavLink } from 'react-router-dom';
const Signin = () => {
   
    //creating an object
    const[logdata,setData]=useState({
        email:"",
        password:""
        //initially value of hook
    });
    //e is any argument
    const add_data=(e)=>{
        const {name,value}=e.target;//loads all inputs whatever we type
        setData(()=>{
            return {
                ...logdata,//saves us from writing loop
                [name]:value
            }
        })

    }


  return (
    <>
    <section>
        <div className='sign_container'>
            <div className='sign_header'>
                <img src='./logo192.png'alt='logo'/>
            </div>
            <div className='sign_form'>
                <form>
                    <h1>Login</h1>
                    <div className='form_data'>
                        <label htmlFor='email'>Email</label>
                        <input type='text'
                          onChange={add_data}
                          value={logdata.email}
                         name='email' id="email"/>
                    </div>
                    <div className='form_data'>
                        <label htmlFor='password'>Password</label>
                        <input type='password'
                         onChange={add_data}
                         value={logdata.password}
                         name='password' placeholder='At least 6 characters' id="password"/>
                    </div>
                    <button className='signin_btn'>Continue</button>
                </form>
                 </div>
                 <div className='create_accountinfo'>
                    <p>New to ZIUM</p>
                   <NavLink to="/register"> <button>Create Account </button></NavLink>
                 </div>
        </div>
    </section>
    </>
  );
}

export default Signin;
