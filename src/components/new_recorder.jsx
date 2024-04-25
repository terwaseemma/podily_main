import React from "react";
import { WavRecorder } from "webm-to-wav-converter";
import "./new_recorder.css";

function Record() {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = new WavRecorder();
  }, []);

  const sendAudioToAPI = async (audio) => {
    // const blob = await ref.current.getWaveBlob(); // Get the audio blob
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audio);

    try {
      const response = await fetch("https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/run_assistant/", {
        method: "POST",
        headers: {
          'Authorization': `Token ${token}`, // Add authorization header with token
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      console.log("Audio sent successfully!");
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Podily WavRecorder</h1>

        <button onClick={() => ref.current.start()}>Start</button>
        <br />
        <br />
        <button onClick={() => ref.current.stop()}>Stop</button>
        <br />
        <br />
        <button onClick={() => {ref.current.download(); console.log(ref.current.__data);}}>Download 16 bit</button>
        <br />
        <br />
        {/* <button onClick={() => ref.current.download("MyWAVFile", true)}>
          Download 32 bit
        </button> */}
        <br />
        <br />
        <button onClick={()=>sendAudioToAPI(ref.current?.__data)}>Send to API</button>
      </header>
    </div>
  );
}

export default Record;
