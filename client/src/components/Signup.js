import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signup from '../image/signup.svg';

export const Signup = () => {

    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInput = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        e.target.value = "loading...";

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch('/register', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            e.target.value = "Sign up";
            alert(data.error);

        } else {
            e.target.value = "Sign up";
            alert("registered successfully");

            history.push('/Login')
        }
    }

    return (
        <>
            <section className="signup">
                <div className="row bg-white w-75 p-5 shadow my-3">
                    <div className="col-12 col-md-7 text-start">
                        <h2>Sign Up</h2>
                        <form method="post" className="me-5">
                            <div className="form-group mb-3">
                                <label className="pe-2" htmlFor="name"><i className="zmdi zmdi-account"></i></label>
                                <input type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInput} placeholder="Your Name" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="pe-2" htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInput} placeholder="Your Email" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="pe-2" htmlFor="phone"><i className="zmdi zmdi-phone"></i></label>
                                <input type="text" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInput} placeholder="Your Phone" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="pe-2" htmlFor="work"><i className="zmdi zmdi-face"></i></label>
                                <input type="text" name="work" id="work" autoComplete="off" value={user.work} onChange={handleInput} placeholder="Your work" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="pe-2" htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInput} placeholder="Your Password" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="pe-2" htmlFor="cpassword"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInput} placeholder="Confirm Password" />
                            </div>
                            <div className="mt-3">
                                <input type="submit" value="Sign Up" className="cbtn" id="register" name="register" onClick={postData} />
                            </div>
                        </form>

                    </div>
                    <div className="signup-image col-12 col-md-5">
                        <figure>
                            <img src={signup} className="img-fluid" alt="signup image" />
                        </figure>
                        <NavLink to="/Login" className="alreadyRegistered">I am already registered ?</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Signup;
