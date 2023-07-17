import React, { useContext, useEffect, useState } from 'react';
import { Storage, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './Device.scss';
import { IconButton } from '@mui/material';
import { DevicesContext } from '../../context/DeviceProvider';
import CachedIcon from '@mui/icons-material/Cached';

interface DeviceProps {
  device: Device;
}

function formatMac(mac: string) {
  return mac.replace(/(.{2})/g, '$1:').slice(0, -1);
}

async function sendWol(payload: string) {
  const response = await fetch('http://192.168.2.189:5000/sendWol', {
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
  const [deviceStatus, setDeviceStatus] = useState<boolean>();

  useEffect(() => {
    pingDevice();
  }, [deviceStatus]);

  async function rmDevice() {
    const confirm = window.confirm(
      'Are you sure you want to delete this device?',
    );
    if (confirm) {
      const response = await fetch('http://192.168.2.189:5000/rmDevice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mac: device.mac,
        }),
      });
      const body = await response.json();
      console.log(body);
      setDevices(body.devices);
    }
  }

  async function pingDevice() {
    const response = await fetch('http://192.168.2.189:5000/ping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ip: device.ip,
      }),
    });
    const body = await response.json();
    setDeviceStatus(body['status']);
  }

  return (
    <div className="device">
      <div>
        <Storage className="device-icon" />
      </div>
      {device && (
        <div className="device-info">
          <p>{device.name}</p>
          <p>{formatMac(device.mac)}</p>
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
      <div>
        <PowerSettingsNewIcon
          className="device-status"
          color={deviceStatus ? 'success' : 'error'}
        />
      </div>
      <div className="crud-buttons">
        <IconButton onClick={rmDevice}>
          <Delete sx={{ color: 'white' }} />
        </IconButton>
        <IconButton onClick={pingDevice}>
          <CachedIcon sx={{ color: 'white' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Device;
