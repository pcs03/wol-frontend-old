import React from 'react';
import Device from '../Device/Device';
import './DevicesList.scss';
import { Stack } from '@mui/material';

interface DevicesListProps {
  devices: Device[];
}

const DevicesList: React.FC<DevicesListProps> = ({ devices }) => {
  return (
    <Stack className="devices-list">
      <Device device={devices[0]} />
      <Device device={devices[1]} />
    </Stack>
  );
};

export default DevicesList;
