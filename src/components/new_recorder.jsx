import React, { useState, useRef } from "react";
import "./new_recorder.css";
import axios from "axios";


function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null); // New state for analysis result

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  const handleDownload = () => {
    if (chunksRef.current.length === 0) {
      console.error('No audio recorded');
      return;
    }

    const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audio.wav';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (chunksRef.current.length === 0) {
      console.error('No audio recorded');
      return;
    }

    const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'audio/wav',
      'Authorization': `Token ${token}`
    };

    const uploadUrl = 'https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/run_assistant/';

    const formData = new FormData();
    formData.append('audio', blob, 'audio.wav');

    try {
      const response = await axios.post(uploadUrl, formData, { headers });
      console.log('Audio file uploaded successfully:', response.data);
      setAnalysisResult(response.data); // Update the analysis result state
    } catch (error) {
      console.error('Error uploading audio file:', error);
      setAnalysisResult(null); // Reset the analysis result state
    }
  };

  return (
    <div className="Record">
      <header className="Record-header">
        <h1>Manual Recording</h1>
        <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
        <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
        <button onClick={handleDownload}>Download(Optional)</button>
        <button onClick={handleUpload}>Get Feedback</button>
        {analysisResult && (
          <div>
            <h2>Feedback</h2>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default Record;