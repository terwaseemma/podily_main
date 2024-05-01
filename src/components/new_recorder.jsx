import React, { useRef, useState, useEffect } from "react";
import "./new_recorder.css";
import Header from "./d_header/Header";
import { BsSoundwave } from "react-icons/bs";
import { FaMicrophone, FaPlay, FaArrowLeft, FaStop, FaProcedures } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import axios from 'axios';
import reverse from "../assets/reverse.png";
import forward from "../assets/forward.png";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

// Actions component with multiple recording states
const Actions = ({ status, startRecording, stopRecording, sendRecording, audioChunks, audioUrl, playRecording, pitch, playPitch }) => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");

  // Render based on recording status
  if (status === 'Not Recording') {
    return (
      <div className="actions-div">
        <div className="script-aud">
          <div className="icn">
            <img src={reverse} alt="reverse" />
          </div>
          <div className="icn" onClick={playPitch}>
            <FaPlay />
          </div>
          <div className="icn">
            <img src={forward} alt="reverse" />
          </div>
        </div>
        <div className="btn-act" onClick={() => startRecording()}>
          <FaMicrophone />
          <p>Tap To Speak</p>
        </div>
      </div>
    );
  } else if (status === 'Recording') {
    return (
      <div className="actions-div">
        <div className="script-aud">
          <div className="icn">
            <img src={reverse} alt="reverse" />
          </div>
          <div className="icn">
            <FaPlay />
          </div>
          <div className="icn">
            <img src={forward} alt="reverse" />
          </div>
        </div>
        <div className="btn-act" onClick={stopRecording}>
          <FaStop />
          <p>Tap to stop</p>
        </div>
      </div>
    );
  } else if (status === 'finished recording') {
    return (
      <div className="actions-div">
        <div className="script-aud">
          <div className="icn">
            <img src={reverse} alt="reverse" />
          </div>
          <div className="icn" onClick={() => playRecording()}>
            <FaPlay />
          </div>
          <div className="icn">
            <img src={forward} alt="reverse" />
          </div>
        </div>
        <div className="btn-act" onClick={() => sendRecording()}>
          <FaProcedures />
          <p>Analyze</p>
        </div>
      </div>
    );
  } else if (status === 'analyzing') {
    return (
      <div className="actions-div">
        <div className="script-aud">
          <div className="icn">
            <img src={reverse} alt="reverse" />
          </div>
          <div className="icn">
            <FaPlay />
          </div>
          <div className="icn">
            <img src={forward} alt="reverse" />
          </div>
        </div>
        <div className="btn-act">
          <ClipLoader color={color} loading={loading} css={override} size={30} />
        </div>
      </div>
    );
  }
};

// Main Practice component
const Record = () => {
  const pitchId = useParams().id;
  // const pitchId = 2;

  // State for pitch data
  const [pitch, setPitch] = useState(null);
  
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  // const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Not Recording');
  const [analysis, setAnalysis] = useState([]);

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch pitch data on mount
  useEffect(() => {
    if (token) { // Only fetch if the token is valid
      async function fetchPitch() {
        const headers = {
          'Authorization': `Token ${token}`, // Add correct token
        };
  
        try {
          const response = await fetch(
            `https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/pitches/${pitchId}`,
            { headers }
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch pitch');
          }
  
          const data = await response.json();
          setPitch(data);
        } catch (error) {
          console.error('Error fetching pitch:', error); // Log errors
        }
      }
  
      fetchPitch(); // Fetch pitch only if token is valid
    }
  }, [pitchId, token]); 

  


  const [isRecording, setIsRecording] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null); // New state for analysis result

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = () => {
    console.log("recording started");
    setStatus("Recording")
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
      setStatus("finished recording")
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
    setStatus("analyzing")
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
      setStatus("analyzed")
    } catch (error) {
      console.error('Error uploading audio file:', error);
      setAnalysisResult(null); // Reset the analysis result state
    }
  };


  const playRecording = () => {
    if (!audioUrl) {
      console.error('No audio recording available');
      return;
    }
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const playPitch = () => {
    if (pitch && pitch.audio_file) {
      const audio = new Audio(pitch.audio_file);
      audio.play();
    }
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  if (!pitch) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ds">
      <Header value="practice" />
      <section className="practice-container">
        <div className="flex-row full-width2">
          <div className="icon"><FaArrowLeft /></div>
          <p>{pitch.pitch_title}</p>
        </div>
        <div className="practice-holder">
          {status === 'analyzed' ? (
            <div className="analysis">
              <div className="display">
              <p>Here's the analysis of your pitch</p>

              <prev>{analysisResult.latest_message.content}</prev>
              </div>
              
              
              {/* <ul>
                <li>{analysisResult.latest_message.content.Hello.Intro}</li>
                <li>{analysisResult.latest_message.content.content.more_details}</li>
                <li>{analysisResult.latest_message.content.clarity.more_details}</li>
                <li>{analysisResult.latest_message.content.confidence.more_details}</li>
                <li>{analysisResult.latest_message.content.tone.more_details}</li>
                <li>{analysisResult.latest_message.content.energy.more_details}</li>
                <li>{analysisResult.latest_message.content.storytelling.more_details}</li>
                <li>{analysisResult.latest_message.content.overall.summary}</li>
              </ul> */}
              <div className="actions-div">
                <div className="script-aud">
                  <div className="icn">
                    <img src={reverse} alt="reverse" />
                  </div>
                  <div className="icn">
                    <FaPlay />
                  </div>
                  <div className="icn">
                    <img src={forward} alt="reverse" />
                  </div>
                </div>
                <div className="btn-act" onClick={() => setStatus("Not Recording")}>
                  Pitch Again
                </div>
              </div>
            </div>
          ) : (
            <>
              <p>Kindly note that your pitch must have elements of each segment. You can edit the text to suit yours.</p>
              <div className="pitch-content">
                <div className="flex-row1">
                  <h4>The Hook</h4>
                </div>
                <p>{pitch.pitch_hook}</p>
              </div>
              <div className="pitch-content">
                <div className="flex-row1">
                  <h4>The Value Proposition</h4>
                </div>
                <p>{pitch.value_preposition}</p>
              </div>
              <div className="pitch-content">
                <div className="flex-row1">
                  <h4>The Evidence</h4>
                </div>
                <p>{pitch.evidence_text}</p>
              </div>
              <div className="pitch-content">
                <div className="flex-row1">
                  <h4>The Differentiator</h4>
                </div>
                <p>{pitch.pitch_differentiator}</p>
              </div>
              <div className="pitch-content1">
                <div className="flex-row1">
                  <h4>The Call to Action</h4>
                </div>
                <p>{pitch.pitch_call_to_action}</p>
              </div>
            </>
          )}
        </div>
        <Actions
          status={status}
          startRecording={startRecording}
          stopRecording={stopRecording}
          sendRecording={handleUpload}
          audioChunks={audioChunks}
          audioUrl={audioUrl}
          playRecording={playRecording}
          pitch={pitch}
          playPitch={playPitch}
        />
      </section>
    </div>
  );
};

export default Record;