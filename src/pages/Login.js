// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import game_with_galaxy_trails_waveform_small from "./../game_with_galaxy_trails_waveform_small.png"
import crown_gradient from "./../crown_gradient.png"
import { navigate } from "@reach/router";
import { Header } from '../components/Header'

export function Login({ neurosity, user, setUser, setDeviceId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function onLogin({ email, password, deviceId }) {
    
    if (email && password && deviceId) {
      setError("");
      setEmail(email);
      setPassword(password);
      setDeviceId(deviceId);
    } else {
      setError("Please fill the form");
    }
  }

  useEffect(() => {
    if (!user && neurosity && email && password) {
      console.log("if useEffect")
      login();
    }
  
    async function login() {

      setIsLoggingIn(true);
      const auth = await neurosity.login({ email, password }).catch((error) => {
        setError(error.message);
      });
  

      if (auth) {
        setUser(auth.user);
        navigate("/home");
        window.location.reload(false)
      }
  
      setIsLoggingIn(false);
    }
  }, [email, password, neurosity, user, setUser, setError]);

  return (
    <>
      <div className="grid gap-y-5 text-slate-50 font-orbit pb-10">
        <div className="grid grid-cols-2 gap-x-10">
          <div className="border-2 font-orbit 
            bg-gradient-to-r from-teal-400 via-cyan-400 to-orange-500 
            px-10 py-10 ">
            <div className="text-3xl mb-4">Become a Jedi. <br/>Unlock a superpower.</div>
            Play games by controlling movements with your thoughts. Connect your Neurosity crown and start playing today. Don't have a crown?
            <br/><br/>
            <button 
              className="border-2 px-6 py-2  text-lg bg-slate-700"
              type="submit" 
              >
              BUY A CROWN
            </button>
          </div>
          <div className="mx-auto border-2 pl-10 py-10 w-full bg-slate-600/75 
            text-slate-100">
            <LoginForm onLogin={onLogin} loading={isLoggingIn} error={error} />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-10 border-2 px-10 py-10 mt-5">
          <div className="col-span-3">
            <div className="text-xl mb-4">
            This present moment was once the unimaginable future.
            </div>
            <div className="text-sm">
            The idea of telekinesis has captured the wonder of humans since the beginning of time. Sci-Fi movies have explored what it would be like to control objects with only the mind. Finally, it has become possible for anyone to use futuristic superpower.
            <br/><br/>
            Play games like Asteroid Belt: control a starship with just the thoughts "up" and "down" to avoid collisions with asteroids.
            </div>
          </div>
          <img 
            className="border-2 col-span-2"
            src={game_with_galaxy_trails_waveform_small} />
        </div>
        <div className="grid grid-cols-5 gap-10 border-2 px-10 py-10 mt-5">
          <div className="col-span-3">
            <div className="text-xl mb-4">
            How it works
            </div>
            <div className="text-sm">
            Telekinetic Games is based off of decades of research and science. <br/><br/>Pioneers like <a className="text-sky-500" href="http://neurosity.co">Neurosity</a> have made state-of-the-art Electroencephalography (EEG) available to consumers. EEG measures the electrical activity emitted from the brain. 
            <br/><br/>
            Advanced Artificial Intelligence makes it possible to decode thoughts from this electrical activity. 
            <br/><br/>
            Simply connect your Neurosity Crown, train a model, and start using Telekinesis.
            </div>
          </div>
          <div className="col-span-2 relative">
            <img 
              className="border-2 bg-gradient-to-r from-cyan-500 to-blue-500"
              src={crown_gradient} />
            {/* <span className="border-2 -top-0 w-full h-full z-10 absolute bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20"/> */}
          </div>
          
        </div>
        <div className="border-2 px-10 py-10">
          <div className='text-xl'>
            tel·e·ki·ne·sis
            <br/>
            <i>noun</i>
            <br/>
          </div>
          <div className='text-sm'>
            a hypothetical psychic ability allowing a person to influence a physical system without physical interaction.
          </div>
        </div>
      </div>
    </>
  );
}