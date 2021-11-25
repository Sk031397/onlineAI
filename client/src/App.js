import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import objectdetection from './img/object_detection_image.jpg';
import facemesh from './img/face_mesh.jpg'
import pose_estimation from './img/pose_estimation.png';
import facedetection from './img/face_detection.jpg'
import eyedetection from './img/eye_detection.jpg';
function App() {
  const videoRef = useRef(null);
  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video:{
        width:750,
        height:350
      }
    })
    .then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error(err);
    })
  }
  useEffect(()=> {
    getVideo();
  },[videoRef])
  return (
    <div className="App">
      <div className="main_container">
        <h1>Attention Grabber & Keeper</h1>
          <div className="video_container">
            <video ref={videoRef}></video>
              <div className="main_buttons">
            <button>
              <img src={objectdetection}/>
            </button>

            <button>
              <img src={facemesh}/>
            </button>
            <button>
              <img src={facedetection}/>
            </button>

            <button>
              <img src={pose_estimation}/>
            </button>

            <button>
              <img src={eyedetection} />
            </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
