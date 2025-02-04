import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <Layout>
        <div className='register-section'>
            <h1 className='register'>Register</h1>
            <form className='register-form'>
            <input  type="text" placeholder='Firstname' className='input-section' />
                  <input type="text" placeholder='Lastname' className='input-section' />
                  <input type="text" placeholder='Username' className='input-section' />
                  <input type="email" placeholder='Email' className='input-section' />
                  <input type="password" placeholder='Password' className='input-section' />
                  <button className='sign-btn'>SIGN UP</button>
                  <Link className='log-link' to={'/login'}>Already have an account? Login</Link>
            </form>

        </div>
    </Layout>
  )
}

export default Register