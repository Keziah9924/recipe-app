import React, {useState} from 'react'
import Layout from '../components/Layout'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault();
    if(username === 'mimi' && password === 'mimikay123'){
      navigate("/dashboard")
    }else{
      alert('Username or password incorrect')
    }
  }

  return (
    <Layout>
      <div className='login-page'>
        <h1>Login</h1>
        <form className="form">
          <input className='username' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className='password' type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='text-white' onClick={handleLogin}>LOGIN</button>
                    <Link className='button-link' to={'/register'}>Don't have an account? SignUp</Link>
        </form>

      </div>
    </Layout>
   
  )
}

export default Login