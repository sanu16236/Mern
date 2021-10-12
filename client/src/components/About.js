import React, { useState, useEffect } from 'react';
import profile from '../image/profile.jpg';
import aboutPic from '../image/man.jpg';
import { useHistory } from 'react-router-dom';

export const About = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push("/login");
        }
    }

    useEffect(() => {
        callAboutPage();

    }, [])

    return (
        <>
            <div className="container-fluid pt-5 bg-light">
                <form action="" method="post" className="bg-white mx-auto w-75 shadow p-3">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={userData.name == 'devil' ? profile : aboutPic} alt="profile" width="180" height="200" />
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className="mt-3 mb-4 ranking">RANKINGS: <span>1/10</span></p>

                                {/* tabs */}

                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                                    </li>

                                </ul>

                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="button" className="profile-edit" value="Edit Profile" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        {/* side url */}
                        <div className="col-md-4">
                            <div className="work-link">
                                <p>WORK LINK</p>
                                <a href="http://">Youtube</a><br />
                                <a href="http://">Instagram</a><br />
                                <a href="http://">Facebook</a><br />
                                <a href="http://">LinkedIn</a><br />
                                <a href="http://">Website</a><br />
                                <a href="http://">Software Engineer</a>
                            </div>
                        </div>
                        <div className="col-md-8 pl-5">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>USER ID </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-primary">8900292058 </p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Name </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-primary">{userData.name} </p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Email </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-primary" >{userData.email} </p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Phone </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-primary" >{userData.phone} </p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-primary" >{userData.work}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default About;
