import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import objectdetection from './img/object_detection_image.jpg';
import facemesh from './img/face_mesh.jpg'
import pose_estimation from './img/pose_estimation.png';
import facedetection from './img/face_detection.jpg'
import eyedetection from './img/eye_detection.jpg';
function App() {
  const videoRef = useRef(null);
  const [isFaceDetected,setIsFaceDetected] = useState(true);
  const [isFaceMeshed,setIsFaceMeshed] = useState(true);
  const [isPosed,setIsPosed] = useState(true);
  const [isObjectDetected,setIsObjectDetected] = useState(true);
  const [isEyeDetected,setIsEyeDetected] = useState(true);
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
  const OnFaceDetected = () => {
    isFaceDetected ? setIsFaceDetected(true) : setIsFaceDetected(false);
    console.log("isFaceDetected: ", isFaceDetected);
  }
  const OnFaceMeshed = () => {
    isFaceMeshed ? setIsFaceMeshed(true) : setIsFaceMeshed(false);
    console.log("isFaceMeshed: ", isFaceMeshed);
  }
  const OnEyeDetected = () => {
    isEyeDetected ? setIsEyeDetected(true) : setIsEyeDetected(false);
    console.log("isEyeDetected: ", isEyeDetected);
  }
  const OnObjectDetected = () => {
    isObjectDetected ? setIsObjectDetected(true) : setIsObjectDetected(false);
    console.log("isObjectDetected",isObjectDetected);
  }
  const OnPosed = () => {
    isPosed ? setIsPosed(true): setIsPosed(false);
    console.log("isPosed",isPosed);
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
              {
                isObjectDetected &&
                <button onClick={() => OnObjectDetected()}>
                  <img src={objectdetection}/>
                </button> 
              }
              {
                isFaceMeshed &&
                <button onClick={() => OnFaceDetected()}>
                  <img src={facedetection}/>
                </button>
              }
              {
                isFaceDetected &&
                <button onClick={() => OnFaceDetected()}>
                  <img src={facemesh}/>
                </button>
              }
              {
                isPosed && 
                <button onClick={() => OnPosed()}>
                  <img src={pose_estimation}/>
                </button>
              }
              {
                isEyeDetected &&
                <button onClick={()=> OnEyeDetected()}>
                  <img src={eyedetection} />
               </button>
              }
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
