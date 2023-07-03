import React, { useState } from 'react';

const DeviceInput: React.FC = () => {
  const [id, setId] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (id.trim() === '') {
      console.error('Please enter a valid MAC Address');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/wol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.log('Error', error);
    }

    setId('');
  };

  return (
    <form onSubmit={handleSubmit} className="device-input">
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DeviceInput;
