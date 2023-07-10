import './App.scss';
import DevicesList from '../DevicesList/DevicesList';
import DeviceInput from '../DeviceInput/DeviceInput';

function App() {
  const deviceList = [
    {
      mac: 'FFFFFFFFFFFF',
      name: 'server',
      ip: '192.168.2.160',
    },
    {
      mac: 'FFFFFFFFFFFF',
      name: 'server',
      ip: '192.168.2.160',
    },
  ];

  return (
    <>
      <DeviceInput />
      <DevicesList devices={deviceList} />
    </>
  );
}

export default App;
