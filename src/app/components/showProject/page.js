import React from 'react';
import './showProject.css';

const ShowProject = ({ projectTitle, projectID, Category, Domain, Description, teammates }) => {
  return (
    <main>
      <div>
        <div className="container">
          <div className="Project">
            <label className="label"><b>Project Title</b></label>
            <span className="data">{projectTitle}</span>
            <label className="label"><b>Project ID</b></label>
            <span className="data">{projectID}</span>
          </div><br />
          <div className="category">
            <label className="label"><b>Category</b></label>
            <span className="data">{Category}</span>
            <label className="label"><b>Domain</b></label>
            <span className="data">{Domain}</span>
          </div><br />
          <div className="desc">
            <label className="label" ><b>Description</b><br /></label>
            <div className="data" style={{"marginTop":"1%"}}>{Description}</div>
          </div><br />
        </div>
      </div>
    </main>
  );
}

export default ShowProject;
