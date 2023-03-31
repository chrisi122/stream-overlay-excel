import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "Socket.IO-client";
let socket;

const Read = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const pollDOM = async () => {
      console.log(number);
      setNumber((old) => old + 1);
      const data = await axios.get("/api/staticdata");
      const comp = JSON.parse(data.data);
      console.log(comp);

      const res = await axios.post("/api/chat", comp);
    };

    const interval = setInterval(pollDOM, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();
  };
  return <div>read</div>;
};

export default Read;
