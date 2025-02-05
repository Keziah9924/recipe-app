import React, { useState } from 'react'
import Layout from '../pages/Layout'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/config'

const Register = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await API.post('/auth/verify-account', { email, firstname })

            if (response.data.code === 200) {
                const newUserData = {
                    firstname,
                    lastname,
                    username,
                    email,
                    password
                }
                console.log(response)
                localStorage.setItem("newUserData", JSON.stringify(newUserData))
                localStorage.setItem("otpToken", response.data.data)
                navigate('/verify')
            }
        } catch (error) {
            if (error === undefined) {
                return { message: 'Check your internet connection and try again.', type: 'failure' }
            }
            return
        }
    }
    return (
        <Layout>
            <div className='register-section'>
                <h1 className='register'>Register</h1>
                <form className='register-form'>
                    <input type="text" value={firstname} placeholder='Firstname' className='input-section' onChange={(e) => setFirstname(e.target.value)} />
                    <input type="text" value={lastname} placeholder='Lastname' className='input-section' onChange={(e) => setLastname(e.target.value)} />
                    <input type="text" value={username} placeholder='Username' className='input-section' onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" value={email} placeholder='Email' className='input-section' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder='Password' className='input-section' onChange={(e) => setPassword(e.target.value)} />
                    <button className='sign-btn' onClick={handleRegister}>SIGN UP</button>
                    <Link className='log-link' to={'/login'}>Already have an account? Login</Link>
                </form>
            </div>
        </Layout>
    )
}

export default Register