import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Table4 from "../../components/table4/page.js";
import "./myApplication.css";

export default function MyApplications() {
    const [projectNames, setProjectNames] = useState([]);
    const [applications, setApplications] = useState([]);
    const { data: session, status } = useSession();
    const applierID = session?.user?.id;

    // Function to fetch project names based on project IDs
    const fetchProjectNames = async (projectIDs) => {
        try {
            const response = await fetch('/api/getProjectNameType', {
                method: 'POST',
                body: JSON.stringify({ projectIDs }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch project names');
            }

            const projectNamesData = await response.json();
            setProjectNames(projectNamesData);
        } catch (error) {
            console.error('Error fetching project names:', error.message);
        }
    };

    // Function to fetch applications based on some criteria
    const fetchApplications = async () => {
        try {
            const response = await fetch('/api/applications/my', {
                method: 'POST',
                body: JSON.stringify({ applierID }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }

            const applicationsData = await response.json();
            setApplications(applicationsData.data);

            // Extract project IDs from applicationsData
            const projectIDs = applicationsData.data.map(({ projectID }) => projectID);

            // Fetch project names for the extracted projectIDs
            await fetchProjectNames(projectIDs);
        } catch (error) {
            console.error('Error fetching applications:', error.message);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    useEffect(() => {
        if (applications.length > 0 && projectNames.length > 0) {
            const updatedApplications = applications.map(app => {
                const project = projectNames.find(p => p.projectID === app.projectID);
                return {
                    ...app,
                    projectName: project ? project.projectName : 'Unknown',
                    number: app.applications.length  // Assuming 'applications' here represents an array in your data structure
                };
            });
            setApplications(updatedApplications);
        }
    }, [applications, projectNames]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Please Login to Continue</div>;
    }

    return (
        <div className="myApplicationsMasterContainer">
            <div className="HeaderContainer">
                <Header />
            </div>

            <div className="myApplicationsContentContainer">
                <div className="navBar">
                    Bar
                </div>

                <div className="TableContainer">
                    <div className="TableHeader">
                        My Applications
                    </div>

                    <div className="ApplicationsTable">
                        <Table4
                            tableTitle={"Applications"}
                            header1={"Project ID"}
                            header2={"Project Name"}
                            header3={"No of Applications"}  
                            data={applications}
                            id1={"projectID"}
                            id2={"projectName"}
                            id3={"number"}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
