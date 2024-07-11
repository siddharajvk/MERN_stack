"use client"
import React, { useState } from "react";
import './page.css';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleMainLinkClick = (event) => {
        const mainLink = event.currentTarget;
        mainLink.classList.toggle("active");
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <h2>My App</h2>
            <div className="SideNavBarField">
                <div className="mainLink" style={{ cursor: 'pointer' }} onClick={handleMainLinkClick}>Student info</div>
                <div className="subLinks">
                    <div>Student Details</div>
                    <div>Attendance</div>
                    <div>Grades</div>
                    {/* Add more subfields as needed */}
                </div>
            </div>

            <div className="SideNavBarField">
                <div className="mainLink" onClick={handleMainLinkClick}>My projects</div>
                <div className="subLinks">
                    <div>Completed</div>
                    <div>Ongoing</div>
        
                </div>
            </div>

            <div className="SideNavBarField">
                <div className="mainLink" onClick={handleMainLinkClick}>Projects</div>
                <div className="subLinks">
                    <div>Host project</div>
                    <div>Find project</div>
              
                </div>
            </div>

            <div className="SideNavBarField">
                <div className="mainLink" onClick={handleMainLinkClick}>Find teammates</div>
                <div className="subLinks">
                    <div>Find students</div>
                    <div>Find mentors</div>
                   
                </div>
            </div>

            <div className="SideNavBarField">
                <div className="mainLink" onClick={handleMainLinkClick}>Applications</div>
                <div className="subLinks">
                    <div>Applied</div>
                    <div>Received</div>
               
                </div>
            </div>

            <div className="toggle-btn" onClick={handleToggle}>
                {isOpen ? 'Close' : 'Open'}
            </div>
        </div>
    );
}
