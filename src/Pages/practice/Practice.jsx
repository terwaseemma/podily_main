import React, { useRef, useState } from "react";
import "./Practice.css";
import Header from "../../components/d_header/Header";
import topic from "../../assets/topic.png";
import PracticeStage from "../../components/practicephases/PracticeStage";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { BsSoundwave } from "react-icons/bs";
import { FaMicrophone, FaArrowRight } from "react-icons/fa";
import pathway1 from '../../assets/pathway1.png'
import pathway2 from '../../assets/pathway2.png'
import pathway3 from '../../assets/pathway3.png'
import pathway4 from '../../assets/pathway4.png'
import pathway5 from '../../assets/pathway5.png'
import { useNavigate, useParams } from "react-router"



const Action = ({ status, addAudioElement, recorderControls, startRecording, stopRecording }) => {

  const {
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder
  } = useAudioRecorder();
  
  if (status === "start") {
    return (
      <>
        <p>Click to Speak</p>
        <div className="action">
          <div className="action-icon" onClick={(e) =>{ startRecording() }}>
            <FaMicrophone />
          </div>
        </div>
      </>
    );
  } else if (status === "stop") {
    return (
      <>
        <p>Click to Stop</p>
        <div className="action">
          <div className="action-icon red" onClick={(e) => {stopRecording()}}>
            <BsSoundwave />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p>Click to play audio</p>
        <div className="action" id="act">
          <div className="action-icon">
          <AudioRecorder 
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
          </div>
        </div>
      </>
    );
  
  }
};


