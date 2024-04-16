import React, { useState } from "react";
import microphone from "../../assets/microphone.png";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import { FaArrowRight } from "react-icons/fa";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const PracticeStage = ({
  status,
  handleTableTopic,
  tableTopic,
  prepareToSpeak,
  setStatus,
}) => {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  let mediaRecorder;
  let audioStream;
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const startRecording = async () => {
    try {
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(audioStream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleDataAvailable = event => {
    if (event.data.size > 0) {
      setAudioChunks([...audioChunks, event.data]);
    }
  };

  const [countDownTime, setCountDownTime] = useState(3);

  const [timeLeft, setTimeLeft] = useState(tableTopic.time);

  const speak = () => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft === 0) {
        clearInterval(timer);
        setStatus("done");
      }
    }, 1000);
  };

  const countDown = (time, setTime) => {
    setTime(time - 1);
  };

  if (status === "not-started") {
    return (
      <>
        <h3>Table Topic</h3>
        <div className="flex-row">
          <div className="iconnn">
            <IoIosArrowDropleftCircle onClick={handleTableTopic} />
          </div>
          <div className="table-topic">
            <img src={tableTopic.img} alt="topic" />
            <div className="topic-info">
              <h2>{tableTopic.topic}</h2>
              <div className="flex-row">
                <p className="tag">{tableTopic.tag}</p>
                <p>{tableTopic.time} seconds</p>
              </div>
            </div>
          </div>
          <div className="iconnn">
            <IoIosArrowDroprightCircle onClick={handleTableTopic} />
          </div>
        </div>
        <div className="instructions">
          <p>Try to avoid filler words such as um, ah, like, so, etc.</p>
          <p>The goal is to make clear and confident speechs</p>
          <button
            className="btn"
            onClick={() => {
              prepareToSpeak();
            }}
          >
            Start Speaking
          </button>
        </div>
      </>
    );
  } else if (status === "preparing") {
    setTimeout(() => {
      countDown(countDownTime, setCountDownTime);
    }, 1000);
    return (
      <div className="prep-speak">
        <div className="mini-card">
          <h4>
            You are at a friends birthday party, Give a 30 seconds speech about
            them
          </h4>
          <div className="flex-row">
            <p className="tag">{tableTopic.tag}</p>
            <p>{tableTopic.time} seconds</p>
          </div>
        </div>
        <h2>Get Ready In</h2>
        <h1>{countDownTime}</h1>
        <p className="other-card">Breath In, You can do this</p>
      </div>
    );
  } else if (status === "speaking") {
    setTimeout(() => {
      countDown(timeLeft, setTimeLeft);
    }, 1000);
    
    startRecording();

    const stopRecording = () => {
        mediaRecorder.stop();
        audioStream.getTracks().forEach(track => track.stop());
        setRecording(false);
      };

    return (
      <div className="prep-speak">
        <div className="mini-card">
          <h4>
            You are at a friends birthday party, Give a 30 seconds speech about
            them
          </h4>
          <div className="flex-row">
            <p className="tag">{tableTopic.tag}</p>
            <p>{tableTopic.time} seconds</p>
          </div>
        </div>
        <div className="mic-img">
          <img src={microphone} alt="microphone" />
        </div>
        {recording && <div className="recording-indicator"></div>}
        <div className="flex-column-center">
            {timeLeft}
        </div>
      </div>
    );
  } else if (status === "analyzing") {
    
    return (
      <div className="prep-speak">
        <div className="mini-card">
          <h4>
            You are at a friends birthday party, Give a 30 seconds speech about
            them
          </h4>
          <div className="flex-row">
            <p className="tag">{tableTopic.tag}</p>
            <p>{tableTopic.time} seconds</p>
          </div>
        </div>
        <div className="mic-img">
          <img src={microphone} alt="microphone" />
        </div>
        {recording && <div className="recording-indicator"></div>}
        <div className="flex-column-center">
        <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      
        </div>
        <p>Analying......</p>
      <p>Collating Data</p>
      </div>
    );
  } else if (status === "done") {
    const results = [
      {
        name: "Pace",
        percentage: 25,
        icon: "icon",
        color: "lightblue",
      },
      {
        name: "Confidence",
        percentage: 50,
        icon: "icon",
        color: "lightcoral",
      },
      {
        name: "Filler Words",
        percentage: 25,
        icon: "icon",
        color: "lightgreen",
      },
      {
        name: "Consciousness",
        percentage: 25,
        icon: "icon",
        color: "lightpink",
      }

    ]
    return (
      <>
        <h3>Results</h3>
        <div className="results">
          {results.map((result, index) => (
            <div key={index} className="result" style={{ backgroundColor: result.color }}>
              <div className="flex-row-space">
                <div className="flex-row">
                  <div className="icon" >
                    {result.icon}
                  </div>
                  <h3>{result.name}</h3>
                </div>
                <FaArrowRight />
              </div>
              <div className="flex-row">

                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
                <p>{result.percentage}%</p>
                </div>
            </div>
          ))}
        </div>
        <div className="instructions">
          <audio controls >
            <source src={URL.createObjectURL(new Blob(audioChunks))} />
          </audio>
          <button
            className="btn"
            onClick={() => {
              prepareToSpeak();
            }}
          >
            New Practice Topic
          </button>
        </div>
      </>
    )
  }
};

export default PracticeStage;
