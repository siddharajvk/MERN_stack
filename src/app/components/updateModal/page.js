"use client"
import React, { useState } from "react";
import "./updateModal.css";

const predefinedSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Angular",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "PHP",
];

const UpdateModal = ({ onClose, modelTitle, data,userID,updateSubmit }) => {
    const [skills, setSkills] = useState(data);
    const [newSkill, setNewSkill] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewSkill(value);
        if (value === "") {
            setSuggestions([]);
        } else {
            setSuggestions(predefinedSkills.filter((skill) => skill.toLowerCase().includes(value.toLowerCase())));
        }
    };

    const handleAddSkill = (skill) => {
        setSkills([...skills, skill]);
        setNewSkill("");
        setSuggestions([]);
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            let flag;
            if(modelTitle==="Update Links"){
                flag=0;
            }else{
                flag=1;
            }
            const response=await fetch("/api/updateProfile",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({data:skills,flag,userID})
            });

            const data=await response.json();
            if (data.success){
                onClose();
                updateSubmit();
            }
        }catch (error) {
            console.error("An error occurred:", error);
        }   
    }

    return (
        <div className="card">
            <div className="card-header">
                {modelTitle}
                <button onClick={onClose}>Close</button>
            </div>
            <div className="card-body">
                <input
                    type="text"
                    placeholder="Enter new skill"
                    value={newSkill}
                    onChange={handleInputChange}
                />
                {/* {suggestions.length > 0 && ( */}
                    <div className="suggestions">
                        <ul>
                            {suggestions?.map((suggestion, index) => (
                                <li key={index} onClick={() => handleAddSkill(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                {/* )} */}
                <button onClick={() => handleAddSkill(newSkill)}>Add</button>
                <table>
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills?.map((skill, index) => (
                            <tr key={index}>
                                <td>{skill}</td>
                                <td>
                                    <button onClick={() => handleDeleteSkill(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{"display":"flex","justifyContent":"center","alignItems":"center","marginTop":"5%"}}>
                <button onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    );
};

export default UpdateModal;
