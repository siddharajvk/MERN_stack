"use client"
import Image from "next/image";
import { useState } from "react";
// import styles from "./page.module.css";
import React from 'react';
import './userinfo.css';

const UserInfoComponent = ({ userid, email, school, branch, degree, FacDept, skills, links, facDomain, name, role }) => {
  role=1;

  return (
    <>
      <div className="container">
        <div className="sidebar"></div>
        <div className="main">
          <div className="first">
            <div className="det-1">
              {
                role === 0 ? (
                  <h3><span style={{ color: 'red' }}>Registration Number : </span> <span style={{ color: "green" }}>{userid}</span></h3>
                ) : (
                  <h3><span style={{ color: 'red' }}>Faculty id : </span> <span style={{ color: "green" }}>{userid}</span></h3>
                )
              }
              {
                role === 0 ? (
                  <h3><span style={{ color: "red" }}>Branch-degree:</span> <span style={{ color: "green" }}>{branch}- {degree}</span></h3>
                ) : (
                  <h3><span style={{ color: "red" }}>Department:</span> <span style={{ color: "green" }}>{FacDept}</span></h3>
                )
              }
            </div>
            <div className="det-2">
              <h3><span style={{ color: 'red' }}>VIT Email : </span><span style={{ color: "green" }}>{email}</span></h3>
              <h3><span style={{ color: "red" }}>School :</span> <span style={{ color: "green" }}>{school} </span></h3>
            </div>
          </div>
          <div className="second">
            <button className="details">Personal Information</button>
            <table className="project-table">
              <tbody>
              <tr>
                  <td>Name</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Skills</td>
                  <td>{skills}</td>
                </tr>
                <tr>
                  <td>Links</td>
                  <td>{links}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfoComponent;
