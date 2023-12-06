// SocketComponent.js
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SocketComponent = () => {
  useEffect(() => {
    const socket = io('http://localhost:3001'); // Replace with your Socket.IO server URL

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Socket.IO Example</div>;
};

export default SocketComponent;
