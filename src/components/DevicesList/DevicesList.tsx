import React, { useContext } from 'react';
import Device from '../Device/Device';
import './DevicesList.scss';
import { Stack } from '@mui/material';
import { DevicesContext } from '../../context/DeviceProvider';

const DevicesList: React.FC = () => {
  const { devices } = useContext(DevicesContext);

  return (
    <Stack className="devices-list">
      {devices.map((device) => (
        <Device device={device} key={device.mac} />
      ))}
    </Stack>
  );
};

export default DevicesList;
