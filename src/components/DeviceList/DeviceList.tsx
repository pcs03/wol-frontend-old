import React, { useContext, useState } from 'react';
import Device from '../Device/Device';
import './DeviceList.scss';
import { Stack } from '@mui/material';
import { DevicesContext } from '../../context/DeviceProvider';
import DeviceAdd from '../DeviceAdd/DeviceAdd';
import Popup from '../Popup/Popup';
import DeviceInput from '../DeviceInput/DeviceInput';

const DeviceList: React.FC = () => {
  const { devices } = useContext(DevicesContext);
  const [popup, setPopup] = useState(false);
  const [popupMode, setPopupMode] = useState('add');
  const [deviceId, setDeviceId] = useState<number | undefined>(undefined);
  const [formFields, setFormFields] = useState<DeviceInputFields>();

  const handleUpdate = (id: number, formFields: DeviceInputFields) => {
    setPopup(true);
    setPopupMode('update');
    setDeviceId(id);
    setFormFields(formFields);
  };

  const handleAdd = () => {
    setPopup(true);
    setPopupMode('add');
  };

  return (
    <Stack className="devices-list">
      {devices.map((device) => (
        <Device device={device} key={device.id} onUpdate={handleUpdate} />
      ))}
      <DeviceAdd onAdd={handleAdd} />
      {popup && (
        <Popup popup={setPopup}>
          <DeviceInput mode={popupMode} id={deviceId} formFields={formFields} />
        </Popup>
      )}
    </Stack>
  );
};

export default DeviceList;
