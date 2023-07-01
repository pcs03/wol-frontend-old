import './App.css';
import React, { useState } from 'react';

function App() {
  const [macAddress, setMacAddress] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (macAddress.trim() === '') {
      console.error('Please enter a valid MAC Address');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/wol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'mac-address': macAddress }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.log('Error', error);
    }

    setMacAddress('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={macAddress}
        onChange={(e) => setMacAddress(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
