import './Home.scss';
import DeviceList from '../DeviceList/DeviceList';
import { useEffect, useState } from 'react';
import { DevicesContext } from '../../context/DeviceProvider';

function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const value = { devices, setDevices };

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/devices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'applications/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDevices(data);
      });
  }, []);

  return (
    <DevicesContext.Provider value={value}>
      <DeviceList />
    </DevicesContext.Provider>
  );
}

export default Home;
