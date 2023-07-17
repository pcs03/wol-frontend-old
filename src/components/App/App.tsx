import './App.scss';
import DeviceList from '../DeviceList/DeviceList';
import DeviceInput from '../DeviceInput/DeviceInput';
import { useEffect, useState } from 'react';
import { DevicesContext } from '../../context/DeviceProvider';

function App() {
  const [devices, setDevices] = useState<Device[]>([]);
  const value = { devices, setDevices };

  useEffect(() => {
    fetch('http://192.168.2.189:5000/getDevices', {
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
      <DeviceList />
    </DevicesContext.Provider>
  );
}

export default App;
