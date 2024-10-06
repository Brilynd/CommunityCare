import React, { useEffect, useState } from "react";
import "./ViewRequests.css";
import Navbar from "./Navbar";
import { getAllRequest } from "../Api";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default center
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch(`https://ipapi.co/json/`);
        const data = await response.json();

        const { latitude, longitude } = data;
        setUserLocation({ lat: latitude, lng: longitude });
        setMapCenter({ lat: latitude, lng: longitude });
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await getAllRequest();
        setRequests(await response);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchUserLocation();
    fetchRequests();
  }, []);

  return (
    <React.Fragment>
      <Navbar currSelected={"ViewRequests"} />

      <div className="view-requests-container">
        <div className="map-and-requests">
          <h2 className="section-title">See Who Needs Help Near You</h2>

          {/* Google Maps Integration */}
          <div className="map-container">
            <LoadScript googleMapsApiKey={"AIzaSyDzpbD_LBjyzk7_jQ00DjSF4_r9J5M8MAk"}>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={12}
              >
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                    title="Your Location"
                  />
                )}

                {requests.map((request, index) => (
                  <Marker
                    key={index}
                    position={{ lat: request.latitude, lng: request.longitude }}
                    title={request.title}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>

          {/* Requests Section */}
          <div className="requests-list">
            {requests.length === 0 ? (
              <p>No requests available at the moment.</p>
            ) : (
              requests.slice(0, 3).map((request, index) => (
                <div className="request-card" key={index}>
                  <div className="request-title">
                    <strong>Request Title:</strong> {request.title}
                  </div>
                  <div className="request-type">
                    <strong>Type of Request:</strong> {request.type}
                  </div>
                  <div className="request-description">
                    <strong>Description of Request:</strong> {request.description}
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
