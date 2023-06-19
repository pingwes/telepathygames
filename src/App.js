// src/App.js
import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Calm } from "./pages/Calm";


export default function App() {
  const [neurosity, setNeurosity] = useState(null);
  const [user, setUser] = useState(null);
  const [deviceId, setDeviceId] = useLocalStorage("deviceId");
  const [loading, setLoading] = useState(true);

  if (deviceId || loading)
    console.log("deviceID: " + deviceId)

  useEffect(() => {
    if (!neurosity) {
      return;
    }
  
    const subscription = neurosity.onAuthStateChanged().subscribe((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
      setLoading(false);
    });

    if (user) {
      navigate("/calm");
    }
  
    return () => {
      subscription.unsubscribe();
    };
  }, [neurosity, user]);

  return (
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
    </Router>
  );
}