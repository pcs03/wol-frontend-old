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

const Device: React.FC<DeviceProps> = ({ device }) => {
  const { setDevices } = useContext(DevicesContext);
  const [deviceStatus, setDeviceStatus] = useState<boolean>();

  useEffect(() => {
    pingDevice();
  }, [deviceStatus]);

  async function sendWol() {
    const response = await fetch(
      `http://${import.meta.env.VITE_API_HOST}/sendWol`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mac: device.mac,
        }),
      },
    );
    const body = await response.json();

    if (body.message === 'Magic packet sent') {
      setTimeout(() => {
        console.log('timeout');
        setDeviceStatus(true);
      }, 40000);
    }
  }

  async function rmDevice() {
    const confirm = window.confirm(
      'Are you sure you want to delete this device?',
    );
    if (confirm) {
      const response = await fetch(
        `http://${import.meta.env.VITE_API_HOST}/rmDevice`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mac: device.mac,
          }),
        },
      );
      const body = await response.json();
      console.log(body);
      setDevices(body.devices);
    }
  }

  async function pingDevice() {
    const controller = new AbortController();

    const response = await fetch(
      `http://${import.meta.env.VITE_API_HOST}/ping`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip: device.ip,
        }),
        signal: controller.signal,
      },
    );

    const body = await response.json();
    setDeviceStatus(body['status']);
  }

  async function sendShutdown() {
    const confirm = window.confirm(
      'Are you sure you want to shutdown this device?',
    );
    if (confirm) {
      const response = await fetch(
        `http://${import.meta.env.VITE_API_HOST}/shutdown`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: device.username,
            ip: device.ip,
          }),
        },
      );

      const body = await response.json();
      console.log(body['status']);

      if (new RegExp('closed by remote host').test(body['status'])) {
        console.log('turning off');

        setTimeout(() => {
          console.log('timeout');
          setDeviceStatus(false);
        }, 10000);
      }
    }
  }

  return (
    <div className="device">
      <div>
        <Storage className="device-icon" />
      </div>
      {device && (
        <div className="device-info">
          <p>{device.name}</p>
          <p>{device.username + '@' + device.ip}</p>
          <p>{formatMac(device.mac)}</p>
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
          onClick={sendWol}
        >
          Wake On LAN
        </Button>
        <Button
          variant="contained"
          sx={{ color: 'white', background: 'grey' }}
          className="button"
          onClick={sendShutdown}
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
