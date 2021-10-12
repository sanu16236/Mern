import React, { useEffect, useState } from 'react';
import phone from '../image/phone.png';
import email from '../image/email.png';
import address from '../image/address.png';

export const Contact = () => {

    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userContact();

    }, []);

    // handle contact form inputs
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    // contact form data
    const contactForm = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData;
        const res = await fetch('/contact', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if (!data) {
            console.log("message not sent");
        } else {
            alert("message sent");
            setUserData({ ...userData, message: "" });
        }
    }

    return (
        <>
            <section className="main-contact bg-light">
                <div className="row m-0">
                    <div className="contact col-lg-10 mt-4 offset-lg-1">
                        <div className="contact-info-item shadow">
                            <img src={phone} alt="phone" />
                            <div>
                                <h4>Phone</h4>
                                <p>+91 82 9265 7637 </p>
                            </div>
                        </div>

                        <div className="contact-info-item shadow">
                            <img src={email} alt="phone" />
                            <div>
                                <h4>Email</h4>
                                <p>sanu16236@gmail.com </p>
                            </div>
                        </div>

                        <div className="contact-info-item shadow">
                            <img src={address} alt="phone" />
                            <div>
                                <h4>Address</h4>
                                <p>Muzaffarpur, Bihar</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-0">
                    <div className="mt-5 col-lg-8 bg-white contact-form offset-2 shadow p-3">
                        <div className="contact-form-title">
                            <h3>Get in Touch</h3>
                        </div>
                        <form method="post">
                            <div className="my-3 d-flex justify-content-between align-items-center">
                                <input type="text" autoComplete="off" id="contact-name" name="name" placeholder="Your Name"
                                    onChange={handleInputs} value={userData.name} required />
                                <input type="email" autoComplete="off" id="contact-email" name="email" placeholder="Your Email"
                                    onChange={handleInputs} value={userData.email} required />
                                <input type="number" autoComplete="off" id="contact-number" name="phone" placeholder="Your Number"
                                    onChange={handleInputs} value={userData.phone} required />
                            </div>
                            <textarea name="contact-message"
                                onChange={handleInputs} value={userData.message} name="message" placeholder="Message" id="message" rows="8"></textarea>
                            <div>
                                <button type="submit" onClick={contactForm} className="cbtn">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Contact;
