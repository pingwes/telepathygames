// src/components/Nav.js
import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import { Status } from "./Status";
// import { Footer } from "./Footer";

export function Nav({ neurosity }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!neurosity) {
      return;
    }

    neurosity.getInfo().then((info) => {
      setInfo(info);
    });
  }, [neurosity]);

  return (
    <nav className="card">
      <Status neurosity={neurosity} info={info} />
      <button onClick={() => navigate("/logout")} className="card-btn">
        Logout
      </button>
    </nav>
  );
}