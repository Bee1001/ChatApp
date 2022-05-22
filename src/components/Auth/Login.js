import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../../redux/actions/auth';
import banner from '../../images/banner.svg';

import Notification from '../../hooks/useNotification';

import './Auth.scss';

const initialState = {
    email: '',
    password: ''
}
function Login() {
    const { error } = useSelector(state => state.auth);

    const [user, setUser] = useState(initialState);
    const [submit, setSubmit] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: ''
    })

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(actions.login(user, history));
        setSubmit(!submit);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    useEffect(() => {
        if(error) {
            setNotify({
                isOpen: true,
                message: error,
                type: 'fail'
            })
            setTimeout(() => {
                setNotify({
                    isOpen: false,
                    message: '',
                    type: 'none'
                })
            }, 3000)
        }
    }, [submit])

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="image-container">
                    <img src={banner} alt="Banner" />
                </div>
                <div className="form-container">
                    <div className="form-wrapper">
                        <div className="form-title">Sign In</div>
                        <form onSubmit={handleSubmit}>
                            <div
                                className="auth-input"
                            >
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                />
                                {/* <div className="icon-error">
                                    <i className="ri-error-warning-line"></i>
                                </div> */}
                            </div>
                            <div
                                className="auth-input"
                            >
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                />
                                {/* <div className="icon-error">
                                    <i className="ri-error-warning-line"></i>
                                </div> */}
                            </div>
                            <div className="btn-submit-form">
                                <button id="btn-submit">Login</button>
                            </div>
                        </form>
                        <div className="auth-status">
                            <span>Don't have any account? <Link to='/register'>Register</Link></span>
                        </div>
                        {/* <Link
                            to="/auth/google"
                            style={{ textDecoration: 'none' }}
                        >
                            <div
                                className="login-with-gg-container"
                                onClick={login}
                            >
                                <div className="login-with-gg-icon">
                                    <FcGoogle className="google-icon"/>
                                </div>
                                <div className="login-with-gg-text">
                                    <span>Sign in with Google</span>
                                </div>
                            </div>
                        </Link> */}
                    </div>
                </div>
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}

export default Login;
