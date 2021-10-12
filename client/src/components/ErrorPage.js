import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>We are sorry, Page not found</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur nam eligendi, dicta ab iure distinctio.</p>
                    <NavLink to="/">Back to Home</NavLink>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;
