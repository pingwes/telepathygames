// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";

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
      login();
    }
  
    async function login() {
      setIsLoggingIn(true);
      const auth = await neurosity.login({ email, password }).catch((error) => {
        setError(error.message);
      });
  
      if (auth) {
        setUser(auth.user);
      }
  
      setIsLoggingIn(false);
    }
  }, [email, password, neurosity, user, setUser, setError]);

  return (
    <div className="grid gap-y-10 text-slate-50 font-orbit pb-10">
      <div className="grid grid-cols-2 gap-x-10 h-72">
        <div className="border-2 font-orbit 
          bg-gradient-to-r from-teal-400 via-cyan-400 to-orange-500 
          px-10 py-10 ">
          <div className="text-3xl mb-4">Become a Jedi. <br/>Unlock a superpower.</div>
          Play games by controlling movements with your internal monologue
        </div>
        <div className="mx-auto border-2 pl-10 py-10 w-full bg-slate-600/75 
          text-slate-100">
          <LoginForm onLogin={onLogin} loading={isLoggingIn} error={error} />
        </div>
      </div>
      <div className="border-2 px-10 py-10 mt-10">
        <div className='text-2xl'>
          tel·e·ki·ne·sis
          <br/>
          <i>noun</i>
          <br/>
        </div>
        <div className='text-lg'>
          a hypothetical psychic ability allowing a person to influence a physical system without physical interaction.
        </div>
      </div>
      <div className="border-2 px-10 py-10 mx-auto w-full">
        <div className="text-2xl mx-auto">This present moment was once the unimaginable future</div>
      </div>
    </div>
  );
}