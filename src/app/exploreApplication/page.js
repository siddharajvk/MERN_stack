"use client"
import { useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import NavBar from "../components/navbar/page";
import Table2 from "../components/table2/page";
import Table4 from "../components/table4/page";
import "./exploreApplication.css";

export default function ExplorApplication() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');
    const applicationIDs = searchParams.get('applicationIDs');
    const roles = searchParams.get('roles');
    const rolesArray = roles.split(',');
    const applicationIDsArray = applicationIDs.split(',');
    const [projectsData, setProjectsData] = useState([]);
    const [applicantsNames, setApplicantsNames] = useState([]);
    const [tableData, setTableData] = useState([{}]);
    const {data:session,status}=useSession();
    // const tableData={};

    const fetchNames = async () => {
        try {
            const response = await fetch('/api/fetchNames', {
                method: 'POST',
                body: JSON.stringify({ applicationIDs: applicationIDsArray }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            console.log(data);
            setApplicantsNames(data.userNames);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetchProjectDetails = async () => {
        try {
            const response = await fetch(`/api/getProjectDetail?projectID=${projectId}&status=0`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProjectsData(data.projectsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchProjectDetails();
        fetchNames();
    }, []);

    console.log('Fetched names:', applicantsNames);

    
    const combinedArray = applicantsNames.map((name, index) => {
        return {
            Name: name,
            Roles: rolesArray[index],
            applierID:applicationIDsArray[index]
        };
    });
    
    console.log(combinedArray);
    if(session){
        console.log("Domain NAems",projectsData.domainName)
        return (
            <div className="exploreApplicationMasterContainer">
                <div className="HeaderContainer">
                    <Header />
                </div>
    
                <div className="exploreApplicationContentContainer">
                <div className="navBarContainer">
                    <NavBar />
                </div>
    
                    <div className="ContentContainer">
                        <div className="DivHeader">
                            Project Details
                        </div>
                        <div className="ProjectFields">
                            <div className="Field">
                                <div style={{fontWeight:"bold"}}>
                                    Project Category-:
                                </div>
    
                                <div className="input">
                                    {projectsData.domainName ? projectsData.domainName.join(','):' '}
                                </div>
                            </div>
                            <div className="Field">
                                <div style={{fontWeight:"bold"}}x   >
                                    Project Category-:
                                </div>
    
                                <div className="input">
                                    {projectsData.categoryName}
                                </div>
                            </div>
                        </div>
                        <div style={{ "textAlign": "center" }}>
                            <h2>Current Team</h2>
                            <Table2
                                header1={"Name"}
                                header2={"Role"}
                                id1={"name"}
                                id2={"role"}
                                data={projectsData.teammates}
                            />
                        </div>
    
                        <div style={{ "textAlign": "center" }}>
                            <h2>Applications</h2>
                            <Table4
                                tableTitle={"Applicants"}
                                header1={"Name"}
                                header2={"Role"}
                                header3={""}
                                id1={"Name"}
                                id2={"Roles"}
                                id3={""}
                                data={combinedArray}
                            />
                        </div>
    
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                Please Login to Continue
            </div>
        )
    }
}
