import { useRouter } from 'next/navigation';
import React from 'react';
import "./table4.css";

const Table4 = ({ tableTitle, header1, header2, header3, data, id1, id2, id3}) => {
    console.log("Combined array ",data);
    const router = useRouter();
    const handleExploreClick = (id) => {
      
        if (tableTitle === "Applications") {
            
            const applicationIDs = [];
            const roles = [];
            const index = data.findIndex(it => it.projectID === id);
            // console.log(index);
            for (let i = 0; i < data[index].number; i++) {
                applicationIDs[i] = data[index].applications[i].applierID;
                roles[i] = data[index].applications[i].role;
            }
            console.log(roles);
            router.push(`/exploreApplication?projectId=${id}&applicationIDs=${applicationIDs}&roles=${roles}`);
            
        } else{
            router.push(`/userinfoPage?userID=${id}`);
        }
    }

    console.log("Current team",data);

    return (
        <main>
            <div className="table-container">
                <table className="project-table">
                    {/* <caption><h1>{tableTitle}</h1></caption> */}
                    <thead>
                        <tr>
                            <th>{header1}</th>
                            <th>{header2}</th>
                            <th>{header3}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((d, index) => (
                                d[id2]!=' ' ? (
                                    <tr key={index}>
                                    <td>{d[id1]}</td>
                                    <td>{d[id2]}</td>
                                    <td>{d[id3]}</td>
                                    <td>
                                        <button onClick={() => handleExploreClick(tableTitle === "Team Details" ? d[id1] : (tableTitle === "Students" ? d["userID"] : (tableTitle === "Applications" ? d.projectID : (tableTitle==="Applicants" ? d.applierID:null))))}>
                                            Explore
                                        </button>
                                    </td>
                                </tr>
                                ) : null   
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No Table5 projects to display</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Table4;
