"use client"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import NavBar from "../components/navbar/page";
import UserInfoComponent from "../components/userinfo/page";
import './userinfoPage.css';
import UpdateModal from "../components/updateModal/page";

const UserInfoPage = () => {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);

    const [isUpdatePop, setIsUpdatePop] = useState(false);
    const [modelTitle, setModelTitle] = useState("");
    const [modelData, setModelData] = useState([]);
    const [updateSubmitted, setUpdateSubmitted] = useState(false);

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

    useEffect(() => {
        fetchUserProfile();
    }, [session]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Please Login to Continue</div>;
    }

    const handlePopUpClose = () => {
        setIsUpdatePop(!isUpdatePop);
    }
    console.log("Adasdasd", userData);

    const handleLinkUpdate = () => {
        setIsUpdatePop(!isUpdatePop);
        setModelTitle("Update Links");
        setModelData(userData.links);
    }

    const handleSkillUpdate = () => {
        setIsUpdatePop(!isUpdatePop);
        setModelTitle("Update skills");
        setModelData(userData.skills);
    }

    const handleUpdateSubmitted = async () => {
        setIsUpdatePop(false); // Close modal
        setUpdateSubmitted(!updateSubmitted);
        fetchUserProfile();
    }




    return (
        <div className="MasterModal">
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
                            {userData ? (
                                userData.role === 0 ? (
                                    <UserInfoComponent
                                        userid={"21BCE0717"}
                                        email={userData.email}
                                        school={userData.school}
                                        branch={userData.branch}
                                        degree={userData.degree}
                                        skills={userData.skills}
                                        links={userData.links}
                                        name={userData.name}
                                        skillUpdate={handleSkillUpdate}
                                        linkUpdate={handleLinkUpdate}
                                        canUpdate={1}
                                    />
                                ) : (
                                    <h1>sdfsfd</h1>
                                )
                            ) : (
                                <div>Loading user data...</div>
                            )}
                        </div>
                    </div>
                </div>
                
            </div>
            {isUpdatePop &&  <div className="Modal"><UpdateModal onClose={handlePopUpClose} modelTitle={modelTitle} data={modelData} userID={userData.userID} updateSubmit={handleUpdateSubmitted} /></div>}
        </div>
    );
};

export default UserInfoPage;
