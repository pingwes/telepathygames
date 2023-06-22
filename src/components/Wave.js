import { useRef, useEffect } from 'react'
import * as constants from '../constants'
import * as animation from './animation'
import useEventListener from '@use-it/event-listener'


// options to tweak the look
const opts = {
  smoothing: 0.6,
  fft: 8,
  minDecibels: -70,
  scale: 0.2,
  glow: 100,
  color1: [203, 36, 128],
  color2: [41, 200, 192],
  color3: [24, 137, 218],
  fillOpacity: 0.6,
  lineWidth: 6,
  blend: "screen",
  shift: 50,
  width: 100,
  amp: 1
};

let start = false

export function Wave () {

  const canvas = useRef(null)

  // enable space button
  const handler = (key) => {
    if (key.code === 'Enter') {
      start = !start
      return 
    }
  }

  useEventListener('keypress', handler)


  /**
   *  This function draws a path that roughly looks like this:
   *       .
   * __/\_/ \_/\__
   *   \/ \ / \/
   *       '
   *   1 2 3 4 5
   *          
   * The function is called three times (with channel 0/1/2) so that the same
   * basic shape is drawn in three different colors, slightly shifted and
   * each visualizing a different set of frequencies. 
  */
  const draw = (ctx, channel, x, y) => {
    
    // Read color1, color2, color2 from the opts
    const color = opts[`color${channel + 1}`].map(Math.floor);
    
    // turn the [r,g,b] array into a rgba() css color
    ctx.fillStyle = `rgba(${color}, ${opts.fillOpacity})`;
    
    // set stroke and shadow the same solid rgb() color
    ctx.strokeStyle = ctx.shadowColor = `rgb(${color})`;
    
    ctx.lineWidth = opts.lineWidth;
    ctx.shadowBlur = opts.glow;
    ctx.globalCompositeOperation = opts.blend;
    
    const m = constants.WAVEFORM_HEIGHT / 2; // the vertical middle of the canvas
     
    const h =  m*2;
    
    ctx.beginPath();
    ctx.moveTo(0, m); // start in the middle of the left side
    ctx.lineTo(x[0], m + 1); // straight line to the start of the first peak
    
    ctx.bezierCurveTo(x[1], m + 1, x[2], y[0], x[3], y[0]); // curve to 1st value
    ctx.bezierCurveTo(x[4], y[0], x[4], y[1], x[5], y[1]); // 2nd value
    ctx.bezierCurveTo(x[6], y[1], x[6], y[2], x[7], y[2]); // 3rd value
    ctx.bezierCurveTo(x[8], y[2], x[8], y[3], x[9], y[3]); // 4th value
    ctx.bezierCurveTo(x[10], y[3], x[10], y[4], x[11], y[4]); // 5th value
    
    ctx.bezierCurveTo(x[12], y[4], x[12], m, x[13], m); // curve back down to the middle
    
    ctx.lineTo(500, m + 1); // straight line to the right edge
    ctx.lineTo(x[13], m - 1); // and back to the end of the last peak
    
    // now the same in reverse for the lower half of out shape
    
    ctx.bezierCurveTo(x[12], m, x[12], h - y[4], x[11], h - y[4]);
    ctx.bezierCurveTo(x[10], h - y[4], x[10], h - y[3], x[9], h - y[3]);
    ctx.bezierCurveTo(x[8], h - y[3], x[8], h - y[2], x[7], h - y[2]);
    ctx.bezierCurveTo(x[6], h - y[2], x[6], h - y[1], x[5], h - y[1]);
    ctx.bezierCurveTo(x[4], h - y[1], x[4], h - y[0], x[3], h - y[0]);
    ctx.bezierCurveTo(x[2], h - y[0], x[1], m, x[0], m);
    
    ctx.lineTo(0, m); // close the path by going back to the start
    
    ctx.fill();
    ctx.stroke();
  }

  let i = 0
  

  useEffect(() => {
    if(canvas.current) {
      const context = canvas.current.getContext("2d")

      if(context){
        
        setInterval(() => {
          i += 1
          context.clearRect(0, 0, constants.WAVEFORM_WIDTH, constants.WAVEFORM_HEIGHT);
          
          if (start) {
            draw(context, 0, animation.red_x_animation_scaled, animation.red_y_animation_scaled[i].map(num=> num/2))
            draw(context, 1, animation.green_x_animation_scaled , animation.green_y_animation_scaled[i].map(num=> num/2))
            draw(context, 2, animation.blue_x_animation_scaled , animation.blue_y_animation_scaled[i].map(num=> num/2))
          }
          else {
            draw(context, 0, animation.red_x_animation_scaled, [100, 100, 100, 100, 100])
            draw(context, 1, animation.green_x_animation_scaled , [100, 100, 100, 100, 100])
            draw(context, 2, animation.blue_x_animation_scaled , [100, 100, 100, 100, 100])
          }

          if (i >= 500) i = 0

        }, 40)
      }
    }
  }, [])

  return (
    <div className="wave">
      <canvas 
        ref={canvas} 
        width={constants.WAVEFORM_WIDTH} 
        height={constants.WAVEFORM_HEIGHT} 
      />
    </div>
  )
}

export default Wave