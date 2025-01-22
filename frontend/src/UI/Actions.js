import React from "react";
import { Button } from "react-bootstrap";
import { FaWhatsapp, FaPhoneAlt, FaHeadset } from "react-icons/fa";

const Actions = () => {
  return (
    <div style={floatingStyle.container}>
      <Button
        style={{
          ...floatingStyle.button,
          backgroundColor: "#17b519",
          borderColor: "#17b519",
          color: "#fff",
        }}
        onClick={() => (window.location.href = "https://wa.me/1234567890")}
      >
        <FaWhatsapp style={floatingStyle.icon} /> WhatsApp Us
      </Button>

      <Button
        variant="primary"
        style={floatingStyle.button}
        onClick={() => alert("Schedule a Free Call!")}
      >
        <FaPhoneAlt style={floatingStyle.icon} /> Book a Free Call
      </Button>
      <Button
        variant="warning"
        style={floatingStyle.button}
        onClick={() => alert("We are here 24/7 to help you!")}
      >
        <FaHeadset style={floatingStyle.icon} /> 24/7 Support
      </Button>
    </div>
  );
};

const floatingStyle = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 1000,
  },
  button: {
    borderRadius: "30px",
    padding: "10px 20px",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
    fontSize: "1.2em",
  },
};

export default Actions;
