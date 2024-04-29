import React, { useRef, useState, useEffect } from "react";
import "./Practice.css";
import Header from "../../components/d_header/Header";
import { BsSoundwave } from "react-icons/bs";
import { FaMicrophone, FaPlay, FaArrowLeft, FaStop, FaProcedures } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import axios from 'axios';
import reverse from "../../assets/reverse.png";
import forward from "../../assets/forward.png";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

// Actions component with multiple recording states
const Actions = ({ status, starRecording, stopRecording, sendRecording, audioChunks, audioUrl, playRecording, pitch, playPitch }) => {
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
        <div className="btn-act" onClick={starRecording}>
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
        <div className="btn-act" onClick={() => sendRecording(audioChunks, audioUrl)}>
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
  // const pitchId = useParams().id;
  const pitchId = 3;

  // State for pitch data
  const [pitch, setPitch] = useState(null);

  // Fetch pitch data on mount
  useEffect(() => {
    const fetchPitch = async () => {
      try {
        const response = await axios.get(`https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/pitches/${pitchId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pitch');
        }
        const data = await response.json();
        setPitch(data);
      } catch (error) {
        console.error('Error fetching pitch:', error);
      }
    };

    fetchPitch();
  }, [pitchId]);

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = setAudioChunks([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Not Recording');
  const [analysis, setAnalysis] = useState([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.addEventListener('dataavailable', event => {
      setAudioChunks(prevChunks => [...prevChunks, event.data]);
    });

    recorder.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      setAudioUrl(URL.createObjectURL(audioBlob));
    });

    recorder.start();
    setIsRecording(true);
    setStatus('Recording');
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setStatus('finished recording');
      setIsRecording(false);
    }
  };

  const sendRecording = async () => {
    if (audioChunks.length === 0) {
      console.error('No audio recording available');
      setStatus('Not Recording');
      return;
    }

    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audio', audioBlob, `${generateUUID()}.wav`);

    try {
      const response = await axios.post(
        'https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/run_assistant',
        formData,
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to send audio');
      }

      setStatus('analyzed');
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error sending audio to the server:', error);
      setStatus('Not Recording');
      alert('Could not send audio to the server. Please try again.');
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
    if (pitch && pitch.pitch_audio) {
      const audio = new Audio(pitch.pitch_audio);
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
              <p>Here's the analysis of your pitch</p>
              <ul>
                <li>Pace: {analysis.feedback["pace"]}</li>
                <li>Confidence: {analysis.feedback?.confidence}</li>
                <li>Filler Words: {analysis.feedback?.filler_words}</li>
                <li>Consiousness: {analysis.feedback?.consiousness}</li>
              </ul>
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
                <p>{pitch.pitch_value}</p>
              </div>
              <div className="pitch-content">
                <div className="flex-row1">
                  <h4>The Evidence</h4>
                </div>
                <p>{pitch.Evidence}</p>
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
          sendRecording={sendRecording}
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
