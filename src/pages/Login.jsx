import axios from 'axios'
import React, {useState} from 'react'
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import logo from '../assets/Padget.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] =useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post("https://fatp-api.onrender.com/api/auth/login",
                {email, password}
            );
            if(response.data.success && response.data.user.role === "admin"){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                navigate('/admin-dashboard')
            } else {
                setError("Unauthorized access")
            }
        } catch(error){
            if(error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Server Error")
            }
        }
    };

  return (
    <div 
    className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-white-600 from-50% to-gray-100 to-50% space-y-6'>
        {/*<h2 className='font-Doto text-5xl text-white'>Check Sheet Digitalization</h2>*/}
        <img src={logo} alt="CheckSheets Logo" className='h-10' />
        <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit}>
        
            <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700'>Email</label>
                <input type='email' 
                className='w-full px-3 py-2 border'
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                required>
                    
                </input>
            </div>

            <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700'>Password</label>
                <input type='password'
                className='w-fu11 px-3 py-2 border'
                 placeholder='Enter Password'
                 onChange={(e) => setPassword(e.target.value)}
                 required>

                 </input>
            </div>
            <div className='mb-4 flex items-center justify-between'>
                    <label className='inline-flex items-center'>
                        <input type='checkbox' className='form-checkbox'/>
                        <span className='ml-2 text-gray-700'></span>
                    </label>
                    <a href='#' className='text-custom-purple'>
                        Forgot password?
                    </a>
                </div>
                <div className='mb-4'>
                <button
                type='submit'
                className='w-full bg-custom-purple text-white py-2'>
                    Login
                </button>
                </div>
            
        </form>
        </div>
      
    </div>
  )
}

export default Login