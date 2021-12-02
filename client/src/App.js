import axios from 'axios';
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [width,setWidth] = useState();
  const [height,setHeight] = useState();
  const [name,setName] = useState();
  const [accuracy,setAccuracy] = useState();
  const runCoco = async () => {
    const net = await cocossd.load();
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      if(obj === undefined)
      {
       //s console.log('no')
      }
      try{
        setWidth(obj[0].bbox[2]);
        setHeight(obj[0].bbox[3]);
        setName(obj[0]['class']);
        setAccuracy(obj[0]['score']);
        const y = tf.tensor2d(obj[0].bbox[0],obj[0].bbox[1]);
        const z = tf.tensor2d(obj[0].bbox[2],obj[0].bbox[3]);
        const pre = tf.metrics.precision(y,z);
        const recall = tf.metrics.recall(y,z);
        const f1_score = 2*((pre*recall)/(pre+recall));
        console.log("precision",pre);
        console.log("recall",recall);
        console.log("f1_score",f1_score);
        console.log(obj);
        if(obj[0].bbox[2] >= 850 || obj[0].bbox[3] >= 450)
        {
          console.log('out of bounds')
        } 
      }catch(e){
      }
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };
  useEffect(()=> { 
    runCoco();
  },[])
  return (
    <div className="App">
      <div className="main_container">
        <h1>Attention Grabber & Keeper</h1>
          <div className="video_container">
          <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
           borderRadius:25,
           height:450
          }}
        />
        <div className="sidebar_container">
          <div className="accuracy_field">
            <h2>Accuracy:</h2>
            <h3>{accuracy}</h3>
          </div>
          <div className="class_field">
            <h2>Type of Object:</h2>
            <h3>{name}</h3>
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
           
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 440,
            height: 480,
          }}
        />
        </div>
      </div>
    </div>
  );
}

export default App;
