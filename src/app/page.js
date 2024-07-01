"use client"
import React from 'react';
 // Update the path as per your project structure
import './Homepage.css';
import Header from './components/layout/Header.js';



const Homepage = () => {
  return (
      <div className="HomePage">
      <div style={{"width": "101.1%", "height": "10vh"}}>
          <Header />  
        </div>
        <div className='Top'>
          <h1 style={{ marginLeft: '25%', color: '#006CA5' }}>Research paper Portal</h1>
          <p style={{ marginLeft: '3%' }}>A Digital initiative by the institute facilitating Faculty
            and Students to access and
          </p>
          <p style={{ marginLeft: '20%' }}>process services at one common platform </p>
        </div>
        <div className='center'>
          <div className='box'>
            <div id='T-color'></div>
            <div className='C1'>
              <div className='C1L'>
                <img src='' alt='student logo' style={{ height: '60%', width: '50%', marginLeft: '12%', marginTop: '10%' }} />
              </div>
              <div className='C1R'>
                <p style={{ color: 'dodgerblue', fontSize: '1.2vw', textAlign: 'center' }}>Student</p>
                <img src='' alt='click to navigate to student login' style={{ marginLeft: '35%', height: '35px' }} />
              </div>
            </div>
          </div>

        </div>
        <div className='bottom'>
          <div className='box1'>
            <div id='T2-color'></div>
            <p style={{ color: 'brown', fontSize: '80%', marginLeft: '10%' }}>Spotlight</p>
            <ul>
              <li><p style={{ fontSize: '80%', marginLeft: '2%' }}>Ranked Among the Top 601-700 universities Of the World And One Among the Top 3 Institutions in India(Shanghai ARWU Ranking 2022 )</p></li>
              <li><p style={{ fontSize: '80%', marginLeft: '2%' }}>The 8th Best University,The 11th Best Reasearch Institution And the 11th Best Engineering Institution in India(NIRF Ranking,Govt of India 2023)</p></li>
              <li><p style={{ fontSize: '80%', marginLeft: '2%' }}>NAAC Accreditation With A++ Grade(3.66 out of 4)</p></li>

            </ul>
          </div>
        </div>
        {/* <div style={{ backgroundColor: "red", "width": "206.3vh", "height": "3vh", "margin": "-0.6%","marginBottom":"-0.1px","marginTop":"10vh"}}>
          <Footer />
        </div> */}
      </div>
  )
}

export default Homepage;