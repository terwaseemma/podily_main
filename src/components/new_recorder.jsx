import React from "react";
import { WavRecorder } from "webm-to-wav-converter";
import "./new_recorder.css";
import axios from "axios";

// function Record() {
//   const ref = React.useRef();
//   let audioChunks = [];

//   React.useEffect(() => {
//     ref.current = new WavRecorder();
//   }, []);

//   function sendRecording(audioUrl) {
//     const token = localStorage.getItem("token");
//     if (!audioUrl) {
//         console.error('Aucun enregistrement audio disponible pour envoyer');
//         return;
//     }
//     const filename = generateUUID() + ".wav"
//     const audioBlob = new Blob([audioUrl], { type: 'audio/wav' });
//     console.log(audioBlob);
//     const formData = new FormData();
//     formData.append('audio', audioBlob, filename);
//     formData.append('filename', filename);
//     console.log(formData);

//     fetch('https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/run_assistant/', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Token ${token}`, // Add authorization header with token
//           },
//         body: formData
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Réponse du serveur :', data);
//     })
//     .catch(error => {
//         console.error('Erreur lors de l\'envoi de l\'audio au serveur :', error);
//     });
// }


//   const sendAudioToAPI = async (audio) => {
//     // const blob = await ref.current.getWaveBlob(); // Get the audio blob
//     const token = localStorage.getItem("token"); // Get token from localStorage

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("audio", audio);

//     try {
//       const response = await fetch("https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/run_assistant/", {
//         method: "POST",
//         headers: {
//           'Authorization': `Token ${token}`, // Add authorization header with token
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`API call failed with status ${response.status}`);
//       }

//       console.log("Audio sent successfully!");
//     } catch (error) {
//       console.error("Error sending audio:", error);
//     }
//   };

//   function generateUUID() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = Math.random() * 16 | 0,
//             v = c == 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Podily WavRecorder</h1>

//         <button onClick={() => ref.current.start()}>Start</button>
//         <br />
//         <br />
//         <button onClick={() => ref.current.stop()}>Stop</button>
//         <br />
//         <br />
//         <button onClick={() => {ref.current.download(); console.log(ref.current.__data);}}>Download 16 bit</button>
//         <br />
//         <br />
//         {/* <button onClick={() => ref.current.download("MyWAVFile", true)}>
//           Download 32 bit
//         </button> */}
//         <br />
//         <br />
//         <button onClick={()=>sendRecording(ref.current?.__data)}>Send to API</button>
//       </header>
//     </div>
//   );
// }

// export default Record;

function Record() {
    const ref = React.useRef();
  
    React.useEffect(() => {
      ref.current = new WavRecorder();
    }, []);
  
    const handleDownload = () => {
      // Call the download function from WavRecorder
      ref.current.download();
  
      // Retrieve the recorded audio blob
      const audioBlob = ref.current.audioBlob;
  
      // Create a new Blob object with the audio data
      const blob = new Blob([audioBlob], { type: 'audio/wav' });
  
      // Retrieve the auth token from local storage
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Add this line to check if the token is retrieved
  
  
      // Define headers for the axios request
      const headers = {
        'Content-Type': 'audio/wav', // Set the content type to audio/wav
        'Authorization': `Token ${token}` // Set the authorization token
      };
  
      // Replace 'https://your-backend-api.com/upload-audio' with your actual backend API endpoint
      const uploadUrl = 'https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/run_assistant/';
  
      // Make a POST request to send the audio file to backend
      axios.post(uploadUrl, blob, { headers })
        .then(response => {
          console.log('Audio file uploaded successfully:', response.data);
        })
        .catch(error => {
          console.error('Error uploading audio file:', error);
        });
    };
  
    return (
      <div className="Practice">
        <header className="Practice-header">
          <h1>WavRecorder class Usage</h1>
  
          <button onClick={() => ref.current.start()}>Start</button>
          <br />
          <br />
          <button onClick={() => ref.current.stop()}>Stop</button>
          <br />
          <br />
          <button onClick={handleDownload}>Download 16 bit</button>
          <br />
          <br />
          <button onClick={() => ref.current.download("MyWAVFile", true)}>
            Download 32 bit
          </button>
        </header>
      </div>
    );
  }
  
  export default Record;
