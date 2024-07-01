"use client"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import NavBar from "../components/navbar/page";
import UserInfoComponent from "../components/userinfo/page";
import './userinfoPage.css';

const UserInfoPage = () => {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (session?.user?.id) {
                try {
                    const response = await fetch('/api/getUserProfile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userID: session.user.id }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    setUserData(data.user); // Assuming data.user contains user profile details
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };

        fetchUserProfile();
    }, [session]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Please Login to Continue</div>;
    }

    return (
        <div className="userinfoPageMasterContainer">
            <div style={{ position: "fixed", zIndex: 5, width: "100%" }}>
                <Header />
            </div>

            <div className="userinfoPageContentContainer">
                <div className="navBarContainer">
                    <NavBar />
                </div>

                <div className="SpotLightContainer">
                    <div className="SpotLightContainerHeader">
                        <span className="headerSpotlight">Profile</span>
                    </div>

                    <div className="displayUserProfile">
                        {userData && (
                            <UserInfoComponent
                                userid={userData.id}
                                email={userData.email}
                                school={userData.school}
                                branch={userData.branch}
                                degree={userData.degree}
                                skills={userData.skills}
                                links={userData.links}
                                name={userData.name}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfoPage;
