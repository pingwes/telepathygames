// src/App.js
import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Calm } from "./pages/Calm";
import { Home } from "./pages/Home";
import { Train } from "./pages/Train";
import { Game } from "./pages/Game";
import { Header } from './components/Header'
// import { Footer } from './components/Footer'
import "./fonts.css"
import { Neurosity } from "@neurosity/sdk";


export default function App() {
  const [neurosity, setNeurosity] = useState(null);
  const [user, setUser] = useState(null);
  const [deviceId, setDeviceId] = useLocalStorage("deviceId");
  // const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!neurosity) {
      return;
    }
  
    const subscription = neurosity.onAuthStateChanged().subscribe((user) => {
      if (user) {
        setUser(user);
      } 
      else {
        navigate("/");
      }
      // setLoading(false);
    });
  
    return () => {
      subscription.unsubscribe();
    };
  }, [neurosity, user]);

  useEffect(() => {
    if (deviceId) {
      const neurosity = new Neurosity({ deviceId });
      setNeurosity(neurosity);
    } else {
      // setLoading(false);
    }
  }, [deviceId]);

  return (
    <div className="bg-gradient-to-t from-slate-900 to-fuchsia-800">
      
        <Router>
          <Login
            path="/"
            neurosity={neurosity}
            user={user}
            setUser={setUser}
            setDeviceId={setDeviceId}
          />
          <Logout
            path="/logout"
            neurosity={neurosity}
            resetState={() => {
              setNeurosity(null);
              setUser(null);
              setDeviceId("");
            }}
          />
          <Calm path="/calm" neurosity={neurosity} user={user} />
          <Home path="/home" />
          <Train path="/train" />
          <Game path="/game" />
        </Router>
    </div>
  );
}