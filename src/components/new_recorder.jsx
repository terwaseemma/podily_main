import React, { useState, useEffect } from "react";
import { WavRecorder } from "webm-to-wav-converter";



function Record() {
  const ref = React.useRef();
  const [audioData, setAudioData] = React.useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  React.useEffect(() => {
    console.log ("effect started")
    ref.current = new WavRecorder();
  }, []);

  useEffect(() => {
    // Fetch token from localStorage when component mounts
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const sendAudioToServer = async (file) => {
    if (!token) {
        console.error("Missing authorization token. Please login to proceed.");
        return;
      }
    try {
      const formData = new FormData();
      formData.append("audio", new Blob([audioData], { type: "audio/wav" }), "audio.wav");
  
      const response = await fetch("https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/run_assistant/", {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
  
      if (response.ok) {
        console.log("Audio sent successfully");
      } else {
        console.error("Failed to send audio");
      }
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>WavRecorder class Usage</h1>

        <button onClick={() => {
        console.log ("recording started");
          ref.current.start();
          setAudioData(null); // Clear previous recording
        }}>Start</button>
        <br />
        <br />
        <button onClick={() => {
            console.log ("effect stopped");
          ref.current.stop();
          setAudioData(ref.current.getWavBlob);
        }}>Stop</button>
        <br />
        <br />
        <button onClick={sendAudioToServer}>Send Audio</button>
      </header>
    </div>
  );
}

export default Record;