import React, { useState } from 'react';

const Signup = () => {
    const[udata,setUdata]=useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:""
    })
console.log(udata);
  return (
    <>
    <section>
        <div className='sign_container'>
            <div className='sign_header'>
                <img src='./logo192.png'alt='logo'/>
            </div>
            <div className='sign_form'>
                <form>
                    <h1>Register</h1>
                    <div className='form_data'>
                        <label htmlFor='fname'>Your Name</label>
                        <input type='text'
                        onChange={(e)=>setUdata({...udata,fname:e.target.value})} 
                        value={udata.fname}
                        name='fname' id="fname"/>
                    </div>
                    <div className='form_data'>
                        <label htmlFor='email'>Email</label>
                        <input type='text'onChange={(e)=>setUdata({...udata,email:e.target.value})} 
                        value={udata.email}
                         name='email' id="email"/>
                    </div>
                    <div className='form_data'>
                        <label htmlFor='number'>Mobile Number</label>
                        <input type='text'onChange={(e)=>setUdata({...udata,mobile:e.target.value})} 
                        value={udata.mobile}
                         name='mobile' id="mobile"/>
                    </div>
                    <div className='form_data'>
                        <label htmlFor='password'>Password</label>
                        <input type='password'onChange={(e)=>setUdata({...udata,password:e.target.value})} 
                        value={udata.password}
                        name='password' placeholder='At least 6 characters' id="password"/>
                    </div>
                    <div className='form_data'>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input type='cpassword'onChange={(e)=>setUdata({...udata,cpassword:e.target.value})} 
                        value={udata.cpassword}
                        name='cpassword'  id="cpassword"/>
                    </div>
                    <button className='signin_btn'>Continue</button>
                </form>
                 </div>
                
        </div>
    </section>
    </>
  );
}

export default Signup;
