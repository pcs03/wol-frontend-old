import { useContext } from 'react';
import './DeviceInput.scss';
import { DevicesContext } from '../../context/DeviceProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

interface DeviceInputProps {
  mode: string;
  id?: number;
  formFields?: DeviceInputFields;
}

const DeviceInput: React.FC<DeviceInputProps> = ({ mode, id, formFields }) => {
  const { devices, setDevices } = useContext(DevicesContext);

  const usernamePattern = /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/;
  const ipPattern = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
  const macPattern = /^([0-9A-Fa-f]{12}|([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2})$/;

  const userSchema = object({
    devicename: string().required('Required').max(15, 'Too long'),
    username: string().required('Required').matches(usernamePattern, 'Not a valid username'),
    mac: string().required('Required').matches(macPattern, 'Not a valid MAC Address').uppercase(),
    ip: string().required('Required').matches(ipPattern, 'Not a valid IP Address'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  async function addDevice(data: DeviceInputFields) {
    const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    const newDevices = [...devices, body];

    setDevices(newDevices);
  }

  async function updateDevice(data: DeviceInputFields) {
    const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/devices/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    console.log(body);

    const newDevices = [...devices];
    const deviceIndex = newDevices.findIndex((device) => device.id === id);
    newDevices[deviceIndex] = body;

    setDevices(newDevices);
  }

  return (
    <form
      className="device-form"
      onSubmit={
        mode === 'add'
          ? handleSubmit((data: DeviceInputFields) => addDevice(data))
          : handleSubmit((data: DeviceInputFields) => updateDevice(data))
      }
    >
      <div className="form-fields">
        <div className="device-input">
          <label htmlFor="devicename">Device Name</label>
          <input {...register('devicename')} placeholder="Desktop" defaultValue={formFields && formFields.devicename} />
          <p>{errors.devicename?.message}</p>
        </div>
        <div className="device-input">
          <label htmlFor="username">User Name</label>
          <input {...register('username')} placeholder="john" defaultValue={formFields && formFields.username} />
          <p>{errors.username?.message}</p>
        </div>
        <div className="device-input">
          <label htmlFor="mac">Device MAC Address</label>
          <input {...register('mac')} placeholder="FFFFFFFFFFFF" defaultValue={formFields && formFields.ip} />
          <p>{errors.mac?.message}</p>
        </div>
        <div className="device-input">
          <label htmlFor="ip">Device IP Address</label>
          <input {...register('ip')} placeholder="0.0.0.0" defaultValue={formFields && formFields.mac} />
          <p>{errors.ip?.message}</p>
        </div>
      </div>

      <div className="form-submit-container">
        <button type="submit" className="form-submit">
          {mode === 'add' ? 'Add Device' : 'Update Device'}
        </button>
      </div>
    </form>
  );
};

export default DeviceInput;
