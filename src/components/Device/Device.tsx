import React from 'react';
import StorageIcon from '@mui/icons-material/Storage';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './Device.scss';

interface DeviceProps {
  device: Device | undefined;
}

const Device: React.FC<DeviceProps> = ({ device }) => {
  // determine needed icon

  // Status request via backend
  const status = false;

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
        <Button variant="outlined" className="button">
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
