import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../../redux/actions/auth';
import banner from '../../images/banner.svg';

import './Auth.scss';

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: ''
}
function Register() {
    const [user, setUser] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(actions.register(user, history));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="image-container">
                    <img
                        src={banner}
                        alt=""
                    />
                </div>
                <div className="form-container">
                    <div className="form-signup-wrapper">
                        <div className="form-title">Sign Up</div>
                        <form onSubmit={handleSubmit}>
                            <div className="auth-input">
                                <label>Firstname</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={user.firstname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="auth-input">
                                <label>Lastname</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={user.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="auth-input">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="auth-input">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="auth-input">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmpassword"
                                    value={user.confirmpassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="btn-submit-form">
                                <button id="btn-submit">Sign Up</button>
                            </div>
                        </form>
                        <div className="auth-status">
                            <span>You have an account? <Link to='/login'>Sign In</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
