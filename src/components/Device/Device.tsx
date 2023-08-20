import React, { useContext, useEffect, useState } from 'react';
import { Storage, Delete } from '@mui/icons-material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './Device.scss';
import { IconButton } from '@mui/material';
import { DevicesContext } from '../../context/DeviceProvider';
import CachedIcon from '@mui/icons-material/Cached';
import { LoadingButton } from '@mui/lab';

interface DeviceProps {
  device: Device;
}

function formatMac(mac: string) {
  if (!/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac)) {
    return mac.match(/.{1,2}/g)?.join(':');
  } else {
    return mac;
  }
}

const Device: React.FC<DeviceProps> = ({ device }) => {
  const { setDevices } = useContext(DevicesContext);
  const [deviceStatus, setDeviceStatus] = useState<boolean>();
  const [shutdownLoading, setShutdownLoading] = useState<boolean>(false);
  const [wakeLoading, setWakeLoading] = useState<boolean>(false);

  useEffect(() => {
    pingDevice();
  }, []);

  async function sendWol() {
    setWakeLoading(true);
    const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/wol/${device.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();

    if (body.message === 'Magic packet sent') {
      let counter = 0;
      const intervalId = window.setInterval(async () => {
        const status = await pingDevice();
        console.log(counter, deviceStatus);

        if (status || counter >= 30) {
          setWakeLoading(false);
          clearInterval(intervalId);
        }

        counter++;
      }, 2000);
    } else {
      setWakeLoading(false);
    }
  }

  async function rmDevice() {
    const confirm = window.confirm('Are you sure you want to delete this device?');
    if (confirm) {
      const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/devices/${device.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.json();
      setDevices(body);
    }
  }

  async function pingDevice() {
    const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/ping/${device.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();
    setDeviceStatus(body['status']);

    return body['status'];
  }

  async function sendShutdown() {
    setShutdownLoading(true);
    const confirm = window.confirm('Are you sure you want to shutdown this device?');
    if (confirm) {
      const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/shutdown/${device.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const body = await response.json();
      console.log(body['status']);

      if (new RegExp('closed by remote host').test(body['status'])) {
        console.log('turning off');

        let counter = 0;
        const intervalId = window.setInterval(async () => {
          const status = await pingDevice();
          console.log(counter, status);

          if (!status || counter >= 30) {
            setShutdownLoading(false);
            clearInterval(intervalId);
          }

          counter++;
        }, 2000);
      } else {
        setShutdownLoading(false);
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
        <LoadingButton
          loading={wakeLoading}
          variant="contained"
          sx={{
            color: 'white',
            background: 'grey',
          }}
          className="button"
          onClick={sendWol}
        >
          Wake On LAN
        </LoadingButton>
        <LoadingButton
          loading={shutdownLoading}
          variant="contained"
          sx={{ color: 'white', background: 'grey' }}
          className="button"
          onClick={sendShutdown}
        >
          Shutdown
        </LoadingButton>
      </div>
      <div>
        <PowerSettingsNewIcon className="device-status" color={deviceStatus ? 'success' : 'error'} />
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
