import React, { useState } from "react";

const App = () => {
  const [ledOn, setLedOn] = useState(false);

  const toggleLED = async () => {
    const action = ledOn ? "off" : "on";
    try {
      const response = await fetch(`http://192.168.1.203/led/${action}`, {
        method: "GET", 
        mode: "cors" // Ensure cross-origin requests are allowed
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setLedOn(!ledOn);
    } catch (error) {
      console.error("Error toggling LED:", error);
      alert("Failed to communicate with ESP32. Check connection.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button
        onClick={toggleLED}
        className={`px-4 py-2 rounded-lg text-white transition ${
          ledOn ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {ledOn ? "TURN OFF" : "TURN ON"}
      </button>
    </div>
  );
};

export default App;
