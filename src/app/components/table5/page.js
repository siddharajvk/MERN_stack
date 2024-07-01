import { useRouter } from 'next/navigation';
import React from 'react';
import "./table5.css";

const Table5 = ({ tableTitle, header1, header2, header3, header4, data, id1, id2, id3, id4 }) => {
    const router = useRouter();

    const handleExploreClick = (projectId) => {
        console.log('Navigating to:', projectId); // Log project ID for debugging

        if (tableTitle === "On Going Projects") {
            // Navigating to explore page with project ID as query parameter
            router.push(`/myProjects/explore?projectId=${projectId}&status=0&teammates=1`);
        } else if (tableTitle === "Projects") {
            router.push(`/discoverProjects/exploreDiscovProject?projectId=${projectId}&status=0&teammates=0`);
        } else if (tableTitle === "Completed Projects") {
            router.push(`/myProjects/explore?projectId=${projectId}&status=1&teammates=1`);
        }
    }

    return (
        <main>
            <div className="table-container">
                <table className="project-table">
                    <caption><h1>{tableTitle}</h1></caption>
                    <thead>
                        <tr>
                            <th>{header1}</th>
                            <th>{header2}</th>
                            <th>{header3}</th>
                            <th>{header4}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5">No projects to display</td>
                            </tr>
                        ) : (
                            data.map((d, index) => (
                                <tr key={index}>
                                    <td>{d[id1]}</td>
                                    <td>{d[id2]}</td>
                                    <td>{d[id3]}</td>
                                    <td>{d[id4]}</td>
                                    <td><button onClick={() => handleExploreClick(d.projectID)}>Explore</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Table5;
