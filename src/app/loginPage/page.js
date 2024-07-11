"use client"
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import './loginPage.css';

export default LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const HandleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const result = await signIn("credentials", {
                redirect: false, // Ensure no redirect during server-side rendering
                username,
                password
            });

            if (result.error) {
                console.error(result.error);
    
                return; // Exit early if there's an error
            }

            if (result.ok) {
                //console.log(username);
                router.push('/homePage');
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
        useEffect(() => {
            setIsClient(true);
        }, []);
    }


    if(isClient){

    return (
        <div className="Master">
            <div className="header" style={{ height: "10vh", width: "100%" }}>
                <Header />
            </div>
            <div className="wrapper">
                <div className="loginDiv">
                    <div className="blueLine"></div>
                    <div className="loginTextDiv">
                        <p className="loginHeader">Login</p>
                    </div>
                </div>
                <div className="inputDiv">
                    <div className="form">
                        <form onSubmit={HandleSubmit}>
                            <div className="inputBox">
                                <input
                                    type="text"
                                    className="inputField"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="password"
                                    className="inputField"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="captcha">
                                <input
                                    type="text"
                                    className="inputField"
                                    id="Captcha"
                                    name="Captcha"
                                    placeholder="Enter Captcha"
                                    required
                                    value={captcha}
                                    onChange={(e) => setCaptcha(e.target.value)}
                                />
                            </div>
                            <div className="submitButton">
                                <button type="submit" className="Submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="forgot">
                        <div className="forgot-Password">
                            <a href="#">Forgot Password</a>
                        </div>
                        <div className="forgot-login">
                            <a href="#">Forgot LoginID</a>
                        </div>
                        <div className="Go-to-home">
                            <a href="#">Go To Home Page</a>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100%", backgroundColor: "black" }}>
                <Footer />
            </div>
        </div>
    )
}
}

