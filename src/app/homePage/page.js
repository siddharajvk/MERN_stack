"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from "react";
import Header from "../components/layout/Header";
import NavBar from "../components/navbar/page.js";
import './HomepageSpotlight.css';


const HomepageSpotlight = () => {
  const router = useRouter()
  const{data:session,status}=useSession()
  const handle= ()=>{
    router.push('/myProjects/onGoing');
  }

  if(session){
    return (

      <div className="homePageMasterContainer">
        <div style={{ "position": "fixed", "zIndex": "5", "width": "100%" }}>
          <Header />
        </div>
  
  
        <div className="homePageContentContainer">
  
          <div className="navBarContainer">
            <NavBar />
          </div>
  
          <div className="SpotLightContainer">
          
  
            <div className="SpotLightContainerHeader">
              <span className="headerSpotlight">Spotlight</span>
            </div>
  
            <div style={{ "height": "1000px" }}>
            <button onClick={handle}>Click</button>
            </div>
          </div>
  
        </div>
  
      </div>
    )
  }
  else{
    return (
      <div>
        Please Login to Continue
      </div>
    )
  }

}

export default HomepageSpotlight;