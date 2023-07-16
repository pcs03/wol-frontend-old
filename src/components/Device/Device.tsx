import React, { useContext } from 'react';
import { Storage, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './Device.scss';
import { IconButton } from '@mui/material';
import { DevicesContext } from '../../context/DeviceProvider';

interface DeviceProps {
  device: Device;
}

async function sendWol(payload: string) {
  const response = await fetch('http://localhost:5000/sendWol', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  });
  const body = await response.json();
  console.log(body);
}

const Device: React.FC<DeviceProps> = ({ device }) => {
  const { setDevices } = useContext(DevicesContext);

  const status = false;

  async function rmDevice(payload: string) {
    const response = await fetch('http://localhost:5000/rmDevice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });
    const body = await response.json();
    console.log(body);
    setDevices(body.devices);
  }

  return (
    <div className="device">
      <Storage className="device-icon" />
      {device && (
        <div className="device-info">
          <p>{device.name}</p>
          <p>{device.mac}</p>
          <p>{device.ip}</p>
        </div>
      )}
      <div className="device-buttons">
        <Button
          variant="contained"
          sx={{
            color: 'white',
            background: 'grey',
          }}
          className="button"
          onClick={() => sendWol(JSON.stringify({ mac: device.mac }))}
        >
          Wake On LAN
        </Button>
        <Button
          variant="contained"
          sx={{ color: 'white', background: 'grey' }}
          className="button"
        >
          Shutdown
        </Button>
      </div>
      <PowerSettingsNewIcon
        className="device-status"
        color={status ? 'success' : 'error'}
      />
      <IconButton
        onClick={() => {
          rmDevice(JSON.stringify({ mac: device.mac }));
        }}
      >
        <Delete sx={{ color: 'white' }} />
      </IconButton>
    </div>
  );
};

export default Device;
