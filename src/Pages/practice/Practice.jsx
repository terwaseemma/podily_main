import React, { useRef, useState, useEffect } from "react";
import "./Practice.css";
import Header from "../../components/d_header/Header";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { BsSoundwave } from "react-icons/bs";
import { FaMicrophone, FaPlay, FaArrowLeft, FaStop, FaProcedures } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import reverse from "../../assets/reverse.png";
import forward from "../../assets/forward.png";
import '../../data/results'
import '../../data/pathways'
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};


const Actions = ( {status, starRecording, stopRecording, sendRecording, audioChunks, audioUrl, playRecording, pitch, playPitch}) => {

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");


  if (status === 'Not Recording') {
  return (
    <div className="actions-div">
      <div className="script-aud">
        <div className="icn">
          <img src={reverse} alt="reverse" />
        </div>
        <div className="icn" onClick={() => playPitch()}>
          <FaPlay />
        </div>
        <div className="icn">
          <img src={forward} alt="reverse" />
        </div>
        {/* <p>00:00/02:00</p>   */}
      </div>
      <div className="btn-act" onClick={() => starRecording()}>
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
        {/* <p>00:00/02:00</p> */}
      </div>
      <div className="btn-act" onClick={() => {stopRecording()}}>
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
        {/* <p>00:00/02:00</p> */}
      </div>
      <div className="btn-act" onClick={() => {sendRecording(audioChunks, audioUrl)}}>
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
        {/* <p>00:00/02:00</p> */}
      </div>
      <div className="btn-act">
        <ClipLoader color={color} loading={loading} css={override} size={30} />
      </div>
    </div>
  );


}

}


const Practice = () => {

  const pitchId = useParams().id

  const [pitch, setPitch] = useState(null);

  useEffect(() => {
      async function fetchPitch() {
          try {
              const response = await fetch(`https://voice-to-speech-analysis.onrender.com/pitch/${pitchId}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch pitch');
              }
              const data = await response.json();
              setPitch(data);
          } catch (error) {
              console.error('Error fetching pitch:', error);
          }
      }

      fetchPitch();

      // Cleanup function
      return () => {
          // Cleanup code if needed
      };
  }, [pitchId]); // Execute effect whenever pitchId changes

  


  
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Fetch token from localStorage when component mounts
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  
  


  // const val = pathways.find((a) => a.id === parseInt(scriptId));

 

  const ConfidenceRef = useRef(null)
  const ClarityRef = useRef(null)
  const ContentRef = useRef(null)
  const EnergyRef = useRef(null)
  const ToneRef = useRef(null)
  const Story_TellingRef = useRef(null)

  const toggledetails = (ref) => {
    ref.current.classList.toggle("none")
  }
  

  const navigate = useNavigate()

  const goToLibrary = () => {
    navigate("/pathways")
  }

  // Recording
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioUrl, setAudioUrl] = useState('');
    const [isRecording, setIsRecording] = useState(false);
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
              console.log(audioUrl);
          });

          recorder.start();
          setIsRecording(true);

         
  };

  const stopRecording = () => {
      mediaRecorder.stop();
      setStatus('finished recording');
      setIsRecording(false);
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
    const audio = new Audio(pitch.pitch_audio);
    audio.play();
  }

  
const sendRecording = (audioChunks, audioUrl) => {
  setStatus('analyzing')
  if (!audioUrl) {
      console.error('No audio recording available to send');
      setStatus('Not Recording');
  }
  const filename = generateUUID() + ".wav";
  const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  const formData = new FormData();
  formData.append('audio', audioBlob, filename);
  formData.append('filename', filename);

  console.log(audioBlob);
  console.log(formData);

  const renderURL = "https://voice-to-speech-analysis.onrender.com/audio/analysis/";
  // You may want to use the local endpoint during development
  // const endpointLocal = 'http://127.0.0.1:8000/audio/analysis/';
  // const endpoint = '';

  fetch(renderURL, {
      method: 'POST',
      body: formData,
      // headers: {
      //     // 'Content-Type': 'multipart/form-data',
      // }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('Server response:', data);
      setStatus('analyzed');
      setAnalysis(data);
  })
  .catch(error => {
      console.error('Error sending audio to the server:', error);
      setStatus('Not Recording');
      alert('Could not send audio to the server. Please try again.')
  });
}

const [status, setStatus] = useState('Not Recording');

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

  const starRecording = async () => {
    setStatus('Recording');
    startRecording();
  }

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
          {status === 'analyzed'? <div className="analysis">
            <p className="p">
              Here's the analysis of your pitch
            </p>
            <ul className="p">
              <li>Pace: {analysis.feedback["pace"]}</li>
              <li>Confidence: {analysis.feedback?.confidence}</li>
              <li>Filler Words: {analysis.feedback?.filler_words}</li>
              <li>Consiousness: {analysis.feedback?.consiousness}</li>
            </ul>
            <p>{analysis.analysis}</p>
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
        {/* <p>00:00/02:00</p> */}
      </div>
      <div className="btn-act" onClick={() => {setStatus("Not Recording")}}>
        Pitch Again
      </div>
    </div>
          </div> : <><p className="p">Kindly note that your pitch must have elements of each segment. You can edit the text to suit yours.</p>
          <div className="pitch-content">
            <div className="flex-row1">
              <h4>The Hook</h4>
            </div>
            <p>{pitch.pitch_hook} </p>
          </div>
          <div className="pitch-content">
            <div className="flex-row1">
              <h4>The Value Proposition</h4>
            </div>
            <p>{pitch.pitch_value}  </p>
          </div>
          <div className="pitch-content">
            <div className="flex-row1">
              <h4>The Evidence</h4>
            </div>
            <p>{pitch.Evidence}  </p>
          </div>
          <div className="pitch-content">
            <div className="flex-row1">
              <h4>The Differentiator</h4>
            </div>
            <p>{pitch.pitch_differentiator}  </p>
          </div>
          <div className="pitch-content1">
            <div className="flex-row1">
              <h4>The Call to Action</h4>
            </div>
            <p>{pitch.pitch_call_to_action}  </p>
          </div></>}
          
        </div>
        <Actions status={status} starRecording={starRecording} stopRecording={stopRecording} sendRecording={sendRecording} audioChunks={audioChunks} audioUrl={audioUrl} playRecording={playRecording} pitch={pitch} playPitch={playPitch} />
      </section>
    </div>
  );
};

export default Practice;
