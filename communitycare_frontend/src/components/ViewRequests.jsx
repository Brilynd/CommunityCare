import React, { useEffect, useState } from "react";
import "./ViewRequests.css";
import Navbar from "./Navbar";
import { getAllRequest } from "../Api";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [userLocation, setUserLocation] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null); // For handling the selected request for the popup

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

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setSelectedRequest(null);
  };

  return (
    <React.Fragment>
      <Navbar currSelected={"ViewRequests"} />

      <div className="view-requests-container">
        <div className="map-and-requests">
          <h2 className="section-title">See Who Needs Help Near You</h2>

          {/* Google Maps Integration */}
          <div className="map-container">
            <LoadScript
              googleMapsApiKey={"AIzaSyDzpbD_LBjyzk7_jQ00DjSF4_r9J5M8MAk"}
            >
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
                    onClick={() => setSelectedRequest(request)} // Handle marker click
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
              requests.map((request, index) => (
                <div
                  className="request-card"
                  key={index}
                  onClick={() => setSelectedRequest(request)} // Handle request card click
                >
                  <div className="request-title">
                    <strong>Request Title:</strong> {request.title}
                  </div>
                  <div className="request-type">
                    <strong>Type of Request:</strong> {request.type}
                  </div>
                  <div className="request-description">
                    <strong>Description of Request:</strong>{" "}
                    {request.description}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Popup for selected request */}
        {selectedRequest && (
          <div className="request-popup">
            <div className="popup-header">
              <button className="close-popup" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <div className="popup-content">
              <label>
                Person in Need:
                <p className="User-Info-Display">
                  {selectedRequest.user.firstName +
                    " " +
                    selectedRequest.user.lastName}
                </p>
              </label>
              <label>
                Request Title:
                <p className="User-Info-Display">{selectedRequest.title}</p>
              </label>
              <label>
                Type of Request:
                <p className="User-Info-Display">{selectedRequest.type}</p>
              </label>
              <label>
                Description:
                <p className="User-Info-Display bigger">
                  {selectedRequest.description}
                </p>
              </label>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ViewRequests;
