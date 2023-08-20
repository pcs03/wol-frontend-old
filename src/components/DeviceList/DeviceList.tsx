import React, { useContext } from 'react';
import Device from '../Device/Device';
import './DeviceList.scss';
import { Stack } from '@mui/material';
import { DevicesContext } from '../../context/DeviceProvider';

const DeviceList: React.FC = () => {
  const { devices } = useContext(DevicesContext);

  return (
    <Stack className="devices-list">
      {devices.map((device) => (
        <Device device={device} key={device.id} />
      ))}
    </Stack>
  );
};

export default DeviceList;
