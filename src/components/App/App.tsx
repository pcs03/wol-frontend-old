import './App.scss';
import DevicesList from '../DevicesList/DevicesList';
import DeviceInput from '../DeviceInput/DeviceInput';
import { useEffect, useState } from 'react';

function App() {
  const [deviceList, setDeviceList] = useState<Device[]>([]);

  console.log("running")

  // useEffect(() => {
  //   fetch('http://localhost:5000/getDevices', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'applications/json',
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     setDeviceList(data);
  //   });
  // }, [])

  useEffect(() => {
    const response = fetch('http://localhost:5000/addDevice', {
      method: 'POST',
      headers: {
        'Content-Type': 'applications/json',
      },
      body: JSON.stringify({name: "desktop", mac: "000000000000", ip: "192.168.2.162"})
    })

  })

  return (
    <>
      <DeviceInput />
      <DevicesList devices={deviceList} />
    </>
  );
}

export default App;
