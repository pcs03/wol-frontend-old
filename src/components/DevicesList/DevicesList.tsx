import React from 'react';
import Device from '../Device/Device';
import './DevicesList.scss';

interface DevicesListProps {
  devices: Device[];
}

const DevicesList: React.FC<DevicesListProps> = ({ devices }) => {
  return (
    <div className="devices-list">
      <Device device={devices[0]} />
    </div>
  );
};

export default DevicesList;
