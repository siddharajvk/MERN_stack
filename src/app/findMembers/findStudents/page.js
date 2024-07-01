"use client"
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Table4 from "../../components/table4/page.js";
import "./findStudents.css";
const findStudents = () => {

    const [skills, setSkills] = useState([]);
    const [degree, setdegree] = useState("");
    const [branch, setbranch] = useState("");
    const [userName, setName] = useState("");
    const [usersData,setUsersData] = useState([]);
    const{data:session,status}=useSession()
    const handleFindButtonClick = async () => {
        console.log("Find button clicked", projectID);
        try {
            const response = await fetch('/api/findmembers/student', {
                method: 'POST',
                body: JSON.stringify({ userName, skills, degree, branch}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setUsersData(data);
            console.log('Fetched student Data:', data);
            // Handle the fetched data as needed
        } catch (error) {
            console.error('Error fetching student data:', error.message);
            // Handle errors or show an error message to the user
        }
    }

    if(session){
        return (
            <div className="findMembersMasterContainer">
                <div style={{ "position": "fixed", "zIndex": "5", "width": "100%" }}>
                    <Header />
                </div>
    
                <div className="findMembersContentContainer">
    
    
                    <div className="navBarContainer">
                        sd
                    </div>
                    <div className="ContentContainer">
                        <div className="ContainerHeader">
                            Find Experts
                        </div>
    
    
                        <div className="FindBlock">
                            <div className="Row">
                                <div>
                                    <label htmlFor="projectTitle">Skills:</label>
                                    <input
                                        type="text"
                                        id="projectTitle"
                                        name="projectTitle"
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        style={{ "marginLeft": "10px", "borderRadius": "5px" }}
                                    />
                                </div>
    
                                <div>
                                    <label htmlFor="category">Name:</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={userName}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{ "marginLeft": "10px", "borderRadius": "5px" }}
                                    />
                                </div>
                            </div>
    
                            <div className="Row">
                                <div>
                                    <label htmlFor="projectID">Degree:</label>
                                    <input
                                        type="text"
                                        id="projectID"
                                        name="projectID"
                                        value={degree}
                                        onChange={(e) => setdegree(e.target.value)}
                                        style={{ "marginLeft": "10px", "borderRadius": "5px" }}
                                    />
                                </div>
    
                                <div>
                                    <label htmlFor="domain">Branch:</label>
                                    <input
                                        type="text"
                                        id="domain"
                                        name="domain"
                                        value={branch}
                                        onChange={(e) => setbranch(e.target.value)}
                                        style={{ "marginLeft": "10px", "borderRadius": "5px" }}
                                    />
                                </div>
                            </div>
                            <button onClick={handleFindButtonClick}>Find</button>
                        </div>
                        <Table4 
                        tableTitle={"Students"}
                        header1={"Name"}
                        header2={"Branch"}
                        header3={"School"}
                        id1={"name"}
                        id2={"degree"}
                        id3={"branch"}
                        data={usersData.users}
                        />
                    </div>
    
                </div>
            </div>
        )
    }
    else{
        <div>
        Please Login to Continue
      </div>
    }
}

export default findStudents;