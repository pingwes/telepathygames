// src/App.js
// import React, { useState } from "react";
import { Router } from "@reach/router";
// import React, { useState, useEffect } from "react";
// import { Router, navigate } from "@reach/router";
// import useLocalStorage from "react-use/lib/useLocalStorage";
// import { Login } from "./pages/Login";
// import { Logout } from "./pages/Logout";
// import { Calm } from "./pages/Calm";
import { Home } from "./pages/Home";
import { Train } from "./pages/Train";
import { Header } from './components/Header'
// import { Footer } from './components/Footer'
import "./fonts.css"
// import { Neurosity } from "@neurosity/sdk";


export default function App() {
  // const [neurosity, setNeurosity] = useState(null);
  // const [user, setUser] = useState(null);
  // const [deviceId, setDeviceId] = useLocalStorage("deviceId");
  // const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   if (!neurosity) {
  //     return;
  //   }
  
  //   const subscription = neurosity.onAuthStateChanged().subscribe((user) => {
  //     if (user) {
  //       setUser(user);
  //     } 
  //     else {
  //       navigate("/");
  //     }
  //     // setLoading(false);
  //   });
  
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [neurosity, user]);

  // useEffect(() => {
  //   if (deviceId) {
  //     const neurosity = new Neurosity({ deviceId });
  //     setNeurosity(neurosity);
  //   } else {
  //     // setLoading(false);
  //   }
  // }, [deviceId]);

  return (
    <div className="bg-gradient-to-t from-slate-900 to-fuchsia-800">
      <Header />
      <div className="w-full h-1 bg-gradient-to-r  border from-teal-400 via-cyan-400 to-orange-500"></div>
      <div className="w-5/6 mx-auto h-1/2 mt-10 font-orbit ">
        <Router>
          {/* <Login
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
          <Calm path="/calm" neurosity={neurosity} user={user} /> */}
          <Home path="/home" />
          <Train path="/train" />
        </Router>
      </div>
      {/* <div className="w-full h-1 bg-gradient-to-r border from-teal-400 via-cyan-400 to-orange-500"></div>
      <Footer /> */}
    </div>
  );
}