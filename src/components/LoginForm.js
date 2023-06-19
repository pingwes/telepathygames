// src/components/LoginForm.js
import React, { useState } from "react";
import logo from '../logo.png'

export function LoginForm({ onLogin, loading, error }) {
  const [deviceId, setDeviceId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    onLogin({ deviceId, email, password });
  }

  return (
    <form onSubmit={onSubmit}>
      <h3 className="card-heading text-3xl mb-2">Connect Neurosity Crown</h3>
      {!!error ? <h4 className="card-error">{error}</h4> : null}
      <div className="grid grid-cols-3">
        <div className="grid col-span-2 grid-rows-4 gap-2">
          <input
            className="px-2 py-2 text-teal-500"
            type="text"
            placeholder="Neurosity Device ID"
            value={deviceId}
            disabled={loading}
            onChange={(e) => setDeviceId(e.target.value)}
          />
          <input
            className="px-2 py-2 text-teal-500"
            type="email"
            placeholder="Email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-2 py-2 text-teal-500"
            type="password"
            placeholder="Password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className="px-2 py-2 bg-gradient-to-r from-fuchsia-600 to-pink-600"
            type="submit" 
            disabled={loading}>
            {loading ? "Connecting..." : "Connect"}
          </button>
        </div>
        <div
          className="mx-auto mt-12">
          <img 
            className="w-20"
            src={logo} 
            alt="neurosity logo"
            />
        </div>
      </div>
    </form>
  );
}