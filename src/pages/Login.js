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
    <div className="grid grid-cols-2 gap-x-20 font-orbit h-96">
      <div className="border-2 text-5xl text-slate-50 font-orbit 
        bg-gradient-to-r from-teal-400 via-cyan-400 to-orange-500 
        px-10 py-10 ">Become a Jedi. <br/>Unlock a superpower.</div>
      <div className="mx-auto border-2 px-10 py-10 w-full bg-slate-600/75 
        text-slate-100">
        <LoginForm onLogin={onLogin} loading={isLoggingIn} error={error} />
      </div>
    </div>
  );
}