"use client"
import React, { useState } from "react";
import Image from "next/image";
import './navbar.css'; // Changed NavBar.css import path
import vitlogo from "./vitlogo.jpg"; 
import { useRouter } from "next/navigation";

export default function NavBar() {
    const router=useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleMainLinkClick = (event) => {
        const mainLink = event.currentTarget;
        mainLink.classList.toggle("active");
    };
let toggle = isOpen ? 'open' : '';
    return (
        <div className={`sidebar ${toggle}`}>
            <div className="SideNavBarField">
           <Image src={vitlogo} height={50} width={50} style={{marginLeft:"4rem"}} />
            </div>
            {/* <h2>My App</h2> */}
            <div className="SideNavBarField">
                <div className="mainLink" style={{ cursor:"pointer" }} onClick={()=>router.push('./userinfoPage')}>User info</div>
                <div className="subLinks">
                </div>
            </div>

            <div className="SideNavBarField">
                <div className="mainLink" onClick={handleMainLinkClick}>My projects  <Image /></div>
                <div className="subLinks">
                    <div onClick={()=>router.push('./myProjects/completed')}>Completed</div>
                    <div onClick={()=>router.push('./myProjects/onGoing')}>Ongoing</div>
                    {/* Add more subfields as needed */}
                </div>
            </div>

            <div className="SideNavBarField">
                <div className="mainLink" onClick={handleMainLinkClick}>Projects</div>
                <div className="subLinks">
                    <div onClick={()=>router.push('./hostProject')}>Host project</div>
                    <div onClick={()=>router.push('./discoverProjects')}>Find project</div>
                    {/* Add more subfields as needed */}
                </div>
            </div>

            <div className="SideNavBarField">
                <div className="mainLink" onClick={handleMainLinkClick}>Find teammates</div>
                <div className="subLinks">
                    <div onClick={()=>router.push('./findMembers/findStudents')}>Find students</div>
                    <div onClick={()=>router.push('./findMembers/findExperts')}>Find experts</div>
                    {/* Add more subfields as needed */}
                </div>
            </div>

            <div className="SideNavBarField">
                <div className="mainLink" onClick={handleMainLinkClick}>Applications</div>
                <div className="subLinks">
                    <div onClick={()=>router.push('./')}>Applied</div>
                    <div onClick={()=>router.push('./applications/recievedApplications')}>Received</div>
                    {/* Add more subfields as needed */}
                </div>
            </div>

            <div className="toggle-btn" onClick={handleToggle}>
                {isOpen ? 'Closeaaa' : 'Open'}
            </div>
        </div>
    );
}