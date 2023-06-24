export const INTERVAL = 20
export const CANVAS_WIDTH = window.innerWidth
export const CANVAS_HEIGHT = 950
export const WAVEFORM_WIDTH = 500
export const WAVEFORM_HEIGHT = 200


// background image
export const BACKGROUND = new Image()
// BACKGROUND.src = "./images/illustrated_background_2.png"
BACKGROUND.src = "./images/stars.png"
export const BACKGROUND_HEIGHT = CANVAS_HEIGHT
export const BACKGROUND_WIDTH = CANVAS_WIDTH

// bird
export const STARSHIP = new Image()
STARSHIP.src = "./images/starship_thrust.png"
export const STARSHIP_HEIGHT = 75
export const STARSHIP_WIDTH = 300

// ground
export const GROUND = new Image()
GROUND.src = "./images/ground.png"
export const GROUND_HEIGHT = 200*3
export const GROUND_WIDTH = CANVAS_WIDTH
export const GROUND_Y = CANVAS_HEIGHT-GROUND_HEIGHT
export const HEIGHT_GROUND = 59*3

// asteroid
export const ASTEROID = new Image()
ASTEROID.src = "./images/asteroid_1.png"
export const ASTEROID_HEIGHT = 150
export const ASTEROID_WIDTH = 150

// pipes
export const PIPE_WIDTH = 40*3
export const PIPE_HEIGHT = CANVAS_HEIGHT / 2
export const PIPE_GAP = CANVAS_HEIGHT / 2 - HEIGHT_GROUND - 50

// movements
export const JUMP_SPEED = -70
export const FALL_SPEED = -70
export const SPEED = 1.5