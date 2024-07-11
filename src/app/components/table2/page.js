"use client"
import React from 'react';
import "./table2.css";

const Table2 = ({ data, header1, header2, id1, id2 }) => {

    console.log("Projects Data", data);
    return (
        <main>
            <div className="table-container">
            
                <table className="project-table">
                    <caption></caption>
                    <thead>
                        <tr>
                            <th>{header1}</th>
                            <th>{header2}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((d, index) => (
                                d[id1] != ' ' && d[id2] != null ? (
                                    <tr key={index}>
                                        <td>{d[id1]}</td>
                                        <td>{d[id2]}</td>
                                    </tr>
                                ) : null
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No requirements specified</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Table2;
