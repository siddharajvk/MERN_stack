"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header.js";
import ShowProject from "../../components/showProject/page.js";
import Table2 from "../../components/table2/page.js";
import Table4 from "../../components/table4/page.js";
import './explore.css';
import NavBar from "../../components/navbar/page.js";

const Explore = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [projects, setProjectsData] = useState(null);
    const [applyFor, setApplyFor] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const applierID = session?.user?.id;
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');
    const statusParam = searchParams.get('status');
    const teammates = searchParams.get('teammates');

    useEffect(() => {
        const fetchData = async () => {
            if (projectId && statusParam) {
                try {
                    console.log(status);
                    const response = await fetch(`/api/getProjectDetail?projectID=${projectId}&status=${statusParam}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log('Fetched data:', data);
                    setProjectsData(data.projectsData);  // Check the structure of data.projectsData
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
        fetchData();
    }, [projectId, statusParam]);

    const handleApplyButtonClick = async () => {
        console.log("button clicked");
        try {
            const response = await fetch('/api/saveApplication', {
                method: 'POST',
                body: JSON.stringify({ applyFor, coverLetter, applierID, projectId }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            if (data.success) {
                console.log('Application saved successfully:', data.message);
                // Show a success message to the user
            } else {
                console.error('Failed to save application:', data.message);
                // Show an error message to the user
            }
        } catch (error) {
            console.error('Error saving application:', error.message);
            // Show an error message to the user
        }
    }

    if (status === 'loading') return <div>Loading...</div>;
    if (!session) return <div>Please Login to Continue</div>;

    return (
        <div className="ExploreMasterContainer">
            <div className="HeaderContainer">
                <Header />
            </div>

            <div className="ExploreContentContainer">
            <div className="navBarContainer">
                    <NavBar />
                </div>

                <div className="ShowInfoContainer">
                    <div className="PageHeader">Project Details</div>
                    {projects ? (
                        <ShowProject
                            projectTitle={projects.projectName}
                            projectID={projects.projectID}
                            Category={projects.categoryName}
                            Domain={projects.domainName}
                            Description={"THIS is the description"}
                        />
                    ) : (
                        <div>Loading project details...</div>
                    )}

                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"0px",width:"100%",fontSize:"35px",fontWeight:"bold",marginTop:"1%",background:"lightgrey"}}>
                        Current teammates
                    </div>
                    
                    {teammates === "1" ? (
                        <div className="TeamDetails">
                            <Table4
                                tableTitle={"Team Details"}
                                header1={"Reg number"}
                                header2={"Name"}
                                header3={"Role"}
                                data={projects?.teammates || []}
                                id1={"teammateID"}
                                id2={"name"}
                                id3={"role"}
                            />
                        </div>
                    ) : (
                        <div className="RequirementDetails">
                            <Table2
                                data={projects?.requirements || []}
                                header1={"Role"}
                                header2={"Description"}
                                id1={"labeltag"}
                                id2={"labeldescription"}
                            />

                            <div className="ApplyDiv">
                                <div className="ApplyDivHeader">Apply for project</div>

                                <div className="InputDiv">
                                    <div style={{ fontSize: "3vh", display: "flex", flexDirection: "row", columnGap: "1%", marginTop: "1%" }}>
                                        Apply for
                                        <input
                                            type="text"
                                            style={{ borderRadius: "5px", width: "20%", height: "20px", border: "solid 1px" }}
                                            value={applyFor}
                                            onChange={(e) => setApplyFor(e.target.value)}
                                        />
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", rowGap: "3%" }}>
                                        Cover letter
                                        <input
                                            type="text"
                                            style={{ borderRadius: "5px", width: "90%", height: "20vh", border: "solid 1px" }}
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button style={{ margin: "1%", width: "20vh" }} onClick={handleApplyButtonClick}>Apply</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Explore;
