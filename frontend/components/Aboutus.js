import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Link } from "react-router-dom";
import { Row, Col, Card, Nav, Button,  } from 'react-bootstrap'

const Aboutus = () => {

  return (
<>

<div className="bg-dark text-secondary px-4 py-5 text-center">
    <div className="py-5">
      <h1 className="display-5 fw-bold text-white">Meet Our Team</h1>
      <div className="col-lg-6 mx-auto">
        <p className="fs-5 mb-4">We are all very different. We were born in different cities, at different times, we love different music, food, movies. But we have something that unites us all. It is our company. We are its heart. We are not just a team, we are a family.</p>
      </div>
    </div>
  </div>

  <div className = "container-fluid py-5">
  <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="card h-100">
            <img src="assets/img/sir.jpg" className="card-img-top" style={{height : 420}} alt="..." />
            <div className="card-body">
              <h5 className="card-title"><b>Nasir Mehdi</b></h5>
              <h5 className="card-title">Supervisor</h5>
              <p className="card-text">Syed Nasir Mehdi is a lecturer in the Computer Science (CS) Department of COMSATS Sahiwal. He started his career in COMSATS Sahiwal since Sept 2016. Prior to this he has served as lecturer in other universities where he taught different subjects. His main interests include Databases, Programming subjects and network subjects. Among the latest technology buzzwords he is attracted towards Software Defined Networking.</p>
            </div>
            <div className="card-footer">
              <div className = "d-grid gap-2">
<a href="https://www.linkedin.com/in/syed-nasir-mahdi-698153160/" class="btn btn-dark " tabindex="-1" role="button" >Contact </a>
              </div>
              {/* <small className="text-muted">Last updated 3 mins ago</small> */}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="assets/img/hammad.jpg" className="card-img-top" style={{height: 420}} alt="..." />
            <div className="card-body">
              <h5 className="card-title"><b>Muhammad Hammad Ali</b></h5>
              <h5 className="card-title">Blockchain Developer</h5>

              <p className="card-text">Mr. Hammad Ali is a blockchain developer. Completed his graduation from COMSATS University Islamabad, Sahiwal campus. He is an expert in writing smart contracts. He has 6 months experience in blockchain. Extremely enthusiastic guy and a team player.</p>
            </div>
            <div className="card-footer">
            <div className = "d-grid gap-2">
<a href="https://www.linkedin.com/in/muhammad-hammad-ali/" class="btn btn-dark " tabindex="-1" role="button" >Contact </a>
              </div>
              {/* <small className="text-muted">Last updated 3 mins ago</small> */}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="assets/img/hammas.jpeg" className="card-img-top" style={{height: 420}} alt="..." />
            <div className="card-body">
              <h5 className="card-title"><b>Hamas Ali Sabir</b></h5>
              <h5 className="card-title">Blockchain Developer</h5>
              <p className="card-text">Mr. Hamas Ali is a blockchain developer. Completed his graduation from COMSATS University Islamabad, Sahiwal campus. He is an expert in writing smart contracts. He has 6 months experience in blockchain. Extremely enthusiastic guy and a team player.</p>
            </div>
            <div className="card-footer">
            <div className = "d-grid gap-2">
<a href="https://www.linkedin.com/in/hamasalisabir/" class="btn btn-dark " tabindex="-1" role="button" >Contact </a>
              </div>
              {/* <small className="text-muted">Last updated 3 mins ago</small> */}
            </div>
          </div>
        </div>
      </div>
  </div>
    </>
  );
}
export default Aboutus