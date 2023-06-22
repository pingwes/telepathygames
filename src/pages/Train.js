import Wave from '../components/Wave'
import { navigate } from "@reach/router";
import React, { useEffect, useRef } from 'react';
import useEventListener from '@use-it/event-listener'

let percentage = 0
let start = false 
let currentX = 0;


export function Train() {
  const canvasRef = useRef(null);

  // enable space button
  const handler = (key) => {
    
    if (key.code === 'Enter') {
      start = !start
      return 
    }
  }

  useEventListener('keypress', handler)

  const draw = (context, currentX, endX, width, height) => {
    // console.log("currentX: " + currentX)
    // Clear the canvas
    context.clearRect(0, 0, width, height);
    

    // Draw the progress bar
    context.fillStyle = '#007bff';
    context.fillRect(0, 0, currentX, height);


    // if (currentX < endX) {
    //   requestAnimationFrame(draw);
    // }
  };

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext('2d');

  //   // Set the canvas size
  //   const width = canvas.width;
  //   const height = canvas.height;

  //   // Calculate the end position of the progress bar
  //   const endX = (percentage / 100) * width;

  //   setInterval(() => {
  //     // Start the animation
  //     // Update the current position
  //     if (start) {
  //       currentX += 1;
  //       draw(context, currentX, endX, width, height);
  //     }
     

  //   }, 4)
  // }, [percentage]);

  return (
    <div className="h-screen text-white">
      <div className="grid place-items-center ">
      {/* <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5">
        UP
      </h1>
        <div className="my-5 text-center">
          Think of the word "up" for the next 1 second.
          <br/>
          Press Enter or train button below
        </div>
        <div className="my-5">
          <canvas ref={canvasRef} width={300} height={20} style={{ border: '1px solid #000' }}>
          test
          </canvas>
        </div>
        <div className="my-5"> */}
          <Wave /> 
        {/* </div>
        <div className="my-5">
          <button 
            className="border-2 px-6 py-2 text-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mr-4 w-36"
            onClick={()=>{}}>
            Train
          </button>
          <button 
            className="border-2 px-6 py-2 text-slate-100 border-slate-100 text-lg bg-slate-700 w-36 mx-auto"
            onClick={()=>{
              navigate("/home");
              window.location.reload(false)
            }}
            >
            Cancel
          </button>
        </div> */}
      </div>
    </div>
  )
}