"use client"
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Table4 from "../../components/table4/page.js";
import "./findExperts.css";
import NavBar from "../../components/navbar/page";

const findStudents = () => {

    const [skills, setSkills] = useState([]);
    const [school, setschool] = useState("");
    const [department, setdepartment] = useState("");
    const [userName, setName] = useState("");
    const [usersData,setUsersData] = useState([]);
    const{data:session,status}=useSession()

    const handleFindButtonClick = async () => {
        console.log("Find button clicked", projectID);
        try {
            const response = await fetch('/api/findmembers/student', {
                method: 'POST',
                body: JSON.stringify({ userName, skills:[skills], school, department}),
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
                    <NavBar />
                </div>
                    <div className="ContentContainer">
                        <div className="ContainerHeader">
                            Find Projects
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
                                    <label htmlFor="projectID">school:</label>
                                    <input
                                        type="text"
                                        id="projectID"
                                        name="projectID"
                                        value={school}
                                        onChange={(e) => setschool(e.target.value)}
                                        style={{ "marginLeft": "10px", "borderRadius": "5px" }}
                                    />
                                </div>
    
                                <div>
                                    <label htmlFor="domain">department:</label>
                                    <input
                                        type="text"
                                        id="domain"
                                        name="domain"
                                        value={department}
                                        onChange={(e) => setdepartment(e.target.value)}
                                        style={{ "marginLeft": "10px", "borderRadius": "5px" }}
                                    />
                                </div>
                            </div>
                            <button onClick={handleFindButtonClick}>Find</button>
                        </div>
                        <Table4 
                        tableTitle={"Students"}
                        header1={"Name"}
                        header2={"department"}
                        header3={"School"}
                        id1={"name"}
                        id2={"school"}
                        id3={"department"}
                        data={usersData.users}
                        />
                    </div>
    
                </div>
            </div>
        )
    }
    else{
        return (
            <div>
              Please Login to Continue
            </div>
          )
    }
}

export default findStudents;