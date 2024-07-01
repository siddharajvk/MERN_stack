"use client"
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Header from "../components/layout/Header.js";
import Table5 from "../components/table5/page";
import "./discoverProject.css";

const DiscoverProject = () => {
    // State variables for input data
    const [projectName, setProjectTitle] = useState("");
    const [categoryName, setCategory] = useState("");
    const [projectID, setProjectID] = useState("");
    const [domainName, setDomain] = useState("");
    const [projectsData,setProjectsData]=useState([]);
    const {data:session,status}=useSession();
    const handleFindButtonClick = async () => {
        console.log("Find button clicked",projectID);
        try {
            const response = await fetch('/api/projects/filterProjects', {
                method: 'POST',
                body: JSON.stringify({projectID,projectName,categoryName: [categoryName],domainName:[domainName]}),
                headers:{
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();
            setProjectsData(data);
            console.log('Fetched projects:', data);
            // Handle the fetched data as needed
        } catch (error) {
            console.error('Error fetching projects:', error.message);
            // Handle errors or show an error message to the user
        }
    };
    
    if(session){
        return (
            <div className="discoverProjectMasterContainer">
                <div className="HeaderContainer">
                    <Header />
                </div>
    
                <div className="navBar">
                    Bar
                </div>
    
                <div className="showProjectsContainer">
                    <div className="ContainerHeader">
                        Find Projects
                    </div>
    
                    <div className="FindBlock">
                        <div className="Row">
                            <div>
                                <label htmlFor="projectTitle">Project Title:</label>
                                <input
                                    type="text"
                                    id="projectTitle"
                                    name="projectTitle"
                                    value={projectName}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    style={{"marginLeft": "10px", "borderRadius": "5px"}}
                                />
                            </div>
    
                            <div>
                                <label htmlFor="category">Category:</label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={categoryName}
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{"marginLeft": "10px", "borderRadius": "5px"}}
                                />
                            </div>
                        </div>
    
                        <div className="Row">
                            <div>
                                <label htmlFor="projectID">Project ID:</label>
                                <input
                                    type="text"
                                    id="projectID"
                                    name="projectID"
                                    value={projectID}
                                    onChange={(e) => setProjectID(e.target.value)}
                                    style={{"marginLeft": "10px", "borderRadius": "5px"}}
                                />
                            </div>
    
                            <div>
                                <label htmlFor="domain">Domain:</label>
                                <input
                                    type="text"
                                    id="domain"
                                    name="domain"
                                    value={domainName}
                                    onChange={(e) => setDomain(e.target.value)}
                                    style={{"marginLeft": "10px", "borderRadius": "5px"}}
                                />
                            </div>
                        </div>
                        <button onClick={handleFindButtonClick}>Find</button>
                    </div>
    
                    <div className="TeammatesTable">
                         <Table5 
                            tableTitle={"Projects"}
                            header1={"Project Name"}
                            header2={"Project ID"}
                            header3={"Domain"}
                            header4={"Category"}
                            data={projectsData}
                            id1={"projectName"}
                            id2={"projectID"}
                            id3={"domainName"}
                            id4={"categoryName"}
                         />
                    </div>
                </div>
            </div>
        );
    }
    else{
        return (
            <div>
                Please Login to Continue
            </div>
        )
    }
    
};

export default DiscoverProject;
