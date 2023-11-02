import { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
const LOGIN_URL = '/users/auth'

function Login() {
    const { setAuth } = useContext(AuthContext)
    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            const accessToken = res?.data?.token
            const roles = res?.data?.roles

            setAuth(email, password, roles, accessToken)
            setEmail('')
            setPassword('')
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response.')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing email address or password.')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login failed.')
            }
            errRef.current.focus()
        }
    }

    return (
        <article className='p-4 flex justify-center items-center h-screen'>
            <section>
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
            </section>
            <section className='w-96 shadow-lg p-7 bg-slate-700 rounded-md'>
                <h3 className='text-2xl block text-center font-semibold'>Login</h3>
                <form onSubmit={handleSubmit}>
                    <hr className='mt-6' />
                    <section className='mt-3'>
                        <label for='email' className='block text-base mb-1'>Email Address:</label>
                        <input
                            type='email'
                            id='email'
                            ref={emailRef}
                            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-gray-950 rounded-md'
                            placeholder='your.name@example.com'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </section>

                    <section className='mt-3'>
                        <label for='password' className='block text-base mb-1'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md'
                            placeholder='********'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </section>

                    <section className='mt-1 flex justify-between items-center'>
                        <span>
                            <input type='checkbox' id='checkbox' className='mr-1' />
                            <label for='checkbox' className='text-sm'>Remember Me</label>
                        </span>
                        <span>
                            <Link to='/users/account-recovery' className='text-sm'>Forgot Password?</Link>
                        </span>
                    </section>
                    
                    <button className='mt-6 py-1 w-full bg-gray-800 text-slate-300 border-2 border-slate-500 font-semibold rounded-md'>
                        Log In
                    </button>
                </form>
                <section className='mt-1 flex justify-between items-center'>
                    <span></span>
                    <span>
                        <p className='mt-2 text-base'>
                            <Link to='/signup' className='text-sm text- font-semibold underline hover:no-underline'>
                                Sign Up
                            </Link>
                        </p>
                    </span>
                </section>
            </section>
        </article>
    )
}

export default Login