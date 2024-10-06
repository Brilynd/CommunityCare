import React, { useEffect, useState } from "react";
import "./ViewRequests.css";
import Navbar from "./Navbar";
import axios from "axios"; // For fetching data from the backend
import { getAllRequest } from "../Api";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetching all requests from your backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getAllRequest();
        console.log(await response);
        setRequests(await response);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <React.Fragment>
      <Navbar currSelected={"ViewRequests"} />

      <div className="view-requests-container">
        <div className="map-and-requests">
          {/* Section Title */}
          <h2 className="section-title">See Who Needs Help Near You</h2>

          {/* Dedicated empty space for the map */}
          <div className="map-container">
            {/* Add your map component or integration here */}
            <p>This is where the map will go.</p>
          </div>

          {/* Requests Section */}
          <div className="requests-list">
            {requests.length === 0 ? (
              <p>No requests available at the moment.</p>
            ) : (
              requests.slice(0, 3).map((request, index) => (
                <div className="request-card" key={index}>
                  <div className="request-title">{request.title}</div>
                  <div className="request-type">
                    {request.type === "physical" && (
                      <span className="icon-physical">🏋️</span>
                    )}
                    {request.type === "donation" && (
                      <span className="icon-donation">💸</span>
                    )}
                    {request.type === "both" && (
                      <>
                        <span className="icon-physical">🏋️</span>
                        <span className="icon-donation">💸</span>
                      </>
                    )}
                  </div>
                  <div className="request-description">
                    {request.description.length > 20
                      ? `${request.description.slice(0, 20)}...`
                      : request.description}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewRequests;
