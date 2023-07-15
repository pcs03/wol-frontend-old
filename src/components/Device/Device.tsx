import React from 'react';
import StorageIcon from '@mui/icons-material/Storage';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './Device.scss';

interface DeviceProps {
  device: Device;
}

const Device: React.FC<DeviceProps> = ({ device }) => {
  // determine needed icon

  // Status request via backend
  const status = false;

  const handleWol = () => {
    const payload = JSON.stringify({
      mac: device.mac,
    });

    console.log(payload);
    fetch('http://localhost:5000/sendWol', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="device">
      <div className="device-icon">
        <StorageIcon />
      </div>
      {device && (
        <div className="device-info">
          <p>{device.name}</p>
          <p>{device.mac}</p>
          <p>{device.ip}</p>
        </div>
      )}
      <div className="device-buttons">
        <Button variant="outlined" className="button" onClick={handleWol}>
          Wake On LAN
        </Button>
        <Button variant="outlined" className="button">
          Shutdown
        </Button>
      </div>
      <div className="device-status">
        <PowerSettingsNewIcon color={status ? 'success' : 'error'} />
      </div>
    </div>
  );
};

export default Device;
