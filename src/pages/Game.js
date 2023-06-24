import React from 'react';
import { useEffect, useRef, useState } from 'react'
import useEventListener from '@use-it/event-listener'
import * as constants from '../constants'


// ground
let groundX = 0

// starship
let starshipX = 20
let starshipY = 340
let starshipYSpeed = 0

// asteroids
let asteroidY = constants.PIPE_HEIGHT
let asteroidX = constants.CANVAS_WIDTH

// score
let score = 0
let bestScore = parseInt(localStorage.getItem('bestScore') || '0')

// blur
let blur = 50

// check collision between circle and rectangle
const checkCollision = (circle, rect) => {

  if ((circle.x + circle.radius) >= rect.x && (circle.x - circle.radius) <= (rect.x + rect.width)) {
    if ((circle.y + circle.radius) >= rect.y && (circle.y - circle.radius) <= (rect.y + rect.height)) {
      // TODO: IMPROVE COLLISION CHECK
      return true
    }
  }
  return false
}

// check if starship has touched a asteroid
const touchedAsteroid = () => {
  const starshipHitbox = {
    x: starshipX+(constants.STARSHIP_WIDTH/2),
    y: starshipY+(constants.STARSHIP_HEIGHT/2)+5,
    radius: 20
  }

  const asteroid = {
    x: asteroidX,
    y: asteroidY,
    width: constants.ASTEROID_WIDTH,
    height: constants.ASTEROID_HEIGHT
  }

  return checkCollision(starshipHitbox, asteroid) 
}

// check if starship has touched the ground
const fallOut = () => (starshipY + constants.STARSHIP_HEIGHT) > (constants.CANVAS_HEIGHT-constants.HEIGHT_GROUND)

// stop game 
const reset = () => {
  hasStarted = false
  hasFinished = true
}

let hasStarted = false
let hasFinished = false
let canGetScore = true


export function Game() {

  const [showModal, setShowModal] = useState(false)
  const canvas = useRef(null)

  // starship motion
  const motion = (direction) => {
    if(hasFinished) {
      return
    }
    if(!hasStarted) {
      hasStarted = true;
    }
    if (direction === "upwards") {
      starshipYSpeed = constants.JUMP_SPEED
    }
    if (direction === "downwards") {
      starshipYSpeed = -constants.JUMP_SPEED
    }
  }

  // enable space button
  const handler = (key) => {
    if(hasFinished) {
      return
    }
    if (key.code === 'Space' || key.code === 'KeyU') {
      if(!hasStarted) {
        hasStarted = true;
      }
      motion("upwards")
    }
    if (key.code === 'KeyD') {
      motion("downwards")
    }
  }

  useEventListener('keypress', handler)

  const draw = (context) => {

    blur -= 1
    
    context.fillStyle = "#09131a";
    context.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT)

    // context.drawImage(
    //   constants.BACKGROUND, 
    //   0,
    //   0, 
    //   constants.BACKGROUND_WIDTH, 
    //   constants.BACKGROUND_HEIGHT
    // )


    // draw starship
    context.drawImage(
      constants.STARSHIP, 
      starshipX, 
      starshipY, 
      constants.STARSHIP_WIDTH, 
      constants.STARSHIP_HEIGHT)

    // draw asteroid
    context.drawImage(
      constants.ASTEROID, 
      asteroidX, 
      asteroidY, 
      constants.ASTEROID_WIDTH, 
      constants.ASTEROID_HEIGHT)
  }


  useEffect(() => {
    if(canvas.current) {
      const context = canvas.current.getContext("2d")
      if(context){
        setInterval(() => {
          
          // dying
          if (touchedAsteroid() || fallOut()) {
            if(score > bestScore) {
              bestScore = score
              localStorage.setItem('bestScore', score.toString())
            }
            setShowModal(true)
            reset()
          }

          // check if we should give another score
          // if (canGetScore && (starshipX > asteroidX + constants.PIPE_WIDTH)) {
          //   canGetScore = false
          //   score++
          // }

          draw(context)

          if(!hasStarted) {
            return
          }

          // reset asteroid
          if (asteroidX < -constants.PIPE_WIDTH) {
            asteroidX = constants.CANVAS_WIDTH;
            asteroidY = constants.PIPE_GAP * Math.random()
            canGetScore = true
          }

          // reset ground
          if (groundX <= -constants.CANVAS_WIDTH) {
            groundX = 0
          }
    
          // draw scores
          context.fillStyle = "white"
          context.font = '50px Roboto'
          context.fillText(score.toString(), constants.CANVAS_WIDTH/2-15, 50)
    
          // movements
          asteroidX -= constants.SPEED
          groundX -= constants.SPEED
          starshipY += starshipYSpeed * (constants.INTERVAL / 1000)
          
          if(starshipYSpeed < 0){
            starshipYSpeed -= constants.FALL_SPEED * (constants.INTERVAL / 1000)
            if (starshipYSpeed > 0){
              starshipYSpeed = 0
            }
          }

          if(starshipYSpeed > 0){
            starshipYSpeed += constants.FALL_SPEED * (constants.INTERVAL / 1000)
            if (starshipYSpeed < 0){
              starshipYSpeed = 0
            }
          }
        }, constants.INTERVAL)
      }
    }
  }, [])

  return (
    <div className="game">
      <canvas 
        ref={canvas} 
        width={constants.CANVAS_WIDTH} 
        height={constants.CANVAS_HEIGHT} 
      />
    </div>
  )
}

export default Game