import game_with_galaxy_trails_waveform_small from "./../game_with_galaxy_trails_waveform_small.png"
import { navigate } from "@reach/router";
import { useEffect } from 'react';
import { Header } from '../components/Header'

export function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header />
        <div className="w-5/6 mx-auto h-1/2 mt-10 font-orbit ">
        <div className="h-screen text-white">
          <div className="grid grid-cols-2 gap-16 border-2 font-orbit bg-gradient-to-r 
            from-teal-400 via-cyan-400 to-orange-500 px-10 py-10">
            <div>
              <div className="text-3xl mb-4">Asteroid Belt</div>
              <div className="text-lg mb-4 text-slate-100">Welcome to the future. Control a spaceship with your mind. Avoid Asteroid as your traverse the galaxy.</div>
              <br/><br/>
              <button 
                className="border-2 px-6 py-2 text-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mr-4 w-36"
                onClick={()=>{
                  navigate("/train");
                  window.location.reload(false)
                }}
                >
                Train
              </button>
              <button 
                className="border-2 px-6 py-2 text-slate-400 border-slate-400 text-lg bg-slate-700 w-36"
                onClick={()=> {
                  navigate("/game");
                  window.location.reload(false)
                }}
                >
                Play
              </button>
            </div>
            <div className="">
            <img 
              className="border-2"
              src={game_with_galaxy_trails_waveform_small}
              alt="galaxy game"
            />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}