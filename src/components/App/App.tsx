import './App.scss';
import DevicesList from '../DevicesList/DevicesList';
import DeviceInput from '../DeviceInput/DevicesInput';

function App() {
  const deviceList = [
    {
      mac: 'FFFFFFFFFFFF',
      name: 'server',
      ip: '192.168.2.160',
    },
  ];

  return (
    <div id="app-root">
      <DevicesList devices={deviceList} />
      <DeviceInput />
    </div>
  );
}

export default App;
