import './App.scss';
import DevicesList from '../DevicesList/DevicesList';
import DeviceInput from '../DeviceInput/DeviceInput';
import { useEffect, useState } from 'react';
import { DevicesContext } from '../../context/DeviceProvider';

function App() {
  const [devices, setDevices] = useState<Device[]>([]);
  const value = { devices, setDevices };

  useEffect(() => {
    fetch('http://localhost:5000/getDevices', {
      method: 'GET',
      headers: {
        'Content-Type': 'applications/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDevices(data['devices']);
      });
  }, []);

  return (
    <DevicesContext.Provider value={value}>
      <DeviceInput />
      <DevicesList />
    </DevicesContext.Provider>
  );
}

export default App;
