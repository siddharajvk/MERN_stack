"use client"
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Explore from "../../myProjects/explore/page";
const ExploreDiscoverProjectPage=()=>{
    const [applyFor,setApplyFor]=useState("");
    const {data:session,status}=useSession();
    if(session){
        return(
            <div>
                    <Explore />
            </div>    
        )
    }
    else{
        return (
            <div>
                Please login to Continue
            </div>
        )
    }
}

export default ExploreDiscoverProjectPage;