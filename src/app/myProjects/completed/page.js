"use client"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Table5 from "../../components/table5/page";
import './CompletedProjects.css';
import Header from "../../components/layout/Header";
import NavBar from "../../components/navbar/page";

const CompletedProject = () => {
    const { data: session, status } = useSession();
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                try {
                    const userID = session.user.id; // Ensure userID is accessed correctly
                    const response = await fetch(`/api/myprojects/completed?userID=${userID}&status=1`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setProjectsData(data.projectsData);
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [session, status]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (status !== 'authenticated') {
        return <div>Please Login to Continue</div>;
    }

    return (
        <div className="MasterContainer">
            <div style={{ position: "fixed", zIndex: 5, width: "100%" }}>
                <Header />
            </div>

            <div className="NavBarAndContent">

                <div className="navBarContainer">
                    <NavBar />
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "100%" ,marginLeft:"4%",background:"",height:"115%"}}>
                    <div className="PageTitle">
                        <h1>Completed Projects</h1>
                    </div>

                    <Table5
                        key={projectsData.projectID}
                        tableTitle={"Completed Projects"}
                        header1={"Project Title"}
                        header2={"Project ID"}
                        header3={"Category"}
                        header4={"Department"}
                        data={projectsData}
                        id1={"projectName"}
                        id2={"projectID"}
                        id3={"categoryName"}
                        id4={"domainName"}
                    />
                </div>
            </div>

        </div>
    );
};

export default CompletedProject;
