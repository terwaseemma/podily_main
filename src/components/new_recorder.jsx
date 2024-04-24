import React from "react";
import { WavRecorder } from "webm-to-wav-converter";

const [token, setToken] = useState(localStorage.getItem('token'));

function Record() {
  const ref = React.useRef();
  const [audioData, setAudioData] = React.useState(null);

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
    try {
      const formData = new FormData();
      formData.append("audio", new Blob([audioData], { type: "audio/wav" }), "audio.wav");
  
      const response = await fetch("https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/run_assistant/", {
        mode: "no-cors",
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