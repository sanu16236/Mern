import React, { useState,useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import loginimg from '../image/login.svg';

import { userContext } from '../App';

export const Login = () => {

    const { state, dispatch } = useContext(userContext);

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        e.target.value = "loading...";

        const res = await fetch('/signin', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = res.json();
        if (res.status === 400 || !data) {
            e.target.value = "Sign In";
            alert("Invalid Credintial");
        } else {
            dispatch({ type: 'USER', payload: true });
            e.target.value = "Sign In";
            alert("login successful");
            history.push('/');
        }
    }

    return (
        <>
            <section className="signup">
                <div className="row bg-white w-75 p-5 shadow my-3">
                    <div className="signup-image col-12 col-md-5">
                        <figure>
                            <img src={loginimg} className="img-fluid" alt="signup image" />
                        </figure>
                        <NavLink to="/signup" className="alreadyRegistered">Create an account ?</NavLink>
                    </div>
                    <div className="col-12 col-md-7 text-start">
                        <h2>Sign In</h2>
                        <form method="post" className="mt-3">

                            <div className="form-group mb-3">
                                <label className="pe-2" htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="pe-2" htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your Password" />
                            </div>
                            <div className="mt-3">
                                <input type="submit" value="Sign In" className="cbtn" id="signin" name="signin" onClick={loginUser} />
                            </div>
                        </form>

                    </div>
                </div>
            </section>

        </>
    )
}
export default Login;
