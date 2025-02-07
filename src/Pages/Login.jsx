import React, { useEffect, useState } from 'react'
import Layout from '../pages/Layout'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/config'
import { AuthToken } from '../store'
import { useAtom } from 'jotai'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useAtom(AuthToken)

    useEffect(() => {
        if (token) return navigate('/recipes')
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/auth/login', { email, password })
            if (response.data.code === 200) {
                setToken(response.data.token);
                navigate("/recipes");
            }
        } catch (error) {
            if (error === undefined) {
                alert("Email or password incorrect")
                return { message: 'Check your internet connection and try again.', type: 'failure' }
            }
            return { message: error.data.message }
        }
    }

    return (
        <Layout>
            <div className='login-page'>
                <h1 className='h1'>Login</h1>
                <form className="form">
                    <input className='username' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='password' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='text-white' onClick={handleLogin}>LOGIN</button>
                    <Link className='button-link' to={'/register'}>Don't have an account? SignUp</Link>
                </form>
            </div>
        </Layout>

    )
}

export default Login