const Practice = () => {

  const scriptId = useParams().id


  const recorderControls = useAudioRecorder()
  const recordingBlob = useAudioRecorder()
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    const container = document.getElementById("act");
    container.appendChild(audio);
  };
  const [status, setStatus] = useState("start");

  const startRecording = () => {
    console.log("Recording Started");
    setStatus("stop");
    recorderControls.startRecording();
  }

  const stopRecording = () => {
    setStatus("play");
    recorderControls.stopRecording();
  }

  
  const pathways = [
    {
      id: 1,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway1,
      rating: 10
    },
    {
      id: 2,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway2,
      rating: 10
    },
    {
      id: 3,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway3,
      rating: 9
    },
    {
      id: 4,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway4,
      rating: 8
    },
    {
      id: 5,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway5,
      rating: 10
    },
  ]

  const val = pathways.find((a) => a.id === parseInt(scriptId));

  const results = [
   {
      name: "Confidence",
      percentage: 50,
      icon: "icon",
      color: "lightcoral",
      details: "Your confidence level was very good today, you have improved by 12% ........."
    },
    {
      name: "Clarity",
      percentage: 25,
      icon: "icon",
      color: "lightgreen",
      details: "Your clarity level was very good today, you have improved by 12% ........."
    },
    {
      name: "Content",
      percentage: 25,
      icon: "icon",
      color: "lightpink",
      details: "Your content level was very good today, you have improved by 12% ........."
    },
    {
      name: "Tone",
      percentage: 25,
      icon: "icon",
      color: "lightblue",
      details: "Your tone was very good today, you have improved by 12% ........."
    },
    {
      name: "Energy",
      percentage: 50,
      icon: "icon",
      color: "lightcoral",
      details: "Your energy was very good today, you have improved by 12% ........."
    },
    {
      name: "Story_Telling",
      percentage: 25,
      icon: "icon",
      color: "lightgreen",
      details: "Your story telling was very good today, you have improved by 12% ........."
    },

  ]

  const ConfidenceRef = useRef(null)
  const ClarityRef = useRef(null)
  const ContentRef = useRef(null)
  const EnergyRef = useRef(null)
  const ToneRef = useRef(null)
  const Story_TellingRef = useRef(null)

  const toggledetails = (ref) => {
    ref.current.classList.toggle("none")
  }
  

  const sendAudioToBackend = async (file) => {
    try {
      const formData = new FormData();
      
      const audioBlob = new Blob([file], {type: 'audio/wav'});
      formData.append('audio', audioBlob, "output.wav");
      console.log(file)
      console.log(audioBlob)
      console.log(formData)
      // formData.append('filename', "./src/assets/audio.wav");

      const response = await fetch("https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/run_assistant/", {
        mode: 'no-cors',
        method: "POST",
        headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-Token': csrfToken,
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      
        },
        body: {
          audio: formData,
          filename: "output.wav"
        },
      });

      console.log("response:", response);
      // console.log("Body", response.body)

      if (response.ok) {
        console.log("Audio sent successfully");
      } else {
        console.error("Failed to send audio");
      }
    } catch (error) {
      console.error("Error sending audio:", error);
    }
    setStatus("analyzed")
  };

  const navigate = useNavigate()

  const goToLibrary = () => {
    navigate("/pathways")
  }

  

  return (
    <div className="ds">
      <Header value="practice" />
      <section className="practice-container">
        <div className="practice-holder">
          {
            status === "analyzed"? <>
            <h3>Results</h3>
            <div className="results">

              <>
              <div className="result" style={{ backgroundColor: results[0].color }} onClick={() => {toggledetails(ConfidenceRef)}}>
                  <div className="flex-row-space">
                    <div className="flex-row">
                      <div className="icon" >
                        {results[0].icon}
                      </div>
                      <h3>{results[0].name}</h3>
                    </div>
                    <FaArrowRight />
                  </div>
                  <div className="flex-row">
    
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${results[0].percentage}%` }}
                      ></div>
                    </div>
                    <p>{results[0].percentage}%</p>
                    </div>
                    <div className="analysis-det none" ref={ConfidenceRef}>
                      <p>{results[0].details}</p>
                    </div>
                </div>
              </>
              <>
              <div className="result" style={{ backgroundColor: results[1].color }} onClick={() => {toggledetails(ClarityRef)}}>
                  <div className="flex-row-space">
                    <div className="flex-row">
                      <div className="icon" >
                        {results[1].icon}
                      </div>
                      <h3>{results[1].name}</h3>
                    </div>
                    <FaArrowRight />
                  </div>
                  <div className="flex-row">
    
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${results[1].percentage}%` }}
                      ></div>
                    </div>
                    <p>{results[1].percentage}%</p>
                    </div>
                    <div className="analysis-det none" ref={ClarityRef}>
                      <p>{results[1].details}</p>
                    </div>
                </div>
              </>
              <>
              <div className="result" style={{ backgroundColor: results[0].color }} onClick={() => {toggledetails(ContentRef)}}>
                  <div className="flex-row-space">
                    <div className="flex-row">
                      <div className="icon" >
                        {results[2].icon}
                      </div>
                      <h3>{results[2].name}</h3>
                    </div>
                    <FaArrowRight />
                  </div>
                  <div className="flex-row">
    
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${results[2].percentage}%` }}
                      ></div>
                    </div>
                    <p>{results[2].percentage}%</p>
                    </div>
                    <div className="analysis-det none" ref={ContentRef}>
                      <p>{results[2].details}</p>
                    </div>
                </div>
              </>
              <>
              <div className="result" style={{ backgroundColor: results[0].color }} onClick={() => {toggledetails(ToneRef)}}>
                  <div className="flex-row-space">
                    <div className="flex-row">
                      <div className="icon" >
                        {results[3].icon}
                      </div>
                      <h3>{results[3].name}</h3>
                    </div>
                    <FaArrowRight />
                  </div>
                  <div className="flex-row">
    
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${results[3].percentage}%` }}
                      ></div>
                    </div>
                    <p>{results[3].percentage}%</p>
                    </div>
                    <div className="analysis-det none" ref={ToneRef}>
                      <p>{results[3].details}</p>
                    </div>
                </div>
              </>

              <>
              <div className="result" style={{ backgroundColor: results[4].color }} onClick={() => {toggledetails(EnergyRef)}}>
                  <div className="flex-row-space">
                    <div className="flex-row">
                      <div className="icon" >
                        {results[4].icon}
                      </div>
                      <h3>{results[4].name}</h3>
                    </div>
                    <FaArrowRight />
                  </div>
                  <div className="flex-row">
    
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${results[4].percentage}%` }}
                      ></div>
                    </div>
                    <p>{results[4].percentage}%</p>
                    </div>
                    <div className="analysis-det none" ref={EnergyRef}>
                      <p>{results[4].details}</p>
                    </div>
                </div>
              </>

              <>
              <div className="result" style={{ backgroundColor: results[5].color }} onClick={() => {toggledetails(Story_TellingRef)}}>
                  <div className="flex-row-space">
                    <div className="flex-row">
                      <div className="icon" >
                        {results[5].icon}
                      </div>
                      <h3>{results[5].name}</h3>
                    </div>
                    <FaArrowRight />
                  </div>
                  <div className="flex-row">
    
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${results[5].percentage}%` }}
                      ></div>
                    </div>
                    <p>{results[5].percentage}%</p>
                    </div>
                    <div className="analysis-det none" ref={Story_TellingRef}>
                      <p>{results[5].details}</p>
                    </div>
                </div>
              </>
            </div>
            <div className="instructions">
             
              <button
                className="btn"
                onClick={() => {
                  goToLibrary()
                }}
              >
                Go back to pitch library
              </button>
            </div>
          </> : <div className="content">
            <div className="main-card">
              <div className="main-card-header">
                <p>Edit</p>
                <p>Copy</p>
              </div>
              <div className="main-card-body">
                <div className="dat">
                  <h3>Hook</h3>
                  <p>Let's talk about project success. </p>
                </div>

                <div className="dat">
                  <h3>The value proposition</h3>
                  <p>
                    With our software, you can say goodbye to late nights and
                    hello to effective collaboration.
                  </p>
                </div>

                <div className="dat">
                  <h3>The Differentiator</h3>
                  <p>Curious how it works?</p>
                </div>

                <div className="dat">
                  <h3>The Call to action</h3>
                  <p>
                    Come chat with us in person and experience the future of
                    project management!"
                  </p>
                </div>
              </div>
            </div>
            <Action status={status} downloadOnSavePress={true} addAudioElement={addAudioElement} recorderControls={recorderControls} startRecording={startRecording} stopRecording={stopRecording} />
            {
              status === "play" ? <button className="btn2" onClick={() => {sendAudioToBackend(recordingBlob)}}>Analyze</button> : ""
            }
            
            
          </div>
          }
        
        </div>
      </section>
    </div>
  );
};

export default Practice;
